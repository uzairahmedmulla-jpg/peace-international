import type { CSSProperties } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const reasons = [
  {
    title: "Experienced Faculty",
    text: "Passionate, qualified teachers who mentor every child individually and bring lessons to life.",
    color: "#4321A8",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 10.5V14c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-3.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Modern Classrooms",
    text: "Smart, digital-first classrooms with interactive boards and activity-based learning spaces.",
    color: "#6D35D9",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 21h6m-3-4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Holistic Development",
    text: "Academics, sports, arts and life skills together shape well-rounded, confident individuals.",
    color: "#FF8A00",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Safe & Secure Campus",
    text: "CCTV-monitored campus, trained staff and strict safety protocols give parents total peace of mind.",
    color: "#4321A8",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Global Perspective",
    text: "International exchange ideas, global curriculum exposure and a forward-looking world view.",
    color: "#6D35D9",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 12h17M12 3c2.5 2.5 3.5 5.8 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.8-3.5-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Future Skills",
    text: "Robotics, coding, design thinking and communication prepare students for tomorrow's careers.",
    color: "#FF8A00",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 8a4 4 0 1 1-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 8 9 4m3 4 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function WhyChoose() {
  return (
    <section id="why-us" className="neon-section py-20 sm:py-24">
      <div className="neon-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose Peace International School?"
          description="Parents choose us for our people, our campus and our promise — a nurturing environment where every child can thrive."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 130}>
              <div className="card-3d group h-full rounded-[1.75rem] border border-foreground/5 bg-white p-7 shadow-soft">
                <div className="lift">
                  <div
                    className="tint-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ "--tint": r.color } as CSSProperties}
                  >
                    {r.icon}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">{r.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
