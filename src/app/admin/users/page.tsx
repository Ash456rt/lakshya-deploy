"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Array<{
    id: string; full_name?: string; company?: string; phone?: string;
    is_admin: boolean; created_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const admin = createClient();
    const { data } = await admin
      .from("profiles")
      .select("id, full_name, company, phone, is_admin, created_at")
      .order("created_at", { ascending: false });
    setProfiles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const toggleAdmin = async (id: string, currentIsAdmin: boolean) => {
    const admin = createClient();
    await admin.from("profiles").update({ is_admin: !currentIsAdmin }).eq("id", id);
    await loadData();
  };

  if (loading) return <p className="text-neutral-400">Loading…</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-neutral-400 mt-2">
          All registered clients. Admins can access the admin dashboard.
        </p>
      </div>

      {profiles.length > 0 ? (
        <ul className="space-y-4">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="glass-dark rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold">{p.full_name || "Unnamed client"}</p>
                <p className="text-sm text-neutral-400">
                  {p.company ? `${p.company}` : ""}
                  {p.phone ? ` · ${p.phone}` : ""}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Joined {new Date(p.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
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
                  onClick={() => toggleAdmin(p.id, p.is_admin)}
                  className="rounded-lg border border-neutral-700 hover:border-amber-500/50 hover:text-amber-300 text-sm px-4 py-2 transition"
                >
                  {p.is_admin ? "Remove admin" : "Make admin"}
                </button>
              </div>
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
