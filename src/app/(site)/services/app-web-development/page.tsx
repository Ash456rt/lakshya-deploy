import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
export const metadata: Metadata = {
  title: { absolute: "App & Web Development Company in Bengaluru | Lakshya Groups" },
  description: "Custom web and mobile app development in Bengaluru. Websites, web apps, e-commerce and APIs - fixed scopes, weekly demos, SEO built in.",
  alternates: { canonical: `${SITE_URL}/services/app-web-development` },
};
const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "App & Web Development",
  description: "Full-stack web and mobile app development. Websites, web apps, mobile apps, and custom software.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["IN", "US", "UK", "AE", "SG"],
  image: `${SITE_URL}/dev.webp`,
});
const faqs = [
  {
    q: "How much does a business website cost in Bengaluru?",
    a: "Most business websites we build cost between ₹40,000 and ₹1,50,000 depending on the number of pages, custom functionality and content work required. Web apps and e-commerce platforms are scoped individually. You always get a fixed quote before we start - no hourly billing surprises.",
  },
  {
    q: "How long does it take to build a website or web app?",
    a: "A marketing website typically launches in 3-5 weeks. Web apps with dashboards, booking systems or payments usually take 6-12 weeks. We ship in fixed scopes with weekly demos, so you see working progress every week instead of waiting months for a reveal.",
  },
  {
    q: "Do you also handle hosting, domain and maintenance?",
    a: "Yes. We deploy on fast, scalable infrastructure, connect your domain and SSL, and offer optional maintenance plans that cover updates, backups, monitoring and small content changes. You own the code and all accounts - no lock-in.",
  },
  {
    q: "Will my website rank on Google?",
    a: "We build every site with technical SEO as standard: semantic HTML, meta tags, structured data, sitemaps, fast load times and mobile-first design. Our client sites average 90+ Lighthouse scores. For competitive keywords we also offer ongoing SEO and content services.",
  },
  {
    q: "Can you redesign or fix our existing website?",
    a: "Yes. We start with a free audit of your current site covering performance, SEO and conversion issues, then propose either a focused redesign or a full rebuild - whichever gets you the better return. Existing content and URLs are preserved with proper redirects.",
  },
  {
    q: "Which technologies do you use?",
    a: "Next.js and React for web, React Native for mobile apps, Supabase or PostgreSQL for databases, and Tailwind CSS for design systems. We choose boring, proven technology that is cheap to maintain - not whatever trended last month.",
  },
];
const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
export default function AppWebDevPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-ink transition-colors">Services</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">App & Web Development</li>
          </ol>
        </nav>
        <div className="mb-24">
          <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">Service</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">App & Web Development</h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed mb-8">Full-stack development for web and mobile. We build with modern technologies and ship in fixed scopes with weekly demos.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300">Start a project<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-ink font-medium text-sm transition-colors duration-300">View all services</Link>
          </div>
        </div>
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we build</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100/30">
            {[{title:"Websites",text:"Marketing sites and content-driven sites that load fast and rank well."},{title:"Web apps",text:"Dashboards, SaaS products, booking platforms, and internal tools."},{title:"Mobile apps",text:"React Native and native iOS/Android apps."},{title:"Custom software",text:"APIs, automations, and integrations."}].map((item) => (
              <div key={item.title} className="bg-paper p-8 hover:bg-paper-deep/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How we work</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery & quote", text: "We map your goals, users and pages, then send a fixed quote and timeline within 48 hours. No discovery fees." },
              { step: "02", title: "Design", text: "Wireframes first, then polished screens in your brand. You approve the design before a line of code is written." },
              { step: "03", title: "Build & demo weekly", text: "We develop in short sprints and demo working software every week. Feedback goes straight into the next sprint." },
              { step: "04", title: "Launch & support", text: "We handle deployment, analytics, Search Console and redirects. Optional maintenance plans keep everything updated." },
            ].map((item) => (
              <div key={item.step} className="border-t-2 border-ink/10 pt-6">
                <span className="text-[11px] font-semibold tracking-[0.22em] text-ink-muted">{item.step}</span>
                <h3 className="text-base font-semibold text-ink mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technology we use</h2>
          <p className="text-stone-500 max-w-2xl leading-relaxed mb-10">
            Next.js for fast, SEO-friendly websites and web apps. React Native for mobile apps that share one codebase across iOS and Android.
            Supabase and PostgreSQL for databases without DevOps overhead. Tailwind CSS for consistent, maintainable design.
            Every choice is optimized for speed, uptime, and low long-term maintenance cost - and you own the complete codebase.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "300+", v: "projects delivered" },
              { k: "94", v: "avg. Lighthouse score" },
              { k: "3-5", v: "weeks to launch" },
              { k: "100%", v: "code ownership" },
            ].map((s) => (
              <div key={s.v} className="border border-stone-200/50 p-6 text-center">
                <p className="text-2xl font-bold">{s.k}</p>
                <p className="text-xs text-stone-500 mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
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
        <div className="border border-stone-200/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to build something?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">Tell us about your project and we will show you the right path.</p>
          <Link href="/#contact" className="px-8 py-3.5 bg-ink text-paper hover:bg-[#3a352c] font-medium text-sm transition-colors duration-300">Get in touch</Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    </main>
  );
}
