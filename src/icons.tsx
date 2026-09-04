import type { Status } from "./data/schema";

type IconProps = { class?: string };

export function CheckCircle({ class: className }: IconProps) {
  return (
    <svg class={className} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="10" />
      <path d="M9 14.2l3.2 3.2L19 10.8" fill="none" />
    </svg>
  );
}

export function SlashCircle({ class: className }: IconProps) {
  return (
    <svg class={className} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="10" />
      <path d="M8.2 19.8L19.8 8.2" fill="none" />
    </svg>
  );
}

export function DiamondBar({ class: className }: IconProps) {
  return (
    <svg class={className} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 4.5L23.5 14 14 23.5 4.5 14Z" />
      <path d="M9 14h10" fill="none" />
    </svg>
  );
}

export function LogoE({ accent }: { accent: Status | null }) {
  const bar =
    accent === "vegan"
      ? "query-bar yes"
      : accent === "not_vegan"
        ? "query-bar no"
        : accent === "maybe"
          ? "query-bar maybe"
          : "query-bar";

  return (
    <svg class="query-logo" viewBox="0 0 50 61" aria-hidden="true">
      <rect x="0" y="0" width="13" height="61" />
      <rect x="0" y="0" width="50" height="13" />
      <rect class={bar} x="13" y="24.5" width="32" height="12" />
      <rect x="0" y="48" width="50" height="13" />
    </svg>
  );
}

export function StatusMark({ status }: { status: Status }) {
  if (status === "vegan") return <CheckCircle class="mark mark-yes" />;
  if (status === "not_vegan") return <SlashCircle class="mark mark-no" />;
  return <DiamondBar class="mark mark-maybe" />;
}

export function spokenStatus(status: Status, lang: "en" | "de"): string {
  if (lang === "de") {
    if (status === "vegan") return "vegan";
    if (status === "not_vegan") return "nicht vegan";
    return "Herkunft unklar";
  }
  if (status === "vegan") return "vegan";
  if (status === "not_vegan") return "not vegan";
  return "source unclear";
}

export function BackspaceIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M11 7h12.5a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 23.5 21H11l-6.2-6.2a1.2 1.2 0 0 1 0-1.6L11 7Z" />
      <path d="M15 11.2l5.6 5.6M20.6 11.2L15 16.8" />
    </svg>
  );
}

export function ClearIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <rect x="6.5" y="6.5" width="15" height="15" rx="2.5" />
      <path d="M10.4 10.4l7.2 7.2M17.6 10.4l-7.2 7.2" />
    </svg>
  );
}

export function ShareIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 5v12" />
      <path d="M9.5 9.5L14 5l4.5 4.5" />
      <path d="M7 15.5v5a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 21 20.5v-5" />
    </svg>
  );
}
