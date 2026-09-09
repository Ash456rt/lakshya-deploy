import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Import & Export Company in India | Lakshya Groups" },  description: "Import & export services: sourcing, documentation, supply chains and logistics that move your goods across borders without delays.",
  alternates: { canonical: `${SITE_URL}/services/import-export` },
};

const whatWeDo = [
  { title: "Sourcing", text: "Find reliable suppliers and manufacturers in India and across Asia for your product needs." },
  { title: "Export management", text: "Handle documentation, shipping, customs, and compliance for exporting from India." },
  { title: "Import coordination", text: "Manage inbound shipments, customs clearance, and last-mile delivery to your warehouse." },
  { title: "Supply chain", text: "Build efficient supply chains that reduce cost and lead time across borders." },
  { title: "Compliance", text: "Ensure your trade complies with regulations in both the origin and destination countries." },
];

const regions = ["India", "United States", "United Kingdom", "UAE", "Singapore", "Southeast Asia"];

const faqs = [
  {
    q: "What does an import-export service provider actually do?",
    a: "We handle the operational side of international trade: finding and vetting suppliers, negotiating with freight forwarders, preparing customs documentation, clearing shipments, and delivering to or from your warehouse. You get one accountable partner instead of coordinating agents, brokers and transporters yourself.",
  },
  {
    q: "Which documents are required for importing into India?",
    a: "Typical shipments need a commercial invoice, packing list, bill of lading or airway bill, and the correct HS classification for customs duty. Depending on the product, additional certificates apply. We prepare and verify the full set so your goods clear customs without surprises.",
  },
  {
    q: "Can you source products from India for our business?",
    a: "Yes. We identify and audit suppliers, negotiate pricing and terms, arrange quality checks before dispatch, and manage the export side through delivery. Our teams are based in Bengaluru with supplier networks across India and Southeast Asia.",
  },
  {
    q: "How do you keep shipping costs down?",
    a: "Consolidated freight, correct HS classification, planning around peak-season rate surges, and choosing sea vs air deliberately per shipment. Route optimization built into our logistics practice routinely saves clients 10-25% on freight compared to unmanaged shipping.",
  },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Import and Export",
  description:
    "Global trade solutions: sourcing, export management, import coordination, supply chain, and compliance across international markets.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN", "US", "UK", "AE", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Import & Export Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Sourcing", itemListElement: [{ "@type": "Offer", serviceType: "Supplier sourcing" }] },
      { "@type": "OfferCatalog", name: "Export Management", itemListElement: [{ "@type": "Offer", serviceType: "Export management and documentation" }] },
      { "@type": "OfferCatalog", name: "Import Coordination", itemListElement: [{ "@type": "Offer", serviceType: "Import coordination and clearance" }] },
      { "@type": "OfferCatalog", name: "Supply Chain", itemListElement: [{ "@type": "Offer", serviceType: "Supply chain optimization" }] },
    ],
  },
  image: `${SITE_URL}/import-export.webp`,
});

export default function ImportExportPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">Import & Export</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Import & Export
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">
            Global trade solutions connecting businesses across international markets. We handle
            sourcing, documentation, shipping, and compliance , so you can trade across borders
            without the operational headache.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Start trading
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

        {/* How it works */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How it works</h2>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-stone-100/50">
              <div className="w-full bg-brand-violet/25" style={{ height: "0%" }} />
            </div>
            <div className="space-y-16">
              {[
                { step: "01", title: "Tell us what you trade", detail: "Products, volumes, markets, and your current pain points." },
                { step: "02", title: "We map your supply chain", detail: "Suppliers, routes, documentation, and compliance requirements." },
                { step: "03", title: "We execute", detail: "Sourcing, shipping, customs, and delivery , coordinated end to end." },
                { step: "04", title: "Ongoing support", detail: "We keep your trade lines running. Adjust, scale, and troubleshoot as needed." },
              ].map((item, i) => (
                <div key={item.step} className="relative flex gap-8">
                  <div className="relative z-10 shrink-0">
                    <div className="w-10 h-10 bg-paper border border-stone-200 flex items-center justify-center">
                      <span className="text-xs font-mono text-brand-violet-light/90">{item.step}</span>
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-xl font-semibold text-ink mb-2">{item.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed max-w-md">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What we handle */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we handle</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {whatWeDo.map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Markets we serve</h2>
          <div className="flex flex-wrap gap-3">
            {regions.map((r) => (
              <span key={r} className="px-3 py-1.5 bg-paper-deep border border-stone-200 text-stone-800 text-sm rounded-full">
                {r}
              </span>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to trade?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Tell us what you want to import or export and we will show you the fastest path to
            getting it done.
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
