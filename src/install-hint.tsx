import { useEffect, useState } from "preact/hooks";
import { ShareIcon } from "./icons";

const KEY = "e2v.a2hs.dismissed";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosSafari() {
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) &&
    /Safari/.test(ua) &&
    !/CriOS|FxiOS|EdgiOS/.test(ua)
  );
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function copy(lang: "en" | "de", mode: "ios" | "android" | "install") {
  if (lang === "de") {
    if (mode === "ios") return "Teilen → Zum Home-Bildschirm";
    if (mode === "install") return "Installieren";
    return "Menü → Zum Startbildschirm";
  }
  if (mode === "ios") return "Share → Add to Home Screen";
  if (mode === "install") return "Install";
  return "Menu → Add to Home screen";
}

export function InstallHint() {
  const [visible, setVisible] = useState(false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(
    null,
  );

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(KEY)) return;

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", dismiss);

    const timer = window.setTimeout(() => {
      if (isStandalone() || localStorage.getItem(KEY)) return;
      if (isIosSafari() || isAndroid()) setVisible(true);
    }, 800);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", dismiss);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    setPromptEvent(null);
    dismiss();
  }

  if (!visible || isStandalone()) return null;

  const lang: "en" | "de" = navigator.language.startsWith("de") ? "de" : "en";
  const mode = promptEvent ? "install" : isIosSafari() ? "ios" : "android";

  return (
    <div class="hint" role="status">
      <ShareIcon />
      {promptEvent ? (
        <button type="button" class="hint-action" onClick={install}>
          {copy(lang, "install")}
        </button>
      ) : (
        <span>{copy(lang, mode)}</span>
      )}
      <button type="button" class="hint-x" aria-label="Dismiss" onClick={dismiss}>
        ×
      </button>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}
