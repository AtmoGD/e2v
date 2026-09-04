<p align="center">
  <img src="public/logo.png" width="72" height="72" alt="e2v logo">
</p>

<h1 align="center">e2v</h1>

<p align="center">
  <strong>E-number vegan checker</strong> · E-Nummer Vegan-Checker<br>
  One-screen PWA for the supermarket. Type digits. See if it is vegan.
</p>

<p align="center">
  <a href="#use-it">Use it</a> ·
  <a href="#install-on-your-phone">Install</a> ·
  <a href="#status-meanings">Statuses</a> ·
  <a href="#deutsch">Deutsch</a>
</p>

**e2v** tells you whether an [E-number](https://en.wikipedia.org/wiki/E_number) (EU food additive code such as E120, E322, E471) is vegan, not vegan, or unclear — **offline**, on the home screen, with no system keyboard.

Search terms this project covers: **E-number vegan**, **E-Nummer vegan**, **food additive vegan check**, **Zusatzstoffe vegan**, **cochineal E120**, **lecithin E322**, **mono- and diglycerides E471**, **Ponceau 4R / Cochenillerot A E124**.

Live app (after GitHub Pages is enabled): **https://atmogd.github.io/e2v/**

---

## Why it exists

Ingredient lists in the EU print codes like `E120` and `E471`. The name is often missing. Looking that up on a phone in the aisle is slow, and most blogs are wrong on the famous traps:

| Code | People think | Reality in e2v |
| --- | --- | --- |
| **E120** | red colour | **Not vegan.** Cochineal / carmine from insects. |
| **E124** | “Cochenillerot” = insect | **Vegan.** Synthetic azo dye (Ponceau 4R). Not E120. |
| **E270** | “lactic” = milk | **Vegan.** Industrial lactic acid is fermented sugar. |
| **E322** | always soy | **Unclear.** Soy/sunflower *or* egg. **E322a** (oat) is vegan. |
| **E471** | plant fat | **Unclear.** Fat can be plant or animal. The code does not say. |

e2v is built for that moment: one screen, a number pad, a live-filtered list.

---

## Use it

1. Open the PWA (browser or home-screen icon).
2. Type only the **digits**. Never type `E`. Max 4 digits.
3. The list filters after every tap (`1` → everything starting with 1; `12` → E120, E124, E1200…).
4. Tap a row for the official-style name and one reason sentence.
5. **C** clears all. **⌫** deletes one digit.

Empty pad = empty list. No 300-row dump.

Works **offline** after the first visit (service worker + hashed data).

---

## Install on your phone

One `manifest.webmanifest`. No App Store.

### iPhone / iPad (Safari only)

1. Open the site in **Safari** (not Chrome on iOS).
2. Share → **Add to Home Screen**.
3. Open the icon. It runs fullscreen, including offline.

Home-screen web apps work again in the EU after Apple restored them (DMA).

### Android (Chrome, Edge, Firefox, Samsung Internet)

1. Open the site in Chrome.
2. Banner **Install**, or menu → **Install app** / **Add to Home screen**.
3. Chrome can offer a one-tap install via `beforeinstallprompt`.

---

## Status meanings

Three states. Colour is not enough (WCAG).

| Icon | Status | Meaning |
| --- | --- | --- |
| Circle + check | `vegan` | Plant, mineral, microbial, or synthetic in normal EU food use. Two independent sources, no conflict. |
| Circle + slash | `not_vegan` | Always animal in the authorised spec (or a well-known ghost code like gelatine). |
| Diamond + bar | `maybe` | Plant *or* animal, or sources disagree. Prefer unsure over a false green. |

**Always not vegan (high confidence):** E120, E901 beeswax, E904 shellac, E966 lactitol, E1105 lysozyme (hen egg in the EU spec), plus ghost lookups E428/E441 gelatine, E542 bone phosphate, E913 lanolin, E1000 cholic acid.

**Often maybe:** E101, E160a, E322 (not E322a), E304, E422, E431–436, E442, E445, E470a/b, E471–477, E479b, E481–483, E491–495, E570, E626–635, E640, E920, E1517/E1518, E476 (sources conflict).

This is **shopping guidance**, not a guarantee and not allergy advice. Origin can change by manufacturer and batch.

---

## Database

About **344** codes: EU Annex II Part B inventory (Regulation (EC) No 1333/2008, plus E960b from 2025/652 and E246 glycolipids) and a few ghost codes people still type.

- Built by `scripts/inventory.txt` + `scripts/overlay.mjs` → `src/data/additives.json`
- Rebuild: `npm run build:data`
- Policy tests: `npm test` (E120 never vegan, E124 never not-vegan, gelatine never vegan)

Names and vegan calls are **not** copied from blog posts. Official names come from EUR-Lex reuse rules. Open Food Facts is used only as a name/alias cross-check (ODbL); OFF `vegan:` tags are **not** treated as truth. Full list: [`docs/sources.md`](docs/sources.md).

---

## Run locally

```bash
npm install
npm test
npm run dev
```

Open **http://127.0.0.1:5173/e2v/** (Vite `base` is `/e2v/` for GitHub Pages).

```bash
npm run build
npm run preview
```

Production preview: **http://127.0.0.1:4173/e2v/**

---

## Deploy (GitHub Pages)

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs tests, builds, and deploys.

1. Repo **Settings → Pages → Source: GitHub Actions**
2. After the first green workflow: `https://<user>.github.io/e2v/`

If you use a custom domain or a user/org site, change `base` in `vite.config.ts` from `/e2v/` to `/`.

---

## Stack

Vite + TypeScript + Preact. One screen, no router, no backend, no analytics. Target: HTML+CSS+JS under 50 KB gzip (data is bundled and hashed). PWA via `vite-plugin-pwa` (`generateSW`, `autoUpdate`).

---

## What it is not

- Not a barcode / OCR scanner
- Not a multi-code shopping list
- Not an official Vegan Society mark
- Not in the App Store
- Not medical or allergy advice

---

## Deutsch

**e2v** ist ein Ein-Screen-Checker für **E-Nummern** (EU-Zusatzstoffe). Du tippst nur Ziffern, siehst sofort ob der Stoff vegan, nicht vegan oder unsicher ist, und kannst die App auf den Home-Bildschirm legen — auch offline im Supermarkt.

### Typische Fallen

- **E120** Echtes Karmin — Insekt, nicht vegan
- **E124** Cochenillerot A — synthetischer Azofarbstoff, vegan (nicht das Insekt)
- **E270** Milchsäure — Gärung, nicht Milch
- **E322** Lecithin — Ei möglich; **E322a** Haferlecithin ist vegan
- **E471** Mono- und Diglyceride — Fettquelle unbekannt

### Installieren

- **iPhone:** Safari → Teilen → Zum Home-Bildschirm
- **Android:** Chrome → Installieren / Zum Startbildschirm

Drei Status: Haken = vegan, Schrägstrich = nicht vegan, Raute = unsicher. Lieber unsicher als falsch grün.

---

## License

[MIT](LICENSE) © Dennis Hawran

Data sources and reuse notes: [`docs/sources.md`](docs/sources.md).
