import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professional Training & Certification in Bengaluru | Lakshya Academy",
  description:
    "Professional training and certification programs in web development, React, Next.js, and corporate upskilling in Bengaluru. Project-based, with measurable outcomes.",
  alternates: { canonical: `${SITE_URL}/services/lakshya-academy` },
};

const programs = [
  {
    title: "Full-Stack Web Development Training",
    audience: "Junior/mid developers, career switchers",
    duration: "12 weeks",
    format: "Live sessions + project-based",
    outcome: "Graduates can build and ship full-stack web applications.",
  },
  {
    title: "React & Next.js Upskilling",
    audience: "Existing dev teams moving to a modern stack",
    duration: "6-8 weeks",
    format: "On-site or remote, built around your stack",
    outcome: "Faster sprints, better code quality, and a team that can maintain the stack themselves.",
  },
  {
    title: "Corporate Technology Training",
    audience: "Companies training a team",
    duration: "Custom",
    format: "Custom curriculum, on-site in Bengaluru or remote",
    outcome: "Measurable team improvement on the metrics that matter to you.",
  },
  {
    title: "Business & Consultancy Skills",
    audience: "Founders, operations, export/logistics teams",
    duration: "Custom",
    format: "Workshops and ongoing coaching",
    outcome: "Practical skills in digital transformation, import/export processes, and customer support setup.",
  },
  {
    title: "Certification Prep & Mentorship",
    audience: "Individuals preparing for certifications or interviews",
    duration: "Custom",
    format: "1:1 mentorship + mock interviews",
    outcome: "Ready for the certification, the interview, or the next role.",
  },
];

const faqs = [
  { q: "How much does training cost?", a: "It depends on the program, the number of participants, and whether it is custom-built for your team. Get in touch for a quote — we share a clear starting range." },
  { q: "How long does a program run?", a: "Our flagship full-stack program runs 12 weeks. Upskilling programs are typically 6-8 weeks. Corporate programs are built to your timeline." },
  { q: "Do you offer certifications?", a: "Yes — participants receive a certificate of completion. We also help teams prepare for external certifications where relevant." },
  { q: "Is training online or in person?", a: "Both. We run training on-site in Bengaluru and remotely. Corporate programs can be customised to a hybrid format." },
  { q: "Can you build the curriculum around our stack?", a: "Yes — that is the point. For corporate and upskilling programs, we build the curriculum around the stack and the outcomes you actually need." },
  { q: "What outcomes should I expect?", a: "For upskilling, a typical result is faster sprints and better code quality within 3 months. For career switchers, the outcome is the ability to build and ship full-stack applications." },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      serviceType: "Professional Training & Certification",
      description:
        "Professional training and certification programs in web development, React, Next.js, and corporate upskilling in Bengaluru. Project-based with measurable outcomes.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["IN", "US", "UK", "AE", "SG"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Lakshya Academy Programs",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Full-Stack Training", itemListElement: [{ "@type": "Offer", serviceType: "Full-stack web development training" }] },
          { "@type": "OfferCatalog", name: "React & Next.js Upskilling", itemListElement: [{ "@type": "Offer", serviceType: "React and Next.js upskilling" }] },
          { "@type": "OfferCatalog", name: "Corporate Training", itemListElement: [{ "@type": "Offer", serviceType: "Corporate technology training" }] },
          { "@type": "OfferCatalog", name: "Business Skills", itemListElement: [{ "@type": "Offer", serviceType: "Business and consultancy skills training" }] },
          { "@type": "OfferCatalog", name: "Certification Prep", itemListElement: [{ "@type": "Offer", serviceType: "Certification preparation and mentorship" }] },
        ],
      },
      image: `${SITE_URL}/academy.webp`,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
});

export default function LakshyaAcademyPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">Lakshya Academy</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
            Lakshya Academy
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Professional Training & Certification in Bengaluru
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-8">
            Training and certification programs built around real stacks and real outcomes — not
            generic theory. Project-based, measurable, and delivered by practitioners who build for
            a living.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Enrol or enquire
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

        {/* Programs */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Training programs</h2>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30">
            {programs.map((program) => (
              <div key={program.title} className="bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-white mb-3">{program.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-zinc-500">
                    <span className="text-zinc-600">Audience: </span>
                    <span className="text-zinc-300">{program.audience}</span>
                  </div>
                  <div className="text-zinc-500">
                    <span className="text-zinc-600">Duration: </span>
                    <span className="text-zinc-300">{program.duration}</span>
                  </div>
                  <div className="text-zinc-500">
                    <span className="text-zinc-600">Format: </span>
                    <span className="text-zinc-300">{program.format}</span>
                  </div>
                  <div className="text-zinc-500">
                    <span className="text-zinc-600">Outcome: </span>
                    <span className="text-zinc-300">{program.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What results look like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { stat: "12", label: "juniors upskilled", detail: "In 3 months, with measurable improvement in code quality and sprint velocity." },
              { stat: "60%", label: "faster sprints", detail: "Reported by the FinServe development team after the training program." },
              { stat: "3", label: "new markets", detail: "Opened by a logistics client with consultancy + training support." },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">{item.stat}</div>
                <p className="text-sm text-zinc-300 font-medium">{item.label}</p>
                <p className="text-xs text-zinc-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-zinc-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to upskill?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Tell us whether you are an individual looking to build skills or a company training a
            team — and we will show you the right program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Enrol or enquire
            </Link>
            <Link
              href="/case-studies/finserve-developer-upskilling"
              className="px-8 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-300"
            >
              See the FinServe case study
            </Link>
          </div>
        </div>
      </div>

      {/* JSON-LD Service + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceSchema }}
      />
    </main>
  );
}
