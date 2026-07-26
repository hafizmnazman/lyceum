// Demand truth (spec Sections 0 and 5.2): the multi-source market snapshots and
// the deterministic relevance computation that feeds the Relevance Index, the
// Trends screen, and the Courses annotations.
//
// Four prepared snapshots, one per source, cited in the UI as "prepared
// snapshot of <source>, <date>". The demand/coverage numbers per CLO are the
// audited v2 Signal fixture (so the canonical story holds: CLO4 machine
// learning carries the widest gap, 0.62, flagging CS220); the per-source
// evidence is the receipts layer on top. Machine learning tops three of four
// sources; Glassdoor deliberately disagrees on data visualisation so the
// "sources disagree" state has something real to render.
//
// A claim supported by one source is a lead; a claim supported by three is a
// finding. `agreement` carries that: the share of sources whose direction
// matches the majority for the skills that move a subject.

import type {
  CLO,
  CLOId,
  DemandEvidence,
  MarketSource,
  RelevanceBand,
  RelevanceRating,
  Subject,
} from "../types.ts";
import { marketGapByCLO } from "../agents/signal.ts";

export const MARKET_SOURCES: MarketSource[] = [
  {
    id: "jobstreet",
    name: "JobStreet Malaysia",
    kind: "job-platform",
    snapshotDate: "2026-06-14",
    recordCount: 18420,
  },
  {
    id: "linkedin",
    name: "LinkedIn Job Insights",
    kind: "job-platform",
    snapshotDate: "2026-06-10",
    recordCount: 25760,
  },
  {
    id: "glassdoor",
    name: "Glassdoor Postings",
    kind: "job-platform",
    snapshotDate: "2026-06-01",
    recordCount: 9310,
  },
  {
    id: "mohe-col",
    name: "TalentCorp Critical Occupations List",
    kind: "gov-labour",
    snapshotDate: "2026-05-20",
    recordCount: 312,
  },
];

/** Which CLO each market skill lands on (the Signal agent's mapping). */
export const SKILL_TO_CLO: Record<string, CLOId> = {
  "programming foundations": "CLO1",
  "statistical modelling": "CLO2",
  "linear algebra": "CLO3",
  "machine learning": "CLO4",
  "data visualisation": "CLO5",
  "data ethics and governance": "CLO6",
  "deep learning": "CLO7",
};

/** Per-source evidence. demandScore is normalised within the source; delta12m
 *  is the 12-month movement. Machine learning rises in three sources and is
 *  merely warm in Glassdoor; data visualisation is the planted disagreement
 *  (rising on JobStreet and LinkedIn, falling on Glassdoor and the COL). */
export const MARKET_EVIDENCE: DemandEvidence[] = [
  // JobStreet
  { sourceId: "jobstreet", skill: "machine learning", demandScore: 0.91, delta12m: 0.24 },
  { sourceId: "jobstreet", skill: "deep learning", demandScore: 0.8, delta12m: 0.19 },
  { sourceId: "jobstreet", skill: "statistical modelling", demandScore: 0.6, delta12m: 0.05 },
  { sourceId: "jobstreet", skill: "data visualisation", demandScore: 0.66, delta12m: 0.08 },
  { sourceId: "jobstreet", skill: "programming foundations", demandScore: 0.42, delta12m: 0.01 },
  { sourceId: "jobstreet", skill: "data ethics and governance", demandScore: 0.64, delta12m: 0.12 },
  { sourceId: "jobstreet", skill: "linear algebra", demandScore: 0.44, delta12m: 0.02 },
  // LinkedIn
  { sourceId: "linkedin", skill: "machine learning", demandScore: 0.88, delta12m: 0.21 },
  { sourceId: "linkedin", skill: "deep learning", demandScore: 0.84, delta12m: 0.23 },
  { sourceId: "linkedin", skill: "data visualisation", demandScore: 0.71, delta12m: 0.06 },
  { sourceId: "linkedin", skill: "statistical modelling", demandScore: 0.63, delta12m: 0.04 },
  { sourceId: "linkedin", skill: "programming foundations", demandScore: 0.4, delta12m: -0.02 },
  { sourceId: "linkedin", skill: "data ethics and governance", demandScore: 0.69, delta12m: 0.15 },
  { sourceId: "linkedin", skill: "linear algebra", demandScore: 0.47, delta12m: 0.03 },
  // Glassdoor (the planted disagreement on data visualisation)
  { sourceId: "glassdoor", skill: "machine learning", demandScore: 0.79, delta12m: 0.11 },
  { sourceId: "glassdoor", skill: "deep learning", demandScore: 0.77, delta12m: 0.14 },
  { sourceId: "glassdoor", skill: "data visualisation", demandScore: 0.52, delta12m: -0.07 },
  { sourceId: "glassdoor", skill: "statistical modelling", demandScore: 0.58, delta12m: 0.02 },
  { sourceId: "glassdoor", skill: "programming foundations", demandScore: 0.45, delta12m: 0.0 },
  { sourceId: "glassdoor", skill: "data ethics and governance", demandScore: 0.6, delta12m: 0.09 },
  { sourceId: "glassdoor", skill: "linear algebra", demandScore: 0.41, delta12m: 0.01 },
  // TalentCorp Critical Occupations List
  { sourceId: "mohe-col", skill: "machine learning", demandScore: 0.94, delta12m: 0.18 },
  { sourceId: "mohe-col", skill: "deep learning", demandScore: 0.86, delta12m: 0.16 },
  { sourceId: "mohe-col", skill: "data visualisation", demandScore: 0.55, delta12m: -0.03 },
  { sourceId: "mohe-col", skill: "statistical modelling", demandScore: 0.66, delta12m: 0.06 },
  { sourceId: "mohe-col", skill: "data ethics and governance", demandScore: 0.72, delta12m: 0.14 },
  { sourceId: "mohe-col", skill: "linear algebra", demandScore: 0.5, delta12m: 0.04 },
  { sourceId: "mohe-col", skill: "programming foundations", demandScore: 0.43, delta12m: 0.0 },
];

