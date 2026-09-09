"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const inputClasses =
  "w-full rounded-lg bg-white/85 border border-stone-300 px-4 py-3 text-sm text-ink placeholder-stone-400 outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition";

export function ProfileForm({
  fullName,
  company,
  phone,
}: {
  fullName: string;
  company: string;
  phone: string;
}) {
  const [name, setName] = useState(fullName);
  const [comp, setComp] = useState(company);
  const [ph, setPh] = useState(phone);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setMsg("");
    setErr("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErr("You must be signed in.");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: name,
        company: comp,
        phone: ph,
      });

      if (error) {
        setErr(error.message);
      } else {
        setMsg("Profile updated.");
      }
    } catch {
      setErr("Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg && <p className="text-sm text-emerald-400">{msg}</p>}
      {err && <p className="text-sm text-red-400">{err}</p>}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-stone-800 mb-2">
          Full name
        </label>
        <input id="full_name" name="full_name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-stone-800 mb-2">
          Company
        </label>
        <input id="company" name="company" type="text" value={comp} onChange={(e) => setComp(e.target.value)} className={inputClasses} placeholder="Your company" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-800 mb-2">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" value={ph} onChange={(e) => setPh(e.target.value)} className={inputClasses} placeholder="+91 ..." />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-gradient-to-r from-brand-blue-deep to-brand-blue-deep hover:from-brand-violet hover:to-brand-violet-light disabled:opacity-60 disabled:cursor-not-allowed text-ink text-sm font-semibold px-5 py-2.5 transition"
      >
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
