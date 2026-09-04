import { flushSync } from "preact/compat";
import { useMemo, useRef, useState } from "preact/hooks";
import additives from "./data/additives.json";
import type { Additive } from "./data/schema";
import { captureRows, playFlip } from "./flip";
import { Header } from "./header";
import { InstallHint } from "./install-hint";
import { matchAdditives } from "./match";
import { Numpad } from "./numpad";
import { Results } from "./results";
import { useEdgeFades } from "./scroll-fades";

const db = additives as Additive[];
const LANG_KEY = "e2v.lang";

function loadLang(): "en" | "de" {
  const stored = localStorage.getItem(LANG_KEY);
  return stored === "de" ? "de" : "en";
}

function runUpdate(update: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    update();
    return;
  }
  const first = captureRows();
  flushSync(update);
  playFlip(first);
}

export function App() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "de">(loadLang);

  const results = useMemo(() => matchAdditives(db, query), [query]);
  const paneRef = useRef<HTMLElement>(null);
  const fades = useEdgeFades(paneRef, [query, results.length, expanded]);

  function setLangPersist(next: "en" | "de") {
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
  }

  function onDigit(digit: string) {
    if (query.length >= 4) return;
    runUpdate(() => {
      setExpanded(null);
      setQuery((prev) => prev + digit);
    });
  }

  function onBackspace() {
    runUpdate(() => {
      setExpanded(null);
      setQuery((prev) => prev.slice(0, -1));
    });
  }

  function onClear() {
    runUpdate(() => {
      setExpanded(null);
      setQuery("");
    });
  }

  const slots = [query[0] ?? "·", query[1] ?? "·", query[2] ?? "·", query[3] ?? "·"];

  return (
    <div class="shell">
      <Header lang={lang} onLang={setLangPersist} />
      <div class="stage">
        <div class="list-wrap">
          <main class="list-pane" ref={paneRef}>
            <InstallHint />
            <Results
              results={results}
              query={query}
              expanded={expanded}
              lang={lang}
              onToggle={(code) => setExpanded((prev) => (prev === code ? null : code))}
            />
          </main>
          <div
            class="list-fade list-fade-top"
            style={{ opacity: fades.top }}
            aria-hidden="true"
          />
          <div
            class="list-fade list-fade-bottom"
            style={{ opacity: fades.bottom }}
            aria-hidden="true"
          />
        </div>
        <div class="dock">
          <div class="query" aria-live="polite" aria-label={`E ${query || ""}`}>
            <span class="query-e">E</span>
            {slots.map((slot, index) => (
              <span key={index} class={slot === "·" ? "query-dot" : "query-digit"}>
                {slot}
              </span>
            ))}
          </div>
          <Numpad
            query={query}
            onDigit={onDigit}
            onBackspace={onBackspace}
            onClear={onClear}
          />
        </div>
      </div>
    </div>
  );
}
