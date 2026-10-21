# Lyceum: operating brief for AI sessions in this repository

Read these before doing anything, every session, in this order. Do not work from memory, from a summary or from an earlier conversation: the facts live in these files and they change.

1. [docs/lyceum-upgrade-plan.md](docs/lyceum-upgrade-plan.md), the master plan. Section 0 holds the rules, Sections 4, 4.1 and 4.2 the loop, the story and the roles, Section 6 the tokens, Section 7 the characters, Section 17 the packages and the session prompts.
2. [docs/competition/grand-final-2026.md](docs/competition/grand-final-2026.md), the date, the format, the criteria and what is still unconfirmed.
3. [docs/design/colour-scheme-2026-10-22.png](docs/design/colour-scheme-2026-10-22.png), the palette and type poster, with [docs/design/colour-scheme-audit-2026-10-22.md](docs/design/colour-scheme-audit-2026-10-22.md), the WCAG audit that says where each colour may appear; together they are the source of `src/theme/tokens.ts`.
4. [docs/research/](docs/research/), the dated research notes. Every figure on any surface comes from one of them or from `docs/claims.md` once it exists.
5. [DECISIONS.md](DECISIONS.md), why things are the way they are, and [docs/lyceum-improvement-plan.md](docs/lyceum-improvement-plan.md) Section 30 for the dated execution records and the work-package numbers W00 to W17.
6. The code a package touches, read in full before it is edited.

## Do not assume

If a fact is not in one of those files or in the code, say that it is not, then verify it or ask. Never fill a gap from memory. Weekdays are computed, not guessed. Counts come from running the command. Hex values come from `tokens.ts`. A claim about what works comes from a check that ran in this session. A memory file is a pointer to these references, never a source of facts.

## Rules that bind every session

- No en or em dashes anywhere: code strings, docs, captions, commit messages, slides.
- Honesty labels on every surface: real, prototype, illustrative, planned. Synthetic data says synthetic. A door is planned until a pilot tenant runs it.
- Colours and type come from `src/theme/tokens.ts` only; fonts are bundled, never fetched at runtime.
- No model-written text inside shipped artefacts before the pilot; model streaming is optional, labelled, and never moves a number.
- Verify before claiming: `npm run typecheck`, `npm run prove:all`, `npm run build`, the four smokes (`npm run smoke`, `smoke:integrity`, `smoke:workspace`, `smoke:curriculum`) and `node scripts/generate-guide.mjs --check`.
- Commit only when the owner asks. The team repository is reached only through `node scripts/team.mjs`; never `git push` between the two repositories by hand.
- Scan any third-party skill, plugin or MCP server with SkillSpector before first use (the rule is in the owner's global CLAUDE.md).
- Characters never appear on errors, billing or security moments, and nothing animates in the workspace without a real request or a saved record.
- Codex (`gpt-6-astra`) reviews plans and documents in a read-only sandbox with the files embedded through stdin; it never writes code into this repository, and its claims are verified before any is kept.

## Where things are

```text
docs/lyceum-upgrade-plan.md   the master plan (22 October 2026)
docs/competition/             the Grand Final facts
docs/design/                  the colour and type poster
docs/research/                dated research notes with sources
docs/review/                  Codex reviews, kept as written
docs/history/                 superseded documents, screenshots and presentations
src/lib/                      the deterministic core
src/app/                      store, roles, journey, runs
src/ui/                       primitives, shell, screens, and the characters once drawn
src/prove-*.ts                the checks; scripts/*-smoke.mjs the browser runs
server/                       the local API: parsing, board collection, optional model streaming
scripts/team.mjs              the only way to the team repository
```
