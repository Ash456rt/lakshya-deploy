"use client";
import React from "react";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Partners } from "@/components/sections/partners";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      {/* Skip to main content — accessibility + SEO signal */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Stats />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <BlogPreview />
        <SectionDivider />
        <Partners />
        <SectionDivider />
        <CTA />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
