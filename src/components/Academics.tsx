import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const programs = [
  {
    title: "One Year Diploma",
    tag: "After 10th · IT & Emerging Skills",
    text: "A job-ready one-year diploma after Class 10 covering AI, web design, machine learning, multilingual DTP, Urdu typing and emerging trends in IT.",
    color: "#0E7490",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 8V5h10v3M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Sports",
    tag: "Volleyball · Throwball · Cricket · Running · Relay",
    text: "Professional coaching across volleyball, throwball, cricket, running and relay that build fitness, discipline and sportsmanship.",
    color: "#059669",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="14" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 9 7 3m8 6 2-6m-5 5 1.5-4M12 9 10.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9.5 16.5 1 1 2-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Arts",
    tag: "Karate · Craft · Drawing · Other Activities",
    text: "A creative studio culture where students build focus through karate, hands-on craft, drawing and a range of other fun activities.",
    color: "#FF5F1F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 17V5l11-2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Languages",
    tag: "English · Kannada · Hindi · Arabic",
    text: "Immersive language learning across English, Kannada, Hindi and Arabic builds strong communication skills for a connected, global world.",
    color: "#3B1FA8",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 12h17M12 3c2.5 2.5 3.5 5.8 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.8-3.5-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

const facilities = [
  "Smart Classrooms",
  "Science & Computer Labs",
  "Library & Reading Corner",
  "Sports Grounds",
  "Camera Security",
  "Safe Transport",
];

const curriculum = [
  {
    band: "Pre-Primary",
    grades: "Nursery · LKG · UKG",
    tag: "Playway & Montessori",
    text: "Learning through play, storytelling, rhymes and art. Children build early literacy, numeracy and social skills in a warm, colourful and safe environment.",
    color: "#FF5F1F",
    subjects: ["Rhymes & Stories", "Number Fun", "Art & Craft", "Motor Skills", "Outdoor Play"],
  },
  {
    band: "Primary School",
    grades: "Grade 1 – Grade 5",
    tag: "Academic Curriculum",
    text: "A strong foundation in English, Kannada, Hindi, Mathematics, EVS and Computer Science. Concept-based learning with regular assessments, activities and moral values.",
    color: "#2D1B7A",
    subjects: ["English", "Kannada & Hindi", "Mathematics", "EVS", "Computer Science"],
  },
  {
    band: "Middle School",
    grades: "Grade 6 – Grade 8",
    tag: "Academic Curriculum",
    text: "Students move from basics to deeper understanding with Science, Social Science, Mathematics and three languages, plus labs, projects and STEM activities.",
    color: "#5130C9",
    subjects: ["Science", "Social Science", "Mathematics", "English", "Computer Science"],
  },
  {
    band: "Secondary School",
    grades: "Grade 9 – Grade 10",
    tag: "Board Examination Preparation",
    text: "Focused preparation for the board examinations with expert faculty, doubt-clearing sessions, model tests and career guidance for life after school.",
    color: "#0E7490",
    subjects: ["Mathematics", "Science", "Social Science", "Languages", "Board Preparation"],
  },
];

export default function Academics() {
  return (
    <section id="academics" className="neon-section py-20 sm:py-24">
      <div className="neon-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Academics"
          title="Programs We Offer"
          description="Beyond textbooks, we offer specialised programs that spark curiosity, creativity and future-ready skills in every student."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 130}>
              <div className="card-3d group h-full rounded-[1.75rem] border border-foreground/5 bg-white p-7 shadow-soft">
                <div className="lift flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase"
                      style={{ backgroundColor: `${p.color}14`, color: p.color }}
                    >
                      {p.tag.split(" · ")[0]}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-widest uppercase" style={{ color: p.color }}>
                    {p.tag}
                  </p>
                  <p className="mt-4 flex-1 leading-relaxed text-foreground/60">{p.text}</p>
                  <div className="mt-6 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-24" style={{ backgroundColor: p.color }} />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={260}>
            <div className="card-3d h-full rounded-[1.75rem] border-2 border-dashed border-white/15 bg-white/[0.06] p-7 text-center">
              <div className="lift flex h-full flex-col items-center justify-center">
                <p className="font-heading text-2xl font-bold text-accent">Plus more</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Debates, eco clubs, olympiads, community service and leadership
                  programmes — there is a path for every passion.
                </p>
                <a
                  href="#apply"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Learn More
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10m0 0-4-4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="neon-border mt-14 rounded-[2rem] bg-white/[0.06] p-8 sm:p-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                  Our Curriculum
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Nursery To Grade 10 — A Learning Path For Every Stage
                </h3>
                <p className="mt-4 leading-relaxed text-white/65">
                  From playway early years to focused board examination preparation, our
                  curriculum grows with your child — building skills, knowledge and
                  confidence at every grade.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-white/80">
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    Play-based Pre-Primary (Nursery – UKG)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    Curriculum for Grade 1 – Grade 5
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    Curriculum for Grade 6 – Grade 10
                  </li>
                </ul>
                <a
                  href="#apply"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Enquire About Grades
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {curriculum.map((c) => (
                  <div
                    key={c.band}
                    className="card-3d rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
                  >
                    <div className="lift">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white uppercase"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.tag}
                      </span>
                      <h4 className="mt-3 font-heading text-lg font-bold text-white">
                        {c.band}
                      </h4>
                      <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                        {c.grades}
                      </p>
                      <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                        {c.text}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.subjects.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 rounded-[2rem] bg-white p-8 shadow-raised sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                  World-Class Facilities
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  A Campus Built For Learning & Play
                </h3>
                <p className="mt-4 leading-relaxed text-foreground/60">
                  Our classrooms and activity spaces are designed to keep students
                  engaged, safe and curious — every single day.
                </p>
                <a
                  href="/campus"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Visit Our Campus
                </a>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {facilities.map((f) => (
                  <li
                    key={f}
                    className="card-3d flex items-center gap-3 rounded-2xl border border-foreground/5 bg-background-soft px-4 py-3.5 text-sm font-medium text-foreground"
                  >
                    <div className="lift-sm flex items-center gap-3">
                      <svg
                        className="shrink-0 text-accent"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle cx="9" cy="9" r="8" fill="currentColor" fillOpacity="0.2" />
                        <path
                          d="m6 9 2 2 4-4.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
