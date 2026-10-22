# Feedback and open work

What the organizer said about Lyceum in October 2026, what has been done about it, and what is still open. The plan for the week to Amsterdam is [docs/lyceum-upgrade-plan.md](docs/lyceum-upgrade-plan.md); what was built, with every check and its date, is [docs/as-built.md](docs/as-built.md); the reasoning behind each choice is [docs/decisions.md](docs/decisions.md).

## Outcome

Cai Yiyu, the organizer who approves the travel fellowships, reviewed Lyceum to judge whether it was worth sponsoring. The idea was judged solid, clear and on theme, and Cai Yiyu applied for the travel fellowship on our behalf.

## What landed

- The idea is solid and clear, and it fits the theme.
- **The platform answer.** Asked why a lecturer would pick Lyceum over other apps when they already juggle too many tools, Hafiz answered that Lyceum is not one more separate tool but a platform that fits into a university's existing ecosystem, through MCP and extensions for Microsoft 365, Google and the AI tools they already use. Cai Yiyu liked the concept. The first door is now built: a local, read-only MCP server over an exported workspace, set up for Claude Desktop and Claude Code and tested with the official MCP client (`mcp/`, [docs/doors.md](docs/doors.md)); its Claude Desktop run is the owner's next step; the remote doors, the LMS and the office suite are planned.

## What to improve, and where it stands after Track A

| # | feedback | status |
|:--|:--|:--|
| 1 | Too wordy. Make it graphic: a mascot for each agent, each agent a living persona, some gamification. | Done for Amsterdam: the host, Tualang, and seven helpers drawn in code, with moods that follow real records only; the ring of the loop on Home; the loop graphic on How it works and the landing page. Rigged mouths and the term recap are Track B. |
| 2 | Research the problem at Asia level at least, and globally if possible. | Desk research done: one sourced comparison each for the world, Asia and Malaysia on the landing page, in `docs/claims.md`, its wording checked against the notes on 22 October. Lecturer interviews in at least three Asian countries are open (R1). |
| 3 | The flow of the app and the flow of the presentation must tally. | Done: one loop, Watch, Report, Decide, Update, Teach, Learn, in the same order and names in the app, the tour, the deck, the brief, the poster and the film. |
| 4 | Benchmark the mock-cohort agent with the SSRT and CLO surveys collected every semester. | Planned: the protocol is on the Evaluation page and the Learn step says no gain is claimed; it needs two semesters of one course's data (Track B, B2). |

## Open work, roughly in order

1. **The voices** for the film: the host and Dr Aisyah, one file per line of [video/script.md](video/script.md).
2. **The owner's list** at the top of [docs/run-log.md](docs/run-log.md): marks for the landing page's doors, the Claude Desktop run, the poster's QR code and the rest.
3. **The story review** (plan Section 4.1) on the deck, the film and the booth path, and two timed rehearsals ([docs/demo-script.md](docs/demo-script.md)).
4. **R1, interviews** with lecturers in at least three Asian countries.
5. **Track B**, in pilot order (plan Section 17.2): watching over time, the Learn maths and the benchmark, the shared core, the remote doors, the LMS door.
