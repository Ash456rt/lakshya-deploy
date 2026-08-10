import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/portal/status-badge";
import { QuoteForm } from "@/components/portal/quote-form";

export const dynamic = "force-dynamic";

export default async function QuotePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Request a quote</h1>
        <p className="text-neutral-400 mt-2">
          Tell us what you need — we usually respond within one business day.
        </p>
      </div>

      <QuoteForm />

      <div>
        <h2 className="text-xl font-semibold mb-4">My requests</h2>
        {quotes && quotes.length > 0 ? (
          <ul className="space-y-4">
            {quotes.map((q) => (
              <li key={q.id} className="glass-dark rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium">{q.service}</p>
                    <p className="text-sm text-neutral-400 mt-1">
                      {q.details || "No details provided."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500">
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                    <StatusBadge status={q.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500 glass-dark rounded-xl p-5">
            No requests yet — use the form above to ask for a quote.
          </p>
        )}
      </div>
    </div>
  );
}
