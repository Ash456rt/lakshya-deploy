import { createAdminClient } from "@/lib/supabase/admin";
import { markMessageRead } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const admin = createAdminClient();
  const { data: messages } = await admin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Contact messages</h1>
        <p className="text-neutral-400 mt-2">
          Leads submitted through the contact form on the homepage.
        </p>
      </div>

      {messages && messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl p-6 ${m.status === "new" ? "glass-dark ring-1 ring-amber-500/30" : "bg-neutral-900/40"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-neutral-400">
                    <a
                      href={`mailto:${m.email}`}
                      className="hover:text-amber-300 transition-colors"
                    >
                      {m.email}
                    </a>
                    {m.service ? ` · ${m.service}` : ""}
                    {" · "}
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-neutral-300 mt-2 whitespace-pre-wrap">
                    {m.message}
                  </p>
                </div>
                {m.status === "new" ? (
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <button
                      type="submit"
                      className="rounded-lg bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30 hover:bg-amber-500/30 text-sm font-medium px-4 py-2 transition"
                    >
                      Mark as read
                    </button>
                  </form>
                ) : (
                  <span className="inline-flex rounded-full bg-neutral-500/10 text-neutral-400 ring-1 ring-neutral-500/30 px-3 py-1 text-xs font-medium">
                    Read
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-neutral-500 glass-dark rounded-xl p-5">
          No messages yet.
        </p>
      )}
    </div>
  );
}
