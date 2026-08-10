import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/portal/status-badge";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: projects } = await supabase
    .from("client_projects")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My projects</h1>
        <p className="text-neutral-400 mt-2">
          Track the progress of the work we're doing for you.
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((p) => (
            <li key={p.id} className="glass-dark rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <StatusBadge status={p.status} />
              </div>
              {p.description && (
                <p className="text-neutral-400 text-sm mt-2">{p.description}</p>
              )}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                Last updated: {new Date(p.updated_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="glass-dark rounded-2xl p-10 text-center">
          <p className="text-neutral-400">No projects assigned yet.</p>
          <Link
            href="/portal/quote"
            className="inline-block mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold px-6 py-3 transition"
          >
            Request a quote
          </Link>
        </div>
      )}
    </div>
  );
}
