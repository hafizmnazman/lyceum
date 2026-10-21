# Decisions made during the Track A run

The choices the autonomous Track A run made on its own, as docs/lyceum-upgrade-plan.md Section 17.5 allows, in the fixed shape that section gives, so the owner can reverse any of them later. It continues [DECISIONS.md](../DECISIONS.md), which keeps the dated history up to 22 October 2026. Times are Kuala Lumpur time.

## 2026-10-22 03:28, A0: how to resolve the DECISIONS.md conflict when taking feature/evidence-snapshots
Options: (a) keep both entries, the 22 October plan entry first and the branch's 21 October Watch entry after it, so the log stays newest first. (b) Keep only the branch's entry and move the plan entry to docs/decisions.md, which splits the dated history across two files on day one. (c) Keep only ours and drop the teammate's record, which loses the reasons behind the snapshot rules.
Chosen: (a), because both entries are true records of different days and the file is already ordered newest first. Nothing in either entry contradicts the other.
Reverse it if: the owner wants DECISIONS.md frozen at the 22 October entry with everything later in this file.
To reverse: move the "21 October 2026: the Watch step" section from DECISIONS.md into this file.

## 2026-10-22 03:30, A0: where the backup migration check lives
Options: (a) a scratch script outside the repository, run once, which leaves the as-built table citing a command nobody can run again. (b) `scripts/check-backup-migration.mjs` in the repository, run by hand, which adds one file but no product change. (c) A new test in `src/prove-snapshots.ts`, which edits the teammate's suite inside a package whose rule is to fix only what the checks reveal.
Chosen: (b), because the verification table should name commands that can be run again, and the A0 rule forbids changes beyond what the checks reveal. The script drives the real store: it collects the saved sample, reviews it, freezes a snapshot, then restores a schema 4 and a schema 3 backup through restoreWorkspaceBackup.
Reverse it if: the owner wants every check inside prove:all.
To reverse: move the script's assertions into `src/prove-snapshots.ts` and delete `scripts/check-backup-migration.mjs`.
