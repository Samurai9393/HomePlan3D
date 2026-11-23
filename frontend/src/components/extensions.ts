// The "Extensions" page of the panel: every feature, the installed local packs and the module review.
// It lives in the editor bundle (loaded with it) and is shown to admins only.

import { css, html, LitElement, nothing } from "lit";
import { approveModule, importPack, removePack, reviewModule, type ModuleReview } from "../api.ts";
import { FEATURES, FUN, knownFeature } from "../features.ts";
import type { Building } from "../model.ts";
import { translate, type I18nKey } from "../i18n.ts";
import { packName, type FurniturePack } from "../packs.ts";
import { moduleWaits } from "../modules.ts";
import { controls, tokens } from "../styles.ts";
import type { HomeAssistant } from "../types.ts";

export class Extensions extends LitElement {
  static properties = {
    hass: { attribute: false },
    packs: { attribute: false },
    building: { attribute: false },
    _packMsg: { state: true },
    _moduleMsg: { state: true },
    _review: { state: true },
    _open: { state: true },
  };

  declare hass: HomeAssistant | undefined;
  declare packs: FurniturePack[] | undefined;
  /** The plan (the fun packs keep their settings in it, e.g. the pets). */
  declare building: Building | null | undefined;
  private declare _packMsg: { ok: boolean; text: string } | null;
  private declare _moduleMsg: { ok: boolean; text: string } | null;
  /** The module code an admin is reading before approving it. */
  private declare _review: { pack: FurniturePack; data: ModuleReview | null; error: string | null; busy: boolean } | null;
  /** Long lists opened by the viewer (the installed packs and modules); closed, a bar sums them up. */
  private declare _open: Set<string>;

  constructor() {
    super();
    this._packMsg = null;
    this._moduleMsg = null;
    this._review = null;
    let open: string[] = [];
    try {
      open = JSON.parse(localStorage.getItem("homeplan3d.ext.open") ?? "[]") as string[];
    } catch {
      // nothing remembered
    }
    this._open = new Set(open);
  }

  private toggleOpen(key: string): void {
    const next = new Set(this._open);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._open = next;
    try {
      localStorage.setItem("homeplan3d.ext.open", JSON.stringify([...next]));
    } catch {
      // a private window: it stays open for this visit only
    }
  }

  /** A list summed up in one bar: how many there are, a tap opens the list. */
  private summaryBar(key: string, parts: { n: number; label: string }[]) {
    const open = this._open.has(key);
    return html`<button class="fp3d-sum" aria-expanded=${open} @click=${() => this.toggleOpen(key)}>
      <span class="fp3d-sum-text">${parts.map((p) => html`<b>${p.n}</b> ${p.label}`)}</span>
      <span class="fp3d-sum-caret">${open ? "▾" : "▸"} ${this.t(open ? "ext_hide_list" : "ext_show_list")}</span>
    </button>`;
  }

  private get isAdmin(): boolean {
    return this.hass?.user?.is_admin ?? false;
  }

  private t(key: I18nKey, vars?: Record<string, string | number>): string {
    return translate(this.hass, key, vars);
  }

  protected render() {
    return html`<div class="fp3d-ext">
      <header class="fp3d-ext-head">
        <h2>${this.t("ext_title")}</h2>
        <p class="fp3d-sub">${this.t("ext_intro")}</p>
        <div class="fp3d-ext-actions">
          <a class="fp3d-btn" href="https://github.com/Mastershort/neonplan3d/issues/new/choose" target="_blank" rel="noopener">🐞 ${this.t("help_issue")}</a>
          <a class="fp3d-btn" href="https://github.com/Mastershort/neonplan3d/discussions/categories/ideas" target="_blank" rel="noopener">💡 ${this.t("help_idea")}</a>
        </div>
      </header>
      <section class="fp3d-ext-card">
        <h3>${this.t("ext_pro")}</h3>
        <div class="fp3d-ext-pro">
          ${[...FEATURES, ...FUN].map((f) => {
            const fun = (FUN as readonly string[]).includes(f);
            return html`<div class="fp3d-ext-feature fp3d-ext-on">
              <b>✓ ${this.t((fun ? `fun_name_${f}` : `pro_name_${f}`) as I18nKey)}</b>
              <span class="fp3d-sub">${this.t((fun ? `fun_feature_${f}` : `pro_feature_${f}`) as I18nKey)}</span>
              <span class="fp3d-ext-state">${this.t("ext_active")}</span>
            </div>`;
          })}
        </div>
      </section>
      ${this.renderFun()} ${this.renderPacks()} ${this.renderModules()}
    </div>`;
  }

