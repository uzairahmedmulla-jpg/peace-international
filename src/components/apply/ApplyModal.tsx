"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useApply } from "./ApplyContext";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnpajzjy";

const classes = [
  "Nursery",
  "LKG",
  "UKG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ApplyModal() {
  const { isOpen, closeApply } = useApply();
  const [status, setStatus] = useState<Status>("idle");

  const handleClose = useCallback(() => {
    setStatus("idle");
    closeApply();
  }, [closeApply]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "New Admission Enquiry — Peace International School");

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Admission enquiry form"
    >
      <div
        className="fixed inset-0 bg-[#0a0b16]/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="card-3d relative w-full max-w-lg rounded-[1.75rem] bg-white p-7 shadow-float sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
              Apply Now
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">
              Admission Enquiry
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              Fill in the details and our admissions team will reach out to you.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close form"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:bg-background-soft hover:text-foreground"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12.5 10 17l9-10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
              Thank you!
            </h3>
            <p className="mt-1 text-sm text-foreground/70">
              Your enquiry has been sent. Our team will contact you soon.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="studentName" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Student Name
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  required
                  placeholder="Student's full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="class" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Class / Grade
                </label>
                <select id="class" name="class" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select class
                  </option>
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="parentName" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Parent / Guardian Name
                </label>
                <input
                  id="parentName"
                  name="parentName"
                  type="text"
                  required
                  placeholder="Parent or guardian name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  placeholder="Your mobile number"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Any questions about admission, fees or transport?"
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                Something went wrong. Please try again or email us at peace.i.school@gmail.com.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,122,0,0.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Submit Enquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
