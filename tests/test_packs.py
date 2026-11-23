"""Furniture packs: local unsigned JSON files, content check and import through the websocket."""

from __future__ import annotations

import copy
import json
from types import SimpleNamespace

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
import voluptuous as vol

from custom_components.homeplan3d import packs
from custom_components.homeplan3d.const import DOMAIN

PAYLOAD = {
    "format": "fp3dpack",
    "version": 1,
    "id": "test.starter",
    "name": "Starter",
    "publisher": "Test",
    "items": [
        {
            "id": "cube_chair",
            "name": {"de": "Würfelsessel", "en": "Cube chair"},
            "size": [0.8, 0.8, 0.75],
            "parts": [
                {"shape": "box", "x": 0, "z": 0, "w": 1, "d": 1, "y": 0, "h": 0.55, "color": "fabric"},
                {"shape": "box", "x": 0, "z": -0.4, "w": 1, "d": 0.2, "y": 0.55, "h": 0.45, "color": "#223355"},
            ],
        }
    ],
}


def _old_envelope(payload: dict) -> str:
    """An old signed file: its signature, buyer name and installation binding are ignored."""
    return json.dumps(
        {
            "payload": {**copy.deepcopy(payload), "licensee": "Anna", "instance": "box-1"},
            "signature": {"key": "any", "sig": "ignored"},
        }
    )


def test_unsigned_pack_is_accepted() -> None:
    clean, source = packs.read_pack(json.dumps(PAYLOAD))
    assert clean["id"] == "test.starter"
    assert clean["items"][0]["parts"][0]["edges"] is False
    assert source["id"] == "test.starter"
    assert "licensee" not in clean and "instance" not in clean


def test_old_envelope_is_accepted_but_its_signature_is_ignored() -> None:
    clean, source = packs.read_pack(_old_envelope(PAYLOAD))
    assert clean == packs.validate_payload(PAYLOAD)
    assert "licensee" not in source and "instance" not in source
    # a changed file with a bogus signature still loads: there is no signature check
    changed = {**copy.deepcopy(PAYLOAD), "name": "Mine now"}
    text = json.dumps({"payload": changed, "signature": {"key": "x", "sig": "bad"}})
    assert packs.read_pack(text)[0]["name"] == "Mine now"


def test_bad_json_and_foreign_files_are_rejected() -> None:
    with pytest.raises(packs.PackError) as err:
        packs.read_pack("{")
    assert err.value.code == "not_a_pack"
    with pytest.raises(packs.PackError) as err:
        packs.read_pack("{}")
    assert err.value.code == "not_a_pack"
    with pytest.raises(packs.PackError) as err:
        packs.read_pack(json.dumps({"payload": {"format": "other"}}))
    assert err.value.code == "not_a_pack"
    with pytest.raises(packs.PackError) as err:
        packs.read_pack("x" * (packs.MAX_PACK_SIZE + 1))
    assert err.value.code == "too_large"


def test_features_come_from_the_open_source_config() -> None:
    config = json.loads(packs.CONFIG_FILE.read_text(encoding="utf-8"))
    assert config == packs.OPEN_SOURCE_CONFIG
    assert [f["id"] for f in config["features"]] == packs.KNOWN_FEATURES
    assert [f["id"] for f in config["features"] if f["enabled"]] == packs.ENABLED_FEATURES
    assert "pool" in packs.ENABLED_FEATURES
    assert "some_future_addon" not in packs.KNOWN_FEATURES
    assert packs.feature_enabled("pool")
    assert not packs.feature_enabled("some_future_addon")


