import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/portal/status-badge";
import { ProfileForm } from "@/components/portal/profile-form";

export const dynamic = "force-dynamic";

export default async function PortalOverview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, { data: projects }, { data: quotes }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("client_projects")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false }),
      supabase
        .from("quote_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

  const firstName =
    (profile?.full_name && profile.full_name.split(" ")[0]) ||
    (user.email ? user.email.split("@")[0] : "there");

  const totalProjects = projects?.length ?? 0;
  const activeProjects =
    projects?.filter((p) => p.status === "in_progress").length ?? 0;
  const totalQuotes = quotes?.length ?? 0;
  const recentProjects = (projects ?? []).slice(0, 3);
  const recentQuotes = (quotes ?? []).slice(0, 3);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {firstName}
        </h1>
        <p className="text-neutral-400 mt-2">
          Your account: {user.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-dark rounded-2xl p-6">
          <p className="text-sm text-neutral-400">Projects</p>
          <p className="text-3xl font-bold mt-1">{totalProjects}</p>
        </div>
        <div className="glass-dark rounded-2xl p-6">
          <p className="text-sm text-neutral-400">Active</p>
          <p className="text-3xl font-bold mt-1">{activeProjects}</p>
        </div>
        <div className="glass-dark rounded-2xl p-6">
          <p className="text-sm text-neutral-400">Quote requests</p>
          <p className="text-3xl font-bold mt-1">{totalQuotes}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent projects */}
        <section className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent projects</h2>
            <Link
              href="/portal/projects"
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              View all
            </Link>
          </div>
          {recentProjects.length > 0 ? (
            <ul className="space-y-4">
              {recentProjects.map((p) => (
                <li key={p.id} className="border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{p.title}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{p.progress}% complete</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">
              No projects yet.{" "}
              <Link href="/portal/quote" className="text-amber-400 hover:text-amber-300">
                Request a quote
              </Link>{" "}
              to get started.
            </p>
          )}
        </section>

        {/* Recent quotes */}
        <section className="glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent quote requests</h2>
            <Link
              href="/portal/quote"
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              View all
            </Link>
          </div>
          {recentQuotes.length > 0 ? (
            <ul className="space-y-4">
              {recentQuotes.map((q) => (
                <li key={q.id} className="border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{q.service}</p>
                    <StatusBadge status={q.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(q.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">No quote requests yet.</p>
          )}
        </section>
      </div>

      {/* Profile */}
      <section className="glass-dark rounded-2xl p-6 max-w-xl">
        <h2 className="font-semibold mb-4">Your profile</h2>
        <ProfileForm
          fullName={profile?.full_name ?? ""}
          company={profile?.company ?? ""}
          phone={profile?.phone ?? ""}
        />
      </section>
    </div>
  );
}
