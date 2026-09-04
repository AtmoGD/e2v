import { flushSync } from "preact/compat";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import additives from "./data/additives.json";
import type { Additive } from "./data/schema";
import {
  LEAVE_MS,
  MAX_LEAVE,
  cancelRowAnimations,
  captureRows,
  composeDisplay,
  enterGrowLimit,
  pickVisibleCodes,
  playFlip,
} from "./flip";
import { Header } from "./header";
import { InstallHint } from "./install-hint";
import { LogoE } from "./icons";
import { matchAdditives, queryAccent } from "./match";
import { Numpad } from "./numpad";
import { Results } from "./results";
import { useEdgeFades } from "./scroll-fades";

const db = additives as Additive[];
const LANG_KEY = "e2v.lang";

function loadLang(): "en" | "de" {
  const stored = localStorage.getItem(LANG_KEY);
  return stored === "de" ? "de" : "en";
}

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function App() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "de">(loadLang);
  const [leaving, setLeaving] = useState<Additive[]>([]);
  const [entering, setEntering] = useState<Set<string>>(() => new Set());
  const [snapping, setSnapping] = useState<Set<string>>(() => new Set());
  const [leaveHot, setLeaveHot] = useState(false);

  const results = useMemo(() => matchAdditives(db, query), [query]);
  const resultsRef = useRef(results);
  resultsRef.current = results;

  const orderRef = useRef<string[]>([]);
  const display = useMemo(
    () => composeDisplay(results, leaving, orderRef.current),
    [results, leaving],
  );
  orderRef.current = display.map((row) => row.code);

  const paneRef = useRef<HTMLElement>(null);
  const leaveTimer = useRef(0);
  const fades = useEdgeFades(paneRef, [
    query,
    results.length,
    expanded,
    leaving.length,
    leaveHot,
  ]);

  useEffect(() => {
    return () => window.clearTimeout(leaveTimer.current);
  }, []);

  function setLangPersist(next: "en" | "de") {
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
  }

  function runListUpdate(nextQuery: string) {
    if (reducedMotion()) {
      setLeaving([]);
      setLeaveHot(false);
      setEntering(new Set());
      setSnapping(new Set());
      setExpanded(null);
      setQuery(nextQuery);
      return;
    }

    cancelRowAnimations();
    flushSync(() => {
      setLeaving([]);
      setLeaveHot(false);
      setEntering(new Set());
      setSnapping(new Set());
    });

    const first = captureRows();
    const prev = resultsRef.current;
    const nextResults = matchAdditives(db, nextQuery);
    const nextCodes = new Set(nextResults.map((row) => row.code));
    const pane = paneRef.current?.getBoundingClientRect();

    const exited = prev
      .filter((row) => !nextCodes.has(row.code))
      .map((row) => row.code);
    const visibleLeaveCodes = pane
      ? pickVisibleCodes(exited, first, pane, MAX_LEAVE)
      : [];
    const visibleLeaving = prev.filter((row) =>
      visibleLeaveCodes.includes(row.code),
    );

    const enterCodes = nextResults
      .filter((row) => !first.has(row.code))
      .map((row) => row.code);
    const growLimit = enterGrowLimit(pane?.height ?? 0);
    const growCodes = new Set(enterCodes.slice(0, growLimit));

    flushSync(() => {
      setExpanded(null);
      setQuery(nextQuery);
      setLeaving(visibleLeaving);
      setEntering(new Set(enterCodes));
    });

    playFlip(first);

    requestAnimationFrame(() => {
      setLeaveHot(true);
      setEntering((prev) => {
        const next = new Set(prev);
        for (const code of growCodes) next.delete(code);
        return next;
      });
    });

    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => {
      const leftover = enterCodes.filter((code) => !growCodes.has(code));
      setSnapping(new Set(leftover));
      setEntering(new Set());
      setLeaving([]);
      setLeaveHot(false);
      requestAnimationFrame(() => setSnapping(new Set()));
    }, LEAVE_MS + 40);
  }

  function onDigit(digit: string) {
    if (query.length >= 4) return;
    runListUpdate(query + digit);
  }

  function onBackspace() {
    runListUpdate(query.slice(0, -1));
  }

  function onClear() {
    runListUpdate("");
  }

  const slots = [query[0] ?? "·", query[1] ?? "·", query[2] ?? "·", query[3] ?? "·"];
  const accent = queryAccent(results, query);
  const leavingCodes = useMemo(
    () => new Set(leaving.map((row) => row.code)),
    [leaving],
  );

  return (
    <div class="shell">
      <Header lang={lang} onLang={setLangPersist} />
      <div class="stage">
        <div class="list-wrap">
          <main class="list-pane" ref={paneRef}>
            <InstallHint />
            <Results
              items={display}
              query={query}
              expanded={expanded}
              lang={lang}
              leaving={leavingCodes}
              entering={entering}
              snapping={snapping}
              leaveHot={leaveHot}
              onToggle={(code) => {
                if (leavingCodes.has(code)) return;
                setExpanded((prev) => (prev === code ? null : code));
              }}
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
            <LogoE accent={accent} />
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
