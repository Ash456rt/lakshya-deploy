import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Lakshya Groups Services, Pricing & Timelines",
  description:
    "Frequently asked questions about Lakshya Groups services, pricing, timelines, and how we work. Web development, consultancy, import & export, and more.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ — Lakshya Groups Services, Pricing & Timelines",
    description:
      "Frequently asked questions about Lakshya Groups services, pricing, timelines, and how we work.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

const faqs = [
  {
    question: "What services does Lakshya Groups offer?",
    answer:
      "We offer 7 services under one roof: App & Web Development, Strategic Consultancy, Import & Export, Customer Support, Transport & Logistics, Tours & Travel, and professional training through Lakshya Academy. You can use one service or all seven — we scale with your needs.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "A business website starts from ₹25,000 for a basic 5-page site. Complex web applications, e-commerce platforms, and custom dashboards range from ₹1,00,000 to ₹5,00,000 depending on features. We give fixed-price quotes after understanding your requirements — no surprises.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A simple business website takes 2-3 weeks. A web application with user accounts and database takes 4-8 weeks. A mobile app takes 8-12 weeks. We provide a detailed timeline before starting and hit our deadlines — that is something our clients consistently praise us for.",
  },
  {
    question: "Do you work with clients outside Bengaluru?",
    answer:
      "Yes. We work with clients across India and internationally. Our team operates remotely with regular video calls, shared project boards, and transparent communication. About 40% of our clients are outside Bengaluru, including international clients in the US, UK, and Southeast Asia.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our primary stack is Next.js, React, TypeScript, Supabase, and Tailwind CSS for web projects. For mobile apps, we use React Native. For backend services, we use Node.js and PostgreSQL. We choose technologies based on your specific needs, not trends.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "Yes. After launch, we offer monthly maintenance plans starting from ₹5,000/month that include hosting management, security updates, content changes, and technical support. Most clients find this more cost-effective than hiring a full-time developer.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "Every project gets a dedicated point of contact. We use shared project boards for transparency, weekly video calls for updates, and a direct WhatsApp line for urgent issues. You will always know what is happening with your project.",
  },
  {
    question: "Can you work with our existing design?",
    answer:
      "Absolutely. If you have designs from Figma, Adobe XD, or even hand-drawn wireframes, we can build from those. We also offer design services if you need help creating the visual direction first.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund if we have not started development. Once development begins, we refund for work not yet completed. We document everything in a clear scope agreement before starting so there are no misunderstandings.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the contact form on our website or email us at admin@lakshyagroups.in. We will schedule a free 30-minute consultation to understand your needs, then provide a detailed proposal with timeline and pricing. No commitment required.",
  },
];

export default function FAQPage() {
  // FAQPage structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        name: "FAQ",
        item: `${SITE_URL}/faq`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6">
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
              FAQ
            </li>
          </ol>
        </nav>

        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
          Help Center
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-14">
          Everything you need to know before working with us. Still have
          questions?{" "}
          <Link href="/#contact" className="text-amber-400 hover:text-amber-300">
            Contact us
          </Link>{" "}
          — we reply within 24 hours.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none text-lg font-semibold hover:text-amber-400 transition-colors">
                {faq.question}
                <svg
                  className="w-5 h-5 shrink-0 text-neutral-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-br from-amber-600/20 to-amber-600/20 border border-amber-500/30 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            We are happy to help. Reach out and we will get back to you within
            24 hours.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
