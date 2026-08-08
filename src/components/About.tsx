import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const pillars = [
  {
    title: "Our Mission",
    text: "To provide a safe, joyful and inspiring learning environment that develops lifelong learners and responsible global citizens.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    text: "To be a centre of excellence that empowers every student to dream big, think critically and contribute meaningfully to society.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-5.5-2 2m-7 7-2 2m11 0-2-2m-7-7-2-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Our Values",
    text: "Respect, integrity, compassion and curiosity guide everything we do — in the classroom, on the field and beyond.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 20s-7-4.5-9-9c-1.5-3.5 1-7 4.5-7 2 0 3 1 4.5 2.5C13.5 5 14.5 4 16.5 4 20 4 22.5 7.5 21 11c-2 4.5-9 9-9 9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="bg-background-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title="Our Mission & Vision"
          description="Established in the heart of Harihar, Peace International School blends a rigorous CBSE curriculum with values-driven education — so every student grows with confidence and character."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 130}>
              <div
                className={`group h-full rounded-3xl p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "bg-white"
                }`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    i % 2 === 0 ? "bg-accent text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {p.icon}
                </div>
                <h3
                  className={`mt-5 font-heading text-xl font-semibold ${
                    i % 2 === 0 ? "text-white" : "text-foreground"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-3 leading-relaxed ${
                    i % 2 === 0 ? "text-white/85" : "text-foreground/70"
                  }`}
                >
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-14 rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary p-8 text-white shadow-xl sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="font-heading text-lg font-semibold text-accent">
                  Principal&apos;s Message
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 font-heading text-sm font-bold">
                    PD
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold">Principal&apos;s Desk</p>
                    <p className="text-xs text-white/70">
                      Peace International School, Harihar
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                &ldquo;Every child is a universe of possibility. At Peace
                International School, our role is not just to teach — it is to
                awaken curiosity, build character and prepare young minds for the
                world of tomorrow. We invite you to be part of this journey.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
