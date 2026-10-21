# Track A run log

The autonomous run of Track A (docs/lyceum-upgrade-plan.md Section 17.5). Times are Kuala Lumpur time (GMT+8). To resume after an interruption, start at the first package below that has no "ended" line, and re-read Section 17.5 and this file first.

## Needs the owner

1. **The doors strip: official marks or neutral icons?** (raised 2026-10-22 06:16, A2b) Plan Section 17.1 asks for the landing page's doors strip "with the official marks" and a `docs/brand-use.md` listing each mark and its source. A2b shipped neutral Lucide icons with each door's name and a Planned tag, because the third-party marks (Claude, ChatGPT, Copilot, Gemini, Teams, the LMS) carry usage terms nobody has checked, and showing them beside doors that are not built could read as an endorsement or an integration. To switch: approve the marks and their sources (from each brand's press or brand page), and the strip and `docs/brand-use.md` follow in one change (`DOORS` in `src/ui/screens/Landing.tsx`). Nothing else waits on this.

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
- 04:15 ended; committed `1849d25` "A1: tokens as the source, bundled fonts, restyled primitives, the loop rail and the contrast check".

### A3, mascots v1

- 2026-10-22 04:16 started; read the Kancil SVG in the Shenzhen intro (`submission/production/intro/intro.html`) for the layered approach.
- 04:18 host's working name chosen: Tualang (docs/decisions.md).
- 04:22 session-only request registry added to the store; the fetch, the parse and the pack render are tracked.
- 04:23 `src/app/moods.ts` and `src/prove-moods.ts` written; 8 of 8 passed; a mutation test (Scout forced to working) failed 4, as it should.
- 04:24 host drawn and previewed on white, mint and forest at 160, 64 and 28 px; first draft fixed (arms hidden behind the crown; the dark side swamped the crown, replaced by a rim).
- 04:27 the seven helpers drawn and previewed; Folio's cover label read as a mouth and Scout's strap crossed the face, both removed.
- 04:28 `mark.tsx`, the Mascot primitive and `useCourseMoods` written; `scripts/gen-mascots.mjs` wrote 35 SVGs, 72 PNGs and the manifest.
- 04:33 check: `npm run typecheck` passed.
- 04:33 check: `npm run prove:all` 174 passed, 0 failed, sixteen suites.
- 04:34 check: `node scripts/gen-mascots.mjs --check`, `gen-theme-css.mjs --check` and the contrast check passed (35 generated SVGs, all token colours).
- 04:34 check: `npm run build` passed; the four smokes 14, 2, 7 and 5 of 5 passed; guide check matches; dash scan clean.
- 04:37 ended; committed `13c9851` "A3: the host and seven helpers in code, moods from records, the mark as favicon and app icon".

### A2a, Watch, Report, Decide

- 2026-10-22 04:37 started, right after the A3 commit; read Sections 4, 4.1, 4.2, 5 and 8, `EvidenceResearch.tsx`, `EvidenceWorkspace.tsx`, `journey.ts`, `runs.ts`, `types.ts` and the store.
- 04:45 decision logged: the term window by time (docs/decisions.md).
- 04:46 decision logged: decide and adopt mapped onto today's hats.
- Before 05:35, found by the checks and fixed: the teaching proof wanted a guide for each new section (four added); the curriculum smoke's click on a disclosure landed on a passing toast (the smokes now toggle a disclosure through the DOM); the workspace smoke still drove the old tabs, and a scripted replace had turned a `$$` into `$` (fixed by hand); the Course step's address carried a `/course` suffix the plan does not have; the Studio unmounted an open editor on a step change (the four steps stay mounted again).
- 05:35 check: `npm run typecheck` passed.
- 05:35 check: `npm run prove:all` 178 passed, 0 failed, sixteen suites.
- 05:35 check: dash scan (225 files), contrast check, guide check, theme check, mascot check and `check-backup-migration.mjs` passed.
- 05:36 check: `npm run build` passed.
- 05:36 check: `npm run smoke` 14 of 14 and `smoke:integrity` 2 of 2 passed.
- 05:37 check: `npm run smoke:workspace` 7 of 7 and `smoke:curriculum` 6 of 6 passed.
- 05:39 check: `npm run smoke` 15 of 15 after the tour gained the snapshot freeze (A0 follow-up 3).
- 05:40 eight decisions logged (docs/decisions.md); the A2a section of docs/as-built.md written.
- 05:41 check: after the last proof and document edits, `npm run typecheck`, `npm run prove:all` (178 passed), `npm run build`, `smoke:curriculum` (6 of 6), the dash scan, the contrast check and the guide check passed again.
- 05:43 the refreshed screenshot showed Update saying "no change this term" after a version was adopted following a retain decision; the count and the notice now say a version was adopted after the retain, and an adoption at the same moment as the decision is ordered by the event log (docs/decisions.md, the Update entry).
- 05:45 check: `npm run prove:all` passed; `npm run build` passed; `npm run smoke` 15 of 15, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6.
- 05:46 ended; committed `c4dd51d` "A2a: Watch and Report with its sub-rail, the decision record and Decide, the event log, and the receipts ring scoped to the term".

### A2b, the remaining loop screens, Home, How it works, Landing

- 2026-10-22 05:46 started; re-read Section 17.5 and this log, then Sections 2, 4, 5, 6 and 9.8. `docs/claims.md` does not exist yet; A2b creates it from the dated research notes.
- Before 06:12, built and checked as it went: Learn as its own screen with results bound to the taught version, Course, Update, Teach, History, Home, How it works with the loop graphic, the landing page and `docs/claims.md`. Found and fixed: the teaching proof wanted a guide for Learn (added); a visual pass showed the ring crossing the station labels, a seeded outcome shown as removed on a session card, and the filing toast speaking of the sandbox cohort (all fixed).
- 06:12 nine decisions logged (docs/decisions.md).
- 06:12 check: `npm run typecheck` passed.
- 06:12 check: `npm run prove:all` 179 passed, 0 failed, sixteen suites.
- 06:12 check: `npm run build` passed.
- 06:12 check: `npm run smoke:integrity` 2 of 2 passed.
- 06:13 check: `npm run smoke` 15 of 15 and `smoke:workspace` 7 of 7 passed.
- 06:14 check: `npm run smoke:curriculum` 6 of 6 passed; guide check, contrast check, dash scan (231 files), theme check, mascot check and the backup migration passed.
- 06:15 ended; committed `b86f01d` "A2b: Learn matched to the taught version, the restyled loop screens, Home, How it works and a landing page whose every figure is in the claims register".

- 06:16 repaired this log: in A2a a replacement string holding a dollar and a backtick had pasted the log's opening into the A2a entry; the pasted copy was removed by slicing, and the scratch scripts were checked for the same pattern.

### A4, demo and checks

- 2026-10-22 06:16 started; re-read Section 17.5 and this log, then Sections 4, 15 and 17.
- Before 06:23: the tour rewritten in loop order (91 steps) with a `decision-recorded` wait; the demo smoke now ends on Home with the closed ring and asserts the decision, the event order and the results matched to the version taught; the walk updated for the rail and Learn; the tour length computed and registered in `docs/claims.md`.
- 06:23 check: `npm run typecheck` passed; `npm run prove:all` 179 passed.
- 06:24 check: `npm run build` passed.
- 06:25 check: `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6 passed.
- 06:25 check: guide check matches; contrast check, dash scan (231 files) and the backup migration passed; `node scripts/walk.mjs` WALK OK (21 checks).
- 06:23 three decisions logged (docs/decisions.md).
- 06:26 ended; committed as "A4: the tour follows the loop and closes the ring, the demo smoke asserts the decision record, and the walk visits every step".

### A5, the local door

- (next)

## What is left

A5, A6, A7 (the parts that need no human voice), A8, in that order.
