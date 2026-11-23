"""Opt-in local diagnostics: anonymous usage counts and error messages.

Nothing leaves the installation. When an admin switches diagnostics on in the editor, browser views
contribute device aggregates and scrubbed error messages of our own bundles. The editor shows the exact
JSON that is kept in Home Assistant's `.storage`; switching off or clearing deletes it. The id is a
random local label made on switch-on, not Home Assistant's instance id.

Not to be confused with Home Assistant's own diagnostics platform (diagnostics.py), which this
integration does not have.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
import re
import sys
from typing import Any
import uuid

from homeassistant.const import __version__ as HA_VERSION
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.loader import async_get_integration

from .const import DOMAIN, STORAGE_KEY_DIAGNOSTICS, STORAGE_VERSION
from .packs import ENABLED_FEATURES

PAYLOAD_VERSION = 1
MAX_CLIENTS = 10
MAX_ERRORS = 20
MAX_MESSAGE = 200
# what the frontend may name: device classes, GPU tiers and views
DEVICES = ("tablet", "phone", "desktop")
GPU_TIERS = ("low", "mid", "high")
_VIEW = re.compile(r"^[a-z0-9_]{1,20}$")
# browser and OS: a name and a major version, nothing else
_LABEL = re.compile(r"^[A-Za-z0-9 ._-]{1,40}$")
_WHERE = re.compile(r"^homeplan3d[\w-]*\.js(:\d+){0,2}$")
_VERSION = re.compile(r"^[0-9A-Za-z.+-]{1,20}$")
_SAVE_DELAY = 120


# ---------------------------------------------------------------------------- scrubbing

# Home Assistant domains whose "domain.object_id" is an entity id (other dotted words in an error are
# mostly code, such as "this.viewer"; one with an underscore in the object id is treated as an entity too)
_HA_DOMAINS = (
    "alarm_control_panel|automation|binary_sensor|button|calendar|camera|climate|counter|cover|date|datetime|"
    "device_tracker|event|fan|group|humidifier|image|input_boolean|input_button|input_datetime|input_number|"
    "input_select|input_text|lawn_mower|light|lock|media_player|notify|number|person|remote|scene|script|select|"
    "sensor|siren|sun|switch|text|time|timer|todo|update|vacuum|valve|water_heater|weather|zone"
)
_SCRUB: tuple[tuple[re.Pattern[str], str], ...] = (
    (re.compile(r"\b(?:https?|wss?|file|blob|data|ftp):[^\s'\"<>)\]]*", re.IGNORECASE), "<url>"),
    (re.compile(r"\beyJ[\w-]+\.[\w-]+\.[\w-]+"), "<token>"),
    (re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+"), "<email>"),
    (re.compile(r"\b\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?\b"), "<ip>"),
    (re.compile(r"\b[0-9a-f]{1,4}(?::[0-9a-f]{0,4}){2,7}\b", re.IGNORECASE), "<ip>"),
    (re.compile(rf"\b(?:{_HA_DOMAINS})\.[a-z0-9_]+\b"), "<entity>"),
    (re.compile(r"\b[a-z][a-z0-9_]*\.[a-z0-9]*_[a-z0-9_]*\b"), "<entity>"),
    (re.compile(r"\b[0-9a-f]{16,}\b", re.IGNORECASE), "<id>"),
)


def scrub(text: Any) -> str:
    """An error message without anything that may point at the user: URLs, tokens, e-mail and IP
    addresses, entity ids and long hex ids; at most MAX_MESSAGE characters."""
    out = str(text or "")
    for pattern, repl in _SCRUB:
        out = pattern.sub(repl, out)
    out = re.sub(r"\s+", " ", out).strip()
    return out[:MAX_MESSAGE]


# ---------------------------------------------------------------------------- aggregates


def _label(value: Any) -> str:
    text = str(value or "").strip()
    return text if _LABEL.match(text) else "other"


def clean_client(raw: Mapping[str, Any]) -> dict[str, Any]:
    """One client's aggregate as the frontend sent it, reduced to the allowed fields and values."""
    device = raw.get("device") if raw.get("device") in DEVICES else "desktop"
    fps = raw.get("fps")
    scale = raw.get("render_scale")
    raw_views = raw.get("views")
    views: Mapping[Any, Any] = raw_views if isinstance(raw_views, Mapping) else {}
    return {
        "device": device,
        "browser": _label(raw.get("browser")),
        "os": _label(raw.get("os")),
        "low_end": raw.get("low_end") if isinstance(raw.get("low_end"), bool) else None,
        "render_scale": round(float(scale), 2) if isinstance(scale, int | float) and 0 < scale <= 4 else None,
        "fps": round(float(fps), 1) if isinstance(fps, int | float) and 0 < fps <= 1000 else None,
        "fps_n": int(raw.get("fps_n") or 0) if isinstance(raw.get("fps_n"), int) and raw["fps_n"] > 0 else 0,
        "gpu_tier": raw.get("gpu_tier") if raw.get("gpu_tier") in GPU_TIERS else None,
        "views": {
            k: int(v)
            for k, v in list(views.items())[:20]
            if isinstance(k, str) and _VIEW.match(k) and isinstance(v, int) and 0 < v < 100_000
        },
    }


