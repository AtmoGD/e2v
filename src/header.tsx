import deFlag from "country-flag-icons/string/3x2/DE";
import gbFlag from "country-flag-icons/string/3x2/GB";

type Lang = "en" | "de";

type Props = {
  lang: Lang;
  onLang: (lang: Lang) => void;
};

export function Header({ lang, onLang }: Props) {
  return (
    <header class="topbar">
      <div class="lang-switch" data-lang={lang} role="group" aria-label="Language">
        <span class="lang-thumb" aria-hidden="true" />
        <button
          type="button"
          class={lang === "en" ? "lang-opt on" : "lang-opt"}
          aria-pressed={lang === "en"}
          onClick={() => onLang("en")}
        >
          <span class="flag" dangerouslySetInnerHTML={{ __html: gbFlag }} />
          EN
        </button>
        <button
          type="button"
          class={lang === "de" ? "lang-opt on" : "lang-opt"}
          aria-pressed={lang === "de"}
          onClick={() => onLang("de")}
        >
          <span class="flag" dangerouslySetInnerHTML={{ __html: deFlag }} />
          DE
        </button>
      </div>
    </header>
  );
}
