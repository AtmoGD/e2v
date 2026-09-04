import type { Additive } from "./data/schema";
import { spokenStatus, StatusMark } from "./icons";

type Lang = "en" | "de";

type Props = {
  items: Additive[];
  query: string;
  expanded: string | null;
  lang: Lang;
  leaving: Set<string>;
  entering: Set<string>;
  snapping: Set<string>;
  leaveHot: boolean;
  onToggle: (code: string) => void;
};

export function Results({
  items,
  query,
  expanded,
  lang,
  leaving,
  entering,
  snapping,
  leaveHot,
  onToggle,
}: Props) {
  if (!query && leaving.size === 0) return null;

  if (items.length === 0) {
    return (
      <div class="empty-hit" aria-live="polite">
        —
      </div>
    );
  }

  return (
    <ul class="list">
      {items.map((item) => {
        const isLeaving = leaving.has(item.code);
        const open = !isLeaving && expanded === item.code;
        const exact = !isLeaving && item.digitKey === query;
        const slot = [
          "row-slot",
          exact ? "row-exact" : "",
          isLeaving && leaveHot ? "leaving" : "",
          entering.has(item.code) ? "entering" : "",
          snapping.has(item.code) ? "snap" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={item.code} data-code={item.code} class={slot}>
            <div class="row-clip">
              <div class="row">
                <button
                  type="button"
                  class="row-btn"
                  aria-expanded={open}
                  aria-hidden={isLeaving}
                  tabindex={isLeaving ? -1 : undefined}
                  aria-label={`${item.code}, ${spokenStatus(item.status, lang)}`}
                  onClick={() => onToggle(item.code)}
                >
                  <span class="code">{item.code}</span>
                  <span class="mark-well">
                    <StatusMark status={item.status} />
                  </span>
                </button>
                <div class={open ? "detail open" : "detail"} aria-hidden={!open}>
                  <div class="detail-clip">
                    <div class="detail-inner">
                      <p class="detail-name">{item.names[lang]}</p>
                      <p class="detail-reason">{item.reason[lang]}</p>
                      {!item.food_authorised_eu ? (
                        <p class="detail-note">
                          {lang === "de"
                            ? "In der EU kein zugelassener Lebensmittelzusatzstoff."
                            : "Not an authorised EU food additive."}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
