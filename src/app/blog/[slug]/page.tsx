import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, type Post } from '@/data/posts';
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
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.linkedin || undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lakshya Groups',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/laksya-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/og-image.png`,
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-neutral-300">
              {post.title.length > 50 ? post.title.slice(0, 50) + '…' : post.title}
            </li>
          </ol>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-10 text-sm"
        >
          &larr; Back to blog
        </Link>
        <div className="flex items-center gap-3 mb-6 text-sm">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-neutral-500">
            {post.date} · {post.readTime}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {post.title}
        </h1>
        {/* Author Box */}
        <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-white/5 border border-white/10">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30"
            width={48}
            height={48}
            loading="lazy"
          />
          <div>
            <p className="font-semibold text-white">{post.author.name}</p>
            <p className="text-sm text-neutral-400">{post.author.role}</p>
          </div>
          {post.author.linkedin && (
            <a
              href={post.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-neutral-400 hover:text-amber-400 transition-colors"
              aria-label={`${post.author.name} LinkedIn profile`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
        <div className="space-y-8 mb-12">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold mb-3 text-amber-400">
                {section.heading}
              </h2>
              <p className="text-neutral-300 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center mb-12">
          <h3 className="text-xl font-bold mb-2">Ready to build with us?</h3>
          <p className="text-neutral-400 mb-6">
            Get a free consultation on your next project.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {posts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-amber-500/40 transition-all duration-300"
                >
                  <span className="text-xs text-amber-400 mb-2 block">
                    {related.category}
                  </span>
                  <h4 className="font-bold group-hover:text-amber-400 transition-colors mb-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-neutral-400 line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </main>
  );
}
