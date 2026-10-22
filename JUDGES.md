<p align="center"><img src="public/brand/mascots/host-greeting-512.png" width="160" alt="Tualang, Lyceum's host: a round green figure with a leaf, in its greeting pose"></p>

# Five minutes with Lyceum (for judges)

Tualang, Lyceum's host, greets you on the judge's page and signs off at the end of the walk; the app's own captions do the explaining. Lyceum turns real job postings into a course decision with receipts, every semester, inside the tools lecturers already use. What is worth judging is the loop: six steps a lecturer runs on one course for one term, each ending in a record, with people deciding at the one step that changes the course. No model key or external account is needed. Live collection needs the local API and a network connection; a dated saved sample of real postings works without them.

```bash
npm install
npm run dev         # the web workspace and the local API (document parsing, live board collection); open the printed URL
npm run booth       # the built app on this laptop's network beside the local API, for the survey on your phone
```

`npm run build` then `npm run preview` serves the workspace alone; the saved sample, the walk and the tour still work there. On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`. For the survey on phones, `npm run booth` serves the app to the laptop's network; the phones join the same Wi-Fi or hotspot, and only a phone's two survey routes answer them.

## Things to try, in order

1. **The judge's page.** On the landing page choose **For judges: walk with Tualang**, or open `#/judge`. Tualang's one line, three ways in, what is proven today, and the card of what is not built, word for word from the Guide.
2. **The walk.** Choose **Walk the loop**: ten stops over the real app on the sample workspace, which is the tour's end state. Next, Back and Esc move it, nothing moves by itself, and each stop's caption carries its label: real postings and quotations, a sample course labelled synthetic, synthetic marks. The walk replaces this browser's workspace and keeps the current one as a recovery copy under Guide & progress, Backups.
3. **The before and after.** Choose **Before and after**: CLO5's words as a redline, each topic's hours with the change in words, the week 6 pack under both versions with the changed slide outlined, and the decision that authorised the change, opened from History.
4. **The course file.** In CS310's Course step, **Export the course file (.zip)**: the course record, the rubrics, the decisions and versions, the packs, the lab sheets and the project brief, with `MANIFEST.md` marking each item present, sample, not yet built or not included. It is the shape of a course file; no accreditation is claimed.
5. **The term recap.** From Home once the ring closes, or History: **The term recap**, one A4 page from the records (what employers asked for, what was decided, what changed, what was taught, what came back), printable.
6. **The survey on your phone.** On CS310's Learn step, **Prepare this term's two surveys**, then open the Course Outcome Survey for the booth collector: the QR carries a short link. Answer on your phone; a device answers once, and nothing you send identifies you. **Collect responses** shows "1 from 1 device", marked not course evidence: booth answers never count, and below the floor (5 responses and 25% of the class, the stricter) or before the coordinator records grades released, no result shows. Last term's two surveys, a sample, show what an open result looks like.
7. **The OBE course report.** Below Learn's results: each outcome's students at or above the stated pass mark of 55 over n, with N beside it and an interval only where some have no mark, the KPI met or not, the Course Outcome Survey's share beside it and never averaged with it, the programme outcomes listed with no index, and the CQI note. **Last term's report, a sample** has both columns open. Save it as printed, or print it on one A4 page.

## The loop

| Step | The question it answers | The record it leaves |
|:--|:--|:--|
| Course (setup) | What does this course promise today, and for which term? | The course record, in the shape of a course file, and the term every later record carries |
| Watch | What are employers asking for, right now? | Postings fetched on request, each with its link, its date and a fingerprint |
| Report | What exactly do they ask, how often, and what does the course do about it? | Exact quotations, the reviewed denominator, counts with intervals, a mapping, the brief |
| Decide | What will we do, and who said so? | A decision record: adopt, retain, defer or return, by whom, when, why, on which brief, version and term |
| Update | What does the approved change look like, within our hours? | A checked revision, adopted as a new version with the old one kept, and the before and after |
| Teach | What will the class do, and with what? | A session linked to an outcome and its editable teaching pack |
| Learn | Did it work, as far as we can honestly tell? | The term's results, matched to the version taught, against a stated pass mark with n of N, and the OBE course report |

The ring on Home closes when every step has its record for the term.

## Hands off: the tour

On the landing page, choose **Watch the tour**, about 7 minutes. A cursor plays over the real app: Dr Sobri sets the term, fetches Stripe's public board (the dated saved sample stands in if the network fails, and the log says so), confirms exact quotations, watches a paraphrase be refused, reviews the postings, counts, maps dashboards to CLO5 and sends the brief; Dr Rahman decides adopt with a reason; Dr Sobri adopts the revision, saves the session and its pack, files the sample results, and Home shows the ring closed. Press Escape to take over; playing resets the local workspace and warns first if it finds saved work.

## Hands on

