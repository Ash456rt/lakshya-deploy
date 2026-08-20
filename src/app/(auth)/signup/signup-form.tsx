"use client";

import React, { useActionState } from "react";
import { signup, type AuthState } from "@/app/(auth)/actions";

const initialState: AuthState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Create your account</h1>
      <p className="text-neutral-400 text-sm mb-8">
        Join the Laksya Groups client portal to track projects and request quotes.
      </p>

      {state.message && (
        <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300">
          {state.message}
        </div>
      )}
      {state.error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-neutral-300 mb-2">
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            placeholder="At least 6 characters"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 transition"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <a href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
          Sign in
        </a>
      </p>
    </div>
  );
}
