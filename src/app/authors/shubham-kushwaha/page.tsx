import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
export const metadata: Metadata = {
  title: "Shubham Kushwaha — Founder & CEO | Lakshya Groups",
  description: "Shubham Kushwaha is the founder and CEO of Lakshya Groups, a Bengaluru-based multi-service company.",
  alternates: { canonical: `${SITE_URL}/authors/shubham-kushwaha` },
};
const personSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shubham Kushwaha",
  jobTitle: "Founder & CEO",
  url: `${SITE_URL}/authors/shubham-kushwaha`,
  image: `${SITE_URL}/team.webp`,
  sameAs: ["https://linkedin.com/in/shubhamkushwaha"],
  worksFor: { "@id": `${SITE_URL}/#organization` },
});
export default function AuthorPage() {
  return <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24"><div className="max-w-4xl mx-auto px-6"><nav aria-label="Breadcrumb" className="mb-6"><ol className="flex items-center gap-2 text-xs text-zinc-600"><li><Link href="/" className="hover:text-white transition-colors">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-zinc-400">Authors</li><li aria-hidden="true">/</li><li aria-current="page" className="text-zinc-400">Shubham Kushwaha</li></ol></nav><div className="flex flex-col md:flex-row gap-8 mb-12"><div className="shrink-0">          <img src="/team.webp" alt="Shubham Kushwaha" className="w-28 h-28 rounded-2xl object-cover border-2 border-zinc-800" width={112} height={112} loading="lazy" /></div><div><h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Shubham Kushwaha</h1><p className="text-zinc-500 mb-4">Founder & CEO, Lakshya Groups</p><p className="text-zinc-500 max-w-2xl leading-relaxed">Full-stack developer and entrepreneur with 8+ years building web and mobile products. Leads Lakshya Groups technology and strategy divisions.</p><a href="https://linkedin.com/in/shubhamkushwaha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm transition-colors mt-6"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> LinkedIn</a></div></div><div className="border-t border-zinc-800/50 pt-12"><h2 className="text-2xl font-bold mb-6">What I write about</h2><div className="grid sm:grid-cols-2 gap-6">{["Web development","Choosing a development partner","Tech stack trade-offs","Business growth","SEO for business sites"].map((t) => <div key={t} className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-xl"><p className="text-zinc-300">{t}</p></div>)}</div><div className="mt-8"><h2 className="text-2xl font-bold mb-4">Articles by Shubham</h2><Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm transition-colors duration-300">Read the blog<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></div></div></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personSchema }} /></main>;
}
