"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/portal/status-badge";
import { QuoteForm } from "@/components/portal/quote-form";

export default function QuotePage() {
  const [quotes, setQuotes] = useState<Array<{
    id: string;
    service: string;
    details?: string;
    status: string;
    created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setQuotes(data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-stone-600">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Request a quote</h1>
        <p className="text-stone-600 mt-2">
          Tell us what you need , we usually respond within one business day.
        </p>
      </div>

      <QuoteForm />

      <div>
        <h2 className="text-xl font-semibold mb-4">My requests</h2>
        {quotes.length > 0 ? (
          <ul className="space-y-4">
            {quotes.map((q) => (
              <li key={q.id} className="glass-dark rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium">{q.service}</p>
                    <p className="text-sm text-stone-600 mt-1">
                      {q.details || "No details provided."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500">
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                    <StatusBadge status={q.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-stone-500 glass-dark rounded-xl p-5">
            No requests yet , use the form above to ask for a quote.
          </p>
        )}
      </div>
    </div>
  );
}
