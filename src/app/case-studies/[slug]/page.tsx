import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `Case Study: ${study.title}`,
    description: study.challenge,
    alternates: { canonical: "/case-studies/" + study.slug },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-10 text-sm"
        >
          ← Back to case studies
        </Link>

        <div className="flex items-center gap-3 mb-6 text-sm">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {study.industry}
          </span>
          <span className="text-neutral-500">
            {study.client} · {study.date}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8">
          {study.title}
        </h1>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {study.results.map((r) => (
            <div
              key={r.metric}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center"
            >
              <p className="text-xl md:text-2xl font-black text-blue-400 mb-1">
                {r.value}
              </p>
              <p className="text-xs text-neutral-500">{r.metric}</p>
            </div>
          ))}
        </div>

        {/* Services Used */}
        <div className="flex flex-wrap gap-2 mb-12">
          {study.services.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Challenge */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            The Challenge
          </h2>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {study.challenge}
          </p>
        </section>

        {/* Solution */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Our Solution
          </h2>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {study.solution}
          </p>
        </section>

        {/* Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Results</h2>
          <div className="space-y-4">
            {study.results.map((r) => (
              <div
                key={r.metric}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white">{r.metric}: </span>
                  <span className="text-green-400 font-bold">{r.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Want results like these?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Tell us about your challenge and we will show you how we can help.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </article>
    </main>
  );
}
