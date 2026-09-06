import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
export const metadata: Metadata = {
  title: "App & Web Development Company in Bengaluru | Lakshya Groups",
  description: "Custom web and mobile app development. Full-stack, modern stacks, fixed scopes, weekly demos.",
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
export default function AppWebDevPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">App & Web Development</li>
          </ol>
        </nav>
        <div className="mb-24">
          <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">Service</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl">App & Web Development</h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-8">Full-stack development for web and mobile. We build with modern technologies and ship in fixed scopes with weekly demos.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300">Start a project<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-300">View all services</Link>
          </div>
        </div>
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What we build</h2>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-800/30">
            {[{title:"Websites",text:"Marketing sites and content-driven sites that load fast and rank well."},{title:"Web apps",text:"Dashboards, SaaS products, booking platforms, and internal tools."},{title:"Mobile apps",text:"React Native and native iOS/Android apps."},{title:"Custom software",text:"APIs, automations, and integrations."}].map((item) => (
              <div key={item.title} className="bg-[#030712] p-8 hover:bg-zinc-900/30 transition-colors duration-300">
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-zinc-800/50 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to build something?</h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">Tell us about your project and we will show you the right path.</p>
          <Link href="/#contact" className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300">Get in touch</Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
    </main>
  );
}
