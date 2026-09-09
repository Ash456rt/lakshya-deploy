"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/portal/status-badge";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Array<{
    id: string;
    title: string;
    description?: string;
    status: string;
    progress: number;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("client_projects")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      setProjects(data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-stone-600">Loading…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My projects</h1>
        <p className="text-stone-600 mt-2">
          Track the progress of the work we&apos;re doing for you.
        </p>
      </div>

      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((p) => (
            <li key={p.id} className="glass-dark rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <StatusBadge status={p.status} />
              </div>
              {p.description && (
                <p className="text-stone-600 text-sm mt-2">{p.description}</p>
              )}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-paper-deep overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-violet-light transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-3">
                Last updated: {new Date(p.updated_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="glass-dark rounded-2xl p-10 text-center">
          <p className="text-stone-600">No projects assigned yet.</p>
          <Link
            href="/portal/quote"
            className="inline-block mt-4 rounded-lg bg-gradient-to-r from-brand-blue-deep to-brand-blue-deep hover:from-brand-violet hover:to-brand-violet-light text-ink text-sm font-semibold px-6 py-3 transition"
          >
            Request a quote
          </Link>
        </div>
      )}
    </div>
  );
}
