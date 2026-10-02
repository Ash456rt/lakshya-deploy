import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: { absolute: "Contact | Lakshya Groups | Bengaluru" },
  description:
    "Reach Lakshya Groups — call +91 99028 41875, email admin@lakshyagroups.in, or send the form. One Bengaluru partner for development, consultancy, trade, support, logistics, travel and training.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <main id="main-content" role="main" className="pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Contact
          </span>
          <h1 className="mb-3 font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl">
            Start a conversation
          </h1>
          <p className="mb-4 max-w-xl text-stone-600 leading-relaxed">
            Call, WhatsApp, email, or send the form — a human replies, usually
            within the hour during working hours (Mon–Sat, 9:30–19:00 IST).
          </p>
          <p className="mb-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a className="text-brand-violet underline underline-offset-4" href="tel:+919902841875">+91 99028 41875</a>
            <a className="text-brand-violet underline underline-offset-4" href="https://wa.me/919902841875" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            <a className="text-brand-violet underline underline-offset-4" href="mailto:admin@lakshyagroups.in">admin@lakshyagroups.in</a>
          </p>
        </div>
        {/* The full contact block: form + details + map (same as homepage #contact) */}
        <Contact />
      </main>
    </>
  );
}
