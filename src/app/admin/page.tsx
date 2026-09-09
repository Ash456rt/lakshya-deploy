"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/portal/status-badge";

export default function AdminOverview() {
  const [stats, setStats] = useState<Array<{ label: string; value: number; href: string }>>([]);
  const [recentQuotes, setRecentQuotes] = useState<Array<{ id: string; service: string; status: string; created_at: string }>>([]);
  const [recentMessages, setRecentMessages] = useState<Array<{ id: string; name: string; email: string; service: string; status: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = createClient();

    Promise.all([
      admin.from("profiles").select("id", { count: "exact", head: true }),
      admin.from("client_projects").select("id", { count: "exact", head: true }),
      admin.from("quote_requests").select("id", { count: "exact", head: true }),
      admin.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
      admin.from("contact_messages").select("id", { count: "exact", head: true }),
      admin.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
      admin.from("quote_requests").select("id, service, status, created_at").order("created_at", { ascending: false }).limit(4),
      admin.from("contact_messages").select("id, name, email, service, status, created_at").order("created_at", { ascending: false }).limit(4),
    ]).then(([
      userCount, projectCount, quoteCount, pendingQuoteCount,
      messageCount, newMessageCount, quotes, messages,
    ]) => {
      setStats([
        { label: "Clients", value: userCount.count ?? 0, href: "/admin/users" },
        { label: "Projects", value: projectCount.count ?? 0, href: "/admin/projects" },
        { label: "Quotes", value: quoteCount.count ?? 0, href: "/admin/quotes" },
        { label: "Pending quotes", value: pendingQuoteCount.count ?? 0, href: "/admin/quotes" },
        { label: "Messages", value: messageCount.count ?? 0, href: "/admin/messages" },
        { label: "New messages", value: newMessageCount.count ?? 0, href: "/admin/messages" },
      ]);
      setRecentQuotes(quotes.data ?? []);
      setRecentMessages(messages.data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-stone-600">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Admin overview</h1>
        <p className="text-stone-600 mt-2">Everything happening across the site, at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="glass-dark rounded-2xl p-6 hover:bg-white transition-colors"
          >
            <p className="text-sm text-stone-600">{s.label}</p>
            <p className="text-3xl font-bold mt-1">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Latest quotes</h2>
            <Link href="/admin/quotes" className="text-sm text-accent hover:text-accent transition-colors">
              View all
            </Link>
          </div>
          {recentQuotes.length > 0 ? (
            <ul className="space-y-3">
              {recentQuotes.map((q) => (
                <li key={q.id} className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                  <p className="font-medium">{q.service}</p>
                  <StatusBadge status={q.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500">No quotes yet.</p>
          )}
        </section>

        <section className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Latest messages</h2>
            <Link href="/admin/messages" className="text-sm text-accent hover:text-accent transition-colors">
              View all
            </Link>
          </div>
          {recentMessages.length > 0 ? (
            <ul className="space-y-3">
              {recentMessages.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{m.name}</p>
                    <p className="text-xs text-stone-500 truncate">{m.email}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500">No messages yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
