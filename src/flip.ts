const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const DURATION = 160;

function measureRows(): Map<string, DOMRect> {
  const map = new Map<string, DOMRect>();
  document.querySelectorAll<HTMLElement>(".row[data-code]").forEach((el) => {
    const code = el.dataset.code;
    if (code) map.set(code, el.getBoundingClientRect());
  });
  return map;
}

export function playFlip(first: Map<string, DOMRect>): void {
  const last = measureRows();
  let enterIndex = 0;

  document.querySelectorAll<HTMLElement>(".row[data-code]").forEach((el) => {
    const code = el.dataset.code;
    if (!code) return;
    const a = first.get(code);
    const b = last.get(code);
    if (a && b) {
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (dx || dy) {
        el.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
          { duration: DURATION, easing: EASE },
        );
      }
      return;
    }
    if (!a && b) {
      if (enterIndex >= 4) return;
      const delay = enterIndex * 20;
      enterIndex += 1;
      el.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: DURATION, delay, easing: EASE, fill: "backwards" },
      );
    }
  });
}

export function captureRows(): Map<string, DOMRect> {
  return measureRows();
}
