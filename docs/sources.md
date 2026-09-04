# Sources

This file lists what the additive JSON is built from. No third-party articles are copied into the app.

## Official inventory

- **Regulation (EC) No 1333/2008**, Annex II (consolidated text on EUR-Lex, CELEX `02008R1333`). Source id `1333`.
  - https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02008R1333-20241216
  - Commission reuse: Decision 2011/833/EU. Codes and official names may be reused; annex prose is not reproduced here.
- **Commission Regulation (EU) No 231/2012** (specifications). Source id `231`.
  - https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0231
  - Used for origin-in-the-spec facts (cochineal, hen-egg lysozyme, beeswax, shellac, lactitol).
- **Regulation (EU) 2025/652** — E 960b (steviol glycosides from fermentation).
- **BVL** (Germany), public additive information — count and consumer framing, not vegan status.
  - https://www.bvl.bund.de/DE/Arbeitsbereiche/01_Lebensmittel/03_Verbraucher/05_Zusatzstoffe/lm_zusatzst_node.html

## Names and aliases only

- **Open Food Facts** additives taxonomy (`taxonomies/additives.txt`), ODbL 1.0.
  - https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/additives.txt
  - https://world.openfoodfacts.org
  - Used for EN/DE names and aliases. OFF `vegan:` tags are **not** treated as truth.

## Policy (vegan / not vegan / maybe)

- In-repo overlay: `scripts/overlay.mjs` (source id `overlay`).
- Cross-check only (facts, not copied wording): Food-Info animal-origin notes (source id `fi`).
  - https://www.food-info.net/uk/qa/qa-fi45.htm

## Disclaimer

This database is shopping guidance, not a guarantee. Manufacturing origin can change by producer and batch, and is often invisible from the E-number alone. It is not allergy or medical advice.