def test_a_disabled_config_feature_still_validates_but_does_not_run(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(packs, "ENABLED_FEATURES", [f for f in packs.KNOWN_FEATURES if f != "pool"])
    pack = {**PAYLOAD, "id": "test.disabled", "items": [], "features": ["pool"]}
    assert packs.validate_payload(pack)["features"] == ["pool"]
    assert not packs.feature_enabled("pool")


def test_sloped_and_lying_parts_are_accepted() -> None:
    shaped = copy.deepcopy(PAYLOAD)
    box = {"x": 0, "z": 0.2, "w": 1, "d": 0.6, "y": 0, "h": 0.5, "color": "body"}
    shaped["items"][0]["parts"] = [
        {"shape": "loft", **box, "tx": 0, "tz": 0.1, "tw": 0.9, "td": 0.2, "edges": "glow"},
        {"shape": "cyl", "axis": "x", **box, "edges": "faint"},
    ]
    clean = packs.validate_payload(shaped)
    assert clean["items"][0]["parts"][0]["edges"] == "glow"
    assert clean["items"][0]["parts"][1]["axis"] == "x"
    bad = copy.deepcopy(shaped)
    bad["items"][0]["parts"][1]["axis"] = "w"
    with pytest.raises(packs.PackError):
        packs.validate_payload(bad)


def test_pack_content_is_checked() -> None:
    heavy = copy.deepcopy(PAYLOAD)
    heavy["items"][0]["parts"] *= 31  # more than 60 parts
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload(heavy)
    assert err.value.code == "invalid_content"
    twice = copy.deepcopy(PAYLOAD)
    twice["items"].append(copy.deepcopy(twice["items"][0]))
    with pytest.raises(packs.PackError):
        packs.validate_payload(twice)


async def test_import_list_and_remove(hass: HomeAssistant, hass_ws_client) -> None:
    await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    await client.send_json_auto_id(
        {"type": "homeplan3d/packs/import", "pack": json.dumps({**PAYLOAD, "licensee": "Anna"})}
    )
    result = await client.receive_json()
    assert result["success"]
    assert result["result"] == {
        "id": "test.starter",
        "name": "Starter",
        "publisher": "Test",
        "items": 1,
    }

    await client.send_json_auto_id({"type": "homeplan3d/packs/import", "pack": "{}"})
    result = await client.receive_json()
    assert not result["success"] and result["error"]["code"] == "not_a_pack"

    await client.send_json_auto_id({"type": "homeplan3d/packs/list"})
    listed = (await client.receive_json())["result"]["packs"]
    assert [p["id"] for p in listed] == ["test.starter"]
    assert listed[0]["items"][0]["name"]["de"] == "Würfelsessel"
    assert "licensee" not in listed[0]

    await client.send_json_auto_id({"type": "homeplan3d/packs/remove", "pack_id": "test.starter"})
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id({"type": "homeplan3d/packs/list"})
    assert (await client.receive_json())["result"]["packs"] == []


async def test_shop_and_license_commands_are_gone(hass: HomeAssistant, hass_ws_client) -> None:
    await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    for command, extra in (
        ("homeplan3d/license/get", {}),
        ("homeplan3d/license/activate", {"code": "abc"}),
        ("homeplan3d/license/remove", {}),
        ("homeplan3d/license/refresh", {}),
        ("homeplan3d/packs/install", {"pack_id": "test.starter"}),
        ("homeplan3d/previews/get", {}),
    ):
        await client.send_json_auto_id({"type": command, **extra})
        result = await client.receive_json()
        assert not result["success"], result
        assert result["error"]["code"] == "unknown_command"


async def test_module_code_runs_only_after_an_admin_approved_it(hass: HomeAssistant, hass_ws_client) -> None:
    """Module code is shown and approved by an admin before it runs; an update never replaces the running code."""
    await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    async def call(**msg):
        await client.send_json_auto_id(msg)
        return await client.receive_json()

    module = {**PAYLOAD, "id": "mastershort.window_watch", "items": [], "release": 1}
    v1 = {**module, "module": {"api": 1, "kind": "stage", "code": "export default { api: 1, id: 'v1' };"}}
    res = await call(type="homeplan3d/packs/import", pack=json.dumps(v1))
    assert res["success"] and res["result"]["approval"] is True
    listed = (await call(type="homeplan3d/packs/list"))["result"]["packs"][0]
    assert listed["module"]["approved"] is False and "code" not in listed["module"]
    # not approved: its code is not served
    res = await call(type="homeplan3d/modules/code", pack_id="mastershort.window_watch")
    assert res["error"]["code"] == "not_approved"
    # the admin reads it, then approves exactly that code
    review = (await call(type="homeplan3d/modules/review", pack_id="mastershort.window_watch"))["result"]
    assert "id: 'v1'" in review["code"]
    assert "licensee" not in review
    assert not (await call(type="homeplan3d/modules/approve", pack_id="mastershort.window_watch", sha="0" * 64))[
        "success"
    ]
    assert (await call(type="homeplan3d/modules/approve", pack_id="mastershort.window_watch", sha=review["sha"]))[
        "success"
    ]
    assert (
        "id: 'v1'" in (await call(type="homeplan3d/modules/code", pack_id="mastershort.window_watch"))["result"]["code"]
    )

    # a new release waits beside the running code
    v2 = {**module, "release": 2, "module": {"api": 1, "kind": "stage", "code": "export default { api: 1, id: 'v2' };"}}
    assert (await call(type="homeplan3d/packs/import", pack=json.dumps(v2)))["result"]["approval"] is True
    listed = (await call(type="homeplan3d/packs/list"))["result"]["packs"][0]
    assert listed["module"]["approved"] is True and listed["release"] == 1
    assert listed["pending"]["release"] == 2
    assert (
        "id: 'v1'" in (await call(type="homeplan3d/modules/code", pack_id="mastershort.window_watch"))["result"]["code"]
    )
    pending = (await call(type="homeplan3d/modules/review", pack_id="mastershort.window_watch", pending=True))["result"]
    assert "id: 'v2'" in pending["code"]
    assert (await call(type="homeplan3d/modules/approve", pack_id="mastershort.window_watch", sha=pending["sha"]))[
        "success"
    ]
    listed = (await call(type="homeplan3d/packs/list"))["result"]["packs"][0]
    assert listed["release"] == 2 and listed["module"]["approved"] is True and "pending" not in listed
    assert (
        "id: 'v2'" in (await call(type="homeplan3d/modules/code", pack_id="mastershort.window_watch"))["result"]["code"]
    )


def test_any_publisher_and_id_are_accepted() -> None:
    """Without publisher keys, any publisher may ship a pack with any valid id."""
    studio = {**PAYLOAD, "id": "studio.abc123", "publisher": "Anyone"}
    assert packs.validate_payload(studio)["id"] == "studio.abc123"
    feature = {**PAYLOAD, "id": "test.other", "items": [], "features": ["camera_cockpit"]}
    assert packs.validate_payload(feature)["features"] == ["camera_cockpit"]


def test_turned_parts_and_stairs_holes_are_accepted() -> None:
    """A part may turn around its centre (rot) and a stairs item may cut the floor above (hole)."""
    item = copy.deepcopy(PAYLOAD["items"][0])
    item["hole"] = True
    item["parts"][0]["rot"] = 27.5
    clean = packs.validate_payload({**PAYLOAD, "items": [item]})
    assert clean["items"][0]["hole"] is True
    assert clean["items"][0]["parts"][0]["rot"] == 27.5
    with pytest.raises(packs.PackError):
        item["parts"][0]["rot"] = 400
        packs.validate_payload({**PAYLOAD, "items": [item]})


def test_library_fields_are_accepted_and_checked() -> None:
    """A pack may say what an item is, which rooms it is for and which variants belong together (1.23)."""
    library = {"group": "seating", "room": ["living", "kids"], "tags": ["cube", "kids"], "family": "cube_chair"}
    item = {**PAYLOAD["items"][0], **library, "variant": {"de": "80", "en": "80"}}
    clean = packs.validate_payload({**PAYLOAD, "items": [item]})
    assert clean["items"][0]["group"] == "seating"
    assert clean["items"][0]["room"] == ["living", "kids"]
    assert clean["items"][0]["variant"] == {"de": "80", "en": "80"}
    with pytest.raises(packs.PackError):
        packs.validate_payload({**PAYLOAD, "items": [{**item, "room": "living"}]})
    with pytest.raises(packs.PackError):
        packs.validate_payload({**PAYLOAD, "items": [{**item, "group": "Not An Id"}]})


def test_feature_packs_need_no_items_but_a_pack_needs_something() -> None:
    """A feature pack unlocks features without furniture; an empty pack is refused."""
    pro = {**PAYLOAD, "id": "test.pro", "items": [], "features": ["camera_cockpit", "weather"]}
    assert packs.validate_payload(pro)["features"] == ["camera_cockpit", "weather"]
    with pytest.raises(packs.PackError):
        packs.validate_payload({**PAYLOAD, "items": []})
    # an add-on newer than this installation asks for an update
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**pro, "features": ["some_future_addon"]})
    assert err.value.code == "needs_update"
    assert err.value.detail == "some_future_addon"


