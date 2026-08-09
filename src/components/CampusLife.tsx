import type { CSSProperties } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const activities = [
  {
    slug: "sports",
    title: "Sports & Athletics",
    text: "Football, cricket, athletics and indoor games that build teamwork and fitness.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3a9 9 0 0 1 9 9h-9V3ZM12 21a9 9 0 0 1-9-9h9v9Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    color: "#FF8A00",
  },
  {
    slug: "arts",
    title: "Arts & Creativity",
    text: "Music, dance, drama and fine arts help every student find their expressive voice.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 17V5l11-2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    color: "#6D35D9",
  },
  {
    slug: "clubs",
    title: "Clubs & Activities",
    text: "Debate, robotics, eco and literary clubs that spark curiosity beyond the classroom.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 8a4 4 0 1 1-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 8 9 4m3 4 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    color: "#4321A8",
  },
  {
    slug: "annual-events",
    title: "Annual Events",
    text: "Fests, sports day and cultural celebrations bring the whole community together.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 3v3m8-3v3M4 7h16v13H4V7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 12h3v3H8v-3Zm5 0h3v3h-3v-3Z" fill="currentColor" />
      </svg>
    ),
    color: "#E67700",
  },
];

const gallery = [
  { label: "Smart Classrooms", color: "#2D1B7A" },
  { label: "Sports Day", color: "#FF8A00" },
  { label: "Science Lab", color: "#6D35D9" },
  { label: "Library", color: "#0E7490" },
];

export default function CampusLife() {
  return (
    <section id="campus-life" className="neon-section py-20 sm:py-24">
      <div className="neon-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Campus Life"
          title="Life Beyond The Classroom"
          description="School is where memories are made. Our campus buzzes with sports, arts, clubs and celebrations that shape well-rounded individuals."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 perspective">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 120}>
              <Link href={`/campus-life/${a.slug}`} className="block h-full">
                <div className="card-3d h-full rounded-[1.75rem] border border-foreground/5 bg-white p-7 shadow-soft">
                  <div className="lift group">
                    <div
                      className="tint-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ "--tint": a.color } as CSSProperties}
                    >
                      {a.icon}
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/60">{a.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Explore
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M3 8h10m0 0-4-4m4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 perspective">
          {gallery.map((g, i) => (
            <Reveal key={g.label} delay={(i % 4) * 120}>
              <div
                className="card-3d group relative h-48 overflow-hidden rounded-[1.75rem] shadow-raised"
                style={{ backgroundColor: g.color }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 backdrop-blur">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                      <path d="m10 8.5 5 3.5-5 3.5v-7Z" fill="white" />
                    </svg>
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 pt-12">
                  <p className="font-heading text-sm font-semibold text-white">{g.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