def merge_client(clients: list[dict[str, Any]], raw: Mapping[str, Any]) -> list[dict[str, Any]]:
    """Add a client's aggregate to the day's list: one entry per device class, browser and OS (at most
    MAX_CLIENTS), views summed, frame rates averaged over their samples."""
    new = clean_client(raw)
    key = (new["device"], new["browser"], new["os"])
    out = [dict(c, views=dict(c.get("views", {}))) for c in clients]
    match = next((c for c in out if (c["device"], c["browser"], c["os"]) == key), None)
    if match is None:
        if len(out) < MAX_CLIENTS:
            out.append(new)
        return out
    for field in ("low_end", "render_scale", "gpu_tier"):
        if new[field] is not None:
            match[field] = new[field]
    if new["fps"] is not None and new["fps_n"]:
        n_old = int(match.get("fps_n") or 0) if match.get("fps") is not None else 0
        total = n_old + new["fps_n"]
        match["fps"] = round(((match.get("fps") or 0) * n_old + new["fps"] * new["fps_n"]) / total, 1)
        match["fps_n"] = total
    for view, count in new["views"].items():
        if view in match["views"] or len(match["views"]) < 20:
            match["views"][view] = match["views"].get(view, 0) + count
    return out


def clean_error(raw: Mapping[str, Any]) -> dict[str, Any] | None:
    """One error as the frontend sent it, scrubbed again here; None when it is not ours or empty."""
    msg = scrub(raw.get("msg"))
    where = str(raw.get("where") or "")
    if not msg or not _WHERE.match(where):
        return None
    version = str(raw.get("version") or "")
    count = raw.get("count")
    return {
        "msg": msg,
        "where": where,
        "count": max(1, min(int(count), 10_000)) if isinstance(count, int) else 1,
        "version": version if _VERSION.match(version) else "unknown",
    }


def merge_errors(errors: list[dict[str, Any]], raws: Iterable[Mapping[str, Any]]) -> list[dict[str, Any]]:
    """Add errors to the list: the same message at the same place counts up; at most MAX_ERRORS."""
    out = [dict(e) for e in errors]
    for raw in raws:
        err = clean_error(raw)
        if err is None:
            continue
        key = (err["msg"], err["where"], err["version"])
        match = next((e for e in out if (e["msg"], e["where"], e["version"]) == key), None)
        if match is not None:
            match["count"] = min(match["count"] + err["count"], 1_000_000)
        elif len(out) < MAX_ERRORS:
            out.append(err)
    return out


# ---------------------------------------------------------------------------- payload


def plan_counts(building: Mapping[str, Any]) -> dict[str, int]:
    """How big the plan is, as counts only."""
    floors = building.get("floors") or []
    placements = [p for f in floors for p in f.get("placements") or []]
    return {
        "floors": len(floors),
        "rooms": sum(len(f.get("rooms") or []) for f in floors),
        "furniture": sum(len(f.get("furniture") or []) for f in floors),
        "devices_linked": len(placements),
        "outdoor": sum(len(f.get("outdoor") or []) for f in floors),
        "cameras": sum(1 for p in placements if str(p.get("entity_id") or "").startswith("camera.")),
    }


