## 1. Row by row

M verdicts cover only whether the row states what it records and where it is checked. Clause rows have no claim ids, so they are identified by step and clause.

| claim id | verdict | the evidence | the fix |
|---|---|---|---|
| `world-skills-and-approval` | needs a caveat | “workers can expect that two-fifths (39%)”; “twelve to eighteen months for new degree programs to complete the internal review and approval process” | Identify the employer forecast. Name the US institutions, distinguish internal from full approval, and retain Texas Tech's “up to” qualifier. |
| `asia-talent-shortage` | supported | “77% of 10,095 Asia Pacific employers cannot find the skills they need, from 45% in 2014” | Keep the vendor survey label, sample size, region and dates. |
| `malaysia-underemployment` | needs a caveat | “32.2%; 1.60 million”; “3.2% (165,900), down from 3.4%” | Keep the employed-graduate denominator for 32.2%. State that 3.2% uses graduates in the labour force. |
| `proof-checks` | supported | no passage found | Count and date stated; `src/data/suites.ts` and the A6 verification table in `docs/as-built.md` named. |
| `proof-live-board` | supported | no passage found | One employer and fetch date stated; the as-built record and improvement-plan Section 30 named. |
| `proof-no-keys` | supported | no passage found | AI-key scope stated; proofs, smokes and `src/agents/mode.ts` named. |
| `tour-length` | supported | no passage found | Pacing estimate and live-fetch allowance stated; `tourMinutes()` in `src/demo/script.ts` named. |
| `proof-no-paraphrase` | supported | no passage found | Exact-match rule stated; both proof files and the curriculum smoke's rejected misquote named. |
| `deck-receipt` | supported | no passage found | Saved sample, duplicate and reviewed denominator stated; `mcp/sample-workspace.json` and generator checks named. |
| `deck-trl` | needs a caveat | “Prototype implementations of the software demonstrated on full-scale realistic problems”; “real postings, a real syllabus, a real lecturer” | Keep self-assessed. Reconcile the note's proposed real syllabus and lecturer with the registered sample outline and persona. |
| Watch: AUN-QA 1.4 | supported | “the requirements of the stakeholders, especially the external stakeholders, are gathered, and that these are reflected in the expected learning outcomes” | Keep S and identify the reports reproducing the guide. |
| Watch: UK QAA, External Expertise | needs a caveat | “Providers are encouraged to engage with employers and other external stakeholders at all stages of course design, approval and review” | Keep “encouraged”. Describe this as guidance in the landing introduction. |
| Report: MQA COPPA 6.1.6 | supported | “conduct internal and external consultations, market needs and graduate employability analyses.” | Keep P and the clause reference. |
| Report: NAAC 1.4.1 | supported | “structured feedback on the syllabus from students, teachers, employers and alumni” | Keep S and the paraphrase label. |
| Decide: ABET Criterion 2 | supported | “involving program constituencies, for the periodic review of these program educational objectives” | Keep the programme educational-objectives scope. |
| Update: ESG 1.9 | supported | “Institutions should monitor and periodically review their programmes”; “Programmes are reviewed and revised regularly involving students and other stakeholders.” | Keep “should” and the periodic-review scope. |
| Teach: Biggs, constructive alignment | mislabelled | “the curriculum and its intended outcomes, the teaching methods used, the assessment tasks, are aligned to each other.” | Call this a teaching principle. Widen the landing heading that calls every step an accreditation clause. |
| Learn: ABET Criterion 4 | supported | “The results of these evaluations must be systematically utilized as input for the program's continuous improvement actions.” | Keep the source and criterion. |

## 2. Source labels

- **WEF:** P correctly describes the original report, but the shown wording should identify 39% as an employer survey forecast. Primary provenance does not establish an observed result.
- **ManpowerGroup:** correctly V and explicitly described as a vendor survey.
- **NASA:** P applies to the readiness definition. Lyceum's placement is explicitly self-assessed, so the register does not present an independent award. The department pilot is Lyceum's proposed next step.
- **No primary/secondary reversal is evident.** AUN-QA and NAAC are correctly S. Hosting an MQA document at IIUM, or a Biggs paper at another university, does not itself make the work secondary. Biggs's problem is its grouping under accreditation clauses.

## 3. Caveats

