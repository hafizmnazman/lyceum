# Lyceum: as built

**Stamp.** Track A of [lyceum-upgrade-plan.md](lyceum-upgrade-plan.md), built from 22 October 2026 on `main`. Base commit `f5b26a4`, tagged `pre-overhaul`. Each package adds a dated section with its verification table; package A8 turns this file into the stamped as-built report for Amsterdam (plan-versus-built table, exact versions, the full verification table, the changelog). Each section is signed by the package's accepting owner (plan Section 17.3).

**Rollback.** `git checkout pre-overhaul` returns the tree as it stood before the overhaul: the whole October workspace, committed on 22 October 2026 at 03:25 as "Checkpoint before the overhaul".

## A0, checkpoint and the branch: 22 October 2026

What was done:

- The working tree, uncommitted since 26 July, was committed as `f5b26a4` "Checkpoint before the overhaul" and tagged `pre-overhaul`.
- The teammate's branch was taken with `node scripts/team.mjs take feature/evidence-snapshots` (one commit, `41d8429`, 18 files): frozen evidence snapshots in `src/lib/snapshots.ts`, the `EvidenceWatch` panel, store actions, backup schema 4, the brief's "Changes since" section and `src/prove-snapshots.ts` (six checks). Sixteen files applied cleanly, `package.json` merged, and the one conflict (`DECISIONS.md`, both sides added an entry) was resolved by keeping both entries (docs/decisions.md). The team README change landed in `team-overlay/README.md`, as the team script maps it.
- Every changed file was read before the checks ran.
- Environment fix: `node_modules` had lost its `.bin` folder and two declared packages (`@anthropic-ai/sdk`, `@hono/node-server`), so `tsc` could not run. `npm install` from the unchanged lockfile restored them. No dependency was added or upgraded.
- Versions on this machine: Node 24.14.1, npm 11.11.0, TypeScript 5.9.3, Vite 6.4.3, React 18.3.1, puppeteer-core 23.11.1, pptxgenjs 4.0.1. The smokes drive the installed Chrome.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 166 passed, 0 failed, in fifteen suites (the six snapshot checks included) |
| `npm run build` | Passed. The main chunk is 630 kB, over Vite's 500 kB advisory; pptxgenjs and SheetJS stay in their own chunks |
| `npm run smoke` | 14 of 14 passed: the full tour on the saved sample, both decks downloaded, no page errors |
| `node scripts/check-backup-migration.mjs` | 16 of 16 passed. A schema 4 export (10 sources, 7 quotations, 1 snapshot) restores through `restoreWorkspaceBackup` with everything kept and the snapshot still comparing (9 of 9 reviewed postings carried; the sample holds one duplicate copy). The same backup set to schema 3 with `evidenceSnapshots` removed restores with empty snapshots and re-exports at schema 4 |

Nothing else was changed; the checks revealed nothing to fix in the code.

**Follow-ups from the branch review, for A2a** (plan Section 1):

1. Move the `EvidenceWatch` panel into the Watch screen.
2. Update the Evaluation suites table to 166 checks in fifteen suites.
3. Let the demo tour freeze a snapshot so the feature is visible.
4. Replace the arrow glyphs in the coverage column with words.
5. To consider: require a reason to remove a snapshot once a brief cites it.

Accepted by: the Code lane (owner to sign).

## A1, theme and shell: 22 October 2026

What was built:

