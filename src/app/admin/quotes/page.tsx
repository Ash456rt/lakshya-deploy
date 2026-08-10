import { createAdminClient } from "@/lib/supabase/admin";
import { StatusBadge } from "@/components/portal/status-badge";
import { updateQuoteStatus } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "quoted", "accepted", "declined"];

const inputClasses =
  "rounded-lg bg-neutral-900/80 border border-neutral-700 px-3 py-2 text-sm text-white outline-none focus:border-blue-500";

export default async function AdminQuotes() {
  const admin = createAdminClient();
  const [{ data: quotes }, { data: profiles }] = await Promise.all([
    admin
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false }),
    admin.from("profiles").select("id, full_name, email, company"),
  ]);

  const byId = new Map((profiles ?? []).map((p) => [p.id, p]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Quote requests</h1>
        <p className="text-neutral-400 mt-2">Review requests and update their status — clients see it instantly in their portal.</p>
      </div>

      {quotes && quotes.length > 0 ? (
        <ul className="space-y-4">
          {quotes.map((q) => {
            const profile = byId.get(q.user_id);
            return (
              <li key={q.id} className="glass-dark rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold">{q.service}</p>
                    <p className="text-sm text-neutral-400 mt-1">{q.details || "No details."}</p>
                    <p className="text-xs text-neutral-500 mt-2">
                      {profile?.full_name || "Unknown client"}
                      {profile?.email ? ` · ${profile.email}` : ""}
                      {profile?.company ? ` · ${profile.company}` : ""}
                      {" · "}
                      {new Date(q.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={q.status} />
                    <form action={updateQuoteStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={q.id} />
                      <select name="status" defaultValue={q.status} className={inputClasses}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-neutral-900">
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-lg bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30 hover:bg-amber-500/30 text-sm font-medium px-4 py-2 transition"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500 glass-dark rounded-xl p-5">No quote requests yet.</p>
      )}
    </div>
  );
}
