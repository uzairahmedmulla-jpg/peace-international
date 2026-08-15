"use client";

import { useEffect, useState } from "react";
import {
  addStudent,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "@/lib/fees";
import { CLASS_OPTIONS, type Student } from "@/lib/types";
import {
  Button,
  EmptyState,
  ErrorNote,
  Field,
  Input,
  Modal,
  Select,
  SuccessNote,
} from "../ui";

const emptyForm = {
  name: "",
  className: CLASS_OPTIONS[0],
  parentName: "",
  phone: "",
  email: "",
};

type Form = typeof emptyForm;

export default function StudentsPanel() {
  const [list, setList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let alive = true;
    fetchStudents()
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
      setList(await fetchStudents());
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

  function openEdit(s: Student) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      className: s.className,
      parentName: s.parentName,
      phone: s.phone,
      email: s.email,
    });
    setError("");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Student name is required.");
      return;
    }
    setSaving(true);
    try {
      const data = {
        name: form.name.trim(),
        className: form.className,
        parentName: form.parentName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      };
      if (editingId) {
        await updateStudent(editingId, data);
      } else {
        await addStudent(data);
      }
      setModalOpen(false);
      setSuccess(editingId ? "Student updated." : "Student added.");
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: Student) {
    if (
      !window.confirm(
        `Delete ${s.name} (${s.className})? Past invoices will remain.`,
      )
    )
      return;
    try {
      await deleteStudent(s.id);
      setSuccess("Student deleted.");
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete.");
    }
  }

  const q = query.trim().toLowerCase();
  const filtered = q
    ? list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.className.toLowerCase().includes(q) ||
          s.phone.includes(q),
      )
    : list;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          className="w-full max-w-xs"
          placeholder="Search by name, class or phone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="button" onClick={openAdd}>
          + Add student
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
      ) : filtered.length === 0 ? (
        <EmptyState
          text={
            list.length === 0
              ? "No students yet. Add students before recording payments."
              : "No students match your search."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#131528]/10 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#131528]/10 bg-[#f6f7fb] text-xs font-semibold uppercase tracking-wide text-[#131528]/50">
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Parent / Guardian</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131528]/5">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-[#f6f7fb]/60">
                    <td className="px-4 py-3 font-semibold text-[#131528]">
                      {s.name}
                    </td>
                    <td className="px-4 py-3 text-[#131528]/70">{s.className}</td>
                    <td className="px-4 py-3 text-[#131528]/70">
                      {s.parentName || "—"}
                    </td>
                    <td className="px-4 py-3 text-[#131528]/70">{s.phone || "—"}</td>
                    <td className="px-4 py-3 text-[#131528]/70">{s.email || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => openEdit(s)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => handleDelete(s)}
                        >
                          Delete
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
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit student" : "Add student"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Student name">
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
            />
          </Field>

          <Field label="Class">
            <Select
              value={form.className}
              onChange={(e) => setForm({ ...form, className: e.target.value })}
            >
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Parent / Guardian">
            <Input
              value={form.parentName}
              onChange={(e) =>
                setForm({ ...form, parentName: e.target.value })
              }
              placeholder="e.g. Ramesh Sharma"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone">
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 …"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="parent@example.com"
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add student"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