Sign in as **Dr Sobri**, open **Courses**, then **CS310**. The path of round stops across the top follows the loop: green with a check when a step's record exists, dark where you are. Each step opens with its question, asked by the step's helper, and ends with the handoff to the next.

1. **Course.** Read the course record (outcomes and the matrix, the assessment plan and rubrics, the fourteen-week schedule with each week's material, the references) and set the term, 2026/2027 semester 1.
2. **Watch.** Keep the saved sample, fetch, select the postings and keep them.
3. **Report.** In **Quote**, name `SQL, Python, dashboards|dashboard, stakeholders|stakeholder`, scan, and confirm the proposals beside their sources; then type a paraphrase under **Quote a requirement by hand** and watch it be refused. In **Review**, acknowledge the extraction and mark the postings reviewed. **Count** shows each skill over the reviewed postings with its interval; **Map** maps dashboards to CLO5; **Brief** prepares the brief and sends it to Dr Rahman.
4. **Decide.** Switch to **Dr Rahman** from the account menu. On **Home**, open the brief, write the reason and record **Adopt**. A decision on your own brief is labelled self-recorded and stays open until a second person confirms.
5. **Update.** Back as Dr Sobri, start a revision, change the outline within the hours, check it and adopt it. The check panel shows the change as a redline and the hours as current against proposed; **History** shows both versions, the decision behind the new one, and the week's pack under each.
6. **Teach.** Save a session linked to CLO5 and download its teaching pack. The generator adds no text of its own; the term's fourteen sample sessions beside it are written for this prototype and labelled synthetic on every slide.
7. **Learn.** File the sample results under the term and the version taught. Each outcome shows the students at or above the pass mark of 55 with n of N; CLO3 carries an interval because three students have no mark, and CLO4 sits below the KPI. The OBE course report follows, with the CQI note and **Save the report as printed**. The sample file's marks are synthetic, and the screen says so. No learning gain is claimed.

Then open **How it works** for the record of the afternoon by role, and **Evaluation** for the live checks and the suites.

## The local door

`node mcp/try.ts` starts the read-only MCP server over `mcp/sample-workspace.json` (the tour's end state) and asks it for CS310's evidence report through the official client. [docs/doors.md](docs/doors.md) has the Claude Desktop and Claude Code configuration. Remote access, OAuth and the other doors are planned.

## The pitch, the film and the print

- `deck/`: the eleven slides of the pitch, in the theme, with speaker notes; `npm run deck` checks every figure against [docs/claims.md](docs/claims.md) and exports the PDF and the PPTX.
- `video/`: the film's script, storyboard and style, the capture of the real app and the Remotion project for both cuts, rendered silent with captions until the team records the voices (`video/README.md` says how to render and check it).
- `docs/presentation/`: the brief (`lyceum-brief.pdf`), the A1 poster (`poster-a1.pdf`), the architecture diagram and the screenshots, all generated from the app and the tokens. The screenshots and the film predate this week's course record, walk, recap, surveys and OBE report; they are captured again once, at the end.

## Checks

`npm run prove:all` runs 250 checks in twenty-four suites. After `npm run build`, `npm run smoke`, `smoke:integrity`, `smoke:workspace` and `smoke:curriculum` drive the built app in a headless browser: the first plays the whole tour, and the workspace smoke walks the judge's ten stops by keyboard at desktop and phone width and answers the survey from a 320 px phone through the booth collector. [docs/as-built.md](docs/as-built.md) records every run with its date. These are software checks, not learning validation.

## What is real and what is not

- **Real:** requested board collection, exact-quotation validation, reviewed denominators, counts with intervals, decision records, checked revisions and their before and after, teaching packs, results matched to versions, attainment against a stated pass mark and the OBE course report, the two student surveys with the booth collector, the floor and the release rule, the Microsoft Forms importer, backups, the local read-only door. The saved sample is real Stripe postings retrieved on 9 October 2026, truncated and labelled as a saved sample.
- **Sample:** the CS310 course record, its fourteen sessions with their slides, lab sheets and project brief, its results for two terms and last term's two surveys with their responses and comments, written for this prototype and labelled synthetic. The SSRT is a demo instrument, unvalidated. UTP appears as a labelled demo institution: CS310 is not a UTP course outline.
- **Prototype:** the personas, the seeded courses and browser-local role switching. Sending a brief is an in-app local workflow, not a message to anyone.
- **Illustrative:** the sandbox's market figures and learner records; the sidebar labels the sandbox and its screens carry the notice. The sample results and survey files in `public/demo` hold synthetic marks and responses, and every record filed from them says so.
- **Planned:** the shared workspace and sign-in, the remote assistant doors, the LMS door, the other survey importers and the paste code, pooling, frozen predictions, comment themes, the programme's PLO figure, the benchmark run, scheduled watching.
- **Never claimed:** representative labour-market counts, employability scores, learning gains or accreditation. No lecturer pilot has run. Formal approval stays in the university's process.
