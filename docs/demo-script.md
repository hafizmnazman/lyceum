# The booth demo

Ten minutes including questions, for the second judge team (plan Section 15; the format is in `docs/competition/grand-final-2026.md`). Two people: a **narrator** who never touches the keyboard and an **operator** who never speaks over the narrator. Every step below is also driven by a check, named beside it, so the path the judges see is the path the checks prove.

## Before each run

| Do | Why | Checked by |
|:--|:--|:--|
| Build once: `npm run build`, then serve it (`npm run preview`, or the local API with `npm run dev` if the live fetch is wanted) | The demo runs the built app | `npm run smoke` runs the same build |
| Test the network. If it is down, the dated saved sample stands in, and the narrator says so before Watch | Honest provenance | The tour's `sampleIfFailed` step; the curriculum smoke |
| Sign in as Dr Sobri; Guide & progress, Backups: restore the starting backup if a previous run left records | One dataset for everything | `npm run smoke:curriculum` restores a backup the same way |
| Leave the judge's page (`#/judge`) open in a second tab for judges who want to walk it themselves | They walk the loop with Tualang on the sample workspace while the narrator talks to another team | `npm run smoke:workspace` walks it by keyboard at desktop and phone width |
| Between teams, the kiosk (`#/kiosk`) on the second screen, after `node scripts/kiosk-film.mjs` once copies the 90-second render beside the app | The loop plays muted with a pause, a touch walks the loop, and thirty idle seconds bring the next visitor back; Leave kiosk mode ends it | `npm run smoke:workspace` waits out the thirty seconds; `node --test src/prove-judge.ts` |
| Claude Desktop configured with the door (`docs/doors.md`), the app's export saved where the config points | The door answers from what is on screen | `node --test src/prove-mcp.ts`; the manual run in `docs/doors.md` |
| On the laptop and a USB stick: the narrated 60-second recording, the 90-second film (`video/out/loop90.mp4`), the full tour recording | Never debug live | Played once on the laptop before the session |
| For the survey on phones: `npm run booth`, which builds and serves the app to the laptop's network beside the local API; the phones join the team's hotspot; on Learn choose the Wi-Fi address if the laptop lists more than one; let Node.js through the Windows firewall on the hotspot, a private network. If another program holds port 8787 (Docker Desktop does on the build laptop), move both: `$env:PORT=8790; npm run booth` in PowerShell | The QR must reach the laptop. Only a phone's two survey routes answer the network; the model route, file parsing and the collector's responses answer the laptop alone | `npm run smoke:workspace` (the booth round trip); the network checks in `docs/run-log.md`, D3a |

## The path, six minutes