  /** The fun packs are set in the editor's ⚙ Settings → Fun packs now: a pointer and a button that opens them. */
  private renderFun() {
    return html`<section class="fp3d-ext-card">
      <h3>🎈 ${this.t("fun_title")}</h3>
      <p class="fp3d-sub">${this.t("fun_moved")}</p>
      ${this.isAdmin
        ? html`<button class="fp3d-btn fp3d-primary" @click=${() => this.dispatchEvent(new CustomEvent("open-fun-settings", { bubbles: true, composed: true }))}>🎈 ${this.t("fun_open_settings")}</button>`
        : nothing}
    </section>`;
  }

  private renderPacks() {
    // modules and feature packs have their own section below: here only packs with furniture
    const packs = (this.packs ?? []).filter((p) => !p.module && !p.features?.length);
    const items = packs.reduce((s, p) => s + p.items.length, 0);
    return html`<section class="fp3d-ext-card">
      <h3>${this.t("packs")}</h3>
      ${this.summaryBar("packs", [{ n: packs.length, label: this.t("ext_sum_packs", { items }) }])}
      ${(this._open.has("packs") ? packs : []).map(
        (p) => html`<div class="fp3d-pack">
          <div>
            <b>${packName(p, this.hass?.language ?? "de")}</b>
            <span class="fp3d-sub">${p.module ? this.t("pack_module", { publisher: p.publisher }) : p.features?.length ? this.t("pack_features", { publisher: p.publisher, n: p.features.length }) : this.t("pack_by", { publisher: p.publisher, n: p.items.length })}</span>
            ${p.licensee ? html`<span class="fp3d-sub">${this.t("pack_licensed", { name: p.licensee })}${p.release && p.release > 1 ? ` · v${p.release}` : ""}</span>` : nothing}
            ${(p.features ?? []).some((f) => !knownFeature(f)) ? html`<span class="fp3d-sub fp3d-pack-error">${this.t("pack_needs_update")}</span>` : nothing}
          </div>
          <button class="fp3d-btn fp3d-danger" @click=${() => this.deletePack(p)}>${this.t("pack_remove")}</button>
        </div>`,
      )}

      <label class="fp3d-btn fp3d-primary fp3d-pack-import">
        ${this.t("pack_import")}
        <input type="file" accept=".fp3dpack,.json,application/json" multiple hidden @change=${(e: Event) => this.importPackFile(e)} />
      </label>
      ${this._packMsg ? html`<p class="fp3d-sub ${this._packMsg.ok ? "fp3d-notice" : "fp3d-pack-error"}">${this._packMsg.text}</p>` : nothing}
      <p class="fp3d-sub">${this.t("packs_hint")}</p>
    </section>`;
  }

  /** Modules: signed packs that carry code – and the feature packs, which become modules. */
  private renderModules() {
    const modules = (this.packs ?? []).filter((p) => p.module || p.features?.length);
    const pro = modules.filter((p) => !p.module).length;
    const waiting = modules.filter((p) => moduleWaits(p));
    return html`<section class="fp3d-ext-card">
      <h3>${this.t("settings_modules")}</h3>
      ${this.summaryBar("modules", [
        { n: modules.length - pro, label: this.t("ext_sum_modules") },
        { n: pro, label: this.t("ext_sum_feature_packs") },
      ])}
      ${waiting.length
        ? html`<p class="fp3d-sub fp3d-module-waits">
            ${this.t("modules_waiting", { n: waiting.length })}
            ${waiting.map((p) => html`<button class="fp3d-btn fp3d-primary" @click=${() => void this.openReview(p)}>${packName(p, this.hass?.language ?? "de")}</button>`)}
          </p>`
        : nothing}
      ${!modules.length
        ? html`<p class="fp3d-sub">${this.t("modules_none")}</p>`
        : !this._open.has("modules")
          ? nothing
          : modules.map(
            (p) => html`<div class="fp3d-pack">
              <div>
                <b>${packName(p, this.hass?.language ?? "de")}</b>
                <span class="fp3d-sub">${p.module ? this.t("pack_module", { publisher: p.publisher }) : this.t((p.features ?? []).every((f) => f.startsWith("fun_")) ? "pack_fun_module" : "pack_pro_module", { publisher: p.publisher })}${p.release && p.release > 1 ? ` · v${p.release}` : ""}</span>
                ${(p.features ?? []).some((f) => !knownFeature(f)) ? html`<span class="fp3d-sub fp3d-pack-error">${this.t("pack_needs_update")}</span>` : nothing}
                ${p.licensee ? html`<span class="fp3d-sub">${this.t("pack_licensed", { name: p.licensee })}</span>` : nothing}
                ${p.module && p.module.approved !== true
                  ? html`<span class="fp3d-sub fp3d-module-waits">${this.t("module_waits")}</span>`
                  : p.pending
                    ? html`<span class="fp3d-sub fp3d-module-waits">${this.t("module_update_waits", { from: p.release ?? 1, to: p.pending.release })}</span>`
                    : nothing}
              </div>
              <div class="fp3d-module-actions">
                ${moduleWaits(p)
                  ? html`<button class="fp3d-btn fp3d-primary" @click=${() => void this.openReview(p)}>${this.t(p.module?.approved === true ? "module_review_update" : "module_review")}</button>`
                  : nothing}
                <button class="fp3d-btn fp3d-danger" @click=${() => this.deletePack(p)}>${this.t("pack_remove")}</button>
              </div>
            </div>`,
          )}
      ${this.renderReview()}
      <label class="fp3d-btn fp3d-primary fp3d-pack-import">
        ${this.t("module_import")}
        <input type="file" accept=".fp3dpack,.json,application/json" multiple hidden @change=${(e: Event) => this.importPackFile(e, true)} />
      </label>
      ${this._moduleMsg ? html`<p class="fp3d-sub ${this._moduleMsg.ok ? "fp3d-notice" : "fp3d-pack-error"}">${this._moduleMsg.text}</p>` : nothing}
      <p class="fp3d-sub">${this.t("module_import_hint")}</p>
    </section>`;
  }