export function sourceById(id: string): MarketSource | undefined {
  return MARKET_SOURCES.find((s) => s.id === id);
}

export function evidenceForSkill(skill: string): DemandEvidence[] {
  return MARKET_EVIDENCE.filter((e) => e.skill === skill);
}

/** Cross-source agreement for a set of skills: the share of source claims whose
 *  12-month direction matches the majority direction, averaged over the skills.
 *  1.0 = every source moves the same way; 0.5 = an even split. */
export function agreementFor(skills: string[]): number {
  if (skills.length === 0) return 1;
  let total = 0;
  for (const skill of skills) {
    const ev = evidenceForSkill(skill);
    if (ev.length === 0) {
      total += 1;
      continue;
    }
    const up = ev.filter((e) => e.delta12m >= 0).length;
    const majority = Math.max(up, ev.length - up);
    total += majority / ev.length;
  }
  return total / skills.length;
}

function bandFor(score: number): RelevanceBand {
  if (score < 0.42) return "misaligned";
  if (score < 0.6) return "drifting";
  return "aligned";
}

/** The deterministic relevance computation. score = 1 - (demand - coverage) per
 *  CLO from the audited gap fixture; a subject's score is the mean over its
 *  assessed CLOs; the receipts are the per-source evidence for the skills that
 *  land on those CLOs. CS220 comes out worst (score 0.38, the 0.62 gap). */
export function computeRelevanceRatings(
  subjects: Subject[],
  clos: CLO[],
  ratedAt: string,
): RelevanceRating[] {
  const gaps = marketGapByCLO();
  const cloToSkill = new Map<CLOId, string>();
  for (const [skill, cloId] of Object.entries(SKILL_TO_CLO)) cloToSkill.set(cloId, skill);

  return subjects.map((subject) => {
    const subjectClos = clos.filter((c) => c.subjectId === subject.id);
    const rated = subjectClos.filter((c) => gaps[c.id]);
    if (rated.length === 0) {
      return {
        subjectId: subject.id,
        score: 0,
        band: "unrated",
        perCLO: [],
        evidence: [],
        agreement: 1,
        ratedAt,
      };
    }
    const perCLO = rated.map((c) => {
      const gap = gaps[c.id]?.gap ?? 0;
      const skill = cloToSkill.get(c.id);
      return {
        cloId: c.id,
        score: Math.max(0, Math.min(1, 1 - gap)),
        movedBy: skill ? [skill] : [],
      };
    });
    const score = perCLO.reduce((s, c) => s + c.score, 0) / perCLO.length;
    const skills = perCLO.flatMap((c) => c.movedBy);
    const evidence = skills.flatMap((s) => evidenceForSkill(s));
    return {
      subjectId: subject.id,
      score,
      band: bandFor(score),
      perCLO,
      evidence,
      agreement: agreementFor(skills),
      ratedAt,
    };
  });
}
