"""Furniture packs: local JSON files with furniture models built from boxes and cylinders.

A pack is a JSON payload (format, id, name, publisher, items, optional features or module). There is no
signature, publisher key or licence: a local file is accepted when its content validates here. The
feature ids this version knows come from the shipped open-source-config.json.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any

import voluptuous as vol

PACK_FORMAT = "fp3dpack"
PACK_VERSION = 1
# largest pack file accepted (characters of JSON)
MAX_PACK_SIZE = 1_000_000

CONFIG_FILE = Path(__file__).with_name("open-source-config.json")


def load_open_source_config() -> dict[str, Any]:
    """The shipped open-source configuration: mode, licence and the enabled features."""
    data = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
    return data if isinstance(data, dict) else {}


OPEN_SOURCE_CONFIG = load_open_source_config()

_ID = vol.All(str, vol.Match(r"^[a-z0-9][a-z0-9_.-]{0,39}$"))
_TEXT = vol.All(str, vol.Length(min=1, max=80))
# a colour: "#rrggbb" or a role of the built-in palette (so packs follow the look of the plan); "front" (3.5) marks
# door and drawer fronts, drawn like "white" until a finish tells fronts and carcass apart (#1177)
_COLOR = vol.Any(
    vol.Match(r"^#[0-9a-fA-F]{6}$"),
    vol.In(["body", "fabric", "cushion", "wood", "white", "front", "metal", "dark", "glass", "plant", "pot", "accent"]),
)
_FRACTION = vol.All(vol.Coerce(float), vol.Range(min=-0.5, max=0.5))
_SPAN = vol.All(vol.Coerce(float), vol.Range(min=0.001, max=1))
_LEVEL = vol.All(vol.Coerce(float), vol.Range(min=0, max=1))
_METRES = vol.All(vol.Coerce(float), vol.Range(min=0.01, max=10))

# Parts in fractions of the item's size: x/z centre (-0.5..0.5, front at +z), w/d extent, y/h bottom
# and height of the item height. A cylinder's diameter is the smaller of w and d.
PART_SCHEMA = vol.Schema(
    {
        vol.Required("shape"): vol.In(["box", "cyl", "loft"]),
        vol.Required("x"): _FRACTION,
        vol.Required("z"): _FRACTION,
        vol.Required("w"): _SPAN,
        vol.Required("d"): _SPAN,
        vol.Required("y"): _LEVEL,
        vol.Required("h"): _SPAN,
        vol.Required("color"): _COLOR,
        vol.Optional("top"): _COLOR,
        # the finish a part in a colour of its own follows (3.5, #1175): it keeps its colour until a placed item gets
        # that finish (a chair's red cover takes the fabric colour, a table's oak top the wood colour)
        vol.Optional("finish"): vol.In(["wood", "fabric", "front", "body"]),
        # outline: True (soft blue), "glow" (cyan like the walls) or "faint"
        vol.Optional("edges", default=False): vol.Any(bool, vol.In(["glow", "faint"])),
        # lamps: the part shines in the colour and brightness of the linked light
        vol.Optional("glow", default=False): bool,
        # a screen (TV, monitor): shows the linked media player's app colour and picture on its front (+z)
        vol.Optional("screen", default=False): bool,
        # loft: centre and extent of the top rectangle (default: the same as the bottom)
        vol.Optional("tx"): _FRACTION,
        vol.Optional("tz"): _FRACTION,
        vol.Optional("tw"): _SPAN,
        vol.Optional("td"): _SPAN,
        # cylinder axis: upright (default) or lying along x or z (wheels, rollers)
        vol.Optional("axis"): vol.In(["x", "y", "z"]),
        # turn of the part around its own centre (degrees around the vertical axis): spiral steps, diagonals
        vol.Optional("rot"): vol.All(vol.Coerce(float), vol.Range(min=-360, max=360)),
        # free sizes (1.23): the measures that stay when the item is resized ("w", "d", "h" or several): legs,
        # arms and plates keep their size and their distance from the edge, the parts between them stretch
        vol.Optional("fix"): vol.All(str, vol.Match(r"^[wdh]{1,3}$")),
        # an Advent candle's flame (2.3): drawn only from the n-th Sunday of Advent until 6 January
        vol.Optional("advent"): vol.All(vol.Coerce(int), vol.Range(min=1, max=4)),
        # fan blades (3.2.1, #1084): turn while the item's fan runs, about the upright ("y") or the front axis ("z")
        vol.Optional("spin"): vol.In(["y", "z"]),
        # a live part (3.4): moves or lights with the entity of one of the item's slots - a door opens ("open",
        # turning about an edge by `amount` degrees), a drawer slides out ("slide", a share of the depth), a drum
        # turns ("spin"), a tank fills ("level"), a status light shows ok / off / a fault ("blink"), a part glows
        vol.Optional("bind"): vol.Schema(
            {
                vol.Required("slot"): vol.All(str, vol.Match(r"^[a-z0-9_]{1,24}$")),
                vol.Required("kind"): vol.In(["open", "slide", "spin", "level", "blink", "glow"]),
                vol.Optional("hinge"): vol.In(["left", "right", "top", "bottom"]),
                vol.Optional("axis"): vol.In(["x", "y", "z"]),
                vol.Optional("amount"): vol.All(vol.Coerce(float), vol.Range(min=0, max=180)),
            }
        ),
    }
)

# Plan symbol in the same fractions (optional: without it the parts are drawn from above).
SYMBOL_SCHEMA = vol.Any(
    vol.Schema(
        {
            vol.Required("shape"): "rect",
            "x": _FRACTION,
            "z": _FRACTION,
            "w": _SPAN,
            "d": _SPAN,
            vol.Optional("fill", default=False): bool,
        }
    ),
    vol.Schema({vol.Required("shape"): "circle", "x": _FRACTION, "z": _FRACTION, "r": _SPAN}),
    vol.Schema({vol.Required("shape"): "line", "x1": _FRACTION, "z1": _FRACTION, "x2": _FRACTION, "z2": _FRACTION}),
)

ITEM_SCHEMA = vol.Schema(
    {
        vol.Required("id"): _ID,
        # names by language ("de", "en", …); "en" or the first one is the fallback
        vol.Required("name"): vol.All({vol.All(str, vol.Length(min=2, max=5)): _TEXT}, vol.Length(min=1, max=10)),
        vol.Required("size"): vol.All([_METRES], vol.Length(min=3, max=3)),
        vol.Optional("electric", default=False): bool,
        # where it stands: on the floor, on the furniture below it, on a wall (bottom at wall_y) or
        # hanging from the ceiling
        vol.Optional("mount", default="floor"): vol.In(["floor", "surface", "wall", "ceiling"]),
        vol.Optional("wall_y", default=1.0): vol.All(vol.Coerce(float), vol.Range(min=0, max=3)),
        # its top carries other items (like a table or a worktop)
        vol.Optional("surface", default=False): bool,
        # a vehicle: offered for parking spots
        vol.Optional("vehicle", default=False): bool,
        # stairs: when it reaches the floor above, it cuts a stairwell opening into that floor
        vol.Optional("hole", default=False): bool,
        # a lamp: how its light spreads (like the built-in lamp of that kind)
        vol.Optional("light"): vol.In(
            [
                "ceiling",
                "downlight",
                "spot",
                "panel",
                "pendant",
                "floor",
                "uplight",
                "table",
                "wall",
                "strip",
                "bollard",
                "garden",
            ]
        ),
        vol.Required("parts"): vol.All([PART_SCHEMA], vol.Length(min=1, max=60)),
        vol.Optional("symbol"): vol.All([SYMBOL_SCHEMA], vol.Length(max=40)),
        # the library (since 1.23): what the item is, the rooms it is made for, words that find it, and
        # variants of one thing (a table in three lengths) as a family with the variant's name by language
        vol.Optional("group"): _ID,
        vol.Optional("room"): vol.All([_ID], vol.Length(max=12)),
        vol.Optional("tags"): vol.All([vol.All(str, vol.Length(min=1, max=30))], vol.Length(max=12)),
        vol.Optional("family"): _ID,
        vol.Optional("variant"): vol.All({vol.All(str, vol.Length(min=2, max=5)): _TEXT}, vol.Length(min=1, max=10)),
        # slots of the live parts (3.4): the editor links an entity to each (names by language, fitting domains)
        vol.Optional("slots"): vol.All(
            [
                vol.Schema(
                    {
                        vol.Required("id"): vol.All(str, vol.Match(r"^[a-z0-9_]{1,24}$")),
                        vol.Required("name"): vol.All(
                            {vol.All(str, vol.Length(min=2, max=5)): _TEXT}, vol.Length(min=1, max=24)
                        ),
                        vol.Optional("domains"): vol.All(
                            [vol.All(str, vol.Match(r"^[a-z_]{2,30}$"))], vol.Length(max=8)
                        ),
                    }
                )
            ],
            vol.Length(max=8),
        ),
    }
)

# Features this version knows; a pack with a newer one needs a newer HomePlan 3D. The single source of truth
# is the shipped configuration, which enables every feature of the open-source build.
KNOWN_FEATURES: list[str] = [
    str(f["id"])
    for f in OPEN_SOURCE_CONFIG.get("features") or []
    if isinstance(f, dict) and f.get("enabled") and isinstance(f.get("id"), str)
]

# A module: code a local JSON pack carries, run by NeonPlan's module loader. `api` is the loader interface it was
# written for, `kind` where it plugs in. voice: answers spoken questions; stage: draws in the house (water, cards,
# warnings, editor fields)
MODULE_KINDS = ["voice", "stage"]
MODULE_SCHEMA = vol.Schema(
    {
        vol.Required("api"): 1,
        vol.Required("kind"): vol.In(MODULE_KINDS),
        # the module's JavaScript (an ES module with a default export)
        vol.Required("code"): vol.All(str, vol.Length(min=1, max=400_000)),
    }
)

PAYLOAD_SCHEMA = vol.Schema(
    {
        vol.Required("format"): PACK_FORMAT,
        vol.Required("version"): PACK_VERSION,
        vol.Required("id"): _ID,
        vol.Required("name"): _TEXT,
        vol.Required("publisher"): _TEXT,
        # release number of the pack (a newer release of the same id replaces an installed one)
        vol.Optional("release", default=1): vol.All(int, vol.Range(min=1, max=100000)),
        vol.Optional("description", default=""): vol.All(str, vol.Length(max=400)),
        # features the pack carries (a feature pack may have no furniture at all)
        vol.Optional("features", default=[]): vol.All(
            [vol.In(KNOWN_FEATURES)],
            vol.Length(max=10),
        ),
        vol.Required("items"): vol.All([ITEM_SCHEMA], vol.Length(min=0, max=200)),
        # a module (see MODULE_SCHEMA); such a pack usually carries no furniture
        vol.Optional("module"): MODULE_SCHEMA,
    }
)


class PackError(Exception):
    """A pack that cannot be imported; `code` says why."""

    def __init__(self, code: str, detail: str = "") -> None:
        """Keep the reason."""
        super().__init__(f"{code}: {detail}" if detail else code)
        self.code = code
        self.detail = detail


def _unknown_value(err: vol.Invalid) -> bool:
    """Whether a value outside a known list failed: voluptuous says so in its message; Probatio, which checks
    schemas since Home Assistant 2026.9, gives it the code "not_in_list" (pointed out by hohoanganh)."""
    found = getattr(err, "errors", None) or [err]
    # a field this version does not know yet (a part property of a newer pack release) counts the same
    return any(
        getattr(e, "code", None) in ("not_in_list", "extra_key", "extra_keys_not_allowed")
        or "value must be one of" in str(e)
        or "extra keys not allowed" in str(e)
        for e in found
    )


def validate_payload(payload: Any) -> dict[str, Any]:
    """Check a pack's content and fill in defaults; raises PackError."""
    features = payload.get("features") if isinstance(payload, dict) else None
    if isinstance(features, list):
        unknown = [f for f in features if isinstance(f, str) and f not in KNOWN_FEATURES]
        if unknown:
            # a feature newer than this installation: ask for an update, not a cryptic error
            raise PackError("needs_update", ", ".join(unknown))
    # a module written for a newer loader: an update, not a broken pack
    module = payload.get("module") if isinstance(payload, dict) else None
    if isinstance(module, dict) and isinstance(module.get("api"), int) and module["api"] > 1:
        raise PackError("needs_update", f"module api {module['api']}")
    try:
        clean = PAYLOAD_SCHEMA(payload)
    except vol.Invalid as err:
        # a value this version does not know yet (a new item kind of a newer pack release)
        if _unknown_value(err):
            raise PackError("needs_update", str(err)) from err
        raise PackError("invalid_content", str(err)) from err
    ids = [item["id"] for item in clean["items"]]
    if len(ids) != len(set(ids)):
        raise PackError("invalid_content", "item ids must be unique")
    if not ids and not clean["features"] and not clean.get("module"):
        raise PackError("invalid_content", "a pack needs items, features or a module")
    return clean


