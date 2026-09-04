import { render } from "preact";
import { App } from "./app";
import "./styles.css";

render(<App />, document.getElementById("app")!);

window.addEventListener("load", async () => {
  if (!import.meta.env.PROD) return;
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({ immediate: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && navigator.onLine) {
      void navigator.serviceWorker?.getRegistration()?.then((reg) => reg?.update());
    }
  });
});
