"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlowCard } from "@/components/ui/glow-card";

const FORMGRID_ENDPOINT = "https://formgrid.dev/api/f/atyrgcpb";

const contactMethods = [
  {
    icon: "📧",
    title: "Email Us",
    description: "admin@lakshyagroups.in",
    link: "mailto:admin@lakshyagroups.in",
  },
  {
    icon: "📞",
    title: "Call Us",
    description: "+91 99028 41875",
    link: "tel:+919902841875",
  },
  {
    icon: "📍",
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
      const response = await fetch(FORMGRID_ENDPOINT, {
        method: "POST",
        redirect: "manual",
        body: formData,
      });

      // FormGrid answers with a 302 redirect to its success page; treat the
      // redirect (or a 2xx) as a successful submission regardless of the
      // CORS headers served by the redirect target.
      const submitted = response.type === "opaqueredirect" || response.ok;
      if (!submitted) {
        throw new Error("Something went wrong. Please try again.");
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
    <section id="contact" className="relative py-32 bg-neutral-950 overflow-hidden">
      <Spotlight
        className="absolute inset-0 pointer-events-none"
        spotlightColor="rgba(147, 51, 234, 0.1)"
        spotlightSize={600}
      />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"
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
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-pink-400 bg-pink-500/10 border border-pink-500/20 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's Start{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
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
            <GlowCard glowColor="rgba(236, 72, 153, 0.3)">
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
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={(e) =>
                      setFormState({ ...formState, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
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
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
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
                  className="w-full !bg-gradient-to-r from-pink-600 to-purple-600"
                  strength={0.1}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    "Send Message"
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
                <GlowCard glowColor="rgba(59, 130, 246, 0.3)">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{method.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {method.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.a>
            ))}

            {/* Office location map */}
            <motion.div
              className="relative h-64 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <iframe
                src="https://www.google.com/maps?q=Lakshya%20Groups%2C%20Maragondanahalli%20Main%20Rd%2C%20TC%20Palya%2C%20Bengaluru%2C%20Karnataka%20560036&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lakshya Groups office location"
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
