import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transport & Logistics Company in India | Lakshya Groups",
  description:
    "End-to-end logistics — fleet management, warehousing, and last-mile delivery. Reliable transport and logistics for businesses moving goods across India and abroad.",
  alternates: { canonical: `${SITE_URL}/services/transport-logistics` },
};

const services = [
  { title: "Fleet management", text: "Manage vehicles, drivers, routes, and maintenance in one place — so your fleet moves efficiently." },
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
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">Transport & Logistics</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Transport & Logistics
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-8">
            End-to-end logistics — fleet management, warehousing, and last-mile delivery. We move
            goods reliably so your business is not held back by shipping headaches.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Get a logistics plan
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

        {/* Services */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we move</h2>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30">
            {services.map((item) => (
              <div key={item.title} className="bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
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
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">{item.stat}</div>
                <p className="text-sm text-zinc-300 font-medium">{item.label}</p>
                <p className="text-xs text-zinc-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need to move things reliably?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Tell us what you ship, where, and how often — and we will show you a logistics setup
            that actually works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Get in touch
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-300"
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
    </main>
  );
}
