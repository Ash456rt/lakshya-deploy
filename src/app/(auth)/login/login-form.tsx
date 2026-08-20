"use client";

import React, { useActionState } from "react";
import { login, type AuthState } from "@/app/(auth)/actions";

const initialState: AuthState = {};

export function LoginForm({
  confirmed,
  error,
  next,
}: {
  confirmed: boolean;
  error: boolean;
  next?: string;
}) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
      <p className="text-neutral-400 text-sm mb-8">Sign in to your client portal.</p>

      {confirmed && (
        <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300">
          Email confirmed — you can sign in now.
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          Something went wrong confirming your email.
        </div>
      )}
      {state.error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={next ?? "/portal"} />
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
            autoComplete="current-password"
            className="w-full rounded-lg bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 transition"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        New client?{" "}
        <a href="/signup" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
          Create an account
        </a>
      </p>
    </div>
  );
}
