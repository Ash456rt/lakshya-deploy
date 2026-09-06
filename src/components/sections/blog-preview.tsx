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
      className="relative py-32 bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-500/60 mb-4 block">
              Blog
            </span>
            <h2
              id="blog-heading"
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Latest insights
            </h2>
            <p className="text-zinc-500 leading-relaxed">
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
                    className="group block h-full bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 p-6 transition-colors duration-500"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-amber-400/80 bg-amber-500/5 border border-amber-500/10">
                        {post.category}
                      </span>
                      <span className="text-xs text-zinc-600">{post.readTime}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2.5 mt-auto">
                      <div className="w-6 h-6 overflow-hidden bg-zinc-800">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-zinc-600">
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
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-300 group"
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
