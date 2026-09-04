import type { Additive, Status } from "./data/schema";

export type { Additive, Status };

function digitsOnly(query: string): string {
  return query.replace(/\D/g, "").slice(0, 4);
}

function suffixKey(suffix: string | undefined): string {
  return suffix ?? "";
}

export function matchAdditives(additives: Additive[], query: string): Additive[] {
  if (!query) return [];
  const q = digitsOnly(query);
  if (!q) return [];

  return additives
    .filter((row) => row.digitKey.startsWith(q))
    .sort((a, b) => {
      if (a.digitKey.length !== b.digitKey.length) {
        return a.digitKey.length - b.digitKey.length;
      }
      const na = Number(a.digitKey);
      const nb = Number(b.digitKey);
      if (na !== nb) return na - nb;
      return suffixKey(a.suffix).localeCompare(suffixKey(b.suffix));
    });
}
