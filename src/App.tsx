// The router: Login and the public Relevance Index render bare; everything else
// renders inside the Shell. Navigation syncs to the URL hash (#/screen) so
// refresh, back, and deep links work like a real app.

import { useEffect } from "react";
import type { Screen } from "./app/roles.ts";
import { navAllows } from "./app/roles.ts";
import { currentPerson, getState, navigate, useStore } from "./app/store.ts";
import { Shell } from "./ui/shell/Shell.tsx";
import { SCREENS } from "./ui/screens/index.ts";

const HASH_SCREENS: Screen[] = [
  "login",
  "index",
  "inbox",
  "trends",
  "approval",
  "programme",
  "new-subject",
  "assignments",
  "courses",
  "studio",
  "acceptance",
  "upload",
  "backtest",
  "dataroom",
  "office",
];

function parseHash(): Screen | null {
  const h = window.location.hash.replace(/^#\/?/, "");
  return (HASH_SCREENS as string[]).includes(h) ? (h as Screen) : null;
}

export default function App() {
  const state = useStore();

  // Keep the hash in step with the screen (deep links, refresh, back button).
  useEffect(() => {
    const want = `#/${state.screen}`;
    if (window.location.hash !== want) {
      // replaceState for programmatic moves keeps back-button history sane for
      // the common case; the browser still records user-initiated hash changes.
      window.history.pushState(null, "", want);
    }
  }, [state.screen]);

  useEffect(() => {
    function onHashChange() {
      const target = parseHash();
      if (!target) return;
      const s = getState();
      const person = currentPerson();
      if (!person) {
        if (target === "index" || target === "login") navigate(target);
        return;
      }
      if (navAllows(person, s.assignments, target) && target !== s.screen) navigate(target);
    }
    // On first load, honour a deep link.
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  const ScreenComponent = SCREENS[state.screen];

  // Public surfaces render without the shell.
  if (state.screen === "login" || state.screen === "index" || !state.currentPersonId) {
    const Public = SCREENS[state.currentPersonId ? state.screen : state.screen === "index" ? "index" : "login"];
    return <Public />;
  }

  return (
    <Shell>
      <ScreenComponent />
    </Shell>
  );
}
