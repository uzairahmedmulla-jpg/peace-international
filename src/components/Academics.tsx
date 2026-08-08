import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const programs = [
  {
    title: "One Year Diploma",
    tag: "After 10th · IT & Emerging Skills",
    text: "A job-ready one-year diploma after Class 10 covering AI, web design, machine learning, multilingual DTP, Urdu typing and emerging trends in IT.",
    gradient: "from-[#0E7490] to-[#134E4A]",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 8V5h10v3M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
    bg: (
      <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none">
          <path d="M40 40h70v50h50M160 90h60v50h60M280 140h40v50h60M40 160v60h50M40 260h40M160 260v-40h40M280 60v40h40" />
        </g>
        <g fill="rgba(255,255,255,0.55)">
          <circle cx="110" cy="40" r="4" />
          <circle cx="270" cy="90" r="4" />
          <circle cx="380" cy="140" r="4" />
          <circle cx="90" cy="220" r="4" />
          <circle cx="200" cy="220" r="4" />
          <circle cx="320" cy="100" r="4" />
        </g>
      </svg>
    ),
  },
  {
    title: "Sports",
    tag: "Volleyball · Throwball · Cricket · Running · Relay",
    text: "Professional coaching across volleyball, throwball, cricket, running and relay that build fitness, discipline and sportsmanship.",
    gradient: "from-emerald-600 to-emerald-900",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="14" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 9 7 3m8 6 2-6m-5 5 1.5-4M12 9 10.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9.5 16.5 1 1 2-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    bg: (
      <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none">
          <path d="M0 210h400M0 230h400M0 250h400M0 270h400M0 290h400" />
          <path d="M60 210a55 55 0 0 0 110 0M60 210a55 55 0 0 1 110 0" />
          <path d="M130 210a55 55 0 0 0 110 0M130 210a55 55 0 0 1 110 0" />
          <circle cx="330" cy="120" r="50" />
          <path d="M330 70v100M280 120h100" />
        </g>
      </svg>
    ),
  },
  {
    title: "Arts",
    tag: "Karate · Craft · Drawing · Other Activities",
    text: "A creative studio culture where students build focus through karate, hands-on craft, drawing and a range of other fun activities.",
    gradient: "from-[#FF5F1F] to-accent-dark",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 17V5l11-2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    bg: (
      <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.6" fill="none">
          <rect x="30" y="180" width="70" height="70" rx="8" />
          <path d="M50 200h30M50 215h20" />
          <rect x="240" y="150" width="60" height="80" rx="6" />
          <path d="M330 90h40v40h-20l-10 60h-10" />
          <circle cx="345" cy="60" r="6" />
          <path d="M80 80a28 28 0 0 1 56 0" />
        </g>
        <g fill="rgba(255,255,255,0.55)">
          <circle cx="345" cy="60" r="4" />
          <circle cx="200" cy="90" r="5" />
        </g>
      </svg>
    ),
  },
  {
    title: "Languages",
    tag: "English · Kannada · Hindi · Arabic",
    text: "Immersive language learning across English, Kannada, Hindi and Arabic builds strong communication skills for a connected, global world.",
    gradient: "from-[#3B1FA8] to-primary-dark",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 12h17M12 3c2.5 2.5 3.5 5.8 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.8-3.5-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    bg: (
      <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none">
          <circle cx="200" cy="150" r="110" />
          <ellipse cx="200" cy="150" rx="110" ry="40" />
          <ellipse cx="200" cy="150" rx="40" ry="110" />
          <path d="M90 150h220M110 110c30 40 60 80 90 40 30-40 60 0 90 40M110 190c30-40 60-80 90-40 30 40 60 0 90-40" />
        </g>
        <g fill="rgba(255,255,255,0.5)">
          <circle cx="200" cy="150" r="4" />
        </g>
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
    gradient: "from-accent to-[#FF5F1F]",
    subjects: ["Rhymes & Stories", "Number Fun", "Art & Craft", "Motor Skills", "Outdoor Play"],
  },
  {
    band: "Primary School",
    grades: "Grade 1 – Grade 5",
    tag: "CBSE Curriculum",
    text: "A strong foundation in English, Kannada, Hindi, Mathematics, EVS and Computer Science. Concept-based learning with regular assessments, activities and moral values.",
    gradient: "from-primary to-secondary",
    subjects: ["English", "Kannada & Hindi", "Mathematics", "EVS", "Computer Science"],
  },
  {
    band: "Middle School",
    grades: "Grade 6 – Grade 8",
    tag: "CBSE Curriculum",
    text: "Students move from basics to deeper understanding with Science, Social Science, Mathematics and three languages, plus labs, projects and STEM activities.",
    gradient: "from-secondary to-primary",
    subjects: ["Science", "Social Science", "Mathematics", "English", "Computer Science"],
  },
  {
    band: "Secondary School",
    grades: "Grade 9 – Grade 10",
    tag: "CBSE Board Preparation",
    text: "Focused preparation for the CBSE board examinations with expert faculty, doubt-clearing sessions, model tests and career guidance for life after school.",
    gradient: "from-[#3B1FA8] to-primary",
    subjects: ["Mathematics", "Science", "Social Science", "Languages", "Board Preparation"],
  },
];

export default function Academics() {
  return (
    <section id="academics" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Academics"
          title="Programs We Offer"
          description="Beyond textbooks, we offer specialised programs that spark curiosity, creativity and future-ready skills in every student."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 130}>
              <div
                className={`group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br ${p.gradient} p-7 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-40">
                  {p.bg}
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                      {p.icon}
                    </div>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase backdrop-blur">
                      {p.tag.split(" · ")[0]}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-widest text-white/70 uppercase">
                    {p.tag}
                  </p>
                  <p className="mt-4 leading-relaxed text-white/85">{p.text}</p>
                  <div className="mt-6 h-1 w-12 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={260}>
            <div className="h-full rounded-3xl border-2 border-dashed border-primary/20 bg-background-soft p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/40">
              <p className="font-heading text-2xl font-bold text-primary">Plus more</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Debates, eco clubs, olympiads, community service and leadership
                programmes — there is a path for every passion.
              </p>
              <a
                href="#apply"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
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
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-14 rounded-3xl bg-foreground p-8 sm:p-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-sm font-semibold tracking-wide text-accent uppercase">
                  Our Curriculum
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                  Nursery To Grade 10 — A Learning Path For Every Stage
                </h3>
                <p className="mt-4 leading-relaxed text-white/80">
                  From playway early years to focused CBSE board preparation, our
                  curriculum grows with your child — building skills, knowledge and
                  confidence at every grade.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    Play-based Pre-Primary (Nursery – UKG)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    CBSE Curriculum for Grade 1 – Grade 5
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    CBSE Curriculum for Grade 6 – Grade 10
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
                    className="group rounded-2xl bg-white/10 p-5 backdrop-blur transition-colors hover:bg-white/15"
                  >
                    <span className={`inline-block rounded-full bg-gradient-to-r ${c.gradient} px-3 py-1 text-[11px] font-semibold text-white uppercase`}>
                      {c.tag}
                    </span>
                    <h4 className="mt-3 font-heading text-lg font-bold text-white">
                      {c.band}
                    </h4>
                    <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                      {c.grades}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/75">
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
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary p-8 sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="text-sm font-semibold tracking-wide text-accent uppercase">
                  World-Class Facilities
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                  A Campus Built For Learning & Play
                </h3>
                <p className="mt-4 leading-relaxed text-white/80">
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
                    className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
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
