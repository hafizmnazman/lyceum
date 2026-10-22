# Lyceum: as built

> **What this file is.** The system as built for the HACKaSTONE 2026 Grand Final, written from the code and the checks that ran, with the plan's mismatches named. Where it and [lyceum-upgrade-plan.md](lyceum-upgrade-plan.md) disagree about what exists, this file wins. Keep it current: change it with the code, add a line to the changelog, keep the stamp in step.

**Stamp.**

- Last updated: 22 October 2026, 15:05 Kuala Lumpur time.
- Reflects: `main` after the A8 commit (`b4bfdc4`), with the owner's follow-ups of the same day, uncommitted (the seed clock, the kept files, the public landing page and its QR code, the friendlier workspace, the team repository, the text pass); the base is `f5b26a4`, tagged `pre-overhaul`. Nothing is pushed; `amsterdam-2026` is the owner's tag at the freeze.
- Project: Lyceum, Universiti Teknologi PETRONAS, for the Grand Final on 29 October 2026 in Amsterdam ([docs/competition/grand-final-2026.md](competition/grand-final-2026.md)).

**Rollback.** `git checkout pre-overhaul` returns the tree as it stood before the overhaul: the whole October workspace, committed on 22 October 2026 at 03:25 as "Checkpoint before the overhaul".

## Contents

