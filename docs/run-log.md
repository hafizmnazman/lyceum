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
- 03:32 ended; committed as "A0: take the evidence snapshots branch and prove the backup migration".

## What is left

A1, A3, A2a, A2b, A4, A5, A6, A7 (the parts that need no human voice), A8, in that order.
