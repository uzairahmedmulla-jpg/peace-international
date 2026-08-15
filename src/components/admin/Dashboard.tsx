"use client";

import { useState } from "react";
import { signOut, type User } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import OverviewPanel from "./panels/OverviewPanel";
import FeeStructuresPanel from "./panels/FeeStructuresPanel";
import StudentsPanel from "./panels/StudentsPanel";
import PaymentsPanel from "./panels/PaymentsPanel";
import InvoicesPanel from "./panels/InvoicesPanel";
import AdminsPanel from "./panels/AdminsPanel";

type Tab =
  | "overview"
  | "feeStructures"
  | "students"
  | "payments"
  | "invoices"
  | "admins";

function Icon({ type }: { type: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };
  switch (type) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path
            d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L4 14V4h10l6.6 6.6a2 2 0 0 1 0 2.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3.5 20a5.5 5.5 0 0 1 11 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M16 8.6a3.2 3.2 0 0 1 0 5.8M17.5 15.4A5.5 5.5 0 0 1 20.5 20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path
            d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M14 3v5h5M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3l7 3v5c0 5-3.4 8.6-7 10-3.6-1.4-7-5-7-10V6l7-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9.5 12l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "feeStructures", label: "Fee Structures", icon: "tag" },
  { id: "students", label: "Students", icon: "users" },
  { id: "payments", label: "Payments", icon: "card" },
  { id: "invoices", label: "Invoices", icon: "doc" },
  { id: "admins", label: "Admins", icon: "shield" },
];

const TITLES: Record<Tab, { title: string; subtitle: string }> = {
  overview: {
    title: "Overview",
    subtitle: "A quick snapshot of fees, students and collections.",
  },
  feeStructures: {
    title: "Fee Structures",
    subtitle: "Create and manage the school's fee schedule.",
  },
  students: {
    title: "Students",
    subtitle: "Maintain the student directory for billing.",
  },
  payments: {
    title: "Record Payment",
    subtitle: "Mark a payment as received and generate its invoice.",
  },
  invoices: {
    title: "Invoices",
    subtitle: "All generated fee invoices, ready to download as PDF.",
  },
  admins: {
    title: "Administrators",
    subtitle: "Accounts that have access to this portal.",
  },
};

function Panel({ tab }: { tab: Tab }) {
  switch (tab) {
    case "overview":
      return <OverviewPanel />;
    case "feeStructures":
      return <FeeStructuresPanel />;
    case "students":
      return <StudentsPanel />;
    case "payments":
      return <PaymentsPanel />;
    case "invoices":
      return <InvoicesPanel />;
    case "admins":
      return <AdminsPanel />;
    default:
      return null;
  }
}

export default function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<Tab>("overview");
  const meta = TITLES[tab];

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 border-b border-[#131528]/10 bg-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/school-logo.jpg"
              alt="Logo"
              className="h-9 w-9 rounded-xl object-cover"
            />
            <div>
              <p className="font-heading text-sm font-bold text-[#131528]">
                Admin Portal
              </p>
              <p className="text-[11px] text-[#131528]/50">
                Peace International School
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut(getAuthInstance())}
            className="text-xs font-semibold text-[#131528]/50 transition hover:text-red-600"
          >
            Sign out
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-[#2d1b7a] text-white"
                  : "text-[#131528]/60 hover:bg-[#f6f7fb]"
              }`}
            >
              <Icon type={t.icon} />
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-[#131528]/10 bg-white lg:flex lg:sticky lg:top-0">
          <div className="flex items-center gap-3 border-b border-[#131528]/10 px-5 py-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/school-logo.jpg"
              alt="Logo"
              className="h-11 w-11 rounded-2xl object-cover"
            />
            <div>
              <p className="font-heading text-sm font-extrabold leading-tight text-[#131528]">
                Peace International
              </p>
              <p className="text-[11px] text-[#131528]/50">Admin Portal</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  tab === t.id
                    ? "bg-[#2d1b7a] text-white shadow-sm"
                    : "text-[#131528]/60 hover:bg-[#f6f7fb] hover:text-[#131528]"
                }`}
              >
                <Icon type={t.icon} />
                {t.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-[#131528]/10 px-4 py-4">
            <p className="truncate text-xs font-medium text-[#131528]/60">
              {user.email}
            </p>
            <button
              type="button"
              onClick={() => signOut(getAuthInstance())}
              className="mt-2 w-full rounded-xl border border-[#131528]/10 py-2 text-xs font-semibold text-[#131528]/60 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-extrabold text-[#131528]">
              {meta.title}
            </h1>
            <p className="mt-1 text-sm text-[#131528]/60">{meta.subtitle}</p>
          </div>
          <Panel tab={tab} />
        </main>
      </div>
    </div>
  );
}
