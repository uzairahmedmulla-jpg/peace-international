import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary animate-gradient-x [background-size:200%_200%]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(255,138,0,0.35), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,138,0,0.3), transparent 40%)",
        }}
      />
      <svg
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 text-white/10 animate-spin-slow"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Limited Seats Available
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 font-heading text-3xl font-bold text-white text-balance sm:text-5xl">
            Admissions Open for <span className="text-accent">2026–2027</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Give your child the best foundation for a bright future.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,138,0,0.5)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark animate-pulse-glow"
            >
              Apply Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-heading text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              Book a Campus Tour
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
