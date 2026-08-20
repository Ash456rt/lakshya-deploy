import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/data/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on web development, app development, business consultancy, and how multi-service companies grow. Articles from the Laksya Groups team.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
          Insights &amp; Ideas
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          The Laksya Groups Blog
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-14">
          Practical advice on technology, business, and building with a partner
          that does more than one thing well.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={'/blog/' + post.slug}
              className="group rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-8 hover:border-blue-500/40 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {post.category}
                </span>
                <span className="text-neutral-500">
                  {post.date} · {post.readTime}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-neutral-400">{post.author.name}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium">
                Read article
                <span className="group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
