"use client";

import React, { useActionState } from "react";
import { updateProfile, type ProfileState } from "@/app/portal/actions";

const initialState: ProfileState = {};

const inputClasses =
  "w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition";

export function ProfileForm({
  fullName,
  company,
  phone,
}: {
  fullName: string;
  company: string;
  phone: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message && (
        <p className="text-sm text-emerald-400">{state.message}</p>
      )}
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-neutral-300 mb-2">
          Full name
        </label>
        <input id="full_name" name="full_name" type="text" defaultValue={fullName} className={inputClasses} />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-neutral-300 mb-2">
          Company
        </label>
        <input id="company" name="company" type="text" defaultValue={company} className={inputClasses} placeholder="Your company" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" defaultValue={phone} className={inputClasses} placeholder="+91 ..." />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition"
      >
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
