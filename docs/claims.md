# Lyceum: claims register

Every figure shown on a Lyceum surface appears here once: the words it is shown in, its source and link, the research note or record that checked it, and the date. A figure that is not here does not ship. The landing page is registered now; the deck, the brief, the poster and the film add their rows as they are built (packages A6 and A7). `src/prove-journey.ts` fails if a landing figure is missing from this file or a quoted clause is missing from its note.

Keys, as in the research notes: **P** a primary document fetched and quoted; **S** a reputable secondary source; **V** vendor material, said so beside the figure; **M** measured by this project, with the record that holds the measurement.

## The landing page: the problem at three levels

One figure per level (plan Section 2.4). The landing page calls them desk research until the lecturer interviews (R1) add a quotation per level.

| Claim | Figure | Shown as | Source | Checked in | Key | Checked on |
|:--|:--|:--|:--|:--|:--|:--|
| `world-skills-and-approval` | 39%; 12 to 18 months | 39% of workers' existing skills will be transformed or become outdated between 2025 and 2030, while approving a new degree programme generally takes 12 to 18 months | World Economic Forum, Future of Jobs Report 2025 (<https://www3.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf>); Wayne State University, programme approval (<https://provost.wayne.edu/programs/approval-process>); Texas Tech University, new programme timelines (<https://www.depts.ttu.edu/provost/curriculum/new-programs/timelines.php>) | [curriculum-latency-global-2026-10-22.md](research/curriculum-latency-global-2026-10-22.md), Sections 1 and 2 | P | 22 October 2026 |
| `asia-talent-shortage` | 77% of 10,095; 45% in 2014 | 77% of 10,095 Asia Pacific employers could not find the skills they needed in 2025, up from 45% in 2014 (a vendor survey) | ManpowerGroup, Talent Shortage 2025 (<https://www.manpowerthailand.com/apac-talent-shortage>) | [pain-and-market-2026-10-11.md](research/pain-and-market-2026-10-11.md), Section 1.2 | V | 11 October 2026 |
| `malaysia-underemployment` | 32.2%; 1.60 million; 3.2% | 32.2% of employed Malaysian graduates, 1.60 million people, worked below their qualification in 2024, while graduate unemployment was 3.2% | DOSM, Graduates Statistics 2024 (<https://www.dosm.gov.my/uploads/release-content/file_20260401145140.pdf>) | [pain-and-market-2026-10-11.md](research/pain-and-market-2026-10-11.md), Section 1.1 | P | 11 October 2026 |

"Of employed graduates" follows from the release: 1.60 million is 32.2% of the 4.97 million employed graduates (5.14 million in the labour force less 165,900 unemployed), so the rate is skill-related underemployment among the employed, not among all graduates.

## The landing page: what is proven today

| Claim | Figure | Shown as | Record | Key | Checked on |
|:--|:--|:--|:--|:--|:--|
| `proof-checks` | 184 | 184 automated checks passed on 22 October 2026, plus four headless browser runs | `npm run prove:all` (seventeen suites, listed with their counts in `src/data/suites.ts` and on the Evaluation page) and the four smokes, the A5 verification table in [as-built.md](as-built.md) | M | 22 October 2026 |
| `proof-live-board` | 727 | 727 real postings fetched live from one employer's public board on request, 9 October 2026 | The Stripe board on Greenhouse through the local API: [lyceum-v3-as-built-2026-10-09.md](lyceum-v3-as-built-2026-10-09.md) and the execution record in [lyceum-improvement-plan.md](lyceum-improvement-plan.md), Section 30 | M | 9 October 2026 |
| `proof-no-keys` | 0 | 0 AI keys needed; the core is deterministic, and file parsing and live collection use the local API | Every proof and smoke runs with no key set; the agents default to fixture mode (`src/agents/mode.ts`) | M | 22 October 2026 |
| `tour-length` | about 6 minutes | Watch the tour, about 6 minutes | `tourMinutes()` in `src/demo/script.ts`, computed from the tour's own pacing: 382 seconds at full speed after the A4 rewrite; a live fetch can add a little | M | 22 October 2026 |
| `proof-no-paraphrase` | 0 | 0 paraphrases accepted as evidence; a quotation must match its source text or it is rejected | `src/prove-evidence.ts`, `src/prove-research.ts` and the curriculum smoke's rejected misquote | M | 22 October 2026 |

## The landing page: clauses quoted beside the loop

Each quotation is word for word from the note named, which quotes the document at the link; NAAC 1.4.1 is shown as a paraphrase because the note gives no quotable wording. ESG 1.2 and AACSB Standard 5, which plan Section 4 also names, are not shown until a note checks their wording (docs/decisions.md).

| Step | Clause | Link | Checked in | Key |
|:--|:--|:--|:--|:--|
| Watch | AUN-QA Guide v4.0, 1.4 | <https://fet.iuh.edu.vn/upload/files/web_SAR_2023.pdf> | [curriculum-latency-global-2026-10-22.md](research/curriculum-latency-global-2026-10-22.md), Section 3 | S |
| Watch | UK QAA, External Expertise | <https://www.qaa.ac.uk/docs/qaa/quality-code/advice-and-guidance-external-expertise.pdf> | the same note, Section 3 | P |
| Report | MQA COPPA, 2nd edition, 6.1.6 | <https://office.iium.edu.my/kca/wp-content/uploads/2024/09/COPPA-2nd-Edition-Nov-2017.pdf> | [pain-and-market-2026-10-11.md](research/pain-and-market-2026-10-11.md), Section 1.1 | P |
| Report | NAAC 1.4.1 (paraphrase) | <https://old.ncet.co.in/iqac/important-criteria> | [curriculum-latency-global-2026-10-22.md](research/curriculum-latency-global-2026-10-22.md), Section 3 | S |
| Decide | ABET, Criterion 2 | <https://www.abet.org/accreditation/accreditation-criteria/criteria-for-accrediting-engineering-programs-2025-2026/> | the same note, Section 3 | P |
| Update | ESG 2015, 1.9 | <https://www.enqa.eu/wp-content/uploads/2015/11/ESG_2015.pdf> | the same note, Section 3 | P |
| Teach | Biggs, constructive alignment | <https://www.biologie.uzh.ch/dam/jcr:94dbcc23-1c4d-4892-bab8-ba16abc4ef66/ConstructiveAlignment_Biggs.pdf> | [hackastone-and-competitors-2026-10-22.md](research/hackastone-and-competitors-2026-10-22.md), Section 6 | P (that note marks only vendor and secondary sources; this one is unmarked) |
| Learn | ABET, Criterion 4 | <https://www.abet.org/accreditation/accreditation-criteria/criteria-for-accrediting-engineering-programs-2025-2026/> | [curriculum-latency-global-2026-10-22.md](research/curriculum-latency-global-2026-10-22.md), Section 3 | P |
