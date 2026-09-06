import { extrasIn } from "./extras.mjs";

/** @typedef {"vegan" | "not_vegan" | "maybe"} Status */

const WITHDRAWN = extrasIn("withdrawn");
const FEED = extrasIn("feed");
const CITED = extrasIn("cited");
const ANNEX_NF = extrasIn("annex_nf");

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

  E909: "not_vegan",

  E161j: "maybe",
  E305: "maybe",
  E387: "maybe",
  E429: "maybe",
  E430: "maybe",
  E470: "maybe",
  E472g: "maybe",
  E478: "maybe",
  E480: "maybe",
  E485: "maybe",
  E486: "maybe",
  E488: "maybe",
  E489: "maybe",
  E496: "maybe",
  E498: "maybe",
  E572: "maybe",
  E910: "maybe",
  E911: "maybe",
  E1100: "maybe",
  E1101: "maybe",
  E1104: "maybe",
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
  ...WITHDRAWN,
  ...FEED,
  ...CITED,
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
  ...ANNEX_NF,
  ...WITHDRAWN,
  ...FEED,
  ...CITED,
]);

export const WITHDRAWN_CODES = new Set(WITHDRAWN);
export const FEED_CODES = new Set(FEED);
export const CITED_CODES = new Set(CITED);
export const ANNEX_NOT_FOOD = new Set(ANNEX_NF);

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
  E103: {
    en: "Historical EU azo dye (chrysoine). Alkanet/alkannin is INS 103, a different colour.",
    de: "Früherer EU-Azofarbstoff (Chrysoin). Alkanna ist INS 103, ein anderer Farbstoff.",
  },
  E121: {
    en: "Historical EU lichen dye (orcein). Citrus Red 2 is INS 121 and was never an EU E-number.",
    de: "Früherer EU-Flechtenfarbstoff (Orcein). Citrus Red 2 ist INS 121 und war nie eine EU-E-Nummer.",
  },
  E125: {
    en: "Historical EU colour Scarlet GN. Ponceau SX is a different dye, often listed as INS 125.",
    de: "Früherer EU-Farbstoff Scharlach GN. Ponceau SX ist ein anderer Farbstoff (oft INS 125).",
  },
  E181: {
    en: "Historical colour burnt umber. Tannins are INS 181, not this code.",
    de: "Früherer Farbstoff gebrannte Schwarzerde. Tannine sind INS 181, nicht dieser Code.",
  },
  E182: {
    en: "Orcein/orchil from lichens. Same dye as historical E121. Not an official EU food E-number.",
    de: "Orcein/Orseille aus Flechten. Gleicher Farbstoff wie die frühere E121. Keine offizielle EU-Lebensmittel-E-Nummer.",
  },
  E203: {
    en: "Salt of sorbic acid. Removed from the EU food list in 2018 (Regulation 2018/98).",
    de: "Salz der Sorbinsäure. 2018 aus der EU-Liste gestrichen (Verordnung 2018/98).",
  },
  E216: {
    en: "Propylparaben. Removed from the EU food list in 2006.",
    de: "Propylparaben. Seit 2006 nicht mehr in der EU-Liste.",
  },
  E217: {
    en: "Sodium salt of propylparaben. Removed from the EU food list in 2006.",
    de: "Natriumsalz von Propylparaben. Seit 2006 nicht mehr in der EU-Liste.",
  },
  E225: {
    en: "Usually listed as potassium sulphite. Some German lists used this code for calcium disulphite.",
    de: "Meist Kaliumsulfit. Manche deutschen Listen nutzten den Code für Calciumdisulfit.",
  },
  E231: {
    en: "Citrus-surface treatment. Since 2014 an EU pesticide, not a food additive.",
    de: "Oberflächenbehandlung von Zitrus. Seit 2014 Pflanzenschutzmittel, kein Zusatzstoff.",
  },
  E232: {
    en: "Citrus-surface treatment. Since 2014 an EU pesticide, not a food additive.",
    de: "Oberflächenbehandlung von Zitrus. Seit 2014 Pflanzenschutzmittel, kein Zusatzstoff.",
  },
  E238: {
    en: "Calcium formate in the old EU list. Not potassium formate.",
    de: "Calciumformiat in der alten EU-Liste. Nicht Kaliumformiat.",
  },
  E284: {
    en: "EU food E284 is boric acid. The feed register used this code for ammonium propionate.",
    de: "EU-Lebensmittel-E284 ist Borsäure. Im Futtermittelregister stand hier Ammoniumpropionat.",
  },
  E499: {
    en: "EU food E499 is stigmasterol-rich plant sterols. The feed register used this code for cassia gum.",
    de: "EU-Lebensmittel-E499 sind stigmasterinreiche Phytosterine. Im Futtermittelregister stand hier Cassiagummi.",
  },
  E700: {
    en: "Official feed preservative mix (benzoate + propionic acid + sodium propionate). Not a tetracycline. Wikipedia's E700–E799 antibiotics start at E701.",
    de: "Offizielle Futter-Konservierungsmischung (Benzoat + Propionsäure + Natriumpropionat). Kein Tetracyclin. Die Wikipedia-Antibiotika E700–E799 beginnen bei E701.",
  },
  E408: {
    en: "Historical EU seaweed gum (furcellaran). Baker's yeast glycan is INS 408, a different substance.",
    de: "Früheres EU-Algengummi (Furcellaran). Hefeglycan ist INS 408, ein anderer Stoff.",
  },
  E411: {
    en: "Historical oat gum (INS 411). The feed register used E411 for tamarind seed flour; tamarind gum is INS 437.",
    de: "Früheres Hafergummi (INS 411). Das Futtermittelregister nutzte E411 für Tamarindenkernmehl; Tamarindengummi ist INS 437.",
  },
  E480: {
    en: "INS 480 is docusate. Some lists use this code for stearoyl-2-lactylic acid (feed only).",
    de: "INS 480 ist Docusat. Manche Listen meinen damit Stearoyl-2-lactylsäure (nur Futter).",
  },
  E490: {
    en: "Same substance as authorised E1520. This code is not the EU food number.",
    de: "Gleicher Stoff wie die zugelassene E1520. Dieser Code ist nicht die EU-Lebensmittelnummer.",
  },
  E556: {
    en: "Mineral anti-caking agent. Still printed in Annex II; food use ended 31 January 2014.",
    de: "Mineralisches Trennmittel. Steht noch in Anhang II; Lebensmittelfrist endete am 31. Januar 2014.",
  },
  E558: {
    en: "Clay anti-caking agent. Still printed in Annex II; food use ended 31 May 2013.",
    de: "Ton-Trennmittel. Steht noch in Anhang II; Lebensmittelfrist endete am 31. Mai 2013.",
  },
  E559: {
    en: "Kaolin. Still printed in Annex II; food use ended 31 January 2014.",
    de: "Kaolin. Steht noch in Anhang II; Lebensmittelfrist endete am 31. Januar 2014.",
  },
  E909: {
    en: "Wax from sperm whales. Not vegan. Not an official EU food E-number.",
    de: "Wachs vom Pottwal. Nicht vegan. Keine offizielle EU-Lebensmittel-E-Nummer.",
  },
  E960: {
    en: "Group code for steviol glycosides. Same vegan call as E960a–d.",
    de: "Gruppencode für Steviolglycoside. Gleiche Veganeinschätzung wie E960a–d.",
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
const CITED_EN =
  "Cited as an E-code on some lists (often an INS number). Not an official EU food E-number.";
const CITED_DE =
  "Auf manchen Listen als E-Nummer geführt (oft eine INS-Nummer). Keine offizielle EU-Lebensmittel-E-Nummer.";
const FEED_EN = "Feed or former feed-additive code. Never authorised in EU food.";
const FEED_DE = "Futter- oder früherer Futtermittelcode. Nie als EU-Lebensmittelzusatzstoff zugelassen.";
const WITHDRAWN_EN = "Former EU food additive. No longer authorised.";
const WITHDRAWN_DE = "Früherer EU-Lebensmittelzusatzstoff. Nicht mehr zugelassen.";

/**
 * @param {string} code
 * @param {Status} status
 */
export function reasonFor(code, status) {
  if (REASON_OVERRIDE[code]) return REASON_OVERRIDE[code];
  if (FEED_CODES.has(code)) return { en: FEED_EN, de: FEED_DE };
  if (CITED_CODES.has(code) && status === "vegan") return { en: CITED_EN, de: CITED_DE };
  if (CITED_CODES.has(code) && status === "maybe") {
    return {
      en: `${MAYBE_EN} Not an official EU food E-number.`,
      de: `${MAYBE_DE} Keine offizielle EU-Lebensmittel-E-Nummer.`,
    };
  }
  if (WITHDRAWN_CODES.has(code) && status === "vegan") {
    return { en: WITHDRAWN_EN, de: WITHDRAWN_DE };
  }
  if (status === "maybe") return { en: MAYBE_EN, de: MAYBE_DE };
  if (status === "not_vegan") return { en: DEFAULT_NV_EN, de: DEFAULT_NV_DE };
  return { en: VEGAN_EN, de: VEGAN_DE };
}

/** @param {string} code */
export function statusFor(code) {
  return STATUS_OVERRIDE[code] ?? "vegan";
}
