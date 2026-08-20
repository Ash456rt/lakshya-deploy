import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortalNav } from "@/components/portal/portal-nav";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/laksya-logo.png"
              alt="Laksya Groups"
              width={1240}
              height={799}
              unoptimized
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-6">
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
          <PortalNav isAdmin={!!profile?.is_admin} />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
