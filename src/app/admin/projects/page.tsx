import { createAdminClient } from "@/lib/supabase/admin";
import { StatusBadge } from "@/components/portal/status-badge";
import { createProject, updateProject } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const STATUSES = ["in_progress", "on_hold", "completed"];

const inputClasses =
  "w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-3 py-2 text-sm text-white outline-none focus:border-amber-500";
const smallInputClasses =
  "rounded-lg bg-neutral-900/80 border border-neutral-700 px-3 py-2 text-sm text-white outline-none focus:border-amber-500";

export default async function AdminProjects() {
  const admin = createAdminClient();
  const [{ data: projects }, { data: profiles }] = await Promise.all([
    admin
      .from("client_projects")
      .select("*")
      .order("updated_at", { ascending: false }),
    admin.from("profiles").select("id, full_name, company").order("full_name"),
  ]);

  const byId = new Map((profiles ?? []).map((p) => [p.id, p]));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-neutral-400 mt-2">Create projects for clients and keep progress up to date.</p>
      </div>

      {/* Create project */}
      <form action={createProject} className="glass-dark rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">New project</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="title">
              Project title
            </label>
            <input id="title" name="title" required placeholder="e.g. E-commerce Website" className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="user_id">
              Client
            </label>
            <select id="user_id" name="user_id" required className={inputClasses}>
              <option value="" className="bg-neutral-900">Select a client…</option>
              {(profiles ?? []).map((p) => (
                <option key={p.id} value={p.id} className="bg-neutral-900">
                  {p.full_name || p.id}
                  {p.company ? ` (${p.company})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="description">
            Description
          </label>
          <textarea id="description" name="description" rows={2} className={inputClasses} placeholder="What are we building?" />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white text-sm font-semibold px-6 py-3 transition"
        >
          Create project
        </button>
      </form>

      {/* Project list */}
      {projects && projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((p) => {
            const profile = byId.get(p.user_id);
            return (
              <li key={p.id} className="glass-dark rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {profile?.full_name || "Unknown client"}
                      {profile?.company ? ` · ${profile.company}` : ""}
                    </p>
                    {p.description && (
                      <p className="text-sm text-neutral-400 mt-1">{p.description}</p>
                    )}
                  </div>
                  <form action={updateProject} className="flex flex-wrap items-end gap-3">
                    <input type="hidden" name="id" value={p.id} />
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Status</label>
                      <select name="status" defaultValue={p.status} className={smallInputClasses}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-neutral-900">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Progress %</label>
                      <input
                        name="progress"
                        type="number"
                        min={0}
                        max={100}
                        defaultValue={p.progress}
                        className={smallInputClasses + " w-20"}
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-lg bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30 hover:bg-amber-500/30 text-sm font-medium px-4 py-2 transition"
                    >
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
        <p className="text-sm text-neutral-500 glass-dark rounded-xl p-5">No projects yet — create the first one above.</p>
      )}
    </div>
  );
}
