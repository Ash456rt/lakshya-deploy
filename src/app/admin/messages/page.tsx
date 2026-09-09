"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Array<{
    id: string; name: string; email: string; service?: string;
    message: string; status: string; created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const admin = createClient();
    const { data } = await admin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const markRead = async (id: string) => {
    const admin = createClient();
    await admin.from("contact_messages").update({ status: "read" }).eq("id", id);
    await loadData();
  };

  if (loading) return <p className="text-stone-600">Loading…</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Contact messages</h1>
        <p className="text-stone-600 mt-2">
          Leads submitted through the contact form on the homepage.
        </p>
      </div>

      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl p-6 ${m.status === "new" ? "glass-dark ring-1 ring-brand-violet/30" : "bg-white/70"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-stone-600">
                    <a
                      href={`mailto:${m.email}`}
                      className="hover:text-accent transition-colors"
                    >
                      {m.email}
                    </a>
                    {m.service ? ` · ${m.service}` : ""}
                    {" · "}
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-stone-800 mt-2 whitespace-pre-wrap">
                    {m.message}
                  </p>
                </div>
                {m.status === "new" ? (
                  <button
                    onClick={() => markRead(m.id)}
                    className="rounded-lg bg-brand-violet/20 text-accent ring-1 ring-brand-violet/30 hover:bg-brand-violet/25 text-sm font-medium px-4 py-2 transition"
                  >
                    Mark as read
                  </button>
                ) : (
                  <span className="inline-flex rounded-full bg-neutral-500/10 text-stone-600 ring-1 ring-neutral-500/30 px-3 py-1 text-xs font-medium">
                    Read
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-stone-500 glass-dark rounded-xl p-5">
          No messages yet.
        </p>
      )}
    </div>
  );
}
