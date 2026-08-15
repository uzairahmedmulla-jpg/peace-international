"use client";

import { useEffect, useState } from "react";
import { fetchFeeStructures } from "@/lib/fees";
import type { FeeStructure } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ApplyNowButton from "./apply/ApplyNowButton";

const CATEGORY_ORDER = [
  "Tuition",
  "Transport",
  "Admission",
  "Exam",
  "Activity",
  "Other",
];

function inr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

const paymentMethods = ["UPI", "Cash", "Bank Transfer", "Cheque", "Card"];

export default function Fees() {
  const [list, setList] = useState<FeeStructure[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetchFeeStructures()
      .then((data) => {
        if (alive) setList(data);
      })
      .catch(() => {
        if (alive) setList([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  const byCat = new Map<string, FeeStructure[]>();
  for (const f of list ?? []) {
    const cat = f.category || "Other";
    const arr = byCat.get(cat) ?? [];
    arr.push(f);
    byCat.set(cat, arr);
  }
  const cats = [
    ...CATEGORY_ORDER.filter((c) => byCat.has(c)),
    ...[...byCat.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <section id="fees" className="neon-section py-20 sm:py-24">
      <div className="neon-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Fees & Payments"
          title="Clear, Structured School Fees"
          description="Every fee is published transparently and every payment is acknowledged with a professional receipt. Contact our office for installment plans and scholarship options."
          light
        />

        {list === null ? (
          <div className="mt-14 rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-sm text-white/70">
              Loading fee schedule…
            </p>
          </div>
        ) : list.length === 0 ? (
          <div className="mt-14 rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-center">
            <p className="font-heading text-lg font-semibold text-white">
              Fee schedule coming soon
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
              Our fee structure is being finalised. Please call the admissions
              office for a full breakdown for your child&apos;s class.
            </p>
            <div className="mt-6">
              <ApplyNowButton className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,122,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark">Ask About Fees</ApplyNowButton>
            </div>
          </div>
        ) : (
          <>
            {cats.map((cat) => (
              <div key={cat} className="mt-12 first:mt-14">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h3 className="font-heading text-xl font-bold text-white">
                    {cat}
                  </h3>
                  <span className="text-sm text-white/50">
                    {byCat.get(cat)?.length ?? 0} item
                    {(byCat.get(cat)?.length ?? 0) === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 perspective">
                  {(byCat.get(cat) ?? []).map((f, i) => (
                    <Reveal key={f.id} delay={(i % 3) * 100}>
                      <div className="card-3d h-full rounded-[1.75rem] bg-white p-6 shadow-soft">
                        <div className="lift">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-heading text-lg font-semibold text-foreground">
                              {f.name}
                            </h4>
                            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                              {inr(f.amount)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-foreground/50">
                            {f.className === "All"
                              ? "All classes"
                              : `Class ${f.className}`}
                          </p>
                          {f.description ? (
                            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                              {f.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}

            <Reveal delay={120}>
              <div className="mt-14 grid items-center gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.2fr_auto] sm:p-10">
                <div>
                  <span className="text-sm font-semibold tracking-wide text-accent uppercase">
                    How to pay
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-white">
                    Simple, Receipted Payments
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-white/70">
                    Fees can be paid via the methods below at the school office.
                    Every payment is confirmed instantly with a professional
                    receipt that includes the school logo and full details.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {paymentMethods.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <ApplyNowButton className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,122,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark">
                    Ask About Fees
                  </ApplyNowButton>
                  <a
                    href="tel:+919880010068"
                    className="text-sm font-semibold text-white/80 transition-colors hover:text-accent"
                  >
                    +91 98800 10068
                  </a>
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
