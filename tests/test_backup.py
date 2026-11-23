"""Full backup: export of plan and packs, restore with content-only pack validation."""

from __future__ import annotations

import json

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeplan3d.const import DOMAIN
from tests.test_init import BUILDING

PAYLOAD = {
    "format": "fp3dpack",
    "version": 1,
    "id": "test.backup",
    "name": "Backup",
    "publisher": "Test",
    "items": [
        {
            "id": "cube",
            "name": {"de": "Würfel", "en": "Cube"},
            "size": [0.5, 0.5, 0.5],
            "parts": [{"shape": "box", "x": 0, "z": 0, "w": 1, "d": 1, "y": 0, "h": 1, "color": "body"}],
        }
    ],
}

MODULE_PAYLOAD = {
    **PAYLOAD,
    "id": "test.module",
    "items": [],
    "module": {"api": 1, "kind": "stage", "code": "export default { api: 1, id: 'v1' };"},
}


async def _setup(hass: HomeAssistant, hass_ws_client):
    await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return await hass_ws_client(hass)


async def test_backup_round_trip(hass: HomeAssistant, hass_ws_client) -> None:
    client = await _setup(hass, hass_ws_client)

    # an imported pack keeps its unsigned JSON source
    await client.send_json_auto_id({"type": "homeplan3d/packs/import", "pack": json.dumps(PAYLOAD)})
    assert (await client.receive_json())["success"]
    building = json.loads(json.dumps(BUILDING))
    building["floors"][0]["name"] = "Backup floor"
    await client.send_json_auto_id({"type": "homeplan3d/building/save", "building": building})
    assert (await client.receive_json())["success"]

    await client.send_json_auto_id({"type": "homeplan3d/backup/export"})
    backup = (await client.receive_json())["result"]
    assert backup["format"] == "homeplan3d-backup"
    assert backup["building"]["floors"][0]["name"] == "Backup floor"
    assert backup["packs"][0]["id"] == "test.backup"
    assert backup["packs"][0]["source"]["id"] == "test.backup"
    assert "signature" not in backup["packs"][0]

    # a mismatched entry id and invalid content are skipped; old buyer fields and a bogus signature are ignored
    renamed = json.loads(json.dumps(backup["packs"][0]))
    renamed["id"] = "test.renamed"
    broken = json.loads(json.dumps(backup["packs"][0]))
    broken["id"] = broken["source"]["id"] = "test.broken"
    broken["source"]["items"][0]["parts"][0]["w"] = "wide"
    legacy = json.loads(json.dumps(backup["packs"][0]))
    legacy["id"] = legacy["source"]["id"] = "test.legacy"
    legacy["source"]["licensee"] = "Anna"
    legacy["source"]["instance"] = "box-1"
    legacy["signature"] = {"key": "x", "sig": "bad"}

    backup["building"]["floors"][0]["name"] = "Restored floor"
    restore = {"type": "homeplan3d/backup/import", "building": backup["building"]}
    await client.send_json_auto_id({**restore, "packs": [*backup["packs"], renamed, broken, legacy]})
    result = await client.receive_json()
    assert result["success"], result
    assert result["result"]["packs"] == 2
    assert sorted(s["id"] for s in result["result"]["skipped"]) == ["test.broken", "test.renamed"]
    assert {s["reason"] for s in result["result"]["skipped"]} == {"invalid_content"}
    assert result["result"]["building"]["floors"][0]["name"] == "Restored floor"

    await client.send_json_auto_id({"type": "homeplan3d/packs/list"})
    listed = (await client.receive_json())["result"]["packs"]
    assert sorted(p["id"] for p in listed) == ["test.backup", "test.legacy"]
    assert "licensee" not in listed[0] and "instance" not in listed[0]

    # a broken building is refused before anything changes
    await client.send_json_auto_id({"type": "homeplan3d/backup/import", "building": {"version": 99}, "packs": []})
    result = await client.receive_json()
    assert not result["success"] and result["error"]["code"] == "invalid_format"


async def test_backup_restore_keeps_approval_only_for_the_restored_code(hass: HomeAssistant, hass_ws_client) -> None:
    client = await _setup(hass, hass_ws_client)

    async def call(**msg):
        await client.send_json_auto_id(msg)
        return await client.receive_json()

    assert (await call(type="homeplan3d/packs/import", pack=json.dumps(MODULE_PAYLOAD)))["result"]["approval"] is True
    review = (await call(type="homeplan3d/modules/review", pack_id="test.module"))["result"]
    assert (await call(type="homeplan3d/modules/approve", pack_id="test.module", sha=review["sha"]))["success"]

    exported = (await call(type="homeplan3d/backup/export"))["result"]["packs"][0]
    assert exported["approved"] == review["sha"]
    assert "signature" not in exported

    # a mismatched approval is dropped: the restored code waits for a new approval
    bad = json.loads(json.dumps(exported))
    bad["approved"] = "0" * 64
    restore = {"type": "homeplan3d/backup/import", "building": json.loads(json.dumps(BUILDING))}
    result = await call(**restore, packs=[bad])
    assert result["result"]["packs"] == 1
    result = await call(type="homeplan3d/modules/code", pack_id="test.module")
    assert result["error"]["code"] == "not_approved"

    # an approval naming exactly the restored code carries over
    result = await call(**restore, packs=[exported])
    assert result["result"]["packs"] == 1
    result = await call(type="homeplan3d/modules/code", pack_id="test.module")
    assert result["success"] and "id: 'v1'" in result["result"]["code"]
