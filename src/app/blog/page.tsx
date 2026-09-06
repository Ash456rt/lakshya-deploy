import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Web Development & Business Insights | Lakshya Groups",
  description:
    "Insights on web development, app development, business consultancy, and how multi-service companies grow. Articles from the Lakshya Groups team in Bengaluru.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-600">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-400">
              Blog
            </li>
          </ol>
        </nav>

        <span className="inline-block px-2.5 py-0.5 mb-6 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
          Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          The Lakshya Groups Blog
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl mb-14">
          Practical advice on technology, business, and building with a partner
          that does more than one thing well.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={"/blog/" + post.slug}
              className="group block bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 p-8 transition-colors duration-500"
            >
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-zinc-600 text-xs">
                  {post.date} · {post.readTime}
                </time>
              </div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 overflow-hidden bg-zinc-800">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-zinc-600">{post.author.name}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-amber-400/80 text-xs font-medium tracking-wider uppercase">
                Read article
                <svg
                  className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
