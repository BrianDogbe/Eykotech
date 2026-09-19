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

/* Layered depth for the mega-menu: inset highlight + hairline ring + ambient
   drop shadow. All three together are what make the surface read as physical. */
const MEGA_PANEL =
  "mega overflow-hidden rounded-xl bg-surface p-2 ring-1 ring-line " +
  "shadow-[0_8px_30px_rgba(10,20,40,0.10),0_2px_8px_rgba(10,20,40,0.06)] " +
  "inset-shadow-[0_1px_0_0_rgba(255,255,255,1),0_-1px_0_0_rgba(10,20,40,0.03)]";

const MEGA_CHIP =
  "flex items-center justify-center rounded-md bg-surface2 shadow-sm ring-1 " +
  "inset-shadow-sm shadow-black/5 ring-line inset-shadow-white";

const icons = {
  truck: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM7.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  route: "M5 19h9a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7M4.5 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  wrench: "M14.5 5.5a4 4 0 0 0 5 5L21 9v2.5a6 6 0 0 1-8.2 5.6L7 22.5 3.5 19l5.4-5.8A6 6 0 0 1 14.5 3H17z",
  phone: "M4 5c0-1 .8-2 1.8-2h2L9.5 7 7.8 8.6a12 12 0 0 0 5.6 5.6L15 12.5l4 1.7v2.2c0 1-1 1.8-2 1.8C9.8 18.2 4 12.4 4 5z",
};

const DELIVERY_MENU = [
  {
    heading: "Delivery",
    items: [
      {
        label: "About delivery",
        description: "Our own fleet, 24 to 48h across the region",
        href: "#/delivery",
        icon: "truck",
      },
      {
        label: "How it works",
        description: "From your order to a working desk",
        href: "#how-it-works",
        icon: "route",
      },
    ],
  },
  {
    heading: "Service",
    items: [
      {
        label: "Repairs and maintenance",
        description: "Original parts, every fix guaranteed",
        href: "#/repairs",
        icon: "wrench",
      },
      {
        label: "Talk to a technician",
        description: "Free quote, no obligation",
        href: "#/contact",
        icon: "phone",
      },
    ],
  },
];

const DELIVERY_FEATURED = {
  eyebrow: "On the road",
  title: "One local team delivers and installs",
  image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
  href: "#/delivery",
};

const MOBILE_NAV = [
  ["Home", "#top"],
  ["About Us", "#/about"],
  ["Products", "#/products"],
  ["Delivery", "#/delivery"],
  ["Repairs", "#/repairs"],
  ["Contact", "#/contact"],
];

const DESKTOP_BASE =
  "rounded-xl px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-200";
const DESKTOP_ACTIVE = "bg-primary text-white";
const DESKTOP_IDLE = "text-ink hover:bg-surface2";
const DESKTOP_ACTIVE_CLEAR = "bg-white text-ink";
const DESKTOP_IDLE_CLEAR = "text-white hover:bg-white/15";

