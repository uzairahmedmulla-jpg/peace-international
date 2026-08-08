"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/10 backdrop-blur focus-within:border-accent">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/50"
        />
        <button
          type="submit"
          className="shrink-0 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-2 h-4 text-xs text-accent" aria-live="polite">
        {subscribed ? "Thanks! You're on the list." : ""}
      </p>
    </form>
  );
}
