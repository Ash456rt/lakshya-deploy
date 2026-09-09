"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Message = {
  from: "bot" | "user";
  text: string;
};

type Topic = {
  keywords: string[];
  reply: string;
};

// Keyword-matched answers. Ordered by specificity , first match wins.
const TOPICS: Topic[] = [
  {
    keywords: ["price", "pricing", "cost", "how much", "quote", "budget", "rate", "charge", "fee"],
    reply:
      "Pricing depends on what you need , a simple business site, a web app, or ongoing support. The fastest way to get a number is a free consultation: tell us your requirement and we'll send a clear, fixed quote. No hidden charges.",
  },
  {
    keywords: ["service", "what do you do", "what do you offer", "help with"],
    reply:
      "We handle 7 services under one roof: App & Web Development, Strategic Consultancy, Import & Export, Customer Support, Transport & Logistics, Tours & Travel, and Lakshya Academy (training).",
  },
  {
    keywords: ["website", "web development", "web site", "web design", "landing page", "seo"],
    reply:
      "We build fast, mobile-friendly websites that show up on Google , for businesses of every size. Every site ships with on-page SEO, analytics, and training so you can update it yourself.",
  },
  {
    keywords: ["app", "mobile app", "android", "ios"],
    reply:
      "We build web apps and mobile apps for Android and iOS. Tell us your idea in a free consultation and we'll suggest the simplest, most cost-effective approach.",
  },
  {
    keywords: ["consult", "consultancy", "consulting", "business advice", "strategy", "market entry"],
    reply:
      "Our consultancy team helps with market entry, vendor consolidation, and growth planning , practical roadmaps, not slide decks. We operate across India and 63 countries.",
  },
  {
    keywords: ["import", "export", "shipping goods", "customs", "trade"],
    reply:
      "We handle import & export end to end , documentation, customs clearance, and delivery coordination. Tell us the goods and destination and we'll map out the process.",
  },
  {
    keywords: ["logistics", "transport", "delivery", "warehouse", "cargo", "freight"],
    reply:
      "Our transport & logistics division covers road transport, warehousing, and last-mile delivery across India, with partner networks abroad.",
  },
  {
    keywords: ["travel", "tour", "trip", "holiday", "vacation", "package"],
    reply:
      "Lakshya Travels plans tours and holidays across India and abroad , custom itineraries, group trips, and corporate travel.",
  },
  {
    keywords: ["academy", "training", "course", "learn", "class", "internship", "student"],
    reply:
      "Lakshya Academy trains students and junior developers in practical, job-ready skills , web development, programming, and more, with real project work.",
  },
  {
    keywords: ["support", "customer support", "call center", "helpdesk", "outsourc"],
    reply:
      "We run customer support for other businesses , phone, email, and chat handling by a trained team, so you don't have to hire in-house.",
  },
  {
    keywords: ["contact", "phone", "call", "email", "whatsapp", "number", "talk to"],
    reply:
      "You can reach us at +91 99028 41875 (call or WhatsApp) or admin@lakshyagroups.in. Or fill the contact form and we'll reply within one business day.",
  },
  {
    keywords: ["where", "location", "address", "office", "bangalore", "bengaluru", "directions"],
    reply:
      "We're at 36/2, BEML Layout, Margondanahalli, Bengaluru 560036. Open Mon-Fri 9am-6pm, Sat 10am-2pm.",
  },
  {
    keywords: ["hour", "open", "timing", "when", "sunday", "saturday"],
    reply: "We're open Monday to Friday 9:00-18:00 and Saturday 10:00-14:00. Closed on Sundays.",
  },
  {
    keywords: ["portal", "login", "sign in", "account", "client login"],
    reply:
      "Clients can log in to the portal to track projects, quotes, and invoices. If you don't have an account yet, contact us and we'll set you up.",
  },
  {
    keywords: ["human", "agent", "real person", "someone", "representative"],
    reply:
      "Of course , call or WhatsApp +91 99028 41875 and you'll talk to a real person during working hours.",
  },
  {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste"],
    reply:
      "Hello! Welcome to Lakshya Groups. Ask me about our services, pricing, or how to reach the team.",
  },
  {
    keywords: ["thank", "thanks", "great", "nice", "ok", "okay"],
    reply: "Happy to help! Anything else you'd like to know?",
  },
];

