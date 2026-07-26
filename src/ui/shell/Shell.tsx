// The app shell (spec 6.1): persistent sidebar with the person's nav and their
// subjects (hat badges), topbar with breadcrumb, search (command palette),
// notification bell and account menu, the toast, and the right-side agent
// panel. This chrome is what makes Lyceum read as an app you live in rather
// than a deck of screens.

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Bell, Check, ChevronDown, LogOut, RotateCcw, Search, ShieldCheck } from "lucide-react";
import type { Screen } from "../../app/roles.ts";
import { hatsOn, navFor, subjectsForPerson } from "../../app/roles.ts";
import {
  currentPerson,
  dismissToast,
  logout,
  navigate,
  resetWorkspace,
  selectSubject,
  switchUser,
  unreadFor,
  useStore,
} from "../../app/store.ts";
import { NAV_META, screenLabel } from "./nav.ts";
import { CommandPalette } from "./CommandPalette.tsx";
import { AgentPanel } from "./AgentPanel.tsx";
import { Kbd } from "../primitives/index.tsx";

const SIDEBAR_W = 240;
const TOPBAR_H = 56;

export function Shell(props: { children: ReactNode }) {
  const state = useStore();
  const person = currentPerson();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cmd+K / Ctrl+K opens the palette from anywhere.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click-away for the account menu.
  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  // Toast auto-dismiss.
  useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dismissToast(), 4000);
    return () => clearTimeout(t);
  }, [state.toast]);

  if (!person) return <>{props.children}</>;

  const nav = navFor(person, state.assignments);
  const mySubjects = subjectsForPerson(person.id, state.assignments);
  const unread = unreadFor(person.id).length;

  const roleLine =
    person.orgRole === "management"
      ? "Management"
      : person.orgRole === "department"
        ? "Department"
        : "Academic";

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* ---------- sidebar ---------- */}
      <aside
        style={{
          width: SIDEBAR_W,
          flexShrink: 0,
          borderRight: "1px solid var(--border)",
          background: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "18px 16px 10px" }}>
          <div
            className="page-title"
            style={{ fontSize: 21, cursor: "pointer" }}
            onClick={() => navigate("inbox")}
          >
            Lyceum
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>
            Curriculum advisory
          </div>
        </div>

        <nav style={{ padding: "6px 8px", flex: 1 }}>
          {nav
            .filter((s) => s !== "backtest" && s !== "office" && s !== "dataroom" && s !== "index")
            .map((s) => (
              <NavItem key={s} screen={s} active={state.screen === s} badge={s === "inbox" ? unread : 0} />
            ))}

          {mySubjects.length > 0 ? (
            <>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink-3)",
                  letterSpacing: "0.03em",
                  padding: "16px 10px 4px",
                }}
              >
                MY SUBJECTS
              </div>
              {mySubjects.map((sid) => {
                const hats = hatsOn(person.id, sid, state.assignments);
                return (
                  <div
                    key={sid}
                    data-demo-id={`subject-${sid}`}
                    onClick={() => {
                      selectSubject(sid);
                      navigate("studio");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 10px",
                      borderRadius: "var(--radius-s)",
                      cursor: "pointer",
                      color: "var(--ink-2)",
                      fontSize: 13,
                      background:
                        state.selectedSubjectId === sid && state.screen === "studio"
                          ? "var(--accent-soft)"
                          : undefined,
                    }}
                  >
                    <span className="num">{sid}</span>
                    <span style={{ display: "flex", gap: 3 }}>
                      {hats.includes("coordinator") ? <HatBadge label="C" title="Coordinator" /> : null}
                      {hats.includes("lecturer") ? <HatBadge label="L" title="Lecturer" /> : null}
                    </span>
                  </div>
                );
              })}
            </>
          ) : null}

          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--ink-3)",
              letterSpacing: "0.03em",
              padding: "16px 10px 4px",
            }}
          >
            EVIDENCE
          </div>
          {(["backtest", "dataroom", "office", "index"] as Screen[])
            .filter((s) => nav.includes(s))
            .map((s) => (
              <NavItem key={s} screen={s} active={state.screen === s} badge={0} />
            ))}
        </nav>

        <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)", fontSize: 11.5, color: "var(--ink-3)" }}>
          Grounded in the CLO mastery survey.
          <br />
          Model RASCH-1PL.
        </div>
      </aside>

      {/* ---------- main column ---------- */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header
          style={{
            height: TOPBAR_H,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 20px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 15 }}>{screenLabel(state.screen)}</div>
          <div style={{ flex: 1 }} />

          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Search (Ctrl+K)"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 34,
              padding: "0 12px",
              borderRadius: "var(--radius-s)",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--ink-3)",
              cursor: "pointer",
              fontSize: 13,
              minWidth: 200,
            }}
          >
            <Search size={15} />
            <span style={{ flex: 1, textAlign: "left" }}>Search or jump to</span>
            <Kbd>Ctrl K</Kbd>
          </button>

          <button
            data-demo-id="topbar-bell"
            onClick={() => navigate("inbox")}
            aria-label={`Notifications, ${unread} unread`}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "var(--radius-s)",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              cursor: "pointer",
              color: "var(--ink-2)",
            }}
          >
            <Bell size={17} />
            {unread > 0 ? (
              <span
                className="num"
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  minWidth: 17,
                  height: 17,
                  padding: "0 4px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unread}
              </span>
            ) : null}
          </button>

          {/* account menu */}
          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              data-demo-id="account-menu"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 36,
                padding: "0 10px",
                borderRadius: "var(--radius-s)",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                cursor: "pointer",
              }}
            >
              <Avatar name={person.name} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{person.name}</span>
              {person.verified ? (
                <ShieldCheck size={14} color="var(--ok)" aria-label="Verified" />
              ) : null}
              <ChevronDown size={14} color="var(--ink-3)" />
            </button>
            {menuOpen ? (
              <div
                className="fade-up"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 42,
                  width: 260,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-m)",
                  boxShadow: "var(--shadow-2)",
                  padding: 6,
                  zIndex: 60,
                }}
              >
                <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{person.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-2)" }}>
                    {roleLine}
                    {person.email ? ` · ${person.email}` : ""}
                  </div>
                  <div style={{ fontSize: 11.5, marginTop: 3, color: person.verified ? "var(--ok)" : "var(--warn)" }}>
                    {person.verified
                      ? "Verified coordinator identity"
                      : "Unverified: edits carry an unverified tag"}
                  </div>
                </div>
                <div style={{ padding: "6px 10px 2px", fontSize: 11, fontWeight: 600, color: "var(--ink-3)" }}>
                  SWITCH PERSON
                </div>
                {state.people.map((p) => (
                  <button
                    key={p.id}
                    data-demo-id={`switch-${p.id}`}
                    onClick={() => {
                      switchUser(p.id);
                      setMenuOpen(false);
                    }}
                    style={menuItemStyle}
                  >
                    <Avatar name={p.name} />
                    <span style={{ flex: 1, textAlign: "left" }}>{p.name}</span>
                    {p.id === person.id ? <Check size={14} color="var(--accent)" /> : null}
                  </button>
                ))}
                <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 4 }}>
                  <button
                    onClick={() => {
                      resetWorkspace();
                      setMenuOpen(false);
                    }}
                    style={menuItemStyle}
                  >
                    <RotateCcw size={14} />
                    <span>Reset workspace</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    style={menuItemStyle}
                  >
                    <LogOut size={14} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", minWidth: 0 }} data-demo-id="main-scroll">
          {props.children}
        </main>
      </div>

      {/* ---------- overlays ---------- */}
      {paletteOpen ? <CommandPalette onClose={() => setPaletteOpen(false)} /> : null}
      <AgentPanel />
      {state.toast ? (
        <div
          className="fade-up"
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--ink)",
            color: "#fff",
            padding: "9px 16px",
            borderRadius: "var(--radius-m)",
            boxShadow: "var(--shadow-2)",
            fontSize: 13.5,
            zIndex: 80,
            maxWidth: 520,
          }}
        >
          {state.toast}
        </div>
      ) : null}
    </div>
  );
}

const menuItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  padding: "7px 10px",
  border: "none",
  background: "transparent",
  borderRadius: "var(--radius-s)",
  cursor: "pointer",
  fontSize: 13,
  color: "var(--ink)",
};

function NavItem(props: { screen: Screen; active: boolean; badge: number }) {
  if (props.screen === "login") return null;
  const meta = NAV_META[props.screen];
  const Icon = meta.icon;
  return (
    <button
      data-demo-id={`nav-${props.screen}`}
      onClick={() => navigate(props.screen)}
      aria-current={props.active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "7px 10px",
        marginBottom: 1,
        borderRadius: "var(--radius-s)",
        border: "none",
        cursor: "pointer",
        fontSize: 13.5,
        fontWeight: props.active ? 600 : 400,
        color: props.active ? "var(--accent)" : "var(--ink-2)",
        background: props.active ? "var(--accent-soft)" : "transparent",
        transition: "background 150ms ease-out",
      }}
    >
      <Icon size={16} strokeWidth={1.75} />
      <span style={{ flex: 1, textAlign: "left" }}>{meta.label}</span>
      {props.badge > 0 ? (
        <span
          className="num"
          style={{
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            borderRadius: 999,
            background: "var(--accent)",
            color: "var(--accent-ink)",
            fontSize: 11,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.badge}
        </span>
      ) : null}
    </button>
  );
}

function HatBadge(props: { label: string; title: string }) {
  return (
    <span
      title={props.title}
      style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        background: "var(--surface-2)",
        color: "var(--ink-3)",
        fontSize: 10,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.label}
    </span>
  );
}

function Avatar(props: { name: string }) {
  const initials = props.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "var(--accent-soft)",
        color: "var(--accent)",
        fontSize: 10.5,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  );
}
