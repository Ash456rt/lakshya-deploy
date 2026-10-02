import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Lakshya Academy | Professional Training Courses in Bengaluru" },
  description:
    "Lakshya Academy training programs in web development, React, Next.js, and corporate upskilling in Bengaluru. Project-based courses with measurable outcomes.",
  alternates: { canonical: `${SITE_URL}/services/lakshya-academy` },
};

const programs = [
  {
    title: "Web Development Bootcamp",
    text: "HTML, CSS, JavaScript, React, and Next.js — the full modern front-end stack. You finish with three deployed projects and a portfolio that survives a hiring manager's 30-second scan.",
    duration: "12 weeks",
    mode: "Classroom + live online",
  },
  {
    title: "Data Analysis",
    text: "Excel, SQL, and Python-based analytics on real datasets. Weekly dashboards, not toy exercises, so the workflow you practice is the one employers run.",
    duration: "10 weeks",
    mode: "Classroom + live online",
  },
  {
    title: "Cybersecurity",
    text: "Network security fundamentals, vulnerability assessment, and security operations basics — mapped to what junior SOC and security analyst roles actually ask in interviews.",
    duration: "14 weeks",
    mode: "Classroom + live online",
  },
  {
    title: "Corporate Upskilling",
    text: "Custom programs for teams, like the 12-week developer upskilling sprint we ran for a fintech client — sprint velocity up 60%, code review cycles 40% faster.",
    duration: "Custom",
    mode: "On-site or remote",
  },
];

const outcomes = [
  { stat: "94%", label: "placement rate", detail: "Across recent program cohorts." },
  { stat: "280+", label: "hiring partners", detail: "Startups to enterprises across Bengaluru and beyond." },
  { stat: "3", label: "portfolio projects", detail: "Every graduate leaves with deployed, reviewable work." },
];

const faqs = [
  {
    q: "What courses does Lakshya Academy offer?",
    a: "Three career tracks — Web Development Bootcamp (12 weeks), Data Analysis (10 weeks), and Cybersecurity (14 weeks) — plus custom corporate upskilling programs for teams. Every track is project-based: you build and deploy real applications rather than only following tutorials.",
  },
  {
    q: "Do I need prior programming experience to join?",
    a: "No for the Web Development Bootcamp — it starts from fundamentals. Data Analysis and Cybersecurity benefit from basic computer literacy but also start from first principles. A short readiness assessment before enrolment tells you which track fits your background.",
  },
  {
    q: "Is Lakshya Academy training available online?",
    a: "Yes. Every program runs in a live online format in parallel with the Bengaluru classroom, taught by the same instructors. Corporate programs can be delivered fully on-site at your office or remotely for distributed teams.",
  },
  {
    q: "How is Lakshya Academy different from other training institutes?",
    a: "Three ways: instructors are working developers from Lakshya Groups' own delivery teams, so the curriculum matches live industry practice; assessment is based on deployed projects, not exams; and placement support connects you to 280+ hiring partners — including Lakshya Groups itself.",
  },
];

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Professional Training and Certification",
  description:
    "Professional training programs in web development, data analysis, and cybersecurity with project-based learning and placement support.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Lakshya Academy Programs",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Web Development Bootcamp", timeRequired: "P12W" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Data Analysis", timeRequired: "P10W" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Cybersecurity", timeRequired: "P14W" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Corporate Upskilling Programs" } },
    ],
  },
  image: `${SITE_URL}/academy.webp`,
});

export default function LakshyaAcademyPage() {
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
            <li aria-current="page" className="text-stone-500">Lakshya Academy</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Service
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Lakshya Academy
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">
            Professional training and certification programs in web development, data analysis, and
            cybersecurity in Bengaluru. Project-based, taught by working developers, with
            measurable outcomes — because a course should end with proof, not just a certificate.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Enquire about a program
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

        {/* Why Academy */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why train with Lakshya Academy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Taught by working developers", text: "Instructors come from Lakshya Groups' own delivery teams. What you learn is what our teams ship to clients this quarter — not a curriculum frozen three years ago." },
              { title: "Projects, not just classes", text: "Every program is assessed on deployed, reviewable work. You graduate with a portfolio that proves skill, which interviews value far more than a participation certificate." },
              { title: "Placement support that is real", text: "280+ hiring partners and dedicated interview preparation. Recent cohorts have placed at a 94% rate — into jobs, not just internships." },
              { title: "Corporate programs that move metrics", text: "Our upskilling sprints for companies are measured on team velocity and quality, like the fintech engagement that lifted sprint velocity 60% in 12 weeks." },
            ].map((item) => (
              <div key={item.title} className="group">
                <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-brand-violet-light transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Programs</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {programs.map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <span className="text-xs uppercase tracking-wide text-stone-400 whitespace-nowrap">
                    {item.duration} · {item.mode}
                  </span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What results look like</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to build real skills?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Tell us which track fits your goal and we will walk you through the syllabus, batch
            dates, and fees — no spam, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300"
            >
              Enquire now
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
