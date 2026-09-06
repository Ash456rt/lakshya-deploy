"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/portal";

    if (code) {
      const supabase = createClient();
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (!error) {
          router.push(next);
        } else {
          router.push("/login?error=1");
        }
      });
    } else {
      router.push("/login?error=1");
    }
  }, [searchParams, router]);

  return (
    <p className="text-neutral-400">Signing you in…</p>
  );
}

export default function AuthCallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-neutral-950 text-white">
      <Suspense fallback={<p className="text-neutral-400">Loading…</p>}>
        <AuthCallbackInner />
      </Suspense>
    </div>
  );
}
