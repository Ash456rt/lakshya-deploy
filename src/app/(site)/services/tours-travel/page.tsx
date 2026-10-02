import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Tours & Travel Company in Bengaluru | Lakshya Groups" },
  description:
    "Premium travel experiences with curated tour packages and corporate travel solutions. Plan, book, and manage travel — hassle-free.",
  alternates: { canonical: `${SITE_URL}/services/tours-travel` },
};

const offers = [
  {
    title: "Curated tour packages",
    text: "Handpicked itineraries across Karnataka, Kerala, Goa, Rajasthan, Kashmir and beyond — planned by people who have travelled every route.",
  },
  {
    title: "Corporate travel",
    text: "Conferences, offsites and client visits managed end to end: transport, stays and scheduling handled for your team.",
  },
  {
    title: "Hassle-free planning",
    text: "One coordinator for permits, hotels, vehicles and food. You choose the trip; we handle every booking behind it.",
  },
  {
    title: "Custom itineraries",
    text: "Pilgrimage circuits, weekend getaways, honeymoons or group tours — routes built around your dates, budget and pace.",
  },
];

const faqs = [
  {
    q: "Which destinations do your tour packages cover?",
    a: "We operate across India with popular circuits in Karnataka (Coorg, Chikmagalur, Hampi), Kerala, Goa, Tamil Nadu, Rajasthan and Kashmir, plus custom trips anywhere in the country. Group tours and pilgrimage packages run on fixed dates; private tours run on your schedule.",
  },
  {
    q: "Do you handle corporate and group travel bookings?",
    a: "Yes. We manage conference travel, team offsites and client visits end to end — vehicles, hotels, venue coordination and scheduling — with one point of contact and a single invoice for the whole trip.",
  },
  {
    q: "Can you build a custom itinerary for our family or group?",
    a: "Absolutely. Share your dates, group size, budget and interests, and we design a day-by-day plan with stays and transport included. Revisions are free until the itinerary fits you perfectly.",
  },
  {
    q: "What is included in a typical package?",
    a: "Packages typically cover transport, accommodation, itinerary planning and on-trip coordination. Entry tickets, meals and guides can be added per destination. Every quote itemizes what is included — no hidden costs.",
  },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Tours and Travel",
  description:
    "Curated tour packages, corporate travel, and custom itineraries across India with end-to-end planning and booking.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tours & Travel Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Tour Packages", itemListElement: [{ "@type": "Offer", serviceType: "Curated tour packages" }] },
      { "@type": "OfferCatalog", name: "Corporate Travel", itemListElement: [{ "@type": "Offer", serviceType: "Corporate travel management" }] },
      { "@type": "OfferCatalog", name: "Custom Itineraries", itemListElement: [{ "@type": "Offer", serviceType: "Custom itinerary planning" }] },
    ],
  },
  image: `${SITE_URL}/travel.webp`,
});

export default function ToursTravelPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-ink transition-colors">Services</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">Tours & Travel</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Tours & Travel
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">
            Premium travel experiences with curated tour packages and corporate travel
            solutions. Plan, book, and manage travel — hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/travels/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Explore tour packages
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

        {/* What we offer */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we offer</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {offers.map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Where to next?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Browse our curated tour packages or tell us your dates and we will build a custom
            trip for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/travels/"
              className="px-8 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Visit Lakshya Travels
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-ink font-medium text-sm transition-colors duration-300"
            >
              Plan a custom trip
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