| Step | The operator does | The narrator says | Do not say | Checked by |
|:--|:--|:--|:--|:--|
| Course | Opens CS310 and sets the term, 2026/2027 semester 1 | "One course, one term, the whole loop. Every record we make carries this term." | That CS310 is a university's real course: it is the demo's seeded course | The tour and `npm run smoke` |
| Watch | Fetches Stripe's public board on Greenhouse (or the saved sample), keeps the postings | "Research the lecturer runs, on request, from a board whose policy we state. Each posting keeps its link, its date and a fingerprint." | "We scrape LinkedIn", or anything about boards we do not read | `npm run smoke`; `node --test src/prove-collect.ts` |
| Report | Names the skills, scans, confirms the proposals beside their sources; types a paraphrase and lets it fail; reviews the postings; shows the count; maps dashboards to CLO5; prepares and sends the brief | "A quotation is exact or it is refused. The count is over the postings the lecturer reviewed, with its interval." Pause after the refusal. | A percentage without its denominator; "employers want", where the screen says "postings quote" | `npm run smoke`; `node --test src/prove-evidence.ts src/prove-research.ts` |
| Decide | Switches to Dr Rahman; opens the brief on Home; writes the reason; records adopt | "People decide, and the decision leaves a record: who, when, why, on which brief, for which version and term." | That the decision is the university's approval: formal approval stays in its process | `npm run smoke` asserts the decision and the event order |
| Update | Back to Dr Sobri; starts the revision, sharpens the outcome, adds the dashboards topic within the hours, checks, adopts; opens History | "The change the decision approved, checked against the hours and the protected topics. The old version is kept." | That the revision is better teaching: it is a checked change | `npm run smoke`; `node --test src/prove-curriculum.ts` |
| The before and after (new) | In History, opens "Compare with CS310-v1" on the new version and points at the decision link | "What changed, word by word and hour by hour, and the decision that authorised it, one click away." | That the redline is the university's tracked change: it compares two stored versions in this workspace | `node --test src/prove-diff.ts` (the diff, the summary, the decision link); `npm run smoke:curriculum` |
| Teach | Saves the week 6 session and downloads its pack; opens it in PowerPoint | "An editable pack built from the records. No model wrote a word of it." | That the pack is ready to teach without the lecturer's review; that no model wrote any of the sample course's wording, which the build session wrote as a labelled fixture (the narrator's line waits on Needs the owner 2 in `docs/run-log.md`) | `npm run smoke` asserts both downloads; `node --test src/prove-slides.ts src/prove-materials.ts` |
| Learn | Files the sample results under the term and the version taught; scrolls to the OBE course report and saves it as printed | "The app's sample results, synthetic marks, against the pass mark the institution states. CLO4 is below the KPI, and the report says so; CLO3 has three students without a mark, so it carries an interval, for that and nothing else. We claim no learning gain until the benchmark has run." | That the marks are a real cohort's; that the survey's share and the marks' share are one measure or can be averaged; a programme PLO figure; any learning gain, any prediction | `npm run smoke`; `node --test src/prove-journey.ts src/prove-attainment.ts` |
| The survey on the judges' phones (new) | On Learn, prepares the term's two surveys and opens the Course Outcome Survey with the class size; shows the QR; after the judges answer, presses Collect | "Your answers reached this laptop, and nothing in them identifies you. They demonstrate the collector, so they never count: below the floor, and before grades are released, nothing shows." | That the judges' answers are results; that the collector is a campus survey system; any share from the booth | `node --test src/prove-surveys.ts`; `npm run smoke:workspace` (the booth round trip) |
| The door | In Claude Desktop, asks for CS310's evidence report | "An assistant asks Lyceum for the evidence, through a local, read-only door. Every line comes back with its receipt." | That remote access, ChatGPT, Copilot or the LMS doors are built: they are planned | `node --test src/prove-mcp.ts`; `node mcp/try.ts` |

Home then shows the ring closed for the term; the narrator ends on "Every semester adds a ring."

| Step | The operator does | The narrator says | Do not say | Checked by |
|:--|:--|:--|:--|:--|
| The recap, at the close (new) | From Home, opens The term recap and hands the printed A4 to the judges | Nothing new: the recap is the afternoon on one page, and the last claim was the receipt | Any figure that is not on the page; a new claim after the receipt | `node --test src/prove-judge.ts` (every number against its record); `npm run smoke:workspace` (the recap opens at 320 px) |

The new steps keep the path under six minutes by cutting narration, not steps; the Story lane times it on 26 October. Before the session, print one recap per judge team from the sample workspace (Guide & progress, Backups, or the judge's page's walk, which restores it).

## If something fails

Say what happened in one sentence, switch, and keep going: the saved sample if the network fails (the log says so on screen); the 60-second recording if the app fails; the 90-second film if the laptop's screen fails us; the full tour recording if the questions run long. Each switch is rehearsed as a step of its own, with its sentence.

## Questions

The bank is plan Section 14's ten questions. Two answers are rehearsed word for word and are in the deck's notes for slide 11 (`deck/index.html`); the Story lane writes the other eight in the team's words, one breath each, ending on what is on screen. What each answer rests on:

| Question | The answer rests on | On screen |
|:--|:--|:--|
| Is this scraping? | Collection runs only when the lecturer asks, from a named employer's public board through the API its owner documents (Greenhouse or Lever), with the source policy shown; each posting keeps its link, its date and a fingerprint (`src/lib/collect.ts`) | Watch: the source policy and the run log |
| Where is the AI? | Rehearsed word for word (slide 11's notes) | The door in Claude Desktop |
| Why not ChatGPT alone? | Rehearsed word for word (slide 11's notes) | The refused paraphrase |
| How do we know the postings are representative? | We do not claim they are: counts are over the postings the lecturer reviewed, from a named board, with Wilson intervals | Count: n of N and the interval |
| What breaks first at scale? | The review time, because a person reviews every posting a count uses; and the workspace lives in one browser until the shared workspace is built (planned) | Slide 8: what is not built |
| Does it decide the syllabus? | No: a person records the decision and its reason at Decide, and formal approval stays in the university's process | The decision record |
| Why another tool? | It reaches the tools lecturers already use: the local door serves the evidence report to an MCP client (tested with the official client; the Claude Desktop run is still to be recorded), and the pack is an editable PowerPoint; the LMS and office doors are planned | Slide 9: the doors |
| What does the free tier cost us? | Slide 10's notes: "Nothing to try: one course, one laptop, no account." | Slide 10: the ladder |
| What is the benchmark? | Predictions frozen before a semester and scored against the last cohort carried forward (plan Section 9); it has not been run, so no learning gain is claimed | Evaluation |
| Is lime readable? | Lime text sits only on forest, where it passes WCAG AAA, and never carries text, bars or lines on a light surface (`docs/design/colour-scheme-audit-2026-10-22.md`) | The app's header, the poster |

Every number the narrator may say is in `docs/claims.md`.

## Rehearsal

Twice on 26 October, with `npm run smoke` under turbo as the warm-up, timed: the path under six minutes, the whole slot under ten.