def pack_ids(packs: Iterable[Mapping[str, Any]]) -> list[str]:
    """Ids of the installed local packs."""
    return sorted({str(p.get("id")) for p in packs if str(p.get("id") or "").strip()})


def build_payload(
    state: Mapping[str, Any],
    *,
    building: Mapping[str, Any],
    packs: Iterable[Mapping[str, Any]],
    neonplan: str,
    ha: str,
    lang: str | None,
) -> dict[str, Any]:
    """The local preview: counts, installed pack ids and scrubbed errors, with no names or geometry."""
    clients = [{k: v for k, v in c.items() if k != "fps_n"} for c in state.get("clients") or []]
    return {
        "v": PAYLOAD_VERSION,
        "id": state.get("id"),
        "neonplan": neonplan,
        "ha": ha,
        "python": f"{sys.version_info.major}.{sys.version_info.minor}",
        "lang": (lang or "en").split("-")[0][:5].lower(),
        "packs": pack_ids(packs),
        "features": sorted(ENABLED_FEATURES),
        "plan": plan_counts(building),
        "clients": clients,
        "errors": [dict(e) for e in state.get("errors") or []],
    }


def _empty_state() -> dict[str, Any]:
    return {"enabled": False, "id": None, "clients": [], "errors": []}


class DiagnosticsReporter:
    """The local setting, its random id and the aggregates collected while it is on."""

    def __init__(self, hass: HomeAssistant, data: Any) -> None:
        """Keep Home Assistant and the plan's data (FloorplanData: building and packs)."""
        self.hass = hass
        self.data = data
        self.state: dict[str, Any] = _empty_state()
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_DIAGNOSTICS)
        self._version = "dev"

    @property
    def enabled(self) -> bool:
        """Whether the admin switched local diagnostics on."""
        return bool(self.state.get("enabled"))

    async def async_load(self) -> None:
        """Load the stored state and our version."""
        stored = await self._store.async_load()
        if isinstance(stored, dict):
            self.state = {**_empty_state(), **stored}
        try:
            self._version = str((await async_get_integration(self.hass, DOMAIN)).version or "dev")
        except Exception:
            self._version = "dev"

    def payload(self) -> dict[str, Any]:
        """The local preview of what has been collected."""
        return build_payload(
            self.state,
            building=self.data.building,
            packs=self.data.packs,
            neonplan=self._version,
            ha=HA_VERSION,
            lang=self.hass.config.language,
        )

    def status(self) -> dict[str, Any]:
        """The setting, the local preview and whether there is anything to clear, for the editor."""
        return {
            "enabled": self.enabled,
            "can_delete": bool(self.state.get("clients") or self.state.get("errors")),
            "preview": self.payload(),
        }

    def _save(self) -> None:
        self._store.async_delay_save(lambda: self.state, _SAVE_DELAY)

    async def async_set_enabled(self, on: bool) -> None:
        """Start or stop collecting locally; clearing on switch-off drops the aggregates and the id."""
        if on == self.enabled:
            return
        state = _empty_state()
        if on:
            state.update(enabled=True, id=str(uuid.uuid4()))
        self.state = state
        await self._store.async_save(self.state)

    def add_client(self, client: Mapping[str, Any] | None, errors: Iterable[Mapping[str, Any]] | None) -> None:
        """Take a frontend's aggregate and errors (ignored while switched off)."""
        if not self.enabled:
            return
        if client:
            self.state["clients"] = merge_client(self.state.get("clients") or [], client)
        if errors:
            self.state["errors"] = merge_errors(self.state.get("errors") or [], errors)
        self._save()

    async def async_delete(self) -> None:
        """Clear the locally collected data, forget the id and switch off."""
        self.state = _empty_state()
        await self._store.async_save(self.state)
