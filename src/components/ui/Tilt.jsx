import { useRef, useState } from "react";

export function Tilt({ children, max = 7, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(950px) rotateX(${(-py * max).toFixed(
        2
      )}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`,
      transition: "transform 120ms ease-out",
    });
  };

  const onLeave = () => {
    setStyle({
      transform: "perspective(950px) rotateX(0) rotateY(0)",
      transition: "transform 500ms cubic-bezier(.22,.61,.36,1)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}