- **Tokens as the only source.** `src/theme/tokens.ts` holds the Section 6.1 colours exactly (the poster's values plus `--emerald-text`, the semantic warn and danger pairs, the control border and the two focus colours), the type, space, radius, motion, depth and layout scales, and helpers (`cssVar`, `withAlpha`, `bareHex`). `scripts/gen-theme-css.mjs` writes the `:root` block and the `@font-face` rules into `src/theme/global.css` between markers, copies the three fonts and their OFL licences into `public/fonts/`, and writes the two preload links into `index.html`; `--check` reports drift.
- **Bundled fonts.** Bricolage Grotesque, Plus Jakarta Sans and JetBrains Mono from the Fontsource variable packages 5.3.0, Latin subset only (27 to 41 kB each), `font-display: swap`, the display and body faces preloaded. The Google Fonts links are gone from `index.html` and from the brief generator; a headless capture loads all three faces with every external request blocked.
- **Every screen in the new theme.** 338 uses of the old variables moved to the plan's names, with `--accent` and `--ok` split by context (text and icons to `--emerald-text`, fills to `--emerald`, focus to `--focus-light`); 106 inline font sizes moved onto the Section 6.3 scale. The pptx decks, the demo overlay, the command palette and the brief generator take their colours from the tokens.
- **Primitives** in `src/ui/primitives/index.tsx` are class based, with hover, focus-visible, active, disabled and loading states defined once in `global.css`: Button (primary emerald, outline, quiet, danger, lime and ghost for forest surfaces, a `loading` state), Card (light, tint, forest), Tag (ok, warn and danger always with an icon; `planned` with the dashed border), Field, Input, Textarea, Select (bounded by `--control-border`), Spinner, EmptyState, Stat, Kbd, Provenance, Row and a new Disclosure. Targets are 44 px on coarse pointers and narrow screens.
- **The shell.** A forest header band (the one forest element on a working screen) with the wordmark, the current course and step, search, notifications and the account menu, lime focus rings inside it; a white sidebar with Home, Courses, the **loop rail** (Course, Watch, Report, Decide, Update, Teach, Learn, History, each with a Lucide role icon, a count from saved records and a worded Done or Next), the course chips, Explore and the labelled sandbox. Focus moves to the page heading on each screen change and returns to the trigger when a menu is dismissed with Escape.
- **Hash routes** `#/course/:id/<step>` (`src/app/routes.ts`, `src/app/loop.ts`), honoured on refresh and deep links for a course the person may open, and wired to today's screens: Course, Watch, Report and Decide, Update, Teach and History open the Studio tabs, Learn opens Upload. `navigate()` takes the course argument the plan names.
- **Surfaces.** The dot grid and the forest hero card on the landing page; the sign-in screen on the `--forest-deep` backdrop with every line of text on a card; warn and danger boxes carry an icon and a word.
- **Checks.** `scripts/contrast-check.mjs` asserts the 61 ratios in the audit's tables and the plan's Section 6.2 table against `tokens.ts`, fails on a hand-written hex, bare Office or pptx colour, `rgb()` or `hsl()` value anywhere outside `tokens.ts`, on drift in the generated theme, on a generated SVG using a non-token colour, and on lime outside a forest context in the stylesheet. A negative test (a planted hex, an `rgba()`, a bare pptx colour and a lime rule on a light selector) failed it as it should. `scripts/dash-scan.mjs` is the dash scan.
- **Smaller fixes found on the way:** the floating Play demo pill covered the Guide page's role filter once signed in, so signed in the tour now starts from an inline button on the Guide page; Button defaults to `type="button"`; the integrity smoke reaches the Studio and Upload screens through the rail.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run build` | Passed; `dist/fonts` holds the three faces and their licences |
| `node scripts/contrast-check.mjs` | CONTRAST CHECK OK: 61 ratios, 172 files scanned, theme outputs current. One rounding note: `--emerald-text` on mint computes 5.55 where the audit and plan print 5.6; the AA verdict holds |
| `node scripts/gen-theme-css.mjs --check` | Outputs match `tokens.ts` |
| `npm run smoke:workspace` | 7 of 7 passed, including 390 and 320 px with no page overflow |
| `npm run prove:all` | 166 passed, 0 failed, fifteen suites |
| `npm run smoke`, `smoke:integrity`, `smoke:curriculum` | 14 of 14, 2 of 2 and 5 of 5 passed |
| `node scripts/generate-guide.mjs --check` | Matches |
| `node scripts/dash-scan.mjs` | No en or em dash in 172 text files |

Not done in A1, by design: the step screens themselves (A2a and A2b), the ring that replaces the journey bar (A2a), the narrow-screen bottom bar of Section 5.2 (decided in docs/decisions.md), the mascots in the rail and the empty states (A3).

Accepted by: the Code lane (owner to sign).
