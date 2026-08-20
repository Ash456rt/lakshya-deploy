"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlowCard } from "@/components/ui/glow-card";
import { submitContact } from "@/app/actions/contact";

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Email Us",
    description: "admin@lakshyagroups.in",
    link: "mailto:admin@lakshyagroups.in",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Call Us",
    description: "+91 99028 41875",
    link: "tel:+919902841875",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Visit Us",
    description:
      "36/2, Beml Layout, Margondanahalli, Bengaluru, Karnataka 560036, India",
    link: "#",
  },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      // Saved straight into the Supabase database via a server action
      // (service-role key stays server-side, spam honeypot preserved).
      const result = await submitContact(formData);
      if (!result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSubmitStatus("success");
      setFormState({ name: "", email: "", service: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Network error. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-32 bg-neutral-950 overflow-hidden">
      <Spotlight
        className="absolute inset-0 pointer-events-none"
        spotlightColor="rgba(245, 158, 11, 0.08)"
        spotlightSize={600}
      />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/[0.06] rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="heading-section text-white mb-4">
            Let&apos;s Start Something{' '}
            <span className="text-amber-400">
              Great
            </span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Ready to transform your business? Reach out and let's discuss how we
            can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GlowCard glowColor="rgba(245, 158, 11, 0.15)">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formState.service}
                      onChange={(e) =>
                        setFormState({ ...formState, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="development">App & Web Development</option>
                    <option value="consultancy">Strategic Consultancy</option>
                    <option value="import-export">Import & Export</option>
                    <option value="customer-support">Customer Support</option>
                    <option value="transport">Transport & Logistics</option>
                    <option value="travel">Tours & Travel</option>
                    <option value="academy">Laksya Academy</option>
                  </select>
                </div>
                <div>                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                {submitStatus === "success" && (
                  <p className="text-sm font-medium text-green-500 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    Thank you! Your message has been sent — we will get back to
                    you soon.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {errorMessage}
                  </p>
                )}
                <MagneticButton
                  type="submit"
                  className="w-full !bg-amber-600 hover:!bg-amber-500"
                  strength={0.1}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    "Get a Free Consultation"
                  )}
                </MagneticButton>
              </form>
            </GlowCard>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.link}
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <GlowCard glowColor="rgba(245, 158, 11, 0.15)">
                  <div className="flex items-center gap-4">
                    <div className="text-amber-400">{method.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {method.title}
                      </h3>
                      <p className="text-zinc-400">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.a>
            ))}

            {/* Office location map */}
            <motion.div
              className="relative h-64 rounded-3xl overflow-hidden border border-white/[0.06]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <iframe
                src="https://www.google.com/maps?q=Lakshya%20Groups%2C%20Maragondanahalli%20Main%20Rd%2C%20TC%20Palya%2C%20Bengaluru%2C%20Karnataka%20560036&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Laksya Groups office location"
              />
              <a
                href="https://maps.app.goo.gl/DpEYMx76VAuJdErv8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-xs font-semibold text-neutral-900 shadow-lg hover:bg-white transition-colors"
              >
                Open in Google Maps
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
