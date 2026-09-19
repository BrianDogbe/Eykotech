import { useState } from "react";
import { address } from "../data";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { ContactInfo } from "../components/ui/ContactInfo";

const TOPICS = [
  ["quote", "Quote or product enquiry"],
  ["repair", "Repair or maintenance"],
  ["delivery", "Delivery or an existing order"],
  ["contract", "Service contract"],
  ["other", "Something else"],
];

/* Response times quoted elsewhere on the site, restated where people ask. */
const RESPONSE = [
  ["Email", "Answered within a working day"],
  ["On-site survey", "Within 24h in the Braunschweig area"],
  ["Managed clients", "Emergency dispatch under 4h"],
];

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street}, ${address.city}`
)}`;

export function Contact() {
  const [form, setForm] = useState({
    topic: TOPICS[0][0],
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const topicLabel = TOPICS.find(([id]) => id === form.topic)?.[1] ?? "Website enquiry";
    const subject = encodeURIComponent(`${topicLabel} from the website`);
    const body = encodeURIComponent(
      [
        `Topic: ${topicLabel}`,
        `Name: ${form.name}`,
        form.company ? `Company: ${form.company}` : null,
        `Email: ${form.email}`,
        "",
        form.message,
      ]
        .filter((line) => line !== null)
        .join("\n")
    );
    window.location.href = `mailto:${address.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      <PageHeader eyebrow="Contact" title="Talk to the people who stock it">
        <p>
          Drop by the showroom on Hamburger Strasse, send an email, or ring us during opening hours. One
          local team handles the quote, the delivery and the repair.
        </p>
      </PageHeader>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">Send us a message</h2>
              <p className="mt-2 text-[0.92rem] text-mute">
                Tell us what you need and we will come back with stock, price and a realistic date.
              </p>

              <fieldset className="mt-7">
                <legend className="mb-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-mute">
                  What is this about?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(([id, label]) => (
                    <label
                      key={id}
                      className={`cursor-pointer rounded-xl border px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-150 ${
                        form.topic === id
                          ? "border-primary bg-primary text-white"
                          : "border-line text-mute hover:border-primary/40 hover:text-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={id}
                        checked={form.topic === id}
                        onChange={set("topic")}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[0.78rem] font-semibold text-ink">Your name</span>
                  <input required value={form.name} onChange={set("name")} placeholder="Anna Schmidt" className="field" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.78rem] font-semibold text-ink">
                    Company <span className="font-normal text-mute">(optional)</span>
                  </span>
                  <input value={form.company} onChange={set("company")} placeholder="Kanzlei Weber" className="field" />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-[0.78rem] font-semibold text-ink">Email</span>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="you@company.de" className="field" />
              </label>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-[0.78rem] font-semibold text-ink">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What do you need, how many, and by when?"
                  className="field resize-none"
                />
              </label>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button variant="primary" type="submit" className="px-7 py-3.5 text-[0.92rem]">
                  Send message
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Button>
                <p className="text-[0.8rem] leading-snug text-mute">
                  This opens your email app with the details filled in.
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5">
            <ContactInfo />

            <div className="mt-6 rounded-xl border border-line bg-surface2 p-6">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-mute">
                When to expect a reply
              </h2>
              <dl className="mt-4 divide-y divide-line">
                {RESPONSE.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                    <dt className="text-[0.85rem] font-semibold text-ink">{label}</dt>
                    <dd className="text-right text-[0.85rem] text-mute">{value}</dd>
                  </div>
                ))}
              </dl>

              <Button
                variant="white"
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full py-3 text-[0.85rem] ring-1 ring-line"
              >
                Get directions to the showroom
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
