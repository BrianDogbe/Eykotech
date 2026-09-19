const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-[background-color,color,scale] duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const styles = {
  primary:
    "bg-primary text-white hover:bg-primarydeep",
  secondary:
    "bg-surface2 text-ink ring-1 ring-line hover:bg-primary/10 hover:text-primary",
  quiet:
    "bg-surface2 text-mute ring-1 ring-line hover:text-ink",
  white: "bg-white text-ink hover:bg-white/90",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

export function Button({ as, variant = "primary", className = "", children, ...rest }) {
  const Tag = as || (rest.href ? "a" : "button");
  return (
    <Tag className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}