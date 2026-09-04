import { describe, expect, it } from "vitest";
import additivesJson from "./data/additives.json";
import { matchAdditives, queryAccent, type Additive } from "./match";

const db = additivesJson as Additive[];

const seed: Additive[] = [
  {
    code: "E120",
    digitKey: "120",
    status: "not_vegan",
    names: { en: "Cochineal", de: "Echtes Karmin" },
    reason: { en: "Insect.", de: "Insekt." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E124",
    digitKey: "124",
    status: "vegan",
    names: { en: "Ponceau 4R", de: "Cochenillerot A" },
    reason: { en: "Synthetic.", de: "Synthetisch." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E270",
    digitKey: "270",
    status: "vegan",
    names: { en: "Lactic acid", de: "Milchsäure" },
    reason: { en: "Fermentation.", de: "Gärung." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E322",
    digitKey: "322",
    status: "maybe",
    names: { en: "Lecithins", de: "Lecithine" },
    reason: { en: "Egg or plant.", de: "Ei oder Pflanze." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E322a",
    digitKey: "322",
    suffix: "a",
    status: "vegan",
    names: { en: "Oat lecithin", de: "Haferlecithin" },
    reason: { en: "Oats.", de: "Hafer." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E441",
    digitKey: "441",
    status: "not_vegan",
    names: { en: "Gelatine", de: "Gelatine" },
    reason: { en: "Collagen.", de: "Kollagen." },
    authorised_eu: false,
    food_authorised_eu: false,
    sources: ["overlay"],
  },
  {
    code: "E471",
    digitKey: "471",
    status: "maybe",
    names: { en: "Mono- and diglycerides", de: "Mono- und Diglyceride" },
    reason: { en: "Fat source varies.", de: "Fettquelle unklar." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E901",
    digitKey: "901",
    status: "not_vegan",
    names: { en: "Beeswax", de: "Bienenwachs" },
    reason: { en: "Bees.", de: "Bienen." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E1105",
    digitKey: "1105",
    status: "not_vegan",
    names: { en: "Lysozyme", de: "Lysozym" },
    reason: { en: "Egg.", de: "Ei." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
  {
    code: "E1200",
    digitKey: "1200",
    status: "vegan",
    names: { en: "Polydextrose", de: "Polydextrose" },
    reason: { en: "Synthetic.", de: "Synthetisch." },
    authorised_eu: true,
    food_authorised_eu: true,
    sources: ["overlay"],
  },
];

function byCode(list: Additive[], code: string) {
  return list.find((row) => row.code === code);
}

describe("matchAdditives", () => {
  it("returns [] for an empty query", () => {
    expect(matchAdditives(seed, "")).toEqual([]);
    expect(matchAdditives(db, "")).toEqual([]);
  });

  it("matches prefix 12 and sorts E120 before E1200", () => {
    const hits = matchAdditives(seed, "12");
    const codes = hits.map((row) => row.code);
    expect(codes).toContain("E120");
    expect(codes).toContain("E124");
    const i120 = codes.indexOf("E120");
    const i1200 = codes.indexOf("E1200");
    expect(i120).toBeGreaterThan(-1);
    expect(i1200).toBeGreaterThan(-1);
    expect(i120).toBeLessThan(i1200);

    const fromDb = matchAdditives(db, "12");
    const dbCodes = fromDb.map((row) => row.code);
    expect(dbCodes).toContain("E120");
    expect(dbCodes).toContain("E124");
    if (dbCodes.includes("E1200")) {
      expect(dbCodes.indexOf("E120")).toBeLessThan(dbCodes.indexOf("E1200"));
    }
  });

  it("puts E120 first for query 120", () => {
    expect(matchAdditives(seed, "120")[0]?.code).toBe("E120");
    expect(matchAdditives(db, "120")[0]?.code).toBe("E120");
  });

  it("finds ghost E441 as not_vegan", () => {
    const hit = matchAdditives(seed, "441").find((row) => row.code === "E441");
    expect(hit?.status).toBe("not_vegan");
    const fromDb = matchAdditives(db, "441").find((row) => row.code === "E441");
    expect(fromDb?.status).toBe("not_vegan");
  });

  it("includes E322 maybe and E322a vegan for query 322", () => {
    const hits = matchAdditives(seed, "322");
    expect(byCode(hits, "E322")?.status).toBe("maybe");
    expect(byCode(hits, "E322a")?.status).toBe("vegan");

    const fromDb = matchAdditives(db, "322");
    expect(byCode(fromDb, "E322")?.status).toBe("maybe");
    expect(byCode(fromDb, "E322a")?.status).toBe("vegan");
  });
});

describe("queryAccent", () => {
  it("is null when the query is empty or incomplete", () => {
    expect(queryAccent(matchAdditives(seed, ""), "")).toBeNull();
    expect(queryAccent(matchAdditives(seed, "12"), "12")).toBeNull();
  });

  it("uses the exact match even when a longer prefix remains", () => {
    expect(queryAccent(matchAdditives(seed, "120"), "120")).toBe("not_vegan");
    expect(queryAccent(matchAdditives(seed, "124"), "124")).toBe("vegan");
    expect(queryAccent(matchAdditives(seed, "471"), "471")).toBe("maybe");
  });

  it("stays null when exact matches disagree", () => {
    expect(queryAccent(matchAdditives(seed, "322"), "322")).toBeNull();
  });
});

describe("seed statuses in additives.json", () => {
  it("keeps high-confidence seeds", () => {
    expect(byCode(db, "E120")?.status).toBe("not_vegan");
    expect(byCode(db, "E124")?.status).toBe("vegan");
    expect(byCode(db, "E471")?.status).toBe("maybe");
    expect(byCode(db, "E270")?.status).toBe("vegan");
    expect(byCode(db, "E1105")?.status).toBe("not_vegan");
    expect(byCode(db, "E901")?.status).toBe("not_vegan");
    expect(byCode(db, "E428")?.status).toBe("not_vegan");
  });

  it("never marks gelatine codes vegan", () => {
    for (const row of db) {
      if (/gelatin/i.test(`${row.names.en} ${row.names.de}`)) {
        expect(row.status, row.code).toBe("not_vegan");
      }
    }
  });

  it("stays on the curated inventory, not roman-numeral aliases", () => {
    expect(db.length).toBeGreaterThan(330);
    expect(db.length).toBeLessThan(360);
    expect(byCode(db, "E483")?.status).toBe("maybe");
    for (const row of db) {
      expect(row.code, row.code).not.toMatch(/[()]/);
    }
  });

  it("keeps the 2026 inventory corrections", () => {
    expect(byCode(db, "E246")?.status).toBe("vegan");
    expect(byCode(db, "E246")?.food_authorised_eu).toBe(true);
    expect(byCode(db, "E246")?.names.en).toMatch(/glycolipid/i);
    expect(byCode(db, "E534")?.names.en).toMatch(/iron tartrate/i);
    expect(byCode(db, "E534")?.names.de).toMatch(/eisentartrat/i);
    expect(byCode(db, "E483")?.authorised_eu).toBe(false);
    expect(byCode(db, "E912")?.authorised_eu).toBe(false);
    expect(byCode(db, "E921")?.authorised_eu).toBe(false);
    expect(byCode(db, "E921")?.status).toBe("maybe");
  });
});
