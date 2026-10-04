<!--
SPDX-FileCopyrightText: 2026 Elouan Martinet <exa@elou.world>

SPDX-License-Identifier: MIT
-->

# Security policy

## Reporting a vulnerability

Report vulnerabilities privately through GitHub, from the repository's
**Security** tab → **Report a vulnerability**. There is no bounty programme and
no guaranteed response time; fixes ship as a normal release.

## Supported versions

Only the latest release is supported and fixes are not backported.

## Trust model

This bundle makes the Web client classify its page as loopback
(`ownsHost: true`), which re-enables Host-backed settings on an address dsh
would otherwise treat as remote. That is a deliberate client-side relaxation,
not a fix for a server-side flaw.

- **The server boundary is unchanged.** dsh still authenticates every browser
  through the Host/Origin trust fence and the browser-session cookie; the bundle
  changes neither.
- **The trust fence is load-bearing.** Only authorities declared trusted
  (`--trusted-host` / `trustedHosts`) are served at all, and the browser session
  gates the rest. Never expose the dsh Web port to an untrusted network, and
  never declare a host trusted that is not behind your own authentication.
- **No secrets.** The bundle handles no credentials; it injects one inline
  script into the served index.
- **No server access.** It is a Host bundle only: `inject = ['webServer']` and
  one `webserver/index-inject` row.

Anyone who can load the authenticated page gets the elevated surface the
loopback cap previously withheld. Treat the page origin exactly as you would
`127.0.0.1`.
