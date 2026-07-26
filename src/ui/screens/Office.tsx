// The Agents page (spec 5.7): the office as a live status surface, not the
// pitch. Seven desks on plain surfaces, clean line work, state-driven from the
// same agentStates and agentRuns every other screen writes. Desks light up when
// an agent actually runs.

import type { CSSProperties } from "react";
import type { AgentId, AgentState } from "../../app/store.ts";
import { AGENT_LABELS, useStore } from "../../app/store.ts";
import { Card, Page, PageHead } from "../primitives/index.tsx";

const AGENTS: AgentId[] = [
  "intake",
  "signal",
  "curriculum",
  "authoring",
  "cohort",
  "analogy",
  "evaluator",
];

const STATE_WORD: Record<AgentState, string> = {
  idle: "at rest",
  working: "working",
  done: "done",
  "needs-input": "needs your input",
};

/** Three staggered pulsing dots: the typing indicator for a working agent. */
function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }} aria-label="Working">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--accent)",
            animation: "pulseDot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  );
}

/** The desk drawing: a circle head, a body arc, and a desk line, in clean
 *  strokes on the plain surface. Accent ink while the agent works. */
function DeskDrawing(props: { active: boolean }) {
  const stroke = props.active ? "var(--accent)" : "var(--ink-3)";
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        height: 64,
        marginBottom: 10,
      }}
    >
      {/* head */}
      <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${stroke}` }} />
      {/* body arc */}
      <div
        style={{
          width: 26,
          height: 13,
          marginTop: 3,
          border: `2px solid ${stroke}`,
          borderBottom: "none",
          borderTopLeftRadius: 13,
          borderTopRightRadius: 13,
        }}
      />
      {/* desk line */}
      <div style={{ width: "78%", borderTop: "2px solid var(--ink-3)", marginTop: 5 }} />
      {/* desk legs */}
      <div style={{ width: "58%", display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 2, height: 8, background: "var(--ink-3)" }} />
        <div style={{ width: 2, height: 8, background: "var(--ink-3)" }} />
      </div>
    </div>
  );
}

export function OfficeScreen() {
  const state = useStore();

  return (
    <Page wide>
      <PageHead
        title="Agents"
        context="Seven agents on one shared spine, each waking where its user works."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {AGENTS.map((agent) => {
          const st = state.agentStates[agent];
          const run = [...state.agentRuns].reverse().find((r) => r.agent === agent);
          const bubble =
            st === "needs-input" && state.agentBubble?.agent === agent
              ? state.agentBubble.text
              : null;

          const cardStyle: CSSProperties = {
            borderColor:
              st === "working"
                ? "var(--accent)"
                : st === "needs-input"
                  ? "var(--warn)"
                  : "var(--border)",
            opacity: st === "idle" ? 0.75 : 1,
            position: "relative",
          };

          return (
            <Card key={agent} style={cardStyle} data-demo-id={`desk-${agent}`}>
              {bubble ? (
                <div style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      background: "var(--warn-soft)",
                      color: "var(--warn)",
                      border: "1px solid var(--warn)",
                      borderRadius: "var(--radius-s)",
                      padding: "6px 9px",
                      fontSize: 12,
                    }}
                  >
                    {bubble}
                  </div>
                  <div
                    aria-hidden
                    style={{
                      width: 8,
                      height: 8,
                      background: "var(--warn-soft)",
                      borderRight: "1px solid var(--warn)",
                      borderBottom: "1px solid var(--warn)",
                      transform: "rotate(45deg)",
                      marginTop: -5,
                      marginLeft: 16,
                    }}
                  />
                </div>
              ) : null}

              <DeskDrawing active={st === "working"} />

              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{AGENT_LABELS[agent]}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 3,
                  fontSize: 12,
                  color: st === "idle" ? "var(--ink-3)" : "var(--ink-2)",
                  minHeight: 18,
                }}
              >
                {st === "working" ? <TypingDots /> : null}
                {st === "done" ? (
                  <span
                    aria-hidden
                    style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ok)" }}
                  />
                ) : null}
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {run ? run.label : STATE_WORD[st]}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <p style={{ marginTop: 24, fontSize: 13, color: "var(--ink-3)", maxWidth: 560 }}>
        This is a live status surface. Desks light up when an agent actually runs, upload a file,
        open Trends, or run an acceptance test.
      </p>
    </Page>
  );
}
