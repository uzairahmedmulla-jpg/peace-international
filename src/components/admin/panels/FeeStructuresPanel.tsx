"use client";

import { useEffect, useState } from "react";
import {
  addFeeStructure,
  deleteFeeStructure,
  fetchFeeStructures,
  updateFeeStructure,
} from "@/lib/fees";
import { CLASS_OPTIONS, FEE_CATEGORIES, type FeeStructure } from "@/lib/types";
import {
  Button,
  EmptyState,
  ErrorNote,
  Field,
  inr,
  Input,
  Modal,
  Select,
  SuccessNote,
  TextArea,
} from "../ui";

const emptyForm = {
  name: "",
  className: "All",
  amount: "",
  category: "Tuition",
  description: "",
};

type Form = typeof emptyForm;

export default function FeeStructuresPanel() {
  const [list, setList] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let alive = true;
    fetchFeeStructures()
      .then((data) => {
        if (alive) setList(data);
      })
      .catch(() => {
        if (alive) setList([]);
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
      setList(await fetchFeeStructures());
    } catch {
      setList([]);
    }
  };

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  function openEdit(f: FeeStructure) {
    setEditingId(f.id);
    setForm({
      name: f.name,
      className: f.className,
      amount: String(f.amount),
      category: f.category,
      description: f.description,
    });
    setError("");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const amount = Number(form.amount);
    if (!form.name.trim() || !Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid name and amount.");
      return;
    }
    setSaving(true);
    try {
      const data = {
        name: form.name.trim(),
        className: form.className,
        amount,
        category: form.category,
        description: form.description.trim(),
      };
      if (editingId) {
        await updateFeeStructure(editingId, data);
      } else {
        await addFeeStructure(data);
      }
      setModalOpen(false);
      setSuccess(editingId ? "Fee structure updated." : "Fee structure added.");
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(f: FeeStructure) {
    if (
      !window.confirm(`Delete "${f.name}" (${f.className})? This cannot be undone.`)
    )
      return;
    try {
      await deleteFeeStructure(f.id);
      setSuccess("Fee structure deleted.");
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete.");
    }
  }

  const totalValue = list.reduce((s, f) => s + f.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#131528]/60">
          {list.length} structure{list.length === 1 ? "" : "s"} ·{" "}
          <span className="font-semibold text-[#131528]">{inr(totalValue)}</span>{" "}
          total
        </p>
        <Button type="button" onClick={openAdd}>
          + Add fee structure
        </Button>
      </div>

      {error ? <ErrorNote message={error} /> : null}
      {success ? (
        <div className="flex items-center justify-between gap-2">
          <SuccessNote message={success} />
          <button
            type="button"
            className="text-xs text-[#131528]/50 hover:text-[#131528]"
            onClick={() => setSuccess("")}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-[#131528]/50">Loading…</p>
      ) : list.length === 0 ? (
        <EmptyState text="No fee structures yet. Add your first one to get started." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((f) => (
            <div
              key={f.id}
              className="flex flex-col rounded-2xl border border-[#131528]/10 bg-white p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-base font-bold text-[#131528]">
                    {f.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#131528]/50">
                    {f.className} · {f.category}
                  </p>
                </div>
                <span className="rounded-full bg-[#2d1b7a]/5 px-2.5 py-1 text-xs font-bold text-[#2d1b7a]">
                  {inr(f.amount)}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm text-[#131528]/60">
                {f.description || "No description."}
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => openEdit(f)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  className="flex-1"
                  onClick={() => handleDelete(f)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit fee structure" : "Add fee structure"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Fee name">
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Annual Tuition Fee"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Class">
              <Select
                value={form.className}
                onChange={(e) =>
                  setForm({ ...form, className: e.target.value })
                }
              >
                <option value="All">All</option>
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Category">
              <Select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                {FEE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Amount (₹)">
            <Input
              required
              type="number"
              min="1"
              step="1"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0"
            />
          </Field>

          <Field label="Description">
            <TextArea
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Optional description shown on the invoice."
            />
          </Field>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add fee"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
