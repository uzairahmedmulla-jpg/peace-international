"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const posts = [
  {
    tag: "Admissions",
    date: "Aug 08, 2026",
    color: "#2D1B7A",
    title: "Admissions Open for the 2026–27 Academic Year",
    excerpt:
      "Apply now to secure your child's seat across Nursery to Grade 10. Limited seats per grade — early applications recommended.",
    body:
      "Admissions are open for the 2026–27 academic year across Nursery to Grade 10. Seats are limited and allotted on a first-come, first-served basis after the interaction round. Contact our admissions helpline to book a campus visit or start your application today.",
  },
  {
    tag: "Events",
    date: "Aug 02, 2026",
    color: "#FF8A00",
    title: "Annual Sports Day & Cultural Fest Announced",
    excerpt:
      "Save the date! Our campus will come alive with sports, music and dance as students showcase their talents.",
    body:
      "Our annual Sports Day and Cultural Fest will take place in December 2026. Students from every grade will compete in athletics, football, cricket and showcase music, dance and drama performances. Parents and alumni are cordially invited to cheer for our young stars.",
  },
  {
    tag: "Achievements",
    date: "Jul 28, 2026",
    color: "#5130C9",
    title: "Outstanding Academic Results 2026",
    excerpt:
      "Our students achieved a 98% pass rate with outstanding scores. Congratulations to all our achievers!",
    body:
      "We are proud to announce a 98% pass rate in the annual examinations 2026, with several students scoring above 95%. Congratulations to our students, their families and our dedicated faculty for this wonderful achievement.",
  },
  {
    tag: "Campus",
    date: "Jul 15, 2026",
    color: "#0E7490",
    title: "New Smart Classrooms & Science Lab Inaugurated",
    excerpt:
      "We're delighted to unveil upgraded smart classrooms and a fully-equipped science laboratory for hands-on learning.",
    body:
      "We have inaugurated upgraded smart classrooms with interactive digital boards and a fully-equipped science laboratory. These new facilities enable hands-on, activity-based learning across STEM subjects and beyond.",
  },
];

export default function News() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section id="news" className="neon-section py-20 sm:py-24">
      <div className="neon-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="News & Events"
          title="What's Happening At Peace"
          description="Stay updated with the latest announcements, achievements and stories from our school community."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={(i % 4) * 120}>
              <article className="card-3d group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-foreground/5 bg-white shadow-soft">
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ backgroundColor: post.color }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
                  <svg className="relative h-12 w-12 text-white/25 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 5h13v15H4V5Zm13 5h3v10h-3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-dark">
                      {post.tag}
                    </span>
                    <span className="text-xs font-medium text-foreground/50">{post.date}</span>
                  </div>
                  <h3 className="mt-3 font-heading text-base font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                    {post.excerpt}
                  </p>
                  {expanded === i && (
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {post.body}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    aria-expanded={expanded === i}
                    className="mt-4 inline-flex cursor-pointer items-center gap-1.5 self-start text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {expanded === i ? "Show less" : "Read more"}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d={expanded === i ? "M3 8h10M8 3v10" : "M3 8h10m0 0-4-4m4 4-4 4"}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
