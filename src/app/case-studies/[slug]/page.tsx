import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL } from "@/lib/site";

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
    alternates: { canonical: `${SITE_URL}/case-studies/${study.slug}` },
    openGraph: {
      title: `Case Study: ${study.title}`,
      description: study.challenge,
      type: "article",
      url: `${SITE_URL}/case-studies/${study.slug}`,
      publishedTime: study.date,
      images: [
        {
          url: `${SITE_URL}${study.image}`,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Case Study: ${study.title}`,
      description: study.challenge,
      images: [`${SITE_URL}${study.image}`],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  // CaseStudy structured data
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: study.title,
    description: study.challenge,
    datePublished: study.date,
    author: {
      "@type": "Organization",
      name: "Laksya Groups",
      url: SITE_URL,
    },
    about: {
      "@type": "Organization",
      name: study.client,
    },
    image: `${SITE_URL}${study.image}`,
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: study.title,
        item: `${SITE_URL}/case-studies/${study.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/case-studies"
                className="hover:text-white transition-colors"
              >
                Case Studies
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-neutral-300">
              {study.title.length > 50
                ? study.title.slice(0, 50) + "…"
                : study.title}
            </li>
          </ol>
        </nav>

        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-10 text-sm"
        >
          ← Back to case studies
        </Link>

        <div className="flex items-center gap-3 mb-6 text-sm">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {study.industry}
          </span>
          <time dateTime={study.date} className="text-neutral-500">
            {study.client} · {study.date}
          </time>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
          {study.title}
        </h1>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {study.results.map((r) => (
            <div
              key={r.metric}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center"
            >
              <p className="text-xl md:text-2xl font-bold text-amber-400 mb-1">
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
              className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Challenge */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            The Challenge
          </h2>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {study.challenge}
          </p>
        </section>

        {/* Solution */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">
            Our Solution
          </h2>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {study.solution}
          </p>
        </section>

        {/* Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">Results</h2>
          <div className="space-y-4">
            {study.results.map((r) => (
              <div
                key={r.metric}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white">{r.metric}: </span>
                  <span className="text-amber-400 font-bold">{r.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-600/20 to-amber-600/20 border border-amber-500/30 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want results like these?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Tell us about your challenge and we will show you how we can help.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors"
          >
            Get a Free Consultation
          </Link>
        </div>
      </article>
    </main>
  );
}
