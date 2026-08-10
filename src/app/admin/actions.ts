"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const QUOTE_STATUSES = ["pending", "quoted", "accepted", "declined"];
const PROJECT_STATUSES = ["in_progress", "on_hold", "completed"];

// Defense in depth: every mutation re-checks the caller is an admin,
// even if an action id leaks outside the /admin pages.
async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await createAdminClient()
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  return Boolean(profile?.is_admin);
}

export async function updateQuoteStatus(formData: FormData) {
  if (!(await isAdmin())) return;
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  if (!id || !QUOTE_STATUSES.includes(status)) return;
  await createAdminClient()
    .from("quote_requests")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/quotes");
}

export async function createProject(formData: FormData) {
  if (!(await isAdmin())) return;
  const userId = formData.get("user_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (!userId || !title) return;
  await createAdminClient()
    .from("client_projects")
    .insert({ user_id: userId, title, description: description || null });
  revalidatePath("/admin/projects");
}

export async function updateProject(formData: FormData) {
  if (!(await isAdmin())) return;
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const progress = Number(formData.get("progress"));
  if (!id) return;
  const patch: Record<string, unknown> = {};
  if (PROJECT_STATUSES.includes(status)) patch.status = status;
  if (!Number.isNaN(progress)) {
    patch.progress = Math.min(100, Math.max(0, Math.round(progress)));
  }
  patch.updated_at = new Date().toISOString();
  await createAdminClient()
    .from("client_projects")
    .update(patch)
    .eq("id", id);
  revalidatePath("/admin/projects");
}

export async function toggleAdmin(formData: FormData) {
  if (!(await isAdmin())) return;
  const id = formData.get("id") as string;
  const makeAdmin = formData.get("is_admin") === "1";
  if (!id) return;
  await createAdminClient()
    .from("profiles")
    .update({ is_admin: makeAdmin })
    .eq("id", id);
  revalidatePath("/admin/users");
}

export async function markMessageRead(formData: FormData) {
  if (!(await isAdmin())) return;
  const id = formData.get("id") as string;
  if (!id) return;
  await createAdminClient()
    .from("contact_messages")
    .update({ status: "read" })
    .eq("id", id);
  revalidatePath("/admin/messages");
}
