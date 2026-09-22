import { footerCompany, footerShop, address } from "../data";
import { useCatalog } from "../useCatalog";
import { go } from "../useHashRoute";
import { LineShadowText } from "./ui/line-shadow-text";

const SOCIALS = [
  {
    label: "RSS",
    href: "https://www.eykotech.com/assets/img/rss.png",
    d: "M4 11a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6v-3Zm0-7c8.837 0 16 7.163 16 16h-3C17 12.82 11.18 7 4 7V4Zm1.5 12.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const linkCls = "text-white/70 transition-colors duration-150 hover:text-white";

export function Footer() {
  const { setActiveCategory } = useCatalog();

  return (
    <footer className="on-dark overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-x-10 gap-y-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <p className="max-w-xs text-[0.98rem] leading-relaxed text-white/75">
              Office supplies, printing and IT services in Braunschweig. We stock it, install it, deliver it, and
              repair it when life happens.
            </p>
            <ul className="mt-7 flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 text-white/70 transition-colors duration-150 hover:border-white/60 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Shop by category">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/50">Shop</h3>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {footerShop.map(([t, cat]) => (
                <li key={cat}>
                  <a
                    href="#/products"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(cat);
                      go("/products");
                    }}
                    className={linkCls}
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/50">Company</h3>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {footerCompany.map(([t, id]) => {
                const anchor = id === "contact" || id === "faq";
                return (
                  <li key={id}>
                    <a
                      href={anchor ? `#${id}` : `#/${id}`}
                      onClick={(e) => {
                        if (anchor) return;
                        e.preventDefault();
                        go(`/${id}`);
                      }}
                      className={linkCls}
                    >
                      {t}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/50">Get in touch</h3>
            <ul className="mt-5 space-y-2.5 text-[0.95rem] text-white/70">
              <li>
                {address.street}
                <br />
                {address.city}
              </li>
              <li>
                <a href={`mailto:${address.email}`} className="font-semibold text-white transition-colors duration-150 hover:text-white/80">
                  {address.email}
                </a>
              </li>
              <li>Monday to Friday, 08:00 to 17:00</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center border-t border-white/15 px-5 pt-8">
        <LineShadowText
          shadowColor="var(--primary)"
          className="text-primary italic select-none whitespace-nowrap font-display text-[clamp(2.8rem,14.4vw,12.9rem)] font-extrabold leading-[0.8] tracking-tight"
        >
          EYKOTECH
        </LineShadowText>
      </div>

      <div className="">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Eykotech. All rights reserved.</p>
          <p>Made in Braunschweig</p>
        </div>
      </div>
    </footer>
  );
}
