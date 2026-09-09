"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/portal/status-badge";

const STATUSES = ["in_progress", "on_hold", "completed"] as const;

const inputClasses =
  "w-full rounded-lg bg-white/85 border border-stone-300 px-3 py-2 text-sm text-ink outline-none focus:border-brand-violet";
const smallInputClasses =
  "rounded-lg bg-white/85 border border-stone-300 px-3 py-2 text-sm text-ink outline-none focus:border-brand-violet";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Array<{
    id: string; user_id: string; title: string; description?: string;
    status: string; progress: number; updated_at: string;
  }>>([]);
  const [profiles, setProfiles] = useState<Array<{ id: string; full_name?: string; company?: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Create form state
  const [newTitle, setNewTitle] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);

  const loadData = async () => {
    const admin = createClient();
    const [{ data: p }, { data: pr }] = await Promise.all([
      admin.from("client_projects").select("*").order("updated_at", { ascending: false }),
      admin.from("profiles").select("id, full_name, company").order("full_name"),
    ]);
    setProjects(p ?? []);
    setProfiles(pr ?? []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const byId = new Map(profiles.map((p) => [p.id, p]));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const admin = createClient();
    await admin.from("client_projects").insert({
      user_id: newUserId, title: newTitle, description: newDesc || null,
    });
    setNewTitle(""); setNewUserId(""); setNewDesc("");
    await loadData();
    setCreating(false);
  };

  const handleUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const status = fd.get("status") as string;
    const progress = Number(fd.get("progress"));
    const admin = createClient();
    await admin.from("client_projects").update({
      status, progress: Math.min(100, Math.max(0, Math.round(progress))),
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    await loadData();
  };

  if (loading) return <p className="text-stone-600">Loading…</p>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-stone-600 mt-2">Create projects for clients and keep progress up to date.</p>
      </div>

      <form onSubmit={handleCreate} className="glass-dark rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">New project</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-stone-800 mb-2" htmlFor="title">Project title</label>
            <input id="title" required placeholder="e.g. E-commerce Website" className={inputClasses} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-800 mb-2" htmlFor="user_id">Client</label>
            <select id="user_id" required className={inputClasses} value={newUserId} onChange={(e) => setNewUserId(e.target.value)}>
              <option value="" className="bg-white">Select a client…</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id} className="bg-white">
                  {p.full_name || p.id}{p.company ? ` (${p.company})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-800 mb-2" htmlFor="description">Description</label>
          <textarea id="description" rows={2} className={inputClasses} placeholder="What are we building?" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
        </div>
        <button type="submit" disabled={creating} className="rounded-lg bg-gradient-to-r from-brand-blue-deep to-brand-blue-deep hover:from-brand-violet hover:to-brand-violet-light text-ink text-sm font-semibold px-6 py-3 transition disabled:opacity-60">
          {creating ? "Creating…" : "Create project"}
        </button>
      </form>

      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((p) => {
            const profile = byId.get(p.user_id);
            return (
              <li key={p.id} className="glass-dark rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-xs text-stone-500 mt-1">
                      {profile?.full_name || "Unknown client"}
                      {profile?.company ? ` · ${profile.company}` : ""}
                    </p>
                    {p.description && <p className="text-sm text-stone-600 mt-1">{p.description}</p>}
                  </div>
                  <form onSubmit={(e) => handleUpdate(e, p.id)} className="flex flex-wrap items-end gap-3">
                    <input type="hidden" name="id" value={p.id} />
                    <div>
                      <label className="block text-xs text-stone-500 mb-1">Status</label>
                      <select name="status" defaultValue={p.status} className={smallInputClasses}>
                        {STATUSES.map((s) => <option key={s} value={s} className="bg-white">{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 mb-1">Progress %</label>
                      <input name="progress" type="number" min={0} max={100} defaultValue={p.progress} className={smallInputClasses + " w-20"} />
                    </div>
                    <button type="submit" className="rounded-lg bg-brand-violet/20 text-accent ring-1 ring-brand-violet/30 hover:bg-brand-violet/25 text-sm font-medium px-4 py-2 transition">
                      Update
                    </button>
                    <StatusBadge status={p.status} />
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-stone-500 glass-dark rounded-xl p-5">No projects yet , create the first one above.</p>
      )}
    </div>
  );
}
