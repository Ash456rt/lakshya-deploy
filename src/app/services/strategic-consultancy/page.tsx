import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Strategic Consultancy in Bengaluru | Lakshya Groups" },  description: "Business consultancy that optimizes operations, plans digital transformation and accelerates growth — roadmaps that get executed, not delivered as PDFs.",
  alternates: { canonical: `${SITE_URL}/services/strategic-consultancy` },
};

const consultingAreas = [
  { title: "Digital transformation", text: "Move from manual processes to systems that scale , without the big-bang risk." },
  { title: "Growth planning", text: "A clear roadmap with milestones, owners, and timelines. What to build next, and why." },
  { title: "Operational efficiency", text: "Find the bottlenecks and fix them. Less coordination overhead, faster response times." },
  { title: "Market entry", text: "A practical plan to enter a new market , including local regulations, partners, and channels." },
  { title: "Vendor consolidation", text: "Replace multiple vendors with one accountable partner. Fewer handoffs, fewer gaps." },
];

const outcomes = [
  { stat: "50%", label: "less coordination overhead", detail: "One partner instead of four vendors." },
  { stat: "3", label: "new markets opened", detail: "Including Southeast Asia, with a clear roadmap." },
  { stat: "2-4", label: "weeks to a roadmap", detail: "From first call to a plan you can act on." },
];

const faqs = [
  {
    q: "What does a business consultant actually do for a small company?",
    a: "We diagnose where time and money leak - manual processes, vendor sprawl, unclear priorities - then produce a prioritized roadmap with owners and timelines. Because our consultancy and development teams are the same company, we can also execute the plan instead of handing you a document.",
  },
  {
    q: "How is your consultancy different from a big firm?",
    a: "Three ways: fixed scopes instead of open-ended billing, recommendations we can implement ourselves the next week, and Bengaluru-based rates that are a fraction of big-firm fees. You get senior attention without the partner theatre.",
  },
  {
    q: "How long until we see a working roadmap?",
    a: "Two to four weeks from the first call, depending on how many stakeholders we need to interview. The roadmap includes priorities, effort estimates, and what to do first - written so your team can act on it immediately.",
  },
  {
    q: "Do you work with companies outside Bengaluru?",
    a: "Yes. We serve clients across India and internationally - the US, UK, UAE and Singapore among them - with remote-first delivery and on-site visits where it matters. Travel and logistics clients get operational reviews on location.",
  },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Strategic Consultancy",
  description:
    "Expert business consulting to optimize operations, plan digital transformation, and grow. Roadmaps that get executed.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN", "US", "UK", "AE", "SG"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Strategic Consultancy Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Digital Transformation", itemListElement: [{ "@type": "Offer", serviceType: "Digital transformation consulting" }] },
      { "@type": "OfferCatalog", name: "Growth Planning", itemListElement: [{ "@type": "Offer", serviceType: "Growth planning and roadmaps" }] },
      { "@type": "OfferCatalog", name: "Operational Efficiency", itemListElement: [{ "@type": "Offer", serviceType: "Operational efficiency advisory" }] },
      { "@type": "OfferCatalog", name: "Market Entry", itemListElement: [{ "@type": "Offer", serviceType: "New market entry strategy" }] },
    ],
  },
  image: `${SITE_URL}/consultancy.webp`,
});

export default function StrategicConsultancyPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">Strategic Consultancy</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Strategic Consultancy
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">
            Expert business consulting to optimize operations, plan digital transformation, and
            accelerate growth. We deliver roadmaps that get executed , because we are the same
            team that builds them.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Get a consultation
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

        {/* Why choose us */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why businesses choose us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "We build what we recommend", text: "Our consultants are also our developers. If we recommend something, we can build it , no handoff to a different team." },
              { title: "Outcomes, not decks", text: "A roadmap is only useful if it gets executed. We stay involved after the plan." },
              { title: "Fixed scopes, honest answers", text: "Clear timelines and honest answers about what is included and what is not." },
              { title: "Local roots, global reach", text: "Bengaluru-based with operations and partners across 63 countries." },
            ].map((item) => (
              <div key={item.title} className="group">
                <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-brand-violet-light transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consulting areas */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we advise on</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {consultingAreas.map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What results look like</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a business problem?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Tell us about your situation and we will show you whether consultancy, development, or
            both is the right call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Get in touch
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-ink font-medium text-sm transition-colors duration-300"
            >
              Learn about us
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
