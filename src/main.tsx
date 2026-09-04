import { render } from "preact";
import { App } from "./app";
import "./styles.css";

function blockZoom(event: Event) {
  event.preventDefault();
}

document.addEventListener("gesturestart", blockZoom);
document.addEventListener("gesturechange", blockZoom);
document.addEventListener("gestureend", blockZoom);
document.addEventListener(
  "touchmove",
  (event) => {
    if ("scale" in event && event.scale !== 1) {
      event.preventDefault();
    }
  },
  { passive: false },
);

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
