export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary mb-3 ${className}`}
    >
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