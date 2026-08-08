import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const steps = [
  {
    step: "01",
    title: "Enquiry & Visit",
    text: "Reach out to us, explore our campus and meet our team to understand what makes Peace International special.",
  },
  {
    step: "02",
    title: "Submit Application",
    text: "Fill the admission form online or at the school office with the required documents.",
  },
  {
    step: "03",
    title: "Interaction",
    text: "A friendly interaction with the child and parents helps us get to know each other better.",
  },
  {
    step: "04",
    title: "Confirmation",
    text: "Receive the offer, complete the fee formalities and welcome your child to the Peace family.",
  },
];

const docs = [
  "Birth certificate (photocopy)",
  "Previous school report card",
  "Transfer certificate (where applicable)",
  "Passport-size photographs",
  "Aadhaar card of parent/child",
];

export default function Admissions() {
  return (
    <section id="admissions" className="bg-background-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Admissions"
          title="Admission Open For 2026–27"
          description="Joining Peace International School is simple and transparent. Here is everything you need to know to begin your child's journey with us."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={(i % 4) * 120}>
              <div className="relative h-full rounded-3xl bg-white p-7 pt-9 shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <span className="absolute -top-4 left-7 inline-flex h-9 items-center rounded-full bg-accent px-4 font-heading text-sm font-bold text-white">
                  Step {s.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div
            id="apply"
            className="mt-14 grid overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-[1.2fr_0.8fr]"
          >
          <div className="p-8 sm:p-12">
            <span className="text-sm font-semibold tracking-wide text-accent uppercase">
              Required Documents
            </span>
            <h3 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Ready To Begin?
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/70">
              Keep these documents handy when you apply. Our admissions team is
              happy to help you at every step — in person or over the phone.
            </p>
            <ul className="mt-6 space-y-3">
              {docs.map((d) => (
                <li key={d} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M3 7.5 6 10l5-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col justify-center bg-gradient-to-br from-primary to-secondary p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,138,0,0.35),transparent_45%)]" />
            <div className="relative">
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                Apply Now
              </p>
              <h4 className="mt-3 font-heading text-2xl font-bold text-white">
                Admissions Helpline
              </h4>
              <p className="mt-2 text-white/80">
                For queries about admission, fees and scholarships, our team is
                ready to guide you.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6.6 3h3l1.8 4.5-2.2 1.5a13 13 0 0 0 5.8 5.8l1.5-2.2L21 14.4v3a2.4 2.4 0 0 1-2.6 2.4C10.2 19.2 4.8 13.8 4.2 5.6A2.4 2.4 0 0 1 6.6 3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +91 98765 43210
                </a>
                <a
                  href="mailto:admissions@peaceinternational.edu.in"
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  admissions@peaceinternational.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
