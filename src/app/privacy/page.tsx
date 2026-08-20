import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lakshya Groups collects, uses, and protects your personal information. Our commitment to your privacy.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${SITE_URL}/privacy`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
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
            <li aria-current="page" className="text-neutral-300">
              Privacy Policy
            </li>
          </ol>
        </nav>

        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 mb-12">Last updated: August 20, 2026</p>

        <div className="space-y-8 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              1. Information We Collect
            </h2>
            <p>We collect information you provide directly to us:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>
                <strong>Contact information:</strong> Name, email address, phone
                number when you fill out our contact form or inquiry.
              </li>
              <li>
                <strong>Project information:</strong> Business details,
                requirements, and specifications you share during consultations.
              </li>
              <li>
                <strong>Account information:</strong> Login credentials if you
                create a client portal account.
              </li>
              <li>
                <strong>Payment information:</strong> Billing details processed
                through secure third-party payment processors.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and improve our services.</li>
              <li>To communicate about your projects and inquiries.</li>
              <li>To send relevant updates about our services (with your
                consent).</li>
              <li>To process payments and maintain financial records.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              3. Information Sharing
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>
                Service providers who help us deliver our services (hosting,
                analytics, payment processing).
              </li>
              <li>
                Legal authorities when required by law or to protect our rights.
              </li>
              <li>
                With your explicit consent for specific purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              information, including encrypted data transmission (SSL/TLS),
              secure server infrastructure, and access controls. However, no
              method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              5. Cookies and Analytics
            </h2>
            <p>
              We use cookies and Google Analytics to understand how visitors
              interact with our website. This helps us improve our content and
              user experience. You can disable cookies in your browser settings,
              though some features may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              6. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Access:</strong> Request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate
                data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data.
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain your personal information only for as long as necessary
              to provide our services and fulfill the purposes described in this
              policy. Project data is retained for 2 years after project
              completion unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any significant changes by posting the new policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-400 mb-3">
              9. Contact Us
            </h2>
            <p>
              For questions about this privacy policy, contact us at{" "}
              <a
                href="mailto:admin@lakshyagroups.in"
                className="text-amber-400 hover:text-amber-300"
              >
                admin@lakshyagroups.in
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919902841875"
                className="text-amber-400 hover:text-amber-300"
              >
                +91 99028 41875
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <Link
            href="/terms"
            className="px-6 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-colors text-center"
          >
            Terms of Service
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
