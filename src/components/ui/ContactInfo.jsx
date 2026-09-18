import { address } from "../../data";

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-7 w-7",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export const contactInfo = [
  {
    id: "email",
    label: address.email,
    sub: "answers within a working day",
    icon: (
      <svg {...iconProps}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: "hours",
    label: address.hours,
    sub: "Mon–Fri · 08:00AM–05:00PM",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    id: "address",
    label: `${address.street} · ${address.city}`,
    sub: "Showroom & warehouse",
    icon: (
      <svg {...iconProps}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const variants = {
  card: {
    row: "flex items-center gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line sm:gap-4 sm:p-5",
    icon: "shrink-0 text-ink",
    label: "break-words font-bold text-ink",
    sub: "text-[0.78rem] text-mute",
  },
  glass: {
    row: "flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm sm:gap-4",
    icon: "shrink-0 text-white",
    label: "break-words font-bold",
    sub: "text-[0.78rem] text-white/75",
  },
};

export function ContactInfo({ variant = "card", items = contactInfo, className = "" }) {
  const v = variants[variant] || variants.card;
  return (
    <div className={`grid w-full gap-3 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={v.row}>
          <span className={v.icon}>{item.icon}</span>
          <div className="min-w-0">
            <p className={v.label}>{item.label}</p>
            <p className={v.sub}>{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}