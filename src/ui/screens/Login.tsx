// Sign in (spec 6.2). The identity block leads; the demo people are clean rows
// with their real scope. The public Relevance Index is reachable from here
// without signing in (the wedge: the rating exists before you join).

import { ArrowRight, ShieldCheck } from "lucide-react";
import { hatsOn, subjectsForPerson } from "../../app/roles.ts";
import { login, navigate, useStore } from "../../app/store.ts";
import type { Person } from "../../types.ts";

export function LoginScreen() {
  const state = useStore();

  function scopeLine(person: Person): string {
    if (person.orgRole === "management") return "Management, faculty approvals";
    if (person.orgRole === "department") return "Department, Bachelor of Computer Science";
    const subjects = subjectsForPerson(person.id, state.assignments);
    const parts = subjects.map((sid) => {
      const hats = hatsOn(person.id, sid, state.assignments);
      const label =
        hats.includes("coordinator") && hats.includes("lecturer")
          ? "Coordinator and Lecturer"
          : hats.includes("coordinator")
            ? "Coordinator"
            : "Lecturer";
      return `${label}, ${sid}`;
    });
    return parts.join(" · ");
  }

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <div style={{ display: "flex", gap: 72, maxWidth: 980, width: "100%", flexWrap: "wrap" }}>
        {/* identity */}
        <div style={{ flex: "1 1 380px", minWidth: 320, paddingTop: 24 }}>
          <div className="page-title" style={{ fontSize: 44 }}>
            Lyceum
          </div>
          <p style={{ fontSize: 17, color: "var(--ink)", margin: "14px 0 8px", maxWidth: 420 }}>
            Know which of your courses have drifted from industry demand, and fix
            them before your graduates feel it.
          </p>
          <p style={{ fontSize: 13.5, color: "var(--ink-2)", maxWidth: 420 }}>
            An independent advisory over your real ground: demand triangulated
            across market sources, changes stress-tested against a measured
            cohort, and every recommendation scored by the next term's results.
          </p>
          <button
            data-demo-id="view-index"
            onClick={() => navigate("index")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 10,
              padding: 0,
              border: "none",
              background: "none",
              color: "var(--accent)",
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View the public Relevance Index <ArrowRight size={14} />
          </button>
          <div style={{ marginTop: 56, fontSize: 11.5, color: "var(--ink-3)" }}>
            Grounded in the CLO mastery survey and filed results · model RASCH-1PL
          </div>
        </div>

        {/* role picker */}
        <div style={{ flex: "1 1 380px", minWidth: 320 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--ink-3)",
              letterSpacing: "0.03em",
              marginBottom: 10,
            }}
          >
            SIGN IN AS
          </div>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-l)",
              boxShadow: "var(--shadow-1)",
              overflow: "hidden",
            }}
          >
            {state.people.map((p, i) => (
              <button
                key={p.id}
                data-demo-id={`login-${p.id}`}
                onClick={() => login(p.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "13px 16px",
                  border: "none",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 150ms ease-out",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-soft)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <span
                  aria-hidden
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 14 }}>
                    {p.name}
                    {p.verified ? <ShieldCheck size={14} color="var(--ok)" aria-label="Verified" /> : null}
                  </span>
                  <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-2)" }}>
                    {scopeLine(p)}
                  </span>
                </span>
                <ArrowRight size={15} color="var(--ink-3)" />
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 10 }}>
            Demo workspace: one faculty, five people, real survey ground.
          </div>
        </div>
      </div>
    </div>
  );
}
