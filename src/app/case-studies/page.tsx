import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from Laksya Groups Clients",
  description:
    "Real results from businesses we have helped. See how Laksya Groups delivered measurable outcomes across travel, exports, fintech, and more.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
  openGraph: {
    title: "Case Studies — Real Results from Laksya Groups Clients",
    description:
      "Real results from businesses we have helped. See how Laksya Groups delivered measurable outcomes.",
    url: `${SITE_URL}/case-studies`,
    type: "website",
  },
};

export default function CaseStudiesPage() {
  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE_URL}/case-studies`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-neutral-300">
              Case Studies
            </li>
          </ol>
        </nav>

        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-full">
          Real Results
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          Case Studies
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-14">
          We do not just talk about results — we document them. Here are real
          projects with real outcomes. Numbers, not adjectives.
        </p>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative h-48 md:h-auto">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/80 hidden md:block" />
                </div>
                <div className="md:col-span-2 p-8">
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {study.industry}
                    </span>
                    <span className="text-neutral-500">{study.client}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {study.challenge}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.results.map((r) => (
                      <div key={r.metric}>
                        <p className="text-lg font-bold text-blue-400">
                          {r.value}
                        </p>
                        <p className="text-xs text-neutral-500">{r.metric}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read full case study
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
