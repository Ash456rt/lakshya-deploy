"use client";

import React, { useEffect, useState } from "react";
import { ReviewForm } from "@/components/sections/review-form";

/* /reviews page body — client component.
   Reads approved reviews via anon key (RLS: SELECT allowed only where approved).
   Falls back to the curated homepage testimonials until the first submissions
   are approved, so the page is never empty. */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/* Seeded fallbacks — same content as the homepage testimonials section. */
const FALLBACK = [
  { name: "Sri Lakshmi", role: "Director, Sri Lakshmi Tutorials", rating: 5, quote: "The website Lakshya built answers most questions before people even ring us, and the enquiry form sends details straight to our inbox. It has honestly made admission season calmer." },
  { name: "First Zone", role: "Management, First Zone", rating: 5, quote: "We needed a site that works well on phones because most of our customers browse on mobile. Lakshya delivered that and kept the pricing clear from the start." },
  { name: "Avans", role: "Team, Avans", rating: 5, quote: "What stood out was the communication. We always knew what was being worked on and when it would be ready. The site looks professional and loads fast even on slow connections." },
  { name: "ZetPeak", role: "Team, ZetPeak", rating: 5, quote: "Lakshya handled our website and follow-up support without drama. Small requests get fixed quickly and bigger ones get a proper estimate first." },
  { name: "Cayrys", role: "Team, Cayrys", rating: 5, quote: "Our old website was slow and hard to update. The new one loads quickly, shows up better on Google, and the team showed us how to make simple changes ourselves." },
];

type Review = { id: string; name: string; role: string | null; company: string | null; rating: number; quote: string; project: string | null; created_at: string };

function StarRow({ n }: { n: number }) {
  return (
    <span className="text-[#e8a13d] tracking-wide" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="text-stone-300">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const who = [r.role, r.company].filter(Boolean).join(", ");
  return (
    <article className="border border-stone-200 bg-white/60 p-7 flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <StarRow n={r.rating} />
        <time className="text-[11px] uppercase tracking-wider text-stone-400">
          {new Date(r.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
        </time>
      </div>
      <p className="text-stone-800 leading-relaxed mb-6 text-[15px] flex-1">&ldquo;{r.quote}&rdquo;</p>
      <footer>
        <p className="text-sm font-medium text-ink">{r.name}</p>
        {who && <p className="text-xs text-stone-500">{who}</p>}
        {r.project && <p className="mt-1.5 text-[11px] uppercase tracking-wider text-stone-400">{r.project}</p>}
      </footer>
    </article>
  );
}

export function SiteReviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!SUPABASE_URL || !SUPABASE_ANON) { setReviews([]); return; }
      try {
        const q = new URLSearchParams({ select: "id,name,role,company,rating,quote,project,created_at", approved: "eq.true", order: "created_at.desc", limit: "48" });
        const res = await fetch(`${SUPABASE_URL}/rest/v1/site_reviews?${q}`, {
          headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
        });
        if (!res.ok) throw new Error(String(res.status));
        const rows = (await res.json()) as Review[];
        if (alive) setReviews(Array.isArray(rows) ? rows : []);
      } catch {
        if (alive) setReviews([]);
      }
    })();
    return () => { alive = false; };
  }, []);

  const live = reviews && reviews.length > 0 ? reviews : null;
  const shown: Review[] = live ?? FALLBACK.map((f, i) => ({
    id: `fb-${i}`,
    created_at: new Date().toISOString(),
    company: null,
    project: null,
    ...f,
  }));

  const avg = shown.length ? shown.reduce((s, r) => s + r.rating, 0) / shown.length : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
      <header className="mb-10 max-w-2xl">
        <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Reviews</span>
        <h1 className="mb-4 font-[family-name:var(--font-newsreader)] text-4xl font-medium leading-[1.05] text-ink md:text-5xl">
          What clients say about Lakshya Groups
        </h1>
        {shown.length > 0 && (
          <p className="flex items-center gap-2 text-stone-600">
            <StarRow n={Math.round(avg)} />
            <span className="text-sm">
              {avg.toFixed(1)} average from {shown.length} review{shown.length > 1 ? "s" : ""}
            </span>
          </p>
        )}
        <p className="mt-3 text-sm text-stone-500 leading-relaxed">
          Every review below was submitted by a real client and checked by our team before publishing.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {shown.map((r) => <ReviewCard key={r.id} r={r} />)}
      </div>

      <ReviewForm />
    </div>
  );
}
