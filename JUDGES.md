# Five minutes with Lyceum (for judges)

Lyceum turns real job postings into a course decision with receipts, every semester, inside the tools lecturers already use. What is worth judging is the loop: six steps a lecturer runs on one course for one term, each ending in a record, with people deciding at the one step that changes the course. No model key or external account is needed. Live collection needs the local API and a network connection; a dated saved sample of real postings works without them.

```bash
npm install
npm run dev         # the web workspace and the local API (document parsing, live board collection); open the printed URL
```

`npm run build` then `npm run preview` serves the workspace alone; the saved sample still works there. On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`.

## The loop

| Step | The question it answers | The record it leaves |
|:--|:--|:--|
| Course (setup) | What does this course promise today, and for which term? | The outline, and the term every later record carries |
| Watch | What are employers asking for, right now? | Postings fetched on request, each with its link, its date and a fingerprint |
| Report | What exactly do they ask, how often, and what does the course do about it? | Exact quotations, the reviewed denominator, counts with intervals, a mapping, the brief |
| Decide | What will we do, and who said so? | A decision record: adopt, retain, defer or return, by whom, when, why, on which brief, version and term |
| Update | What does the approved change look like, within our hours? | A checked revision, adopted as a new version with the old one kept |
| Teach | What will the class do, and with what? | A session linked to an outcome and its editable teaching pack |
| Learn | Did it work, as far as we can honestly tell? | The term's results, matched to the version taught, with n of N |

The ring on Home closes when every step has its record for the term.

## Option A: hands off

On the public landing page (`#/index`, **See how Lyceum works** on the sign-in screen), choose **Watch the tour**, about 7 minutes. A cursor plays over the real app: Dr Sobri sets the term, fetches Stripe's public board (the dated saved sample stands in if the network fails, and the log says so), confirms exact quotations, watches a paraphrase be refused, reviews the postings, counts, maps dashboards to CLO5 and sends the brief; Dr Rahman decides adopt with a reason; Dr Sobri adopts the revision, saves the session and its pack, files the sample results, and Home shows the ring closed. Press Escape to take over; playing resets the local workspace and warns first if it finds saved work.

## Option B: hands on

Sign in as **Dr Sobri**, open **Courses**, then **CS310**. The rail beside the course follows the loop; each step opens with its question and ends with the handoff to the next.

1. **Course.** Set the term, 2026/2027 semester 1.
2. **Watch.** Keep the saved sample, fetch, select the postings and keep them.
3. **Report.** In **Quote**, name `SQL, Python, dashboards|dashboard, stakeholders|stakeholder`, scan, and confirm the proposals beside their sources; then type a paraphrase under **Quote a requirement by hand** and watch it be refused. In **Review**, acknowledge the extraction and mark the postings reviewed. **Count** shows each skill over the reviewed postings with its interval; **Map** maps dashboards to CLO5; **Brief** prepares the brief and sends it to Dr Rahman.
4. **Decide.** Switch to **Dr Rahman** from the account menu. On **Home**, open the brief, write the reason and record **Adopt**. A decision on your own brief is labelled self-recorded and stays open until a second person confirms.
5. **Update.** Back as Dr Sobri, start a revision, change the outline within the hours, check it and adopt it. **History** shows both versions and the decision.
6. **Teach.** Save a session linked to CLO5 and download its teaching pack: editable slides with the evidence and no model text.
7. **Learn.** File the sample results under the term and the version taught; attainment per outcome shows n of N. The sample file's marks are synthetic, and the screen says so. No learning gain is claimed.

Then open **How it works** for the record of the afternoon by role, and **Evaluation** for the live checks and the suites.

## The local door

`node mcp/try.ts` starts the read-only MCP server over `mcp/sample-workspace.json` (the tour's end state) and asks it for CS310's evidence report through the official client. [docs/doors.md](docs/doors.md) has the Claude Desktop and Claude Code configuration. Remote access, OAuth and the other doors are planned.

## The pitch, the film and the print

- `deck/`: the eleven slides of the pitch, in the theme, with speaker notes; `npm run deck` checks every figure against [docs/claims.md](docs/claims.md) and exports the PDF and the PPTX.
- `video/`: the film's script, storyboard and style, the capture of the real app and the Remotion project for both cuts, rendered silent with captions until the team records the voices (`video/README.md` says how to render and check it).
- `docs/presentation/`: the brief (`lyceum-brief.pdf`), the A1 poster (`poster-a1.pdf`), the architecture diagram and the screenshots, all generated from the app and the tokens.

## Checks

`npm run prove:all` runs 185 checks in seventeen suites. After `npm run build`, `npm run smoke`, `smoke:integrity`, `smoke:workspace` and `smoke:curriculum` drive the built app in a headless browser, the first through the whole tour. [docs/as-built.md](docs/as-built.md) records every run with its date. These are software checks, not learning validation.

## What is real and what is not

- **Real:** requested board collection, exact-quotation validation, reviewed denominators, counts with intervals, decision records, checked revisions, teaching packs, results matched to versions, backups, the local read-only door. The saved sample is real Stripe postings retrieved on 9 October 2026, truncated and labelled as a saved sample.
- **Prototype:** the personas, the seeded courses and browser-local role switching. Sending a brief is an in-app local workflow, not a message to anyone.
- **Illustrative:** the sandbox's market figures and learner records; the sidebar labels the sandbox and its screens carry the notice. The sample results and survey files in `public/demo` hold synthetic marks and responses, and every record filed from them says so.
- **Planned:** the shared workspace and sign-in, the remote assistant doors, the LMS door, Learn's intervals, pooling and perception gap, the benchmark run, scheduled watching.
- **Never claimed:** representative labour-market counts, employability scores, learning gains or accreditation. No lecturer pilot has run. Formal approval stays in the university's process.
