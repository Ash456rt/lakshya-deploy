"use client";

import React, { useActionState } from "react";
import { submitQuote, type QuoteState } from "@/app/portal/actions";

const initialState: QuoteState = {};

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
  const [state, formAction, pending] = useActionState(submitQuote, initialState);

  return (
    <form action={formAction} className="glass-dark rounded-2xl p-6 space-y-5">
      {state.message && (
        <p className="text-sm text-emerald-400">{state.message}</p>
      )}
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-neutral-300 mb-2">
          Service
        </label>
        <select id="service" name="service" required className={inputClasses}>
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
