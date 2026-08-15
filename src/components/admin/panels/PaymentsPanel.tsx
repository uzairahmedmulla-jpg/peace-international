"use client";

import { useEffect, useState } from "react";
import {
  createPayment,
  fetchFeeStructures,
  fetchInvoiceByNo,
  fetchPayments,
  fetchStudents,
  uploadInvoicePdf,
} from "@/lib/fees";
import { buildInvoicePdf } from "@/lib/invoicePdf";
import { downloadInvoice } from "@/lib/invoiceDownload";
import { PAYMENT_METHODS, type FeeStructure, type InvoiceItem, type Payment, type Student } from "@/lib/types";
import {
  Button,
  EmptyState,
  ErrorNote,
  Field,
  inr,
  Input,
  Select,
  SuccessNote,
} from "../ui";

export default function PaymentsPanel() {
  const [students, setStudents] = useState<Student[]>([]);
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [studentId, setStudentId] = useState("");
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    className: "",
    parentName: "",
    phone: "",
    email: "",
  });
  const [structureId, setStructureId] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [customDesc, setCustomDesc] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [method, setMethod] = useState<string>("UPI");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetchStudents(),
      fetchFeeStructures(),
      fetchPayments(),
    ])
      .then(([s, f, p]) => {
        if (!alive) return;
        setStudents(s);
        setFeeStructures(f);
        setPayments(p);
      })
      .catch(() => {
        if (!alive) return;
        setStudents([]);
        setFeeStructures([]);
        setPayments([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const reload = async () => {
    try {
      const [s, f, p] = await Promise.all([
        fetchStudents(),
        fetchFeeStructures(),
        fetchPayments(),
      ]);
      setStudents(s);
      setFeeStructures(f);
      setPayments(p);
    } catch {
      setStudents([]);
      setFeeStructures([]);
      setPayments([]);
    }
  };

  function onSelectStudent(id: string) {
    setStudentId(id);
    const s = students.find((x) => x.id === id);
    setStudentInfo({
      name: s?.name ?? "",
      className: s?.className ?? "",
      parentName: s?.parentName ?? "",
      phone: s?.phone ?? "",
      email: s?.email ?? "",
    });
  }

  function addStructureItem() {
    if (!structureId) return;
    const f = feeStructures.find((x) => x.id === structureId);
    if (!f) return;
    setItems((prev) => [
      ...prev,
      { description: f.description || f.name, amount: f.amount },
    ]);
    setStructureId("");
  }

  function addCustomItem() {
    const amount = Number(customAmount);
    if (!customDesc.trim() || !Number.isFinite(amount) || amount <= 0) return;
    setItems((prev) => [
      ...prev,
      { description: customDesc.trim(), amount },
    ]);
    setCustomDesc("");
    setCustomAmount("");
  }

  const total = items.reduce((sum, i) => sum + i.amount, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!studentId) {
      setError("Please select a student.");
      return;
    }
    if (items.length === 0) {
      setError("Add at least one fee item.");
      return;
    }

    setSubmitting(true);
    try {
      const invoiceNo = await createPayment({
        studentId,
        studentName: studentInfo.name,
        className: studentInfo.className,
        parentName: studentInfo.parentName,
        phone: studentInfo.phone,
        email: studentInfo.email,
        method,
        date,
        items,
      });

      const invoice = await fetchInvoiceByNo(invoiceNo);
      if (invoice) {
        const pdf = await buildInvoicePdf(invoice);
        pdf.save(`${invoice.invoiceNo}.pdf`);
        try {
          await uploadInvoicePdf(invoiceNo, pdf);
        } catch {
          /* storage backup is optional — PDF still downloaded */
        }
      }

      setSuccess(
        `Payment recorded. Invoice ${invoiceNo} downloaded — also backed up to Firebase Storage.`,
      );
      setStudentId("");
      setStudentInfo({ name: "", className: "", parentName: "", phone: "", email: "" });
      setItems([]);
      setDate(new Date().toISOString().slice(0, 10));
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record payment.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDownload(invoiceNo: string) {
    setError("");
    try {
      await downloadInvoice(invoiceNo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate invoice.");
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#131528]/10 bg-white p-6 shadow-soft"
      >
        <h3 className="mb-5 font-heading text-base font-bold text-[#131528]">
          New payment
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Student">
            <Select
              required
              value={studentId}
              onChange={(e) => onSelectStudent(e.target.value)}
            >
              <option value="">Select a student…</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.className}
                </option>
              ))}
            </Select>
          </Field>

          <div className="grid grid-cols-[1fr_auto] items-end gap-2">
            <Field label="Add from fee structure">
              <Select
                value={structureId}
                onChange={(e) => setStructureId(e.target.value)}
              >
                <option value="">Choose a structure…</option>
                {feeStructures.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} — {inr(f.amount)}
                  </option>
                ))}
              </Select>
            </Field>
            <Button type="button" variant="secondary" onClick={addStructureItem}>
              Add
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_150px_auto] items-end gap-2">
          <Field label="Custom fee item">
            <Input
              value={customDesc}
              onChange={(e) => setCustomDesc(e.target.value)}
              placeholder="e.g. Transport — Term 1"
            />
          </Field>
          <Field label="Amount (₹)">
            <Input
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="0"
            />
          </Field>
          <Button type="button" variant="ghost" onClick={addCustomItem}>
            Add
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="mt-5 overflow-hidden rounded-xl border border-[#131528]/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#131528]/10 bg-[#f6f7fb] text-xs font-semibold uppercase tracking-wide text-[#131528]/50">
                    <th className="px-4 py-2.5">Description</th>
                    <th className="px-4 py-2.5 text-right">Amount</th>
                    <th className="w-10 px-2 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131528]/5">
                  {items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2.5 text-[#131528]/80">{it.description}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-[#131528]">
                        {inr(it.amount)}
                      </td>
                      <td className="px-2 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setItems((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-xs font-semibold text-[#131528]/40 transition hover:text-red-600"
                        >
                          Remove
                        </button>
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
                      {inr(total)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : (
          <p className="mt-5 text-sm text-[#131528]/40">
            Add fee items above to build the invoice.
          </p>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Payment method">
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Payment date">
            <Input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>
        </div>

        {error ? <div className="mt-4"><ErrorNote message={error} /></div> : null}
        {success ? <div className="mt-4"><SuccessNote message={success} /></div> : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#131528]/50">
            Recording a payment instantly marks it as PAID and generates a
            professional PDF invoice with the school logo.
          </p>
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Generating invoice…"
              : "Mark as paid & generate invoice"}
          </Button>
        </div>
      </form>

      <div>
        <h3 className="mb-4 font-heading text-base font-bold text-[#131528]">
          Payment history
        </h3>
        {loading ? (
          <p className="text-sm text-[#131528]/50">Loading…</p>
        ) : payments.length === 0 ? (
          <EmptyState text="No payments recorded yet." />
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
                    <th className="px-4 py-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131528]/5">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-[#f6f7fb]/60">
                      <td className="px-4 py-3 font-semibold text-[#2d1b7a]">
                        {p.invoiceNo}
                      </td>
                      <td className="px-4 py-3 text-[#131528]">{p.studentName}</td>
                      <td className="px-4 py-3 text-[#131528]/70">{p.className}</td>
                      <td className="px-4 py-3 text-[#131528]/70">{p.date}</td>
                      <td className="px-4 py-3 text-[#131528]/70">{p.method}</td>
                      <td className="px-4 py-3 text-right font-bold text-[#131528]">
                        {inr(p.amount)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDownload(p.invoiceNo)}
                          className="text-xs font-semibold text-[#2d1b7a] transition hover:text-[#241463]"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
