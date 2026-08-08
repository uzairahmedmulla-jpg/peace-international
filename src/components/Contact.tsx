import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

const contactDetails = [
  {
    label: "Visit Us",
    value: "Peace International School, Harihar, Karnataka",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 3h3l1.8 4.5-2.2 1.5a13 13 0 0 0 5.8 5.8l1.5-2.2L21 14.4v3a2.4 2.4 0 0 1-2.6 2.4C10.2 19.2 4.8 13.8 4.2 5.6A2.4 2.4 0 0 1 6.6 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Email Us",
    value: "info@peaceinternational.edu.in",
    href: "mailto:info@peaceinternational.edu.in",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "School Hours",
    value: "Mon – Sat · 8:30 AM – 4:30 PM",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-background-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title="We'd Love To Hear From You"
          description="Have a question about admissions, academics or campus visits? Reach out — our team responds within one working day."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={100}>
            <div className="space-y-4">
            {contactDetails.map((c) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold tracking-wide text-foreground/50 uppercase">
                      {c.label}
                    </span>
                    <span className="block font-medium text-foreground">{c.value}</span>
                  </span>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg shadow-primary/5 transition-all hover:-translate-y-0.5"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg shadow-primary/5"
                >
                  {inner}
                </div>
              );
            })}

            <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-lg">
              <p className="font-heading text-lg font-semibold">Admission Open</p>
              <p className="mt-1 text-sm text-white/80">
                For 2026–27 across Nursery to Grade 10.
              </p>
              <a
                href="#apply"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Apply Now
              </a>
            </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
