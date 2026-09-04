import type { Additive } from "./data/schema";
import { spokenStatus, StatusMark } from "./icons";

type Lang = "en" | "de";

type Props = {
  results: Additive[];
  query: string;
  expanded: string | null;
  lang: Lang;
  onToggle: (code: string) => void;
};

export function Results({
  results,
  query,
  expanded,
  lang,
  onToggle,
}: Props) {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <div class="empty-hit" aria-live="polite">
        —
      </div>
    );
  }

  return (
    <ul class="list">
      {results.map((item) => {
        const open = expanded === item.code;
        const exact = item.digitKey === query;
        return (
          <li
            key={item.code}
            data-code={item.code}
            class={exact ? "row row-exact" : "row"}
          >
            <button
              type="button"
              class="row-btn"
              aria-expanded={open}
              aria-label={`${item.code}, ${spokenStatus(item.status, lang)}`}
              onClick={() => onToggle(item.code)}
            >
              <span class="code">{item.code}</span>
              <span class="mark-well">
                <StatusMark status={item.status} />
              </span>
            </button>
            {open ? (
              <div class="detail open">
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
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
