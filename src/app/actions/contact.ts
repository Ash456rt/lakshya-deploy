"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export type ContactResult = {
  ok: boolean;
  error?: string;
};

// Simple in-memory rate limiter (per server instance): blocks spam floods
// of the contact form while keeping legitimate users friction-free.
const SUBMISSION_WINDOW_MS = 30_000; // one submission per 30s
const recentSubmissions = new Map<string, number>();

export async function submitContact(
  formData: FormData
): Promise<ContactResult> {
  // Honeypot: bots fill this hidden field — silently drop them.
  if (formData.get("_honey")) {
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  // Keep payloads sane so spam cannot flood the database with giant rows.
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return { ok: false, error: "Please shorten your message and try again." };
  }

  const now = Date.now();
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const key = `${email.toLowerCase()}|${ip}`;

  const last = recentSubmissions.get(key);
  if (last && now - last < SUBMISSION_WINDOW_MS) {
    return {
      ok: false,
      error: "You're sending messages too quickly. Please wait a few seconds.",
    };
  }

  const { error } = await createAdminClient()
    .from("contact_messages")
    .insert({ name, email, service: service || null, message });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  // Only record the attempt after a successful insert, so a transient DB
  // failure doesn't lock a legitimate visitor out of the cooldown window.
  recentSubmissions.set(key, now);

  // Keep the map from growing forever — prune entries older than 10 minutes.
  if (recentSubmissions.size > 500) {
    for (const [k, t] of recentSubmissions) {
      if (now - t > 10 * 60_000) recentSubmissions.delete(k);
    }
  }

  return { ok: true };
}
