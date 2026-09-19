import { useState } from "react";

export function QuantityStepper({
  productId,
  quantity,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  size = "md",
  className = "",
}) {
  const [draft, setDraft] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setDraft(v);
    const n = parseInt(v, 10);
    if (!Number.isNaN(n) && n > 0) onSetQuantity(productId, n);
  };

  const handleBlur = () => {
    const n = parseInt(draft, 10);
    if (!Number.isNaN(n) && n <= 0) {
      onRemoveItem(productId);
    } else if (!Number.isNaN(n)) {
      onSetQuantity(productId, n);
    }
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
  };

  const sizes = {
    sm: {
      container: "h-8 gap-0.5 rounded-lg p-0.5",
      button: "h-full w-6 place-items-center rounded-md text-xs font-bold",
      input: "h-full w-8 rounded-md text-center text-xs font-semibold tabular-nums",
    },
    md: {
      container: "h-9 gap-1 rounded-lg p-0.5",
      button: "h-full w-7 place-items-center rounded-md text-xs font-bold",
      input: "h-full w-9 rounded-md text-center text-xs font-semibold tabular-nums",
    },
    lg: {
      container: "h-[50px] gap-1.5 rounded-xl p-1",
      button: "h-full w-10 place-items-center rounded-lg text-base font-bold",
      input: "h-full w-12 rounded-lg text-center font-display text-[0.92rem] font-bold tabular-nums",
    },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center justify-center ${s.container} bg-primary ${className}`}>
      <button
        type="button"
        onClick={() => onUpdateQuantity(productId, -1)}
        className={`grid ${s.button} text-white transition-colors hover:bg-primarydeep`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        min="0"
        aria-label="Quantity"
        value={draft || quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${s.input} bg-black/15 text-white outline-none`}
      />
      <button
        type="button"
        onClick={() => onUpdateQuantity(productId, 1)}
        className={`grid ${s.button} text-white transition-colors hover:bg-primarydeep`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}