"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

const STORAGE_KEY = "peace-reviews";

type Review = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  gradient: string;
};

const defaultReviews: Review[] = [
  {
    quote:
      "Peace International has given my daughter confidence and a genuine love for learning. The teachers truly care, and the campus feels like a second home.",
    name: "Ramesh M.",
    role: "Parent · Grade 5",
    rating: 5,
    initials: "RM",
    gradient: "from-primary to-secondary",
  },
  {
    quote:
      "As working parents, we trust the school completely. The transport, safety and daily updates keep us connected and worry-free.",
    name: "Sneha P.",
    role: "Parent · Grade 2",
    rating: 5,
    initials: "SP",
    gradient: "from-secondary to-primary",
  },
  {
    quote:
      "Sports day, annual fest, inter-school competitions — my son has grown so much here. It is not just study, it is a complete education.",
    name: "Kiran D.",
    role: "Parent · Grade 7",
    rating: 5,
    initials: "KD",
    gradient: "from-[#3B1FA8] to-primary",
  },
];

const gradients = [
  "from-primary to-secondary",
  "from-accent to-[#FF5F1F]",
  "from-secondary to-primary",
  "from-[#3B1FA8] to-primary",
];

function loadReviews(): Review[] {
  if (typeof window === "undefined") return defaultReviews;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultReviews;
    const parsed = JSON.parse(raw) as Review[];
    if (!Array.isArray(parsed)) return defaultReviews;
    return [...parsed, ...defaultReviews];
  } catch {
    return defaultReviews;
  }
}

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews());
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const quote = String(data.get("quote") ?? "").trim();
    const rating = Number(data.get("rating") ?? 5);
    if (!name || !quote) return;

    const review: Review = {
      name,
      role: role || "Parent",
      quote,
      rating,
      initials: initialsOf(name),
      gradient: gradients[reviews.length % gradients.length],
    };

    const next = [review, ...reviews];
    setReviews(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage full or unavailable — keep for this session only.
    }
    form.reset();
    setShowForm(false);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="reviews" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
              <span className="h-px w-6 bg-accent" />
              Testimonials
              <span className="h-px w-6 bg-accent" />
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground text-balance sm:text-4xl">
              Parents &amp; Students Speak
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              Hear from the families who make up our community — their words are
              our best endorsement.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,138,0,0.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10m-5-5h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {showForm ? "Close Review Form" : "Add Review"}
            </button>
          </div>
        </Reveal>

        {showForm && (
          <Reveal delay={100}>
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 max-w-2xl rounded-3xl bg-white p-8 shadow-xl"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Mahesh S."
                    className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Parent / Student &amp; Grade
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    placeholder="e.g. Parent · Grade 5"
                    className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="rating" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  defaultValue="5"
                  className="w-full rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Very Good</option>
                  <option value="3">3 — Good</option>
                  <option value="2">2 — Fair</option>
                  <option value="1">1 — Poor</option>
                </select>
              </div>
              <div className="mt-5">
                <label htmlFor="quote" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Your Review
                </label>
                <textarea
                  id="quote"
                  name="quote"
                  rows={4}
                  required
                  placeholder="Share your experience with Peace International School..."
                  className="w-full resize-none rounded-xl border border-foreground/10 bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-primary px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(67,33,168,0.35)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto"
              >
                Submit Review
              </button>
              <p className="mt-4 text-sm font-medium text-primary" aria-live="polite">
                {submitted ? "Thank you! Your review has been added." : ""}
              </p>
            </form>
          </Reveal>
        )}

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {reviews.map((t, i) => (
            <Reveal key={`${t.name}-${i}`} delay={(i % 2) * 150}>
              <figure className="relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <svg
                  className="absolute -top-4 -right-2 h-24 w-24 text-primary/5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H7c0-1.7 1.3-3 3-3V7Zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3c0-1.7 1.3-3 3-3V7Z" />
                </svg>
                <div className="flex gap-1 text-accent" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={s < t.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={s < t.rating ? "0" : "1.5"}
                      aria-hidden="true"
                    >
                      <path d="M12 2.5l3.1 6.3 7 1-5 4.9 1.2 6.9L12 18.4 5.7 21.6 6.9 14.7 2 9.8l7-1L12 2.5Z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="relative mt-5 leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} font-heading text-sm font-bold text-white`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-foreground/60">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
