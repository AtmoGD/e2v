import { BackspaceIcon, ClearIcon } from "./icons";

type Props = {
  query: string;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  onClear: () => void;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

export function Numpad({ query, onDigit, onBackspace, onClear }: Props) {
  const full = query.length >= 4;
  const empty = query.length === 0;

  return (
    <div class="pad" role="group" aria-label="E-number keypad">
      {KEYS.map((digit) => (
        <button
          type="button"
          class="key"
          disabled={full}
          aria-label={digit}
          onClick={() => onDigit(digit)}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        class="key key-action"
        disabled={empty}
        aria-label="Clear all"
        aria-disabled={empty}
        onClick={onClear}
      >
        <ClearIcon />
      </button>
      <button
        type="button"
        class="key"
        disabled={full}
        aria-label="0"
        onClick={() => onDigit("0")}
      >
        0
      </button>
      <button
        type="button"
        class="key key-action"
        disabled={empty}
        aria-label="Delete last digit"
        aria-disabled={empty}
        onClick={onBackspace}
      >
        <BackspaceIcon />
      </button>
    </div>
  );
}
