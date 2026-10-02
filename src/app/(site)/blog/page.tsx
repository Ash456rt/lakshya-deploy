import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Blog | Web Development & Business Insights | Lakshya Groups" },
  description:
    "Insights on web development, app development, business consultancy, and how multi-service companies grow. Articles from the Lakshya Groups team in Bengaluru.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-paper text-ink pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-500">
              Blog
            </li>
          </ol>
        </nav>

        <span className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          The Lakshya Groups Blog
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mb-14">
          Practical advice on technology, business, and building with a partner
          that does more than one thing well.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={"/blog/" + post.slug}
              className="group block bg-paper-deep/30 border border-stone-200/50 hover:border-stone-400/50 p-8 transition-colors duration-500"
            >
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-stone-500 text-xs">
                  {post.date} · {post.readTime}
                </time>
              </div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 overflow-hidden bg-stone-100">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-stone-500">{post.author.name}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-brand-violet-light transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-brand-violet-light/90 text-xs font-medium tracking-wider uppercase">
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
