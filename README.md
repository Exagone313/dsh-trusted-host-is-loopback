<!--
SPDX-FileCopyrightText: 2026 Elouan Martinet <exa@elou.world>

SPDX-License-Identifier: MIT
-->

# dsh-trusted-host-is-loopback

[![npm version](https://img.shields.io/npm/v/@exagone313/dsh-trusted-host-is-loopback)](https://www.npmjs.com/package/@exagone313/dsh-trusted-host-is-loopback)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A dsh bundle that makes the authenticated Web UI page count as loopback, so
Host-backed settings (Settings → Models, the first-run API-key step, the preview
notice) work when dsh is reached through a reverse proxy instead of `127.0.0.1`.

dsh already authenticates every browser that reaches the Web UI — the
Host/Origin trust fence declared with `--trusted-host` / `trustedHosts`, plus
the browser-session cookie — but it still classifies a non-loopback page as
remote and caps Host-backed features. This bundle flips that one client-side
flag. `ownsHost` is a classification only: the server's authentication and its
Host/Origin fence are untouched.

## Install

```sh
dsh plugin --profile web add @exagone313/dsh-trusted-host-is-loopback
```

Restart dsh afterwards.

## Remove

```sh
dsh plugin --profile web remove @exagone313/dsh-trusted-host-is-loopback
```

Restart dsh afterwards.

## Notes

- No configuration.
- The Host/Origin trust fence is the boundary: only authorities you declared
  trusted should reach the Web UI. See [SECURITY.md](SECURITY.md).
- The `webserver/index-inject` hook belongs to
  `@deepseek-ai/dsh-host-webserver`; a future rename would require a plugin
  update.
- Tested against dsh `0.2.0-rc.2`.

## License

[MIT](LICENSE)
