import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Laksya Groups services, pricing, timelines, and how we work. Get answers before you reach out.",
};

const faqs = [
  {
    question: "What services does Laksya Groups offer?",
    answer:
      "We offer 7 services under one roof: App & Web Development, Strategic Consultancy, Import & Export, Customer Support, Transport & Logistics, Tours & Travel, and professional training through Laksya Academy. You can use one service or all seven — we scale with your needs.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "A business website starts from ₹25,000 for a basic 5-page site. Complex web applications, e-commerce platforms, and custom dashboards range from ₹1,00,000 to ₹5,00,000 depending on features. We give fixed-price quotes after understanding your requirements — no surprises.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A simple business website takes 2-3 weeks. A web application with user accounts and database takes 4-8 weeks. A mobile app takes 8-12 weeks. We provide a detailed timeline before starting and hit our deadlines — that is something our clients consistently praise us for.",
  },
  {
    question: "Do you work with clients outside Bengaluru?",
    answer:
      "Yes. We work with clients across India and internationally. Our team operates remotely with regular video calls, shared project boards, and transparent communication. About 40% of our clients are outside Bengaluru, including international clients in the US, UK, and Southeast Asia.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our primary stack is Next.js, React, TypeScript, Supabase, and Tailwind CSS for web projects. For mobile apps, we use React Native. For backend services, we use Node.js and PostgreSQL. We choose technologies based on your specific needs, not trends.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "Yes. After launch, we offer monthly maintenance plans starting from ₹5,000/month that include hosting management, security updates, content changes, and technical support. Most clients find this more cost-effective than hiring a full-time developer.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "Every project gets a dedicated point of contact. We use shared project boards for transparency, weekly video calls for updates, and a direct WhatsApp line for urgent issues. You will always know what is happening with your project.",
  },
  {
    question: "Can you work with our existing design?",
    answer:
      "Absolutely. If you have designs from Figma, Adobe XD, or even hand-drawn wireframes, we can build from those. We also offer design services if you need help creating the visual direction first.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund if we have not started development. Once development begins, we refund for work not yet completed. We document everything in a clear scope agreement before starting so there are no misunderstandings.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the contact form on our website or email us at admin@lakshyagroups.in. We will schedule a free 30-minute consultation to understand your needs, then provide a detailed proposal with timeline and pricing. No commitment required.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
          Help Center
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-14">
          Everything you need to know before working with us. Still have
          questions?{" "}
          <Link href="/#contact" className="text-blue-400 hover:text-blue-300">
            Contact us
          </Link>{" "}
          — we reply within 24 hours.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none text-lg font-semibold hover:text-blue-400 transition-colors">
                {faq.question}
                <svg
                  className="w-5 h-5 shrink-0 text-neutral-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Still have questions?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            We are happy to help. Reach out and we will get back to you within
            24 hours.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
