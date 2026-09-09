import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Transport & Logistics Company in India | Lakshya Groups" },  description: "End-to-end logistics: fleet management, warehousing and last-mile delivery for businesses moving goods across India and abroad.",
  alternates: { canonical: `${SITE_URL}/services/transport-logistics` },
};

const services = [
  { title: "Fleet management", text: "Manage vehicles, drivers, routes, and maintenance in one place , so your fleet moves efficiently." },
  { title: "Warehousing", text: "Storage, inventory management, and fulfillment support at our facilities and partner warehouses." },
  { title: "Last-mile delivery", text: "Get products to your customers reliably, on time, and with visibility at every step." },
  { title: "Freight coordination", text: "Coordinate road, rail, and cross-border freight without the usual back-and-forth." },
  { title: "Tracking & visibility", text: "Know where your shipments are, in real time, with updates you can share with your customers." },
];

const outcomes = [
  { stat: "3", label: "new markets reached", detail: "Including a logistics client that expanded with our help." },
  { stat: "4", label: "vendors replaced by 1", detail: "Coordination overhead cut roughly in half." },
  { stat: "Ongoing", label: "support", detail: "One partner for the life of the logistics relationship." },
];

const faqs = [
  {
    q: "Do you provide dedicated fleet contracts or per-shipment transport?",
    a: "Both. Per-shipment transport suits businesses testing a route or handling seasonal spikes, while dedicated fleet contracts give you reserved vehicles and drivers on fixed schedules. Many clients start per-shipment and move to a contract once volumes justify it.",
  },
  {
    q: "Can we track our shipments in real time?",
    a: "Yes. Every vehicle we manage reports live GPS position, and you get a tracking link you can open any time or share with your own customers. Dispatch alerts notify you proactively when a shipment is delayed or off-route.",
  },
  {
    q: "Which regions do you cover?",
    a: "Daily coverage across Karnataka and major South Indian routes, with national reach through partner networks. Cross-border freight to the UAE, Southeast Asia and beyond is coordinated through our import-export practice.",
  },
  {
    q: "How do you handle damaged or delayed shipments?",
    a: "Every shipment is insured and barcoded at pickup. Delays trigger automatic alerts and a revised ETA to you and your customer; damage claims are handled by a single coordinator rather than a claims hotline. Dispatch errors run under 1% on managed accounts.",
  },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Transport and Logistics",
  description:
    "End-to-end logistics: fleet management, warehousing, last-mile delivery, freight coordination, and shipment tracking.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN", "US", "UK", "AE", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Transport & Logistics Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Fleet Management", itemListElement: [{ "@type": "Offer", serviceType: "Fleet management" }] },
      { "@type": "OfferCatalog", name: "Warehousing", itemListElement: [{ "@type": "Offer", serviceType: "Warehousing and storage" }] },
      { "@type": "OfferCatalog", name: "Last-Mile Delivery", itemListElement: [{ "@type": "Offer", serviceType: "Last-mile delivery" }] },
      { "@type": "OfferCatalog", name: "Freight", itemListElement: [{ "@type": "Offer", serviceType: "Freight coordination" }] },
    ],
  },
  image: `${SITE_URL}/transport.webp`,
});

export default function TransportLogisticsPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">Transport & Logistics</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Transport & Logistics
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">
            End-to-end logistics , fleet management, warehousing, and last-mile delivery. We move
            goods reliably so your business is not held back by shipping headaches.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Get a logistics plan
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

        {/* Services */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we move</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {services.map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Results for logistics clients</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {outcomes.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-5xl md:text-6xl font-[family-name:var(--font-newsreader)] font-medium tracking-[-0.01em] text-ink mb-2 tracking-tight">{item.stat}</div>
                <p className="text-sm text-stone-800 font-medium">{item.label}</p>
                <p className="text-xs text-stone-500 mt-1">{item.detail}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need to move things reliably?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Tell us what you ship, where, and how often , and we will show you a logistics setup
            that actually works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Get in touch
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-ink font-medium text-sm transition-colors duration-300"
            >
              See logistics case studies
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
