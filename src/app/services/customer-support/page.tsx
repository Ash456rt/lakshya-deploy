import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Customer Support Services in India | Lakshya Groups" },
  description:
    "24/7 multilingual customer support , call centers, help desks, email, chat, and AI-powered chatbots. Bengaluru-based with global coverage.",
  alternates: { canonical: `${SITE_URL}/services/customer-support` },
};

const channels = [
  { title: "Call center", text: "Voice support in multiple languages, with trained agents and clear escalation paths." },
  { title: "Help desk", text: "Ticket-based support with SLA tracking, so nothing falls through the cracks." },
  { title: "Email & chat", text: "Asynchronous support for customers who prefer to write rather than call." },
  { title: "AI chatbots", text: "Automated first-line support that handles common queries and routes the rest to humans." },
  { title: "Social support", text: "Response handling across platforms where your customers are already asking questions." },
];

const features = [
  "24/7 coverage across time zones",
  "Multilingual support (English, Hindi, and more)",
  "SLA-based ticket management",
  "AI chatbot for first-line triage",
  "Reporting on resolution time, CSAT, and volume",
];

const onboarding = [
  { step: "01", title: "Audit your current support", text: "We analyze your inbox, tickets and call logs to find the twenty questions driving most of your volume." },
  { step: "02", title: "Design the tier system", text: "Self-serve answers, AI chatbot triage, and trained human agents for what actually needs a person." },
  { step: "03", title: "Train & document", text: "We write playbooks for your products and escalation paths, then train agents on real conversations - not demos." },
  { step: "04", title: "Launch & report", text: "We go live in phases, track CSAT and response times weekly, and tune the setup based on the numbers." },
];

const faqs = [
  {
    q: "What does outsourced customer support cost in India?",
    a: "Pricing depends on channels, volume and hours - a typical starting engagement with email and chat coverage is far cheaper than a full-time in-house hire, and scales with your ticket volume. We quote a fixed monthly rate after a free audit of your current support load.",
  },
  {
    q: "Can you support our customers in multiple languages?",
    a: "Yes. Our Bengaluru team supports customers in English and Hindi as standard, with additional Indian and international languages available depending on your market. AI chatbot triage handles common queries in all supported languages around the clock.",
  },
  {
    q: "Do you replace our support tools or work with them?",
    a: "We work with what you have - Gmail, help desks like Zendesk or Freshdesk, or nothing at all. If you outgrow your current setup we will recommend and implement a better one as part of the engagement, including migration of existing tickets.",
  },
  {
    q: "How fast can support go live?",
    a: "Most engagements go live within 2-3 weeks: one week to audit and design the tier system, one week to train agents on your products, and a phased launch with weekly reporting from day one.",
  },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Customer and Support",
  description:
    "24/7 multilingual customer support: call centers, help desks, email, chat, and AI-powered chatbots.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN", "US", "UK", "AE", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Customer Support Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Call Center", itemListElement: [{ "@type": "Offer", serviceType: "Voice support and call center" }] },
      { "@type": "OfferCatalog", name: "Help Desk", itemListElement: [{ "@type": "Offer", serviceType: "Ticket-based help desk" }] },
      { "@type": "OfferCatalog", name: "Chat & Email", itemListElement: [{ "@type": "Offer", serviceType: "Email and chat support" }] },
      { "@type": "OfferCatalog", name: "AI Chatbots", itemListElement: [{ "@type": "Offer", serviceType: "AI-powered chatbot support" }] },
    ],
  },
  image: `${SITE_URL}/support.webp`,
});

export default function CustomerSupportPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">Customer Support</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Customer Support
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">
            24/7 multilingual customer support including call centers, help desks, and AI-powered
            chatbots. We handle the volume so your customers feel looked after and your team stays
            focused.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Set up support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-ink font-medium text-sm transition-colors duration-300"
            >
              View all services
            </Link>
          </div>
        </div>

        {/* Channels */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Support channels we run</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {channels.map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What you get</h2>
          <div className="flex flex-wrap gap-3">
            {features.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-paper-deep border border-stone-200 text-stone-800 text-sm rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Onboarding process */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How we launch your support</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {onboarding.map((item) => (
              <div key={item.step} className="border-t-2 border-ink/10 pt-6">
                <span className="text-[11px] font-semibold tracking-[0.22em] text-ink-muted">{item.step}</span>
                <h3 className="text-base font-semibold text-ink mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently asked questions</h2>
          <div className="divide-y divide-stone-200/60 border-y border-stone-200/60">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-ink list-none">
                  {f.q}
                  <span className="ml-4 text-stone-400 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm text-stone-600 leading-relaxed max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-stone-200/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Overwhelmed by support volume?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Tell us about your current setup and we will show you where automation and extra hands
            can make the biggest difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* JSON-LD Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
