"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { posts } from "@/data/posts";

export function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="relative py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
            From Our Blog
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Insights & Guides
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Practical advice from our team on technology, business, and building
            things that actually work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-blue-500/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {post.category}
                  </span>
                  <span className="text-neutral-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-neutral-500">
                    {post.author.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-all text-sm font-medium"
          >
            View all articles
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