def test_a_newer_part_shape_asks_for_an_update() -> None:
    """An unknown value of a newer pack asks for an update; other faults stay errors."""
    item = copy.deepcopy(PAYLOAD["items"][0])
    item["parts"][0]["shape"] = "some_future_shape"
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**PAYLOAD, "items": [item]})
    assert err.value.code == "needs_update"
    item["parts"][0]["shape"] = "box"
    item["parts"][0]["w"] = "wide"
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**PAYLOAD, "items": [item]})
    assert err.value.code == "invalid_content"


def test_fan_blades_spin_and_an_unknown_part_field_asks_for_an_update() -> None:
    """Turning parts (#1084) are known; a part field of a newer pack release asks for an update, not "invalid"."""
    item = copy.deepcopy(PAYLOAD["items"][0])
    item["parts"][0]["spin"] = "y"
    assert packs.validate_payload({**PAYLOAD, "items": [item]})["items"][0]["parts"][0]["spin"] == "y"
    item["parts"][0]["spin"] = "x"
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**PAYLOAD, "items": [item]})
    assert err.value.code == "needs_update"
    del item["parts"][0]["spin"]
    item["parts"][0]["some_future_field"] = 1
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**PAYLOAD, "items": [item]})
    assert err.value.code == "needs_update"


def test_probatio_marks_an_unknown_value_by_its_code() -> None:
    """Probatio (Home Assistant 2026.9+) words its errors its own way but gives the code "not_in_list"."""
    probatio = SimpleNamespace(errors=[SimpleNamespace(code="not_in_list")])
    assert packs._unknown_value(probatio)  # type: ignore[arg-type]
    assert not packs._unknown_value(vol.MultipleInvalid([vol.Invalid("expected float")]))


def test_a_module_pack_needs_no_furniture_and_its_code_is_served_apart() -> None:
    """A module pack passes without items; an admin approves its code before it is served."""
    module = {
        **PAYLOAD,
        "id": "mastershort.voice_answers",
        "items": [],
        "module": {"api": 1, "kind": "voice", "code": "export default { api: 1 };"},
    }
    clean = packs.validate_payload(module)
    assert clean["module"]["kind"] == "voice"
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**module, "module": {"api": 2, "kind": "voice", "code": "x"}})
    assert err.value.code == "needs_update"
    with pytest.raises(packs.PackError) as err:
        packs.validate_payload({**module, "module": {"api": 1, "kind": "editor", "code": "x"}})
    assert err.value.code == "needs_update"
    # the pack list leaves the code out, the code command returns it
    from custom_components.homeplan3d.websocket import _without_code

    slim = _without_code({**clean, "source": clean})
    assert "code" not in slim["module"] and "code" not in slim["source"]["module"]
    assert slim["module"]["api"] == 1