  /** Imports one or several local pack files at once; `modules` tells which section's message to set. */
  private async importPackFile(e: Event, modules = false): Promise<void> {
    const input = e.target as HTMLInputElement;
    const files = [...(input.files ?? [])];
    input.value = "";
    if (!files.length || !this.hass) return;
    const done: string[] = [];
    const failed: string[] = [];
    for (const file of files) {
      try {
        const res = await importPack(this.hass, await file.text());
        const text = this.t("pack_imported", { name: res.name, publisher: res.publisher, n: res.items });
        done.push(res.approval ? `${text} ${this.t("module_imported_waits")}` : text);
      } catch (err) {
        const { code, message } = (err ?? {}) as { code?: string; message?: string };
        const key = `pack_error_${code}` as I18nKey;
        const text = this.t(key, { detail: message ?? String(err) });
        failed.push(`${file.name}: ${text === key ? this.t("pack_error_other", { detail: message ?? String(err) }) : text}`);
      }
    }
    if (done.length) this.dispatchEvent(new CustomEvent("packs-changed", { bubbles: true, composed: true }));
    const summary = files.length > 1 ? [this.t("packs_imported_n", { n: done.length, total: files.length })] : [];
    const msg = { ok: failed.length === 0, text: [...summary, ...done, ...failed].join(" · ") };
    if (modules) this._moduleMsg = msg;
    else this._packMsg = msg;
  }

