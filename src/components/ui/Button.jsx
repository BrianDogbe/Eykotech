const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const styles = {
  primary:
    "bg-[#006cb1] text-white shadow-[0_14px_30px_-14px_#006cb1cc] hover:bg-[#005396]",
  secondary:
    "bg-[#eef2f7] text-[#10203a] ring-1 ring-[#e3e9f1] hover:bg-[#006cb11a] hover:text-[#006cb1]",
  quiet:
    "bg-[#eef2f7] text-[#5d6b84] ring-1 ring-[#e3e9f1] hover:text-[#10203a]",
  white: "bg-white text-[#10203a] hover:bg-[#ffffffe6]",
  ghost: "border border-[#ffffff66] text-white hover:bg-[#ffffff1a]",
};

export function Button({ as, variant = "primary", className = "", children, ...rest }) {
  const Tag = as || (rest.href ? "a" : "button");
  return (
    <Tag className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}