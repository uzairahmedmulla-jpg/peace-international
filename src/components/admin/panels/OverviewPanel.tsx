"use client";

import { useEffect, useState } from "react";
import {
  fetchFeeStructures,
  fetchPayments,
  fetchStudents,
} from "@/lib/fees";
import { EmptyState, inr, StatCard } from "../ui";

export default function OverviewPanel() {
  const [counts, setCounts] = useState({ students: 0, fees: 0, total: 0 });
  const [recent, setRecent] = useState<
    { invoiceNo: string; studentName: string; amount: number; date: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [students, fees, payments] = await Promise.all([
          fetchStudents(),
          fetchFeeStructures(),
          fetchPayments(),
        ]);
        if (!alive) return;
        setCounts({
          students: students.length,
          fees: fees.length,
          total: payments.reduce((sum, p) => sum + p.amount, 0),
        });
        setRecent(
          payments.slice(0, 5).map((p) => ({
            invoiceNo: p.invoiceNo,
            studentName: p.studentName,
            amount: p.amount,
            date: p.date,
          })),
        );
      } catch {
        if (alive) setRecent([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-[#131528]/50">Loading overview…</p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Students" value={String(counts.students)} />
        <StatCard label="Fee structures" value={String(counts.fees)} />
        <StatCard label="Total collected" value={inr(counts.total)} />
      </div>

      <div className="rounded-2xl border border-[#131528]/10 bg-white p-5 shadow-soft">
        <h3 className="mb-4 font-heading text-base font-bold text-[#131528]">
          Latest payments
        </h3>
        {recent.length === 0 ? (
          <EmptyState text="No payments recorded yet." />
        ) : (
          <ul className="divide-y divide-[#131528]/5">
            {recent.map((p) => (
              <li
                key={p.invoiceNo}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#131528]">
                    {p.studentName}
                  </p>
                  <p className="text-xs text-[#131528]/50">{p.invoiceNo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#2d1b7a]">
                    {inr(p.amount)}
                  </p>
                  <p className="text-xs text-[#131528]/50">{p.date}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
