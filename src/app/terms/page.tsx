import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using Laksya Groups services. Read our policies on payments, refunds, intellectual property, and more.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-6">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Terms of Service
        </h1>
        <p className="text-neutral-500 mb-12">Last updated: August 20, 2026</p>

        <div className="space-y-8 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the services provided by Laksya Groups
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to
              be bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              2. Services
            </h2>
            <p>
              Laksya Groups provides technology development, business
              consultancy, import and export solutions, customer support,
              transport and logistics, tours and travel, and professional
              training services. The specific scope, deliverables, and timelines
              for each project are defined in a separate agreement or statement
              of work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              3. Payment Terms
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Payment terms are outlined in each project agreement.
              </li>
              <li>
                A 50% advance is typically required before work begins.
              </li>
              <li>
                Remaining balance is due upon project completion and delivery.
              </li>
              <li>
                Late payments may incur a 2% monthly interest charge.
              </li>
              <li>
                All prices are in Indian Rupees (INR) unless otherwise stated.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              4. Refund Policy
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Full refund if development has not started.
              </li>
              <li>
                Partial refund for work not yet completed once development has
                begun.
              </li>
              <li>
                No refund for completed and delivered work.
              </li>
              <li>
                Refund requests must be submitted in writing within 7 days of
                the issue.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              5. Intellectual Property
            </h2>
            <p>
              Upon full payment, the client receives ownership of all custom
              code, designs, and deliverables created specifically for their
              project. Laksya Groups retains ownership of any pre-existing
              tools, libraries, frameworks, or components used in the
              development process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              6. Confidentiality
            </h2>
            <p>
              Both parties agree to keep confidential any proprietary
              information shared during the course of the project. This includes
              business strategies, technical specifications, customer data, and
              financial information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              Laksya Groups shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services. Our
              total liability shall not exceed the total amount paid by the
              client for the specific project in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              8. Termination
            </h2>
            <p>
              Either party may terminate a project with 15 days written notice.
              The client is responsible for payment of all work completed up to
              the termination date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              9. Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a
                href="mailto:admin@lakshyagroups.in"
                className="text-blue-400 hover:text-blue-300"
              >
                admin@lakshyagroups.in
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919902841875"
                className="text-blue-400 hover:text-blue-300"
              >
                +91 99028 41875
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <Link
            href="/privacy"
            className="px-6 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-colors text-center"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
