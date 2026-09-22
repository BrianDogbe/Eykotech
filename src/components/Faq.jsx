import { useState } from "react";
import { faqs } from "../data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-line bg-surface2 py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.3fr] lg:gap-16">
        <Reveal>
          <SectionHead
            eyebrow="Support"
            title="Frequently Asked Questions"
            sub="If yours isn't here, email info@eykotech.com. A real person answers within a working day."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left"
                  >
                    <span className="font-semibold text-ink">{f.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "-rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-8 text-sm leading-relaxed text-mute">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}