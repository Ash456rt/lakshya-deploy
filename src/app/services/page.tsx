import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Lakshya Groups | Bengaluru",
  description:
    "Seven services, one partner. App & web development, strategic consultancy, import & export, customer support, transport & logistics, tours & travel, and Lakshya Academy training.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const services = [
  {
    title: "App and Web Development",
    description: "Full-stack web and mobile development — websites, web apps, mobile apps, and custom software.",
    href: "/services/app-web-development",
    image: "/dev.webp",
  },
  {
    title: "Strategic Consultancy",
    description: "Business consultancy to optimize operations, plan digital transformation, and accelerate growth.",
    href: "/services/strategic-consultancy",
    image: "/consultancy.webp",
  },
  {
    title: "Import and Export",
    description: "Global trade solutions — sourcing, export management, import coordination, and supply chain.",
    href: "/services/import-export",
    image: "/import-export.webp",
  },
  {
    title: "Customer and Support",
    description: "24/7 multilingual customer support — call centers, help desks, email, chat, and AI chatbots.",
    href: "/services/customer-support",
    image: "/support.webp",
  },
  {
    title: "Transport and Logistics",
    description: "End-to-end logistics — fleet management, warehousing, and last-mile delivery.",
    href: "/services/transport-logistics",
    image: "/transport.webp",
  },
  {
    title: "Tours and Travel",
    description: "Premium travel experiences with curated tour packages and corporate travel solutions.",
    href: "/services/tours-travel",
    image: "/travel.webp",
  },
  {
    title: "Lakshya Academy",
    description: "Professional training and certification programs in web development, React, Next.js, and corporate upskilling.",
    href: "/services/lakshya-academy",
    image: "/academy.webp",
  },
];

const serviceList = services.map((service) => ({
  "@type": "Service",
  serviceType: service.title,
  description: service.description,
  url: `${SITE_URL}${service.href}`,
  image: `${SITE_URL}${service.image}`,
}));

const collectionSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Services — Lakshya Groups",
  url: `${SITE_URL}/services`,
  about: { "@id": `${SITE_URL}/#organization` },
  description:
    "Seven services, one partner: app & web development, strategic consultancy, import & export, customer support, transport & logistics, tours & travel, and Lakshya Academy training.",
  hasPart: serviceList,
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">Services</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
            Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Seven services. One partner.
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-8">
            From technology to logistics, end-to-end services designed to accelerate your business
            growth. Pick one, pick several — one team, one point of contact.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
          >
            Get in touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30 mb-24">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300 border-t border-zinc-800/30"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 bg-zinc-900 border border-zinc-800 overflow-hidden rounded-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    width={56}
                    height={56}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-amber-500/40 mb-1 block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-amber-400/80 font-medium uppercase tracking-wider">
                    Learn more
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Tell us what you need and we will point you to the right service — or show you how a
            combination of them can work together.
          </p>
          <Link
            href="/#contact"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
          >
            Get a free consultation
          </Link>
        </div>
      </div>

      {/* JSON-LD CollectionPage + Service list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: collectionSchema }}
      />
    </main>
  );
}
