import type { Additive } from "./data/schema";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const DURATION = 160;

export const LEAVE_MS = 180;
export const MAX_LEAVE = 8;
export const ROW_H = 62;

export function enterGrowLimit(paneHeight: number): number {
  if (paneHeight <= 0) return 8;
  return Math.min(20, Math.max(6, Math.ceil(paneHeight / ROW_H)));
}

const ROW = ".row-slot[data-code]";

function measureRows(): Map<string, DOMRect> {
  const map = new Map<string, DOMRect>();
  document.querySelectorAll<HTMLElement>(ROW).forEach((el) => {
    const code = el.dataset.code;
    if (code) map.set(code, el.getBoundingClientRect());
  });
  return map;
}

export function cancelRowAnimations(): void {
  document.querySelectorAll<HTMLElement>(ROW).forEach((el) => {
    el.getAnimations().forEach((anim) => anim.cancel());
  });
}

export function captureRows(): Map<string, DOMRect> {
  cancelRowAnimations();
  return measureRows();
}

export function playFlip(first: Map<string, DOMRect>): void {
  const last = measureRows();

  document.querySelectorAll<HTMLElement>(ROW).forEach((el) => {
    const code = el.dataset.code;
    if (!code) return;
    const a = first.get(code);
    const b = last.get(code);
    if (!a || !b) return;
    const dx = a.left - b.left;
    const dy = a.top - b.top;
    if (dx || dy) {
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
        { duration: DURATION, easing: EASE },
      );
    }
  });
}

export function intersectsPane(
  rect: { top: number; bottom: number },
  pane: { top: number; bottom: number },
): boolean {
  return rect.bottom > pane.top && rect.top < pane.bottom;
}

export function pickVisibleCodes(
  codes: string[],
  rects: Map<string, { top: number; bottom: number }>,
  pane: { top: number; bottom: number },
  limit: number,
): string[] {
  const out: string[] = [];
  for (const code of codes) {
    const rect = rects.get(code);
    if (!rect || !intersectsPane(rect, pane)) continue;
    out.push(code);
    if (out.length >= limit) break;
  }
  return out;
}

export function composeDisplay(
  results: Additive[],
  leaving: Additive[],
  prevOrder: string[],
): Additive[] {
  const resultCodes = new Set(results.map((row) => row.code));
  const leaveCodes = new Set(leaving.map((row) => row.code));
  const byCode = new Map<string, Additive>();
  for (const row of leaving) byCode.set(row.code, row);
  for (const row of results) byCode.set(row.code, row);

  const out: Additive[] = [];
  const used = new Set<string>();

  for (const code of prevOrder) {
    if (!resultCodes.has(code) && !leaveCodes.has(code)) continue;
    const row = byCode.get(code);
    if (!row) continue;
    out.push(row);
    used.add(code);
  }

  for (let i = 0; i < results.length; i++) {
    const row = results[i];
    if (used.has(row.code)) continue;
    let insertAt = out.length;
    for (let j = i - 1; j >= 0; j--) {
      const idx = out.findIndex((item) => item.code === results[j].code);
      if (idx !== -1) {
        insertAt = idx + 1;
        break;
      }
    }
    if (insertAt === out.length) {
      for (let j = i + 1; j < results.length; j++) {
        const idx = out.findIndex((item) => item.code === results[j].code);
        if (idx !== -1) {
          insertAt = idx;
          break;
        }
      }
    }
    out.splice(insertAt, 0, row);
    used.add(row.code);
  }

  return out;
}
