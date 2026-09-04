/** @typedef {"vegan" | "not_vegan" | "maybe"} Status */

/** @type {Record<string, Status>} */
export const STATUS_OVERRIDE = {
  E120: "not_vegan",
  E901: "not_vegan",
  E904: "not_vegan",
  E966: "not_vegan",
  E1105: "not_vegan",
  E428: "not_vegan",
  E441: "not_vegan",
  E542: "not_vegan",
  E913: "not_vegan",
  E1000: "not_vegan",

  E124: "vegan",
  E270: "vegan",
  E150a: "vegan",
  E150b: "vegan",
  E150c: "vegan",
  E150d: "vegan",
  E322a: "vegan",
  E406: "vegan",
  E407: "vegan",
  E440: "vegan",
  E620: "vegan",
  E621: "vegan",
  E622: "vegan",
  E623: "vegan",
  E624: "vegan",
  E625: "vegan",
  E171: "vegan",

  E101: "maybe",
  E101a: "maybe",
  E160a: "maybe",
  E161b: "maybe",
  E234: "maybe",
  E243: "maybe",
  E304: "maybe",
  E322: "maybe",
  E422: "maybe",
  E431: "maybe",
  E432: "maybe",
  E433: "maybe",
  E434: "maybe",
  E435: "maybe",
  E436: "maybe",
  E442: "maybe",
  E445: "maybe",
  E470a: "maybe",
  E470b: "maybe",
  E471: "maybe",
  E472a: "maybe",
  E472b: "maybe",
  E472c: "maybe",
  E472d: "maybe",
  E472e: "maybe",
  E472f: "maybe",
  E473: "maybe",
  E474: "maybe",
  E475: "maybe",
  E476: "maybe",
  E477: "maybe",
  E479b: "maybe",
  E481: "maybe",
  E482: "maybe",
  E483: "maybe",
  E491: "maybe",
  E492: "maybe",
  E493: "maybe",
  E494: "maybe",
  E495: "maybe",
  E570: "maybe",
  E626: "maybe",
  E627: "maybe",
  E628: "maybe",
  E629: "maybe",
  E630: "maybe",
  E631: "maybe",
  E632: "maybe",
  E633: "maybe",
  E634: "maybe",
  E635: "maybe",
  E640: "maybe",
  E920: "maybe",
  E921: "maybe",
  E1517: "maybe",
  E1518: "maybe",
};

export const GHOSTS = new Set([
  "E428",
  "E441",
  "E483",
  "E542",
  "E912",
  "E913",
  "E921",
  "E1000",
]);
export const NOT_FOOD_AUTHORISED = new Set([
  "E171",
  "E428",
  "E441",
  "E483",
  "E542",
  "E912",
  "E913",
  "E921",
  "E1000",
  "E161g",
]);

/** @type {Record<string, { en: string; de: string }>} */
export const REASON_OVERRIDE = {
  E120: {
    en: "Red dye from cochineal insects. Always not vegan.",
    de: "Roter Farbstoff aus Cochenille-Schildläusen. Nie vegan.",
  },
  E124: {
    en: "Synthetic azo dye (Ponceau 4R). Not the insect colour E120.",
    de: "Synthetischer Azofarbstoff (Cochenillerot A). Nicht der Insektenfarbstoff E120.",
  },
  E270: {
    en: "Industrial lactic acid is made by fermentation of sugars, not from milk.",
    de: "Industrielle Milchsäure entsteht durch Zuckergärung, nicht aus Milch.",
  },
  E322: {
    en: "Usually soy or sunflower; egg lecithin exists. Label rarely says which.",
    de: "Meist Soja oder Sonnenblume; Ei-Lecithin kommt vor. Die Herkunft steht selten drauf.",
  },
  E322a: {
    en: "Oat lecithin. Plant-defined, vegan.",
    de: "Haferlecithin. Pflanzlich definiert, vegan.",
  },
  E428: {
    en: "Gelatine from animal skin or bone. Not vegan.",
    de: "Gelatine aus Haut oder Knochen. Nicht vegan.",
  },
  E441: {
    en: "Gelatine from animal skin or bone. Not an EU food E-number, but the code is still used.",
    de: "Gelatine aus Haut oder Knochen. Keine EU-E-Nummer, der Code wird trotzdem getippt.",
  },
  E471: {
    en: "Fats may be plant or animal. The E-code alone cannot tell you.",
    de: "Fette können pflanzlich oder tierisch sein. Die E-Nummer allein sagt das nicht.",
  },
  E901: {
    en: "Beeswax from honey bees. Not vegan.",
    de: "Bienenwachs. Nicht vegan.",
  },
  E904: {
    en: "Shellac resin from lac insects. Not vegan.",
    de: "Schellackharz der Lackschildlaus. Nicht vegan.",
  },
  E920: {
    en: "Often from feathers or hair; some lots are fermented. Source is not on the label.",
    de: "Oft aus Federn oder Haaren; manchmal fermentiert. Die Herkunft steht nicht auf dem Etikett.",
  },
  E966: {
    en: "Sweetener made from lactose (milk sugar). Not vegan.",
    de: "Süßungsmittel aus Lactose (Milchzucker). Nicht vegan.",
  },
  E1105: {
    en: "EU specification is lysozyme from hen egg white. Not vegan.",
    de: "EU-Spezifikation: Lysozym aus Hühnereiweiß. Nicht vegan.",
  },
  E171: {
    en: "Mineral pigment. Vegan, but no longer authorised in EU food.",
    de: "Mineralisches Pigment. Vegan, in der EU für Lebensmittel nicht mehr zugelassen.",
  },
  E483: {
    en: "Fatty acids may be plant or animal. Removed from the EU food list in 2024.",
    de: "Fettsäuren können pflanzlich oder tierisch sein. Seit 2024 nicht mehr in der EU-Liste.",
  },
  E912: {
    en: "Wax from lignite. Vegan, but removed from the EU food list in 2014.",
    de: "Wachs aus Braunkohle. Vegan, seit 2014 nicht mehr in der EU-Liste.",
  },
  E921: {
    en: "Often from hair or feathers; some lots are fermented. Not an EU food E-number.",
    de: "Oft aus Haaren oder Federn; manchmal fermentiert. Keine EU-Lebensmittel-E-Nummer.",
  },
};

const MAYBE_EN =
  "Can be plant or animal depending on the manufacturer. Origin is not on the label.";
const MAYBE_DE =
  "Kann pflanzlich oder tierisch sein. Die Herkunft steht nicht auf dem Etikett.";
const VEGAN_EN = "Plant, mineral, microbial, or synthetic in normal EU food use.";
const VEGAN_DE = "In der EU-Lebensmittelpraxis pflanzlich, mineralisch, mikrobiell oder synthetisch.";
const DEFAULT_NV_EN = "Animal-derived in the authorised specification.";
const DEFAULT_NV_DE = "In der zulässigen Spezifikation tierischen Ursprungs.";

/**
 * @param {string} code
 * @param {Status} status
 */
export function reasonFor(code, status) {
  if (REASON_OVERRIDE[code]) return REASON_OVERRIDE[code];
  if (status === "maybe") return { en: MAYBE_EN, de: MAYBE_DE };
  if (status === "not_vegan") return { en: DEFAULT_NV_EN, de: DEFAULT_NV_DE };
  return { en: VEGAN_EN, de: VEGAN_DE };
}

/** @param {string} code */
export function statusFor(code) {
  return STATUS_OVERRIDE[code] ?? "vegan";
}
