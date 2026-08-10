import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';
import { SITE_URL } from '@/lib/site';
type Props = {
  params: Promise<{ slug: string }>;
};
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: '/blog/' + post.slug },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: '/blog/' + post.slug,
      publishedTime: post.date,
    },
  };
}
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-10 text-sm"
        >
          &larr; Back to blog
        </Link>
        <div className="flex items-center gap-3 mb-6 text-sm">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {post.category}
          </span>
          <span className="text-neutral-500">
            {post.date} · {post.readTime}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8">
          {post.title}
        </h1>
        <div className="space-y-8 mb-12">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold mb-3 text-blue-400">
                {section.heading}
              </h2>
              <p className="text-neutral-300 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to build with us?</h3>
          <p className="text-neutral-400 mb-6">
            Get a free consultation on your next project.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </article>
    </main>
  );
}
