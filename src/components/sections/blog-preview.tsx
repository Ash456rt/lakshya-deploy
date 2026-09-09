"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { posts } from "@/data/posts";

export function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const latestPosts = posts.slice(0, 3);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative py-16 sm:py-20 md:py-32 bg-paper"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Blog
            </span>
            <h2
              id="blog-heading"
              className="mb-5 font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl"
            >
              Latest insights
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Practical advice from our team on technology, business, and building
              things that work.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {latestPosts.map((post, index) => {
            const PostCard = () => {
              const cardRef = useRef<HTMLDivElement>(null);
              const cardInView = useInView(cardRef, { once: true, margin: "-40px" });

              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 25 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full bg-paper-deep/30 border border-stone-200/50 hover:border-stone-400/50 p-6 transition-colors duration-500"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-base font-semibold text-ink mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2.5 mt-auto">
                      <div className="w-6 h-6 overflow-hidden bg-stone-100">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-stone-500">
                        {post.author.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            };
            return <PostCard key={post.slug} />;
          })}
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-ink transition-colors duration-300 group"
        >
          View all articles
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
