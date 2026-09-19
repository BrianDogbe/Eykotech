import { useInView } from "../../hooks";

export function Reveal({ children, delay = 0, className = "" }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate] duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] anim ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}