const QUICK_REPLIES = ["Our services", "Pricing", "Contact us", "Our location"];

const FALLBACK =
  "I didn't fully catch that. I can help with our services, pricing, contact details, or the client portal , or reach the team directly at +91 99028 41875.";

const GREETING: Message = {
  from: "bot",
  text: "Hi there! I'm the Lakshya assistant. Ask me anything about our services, pricing, or how to get in touch.",
};

function findReply(input: string): string {
  const text = input.toLowerCase();
  for (const topic of TOPICS) {
    if (topic.keywords.some((k) => text.includes(k))) {
      return topic.reply;
    }
  }
  return FALLBACK;
}

export function Chatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the latest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, open]);

  // Focus the input when the panel opens (desktop only , avoids keyboard popping up on phones)
  useEffect(() => {
    if (open && window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    }
  }, [open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || isTyping) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text }]);
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: findReply(text) }]);
      setIsTyping(false);
    }, 500);
  };

  const toggle = () => {
    setOpen((o) => {
      if (!o) setUnread(false);
      return !o;
    });
  };

  // Stay out of internal areas (admin dashboard, client portal)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chat with Lakshya Groups"
            className="fixed z-40 flex flex-col overflow-hidden bg-[#0a0f1c] border border-stone-200 shadow-2xl shadow-black/50
                       inset-x-3 bottom-20 top-auto h-[min(70dvh,560px)] rounded-2xl
                       md:inset-x-auto md:right-6 md:bottom-24 md:w-96 md:h-[560px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-paper-deep border-b border-stone-200">
              <img
                src="/laksya-logo-300.webp"
                alt=""
                className="w-8 h-8 object-contain"
                width={32}
                height={32}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink leading-tight">Lakshya Assistant</p>
                <p className="text-xs text-stone-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Online , replies instantly
                </p>
              </div>
              <button
                onClick={toggle}
                aria-label="Close chat"
                className="p-2 -m-1 text-stone-500 hover:text-ink transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.from === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <p
                    className={
                      m.from === "user"
                        ? "max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-ink text-paper text-sm leading-relaxed"
                        : "max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-sm bg-stone-100/80 border border-stone-200/50 text-ink text-sm leading-relaxed"
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-stone-100/80 border border-stone-200/50 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}

              {/* Quick replies , only at the start of the conversation */}
              {messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="px-3.5 py-2 min-h-[40px] text-xs font-medium text-accent border border-accent/25 hover:bg-accent-soft rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 px-3 py-3 bg-paper border-t border-stone-200"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                aria-label="Type your question"
                className="flex-1 min-w-0 px-4 py-2.5 min-h-[44px] bg-transparent border border-stone-200 rounded-full text-ink placeholder-stone-600 focus:border-brand-violet/40 focus:outline-none text-[16px] md:text-sm"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isTyping}
                className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-ink hover:bg-[#3a352c] active:bg-[#2b2620] disabled:opacity-40 text-paper transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={toggle}
        aria-label={open ? "Close chat" : "Chat with us"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed z-40 bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 md:right-6 md:bottom-6
                   w-14 h-14 rounded-full bg-ink hover:bg-[#3a352c] active:bg-[#2b2620]
                   shadow-[0_18px_40px_-16px_rgba(32,28,22,0.5)] flex items-center justify-center text-paper
                   transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread dot , appears if the user hasn't opened the chat after the greeting */}
        {unread && !open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-paper" />
        )}
      </motion.button>
    </>
  );
}
