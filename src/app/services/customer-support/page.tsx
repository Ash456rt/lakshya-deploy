import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Support Services in India | Lakshya Groups",
  description:
    "24/7 multilingual customer support — call centers, help desks, email, chat, and AI-powered chatbots. Bengaluru-based with global coverage.",
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
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">Customer Support</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Customer Support
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-8">
            24/7 multilingual customer support including call centers, help desks, and AI-powered
            chatbots. We handle the volume so your customers feel looked after and your team stays
            focused.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Set up support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-300"
            >
              View all services
            </Link>
          </div>
        </div>

        {/* Channels */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Support channels we run</h2>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30">
            {channels.map((item) => (
              <div key={item.title} className="bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What you get</h2>
          <div className="flex flex-wrap gap-3">
            {features.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Overwhelmed by support volume?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Tell us about your current setup and we will show you where automation and extra hands
            can make the biggest difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
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
    </main>
  );
}
