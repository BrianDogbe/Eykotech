export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary mb-3 ${className}`}
    >
      <span aria-hidden="true">— </span>
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false, className = "" }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold leading-[1.06] tracking-tight text-ink">
        {title}
      </h2>
      {sub && <p className="mt-3 text-mute">{sub}</p>}
    </div>
  );
}