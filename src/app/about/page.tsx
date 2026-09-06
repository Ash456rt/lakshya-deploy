import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Lakshya Groups | Bengaluru IT Company",
  description:
    "Lakshya Groups is a Bengaluru-based multi-service company offering app & web development, consultancy, import & export, customer support, transport, tours & travel, and training through Lakshya Academy.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const services = [
  { icon: "01", title: "App & Web Development", text: "Websites and mobile apps that convert." },
  { icon: "02", title: "Strategic Consultancy", text: "Roadmaps that actually get executed." },
  { icon: "03", title: "Import & Export", text: "Global trade, simplified." },
  { icon: "04", title: "Customer Support", text: "24/7 support that keeps customers happy." },
  { icon: "05", title: "Transport & Logistics", text: "Goods and people, moving reliably." },
  { icon: "06", title: "Tours & Travel", text: "Curated travel, hassle-free planning." },
  { icon: "07", title: "Lakshya Academy", text: "Training that builds job-ready skills." },
];

const values = [
  {
    title: "One accountable partner",
    text: "Seven services, one team. No finger-pointing between vendors.",
  },
  {
    title: "Outcomes over output",
    text: "We measure by your growth, not by pages shipped.",
  },
  {
    title: "Local roots, global reach",
    text: "Bengaluru headquarters. 50+ countries served.",
  },
  {
    title: "Transparent pricing",
    text: "Fixed scopes, clear timelines, honest answers.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">
              About
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
            About
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            One partner.
            <br />
            <span className="text-zinc-600">Seven services.</span>
            <br />
            Zero drama.
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Lakshya Groups is a multi-service company headquartered in
            Bengaluru. We help businesses move faster by handling their
            technology, operations, logistics, and learning under one roof.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30 mb-24">
          <div className="bg-[#030712] p-10">
            <span className="text-[10px] font-medium tracking-wider uppercase text-amber-500/60 mb-4 block">
              Mission
            </span>
            <p className="text-zinc-400 leading-relaxed">
              To give businesses reliable technology, practical consulting,
              and global solutions that turn ambition into measurable results.
            </p>
          </div>
          <div className="bg-[#030712] p-10">
            <span className="text-[10px] font-medium tracking-wider uppercase text-amber-500/60 mb-4 block">
              Vision
            </span>
            <p className="text-zinc-400 leading-relaxed">
              A world where every growing business has one trusted partner
              for everything it needs to scale.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/30">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300"
              >
                <span className="text-xs font-mono text-amber-500/40 mb-4 block">
                  {service.icon}
                </span>
                <h3 className="text-base font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500">{service.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why businesses choose us</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="group">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Let&apos;s build something together
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Tell us about your project and we will show you how one partner
            can handle it all.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300"
            >
              Get in touch
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-300"
            >
              Read our blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
