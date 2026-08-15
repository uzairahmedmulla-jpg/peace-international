import Logo from "./Logo";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";
import ApplyNowButton from "./apply/ApplyNowButton";

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
      <div className="absolute inset-0 bg-[#10122b]/40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 500px at 15% 20%, rgba(81,48,201,0.22), transparent 60%), radial-gradient(900px 500px at 90% 80%, rgba(255,122,0,0.14), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
                <Logo className="h-5 w-5 rounded-lg" />
                Peace International School, Harihar
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
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
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                We nurture curious minds and confident hearts with a world-class
                education rooted in values — helping every child discover their
                potential and lead with purpose.
              </p>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,122,0,0.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
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
                <ApplyNowButton className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-heading text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/60 hover:bg-white/10">
                  Apply for Admission
                </ApplyNowButton>
              </div>
            </Reveal>
          </div>

          <div className="perspective">
            <Reveal delay={200} className="relative">
              <div className="card-3d relative rounded-[2rem] border border-white/25 bg-white/25 p-7 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="lift">
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent font-heading text-xl font-bold text-white shadow-[0_8px_20px_rgba(255,122,0,0.4)]">
                      PI
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-white">
                        Welcome to Peace International
                      </p>
                      <p className="text-sm font-medium text-white">Admission Open for 2026–27</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/25 bg-white/25 p-4 transition-transform hover:scale-[1.03]">
                    <p className="font-heading text-2xl font-extrabold text-white">Nursery</p>
                    <p className="mt-1 text-sm font-medium text-white">to Grade 10</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="card-3d rounded-2xl border border-white/30 bg-white/30 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                  >
                    <div className="lift-sm">
                      <p className="font-heading text-2xl font-extrabold text-white">
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 text-xs font-semibold text-white">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