# bookkeeping fields of a stored pack, not part of its JSON payload
_BOOKKEEPING = ("source", "signature", "imported_at", "approved", "pending")
# fields of old signed packs which carried a licence and an installation binding
_LEGACY_FIELDS = ("licensee", "instance")


def read_pack(text: str) -> tuple[dict[str, Any], dict[str, Any]]:
    """Read a local unsigned JSON pack: (validated payload, raw payload kept as the backup source).

    A bare payload and the older `{"payload": ..., "signature": ...}` envelope are both accepted. A
    signature is ignored; an old buyer name or installation binding is dropped before validation.
    """
    if len(text) > MAX_PACK_SIZE:
        raise PackError("too_large")
    try:
        data = json.loads(text)
    except ValueError as err:
        raise PackError("not_a_pack", "not JSON") from err
    raw = data.get("payload") if isinstance(data, dict) and isinstance(data.get("payload"), dict) else data
    if not isinstance(raw, dict) or raw.get("format") != PACK_FORMAT:
        raise PackError("not_a_pack")
    source = {k: v for k, v in raw.items() if k not in _LEGACY_FIELDS}
    return validate_payload(source), source


def pack_source(entry: dict[str, Any]) -> dict[str, Any]:
    """The payload of a stored or backed-up pack entry, without bookkeeping fields."""
    stored = entry.get("source")
    raw = stored if isinstance(stored, dict) else entry
    return {k: v for k, v in raw.items() if k not in _BOOKKEEPING and k not in _LEGACY_FIELDS}


def module_sha(pack: dict[str, Any] | None) -> str | None:
    """Fingerprint of a pack's module code (what an admin approves), None for a pack without code."""
    module = (pack or {}).get("module")
    if not isinstance(module, dict) or not isinstance(module.get("code"), str):
        return None
    return hashlib.sha256(module["code"].encode("utf-8")).hexdigest()
