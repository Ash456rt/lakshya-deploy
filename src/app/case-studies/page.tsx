import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies | Real Results from Lakshya Groups Clients",
  description:
    "See how Lakshya Groups helped businesses save time, cut costs, and grow with our multi-service approach.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">
              Case Studies
            </li>
          </ol>
        </nav>

        <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
          Work
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Case Studies
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl mb-14">
          We document our results. Here are real projects with real outcomes.
        </p>

        <div className="space-y-4">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group block bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 p-8 transition-colors duration-500"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
                  {study.industry}
                </span>
                <span className="text-xs text-zinc-600">
                  {study.client} · {study.date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                {study.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-2xl">
                {study.challenge}
              </p>
              {/* Results preview */}
              <div className="flex flex-wrap gap-4">
                {study.results.slice(0, 3).map((r) => (
                  <div key={r.metric} className="text-sm">
                    <span className="text-zinc-600">{r.metric}: </span>
                    <span className="text-amber-400/80 font-medium">{r.value}</span>
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
