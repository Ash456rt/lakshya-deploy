import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminNav } from "@/components/portal/admin-nav";
import { signOut } from "@/app/portal/actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await createAdminClient()
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) redirect("/portal");

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/laksya-logo.png"
              alt="Lakshya Groups"
              width={1240}
              height={799}
              unoptimized
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex rounded-full bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30 px-3 py-1 text-xs font-medium">
              Admin
            </span>
            <Link
              href="/portal"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Client portal
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-neutral-400 hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AdminNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
