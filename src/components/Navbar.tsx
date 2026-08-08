"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Academics", href: "/#academics" },
  { label: "Admissions", href: "/#admissions" },
  { label: "Visit Campus Tour", href: "/campus" },
  { label: "Parent Reviews", href: "/reviews" },
  { label: "News", href: "/#news" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-[0_4px_24px_rgba(23,26,58,0.08)] backdrop-blur"
          : "bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link href="/#home" className="flex items-center gap-3">
          <Logo />
          <span className="leading-tight">
            <span className="block font-heading text-base font-bold text-primary sm:text-lg">
              Peace International
            </span>
            <span className="block text-xs font-medium tracking-widest text-foreground/60 uppercase">
              School, Harihar
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#apply"
            className="ml-3 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,138,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
          >
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 text-foreground lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-foreground/5 bg-white px-5 pt-2 pb-5 lg:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-foreground/5 py-3 text-sm font-medium text-foreground/80 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#apply"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,138,0,0.35)]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
