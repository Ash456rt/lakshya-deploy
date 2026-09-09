"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");
    setMessage("");

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // If a session exists immediately, email confirmation is disabled.
      if (data.session) {
        router.push("/portal");
        return;
      }

      setMessage("Check your inbox for a confirmation link, then sign in.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Create your account</h1>
      <p className="text-stone-600 text-sm mb-8">
        Join the Lakshya Groups client portal to track projects and request quotes.
      </p>

      {message && (
        <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-stone-800 mb-2">
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg bg-white/85 border border-stone-300 px-4 py-3 text-sm text-ink placeholder-stone-400 outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-800 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/85 border border-stone-300 px-4 py-3 text-sm text-ink placeholder-stone-400 outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-800 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/85 border border-stone-300 px-4 py-3 text-sm text-ink placeholder-stone-400 outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition"
            placeholder="At least 6 characters"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-accent hover:bg-accent-strong disabled:opacity-60 disabled:cursor-not-allowed text-ink font-semibold py-3 transition"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-600">
        Already have an account?{" "}
        <a href="/login" className="text-brand-violet-light hover:text-accent font-medium transition-colors">
          Sign in
        </a>
      </p>
    </div>
  );
}