const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function Header({ overlay = false }) {
  const { user, signOut } = useAuth();
  const { totalCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropTimer = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  const dropRef = useRef(null);
  const navRef = useRef(null);

  const route = useHashRoute();
  const [lifted, setLifted] = useState(!overlay);

  useEffect(() => {
    if (!overlay) {
      setLifted(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const hero = document.getElementById("top");
        const trigger = (hero?.offsetHeight ?? window.innerHeight) * 0.5;
        setLifted(window.scrollY > trigger);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [overlay]);

  const clear = overlay && !lifted;

  const initials = user
    ? user.name
        .split(" ")
        .filter(Boolean)
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
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setDropOpen(false);
      setNavOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [route]);

  /* Grace period so the pointer can cross the gap onto the panel without it
     snapping shut on a diagonal path. */
  const cancelDropClose = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    dropTimer.current = null;
  };
  const openDrop = () => {
    cancelDropClose();
    setDropOpen(true);
  };
  const scheduleDropClose = () => {
    cancelDropClose();
    dropTimer.current = setTimeout(() => setDropOpen(false), 120);
  };
  useEffect(() => cancelDropClose, []);

  const isActive = (h) => route === (h.startsWith("#/") ? h.slice(1) : "");
  const deliveryActive = isActive("#/delivery") || isActive("#/repairs");
  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <header
      className={`${
        overlay ? "fixed inset-x-0 top-0" : "sticky top-0"
      } z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        clear
          ? "border-transparent bg-transparent"
          : "border-line bg-surface"
      } ${clear ? "on-dark" : ""}`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-1.5 px-4 sm:gap-2 sm:px-5 lg:h-[78px]">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Eykotech home">
          <img src="/assets/img/logo.png" alt="Eykotech" className={`h-6 w-auto transition-[filter] duration-300 min-[400px]:h-7 sm:h-9 lg:h-10 ${
              clear ? "brightness-0 invert" : ""
            }`} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-3" aria-label="Main navigation">
          {NAV.map(([label, href]) =>
            label === "Delivery Service" ? (
              <div
                key={label}
                className="relative"
                ref={dropRef}
                onMouseEnter={openDrop}
                onMouseLeave={scheduleDropClose}
              >
                <button
                  type="button"
                  onClick={() => setDropOpen((v) => !v)}
                  onFocus={openDrop}
                  aria-haspopup="true"
                  aria-expanded={dropOpen}
                  className={`${DESKTOP_BASE} flex items-center gap-1.5 ${deliveryActive ? (clear ? DESKTOP_ACTIVE_CLEAR : DESKTOP_ACTIVE) : clear ? DESKTOP_IDLE_CLEAR : DESKTOP_IDLE}`}
                >
                  {label}
                  <Chevron open={dropOpen} />
                </button>

                {dropOpen && (
                  /* pt-3 is a transparent hover bridge: without it the pointer
                     leaves the trigger before reaching the panel and it flickers. */
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <div
                      role="menu"
                      className={`${MEGA_PANEL} w-[min(42rem,calc(100vw-2.5rem))]`}
                    >
                      <div className="grid grid-cols-[1fr_1fr] gap-0 min-[1120px]:grid-cols-[1fr_1fr_12rem]">
                        {DELIVERY_MENU.map((group, gi) => (
                          <div key={group.heading} className={gi === 0 ? "p-1" : "border-l border-line p-1"}>
                            <p className="px-2 pb-1.5 pt-2 text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-mute">
                              {group.heading}
                            </p>
                            <ul className="grid gap-0.5">
                              {group.items.map((item) => (
                                <li key={item.label}>
                                  <a
                                    href={item.href}
                                    onClick={() => {
                                      setDropOpen(false);
                                      goTop();
                                    }}
                                    aria-current={isActive(item.href) ? "page" : undefined}
                                    className="group/mi flex items-start gap-3 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-surface2"
                                  >
                                    <span
                                      className={`${MEGA_CHIP} mt-0.5 size-8 shrink-0 transition-colors duration-150 group-hover/mi:bg-primarytint`}
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        className="size-4 text-mute transition-colors duration-150 group-hover/mi:text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                      >
                                        <path d={icons[item.icon]} />
                                      </svg>
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-[0.85rem] font-semibold text-ink transition-colors duration-150 group-hover/mi:text-primary">
                                        {item.label}
                                      </span>
                                      <span className="mt-0.5 block text-[0.76rem] leading-snug text-mute">
                                        {item.description}
                                      </span>
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        <a
                          href={DELIVERY_FEATURED.href}
                          onClick={() => {
                            setDropOpen(false);
                            goTop();
                          }}
                          className="group/ft hidden border-l border-line p-2 min-[1120px]:block"
                        >
                          <p className="px-1 pb-2 pt-1 text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-mute">
                            {DELIVERY_FEATURED.eyebrow}
                          </p>
                          <span className="block overflow-hidden rounded-lg">
                            <img
                              src={DELIVERY_FEATURED.image}
                              alt=""
                              loading="lazy"
                              className="aspect-[16/10] w-full object-cover outline-1 -outline-offset-1 outline-black/5 transition-transform duration-500 ease-out group-hover/ft:scale-[1.04]"
                            />
                          </span>
                          <span className="mt-2.5 block text-[0.82rem] font-semibold leading-snug text-ink transition-colors duration-150 group-hover/ft:text-primary">
                            {DELIVERY_FEATURED.title}
                          </span>
                          <span className="mt-2 flex items-center gap-1 text-[0.75rem] font-semibold text-mute transition-colors duration-150 group-hover/ft:text-primary">
                            See the fleet
                            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={href}
                href={href}
                onClick={goTop}
                className={`${DESKTOP_BASE} ${isActive(href) ? (clear ? DESKTOP_ACTIVE_CLEAR : DESKTOP_ACTIVE) : clear ? DESKTOP_IDLE_CLEAR : DESKTOP_IDLE}`}
              >
                {label}
              </a>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-5">
          {/* Account */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className={`flex h-10 items-center gap-2 rounded-xl px-2.5 text-[0.8rem] font-semibold ring-1 transition-colors duration-200 ${
                  clear ? "text-white ring-white/50 hover:bg-white/15" : "text-ink ring-line hover:bg-surface2"
                }`}
              >
                <span className={`grid h-7 w-7 place-items-center rounded-full text-[0.62rem] font-extrabold ${
                    clear ? "bg-white text-primary" : "bg-primary text-white"
                  }`}>
                  {initials}
                </span>
                <span className="hidden md:inline max-w-24 truncate">{user.name.split(" ")[0]}</span>
                <span className={`hidden sm:inline ${clear ? "text-white/70" : "text-mute"}`}><Chevron open={menuOpen} /></span>
              </button>
              {menuOpen && (
                <div className="pop absolute right-0 top-12 z-50 w-60 rounded-xl bg-surface p-2 shadow-[0_18px_40px_-22px_rgba(10,20,40,0.4)] ring-1 ring-line" role="menu">
                  <div className="border-b border-line px-3 pb-3 pt-2">
                    <p className="truncate text-sm font-bold text-ink">{user.name}</p>
                    <p className="truncate text-[0.7rem] text-mute">{user.email}</p>
                    <p className="mt-1 text-[0.65rem] text-primary">{user.role}</p>
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
              className={`flex h-10 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[0.72rem] font-semibold ring-1 transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-[0.8rem] ${
                clear ? "text-white ring-white/50 hover:bg-white/15" : "text-ink ring-line hover:bg-surface2"
              }`}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
              <span className="hidden sm:inline">Sign in</span>
            </a>
          )}

          {/* Cart */}
          <Button
            variant="primary"
            onClick={openCart}
            aria-label={`Open cart with ${totalCount} items`}
            className="relative h-10 px-2.5 text-[0.72rem] sm:px-4 sm:text-[0.8rem]"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="19" cy="21" r="1.5" />
              <path d="M2.5 3h2l2.6 12.2a2 2 0 0 0 2 1.8h8.9a2 2 0 0 0 2-1.6L21.5 7H6" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1.5 text-[0.7rem] font-bold tabular-nums text-primary ring-2 ring-surface">
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
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-200 ${
                clear ? "text-white ring-white/50 hover:bg-white/15" : "text-ink ring-line hover:bg-surface2"
              }`}
            >
              <span className="flex flex-col items-center gap-[4px]" aria-hidden="true">
                <span className={`block h-[2px] w-4 rounded bg-current transition-transform duration-200 ${navOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-4 rounded bg-current transition-opacity duration-200 ${navOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] w-4 rounded bg-current transition-transform duration-200 ${navOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>

            {navOpen && (
              <nav className="pop absolute right-0 top-12 z-50 w-56 rounded-xl bg-surface p-2 shadow-[0_18px_40px_-22px_rgba(10,20,40,0.4)] ring-1 ring-line" aria-label="Main navigation">
                <p className="px-3 pb-2 pt-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-mute">
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
                          active ? "bg-primary text-white" : "text-ink hover:bg-surface2 hover:text-primary"
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
