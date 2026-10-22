// The records the before and after views compare (depth plan Section 6.2): a course version and the one it replaced, and a
// session's pack under either, built at one moment with the course's brand so two packs differ only where the versions do.

import type { AppState } from "../../app/store.ts";
import { brandFor, packUnderVersion, type DeckSpec } from "../../lib/slides.ts";
import type { CLO, CourseDefinition, Subject, SubjectVersion, TeachingSession } from "../../types.ts";

export type VersionLike = { cloSnapshot: CLO[]; definition?: CourseDefinition | null };

/** A maker of a session's pack under any version of its course. */
export function packMaker(state: AppState, subject: Subject, markData: string | null, at: string) {
  const evidence = { sources: state.evidenceSources, mentions: state.skillMentions, mappings: state.skillMappings };
  return (session: TeachingSession, version: VersionLike): DeckSpec =>
    packUnderVersion(subject, session, version, evidence, state.people, at, brandFor(state.institution, version.definition ?? null, subject, session.week, markData));
}

/** The version a version replaced: the baseline its revision started from (through the version-adopted event), otherwise the
 *  one before it in time; null for the first version on record. */
export function previousVersion(state: AppState, version: SubjectVersion): SubjectVersion | null {
  const adopted = state.events.find((e) => e.kind === "version-adopted" && e.refs.versionId === version.id);
  const baseline = adopted && state.curriculumDrafts.find((d) => d.id === adopted.refs.draftId)?.baselineVersionId;
  const byId = baseline ? state.subjectVersions.find((v) => v.id === baseline) : undefined;
  if (byId) return byId;
  const ordered = state.subjectVersions.filter((v) => v.subjectId === version.subjectId).sort((a, b) => a.changedAt.localeCompare(b.changedAt));
  const at = ordered.findIndex((v) => v.id === version.id);
  return at > 0 ? ordered[at - 1] : null;
}
