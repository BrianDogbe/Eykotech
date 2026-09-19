import { useEffect, useRef, useState } from "react";

const R = 20;
const CIRC = 2 * Math.PI * R;

export function BackToTop() {
  const ring = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = window.scrollY;
        setShow(y > 600);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(y / max, 1) : 0;
        if (ring.current) {
          ring.current.style.strokeDashoffset = String(CIRC * (1 - p));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-[70] grid place-items-center rounded-full bg-surface text-ink shadow-[0_16px_40px_-14px_rgba(10,20,40,0.45)] ring-1 ring-line transition-[opacity,translate,color] duration-300 hover:text-primary ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ width: 50, height: 50 }}
    >
      <svg className="absolute inset-0 -rotate-90" width="50" height="50" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r={R} fill="none" stroke="var(--line)" strokeWidth="2.5" />
        <circle
          ref={ring}
          cx="25"
          cy="25"
          r={R}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          style={{ strokeDashoffset: CIRC }}
        />
      </svg>
      <svg className="relative" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}