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
      <div class="lang" role="group" aria-label="Language">
        <button
          type="button"
          class={lang === "en" ? "lang-btn on" : "lang-btn"}
          aria-pressed={lang === "en"}
          onClick={() => onLang("en")}
        >
          EN
        </button>
        <button
          type="button"
          class={lang === "de" ? "lang-btn on" : "lang-btn"}
          aria-pressed={lang === "de"}
          onClick={() => onLang("de")}
        >
          DE
        </button>
      </div>
    </header>
  );
}
