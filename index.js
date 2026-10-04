// SPDX-FileCopyrightText: 2026 Elouan Martinet <exa@elou.world>
//
// SPDX-License-Identifier: MIT

/**
 * Make the dsh Web client treat its authenticated page as loopback.
 *
 * The Host already authenticates every browser that reaches the Web UI (the
 * Host/Origin trust fence plus the browser-session cookie), so the page does
 * not need to prove it is on the same machine. dsh still caps Host-backed
 * settings and local-machine features to loopback pages by setting
 * `ownsHost: false` on the client transport; this plugin contributes an inline
 * script to the served index that flips that one flag back on.
 *
 * `ownsHost` is a client-side classification only: it changes which features
 * the already-authenticated page may use, and does not alter the server's
 * authentication or its Host/Origin fence.
 *
 * @module dsh-trusted-host-is-loopback
 */

/** Stable Cordis plugin name. */
export const name = "trusted-host-is-loopback";

/** The webserver owns the index-render hook this plugin contributes to. */
export const inject = ["webServer"];

/**
 * Runs in the page `<head>` before the deferred app bundle. Merges rather than
 * replaces so a shell-provided transport (`loadBundle`, `streamBaseUrl`) keeps
 * its members.
 */
const OWNS_HOST_SCRIPT =
  "globalThis.__DSH_TRANSPORT__ = Object.assign(globalThis.__DSH_TRANSPORT__ || {}, { ownsHost: true })";

/**
 * Contribute the inline script on every index render.
 * @param ctx - Host plugin context carrying the webserver service.
 */
export function apply(ctx) {
  ctx.on("webserver/index-inject", (table) => {
    table.push({ kind: "script", placement: "head", text: OWNS_HOST_SCRIPT });
  });
}