  /** Fetches the code an admin is asked to approve: the waiting update when there is one, else the installed code. */
  private async openReview(pack: FurniturePack): Promise<void> {
    if (!this.hass) return;
    this._open = new Set([...this._open, "modules"]);
    this._review = { pack, data: null, error: null, busy: true };
    void this.updateComplete.then(() => this.renderRoot.querySelector(".fp3d-review")?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
    try {
      const data = await reviewModule(this.hass, pack.id, pack.module?.approved === true && !!pack.pending);
      this._review = { pack, data, error: null, busy: false };
    } catch (err) {
      const { code, message } = (err ?? {}) as { code?: string; message?: string };
      this._review = { pack, data: null, error: code === "unauthorized" ? this.t("module_review_admin") : (message ?? String(err)), busy: false };
    }
  }

  private async approveReview(): Promise<void> {
    const review = this._review;
    if (!this.hass || !review?.data) return;
    this._review = { ...review, busy: true };
    try {
      await approveModule(this.hass, review.pack.id, review.data.sha);
      this._review = null;
      this._moduleMsg = { ok: true, text: this.t("module_approved", { name: packName(review.pack, this.hass.language ?? "de") }) };
      this.dispatchEvent(new CustomEvent("packs-changed", { bubbles: true, composed: true }));
    } catch (err) {
      const { code, message } = (err ?? {}) as { code?: string; message?: string };
      this._review = { ...review, busy: false, error: code === "unauthorized" ? this.t("module_review_admin") : (message ?? String(err)) };
    }
  }

  /** The code to read before it runs: who made it, which version, how big, its fingerprint – and the code itself. */
  private renderReview() {
    const review = this._review;
    if (!review) return nothing;
    const d = review.data;
    return html`<div class="fp3d-review" role="dialog" aria-modal="true">
      <h4>${this.t("module_review_title", { name: packName(review.pack, this.hass?.language ?? "de") })}</h4>
      ${d
        ? html`<p class="fp3d-sub">${this.t("module_review_meta", { publisher: d.publisher, release: d.release, kb: Math.max(1, Math.round(d.code.length / 1024)), sha: d.sha })}</p>
            <p class="fp3d-sub">${this.t("module_review_note")}</p>
            <pre class="fp3d-review-code">${d.code}</pre>`
        : review.busy
          ? html`<p class="fp3d-sub">…</p>`
          : nothing}
      ${review.error ? html`<p class="fp3d-sub fp3d-pack-error">${review.error}</p>` : nothing}
      <div class="fp3d-module-actions">
        <button class="fp3d-btn" @click=${() => (this._review = null)}>${this.t("cancel")}</button>
        <button class="fp3d-btn fp3d-primary" ?disabled=${!d || review.busy} @click=${() => void this.approveReview()}>${this.t("module_approve")}</button>
      </div>
    </div>`;
  }

  private async deletePack(pack: FurniturePack): Promise<void> {
    if (!this.hass || !confirm(this.t("pack_remove_confirm", { name: packName(pack, this.hass?.language ?? "de") }))) return;
    await removePack(this.hass, pack.id);
    this._packMsg = null;
    this.dispatchEvent(new CustomEvent("packs-changed", { bubbles: true, composed: true }));
  }

  static styles = [
    tokens,
    controls,
    css`
      .fp3d-sum {
        display: grid;
        gap: 6px;
        width: 100%;
        margin: 4px 0 8px;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--fp3d-line, rgba(120, 190, 255, 0.22));
        background: rgba(4, 8, 18, 0.35);
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .fp3d-sum-text {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 14px;
        font-size: 0.92em;
      }
      .fp3d-sum-caret {
        color: var(--fp3d-muted, #8ea3c4);
        font-size: 0.85em;
      }
      :host {
        display: block;
        overflow: auto;
      }
      .fp3d-ext {
        max-width: 920px;
        margin: 0 auto;
        padding: 20px 16px 40px;
        display: grid;
        gap: 16px;
      }
      .fp3d-ext-head {
        display: grid;
        gap: 8px;
        justify-items: start;
      }
      .fp3d-ext-head a {
        text-decoration: none;
      }
      .fp3d-ext-actions,
      .fp3d-ext-links {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .fp3d-ext-head h2 {
        margin: 0;
        font-size: 22px;
      }
      .fp3d-ext-card {
        padding: 14px 16px;
        border: 1px solid var(--fp3d-line);
        border-radius: 14px;
        background: var(--fp3d-chrome);
      }
      .fp3d-ext-card h3 {
        margin: 0 0 8px;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--fp3d-soft);
      }
      .fp3d-ext-pro {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 10px;
      }
      .fp3d-ext-feature {
        display: grid;
        gap: 6px;
        align-content: start;
        padding: 12px;
        border: 1px solid var(--fp3d-accent);
        border-radius: 12px;
      }
      .fp3d-ext-state {
        color: var(--fp3d-accent);
        font-weight: 600;
        font-size: 13px;
      }
      .fp3d-sub {
        color: var(--fp3d-soft);
        font-size: 13px;
      }
      .fp3d-notice {
        color: var(--fp3d-accent);
      }
      .fp3d-pack {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid var(--fp3d-line);
      }
      .fp3d-pack div {
        display: grid;
        gap: 2px;
      }
      .fp3d-pack-import {
        display: block;
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
      }
      .fp3d-pack-error {
        color: var(--fp3d-danger);
      }
      .fp3d-module-waits {
        color: var(--fp3d-accent);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
      }
      .fp3d-module-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: flex-end;
      }
      .fp3d-review {
        margin: 10px 0;
        padding: 12px;
        border: 1px solid var(--fp3d-accent);
        border-radius: 10px;
        display: grid;
        gap: 8px;
      }
      .fp3d-review h4 {
        margin: 0;
      }
      .fp3d-review .fp3d-sub {
        overflow-wrap: anywhere;
      }
      .fp3d-review-code {
        max-height: 50vh;
        overflow: auto;
        margin: 0;
        padding: 8px;
        font-size: 11px;
        line-height: 1.4;
        white-space: pre-wrap;
        word-break: break-word;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 6px;
      }
    `,
  ];
}

if (!customElements.get("fp3d-extensions")) customElements.define("fp3d-extensions", Extensions);
