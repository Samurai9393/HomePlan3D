"""Assist asks the house: service, intent, sentences and the views' answers."""

from __future__ import annotations

from pathlib import Path
import sys
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import intent
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeplan3d.const import DOMAIN
from custom_components.homeplan3d.voice import area_device, remove_sentences, sentences_yaml, write_sentences

from .test_init import _setup


async def _view(hass_ws_client, hass: HomeAssistant):
    """An open NeonPlan view: subscribed to the sentences."""
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "homeplan3d/voice/subscribe"})
    assert (await client.receive_json())["success"]
    return client


async def test_service_hands_the_sentence_to_the_views_and_returns_the_first_answer(
    hass: HomeAssistant, hass_ws_client
) -> None:
    await _setup(hass)
    view = await _view(hass_ws_client, hass)
    other = await _view(hass_ws_client, hass)

    task = hass.async_create_task(
        hass.services.async_call(
            DOMAIN, "ask", {"text": "Show the living room", "speak": True}, blocking=True, return_response=True
        )
    )
    ask = (await view.receive_json())["event"]
    assert ask["text"] == "Show the living room"
    assert ask["speak"] is True
    assert ask["screen"] is None
    assert (await other.receive_json())["event"]["ask_id"] == ask["ask_id"]

    await view.send_json(
        {"id": 2, "type": "homeplan3d/voice/answer", "ask_id": ask["ask_id"], "text": "Showing the living room."}
    )
    assert (await view.receive_json())["result"] == {"taken": True}
    # the second view is late
    await other.send_json({"id": 2, "type": "homeplan3d/voice/answer", "ask_id": ask["ask_id"], "text": "Living room"})
    assert (await other.receive_json())["result"] == {"taken": False}

    assert await task == {"answered": True, "answer": "Showing the living room.", "screen_open": True}


async def test_service_without_an_open_view_says_so(hass: HomeAssistant) -> None:
    await _setup(hass)
    with patch("custom_components.homeplan3d.voice.ANSWER_TIMEOUT", 0.05):
        result = await hass.services.async_call(
            DOMAIN, "ask", {"text": "Show the kitchen", "screen": "Hallway"}, blocking=True, return_response=True
        )
    assert result == {"answered": False, "answer": "", "screen_open": False}


