import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Laksya Groups is a multi-service conglomerate based in Bengaluru, India - delivering app and web development, consultancy, import & export, customer support, transport, tours & travel, and Laksya Academy.',
};

const services = [
  { icon: '💻', title: 'App & Web Development', text: 'Modern websites and mobile apps built to convert visitors into customers.' },
  { icon: '📊', title: 'Strategic Consultancy', text: 'Practical roadmaps for technology, operations, and market entry.' },
  { icon: '🌍', title: 'Import & Export', text: 'Global trade support that connects Indian businesses to world markets.' },
  { icon: '🎧', title: 'Customer Support', text: 'Responsive support teams that keep your customers happy around the clock.' },
  { icon: '🚚', title: 'Transport & Logistics', text: 'Reliable movement of goods and people across India.' },
  { icon: '✈️', title: 'Tours & Travel', text: 'Curated travel experiences and hassle-free trip planning.' },
  { icon: '🎓', title: 'Laksya Academy', text: 'Training programs that build real, job-ready skills.' },
];

const stats = [
  { value: '7', label: 'Service Divisions' },
  { value: '50+', label: 'Countries Reached' },
  { value: '3', label: 'Case Studies Published' },
  { value: '8+', label: 'Years of Building' },
];

const values = [
  {
    title: 'One accountable partner',
    text: 'Seven services, one team, one point of contact. No finger-pointing between vendors when things matter.',
  },
  {
    title: 'Outcomes over output',
    text: 'We measure success by your growth - leads, sales, retention - not by how many pages we shipped.',
  },
  {
    title: 'Local roots, global reach',
    text: 'Headquartered in Bengaluru with operations and partners across 50+ countries.',
  },
  {
    title: 'Transparent pricing',
    text: 'Fixed scopes, clear timelines, and honest answers about what is included and what is not.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
            About Laksya Groups
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            One Partner. <span className="text-blue-500">Seven Services.</span>
            <br />
            Zero Drama.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            Laksya Groups is a multi-service conglomerate headquartered in
            Bengaluru, India. We help businesses move faster by handling their
            technology, operations, logistics, and learning under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Mission</h2>
            <p className="text-neutral-300 leading-relaxed">
              To empower businesses - from startups to enterprises - with
              cutting-edge technology, strategic consulting, and global
              solutions that turn ambition into measurable results.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Vision</h2>
            <p className="text-neutral-300 leading-relaxed">
              A world where every growing business has one trusted partner for
              everything it needs to scale - technology, trade, support, and
              talent.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">
            What We Do
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-blue-500/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-center">
            Why Businesses Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-8"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Let&apos;s build something together
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Tell us about your project and we will show you how one partner can
            handle it all.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