1. [What Lyceum is](#1-what-lyceum-is)
2. [Plan versus built](#2-plan-versus-built)
3. [Exact versions](#3-exact-versions)
4. [Layout](#4-layout)
5. [Verification](#5-verification-22-october-2026)
6. [What needs a person](#6-what-needs-a-person)
7. [Changelog: Track A, package by package](#7-changelog-track-a-package-by-package)
8. [Changelog: Track C, package by package](#8-changelog-track-c-package-by-package)

## 1. What Lyceum is

Lyceum turns real job postings into a course decision with receipts, every semester, inside the tools lecturers already use. A lecturer runs one loop per course and term: **Watch** (postings fetched on request from a permitted board, each with its link, date and fingerprint), **Report** (exact quotations beside their sources, the reviewed denominator, counts with Wilson intervals, a mapping to the outcomes, a brief), **Decide** (an immutable decision record by a person with the right to decide, bound to the brief, the version and the term), **Update** (a revision checked against the hours and the protected topics, adopted as a new version), **Teach** (sessions and an editable teaching pack with no model text) and **Learn** (results matched to the version taught, with n of N, and no learning gain claimed). The core is deterministic and needs no AI key; an assistant reaches it through the local, read-only door in `mcp/`. A host and seven helpers, drawn in code, make the steps visible; their moods follow records, never activity.

## 2. Plan versus built

Plan Section 17.1, package by package, against what this record and the code show. "Done" means built and verified on 22 October 2026; "partly" names what is missing; "not done" says why.

| Package | The plan's acceptance | As built | Status |
|:--|:--|:--|:--|
| A0 Checkpoint and the branch | The tag exists; the snapshots suite is in prove:all; a schema 3 and a schema 4 backup restore | `pre-overhaul` on `f5b26a4`; the branch taken; the migration check restores schemas 3, 4 and 5 | Done |
| A1 Theme and shell | Every screen in the new theme with no hand-written hex; the contrast table passes | `tokens.ts` the only source; generated CSS and bundled fonts; the loop rail, since the owner's follow-ups a path across the top of each step; the contrast check | Done |
| A3 Mascots v1 | PNGs for every character and mood; the mark as favicon and icon; prove:moods; nothing moves without a request | Eight characters in code, four poses each; 35 SVGs and 72 PNGs; the moods proof | Done |
| A2a Watch, Report, Decide | The journey proof with the new done rules; a decision record and an event on the timeline; 320 px reflow | The Report sub-rail, the source pane, skill cards, the decision record, the event log, the ring per term | Done |
| A2b The other loop screens, Home, How it works, Landing | No synthetic figure on the landing; every landing figure in claims.md; the integrity smoke | Learn matched to the version taught; the landing's figures and clauses registered and proved; in A8, records from the app's sample files labelled synthetic | Done; the doors strip keeps neutral icons until the owner decides on marks |
| A4 Demo and checks | `npm run smoke` with the decision and both decks; the guide check | The tour in loop order, setting the term first; four smokes and the walk updated | Done |
| A5 The local door | Claude Desktop returns CS310's evidence report from a fresh export; no tool writes to the workspace | Six tools, five read-only; proofs over the real protocol; a stdio session with the official client | Partly: the Claude Desktop run needs the owner |
| A6 Deck, diagram, brief, poster | The PPTX opens in PowerPoint with notes and the film plays; the diagram passes the C4 checklist; no dash | The deck, its PDF and PPTX opened in PowerPoint with every note and the film; the diagram; the brief; the A1 poster; in A8, the Codex pitch review's verified fixes | Partly: the playback test needs the presenting laptop |
| A7 The film | The 90-second cut rendered and reviewed; a second render diffed | Both cuts built on the real capture and rendered; the frames of two renders diffed; captions and chapters | Partly: no voices yet (the team records them), no music bed, the phone review |
| A8 Documentation and verification | Every claim traces to claims.md; the demo path by keyboard and NVDA; everything plays offline | This record, the claims register checked by a Codex audit, the booth script, README, JUDGES.md, FEEDBACK.md, the guide; the full verification | Partly: the NVDA pass and the wifi-off run need a person at the machine |

### Known mismatches

Where the build differs from the plan's text, and why. Each row's decision is in [decisions.md](decisions.md) under the time given.

| # | Topic | The plan says | As built | Where |
|:--|:--|:--|:--|:--|
| 1 | The doors strip's marks | Section 17.1: the landing's doors strip "with the official marks" | Neutral icons with each door's name and a Planned tag; three Simple Icons marks (Claude, MCP, Greenhouse) only on the diagram, where Lyceum really connects | A2b 06:12, A6 06:55; Needs the owner 1 |
| 2 | The film's capture | Section 16: Playwright's `recordVideo`, per scene | One screencast of the whole tour on the dated saved sample, piped into ffmpeg with each frame's arrival time; scenes cut from it by tour caption | A7 07:52, 07:58, 08:04 |
| 3 | The lecturer's caption bar | Section 16.1: emerald | `ray3`, because emerald on forest is 2.96 to 1, under the 3 to 1 a graphic needs | A7 08:05 |
| 4 | The film's voices | Section 16: the team's recordings, line by line | Silent renders, every line timed from its words at 2.6 a second, until the recordings exist | A7 08:07 |
| 5 | The render check | Section 17.6, A7: render twice and diff | The frames of two renders diffed before encoding, failing above 2 levels; one set of frames encoded twice, byte for byte | A7 09:15 |
| 6 | Third-party skills | Section 17.6, A7: remotion-dev/skills and brag, after a SkillSpector scan | None installed, so none needed a scan | A7 07:50 |
| 7 | The Claude Desktop run | Section 17.1, A5: Claude Desktop returns the evidence report | A stdio session with the official SDK client; the desktop run needs the owner's app and account | A5 06:37; Needs the owner 2 |
| 8 | The loop graphic | Section 7.3 and the A2b decision: eight stations, Lens as "Report and Learn" | Nine stations in loop order, Lens at Report and again at Learn, so the ring never reads Learn before Decide | A8 |
| 9 | The rehearsed answers | Section 14: two answers word for word, one ending "it can be used from inside ChatGPT" | The deck's notes say the ChatGPT door is planned and the local door works today | A8 |
| 10 | The latency wording | Section 2.4: "39% of workers' skills change by 2030, while programme approval takes 12 to 18 months" | Employers expect the 39%; the approval time is at the US universities cited | A8 |
| 11 | The clause mapping | Section 4: each step is "a clause the accreditors already use", Teach as Biggs | Teach labelled a teaching principle; the heading says what reviewers already look for | A8 |
| 12 | DECISIONS.md | Section 18: it becomes a pointer | Kept as written, because CLAUDE.md names it as required reading, with a pointer at its top | A8 |
| 13 | The documentation set | Section 19's target layout: `problem-statement.md`, `ui-accessibility-review.md`, `user-study.md` | Not written: A8's session prompt does not name them, and the accessibility review needs the axe and NVDA passes | This record, section 6 |
| 14 | The pitch's opening order | Section 4.1: person, urgency, receipt; Section 14: receipt, urgency, person | The deck follows Section 14 | Needs the owner |

## 3. Exact versions

As installed on the build machine on 22 October 2026.

| Part | Version |
|:--|:--|
| Node.js, npm | 24.14.1, 11.11.0 |
| TypeScript, Vite, React | 5.9.3, 6.4.3, 18.3.1 |
| puppeteer-core (the smokes, the shots, the generators) | 23.11.1, driving Chrome 155.0.8059.85 |
| pptxgenjs (the packs, the brief deck, the pitch PPTX) | 4.0.1 |
| @modelcontextprotocol/sdk, zod (the local door) | 1.32.1, 4.6.7 |
| simple-icons (the diagram's marks) | 16.35.0 |
| unpdf (reading the PDFs back) | 0.12.2 |
| Fontsource variable faces: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono | 5.3.0 each |
| Remotion, in `video/remotion/` only | 4.0.537, pinned |
| ffmpeg (the film's capture, encodes and checks) | 8.1 |
| Python (the README's banner and card only, standard library) | 3.12.10 |
| Codex CLI (the read-only reviews in `docs/review/`) | 0.156.1, `gpt-6-astra` at max reasoning |

## 4. Layout

```text
.github/readme/       the README's banner and card (build.py, banner.txt, art.txt) and its screenshots
deck/                 the pitch: index.html, deck.css, deck.js, the generated theme; exports in deck/export (not committed)
docs/
  as-built.md  claims.md  decisions.md  demo-script.md  doors.md  brand-use.md  lecturer-guide.md  run-log.md
  review/             the Codex reviews, kept as written with their run logs
  lyceum-upgrade-plan.md  lyceum-improvement-plan.md (execution records and W numbers)
  presentation/       architecture.svg and .png, lyceum-brief.pdf, poster-a1.pdf, the shots, pack/ (the teaching pack as PowerPoint draws it)
  research/           the dated notes
  history/            superseded documents, screenshots and presentations, and the 9 October as-built report
mcp/                  the local door, its sample workspace and its try script
skills/lyceum/        the skill folder
video/                script, storyboard, style, capture/, the Remotion project in remotion/
src/
  theme/              tokens.ts (the source) and the generated global.css
  ui/mascots/         the host, the seven helpers and the mark
  ui/primitives/      the components
  ui/screens/         one file per loop step plus Home, Courses, How it works, Evaluation, the landing page and the sandbox
  app/                store, roles, the loop and its ring, routes, moods
  lib/                the deterministic core
  demo/               the self-driving tour
  prove-*.ts          the checks
scripts/              generators, the claims and contrast checks, the headless browser runs
```

## 5. Verification, 22 October 2026

The latest full run, after the owner's follow-ups (the friendlier workspace, the team repository and the text pass), on the build machine between 14:59 and 15:02 Kuala Lumpur time; the screenshots, the brief and the poster were rebuilt at 14:16, and the film was captured and rendered between 14:21 and 14:58, on the same source. Every command runs from the repository root unless it says otherwise. The run after package A8 (10:08 to 10:51) is in the changelog below.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 185 passed, 0 failed, seventeen suites |
| `npm run build` | Passed |
| `npm run smoke` | 19 of 19, DEMO SMOKE OK: the whole tour, the decision record, both downloads, the closed ring |
| `npm run smoke:integrity` | 2 of 2: no synthetic figure on the landing page; the notice only on the sandbox screens |
| `npm run smoke:workspace` | 7 of 7: role-scoped courses, save and reload, export, blocked storage, keyboard and 320 px layouts |
| `npm run smoke:curriculum` | 6 of 6: Watch to Update with real downloads, a restore and the 390 and 320 px reflow |
| `node scripts/walk.mjs` | WALK OK, 21 checks: every screen and every loop step, the real upload pipeline, no page error |
| `node scripts/generate-guide.mjs --check` | The lecturer guide matches the in-app section catalogue |
| `node scripts/contrast-check.mjs` | CONTRAST CHECK OK: 61 ratios against `tokens.ts`, 193 files scanned for hand-written colours, 41 generated SVGs (the README's four among them) |
| `node scripts/dash-scan.mjs` | No en or em dash in 280 text files (`docs/history` and `docs/review` kept as written) |
| `node scripts/check-backup-migration.mjs` | BACKUP MIGRATION OK: schema 3, 4 and 5 backups restore |
| `node scripts/gen-theme-css.mjs --check`, `gen-mascots.mjs --check`, `gen-architecture.mjs --check` | All match: the theme outputs and the three fonts, 35 SVGs and 72 PNGs, the diagram |
| `node mcp/sample.ts --check`, `node --test src/prove-mcp.ts` | The sample workspace matches the tour's end state; 5 of 5 |
| `npm run shots` | 13 screenshots from the built app on the sample workspace, among them the step's frame at 1440 px; the README's seven copied into `.github/readme/shots`, the step's frame as its hero |
| `npm run deck` | 11 slides, 5 figures in the claims register, the receipt in its source, the clauses word for word, no dash; the film loads on slide 5 (87.2 s at 1920 by 1080); the PDF (2,501 KB) read back, every digit registered or a reference; the PPTX (19,599 KB) opened in PowerPoint with 11 slides, every note and 1 media object |
| `node scripts/gen-brief-pdf.mjs` | Three A4 pages; every number registered or a reference, no dash, nothing into a footer |
| `node scripts/gen-poster.mjs` | A1 landscape, with the QR code to the landing page; every number registered or a reference, no dash, every card holds its content |
| `node scripts/gen-sample-decks.mjs` | PowerPoint opened the pack: 6 slides, each with its notes (11:06; the samples have not changed since) |
| `node video/capture/capture.mjs` | The tour recorded at 1920 by 1080: 385.47 s of video for 385.5 s of tour, 17,814 frames, 75 captions marked |
| `node scripts/sync.mjs`, `npx tsc --noEmit` (in `video/remotion`) | Loop90 1:27, 7 scenes, 33 captions; Afternoon 3:33, 13 scenes, 66 captions; every cue word, clip anchor and caption number checked, no dash; 0 of 41 lines recorded; the typecheck passed |
| `node scripts/render.mjs Loop90` | 1:27 (87.2 s), 1920 by 1080, 30 fps, silent: 13,929,397 bytes, and the 720p copy (2,823,642 bytes) from the same frames |
| `node scripts/determinism.mjs Loop90` | Passed: 2,615 frames rendered twice, 2,471 identical byte for byte and 144 differing by at most 1 level in 1 to 14 pixels; one set of frames encoded twice gave the same file byte for byte |
| `node scripts/render.mjs Afternoon` | 3:33 (213.1 s), 1920 by 1080, 30 fps, silent: 31,599,152 bytes, and the 720p copy (6,499,752 bytes); 66 captions, 12 chapters |

The team repository's snapshot was checked on its own at 13:52: unpacked, installed fresh with `npm ci` and Windows line endings, and every command above from the typecheck to the door's proofs, with the four smokes, passed in it.

These are software checks. They prove that the records, the counts, the decisions and the exports behave as specified on the dated saved sample; they do not prove learning gains, representativeness or accreditation, which this build never claims. The README was not rendered on GitHub, since that sends it off the machine; its banner and card were rendered here on GitHub's dark and light backgrounds.

## 6. What needs a person

What this run could not do on its own, with where each item stands. The owner's decisions are also at the top of [run-log.md](run-log.md), under Needs the owner.

| Item | Why it needs a person | Where it stands |
|:--|:--|:--|
| The film's voices | The plan's voices are the team's own, recorded line by line | `video/script.md` holds every line; the renders are silent, with captions timed from the script, until the WAV files exist |
| A music bed for the film | Only a track whose licence allows YouTube use | None chosen |
| TRL 6's environment | The research note defines the relevant environment as real postings, a real syllabus and a real lecturer; the build has the real postings, a sample outline and a persona | Every surface names the environment as it is; keep TRL 6 self-assessed, present TRL 5, or run one real syllabus with one lecturer before the final |
| The pitch's opening order and commercial framing | Plan Sections 4.1 and 14 order the opening differently, and the Codex pitch review asks who buys and what the pilot's purchase decision is | The deck follows Section 14; the review is in [review/astra-pitch-review-2026-10-22.md](review/astra-pitch-review-2026-10-22.md) |
| Eight of the ten Q&A answers | The Story lane writes them in the team's words | [demo-script.md](demo-script.md) lists what each rests on; the Codex rehearsal of the bank is in [review/](review/) |
| The Claude Desktop run of the local door | It needs the desktop app, an account and a change to a file outside the repository | A real stdio session with the official client is recorded in [doors.md](doors.md), with the steps for the desktop run |
| Official marks beyond Claude, MCP and Greenhouse | Microsoft needs a licence, Google a request, Moodle permission; OpenAI's and Instructure's terms were not read | [brand-use.md](brand-use.md) lists each mark, its source and its terms |
| The PPTX and the film on the presenting laptop | Section 14.3 asks for the playback test on the venue's player | The PPTX opened in PowerPoint here with every note, and the film loads in Chrome on slide 5 |
| The keyboard and NVDA pass, the offline run with wifi off | A person at the machine, with a screen reader | The smokes check keyboard focus and the 320 px layout; the tour runs on the saved sample offline |
| The story review and the rehearsals | Plan Section 4.1 and 14.1: a teammate plays the sceptical judge | [demo-script.md](demo-script.md) for the booth, the deck's notes for the pitch |
| Remotion's licence tier | Who owns Lyceum, the team or the university, decides which applies | Recorded in [video/README.md](../video/README.md); confirm before the film is published |
| The GitHub repository's description | The house style asks for one plain sentence on GitHub, which changes a setting off this machine | Suggested: "Lyceum turns real job postings into a course decision with receipts, every semester." |
| Section 19's remaining documents | `problem-statement.md`, `ui-accessibility-review.md` (with the axe and NVDA passes) and `user-study.md` (the pilot protocol) | Not written in this run |

## 7. Changelog: Track A, package by package

Each package's own record, as written when it ended, with its verification table. Times and commits are in [run-log.md](run-log.md).

### A0, checkpoint and the branch: 22 October 2026

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

### A1, theme and shell: 22 October 2026

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

### A3, mascots v1: 22 October 2026

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

### A2a, Watch, Report, Decide: 22 October 2026

What was built:

- **Evidence split in two.** **Watch** (`src/ui/screens/Watch.tsx`) holds the research run, the kept sources as cards on a dated timeline (one entry per collection run or pasted document), the paste form behind a disclosure, and the teammate's snapshot panel (A0 follow-up 1). **Report** (`src/ui/screens/Report.tsx`) has a sub-rail, Quote, Review, Count, Map and Brief, in the URL as `#/course/:id/report/<tab>` and keyboard operable (arrows, Home, End). Quote shows each proposed quotation beside its source pane with the matched words highlighted; Review shows the denominator meter ("n of m kept postings reviewed"); Count shows a skill card per skill with the share, the Wilson 95% interval printed and drawn, and a waffle, with the old table behind a disclosure; Map shows the coverage ladder (absent, introduced, practised, assessed) with the target and the shortfall in words; Brief is the meeting brief. The stale "nothing is collected from the web" line is gone.
- **The decision record** (`BriefDecision` in `src/types.ts`, `src/lib/decisions.ts`, `recordDecision` in the store): adopt, retain, defer or return, with a required reason of up to 2,000 characters, bound to the brief, the course version and the term. Only a recipient of the brief who holds "decide" (a coordinator of the course, or the programme owner) may record one; a lecturer and management cannot. The brief's author can record a decision, but it is labelled self-recorded and the step stays open until a second person decides, except on a personal single-owner course. Records are never edited: deciding again is a new record that becomes that person's standing decision. A newer brief supersedes the older one, whose decisions stay on record. A decision taken before the evidence changed is marked "evidence changed since".
- **Decide** (`src/ui/screens/Decide.tsx`) shows the latest brief, its recipients, who has read it, every decision on record and the form; the same panel, compact, gives the four buttons and the note on the recipient's Home. The mock-cohort try is linked as illustrative. The author is notified of a decision on their brief, and the notification opens Decide.
- **The append-only event log** (`events` in the store): briefs prepared, sent and read, decisions, snapshots frozen, versions adopted and term changes, each with who and when. The How it works timeline (`src/app/runs.ts`) reads the events first and labels the lines worked out from records as derived ("the count as the records stand now").
- **The receipts ring** replaces the journey bar (deleted: `src/app/journey.ts`, `src/ui/primitives/Journey.tsx`). `src/app/loop.ts` holds the six steps, their questions and handoffs, and the done rules of Section 4, scoped to the current term: a step counts only records inside the term window, which restarts when the stated term changes from one value to another; seeded examples never count; the course counts only with an outcome; a session only when its outcome is current; Update only for an adoption under an adopt decision, or "no change this term" after retain; return sends Report back. The ring and its legend are on Home (Start here, with the host) and in the rail; the summary line is literal ("3 of 7 done for 2026-S2. Next: Decide." or "Loop closed for ...").
- **Positions mapped onto today's hats** (Section 4.2): `decide` and `adopt` capabilities; the old Proposal tab and the Approvals screen moved into the sandbox group, labelled illustrative; sign-in shows one line per person saying what they can do in the loop.
- **Step frames**: each step page has the eyebrow (course, step n of 6), the step's question, the helper with its mascot, a course switcher, a step strip on narrow screens and a handoff card that ends the step. Course, Update, Teach and History stay in the Studio and stay mounted, so an open editor survives a step change. Teach holds the assessment behind a disclosure.
- **Backups at schema 5** carry the decision record and the event log, with referential checks; schema 4 and older files restore with both empty. The host's mood reads the loop's own `closed`, so the ring and the host cannot disagree; celebrating and reflecting are now proven.
- **Kept green in this package**: the section guides gained Watch, Report, Decide and the sandbox proposal (19 sections), the lecturer guide was regenerated in the loop's order, the Evaluation suites table now shows the measured 178 checks in sixteen suites (A0 follow-up 2), the coverage words replace the arrow glyphs (A0 follow-up 4), and the tour, in its old order with remapped targets, now freezes a snapshot (A0 follow-up 3). Follow-up 5 is decided in docs/decisions.md.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 178 passed, 0 failed, sixteen suites. `prove-journey` rewritten (7 checks: done rules, the decision record, single-owner courses, a new term, the event-first timeline, the routes, landing figures); `prove-research` adds the event log and the decision; `prove-evidence`, `prove-research` and `prove-snapshots` assert schema 5; `prove-moods` adds the closed loop |
| `npm run build` | Passed |
| `npm run smoke:curriculum` | 6 of 6 passed: Watch and Report on a personal course (pasted receipt, exact quotation, rejected misquote, the denominator meter, the ladder, the scan beside its source, count, brief sent, report export, reflow at 390 and 320 px on every sub-step), Dr Rahman's retain decision with its reason on his Home, Decide and Update after retain, backup and restore keeping the decision, the keyboard sub-rail, zero page errors |
| `npm run smoke` | 15 of 15 passed, including the frozen snapshot |
| `npm run smoke:integrity`, `smoke:workspace` | 2 of 2 and 7 of 7 passed (the workspace smoke walks the rail by keyboard and opens the proposal in the sandbox) |
| `node scripts/check-backup-migration.mjs` | BACKUP MIGRATION OK: schema 5 with the decision and four events restores whole; schema 4 and schema 3 files restore with an empty record and log |
| `node scripts/generate-guide.mjs --check`, `node scripts/contrast-check.mjs`, `gen-theme-css.mjs --check`, `gen-mascots.mjs --check` | Match; CONTRAST CHECK OK (61 ratios); theme and mascot outputs current |
| `node scripts/dash-scan.mjs` | No en or em dash in 225 text files |

A visual pass on the built app with the dated saved sample (Home, Course, Watch, every Report sub-step, Decide for the author and the recipient, How it works, and Report and Decide at 390 px) found no layout fault; the captures were review aids and are not committed.

Not done in A2a, by design: the Learn step's match between a results file and the taught version, and the restyled Course, Update, Teach, Learn, History, Home and How it works screens (A2b); the tour in the loop's order with Dr Rahman's decision (A4). Times on records are shown as stored (UTC), as elsewhere in the app.

Accepted by: the Code lane (owner to sign).

### A2b, the remaining loop screens, Home, How it works, Landing: 22 October 2026

What was built:

- **Course** shows the outline as cards: outcomes with their Bloom level and achievement evidence, topics with their hours against the contact-hour budget as a meter. One action: "Watch employers" while the course has no evidence, "Start a revision" once it has. Teaching context, documents and sources, the preparation checklist and the illustrative sandbox sit behind disclosures.
- **Update** opens a revision with the hours meters (contact and self-study against their budgets, an over-budget state in words), the number of changes, what is left to fix or review and the check state; the current outline shows the same meters. The sessions and assessments a change affects are listed behind a disclosure. The rationale and the term stay visible because adoption requires them (docs/decisions.md).
- **Teach** shows session cards by week, each with its linked outcomes as tags, its status and its teaching pack (.pptx); the assessment stays behind its disclosure.
- **Learn** is its own screen (`#/course/:id/learn`): the sentence "No learning gain is claimed; the benchmark has not been run."; attainment per outcome from the latest results file as filed, with the mean mark, its spread and n of N (N being the most students the file records for any outcome, said in words); filing results or a CLO survey through Upload's intake panel, where the person filing confirms the course version taught; the results and surveys filed, a seeded example labelled and never counted; the planned Track B items, each tagged Planned; the benchmark protocol and its status (written, not run, 0 real terms). A results file now carries the version it is for, and Learn's done rule counts only files matched to a version of the course (Section 4).
- **History** puts the course versions and the decisions on briefs on one timeline, newest first; each entry opens to its outline with an export, or to its decision card; the revision log sits behind a disclosure.
- **Home** leads with Start here: the host, the ring with the next step lit, "Continue" and the resume action. The briefs waiting, the notifications and the courses sit behind disclosures that open by themselves when something is waiting.
- **How it works** opens with the loop graphic: the host at the centre and the seven helpers at their stations in loop order, with a people station at Decide; choosing a helper opens its card (reads, produces, cannot). "See the record on this course" opens the timeline, behind its disclosure, with recorded and derived lines labelled. The same graphic is the landing hero, on forest.
- **The landing page**: the loop as the hero with two ways in; the problem at three levels, one figure each, with every source linked and the vendor survey said so, labelled desk research until the interviews; each loop step beside the accreditor clause it operationalises, quoted word for word from the dated notes (NAAC marked a paraphrase; ESG 1.2 and AACSB Standard 5 left out until a note checks them); the doors as a monochrome strip, the web workspace Built and the rest Planned; what is proven, with dates (179 checks on 22 October, 727 live postings on 9 October). No synthetic figure.
- **`docs/claims.md`**, the claims register: every landing figure with the words it is shown in, its source and link, the note that checked it, its key and the date. `prove-journey` fails if a landing figure is missing from it, if a registered link differs, or if a quoted clause is not word for word in its note.
- Kept green: a section guide for Learn (20 sections) and updated guides for Home, the Studio steps, Upload and How it works; the lecturer guide regenerated; the Evaluation table at 179 checks in sixteen suites; the integrity smoke reaches Learn from the rail and checks its sentence; the tour opens the record from How it works.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 179 passed, 0 failed, sixteen suites. `prove-journey` adds Learn matched to the taught version (the default, an explicit choice, another course's version refused, unmatched files not counted, the backup guard, n of N) and replaces the landing test with the claims register check |
| `npm run build` | Passed |
| `npm run smoke:integrity` | 2 of 2 passed: the public landing page (no synthetic figures, limits stated, no notice) and eleven signed-in screens including Learn, notice only on sandbox screens, zero page errors |
| `npm run smoke`, `smoke:workspace`, `smoke:curriculum` | 15 of 15, 7 of 7 and 6 of 6 passed |
| `node scripts/check-backup-migration.mjs` | BACKUP MIGRATION OK |
| `node scripts/generate-guide.mjs --check`, `contrast-check.mjs`, `gen-theme-css.mjs --check`, `gen-mascots.mjs --check` | Match; CONTRAST CHECK OK; outputs current |
| `node scripts/dash-scan.mjs` | No en or em dash in 231 text files |

A visual pass on the built app (the landing sections, Home, Course, Update, Teach, Learn before and after filing the sample results, History, How it works at 1440 and 900 px, and Learn, Teach and How it works at 390 px) found three faults, fixed before the checks: the ring ran through the station labels (each station now has an opaque backing, so the ring reads as links between stations), a seeded outcome without a label showed as "removed" on a session card, and the filing toast still spoke of the sandbox cohort. The captures were review aids and are not committed.

Not done in A2b, by design: the term recap and the milestones of Section 8; Track B's Learn (adequacy, intervals, pooling, perception beside attainment, scored predictions); focus moving to the main heading on every route change (Section 5.2, an A4 or Track B accessibility item); the tour in the loop's order (A4).

Accepted by: the Code lane (owner to sign).

### A4, demo and checks: 22 October 2026

What was built:

- **The self-driving tour follows the loop** (`src/demo/script.ts`, 91 steps, about 6 minutes at full speed): Course (CS310 as it stands); Watch (Stripe's public board on Greenhouse fetched live through the local API, the dated saved sample only if the network fails, postings kept); Report (scan and confirm, a rejected paraphrase, the reviewed denominator, the count, a frozen snapshot, one mapping, the brief with its slides, sent to Dr Rahman); Decide (Dr Rahman reads the brief on Home and records adopt with a reason); Update (Dr Sobri opens the decision from his Home, then makes the revision within the hours, the reason quoting the decision); Teach (a session and its teaching pack); Learn (the sample results filed against the version taught, with n of N); How it works with the record; and Home with the ring closed for the term. The template assessment left the tour (docs/decisions.md). The door joins when A5 ships it.
- **The demo smoke asserts the loop**: postings kept, quotations confirmed, the reviewed denominator, the snapshot, the mapping, the brief sent and read, Dr Rahman's decision with a reason bound to the brief and the course version, the event log in order (brief prepared, sent, read, decision, then the adoption), the revision adopted after the decision, the session saved on the adopted version, the results matched to the version taught, both decks downloaded, the closed ring on Home, and no page errors.
- **The walk** (`scripts/walk.mjs`, run by hand) visits every screen and every loop step through the rail at its own address and files the sample results from Learn; it refreshed the six captures the repository tracks.
- The intro card describes the loop; the landing page's tour buttons state the length the script computes ("about 6 minutes"), registered in `docs/claims.md` and checked by `prove-journey`; the upload review rounds the spread to two places.
- The four smokes were already on the new routes from A2a and A2b; the section guides and the lecturer guide were already regenerated for the new screens, and the Evaluation table already shows the 179 checks, which A4 does not change.

| Command | Result |
|:--|:--|
| `npm run build` | Passed |
| `npm run smoke` | 19 of 19 passed (listed above) |
| `npm run smoke:integrity` | 2 of 2 passed |
| `npm run smoke:workspace` | 7 of 7 passed |
| `npm run smoke:curriculum` | 6 of 6 passed, including Dr Rahman's retain decision with its reason and the brief deck, teaching pack, outline and evidence report downloads |
| `node scripts/generate-guide.mjs --check` | Matches |
| `node scripts/walk.mjs` | WALK OK, 21 checks |
| `npm run typecheck`, `npm run prove:all` | Passed; 179 passed, 0 failed, sixteen suites |
| Contrast check, dash scan, backup migration | CONTRAST CHECK OK; no en or em dash in 231 text files; BACKUP MIGRATION OK |

Not done in A4, by design: the door step of the tour (A5); `docs/demo-script.md`, the booth checklist of Section 15 (A8); the README's screenshot captions (A8).

Accepted by: the Code lane (owner to sign).

### A5, the local door: 22 October 2026

What was built:

- **`mcp/`, a stdio MCP server** on the official TypeScript SDK (`@modelcontextprotocol/sdk` 1.32.1, with zod 4.6.7, its required peer). It reads the workspace backup named by `LYCEUM_WORKSPACE`, validates it with `parseWorkspaceBackup` exactly as the app's restore does, reads it again on every call, and offers six tools: `lyceum_courses`, `lyceum_sources`, `lyceum_evidence_report`, `lyceum_course_outline` and `lyceum_brief_draft`, annotated read-only, and `lyceum_teaching_pack`, which writes the app's own deterministic deck to a new absolute .pptx path and never overwrites. Every reply starts with the export time; every call is logged to stderr with the host, the tool, its arguments and the record ids it touched. No tool confirms, reviews, decides, adopts or sends. `npm run mcp` starts it.
- **`mcp/sample-workspace.json`**, the tour's end state on CS310 built by `node mcp/sample.ts` through the same store actions from `public/demo` (the dated Stripe sample and the sample results, read by the browser's own offline interpretation), identical on every run; `--check` reports a stale file. The door works offline from it.
- **`mcp/try.ts`**, a real stdio session: it spawns the server and speaks MCP to it with the SDK's client, as a desktop host does. Its run is quoted in docs/doors.md.
- **`skills/lyceum/SKILL.md`** under the Agent Skills specification: the loop, the labels, what the assistant may and must not say, and when to call each tool.
- **`docs/doors.md`**: the tools, the trust boundary, the one-dataset rule before a demo, the Claude Desktop and Claude Code configuration, the stdio transcript, the steps for the manual Claude Desktop run, and the sentence "Remote access and OAuth are planned."
- **Corrected on the way:** the exported evidence report said "Nothing was collected from the web" even when postings had been collected on request; it now names its sources (the A2a fix had reached the screen but not the report). The landing page's doors strip now says what exists: the MCP door "Local, read-only", the skill "Written", the rest Planned. The Evaluation suites live in `src/data/suites.ts`, and a proof ties the landing's check count to their total.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed (the typecheck now includes `mcp/`) |
| `node --test src/prove-mcp.ts` | 5 of 5 passed: the sample is current and validates; six tools, five annotated read-only; each read tool answers with its receipts, the export time and the right scope; the pack is the app's deck and is never overwritten, nor written to a relative path, a wrong extension or a missing folder; the workspace file is untouched; unknown courses, tampered and missing exports are refused; one log line per call with the host and the records |
| `node mcp/try.ts` | Connected over stdio to lyceum 3.0.0; six tools listed with their annotations; CS310's evidence report returned (9 reviewed postings, each share with its interval) |
| `node mcp/sample.ts --check` | The sample workspace matches the tour's end state |
| `npm run prove:all` | 184 passed, 0 failed, seventeen suites |
| `npm run build` | Passed |
| `npm run smoke:integrity`, `smoke`, `smoke:workspace`, `smoke:curriculum` | 2 of 2, 19 of 19, 7 of 7 and 6 of 6 passed |
| Guide check, contrast check, dash scan, backup migration | Matches; CONTRAST CHECK OK; no en or em dash in 239 text files (the sample workspace's verbatim postings are exempt, as the saved sample is); BACKUP MIGRATION OK |

`npm install` reported eight advisories in the production dependencies (xlsx with no fix, pptxgenjs and image-size whose fix is a major version, tar and node-pre-gyp, brace-expansion, hono, ip-address); no version was changed in Track A (docs/decisions.md).

Not done in A5, by design: the recorded Claude Desktop run (on the owner's list in docs/run-log.md, steps in docs/doors.md); remote access, OAuth and the other doors (Track B).

Accepted by: the Code lane (owner to sign).

### A6, deck, diagram, brief, poster: 22 October 2026

What was built:

- **`deck/`, the pitch as an HTML deck** at 1920 by 1080: the eleven slides of plan Section 14 in the order of the story spine, each with its speaker notes (the spoken gist, the timing, the transition and, on the last slide, the two answers rehearsed word for word). Real screenshots with a hairline border, the mascots where a helper is acting, the amber token for everything not built, the bundled faces through `theme.generated.css`, which `scripts/gen-deck.mjs` writes from the tokens. Keys: arrows, space, Page Up and Page Down, Home, End, F for full screen, N for the notes, V for the film. Five numbers in the whole talk: 1 of 9, 12 to 18 months, 39%, TRL 6 and 185 checks.
- **`scripts/gen-deck.mjs`** checks the deck as Chrome renders it (every figure in its claims row, every other number marked as a reference, the receipt against its source in the sample workspace, the waffle and calendar cells against their figures, the clauses word for word, no text into a footer, every image loaded, no dash), then exports the slides at 2x, a vector PDF and a PPTX with one image per slide and the notes as speaker notes (the film joins slide 5 as a media object once `deck/media/loop90.mp4` exists). It reads both back: the PDF's pages and digits with unpdf, the PPTX through PowerPoint itself. The exports are rebuilt, not committed.
- **`scripts/gen-architecture.mjs`**: the diagram of Section 12 in C4 notation (a title with its scope, a legend, every line labelled with its purpose and technology, built solid and planned dashed, readable in black and white), with three monochrome Simple Icons marks and the ownership line, to `docs/presentation/architecture.svg` and a 3840 by 2160 `.png`; `--check` compares the SVG. The deck uses the PNG, the brief and the poster the SVG.
- **`scripts/gen-brief-pdf.mjs`**, rewritten to the tokens and the six steps: three A4 pages carrying the eight beats, from the person and the receipt to the organiser's review and what was done about each point, and the ask. **`scripts/gen-poster.mjs`**: the A1 poster, landscape, with the loop and the mascots, the receipt, the latency, the architecture, what is real and the ask; its QR slot is marked planned until the landing page is deployed. Both check their numbers like the deck, through `scripts/lib/claims-node.mjs`.
- **`scripts/presentation-shots.mjs`** captures the loop from the sample workspace at a 1180 pixel window, with a refused paraphrase and a single count card; **`scripts/gen-sample-decks.mjs`** builds both sample decks from the same workspace and, with PowerPoint installed, exports the teaching pack's slides through **`scripts/render-pptx.ps1`**, which also reads a PPTX's slides, notes and media back.
- **`docs/brand-use.md`**: each mark shown, its source and its terms, and each product named in text with the reason.
- **Corrected on the way:** the ring's term no longer overflows the ring; History orders events saved in the same second by save order; the tour sets the term at the Course step and files the results under it, so the decision record, the version and the results carry the term the brief does; the tour's length moved to about 7 minutes in the claims register.

| Command | Result |
|:--|:--|
| `npm run deck` | Passed: 11 slides, five figures in the claims register, the receipt in its source, the clauses word for word, no dash; PDF 2,461 KB, 11 pages read back with every digit registered or a reference; PPTX 5,039 KB opened in PowerPoint, 11 slides at 960 by 540 points, every slide's notes as written, no media object yet (the film is A7) |
| `node scripts/gen-brief-pdf.mjs` | Passed: three pages, every number registered or a reference, 8.1, 20.8 and 5.6 mm spare above the footers |
| `node scripts/gen-poster.mjs` | Passed: A1 landscape, every number registered or a reference, every card inside its row |
| `node scripts/gen-sample-decks.mjs` | Both decks written from the sample workspace; PowerPoint opened the pack, 6 slides with their notes |
| `node scripts/gen-architecture.mjs --check` | The architecture diagram matches its generator |
| `npm run typecheck` | Passed |
| `npm run prove:all` | 185 passed, 0 failed, seventeen suites |
| `npm run build` | Passed |
| `npm run smoke`, `smoke:integrity`, `smoke:workspace`, `smoke:curriculum` | 19 of 19, 2 of 2, 7 of 7 and 6 of 6 passed |
| `node scripts/walk.mjs` | WALK OK, 21 checks |
| Guide check, contrast check, dash scan, backup migration, theme, mascot and sample checks | Matches; CONTRAST CHECK OK (61 ratios, 176 files, 37 generated outputs); no en or em dash in 250 text files; BACKUP MIGRATION OK; all generated outputs current |

The C4 checklist for the diagram: title and scope, yes; legend, yes; every line labelled with direction, purpose and technology, yes; built and planned told apart by stroke as well as by a worded tag, so it reads in black and white, yes; one colour per meaning, yes.

Not done in A6: the film inside the deck and the PPTX (A7 renders it); the playback test and the visual review on two screens, which need the presenting laptop and the Deck and poster lane; the poster's QR code (Needs the owner, item 3); marks beyond Claude, MCP and Greenhouse (Needs the owner, item 1).

Accepted by: the Deck and poster lane (owner to sign).

### A7, the film (the parts that need no human voice): 22 October 2026

What was built:

- **`video/script.md`, `video/storyboard.md` and `video/style.md`**: both cuts in the order of the story spine, Loop90 (beats 1, 3, 4, 5 and 8) and Afternoon (all eight), two voices (the host for Lyceum, Dr Aisyah for the sceptic) with the stressed words marked; every scene's picture and the cue word each move waits for; and the Dataworks style guide rewritten for the tokens as Section 16.1 specifies, with no blur anywhere.
- **`video/capture/capture.mjs`** records the real app once: the self-driving tour with `?demoSample` (the dated saved sample of Stripe's board from the start, offline), at 1920 by 1080, its caption bar hidden and its cursor kept, with the time of every tour caption. The browser's own screencast frames go straight into ffmpeg, which stamps each with its arrival time, so the video keeps the tour's clock; a two-pixel heartbeat keeps the page painting, and the capture fails if the video and the tour differ by more than 2 s. Each app scene plays excerpts of that one recording, named in the script by the tour caption they start at.
- **`video/remotion/`**, a Remotion 4.0.537 project with the compositions **Loop90** and **Afternoon**: the forest field with the drifting dot grid; chapter chips with the acting helper and "saved sample" on footage; the host (the app's own drawing, with a mouth that opens with the voice's loudness) and the faceless lecturer figure as the two speaking avatars; the seven helpers at their stations; captions with the speaker's colour bar and stressed words in lime; numbers counting up to the exact claims-register values (1 of 9, 12 to 18 months, 39%, TRL 6, 185); soft circle wipes between scenes. `scripts/sync.mjs` builds the timeline from the script, the storyboard, the claims register (the receipt checked against the sample workspace), the capture and the recordings once they exist; `scripts/render.mjs` draws the frames once as PNG and encodes the master and the 720p copy from them, with the captions and the chapters; `scripts/determinism.mjs` renders the frames twice, diffs them before encoding and measures any difference.
- **App changes for the film:** the `?demoSample` flag for the tour, data attributes on the tour overlay's caption, progress and controls, and an optional `mouth` on the host's drawing (unchanged in the app and in the generated mascot files).

| Command | Result |
|:--|:--|
| `node video/capture/capture.mjs` | The tour recorded at 1920 by 1080: 380.97 s of video for 380.9 s of tour, 17,610 frames, 75 captions marked (the third attempt; the first two drifted 11 and 13 s, docs/decisions.md) |
| `node scripts/sync.mjs` (in `video/remotion`) | Loop90 1:27, 7 scenes, 33 captions; Afternoon 3:26, 13 scenes, 64 captions; every cue word found, every clip anchor found, every number in a caption registered, no dash; 0 of 41 lines recorded |
| `node scripts/render.mjs Loop90` | 1:27 (86.8 s), 1920 by 1080, 30 fps, H.264, silent: 13,802,507 bytes, and the 720p copy, 2,781,341 bytes, encoded from the same frames; 33 captions in `loop90.srt`, 6 chapters |
| `node scripts/determinism.mjs Loop90` | Passed: 2,603 frames rendered twice; 2,445 identical byte for byte, and 158 differ by at most 1 level in 1 to 12 pixels (275 pixels in all, in drawn and app scenes alike: the rasteriser's rounding); one set of frames encoded twice gave the same file byte for byte. Three attempts at a byte-identical render came first (Remotion's own H.264 path, PNG frames with the system ffmpeg, Chrome's software renderer); they found a blurred shadow that rasterised differently on every render, now a flat one (docs/decisions.md, the run log) |
| `node scripts/render.mjs Afternoon --master-only` | 3:26 (206.2 s), 1920 by 1080, 30 fps, H.264, silent: 30,147,578 bytes; 64 captions in `afternoon.srt`, 12 chapters; four frames pulled from it show the latency pair, Report's helpers beside the footage, the proof scene counting up to 185 and the ring at the close |
| `npm run deck` with the film in `deck/media` | Chrome loads the film on slide 5 (86.8 s at 1920 by 1080); the PDF read back, 11 pages; the PPTX, 19,342 KB, opened in PowerPoint with 11 slides, every note and 1 media object |
| `npx tsc --noEmit` (in `video/remotion`) | Passed |
| `npm run typecheck`, `npm run prove:all` | Passed; 185 passed, 0 failed |
| `npm run build`, `smoke`, `smoke:integrity`, `smoke:workspace`, `smoke:curriculum`, `node scripts/walk.mjs` | Passed; 19 of 19, 2 of 2, 7 of 7 and 6 of 6; WALK OK, 21 checks (the tour now sets the term at the Course step and files the results under it) |
| Guide check, contrast check, dash scan, backup migration, theme, mascot, architecture and sample checks | Matches; CONTRAST CHECK OK (193 files, 37 generated SVGs); no en or em dash in 274 text files; BACKUP MIGRATION OK; all generated outputs current |

The review checklist of Section 16, as far as it can run without a person: every number on screen is one of the four registered film figures, and the sync refuses any other in a caption; app footage carries "saved sample" in its chip; no dash in any caption; it reads with the sound off, because it has no sound yet and the captions are always on; Loop90 is under its 90 seconds, and Afternoon, at 3:26 from the script's words at 2.6 a second, lands near three minutes only at a quicker reading pace, so the recorded voices decide; the phone watch needs a person.

Not done in A7, by design: the voices (the team's), the transcription that follows them, the music bed and its licence, the phone watch, and the Remotion licence question (all in `video/README.md`).

Accepted by: the Video lane (owner to sign).

### A8, documentation and the full verification: 22 October 2026

What was done:

- **This record** in the Amanah shape: the stamp, what Lyceum is, plan versus built with its known mismatches, exact versions, the layout, the full verification and what needs a person, with each package's own section kept below as the changelog; the 9 October report moved to `docs/history/`.
- **`docs/claims.md`** lists every figure on the landing page, the deck, the brief, the poster, the film and the README, where each appears and which check holds it. A Codex audit read it row by row against the notes; where a line was stronger than its source it now says what the source says: employers expect the 39%, the approval time is at the US universities cited, the Malaysian 3.2% is of graduates in the labour force, Biggs is a teaching principle, and the landing's unsourced "the asks change within a year" is gone.
- **The deck** after the Codex pitch review: the ChatGPT door said as planned in the rehearsed answer, formal approval kept apart from what Lyceum records, the forecast no longer tied to the approval time, "TRL 7 needs" as the register says, no claim about what every lecturer wants, the revision and the synthetic sample results named, "People decide" back in the spoken close, and the notes of slides 1, 8 and 10 cut to fit 140 words a minute.
- **The loop graphic** on the landing page, How it works, the deck, the poster and the film: nine stations in loop order, Lens at Report and again at Learn, so no ring reads Learn before Decide.
- **Synthetic sample records say so**: results and surveys filed from the app's own sample files carry an optional `sample` flag and a "Sample file, synthetic marks" tag on Learn, the course overview, the Data room and the upload receipt; the sample workspace carries it, and the door's proof asserts it.
- **`README.md`** in the house layout (banner, card, badges, the about block with a real command and its output, paired real screenshots, the loop, the checks, the architecture, decisions, phases, what was not chased, licences), its art from shuden's `build.py` with only the config block changed and every colour a token; **`JUDGES.md`**, **`team-overlay/FEEDBACK.md`** and the team README refreshed to the loop; **`docs/demo-script.md`** for the booth, with what each of the ten bank questions rests on; the lecturer guide regenerated with the term at the Course step.
- **Three Codex reviews**, read-only with only the named files on stdin: the pitch, the claims audit and the question bank, kept as written in `docs/review/` with their run logs; every finding acted on was checked first against the notes and the code.
- **The film** rendered again with the corrected lines and the nine-station ring, and its frames diffed again.

The verification is section 5 of this record.

Accepted by: the Code lane (owner to sign).

### After A8, the owner's follow-ups: 22 October 2026

- **The sample's dates.** The seed clock moved from 1 July to 22 October 2026, after the saved sample's retrieval, so no brief, decision or result in the sample workspace, the screenshots, the deck, the brief or the poster is dated before the postings it cites; the journey proofs now build their moments from the clock (docs/decisions.md, 11:08).
- **The kept files.** This run's render experiments and leftover frame folders deleted on the owner's word, about 4 GB.
- **The landing page, public.** On the owner's word, the production build is a static site on Vercel, project `lyceum`, at <https://lyceum-rho.vercel.app>, and the poster carries a QR code to its landing page, `#/index` (docs/decisions.md, 11:34 and 11:36).
- **A friendlier workspace.** On the owner's direction, approved on a concept: the loop as a path of round stops across the top of every step, each stop with its state in a word and a mark and its count, the save status and the kind of course beside the course's name; the step's helper asking its question in a speech bubble (a scale at Decide); 2 px forest outlines and a flat lip under every control and panel, pills for tags, bolder type and more air; the sandbox folded in the sidebar; sign-in and the landing page in the same style; Watch shorter without changing the tour. Plan Sections 5.2, 6.4 and 6.6 revised to match; the screenshots, the deck, the brief, the poster and the film rebuilt from it (docs/decisions.md, 12:00 and 12:52).
- **The team repository.** On the owner's word, the team's main carries the working code and what its checks and generators read, without the plans, the run records, the reviews, the history or the booth script (`scripts/team.mjs`), and its README is cut to running, checking, the code map, the UI rules and how the team works. A fresh install of the exact snapshot passed every check and smoke, after a fix to the theme check that every Windows clone would have failed (docs/decisions.md, 13:47).
- **The text people see.** Repeated lines, filler subtitles, duplicate buttons and per-row repeats cut; every honesty label, number, receipt and checked string kept; count grammar and raw timestamps fixed, and the Guide's out-of-date first card rewritten. Visible words across the 25 screens fell from 7,911 to 7,065 (docs/decisions.md, 14:00).
- The full verification ran again on the change; section 5 has the results.

## 8. Changelog: Track C, package by package

The depth plan's packages ([lyceum-depth-plan.md](lyceum-depth-plan.md)), each with what it built and its checks; the dated verification table follows each tier's D8 run. Decisions are in [decisions.md](decisions.md), the run in [run-log.md](run-log.md).

### D0, the institution and the mark: 22 October 2026

- `InstitutionProfile` (plan Section 3.1) in the store and the backup at schema 6, with the demo values (UTP, labelled demo; the KPI 50% of students at 55 or above; the survey scale 1 to 5, target 4; the floor 5 responses and 25% of the class, the stricter applied; results after grades; Moodle; the controller line), each with where its default comes from; edited by a coordinator in the Guide page's Institution panel.
- The partner mark: `scripts/gen-partner-marks.mjs` copies the owner's `utp.svg` into `public/brand/partners/` and rasterises it; the contrast check's one exception for that folder, approved by the owner, with a negative test showing a planted hex elsewhere still fails; `docs/brand-use.md` records the advisor's confirmation as the permission on file. The mark is shown nowhere yet.
- CLAUDE.md gains the depth plan in its read order and the owner's two clauses (sample fixtures; partner marks); `DEMO_LINE` holds the honesty line of Section 3.3.
- Checks: typecheck; prove:all 185 passed, seventeen suites; the migration check restores schemas 3 to 6 (28 checks); the contrast check OK; the build; `smoke:workspace` 7 of 7; `smoke:curriculum` 6 of 6.
