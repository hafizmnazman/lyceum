# Track A run log

The autonomous run of Track A (docs/lyceum-upgrade-plan.md Section 17.5). Times are Kuala Lumpur time (GMT+8). To resume after an interruption, start at the first package below that has no "ended" line, and re-read Section 17.5 and this file first.

## Needs the owner

None yet.

## Codex queue

The owner's Codex limit was reached on 22 October and resets within hours. A Codex run also sends the embedded files to OpenAI, which this run's rules forbid without the owner's go-ahead, so no package here waits on Codex. Reviews worth running once the limit resets and the owner approves are listed here with their files and question; each is `codex exec --sandbox read-only` with the files on stdin and the report saved under `docs/review/`.

None queued yet.

## Packages

### A0, checkpoint and the branch

- 2026-10-22 03:25 started.
- 03:25 checkpoint: committed `f5b26a4` "Checkpoint before the overhaul" and tagged `pre-overhaul`.
- 03:26 took `feature/evidence-snapshots` (one commit, 18 files); one conflict in DECISIONS.md, resolved by keeping both entries (docs/decisions.md).
- 03:27 environment: `node_modules` had no `.bin` folder and lacked two declared packages; `npm install` from the unchanged lockfile restored them.
- 03:27 check: `npm run typecheck` passed.
- 03:28 check: `npm run prove:all` 166 passed, 0 failed, fifteen suites.
- 03:28 check: `npm run build` passed.
- 03:29 check: `npm run smoke` 14 of 14 passed.
- 03:30 check: `node scripts/check-backup-migration.mjs` 16 of 16 passed (schema 4 and schema 3 restores).
- 03:31 docs/as-built.md created with the stamp, the A0 table and the four follow-ups for A2a.
- 03:32 ended; committed `1c1cdd3` "A0: take the evidence snapshots branch and prove the backup migration".
- 03:36 check after the commit: the dash scan (new `scripts/dash-scan.mjs`) found no en or em dash in 164 text files, apart from five em dashes inside one verbatim Stripe posting in the saved sample, which stays as published (docs/decisions.md). The script is committed with A1.

### A1, theme and shell

- 2026-10-22 03:37 started.
- 03:40 installed `@fontsource-variable/bricolage-grotesque`, `plus-jakarta-sans` and `jetbrains-mono` 5.3.0 (dev dependencies; the plan names Fontsource).
- 03:49 `tokens.ts` rewritten as the source; `scripts/gen-theme-css.mjs` writes the `:root` block, the `@font-face` rules, the fonts in `public/fonts/` and the preloads.
- 03:50 338 old variable uses migrated by context; primitives, the shell, the loop rail and the hash routes rebuilt; the landing and sign-in screens restyled.
- 03:58 `scripts/contrast-check.mjs` written; negative test caught a planted hex, `rgba()`, bare pptx colour and lime rule.
- 04:02 check: `npm run smoke:workspace` failed at the Guide page: the floating Play demo pill covered the "All roles" filter. Fixed by moving the signed-in tour button into the Guide page (docs/decisions.md).
- 04:03 check: `npm run smoke:integrity` failed: it clicked `nav-studio`, now reached through the rail. The smoke now clicks `rail-course` and `rail-learn`.
- 04:11 106 inline font sizes moved onto the type scale; counters to mono 12; the wordmark to 28 px.
- 04:13 check: `npm run typecheck` passed.
- 04:13 check: `npm run build` passed.
- 04:13 check: `node scripts/contrast-check.mjs` passed (61 ratios, 172 files).
- 04:13 check: `npm run smoke:workspace` 7 of 7 passed.
- 04:13 check: `npm run prove:all` 166 passed; `npm run smoke` 14 of 14; `smoke:integrity` 2 of 2; `smoke:curriculum` 5 of 5; guide check matches; dash scan clean.
- 04:15 ended; committed as "A1: tokens as the source, bundled fonts, restyled primitives, the loop rail and the contrast check".

### A3, mascots v1

- (next)

## What is left

A3, A2a, A2b, A4, A5, A6, A7 (the parts that need no human voice), A8, in that order.
