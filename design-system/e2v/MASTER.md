# e2v design system

Supermarket tool. Dark OLED. Almost no words. One screen.

## Dials

- Variance 3 — centered, minimal
- Motion 7 — list FLIP / View Transitions 150–180ms
- Density 7 — 56px rows and keys

## Style

Exaggerated Minimalism on a kiosk palette. Huge E-code, one status mark, no vegan-cliché illustration.

## Tokens

```css
--bg: #07080C;
--surface: #12141C;
--key: #1C2030;
--key-pressed: #2A3148;
--fg: #F4F5F7;
--fg-muted: #9AA3B2;
--border: #2A3040;
--status-yes: #5EE1A8;
--status-no: #FF6B6B;
--status-unsure: #E8C36A;
```

Type: system UI for chrome. `ui-monospace` + tabular nums for E-codes. No webfont.

## Status marks

Shape first, color second.

- Vegan: circle + check
- Not vegan: circle + slash
- Unsure: diamond + bar

## Motion

150–220ms. `transform` and `opacity`. Digit tap collapses detail in 0ms. `prefers-reduced-motion` removes motion.

## Anti-patterns

No emoji icons. No `<input>`. No EN/DE in the main chrome. No full-list dump on empty. No official Vegan Society mark.
