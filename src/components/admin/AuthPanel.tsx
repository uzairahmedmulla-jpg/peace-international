"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import { firebaseErrorMessage } from "@/lib/errors";
import { Button, ErrorNote, Field, Input } from "./ui";

export default function AuthPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        getAuthInstance(),
        email.trim(),
        password,
      );
    } catch (err) {
      setError(firebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/school-logo.jpg"
            alt="Peace International School"
            className="mx-auto h-16 w-16 rounded-2xl object-cover"
          />
          <h1 className="mt-4 font-heading text-2xl font-extrabold text-[#131528]">
            Admin Portal
          </h1>
          <p className="mt-1 text-sm text-[#131528]/60">
            Peace International School, Harihar
          </p>
        </div>

        <div className="rounded-2xl border border-[#131528]/10 bg-white p-6 shadow-raised">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email">
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.com"
              />
            </Field>

            <Field label="Password">
              <div className="relative">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#131528]/40 transition hover:text-[#131528]"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M3 3l18 18M10.6 5.1A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-2.2 3M6.6 6.6C3.6 8.6 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.1-1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </div>
            </Field>

            {error ? <ErrorNote message={error} /> : null}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-4 text-xs leading-relaxed text-[#131528]/50">
            Only existing administrator accounts can sign in. If you do not
            have access, contact the school administration.
          </p>
        </div>
      </div>
    </main>
  );
}
