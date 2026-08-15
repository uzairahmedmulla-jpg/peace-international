"use client";

import { useEffect, useState } from "react";
import { fetchAdmins } from "@/lib/fees";
import type { AdminUser } from "@/lib/types";
import { EmptyState } from "../ui";

export default function AdminsPanel() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchAdmins()
      .then((data) => {
        if (alive) setAdmins(data);
      })
      .catch(() => {
        if (alive) setAdmins([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#131528]/10 bg-white p-5 text-sm leading-relaxed text-[#131528]/70 shadow-soft">
        <p>
          Only accounts listed below can access this portal. Firestore rules
          enforce that every read and write in the fees database is performed
          by an authenticated administrator — the browser alone cannot bypass
          them.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#131528]/50">Loading…</p>
      ) : admins.length === 0 ? (
        <EmptyState text="No administrators found." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {admins.map((a) => (
            <div
              key={a.uid}
              className="rounded-2xl border border-[#131528]/10 bg-white p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d1b7a]/10 font-heading text-sm font-extrabold text-[#2d1b7a]">
                  {(a.name || a.email || "?").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#131528]">
                    {a.name || "Administrator"}
                  </p>
                  <p className="truncate text-xs text-[#131528]/50">{a.email}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#131528]/40">
                Added{" "}
                {a.createdAt
                  ? new Date(a.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "recently"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
