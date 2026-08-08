import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const activities = [
  {
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
  { label: "Smart Classrooms", gradient: "from-primary to-secondary" },
  { label: "Sports Day", gradient: "from-secondary to-primary" },
  { label: "Science Lab", gradient: "from-accent to-[#FF5F1F]" },
  { label: "Library", gradient: "from-primary to-[#3B1FA8]" },
];

export default function CampusLife() {
  return (
    <section id="campus-life" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Campus Life"
          title="Life Beyond The Classroom"
          description="School is where memories are made. Our campus buzzes with sports, arts, clubs and celebrations that shape well-rounded individuals."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 120}>
              <div className="h-full rounded-3xl border border-foreground/5 bg-background-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${a.color}1A`, color: a.color }}
                >
                  {a.icon}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.label} delay={(i % 4) * 120}>
              <div
                className={`group relative h-48 overflow-hidden rounded-3xl bg-gradient-to-br ${g.gradient} shadow-lg`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5 pt-12">
                  <p className="font-heading text-sm font-semibold text-white">{g.label}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 backdrop-blur">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                      <path d="m10 8.5 5 3.5-5 3.5v-7Z" fill="white" />
                    </svg>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
