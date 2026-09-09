"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const contactMethods = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "admin@lakshyagroups.in",
    href: "mailto:admin@lakshyagroups.in",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 99028 41875",
    href: "tel:+919902841875",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Address",
    value: "36/2, Beml Layout, Margondanahalli, Bengaluru 560036",
    href: "#",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      if (formData.get("_honey")) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", service: "", message: "" });
        return;
      }

      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const service = String(formData.get("service") ?? "").trim();
      const message = String(formData.get("message") ?? "").trim();

      if (!name || !email || !message) {
        throw new Error("Please fill in all required fields.");
      }

      const supabase = createClient();
      const { error } = await supabase
        .from("contact_messages")
        .insert({ name, email, service: service || null, message });

      if (error) throw new Error("Something went wrong. Please try again.");

      setSubmitStatus("success");
      setFormState({ name: "", email: "", service: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 min-h-[48px] bg-transparent border border-stone-200 text-ink placeholder-stone-600 focus:border-brand-violet/40 focus:outline-none transition-colors duration-300 text-base sm:text-sm";

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-16 sm:py-20 md:py-32 bg-paper overflow-hidden"
    >
      {/* Parallax background accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] will-change-transform"
      >
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, rgba(36,51,179,1) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Contact
            </span>
            <h2
              id="contact-heading"
              className="mb-5 font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl"
            >
              Start a conversation
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Have a project in mind? Reach out and let us discuss how we
              can help.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form id="contact-tour-target" onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={inputClasses}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={inputClasses}
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">
                  Service
                </label>
                <select
                  name="service"
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className={inputClasses + " appearance-none"}
                  required
                >
                  <option value="" className="bg-paper">Select a service</option>
                  <option value="development" className="bg-paper">App & Web Development</option>
                  <option value="consultancy" className="bg-paper">Strategic Consultancy</option>
                  <option value="import-export" className="bg-paper">Import & Export</option>
                  <option value="customer-support" className="bg-paper">Customer Support</option>
                  <option value="transport" className="bg-paper">Transport & Logistics</option>
                  <option value="travel" className="bg-paper">Tours & Travel</option>
                  <option value="academy" className="bg-paper">Lakshya Academy</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className={inputClasses + " resize-none"}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {submitStatus === "success" && (
                <p className="px-4 py-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200">
                  Thank you! Your message has been sent.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="px-4 py-3 text-sm text-red-700 bg-red-50 border border-red-200">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 min-h-[52px] bg-ink text-paper hover:bg-[#3a352c] active:bg-[#2b2620] font-medium text-base sm:text-sm transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </motion.div>

          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="space-y-6"
          >
            {contactMethods.map((method, index) => (
              <a
                key={method.label}
                href={method.href}
                className="group flex items-start gap-4 p-5 bg-paper-deep/30 border border-stone-200/50 hover:border-stone-400/50 transition-colors duration-300"
              >
                <div className="text-stone-500 group-hover:text-brand-violet-light transition-colors duration-300 mt-0.5 shrink-0">
                  {method.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
                    {method.label}
                  </p>
                  <p className="text-sm text-ink">{method.value}</p>
                </div>
              </a>
            ))}

            {/* Map */}
            <div className="relative h-56 overflow-hidden border border-stone-200/50">
              <iframe
                src="https://www.google.com/maps?q=Lakshya%20Groups%2C%20Maragondanahalli%20Main%20Rd%2C%20TC%20Palya%2C%20Bengaluru%2C%20Karnataka%20560036&z=16&output=embed"
                className="w-full h-full border-0 grayscale opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lakshya Groups office location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
