import Logo from "./Logo";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 550, suffix: "+", label: "Students" },
  { value: 22, suffix: "+", label: "Expert Teachers" },
  { value: 4, suffix: "+", label: "Awards" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/school-hero.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[rgba(12,38,28,0.85)] via-[rgba(12,38,28,0.55)] to-transparent lg:from-[rgba(12,38,28,0.8)] lg:via-[rgba(12,38,28,0.35)] lg:to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <Logo className="h-5 w-5" />
                Peace International School, Harihar
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-heading text-4xl font-bold text-white text-balance sm:text-5xl lg:text-6xl">
                Shaping Minds. <br />
                <span className="text-accent">Building Futures.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 font-heading text-xl font-semibold text-white/90 sm:text-2xl">
                For A Better Tomorrow
              </p>
            </Reveal>
            <Reveal delay={360}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                We nurture curious minds and confident hearts with a world-class
                education rooted in values — helping every child discover their
                potential and lead with purpose.
              </p>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,138,0,0.45)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark animate-pulse-glow"
                >
                  Explore More
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
                  href="#apply"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Apply for Admission
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="rounded-3xl border border-white/30 bg-black/50 p-6 shadow-xl backdrop-blur-xl animate-float">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent font-heading text-2xl font-bold text-white">
                  PI
                </div>
                <div>
                  <p className="font-heading font-semibold text-white">
                    Welcome to Peace International
                  </p>
                  <p className="text-sm text-white/80">Admission Open for 2026–27</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/15 p-4 transition-transform hover:scale-105">
                  <p className="font-heading text-2xl font-bold text-accent">CBSE</p>
                  <p className="mt-1 text-sm text-white/80">Curriculum</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-4 transition-transform hover:scale-105">
                  <p className="font-heading text-2xl font-bold text-accent">Nursery</p>
                  <p className="mt-1 text-sm text-white/80">to Grade 10</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white p-4 shadow-lg shadow-primary-dark/20 transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <p className="font-heading text-2xl font-bold text-primary">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-foreground/60">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <svg
        className="block w-full text-white"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0h1440v40H0z" fill="currentColor" fillOpacity="0.06" />
      </svg>
    </section>
  );
}
