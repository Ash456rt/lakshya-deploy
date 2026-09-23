"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

/* First-party review form → site_reviews (RLS: insert lands unapproved).
   Spam traps: honeypot field + minimum fill time. If Supabase is unreachable
   the form degrades to a mailto: handoff so no review is ever lost. */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const SERVICES = [
  "App & Web Development",
  "Strategic Consultancy",
  "Import & Export",
  "Customer Support",
  "Transport & Logistics",
  "Tours & Travel",
  "Lakshya Academy",
  "Other",
];

function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Your rating out of 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="text-2xl leading-none transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded"
          style={{ color: n <= shown ? "#e8a13d" : "#d6d3d1" }}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-xs text-stone-500">{value ? `${value}/5` : "Tap to rate"}</span>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg bg-white/85 border border-stone-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-violet transition-colors";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "mailto">("idle");
  const hp = useRef<HTMLInputElement>(null);
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);

    /* bot traps */
    if (String(fd.get("website") ?? "") !== "") return;
    if (Date.now() - startedAt.current < 4000) return;
    if (!rating) return;

    const payload = {
      name: String(fd.get("name") ?? "").trim().slice(0, 80),
      role: String(fd.get("role") ?? "").trim().slice(0, 80) || null,
      company: String(fd.get("company") ?? "").trim().slice(0, 80) || null,
      project: String(fd.get("project") ?? "").trim().slice(0, 80) || null,
      email: String(fd.get("email") ?? "").trim().slice(0, 120) || null,
      rating,
      quote: String(fd.get("quote") ?? "").trim().slice(0, 1200),
    };
    if (payload.name.length < 2 || payload.quote.length < 20) return;

    setState("sending");
    try {
      if (!SUPABASE_URL || !SUPABASE_ANON) throw new Error("not configured");
      const res = await fetch(`${SUPABASE_URL}/rest/v1/site_reviews`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      /* fallback: open prefilled email so the review still reaches us */
      const body = encodeURIComponent(
        `Review for Lakshya Groups\n\nName: ${payload.name}\nRole: ${payload.role ?? ""}\nCompany: ${payload.company ?? ""}\nService: ${payload.project ?? ""}\nRating: ${rating}/5\n\n${payload.quote}`,
      );
      window.location.href = `mailto:admin@lakshyagroups.in?subject=${encodeURIComponent("My Lakshya Groups review")}&body=${body}`;
      setState("mailto");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-stone-200 bg-white/60 p-8 text-center" id="review-form">
        <p className="text-3xl mb-3" aria-hidden="true">🙏</p>
        <h3 className="font-[family-name:var(--font-newsreader)] text-2xl text-ink mb-2">Thank you — received.</h3>
        <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          Your review is with our team for a quick check (to keep spam out). Approved reviews appear
          on this page within a day or two. Thank you for helping other businesses find us.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-stone-200 bg-white/60 p-6 sm:p-8" id="review-form">
      <h3 className="font-[family-name:var(--font-newsreader)] text-2xl text-ink mb-1.5">Worked with us?</h3>
      <p className="text-sm text-stone-500 mb-6">
        Your honest review helps other businesses decide. It is checked for spam, then published here.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">Your name *</span>
          <input name="name" required minLength={2} maxLength={80} className={inputCls} autoComplete="name" placeholder="Full name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">Role / Company</span>
          <input name="company" maxLength={80} className={inputCls} placeholder="e.g. Director, Acme Pvt Ltd" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">Which service?</span>
          <select name="project" className={inputCls} defaultValue="">
            <option value="">— Optional —</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">Email (never published)</span>
          <input name="email" type="email" maxLength={120} className={inputCls} autoComplete="email" placeholder="So we can verify & thank you" />
        </label>
      </div>

      <div className="mb-4">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">Your rating *</span>
        <Stars value={rating} onChange={setRating} />
      </div>

      <label className="block mb-4">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">Your experience *</span>
        <textarea name="quote" required minLength={20} maxLength={1200} rows={4} className={inputCls}
          placeholder="What did we build for you? How was communication, timing, support?" />
      </label>

      {/* honeypot — invisible to humans */}
      <input ref={hp} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <button
        type="submit"
        disabled={state === "sending" || !rating}
        className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {state === "sending" ? "Sending…" : "Submit review"}
      </button>
      {state === "mailto" && (
        <p className="mt-3 text-xs text-stone-500">Opening your email app — send it there and we will publish it.</p>
      )}
    </form>
  );
}
