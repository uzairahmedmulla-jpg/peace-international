"use client";

import { useEffect, useState } from "react";
import { fetchInvoices } from "@/lib/fees";
import { downloadInvoice } from "@/lib/invoiceDownload";
import { type Invoice } from "@/lib/types";
import {
  Button,
  EmptyState,
  ErrorNote,
  inr,
  Modal,
  SuccessNote,
} from "../ui";

export default function InvoicesPanel() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [detail, setDetail] = useState<Invoice | null>(null);

  useEffect(() => {
    let alive = true;
    fetchInvoices()
      .then((data) => {
        if (alive) setInvoices(data);
      })
      .catch(() => {
        if (alive) setInvoices([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  async function handleDownload(invoiceNo: string) {
    setError("");
    try {
      await downloadInvoice(invoiceNo);
      setSuccess(`Invoice ${invoiceNo} downloaded.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate invoice.");
    }
  }

  return (
    <div className="space-y-6">
      {error ? <ErrorNote message={error} /> : null}
      {success ? <SuccessNote message={success} /> : null}

      {loading ? (
        <p className="text-sm text-[#131528]/50">Loading…</p>
      ) : invoices.length === 0 ? (
        <EmptyState text="No invoices generated yet. Record a payment to create one." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#131528]/10 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#131528]/10 bg-[#f6f7fb] text-xs font-semibold uppercase tracking-wide text-[#131528]/50">
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131528]/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#f6f7fb]/60">
                    <td className="px-4 py-3 font-semibold text-[#2d1b7a]">
                      {inv.invoiceNo}
                    </td>
                    <td className="px-4 py-3 text-[#131528]">{inv.studentName}</td>
                    <td className="px-4 py-3 text-[#131528]/70">{inv.className}</td>
                    <td className="px-4 py-3 text-[#131528]/70">{inv.date}</td>
                    <td className="px-4 py-3 text-[#131528]/70">{inv.method}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#131528]">
                      {inr(inv.total)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => setDetail(inv)}
                        >
                          View
                        </Button>
                        <Button
                          type="button"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => handleDownload(inv.invoiceNo)}
                        >
                          Download PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={detail !== null}
        onClose={() => setDetail(null)}
        title={detail ? `Invoice ${detail.invoiceNo}` : ""}
        wide
      >
        {detail ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#f6f7fb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#131528]/50">
                  Billed to
                </p>
                <p className="mt-1 font-semibold text-[#131528]">
                  {detail.studentName}
                </p>
                <p className="text-sm text-[#131528]/60">Class {detail.className}</p>
                <p className="text-sm text-[#131528]/60">
                  {detail.parentName || "—"} · {detail.phone || "—"}
                </p>
                <p className="text-sm text-[#131528]/60">{detail.email || "—"}</p>
              </div>
              <div className="rounded-xl bg-[#f6f7fb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#131528]/50">
                  Payment
                </p>
                <p className="mt-1 text-sm text-[#131528]/60">
                  Method: <span className="font-semibold text-[#131528]">{detail.method}</span>
                </p>
                <p className="text-sm text-[#131528]/60">
                  Date: <span className="font-semibold text-[#131528]">{detail.date}</span>
                </p>
                <p className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  PAID
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#131528]/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#131528]/10 bg-[#f6f7fb] text-xs font-semibold uppercase tracking-wide text-[#131528]/50">
                    <th className="px-4 py-2.5">Description</th>
                    <th className="px-4 py-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131528]/5">
                  {detail.items.map((it, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2.5 text-[#131528]/80">{it.description}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-[#131528]">
                        {inr(it.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#131528]/10 bg-[#f6f7fb]">
                    <td className="px-4 py-3 font-heading text-sm font-bold text-[#131528]">
                      Total
                    </td>
                    <td className="px-4 py-3 text-right font-heading text-sm font-extrabold text-[#2d1b7a]">
                      {inr(detail.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={() => handleDownload(detail.invoiceNo)}>
                Download PDF
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
