import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EXTRAS } from "./extras.mjs";
import {
  CITED_CODES,
  FEED_CODES,
  GHOSTS,
  NOT_FOOD_AUTHORISED,
  reasonFor,
  statusFor,
} from "./overlay.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inventory = readFileSync(join(root, "scripts/inventory.txt"), "utf8")
  .trim()
  .split("\n")
  .filter((line) => line && !line.startsWith("#"));

function parseCode(code) {
  const m = code.match(/^E(\d+)([a-z]+)?$/i);
  if (!m) throw new Error(`Bad code ${code}`);
  return { digitKey: m[1], suffix: m[2]?.toLowerCase() ?? "" };
}

const LEGACY_GHOST_SOURCES = new Set([
  "E428",
  "E441",
  "E542",
  "E913",
  "E1000",
]);

/** @param {string} code */
function sourcesFor(code) {
  if (LEGACY_GHOST_SOURCES.has(code)) return ["overlay", "fi"];
  if (CITED_CODES.has(code) || FEED_CODES.has(code)) return ["hist", "overlay"];
  return ["1333", "overlay"];
}

function toRow(code, en, de) {
  const { digitKey, suffix } = parseCode(code);
  const status = statusFor(code);
  return {
    code,
    digitKey,
    suffix,
    status,
    names: { en, de },
    reason: reasonFor(code, status),
    authorised_eu: !GHOSTS.has(code),
    food_authorised_eu: !NOT_FOOD_AUTHORISED.has(code),
    sources: sourcesFor(code),
  };
}

const additives = inventory.map((line) => {
  const [code, en, de] = line.split("|");
  return toRow(code, en, de);
});

const seen = new Set(additives.map((row) => row.code));
for (const extra of EXTRAS) {
  if (seen.has(extra.code)) throw new Error(`Duplicate extra ${extra.code}`);
  seen.add(extra.code);
  additives.push(toRow(extra.code, extra.en, extra.de));
}

additives.sort((a, b) => {
  if (a.digitKey.length !== b.digitKey.length) {
    return a.digitKey.length - b.digitKey.length;
  }
  const na = Number(a.digitKey);
  const nb = Number(b.digitKey);
  if (na !== nb) return na - nb;
  return (a.suffix ?? "").localeCompare(b.suffix ?? "");
});

const outDir = join(root, "src/data");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(root, "src/data/additives.json"), `${JSON.stringify(additives)}\n`);

const counts = { vegan: 0, not_vegan: 0, maybe: 0 };
for (const row of additives) counts[row.status] += 1;
console.log(
  `Wrote ${additives.length} additives — vegan ${counts.vegan}, maybe ${counts.maybe}, not_vegan ${counts.not_vegan}`,
);