async def test_intent_speaks_the_answer_or_that_nothing_was_understood(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    view = await _view(hass_ws_client, hass)

    ids = iter(range(10, 100))

    async def answer(text: str, answered: bool) -> intent.IntentResponse:
        task = hass.async_create_task(
            intent.async_handle(hass, "test", "NeonPlanAsk", {"text": {"value": text}}, text_input=text, language="en")
        )
        ask = (await view.receive_json())["event"]
        assert ask["text"] == text
        await view.send_json(
            {
                "id": next(ids),
                "type": "homeplan3d/voice/answer",
                "ask_id": ask["ask_id"],
                "text": "Three windows are open.",
                "answered": answered,
            }
        )
        await view.receive_json()
        return await task

    assert (await answer("What is open", True)).speech["plain"]["speech"] == "Three windows are open."
    assert (await answer("Blubb", False)).speech["plain"]["speech"] == "NeonPlan did not understand that."


async def test_intent_without_a_view(hass: HomeAssistant) -> None:
    await _setup(hass)
    with patch("custom_components.homeplan3d.voice.ANSWER_TIMEOUT", 0.05):
        response = await intent.async_handle(
            hass, "test", "NeonPlanAsk", {"text": {"value": "living room"}}, language="en"
        )
    assert response.speech["plain"]["speech"] == "No NeonPlan screen is open right now."


def test_sentences_are_written_only_on_request_and_never_over_a_changed_file(tmp_path: Path) -> None:
    en = tmp_path / "custom_sentences" / "en" / "homeplan3d.yaml"
    hashes, kept, changed = write_sentences(tmp_path, "distinct", {})
    assert changed and kept == []
    text = en.read_text(encoding="utf-8")
    assert text == sentences_yaml("en", "distinct")
    assert "show [me] {text}" in text
    # only the distinct sentences: a question Home Assistant answers itself is not taken (#641)
    assert "which (windows|doors) are [still] open" not in text
    assert sorted(p.name for p in (tmp_path / "custom_sentences").iterdir()) == ["en"]
    # unchanged: nothing written
    hashes, kept, changed = write_sentences(tmp_path, "distinct", hashes)
    assert not changed
    # "all" adds the questions
    hashes, kept, changed = write_sentences(tmp_path, "all", hashes)
    assert changed and "which (windows|doors) are [still] open" in en.read_text(encoding="utf-8")
    # a file the user changed is never overwritten, nor removed
    en.write_text("my own sentences", encoding="utf-8")
    hashes, kept, changed = write_sentences(tmp_path, "distinct", hashes)
    assert kept == ["en"]
    assert en.read_text(encoding="utf-8") == "my own sentences"
    hashes, kept, _ = write_sentences(tmp_path, "off", hashes)
    assert kept == ["en"] and en.exists()
    # removing the integration takes only NeonPlan's own files
    hashes, _, _ = write_sentences(tmp_path, "distinct", hashes)
    remove_sentences(tmp_path, hashes)
    assert en.read_text(encoding="utf-8") == "my own sentences"


def test_a_file_an_older_version_wrote_is_still_ours(tmp_path: Path) -> None:
    """Files from 1.22.0 - 1.24.0 (older header lines) are replaced, not kept as the user's own."""
    en = tmp_path / "custom_sentences" / "en" / "homeplan3d.yaml"
    en.parent.mkdir(parents=True)
    en.write_text(
        sentences_yaml("en", "distinct").replace(
            "# understands answers). Put your own sentences for NeonPlanAsk into another file.\n",
            "# understands answers). Rewritten on every start: "
            "put your own sentences for NeonPlanAsk into another file.\n",
        ),
        encoding="utf-8",
    )
    _, kept, changed = write_sentences(tmp_path, "distinct", {})
    assert kept == [] and changed
    assert en.read_text(encoding="utf-8") == sentences_yaml("en", "distinct")


async def test_setup_writes_no_sentence_file(hass: HomeAssistant) -> None:
    """Nothing lands in the configuration folder unless an admin picks the sentences (HACS review)."""
    await _setup(hass)
    assert not (Path(hass.config.config_dir) / "custom_sentences").exists()


async def test_unload_removes_service_and_intent(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    assert hass.services.has_service(DOMAIN, "ask")
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert not hass.services.has_service(DOMAIN, "ask")


# a file an early version wrote with its own, shorter set of sentences (seen on a real installation)
_EARLY_FILE = """# Written by HomePlan 3D: the sentences Assist hands to the open NeonPlan views (the first one that
# understands answers). Rewritten on every start: put your own sentences for NeonPlanAsk into another file.
language: "en"
intents:
  NeonPlanAsk:
    data:
      - sentences:
          - "show [me] {text}"
          - "where (is|are) [the] {text}"
          - "good night"
lists:
  text:
    wildcard: true
"""


def test_an_early_file_with_other_sentences_is_still_ours(tmp_path: Path) -> None:
    """Only NeonPlan's sentences under NeonPlan's header: replaced (it lacked "who is home"); one sentence of
    the user's own in it, and it stays."""
    en = tmp_path / "custom_sentences" / "en" / "homeplan3d.yaml"
    en.parent.mkdir(parents=True)
    en.write_text(_EARLY_FILE, encoding="utf-8")
    _, kept, changed = write_sentences(tmp_path, "distinct", {})
    assert kept == [] and changed
    assert "who is home" in en.read_text(encoding="utf-8")
    en.write_text(
        _EARLY_FILE.replace('          - "good night"\n', '          - "turn the lights off"\n'), encoding="utf-8"
    )
    _, kept, _ = write_sentences(tmp_path, "distinct", {})
    assert kept == ["en"]


def test_the_names_locating_knows_are_a_list_not_a_wildcard(tmp_path: Path) -> None:
    """ "Where is Frauke?" matches a list of names exactly, so Assist handles it locally and an AI agent behind it
    never gets the question."""
    en = tmp_path / "custom_sentences" / "en" / "homeplan3d.yaml"
    hashes, _, _ = write_sentences(tmp_path, "distinct", {}, ["Torsten Apple Watch", "Torsten", 'Ms "K"'])
    text = en.read_text(encoding="utf-8")
    assert "where (is|are) [the|my] {neonplan_who}" in text
    assert '      - "Torsten Apple Watch"' in text and '      - "Ms \\"K\\""' in text
    # the names change: the file follows; no names: the list goes
    _, _, changed = write_sentences(tmp_path, "distinct", hashes, ["Torsten"])
    assert changed and "Apple Watch" not in en.read_text(encoding="utf-8")
    write_sentences(tmp_path, "distinct", {}, [])
    assert "neonplan_who" not in en.read_text(encoding="utf-8")


def test_an_older_file_with_fewer_sentences_is_still_ours(tmp_path: Path) -> None:
    """A file of an older version had fewer sentences (no "who is home"): replaced, not kept as the user's."""
    en = tmp_path / "custom_sentences" / "en" / "homeplan3d.yaml"
    en.parent.mkdir(parents=True)
    en.write_text(
        "# Written by HomePlan 3D: the sentences Assist hands to the open NeonPlan views (the first one that\n"
        "# understands answers). Rewritten on every start: put your own sentences for NeonPlanAsk into another file.\n"
        'language: "en"\nintents:\n  NeonPlanAsk:\n    data:\n      - sentences:\n'
        '          - "show [me] {text}"\n          - "where (is|are) [the] {text}"\n'
        "lists:\n  text:\n    wildcard: true\n",
        encoding="utf-8",
    )
    _, kept, changed = write_sentences(tmp_path, "distinct", {})
    assert kept == [] and changed
    # one sentence of the user's own in it: kept
    en.write_text(
        en.read_text(encoding="utf-8")
        .replace("wildcard: true", "wildcard: true\n")
        .replace('          - "show', '          - "turn the lights on"\n          - "show'),
        encoding="utf-8",
    )
    _, kept, _ = write_sentences(tmp_path, "distinct", {})
    assert kept == ["en"]


def test_the_names_locating_knows_are_sentences(tmp_path: Path) -> None:
    """ "Where is Frauke?" as a list of names (no wildcard): Assist matches it locally even with an AI agent."""
    en = tmp_path / "custom_sentences" / "en" / "homeplan3d.yaml"
    hashes, _, _ = write_sentences(tmp_path, "distinct", {}, ["Frauke", "Torsten's iPhone"])
    text = en.read_text(encoding="utf-8")
    assert "{neonplan_who}" in text and '      - "Torsten\'s iPhone"' in text
    # names changed: the file is ours, so it is rewritten
    _, kept, changed = write_sentences(tmp_path, "distinct", hashes, ["Frauke"])
    assert kept == [] and changed and "Torsten's iPhone" not in en.read_text(encoding="utf-8")


async def test_a_sentence_said_in_a_room_goes_to_assist_with_a_device_of_that_room(
    hass: HomeAssistant, hass_ws_client
) -> None:
    """On the kitchen's tablet "lights on" reaches Assist from a device in the kitchen (the room is its area)."""
    await _setup(hass)
    kitchen = ar.async_get(hass).async_create("Kitchen")
    hall = ar.async_get(hass).async_create("Hallway")
    entry = MockConfigEntry(domain="hue", data={})
    entry.add_to_hass(hass)
    devices = dr.async_get(hass)
    lamp = devices.async_get_or_create(config_entry_id=entry.entry_id, identifiers={("hue", "lamp")})
    devices.async_update_device(lamp.id, area_id=kitchen.id)
    off = devices.async_get_or_create(config_entry_id=entry.entry_id, identifiers={("hue", "off")})
    devices.async_update_device(off.id, area_id=kitchen.id, disabled_by=dr.DeviceEntryDisabler.USER)
    assert area_device(hass, kitchen.id) == lamp.id
    assert area_device(hass, hall.id) is None
    assert area_device(hass, "gone") is None

    result = MagicMock()
    result.as_dict.return_value = {"response": {"speech": {"plain": {"speech": "The light is on"}}}}
    converse = AsyncMock(return_value=result)
    client = await hass_ws_client(hass)
    # Assist itself stands in: its requirements (hassil) are not installed for the tests
    with patch.dict(sys.modules, {"homeassistant.components.conversation": SimpleNamespace(async_converse=converse)}):
        await client.send_json(
            {"id": 1, "type": "homeplan3d/voice/converse", "text": "lights on", "area_id": kitchen.id, "language": "en"}
        )
        res = await client.receive_json()
    assert res["success"]
    assert res["result"]["response"]["speech"]["plain"]["speech"] == "The light is on"
    assert converse.await_args.args[1] == "lights on"
    assert converse.await_args.kwargs == {"language": "en", "device_id": lamp.id}


async def test_a_view_of_a_second_plan_may_say_which_plan_it_shows(hass: HomeAssistant, hass_ws_client) -> None:
    """A view of a plan other than the main one sends its plan id. Without it in the schema the subscription was
    turned away with "invalid_format" and tried again on every update, flooding the log (#1242)."""
    await _setup(hass)
    view = await hass_ws_client(hass)
    await view.send_json(
        {
            "id": 1,
            "type": "homeplan3d/voice/subscribe",
            "view": {"kind": "card", "plan": "gartenhaus", "screen": "Garden house", "version": "4.0.1"},
        }
    )
    assert (await view.receive_json())["success"]

    admin = await hass_ws_client(hass)
    await admin.send_json({"id": 1, "type": "homeplan3d/screens/list"})
    screens = (await admin.receive_json())["result"]["screens"]
    assert [(x["plan"], x["screen"]) for x in screens] == [("gartenhaus", "Garden house")]

    # a plan id is still checked: no spaces, no path, nothing long
    bad = await hass_ws_client(hass)
    await bad.send_json({"id": 1, "type": "homeplan3d/voice/subscribe", "view": {"kind": "card", "plan": "../etc"}})
    assert (await bad.receive_json())["error"]["code"] == "invalid_format"


async def test_reload_screens_reaches_the_views_that_ask_for_it(hass: HomeAssistant, hass_ws_client) -> None:
    """Card templates: the service lets the open views that ask for it load their page again."""
    await _setup(hass)
    new = await hass_ws_client(hass)
    await new.send_json({"id": 1, "type": "homeplan3d/voice/subscribe", "announce": True, "reload": True})
    assert (await new.receive_json())["success"]

    await hass.services.async_call(DOMAIN, "reload_screens", {"templates": "kueche_fire"}, blocking=True)
    event = (await new.receive_json())["event"]
    assert event["reload"]["templates"] == ["kueche_fire"] and event["reload"]["id"]


async def test_open_screens_are_listed_and_leave_with_their_view(hass: HomeAssistant, hass_ws_client) -> None:
    """Card templates: the views say what they show; the overview lists them and can reload one."""
    await _setup(hass)
    tablet = await hass_ws_client(hass)
    view = {"kind": "card", "screen": "Kitchen", "template": "kueche", "device": "Fire HD 10", "version": "2.3.0"}
    await tablet.send_json({"id": 1, "type": "homeplan3d/voice/subscribe", "reload": True, "view": view})
    assert (await tablet.receive_json())["success"]
    preview = await hass_ws_client(hass)
    await preview.send_json({"id": 1, "type": "homeplan3d/voice/subscribe", "view": {"kind": "preview"}})
    assert (await preview.receive_json())["success"]

    admin = await hass_ws_client(hass)
    await admin.send_json({"id": 1, "type": "homeplan3d/screens/list"})
    screens = (await admin.receive_json())["result"]["screens"]
    assert [(x["template"], x["device"], x["reloadable"]) for x in screens] == [("kueche", "Fire HD 10", True)]

    await admin.send_json({"id": 2, "type": "homeplan3d/screens/reload", "screen_id": screens[0]["id"]})
    assert (await admin.receive_json())["result"] == {"sent": True}
    assert (await tablet.receive_json())["event"]["reload"]["templates"] == []

    await tablet.send_json({"id": 2, "type": "unsubscribe_events", "subscription": 1})
    await tablet.receive_json()
    await admin.send_json({"id": 3, "type": "homeplan3d/screens/list"})
    assert (await admin.receive_json())["result"]["screens"] == []
