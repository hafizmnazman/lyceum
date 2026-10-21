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

## A3, mascots v1: 22 October 2026

What was built:

- **The cast, drawn in code** in `src/ui/mascots/`: the host (working name Tualang, a young tree on its growth rings with a single lime leaf at the crown) and the seven helpers, Folio (a book with a soft spine and a lime bookmark), Scout (an explorer with a telescope and a lime lens glint), Atlas (a map pin with a lime thread between two pins), Lens (a magnifier holding the interval bracket with lime ends, drawn at the real interval width), Quill (a feather pen with a lime nib on a ruler rail), Prism (a prism with the three ray tokens) and Steward (a folder with a lime receipt and a clipboard). One shape family (`parts.tsx`): rounded bodies, big eyes with a white catchlight, a line for a mouth, detached feet, forest ink at one stroke weight, two-tone fills with the dark side as a rim, colours taken from `tokens.ts` as values so the same SVG renders in the app, in Puppeteer and in Remotion. Named parts (`eyes`, `prop`, `arms`, and the host's `leaf` and `rings`) for animation.
- **Poses.** Every helper has resting, working, waiting and done; the host has greeting, resting, celebrating (a new ring glows) and reflecting. The host has two extra size classes (hero and poster detail).
- **The Mascot primitive** (`src/ui/mascots/index.tsx`): who, mood, size and surface; hidden from assistive technology with the name in the adjacent label; draws nothing for "stuck", so the error card speaks. Rest is static; the prop moves only in the working mood and a just-saved record gets one spring; a float is allowed only where the plan allows it (`float`, landing and film); `prefers-reduced-motion` stops all of it. `useCourseMoods` reads the moods from the store and re-renders once when a done window ends.
- **The mark** (`mark.tsx`): the host's silhouette in one colour (forest or white, with an optional lime leaf on forest) and the tile for the favicon and the app icon. Wired in `index.html` (SVG favicon, 32 px PNG, the 180 px Apple touch icon, a web manifest) and beside the wordmark in the header and on the landing bar.
- **Moods from records only** (`src/app/moods.ts`): a pure function of the state, the requests in flight and the clock. A session-only `requests` list in the store (`beginRequest`, `endRequest`, `trackRequest`) wraps the real work: the research-run fetch, the upload parse and the pack render (`downloadPack`). Working needs a request; waiting needs a proposal of the helper's own (fetched postings not kept, quotations not confirmed, a checked revision not adopted, a brief not sent, an upload not confirmed); done lasts four seconds after the record's own timestamp; stuck comes from a failed fetch. The host follows the loop's done marks: greeting before any step, resting mid-loop, celebrating then reflecting once the six steps are done.
- **Renders.** `scripts/gen-mascots.mjs` loads the same TSX through Vite's SSR loader and writes `public/brand/mascots/` (every character and pose as SVG, and as PNG at 512 and 1024, the host also at 2048), `mark.svg`, `mark-white.svg`, `favicon.svg`, `icon-32.png`, `icon-180.png`, `icon-192.png`, `icon-512.png` and `manifest.webmanifest`: 35 SVGs and 72 PNGs, 3.9 MB, in under five seconds. `--check` re-renders the SVGs and reports drift; the contrast check confirms every colour in the 35 SVGs is a token.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 174 passed, 0 failed, sixteen suites; `prove:moods` adds 8 checks. A mutation test (Scout forced to "working") failed 4 of the 8, as it should |
| `node scripts/gen-mascots.mjs` then `--check` | 35 SVGs, 72 PNGs and the manifest written; outputs match the components |
| `node scripts/contrast-check.mjs` | CONTRAST CHECK OK, 35 generated SVGs checked |
| `npm run build` | Passed |
| `npm run smoke`, `smoke:integrity`, `smoke:workspace`, `smoke:curriculum` | 14 of 14, 2 of 2, 7 of 7 and 5 of 5 passed |
| `node scripts/generate-guide.mjs --check`, `node scripts/dash-scan.mjs` | Matches; no en or em dash in 221 text files |

Not done in A3, by design: placing the helpers in the step header cards and empty states and the host on Home and How it works (A2a and A2b, Section 7.3); the host's celebrating and reflecting moods can only be reached once Decide records exist (A2a), so their proof is added there; concept sheets from image generation were not made, because that would send prompts off the machine (Section 7.4 makes the drawn cast the production asset either way).

Accepted by: the Code lane (owner to sign).
