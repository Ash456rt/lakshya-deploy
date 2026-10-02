import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Case Studies | Real Results from Lakshya Groups Clients" },
  description:
    "See how Lakshya Groups helped businesses save time, cut costs, and grow with our multi-service approach.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">
              Case Studies
            </li>
          </ol>
        </nav>

        <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Work
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Case Studies
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mb-14">
          We document our results. Here are real projects with real outcomes.
        </p>

        <div className="space-y-4">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group block bg-paper-deep/30 border border-stone-200/50 hover:border-stone-400/50 p-8 transition-colors duration-500"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                  {study.industry}
                </span>
                <span className="text-xs text-stone-500">
                  {study.client} · {study.date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-brand-violet-light transition-colors duration-300">
                {study.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-2xl">
                {study.challenge}
              </p>
              {/* Results preview */}
              <div className="flex flex-wrap gap-4">
                {study.results.slice(0, 3).map((r) => (
                  <div key={r.metric} className="text-sm">
                    <span className="text-stone-500">{r.metric}: </span>
                    <span className="text-brand-violet-light/90 font-medium">{r.value}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
