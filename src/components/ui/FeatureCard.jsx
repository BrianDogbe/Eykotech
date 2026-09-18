export function FeatureCard({
  image,
  imageAlt,
  imageAspect = "4/3",
  eyebrow,
  title,
  badge,
  body,
  bullets = [],
  rounded = "rounded-2xl",
  padding = "p-6",
  titleClassName = "text-[1rem]",
  className = "",
  children,
}) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <div className={`flex h-full flex-col overflow-hidden bg-surface ring-1 ring-line ${rounded} ${className}`}>
      {image && (
        <img
          src={image}
          alt={imageAlt || title || ""}
          loading="lazy"
          className="w-full object-cover"
          style={{ aspectRatio: imageAspect }}
        />
      )}
      <div className={`flex flex-1 flex-col ${padding}`}>
        {eyebrow && (
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        )}
        {title && (
          <h3 className={`flex items-center gap-3 font-display font-bold leading-snug text-ink ${titleClassName} ${eyebrow ? "mt-3" : ""}`}>
            {badge && (
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primarytint font-mono text-[0.68rem] font-bold text-primary" aria-hidden="true">
                {badge}
              </span>
            )}
            {title}
          </h3>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="mt-3 text-[0.9rem] leading-relaxed text-mute">
            {p}
          </p>
        ))}
        {bullets.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-mute">
                <span className="mt-0.5 text-primary" aria-hidden="true">•</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}