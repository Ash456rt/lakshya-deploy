import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { SiteReviews } from "@/components/sections/site-reviews";

const SITE = "https://lakshyagroups.in";

export const metadata: Metadata = {
  title: "Client Reviews | Lakshya Groups Bengaluru",
  description:
    "Read verified client reviews of Lakshya Groups — web development, consultancy, logistics and training in Bengaluru. Submit your own review in two minutes.",
  alternates: { canonical: `${SITE}/reviews` },
  openGraph: {
    title: "Client Reviews | Lakshya Groups Bengaluru",
    description: "Verified client reviews of Lakshya Groups — submit your own in two minutes.",
    url: `${SITE}/reviews`,
  },
};

/* FAQ schema — honest review-policy answers (no fabricated ratings). */
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are these reviews verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every review on this page was submitted through our own review form and manually checked by our team before publishing. We keep the reviewer's email private and never edit the wording of a review.",
      },
    },
    {
      "@type": "Question",
      name: "How can I leave a review for Lakshya Groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the review form on this page — rate your experience out of 5 and describe the work we did for you. Reviews are checked for spam and usually published within a day or two.",
      },
    },
    {
      "@type": "Question",
      name: "Do you remove negative reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We publish critical reviews too — they are how we improve. We only reject spam, reviews left for the wrong company, and text containing abuse or private data.",
      },
    },
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Navbar />
      <main className="min-h-screen bg-paper text-ink">
        <SiteReviews />
      </main>
      <Footer />
    </>
  );
}
