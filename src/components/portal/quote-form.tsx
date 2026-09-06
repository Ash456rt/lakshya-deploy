"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const inputClasses =
  "w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition";

const services = [
  "App & Web Development",
  "Strategic Consultancy",
  "Import & Export",
  "Customer Support",
  "Transport & Logistics",
  "Tours & Travel",
  "Lakshya Academy",
];

export function QuoteForm() {
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setMsg("");
    setErr("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErr("You must be signed in.");
        return;
      }

      const { error } = await supabase.from("quote_requests").insert({
        user_id: user.id,
        service,
        details,
      });

      if (error) {
        setErr(error.message);
      } else {
        setMsg("Quote request submitted — we'll get back to you soon.");
        setService("");
        setDetails("");
      }
    } catch {
      setErr("Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-6 space-y-5">
      {msg && <p className="text-sm text-emerald-400">{msg}</p>}
      {err && <p className="text-sm text-red-400">{err}</p>}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-neutral-300 mb-2">
          Service
        </label>
        <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value)} className={inputClasses}>
          <option value="" className="bg-neutral-900">Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s} className="bg-neutral-900">
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-neutral-300 mb-2">
          What do you need?
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          required
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={inputClasses}
          placeholder="Tell us about your project or requirement…"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 transition"
      >
        {pending ? "Submitting…" : "Submit quote request"}
      </button>
    </form>
  );
}
