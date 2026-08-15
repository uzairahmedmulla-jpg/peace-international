"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import { isAdmin } from "@/lib/fees";
import { firebaseErrorMessage } from "@/lib/errors";
import AuthPanel from "./AuthPanel";
import Dashboard from "./Dashboard";

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [checkError, setCheckError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuthInstance(), async (u) => {
      setUser(u);
      if (!u) {
        setAdmin(false);
        setCheckError("");
        setChecking(false);
        return;
      }
      try {
        setAdmin(await isAdmin(u.uid));
        setCheckError("");
      } catch (err) {
        setAdmin(false);
        setCheckError(firebaseErrorMessage(err));
      }
      setChecking(false);
    });
    return unsub;
  }, []);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#131528]/10 border-t-accent" />
          <p className="text-sm text-[#131528]/60">Loading admin portal…</p>
        </div>
      </main>
    );
  }

  if (!user) return <AuthPanel />;

  if (!admin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#f6f7fb] p-6">
        <div className="w-full max-w-sm rounded-2xl border border-[#131528]/10 bg-white p-8 text-center shadow-raised">
          {checkError ? (
            <>
              <h1 className="font-heading text-xl font-bold text-[#131528]">
                Setup needed
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#131528]/60">
                {checkError}
              </p>
            </>
          ) : (
            <>
              <h1 className="font-heading text-xl font-bold text-[#131528]">
                Access restricted
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#131528]/60">
                Your account does not have administrator privileges. Only school
                administrators can access the fees portal.
              </p>
            </>
          )}
          <button
            type="button"
            onClick={() => signOut(getAuthInstance())}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return <Dashboard user={user} />;
}
