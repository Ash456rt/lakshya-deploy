"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  message?: string;
};

export async function login(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const next = formData.get("next") as string;
  redirect(isSafeNext(next) ? next : "/portal");
}

// Only allow internal paths to avoid open redirects.
function isSafeNext(next: string): boolean {
  return next.startsWith("/") && !next.startsWith("//");
}

export async function signup(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) {
    return { error: error.message };
  }

  // If a session exists immediately, email confirmation is disabled.
  if (data.session) {
    redirect("/portal");
  }

  return {
    message: "Check your inbox for a confirmation link, then sign in.",
  };
}
