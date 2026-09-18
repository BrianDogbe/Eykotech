import { useEffect, useRef, useState } from "react";
import { useAuth } from "../useAuth";
import { useCart } from "../useCart";
import { useHashRoute } from "../useHashRoute";
import { Button } from "./ui/Button";

const NAV = [
  ["Home", "#top"],
  ["About Us", "#/about"],
  ["Products", "#/products"],
  ["Delivery Service", ""],
  ["Contact", "#/contact"],
];

const DELIVERY_OPTIONS = [
  ["About Delivery", "#/delivery"],
  ["Repair and Maintenance Services", "#/repairs"],
];

const MOBILE_NAV = [
  ["Home", "#top"],
  ["About Us", "#/about"],
  ["Products", "#/products"],
  ["Delivery", "#/delivery"],
  ["Repairs", "#/repairs"],
  ["Contact", "#/contact"],
];

const DESKTOP_BASE =
  "rounded-full px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-200";
const DESKTOP_ACTIVE = "bg-[#006cb1] text-white";
const DESKTOP_IDLE = "text-ink hover:bg-[#cfd8e4] hover:text-ink";

export function Header({ overlay = false }) {
  const { user, signOut } = useAuth();
  const { totalCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  const dropRef = useRef(null);
  const navRef = useRef(null);

  const route = useHashRoute();

  const initials = user
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
    : "";

  useEffect(() => {
    const onPointer = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
      if (navRef.current && !navRef.current.contains(e.target)) setNavOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [route]);

  const isActive = (h) => route === (h.startsWith("#/") ? h.slice(1) : "");
  const deliveryActive = isActive("#/delivery") || isActive("#/repairs");
  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <header
      className={`${
        overlay ? "fixed inset-x-0 top-0" : "sticky top-0"
      } z-50 border-b border-line bg-surface/95 shadow-[0_10px_34px_-24px_rgba(20,40,90,0.45)] backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-1.5 px-4 sm:gap-2 sm:px-5 lg:h-[78px]">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Eykotech home">
          <img src="/assets/img/logo.png" alt="Eykotech" className="h-6 w-auto transition-transform duration-300 hover:scale-105 min-[400px]:h-7 sm:h-9 lg:h-10" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-3" aria-label="Main navigation">
          {NAV.map(([label, href]) =>
            label === "Delivery Service" ? (
              <div key={label} className="relative" ref={dropRef}>
                <button
                  type="button"
                  onClick={() => setDropOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={dropOpen}
                  className={`${DESKTOP_BASE} flex items-center gap-1 ${deliveryActive ? DESKTOP_ACTIVE : DESKTOP_IDLE}`}
                >
                  {label}
                  <span aria-hidden="true" className={`text-[0.6rem] transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}>▾</span>
                </button>
                {dropOpen && (
                  <div className="absolute left-0 top-12 z-50 w-64 rounded-2xl bg-surface p-2 shadow-[0_22px_54px_-20px_rgba(10,20,40,0.5)] ring-1 ring-line" role="menu">
                    {DELIVERY_OPTIONS.map(([lbl, h]) => (
                      <a
                        key={h}
                        href={h}
                        onClick={() => { setDropOpen(false); goTop(); }}
                        className={`block rounded-lg px-3 py-2.5 text-[0.82rem] font-semibold transition-colors ${
                          isActive(h) ? "bg-[#006cb1] text-white" : "text-ink hover:bg-surface2 hover:text-primary"
                        }`}
                      >
                        {lbl}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={href}
                href={href}
                onClick={goTop}
                className={`${DESKTOP_BASE} ${isActive(href) ? DESKTOP_ACTIVE : DESKTOP_IDLE}`}
              >
                {label}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-4 md:gap-5">
          {/* Account */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className="flex h-10 items-center gap-2 rounded-full ring-1 ring-line px-2.5 text-[0.8rem] font-semibold text-ink transition-all duration-200 hover:bg-surface2"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[0.62rem] font-extrabold text-white">
                  {initials}
                </span>
                <span className="hidden md:inline max-w-24 truncate">{user.name.split(" ")[0]}</span>
                <span aria-hidden="true" className="hidden sm:inline text-[0.6rem] text-mute">▾</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-12 z-50 w-60 rounded-2xl bg-surface p-2 shadow-[0_22px_54px_-20px_rgba(10,20,40,0.5)] ring-1 ring-line" role="menu">
                  <div className="border-b border-line px-3 pb-3 pt-2">
                    <p className="truncate text-sm font-bold text-ink">{user.name}</p>
                    <p className="truncate font-mono text-[0.7rem] text-mute">{user.email}</p>
                    <p className="mt-1 font-mono text-[0.65rem] text-primary">{user.role}</p>
                  </div>
                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-500 transition-colors hover:bg-rose-500/10"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="#/login"
              aria-label="Sign in"
              className="flex h-10 items-center gap-1.5 rounded-full ring-1 ring-line px-2 text-[0.72rem] font-semibold text-ink transition-all duration-200 hover:bg-surface2 sm:gap-2 sm:px-4 sm:text-[0.8rem]"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
              <span>Sign in</span>
            </a>
          )}

          {/* Cart */}
          <Button
            variant="primary"
            onClick={openCart}
            aria-label={`Open cart with ${totalCount} items`}
            className="relative h-10 rounded-full px-2 text-[0.72rem] sm:px-4 sm:text-[0.8rem]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="19" cy="21" r="1.5" />
              <path d="M2.5 3h2l2.6 12.2a2 2 0 0 0 2 1.8h8.9a2 2 0 0 0 2-1.6L21.5 7H6" />
            </svg>
            <span>Cart</span>
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1.5 font-mono text-[0.7rem] font-bold text-primary ring-2 ring-surface">
                {totalCount}
              </span>
            )}
          </Button>

          {/* Mobile menu */}
          <div className="relative lg:hidden" ref={navRef}>
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
              aria-haspopup="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-line text-ink transition-all duration-200 hover:bg-surface2"
            >
              <span className="flex flex-col items-center gap-[4px]" aria-hidden="true">
                <span className={`block h-[2px] w-4 rounded bg-current transition-transform duration-200 ${navOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-4 rounded bg-current transition-opacity duration-200 ${navOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] w-4 rounded bg-current transition-transform duration-200 ${navOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>

            {navOpen && (
              <nav className="absolute right-0 top-12 z-50 w-56 rounded-2xl bg-surface p-2 shadow-[0_22px_54px_-20px_rgba(10,20,40,0.5)] ring-1 ring-line" aria-label="Main navigation">
                <p className="px-3 pb-2 pt-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-mute">
                  Menu
                </p>
                <div className="grid gap-1">
                  {MOBILE_NAV.map(([label, href]) => {
                    const active = isActive(href);
                    return (
                      <a
                        key={href}
                        href={href}
                        onClick={goTop}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-lg px-3 py-2.5 text-[0.82rem] font-semibold transition-colors duration-200 ${
                          active ? "bg-[#006cb1] text-white" : "text-ink hover:bg-surface2 hover:text-primary"
                        }`}
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
