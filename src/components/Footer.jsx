import { footerCompany, address } from "../data";
import { go } from "../useHashRoute";

const SOCIALS = [
  {
    label: "RSS",
    href: "https://www.eykotech.com/assets/img/rss.png",
    img: "https://www.eykotech.com/assets/img/rss.png",
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

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1.2fr] md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/assets/img/logo.png" alt="Eykotech" className="h-10 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              Office supplies, printing and IT services in Braunschweig since day one.
              We stock it, install it, deliver it — and repair it when life happens.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-surface2 text-mute ring-1 ring-line"
                >
                  {s.img ? (
                    <img src={s.img} alt={s.label} className="h-6 w-6" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-ink">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerCompany.map(([t, id]) => (
                <li key={id}>
                  <a
                    href={id === "contact" || id === "faq" ? `#${id}` : `#/${id}`}
                    onClick={(e) => {
                      if (id !== "contact" && id !== "faq") {
                        e.preventDefault();
                        go(`/${id}`);
                      }
                    }}
                    className="text-mute transition-colors hover:text-primary"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-ink">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-mute">
              <li>
                <span className="font-semibold text-ink">Address</span> — {address.street}, {address.city}
              </li>
              <li>
                <a href={`mailto:${address.email}`} className="transition-colors hover:text-primary">
                  <span className="font-semibold text-ink">Email</span> — {address.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-ink">Hours</span> — {address.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-xs text-mute">
          <p>© {new Date().getFullYear()} Eykotech. All rights reserved.</p>
          <p>Made in Braunschweig.</p>
        </div>
      </div>
    </footer>
  );
}