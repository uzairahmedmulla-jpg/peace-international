"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(
      `Name: ${name}\nMessage: ${message}`,
    );
    window.location.href = `mailto:admissions@peaceinternational.edu.in?subject=${encodeURIComponent(
      "Enquiry from Peace International website",
    )}&body=${body}`;
    setSubmitted(true);
    e.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form className="rounded-3xl bg-white p-8 shadow-xl" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Your phone"
            className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="mt-5">
        <label htmlFor="interest" className="mb-1.5 block text-sm font-semibold text-foreground">
          I&apos;m Interested In
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          defaultValue="Admission enquiry"
        >
          <option>Admission enquiry</option>
          <option>Campus tour</option>
          <option>Fee structure</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          className="w-full resize-none rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(67,33,168,0.35)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto"
      >
        Send Message
      </button>
      <p className="mt-4 text-sm font-medium text-primary" aria-live="polite">
        {submitted
          ? "Thank you! Your email app has been opened with your enquiry — hit send to deliver it."
          : ""}
      </p>
    </form>
  );
}
