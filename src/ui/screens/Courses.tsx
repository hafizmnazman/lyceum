// Courses (spec 6.3 / 6.4): the person's subjects, flagged ones first, each with
// the Curriculum agent's annotation and the relevance band. Management and the
// department see the whole programme, read-only. The one accent action opens the
// topmost flagged subject in the Studio.

import { useMemo } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { hatsOn, subjectsForPerson } from "../../app/roles.ts";
import {
  currentPerson,
  navigate,
  ratingFor,
  selectSubject,
  useStore,
} from "../../app/store.ts";
import { runCurriculum, type SubjectAnnotation } from "../../agents/curriculum.ts";
import { runSignal } from "../../agents/signal.ts";
import type { RelevanceBand, Subject } from "../../types.ts";
import { AgentStrip } from "../shell/AgentStrip.tsx";
import { Button, Card, EmptyState, Page, PageHead, Row, Tag } from "../primitives/index.tsx";

const BAND_TONE: Record<RelevanceBand, "ok" | "warn" | "danger" | "neutral"> = {
  aligned: "ok",
  drifting: "warn",
  misaligned: "danger",
  unrated: "neutral",
};

export function CoursesScreen() {
  const state = useStore();
  const person = currentPerson();

  // The Curriculum agent's read of the programme, computed once per programme.
  const annotations = useMemo(
    () => runCurriculum(state.programme.id, runSignal(state.programme.id)),
    [state.programme.id],
  );
  const annotationBySubject = useMemo(
    () => new Map(annotations.map((a) => [a.subjectId, a])),
    [annotations],
  );

  if (!person) return null;

  const readOnly = person.orgRole !== "academic";
  const subjects: Subject[] = readOnly
    ? state.subjects
    : subjectsForPerson(person.id, state.assignments)
        .map((sid) => state.subjects.find((s) => s.id === sid))
        .filter((s): s is Subject => s !== undefined);

  function annotationFor(subjectId: string): SubjectAnnotation | undefined {
    return annotationBySubject.get(subjectId);
  }
  function bandFor(subjectId: string): RelevanceBand {
    return ratingFor(subjectId)?.band ?? "unrated";
  }
  function isFlagged(s: Subject): boolean {
    const ann = annotationFor(s.id);
    const band = bandFor(s.id);
    return (ann !== undefined && ann.annotation !== "fine") || band === "misaligned" || band === "drifting";
  }

  const sorted = [...subjects].sort((a, b) => Number(isFlagged(b)) - Number(isFlagged(a)));
  const focal = sorted.length > 0 && isFlagged(sorted[0]) ? sorted[0] : null;
  const focalAnnotation = focal ? annotationFor(focal.id) : undefined;

  function openStudio(subjectId: string) {
    selectSubject(subjectId);
    navigate("studio");
  }

  return (
    <Page>
      <PageHead
        title="Courses"
        context={
          readOnly
            ? "Every subject in the programme, with the Curriculum agent's read. View only."
            : "Your subjects, flagged ones first. Open one to work on it in the Studio."
        }
      />
      <AgentStrip
        agent="curriculum"
        idleText="Curriculum has annotated every subject against the demand signal."
      />

      {focal ? (
        <Card focal style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Tag tone={BAND_TONE[bandFor(focal.id)]}>{bandFor(focal.id)}</Tag>
            <span style={{ fontWeight: 600, fontSize: 15 }}>{focal.id} needs work</span>
          </div>
          <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--ink-2)", maxWidth: 620 }}>
            {focalAnnotation?.detail ??
              "The relevance rating on this subject has slipped; its outcomes are due a look."}
          </p>
          {!readOnly ? (
            <Button
              variant="primary"
              data-demo-id="open-flagged"
              onClick={() => openStudio(focal.id)}
            >
              Open in Studio <ArrowRight size={15} />
            </Button>
          ) : null}
        </Card>
      ) : null}

      {sorted.length === 0 ? (
        <EmptyState
          title="No subjects yet"
          body={
            readOnly
              ? "Subjects appear here as the department adds them to the programme."
              : "Subjects appear here once the department assigns you a coordinator or lecturer hat."
          }
        />
      ) : (
        <div>
          {sorted.map((s) => {
            const ann = annotationFor(s.id);
            const band = bandFor(s.id);
            const hats = hatsOn(person.id, s.id, state.assignments);
            const flagged = ann !== undefined && ann.annotation !== "fine";
            return (
              <Row
                key={s.id}
                data-demo-id={`course-open-${s.id}`}
                onClick={readOnly ? undefined : () => openStudio(s.id)}
              >
                <span
                  className="num"
                  style={{ width: 56, fontWeight: 600, fontSize: 13, flexShrink: 0 }}
                >
                  {s.id}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 500 }}>{s.title}</span>
                  {ann ? (
                    <span
                      style={{
                        display: "block",
                        fontSize: 12.5,
                        color: flagged ? "var(--warn)" : "var(--ink-3)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ann.detail}
                    </span>
                  ) : null}
                </span>
                <span
                  className="num"
                  style={{ fontSize: 12.5, color: "var(--ink-3)", flexShrink: 0 }}
                >
                  Y{s.year} S{s.semester}
                </span>
                {hats.includes("coordinator") ? <Tag tone="accent">C</Tag> : null}
                {hats.includes("lecturer") ? <Tag>L</Tag> : null}
                <Tag tone={BAND_TONE[band]}>{band}</Tag>
                {!readOnly ? <ChevronRight size={15} color="var(--ink-3)" /> : null}
              </Row>
            );
          })}
        </div>
      )}
    </Page>
  );
}
