<!--
SPDX-FileCopyrightText: 2026 Elouan Martinet <exa@elou.world>

SPDX-License-Identifier: MIT
-->

# AGENTS.md

- **Build** — nothing to compile; `index.js` and `cordis.patch.yml` ship as-is.
  `npm pack` produces the tarball.
- **Lint** — `npm run fmt-check` (formatting; `npm run fmt` rewrites);
  `REUSE_ENCODING_MODULE=chardet reuse lint` (license headers).
- **Commit** — one logical change per commit, single-line message; keep the
  `cordis.patch.yml` row `name` equal to `package.json`'s `name`; add no
  dependencies, build step, or tests.
