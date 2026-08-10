import { createAdminClient } from "@/lib/supabase/admin";
import { toggleAdmin } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const admin = createAdminClient();
  const [{ data: profiles }, { data: users }] = await Promise.all([
    admin
      .from("profiles")
      .select("id, full_name, company, phone, is_admin, created_at")
      .order("created_at", { ascending: false }),
    admin.auth.admin.listUsers(),
  ]);

  const emails = new Map((users?.users ?? []).map((u) => [u.id, u.email]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-neutral-400 mt-2">
          All registered clients. Admins can access the admin dashboard.
        </p>
      </div>

      {profiles && profiles.length > 0 ? (
        <ul className="space-y-4">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="glass-dark rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold">{p.full_name || "Unnamed client"}</p>
                <p className="text-sm text-neutral-400">
                  {emails.get(p.id) ?? "no email"}
                  {p.company ? ` · ${p.company}` : ""}
                  {p.phone ? ` · ${p.phone}` : ""}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Joined {new Date(p.created_at).toLocaleDateString()}
                </p>
              </div>
              <form action={toggleAdmin} className="flex items-center gap-3">
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="is_admin" value={p.is_admin ? "0" : "1"} />
                <span
                  className={
                    p.is_admin
                      ? "inline-flex rounded-full bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30 px-3 py-1 text-xs font-medium"
                      : "inline-flex rounded-full bg-neutral-500/10 text-neutral-300 ring-1 ring-neutral-500/30 px-3 py-1 text-xs font-medium"
                  }
                >
                  {p.is_admin ? "Admin" : "Client"}
                </span>
                <button
                  type="submit"
                  className="rounded-lg border border-neutral-700 hover:border-amber-500/50 hover:text-amber-300 text-sm px-4 py-2 transition"
                >
                  {p.is_admin ? "Remove admin" : "Make admin"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500 glass-dark rounded-xl p-5">
          No users yet.
        </p>
      )}
    </div>
  );
}
