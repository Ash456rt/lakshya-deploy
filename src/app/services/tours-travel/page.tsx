import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tours & Travel Company in Bengaluru | Lakshya Groups",
  description:
    "Premium travel experiences with curated tour packages and corporate travel solutions. Plan, book, and manage travel — hassle-free.",
  alternates: { canonical: `${SITE_URL}/services/tours-travel` },
};

const offerings = [
  { title: "Curated tour packages", text: "Pre-planned itineraries for individuals and groups, with local knowledge baked in." },
  { title: "Corporate travel", text: "Business travel arranged and coordinated — flights, stays, transfers, and on-ground support." },
  { title: "Hassle-free planning", text: "We handle the logistics so you can focus on the trip, not the paperwork." },
  { title: "Custom itineraries", text: "Build a trip around what you actually want to do, not a generic package." },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Tours and Travel",
  description:
    "Premium travel experiences with curated tour packages and corporate travel solutions — planning, booking, and coordination.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN", "US", "UK", "AE", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tours & Travel Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Tour Packages", itemListElement: [{ "@type": "Offer", serviceType: "Curated tour packages" }] },
      { "@type": "OfferCatalog", name: "Corporate Travel", itemListElement: [{ "@type": "Offer", serviceType: "Corporate travel management" }] },
      { "@type": "OfferCatalog", name: "Custom Itineraries", itemListElement: [{ "@type": "Offer", serviceType: "Custom travel itineraries" }] },
    ],
  },
  image: `${SITE_URL}/travel.webp`,
});

export default function ToursTravelPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">Tours & Travel</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Tours & Travel
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-8">
            Premium travel experiences with curated tour packages and corporate travel solutions.
            We handle the planning, booking, and on-ground coordination — so the trip is the
            point.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Plan a trip
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

        {/* Offerings */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we offer</h2>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30">
            {offerings.map((item) => (
              <div key={item.title} className="bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Where to next?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Tell us whether this is a vacation, a corporate trip, or something in between — and we
            will build an itinerary that fits.
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
