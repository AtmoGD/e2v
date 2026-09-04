import { describe, expect, it } from "vitest";
import type { Additive } from "./data/schema";
import { composeDisplay, enterGrowLimit, pickVisibleCodes } from "./flip";

function item(code: string): Additive {
  return {
    code,
    digitKey: code.slice(1),
    status: "vegan",
    names: { en: code, de: code },
    reason: { en: "", de: "" },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: [],
  };
}

describe("composeDisplay", () => {
  const a = item("E120");
  const b = item("E122");
  const c = item("E123");
  const d = item("E124");

  it("keeps leaving rows in their previous slot", () => {
    const out = composeDisplay([a, d], [b], ["E120", "E122", "E123", "E124"]);
    expect(out.map((row) => row.code)).toEqual(["E120", "E122", "E124"]);
  });

  it("inserts new rows next to their result neighbors", () => {
    const out = composeDisplay([a, b, c, d], [], ["E120", "E124"]);
    expect(out.map((row) => row.code)).toEqual(["E120", "E122", "E123", "E124"]);
  });

  it("falls back to results order when there is no previous order", () => {
    const out = composeDisplay([a, b], [], []);
    expect(out.map((row) => row.code)).toEqual(["E120", "E122"]);
  });

  it("can show only leaving rows after a clear", () => {
    const out = composeDisplay([], [a, b], ["E120", "E122", "E123"]);
    expect(out.map((row) => row.code)).toEqual(["E120", "E122"]);
  });
});

describe("enterGrowLimit", () => {
  it("fills the pane and stays in range", () => {
    expect(enterGrowLimit(400)).toBe(7);
    expect(enterGrowLimit(62)).toBe(6);
    expect(enterGrowLimit(2000)).toBe(20);
  });
});

describe("pickVisibleCodes", () => {
  it("keeps list order and stops at the limit", () => {
    const rects = new Map([
      ["A", { top: -40, bottom: -10 }],
      ["B", { top: 10, bottom: 40 }],
      ["C", { top: 50, bottom: 80 }],
      ["D", { top: 90, bottom: 120 }],
      ["E", { top: 400, bottom: 430 }],
    ]);
    const pane = { top: 0, bottom: 200 };
    expect(pickVisibleCodes(["A", "B", "C", "D", "E"], rects, pane, 2)).toEqual([
      "B",
      "C",
    ]);
  });
});
