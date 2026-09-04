import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
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

const additives = inventory.map((line) => {
  const [code, en, de] = line.split("|");
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
    sources: GHOSTS.has(code) ? ["overlay", "fi"] : ["1333", "overlay"],
  };
});

const seen = new Set();
for (const row of additives) {
  if (seen.has(row.code)) throw new Error(`Duplicate ${row.code}`);
  seen.add(row.code);
}

const outDir = join(root, "src/data");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(root, "src/data/additives.json"), `${JSON.stringify(additives)}\n`);

const counts = { vegan: 0, not_vegan: 0, maybe: 0 };
for (const row of additives) counts[row.status] += 1;
console.log(
  `Wrote ${additives.length} additives — vegan ${counts.vegan}, maybe ${counts.maybe}, not_vegan ${counts.not_vegan}`,
);
