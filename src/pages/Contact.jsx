import { useState } from "react";
import { address } from "../data";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { ContactInfo } from "../components/ui/ContactInfo";

const inputCls =
  "w-full min-w-0 rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute focus:border-primary/25";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Message from the website");
    const body = encodeURIComponent(
      `Name / Organization: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${address.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="border-y border-line bg-bg">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal delay={60}>
          <h1 className="mx-auto max-w-3xl text-center font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight text-ink">
            Say hello — we usually answer the same day.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-relaxed text-mute">
            Drop by the showroom, send an email, or ring us during opening hours. We stock it, install it,
            deliver it — and repair it when life happens.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal delay={90} className="w-full min-w-0">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-3xl bg-surface p-6 shadow-[0_30px_70px_-35px_rgba(20,40,90,0.35)] ring-1 ring-line sm:p-8"
            >
              <h2 className="font-display text-2xl font-extrabold text-ink">Send us a message</h2>
              <p className="mt-2 text-sm text-mute">
                Fill in your details and we'll get back to you — by email or on the phone.
              </p>

              <div className="mt-7 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-ink/85">Name / Organization</span>
                  <input required value={form.name} onChange={set("name")} placeholder="Your name or organization" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-ink/85">Email</span>
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold text-ink/85">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us what you need…"
                  className={`${inputCls} resize-none`}
                />
              </label>

              <Button variant="primary" className="mt-6 w-full rounded-full py-3.5 text-sm">
                Send message
              </Button>
            </form>
          </Reveal>

          <Reveal className="w-full min-w-0">
            <ContactInfo />
          </Reveal>
        </div>
      </div>
    </main>
  );
}