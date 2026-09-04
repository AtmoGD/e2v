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
      <img
        class="logo"
        src={`${import.meta.env.BASE_URL}logo.png`}
        width={28}
        height={28}
        alt="e2v"
      />
      <div class="lang-switch" role="group" aria-label="Language">
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
