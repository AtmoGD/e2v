export type Status = "vegan" | "not_vegan" | "maybe";

export type Additive = {
  code: string;
  digitKey: string;
  suffix?: string;
  status: Status;
  names: { en: string; de: string };
  reason: { en: string; de: string };
  authorised_eu: boolean;
  food_authorised_eu: boolean;
  sources: string[];
};