The landing's imported data files are absent. Conditional rendering does not establish which caveats actually appear.

| Caveat in the note | Register carries it? | Landing carries it? |
|---|---|---|
| WEF's 39% is an average forecast for 2025 to 2030, from a survey of over 1,000 employers covering 14 million workers and 55 economies. | Period present; average, forecast status and survey basis omitted. | Unverified in `PAIN_STATS`. |
| Approval times concern particular US institutions and new degrees. Wayne State describes internal review, with further approvals potentially needed. Texas Tech gives up to 18 months for full approval. Course changes have shorter examples. The note found no global measured approval-to-delivery study. | New-degree scope present; institutional limits, internal/full distinction and “up to” omitted. | Static heading and lead generalize to courses and assert change within a year. Tile wording is unverified. |
| Manpower's figure is a vendor survey of 10,095 Asia Pacific employers, with a 2014 comparison. | Yes. | Vendor label appears only if `s.vendor` is true; actual data unverified. |
| DOSM's 32.2% is skill-related underemployment. Hours-based underemployment was 0.8%. Underemployment and unemployment use different denominators. | Below-qualification meaning and employed denominator carried. Labour-force denominator for 3.2% remains implicit. | Unverified in `PAIN_STATS`. |
| NASA's TRL 6 description includes partial integration and limited documentation; TRL 7 includes key functionality and operational integration. The note proposes a real syllabus and lecturer as the environment. | Self-assessment and sample/persona limits disclosed. Definition qualifiers omitted; the environment differs from the note's proposal. | No explicit TRL wording in the supplied component; other surfaces unverified. |
| AUN-QA wording was checked in two self-assessment reports reproducing the guide. NAAC supplies a secondary paraphrase. | S labels and NAAC paraphrase carried; AUN reproduction detail remains in the note. | Paraphrase disclosure is conditional; actual clause data and AUN attribution unverified. |
| QAA encourages engagement; ESG uses “should”; Biggs supplies a teaching principle. | Sources correctly named. | The blanket accreditation-clause heading and “rule” introduction lose these distinctions. |
| The pain note warns that skills-first statements do not establish changed hiring behaviour. | No actual-hiring claim made. | “Watch what employers ask for” preserves the appropriate scope. |

## 4. Wording

- **World comparison:** replace the general approval claim with:  
  “WEF's employer survey forecasts that, on average, 39% of workers' existing skills will be transformed or become outdated between 2025 and 2030. Wayne State gives 12 to 18 months for internal approval of new degree programmes; Texas Tech says full approval can take up to 18 months.”

- **Landing timing heading and lead:** neither the five-year WEF forecast nor the institutional approval examples establishes that asks change within a year while course changes take longer. Replace the heading with “Skills forecasts and approval timelines”, and the lead with:  
  “Employers forecast substantial skill changes by 2030. The cited US approval timelines concern new degree programmes; the note gives shorter timelines for course changes.”

- **Malaysian comparison:** make both populations explicit:  
  “In 2024, 32.2% of employed Malaysian graduates, 1.60 million people, worked below their qualification. Among graduates in the labour force, 3.2% were unemployed.”

- **Accreditation introduction:** replace the heading with “Standards, guidance and teaching principles behind the loop”. Replace “The rule already exists; the evidence is what is missing” with:  
  “These sources support stakeholder consultation, programme review and aligned teaching.”

- **Readiness roadmap:** introduce the department pilot as “Our next step is one department running Lyceum for a term inside its LMS.” The note does not establish a universal NASA requirement for that particular duration or setting.

- **“One figure each”:** each level contains several numbers. Use “One comparison per level.”

## 5. Unverified

- **Unverified:** actual landing values, labels, quotation text and caveat flags. `painStats.ts`, `proof.ts`, `accreditors.ts` and the tour implementation are not embedded.
- **Unverified:** the named software records and execution results. The M verdicts confirm the register's descriptions and check locations only.
- **Unverified:** deck, brief, poster and film contents, generated PDFs, and the claimed generator and quotation checks.
- **Unverified:** whether the sample-outline and persona demonstration satisfies NASA's full-scale realistic-problems criterion.
- **Unverified:** the plan for interviews in “three Asian countries”. This planning count has no register row or embedded supporting plan.
- **Unverified:** linked documents and their current contents independently of the supplied research notes.