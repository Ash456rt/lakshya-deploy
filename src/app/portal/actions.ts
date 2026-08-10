"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export type ProfileState = {
  error?: string;
  message?: string;
};

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in." };

  const fullName = formData.get("full_name") as string;
  const company = formData.get("company") as string;
  const phone = formData.get("phone") as string;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    company,
    phone,
  });

  if (error) return { error: error.message };

  revalidatePath("/portal");
  return { message: "Profile updated." };
}

export type QuoteState = {
  error?: string;
  message?: string;
};

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in." };

  const service = formData.get("service") as string;
  const details = formData.get("details") as string;

  const { error } = await supabase.from("quote_requests").insert({
    user_id: user.id,
    service,
    details,
  });

  if (error) return { error: error.message };

  revalidatePath("/portal/quote");
  return { message: "Quote request submitted — we'll get back to you soon." };
}
