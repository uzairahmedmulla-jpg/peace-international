import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Campus Tour | Peace International School, Harihar",
  description:
    "Take a virtual tour of Peace International School, Harihar — explore our campus photos and videos, classrooms, labs, playgrounds and more.",
};

const images = [
  {
    src: "/campus/campus-1.jpg",
    alt: "Peace International School campus view",
  },
  {
    src: "/campus/campus-2.jpg",
    alt: "Peace International School building",
  },
  {
    src: "/campus/campus-3.jpg",
    alt: "Peace International School playground",
  },
];

const videos = [
  {
    src: "/campus/campus-video-1.mp4",
    title: "Campus Tour Video 1",
  },
  {
    src: "/campus/campus-video-2.mp4",
    title: "Campus Tour Video 2",
  },
];

const highlights = [
  { title: "Smart Classrooms", text: "Digital-first classrooms with interactive boards for activity-based learning." },
  { title: "Science & Computer Labs", text: "Fully-equipped labs for hands-on experiments and coding." },
  { title: "Library & Reading Corner", text: "A calm space that builds a lifelong love for reading." },
  { title: "Sports Grounds", text: "Volleyball, throwball, cricket, running and relay facilities." },
  { title: "Camera Security", text: "CCTV-monitored campus with strict safety protocols." },
  { title: "Safe Transport", text: "Supervised, safe and reliable transport for students." },
];

export default function CampusPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-foreground">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/school-hero.jpg)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-secondary/50 to-primary/70" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Virtual Campus Tour
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-heading text-3xl font-bold text-white text-balance sm:text-5xl">
                Explore Our <span className="text-accent">Campus</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                Take a closer look at Peace International School, Harihar — our
                classrooms, labs, playgrounds and everyday moments captured in
                photos and videos.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <Link
                href="/#apply"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Apply for Admission
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
                  <span className="h-px w-6 bg-accent" />
                  Campus Gallery
                  <span className="h-px w-6 bg-accent" />
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground text-balance sm:text-4xl">
                  Our Campus In Pictures
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-foreground/70">
                  A glimpse of the spaces where your child will learn, play and grow.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img, i) => (
                <Reveal key={img.src} delay={(i % 3) * 130}>
                  <figure className="group overflow-hidden rounded-3xl bg-white shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="p-5">
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {img.alt}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background-soft py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
                  <span className="h-px w-6 bg-accent" />
                  Campus Videos
                  <span className="h-px w-6 bg-accent" />
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground text-balance sm:text-4xl">
                  Experience The Campus In Motion
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-foreground/70">
                  Walk with us through the campus through our short video tours.
                </p>              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {videos.map((video, i) => (
                <Reveal key={video.src} delay={i * 150}>
                  <figure className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-primary/5">
                    <video
                      controls
                      preload="metadata"
                      poster="/campus/campus-1.jpg"
                      className="mx-auto aspect-[9/16] max-h-[70vh] w-auto bg-black object-cover"
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <figcaption className="p-5">
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {video.title}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
                  <span className="h-px w-6 bg-accent" />
                  What You&apos;ll Find
                  <span className="h-px w-6 bg-accent" />
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground text-balance sm:text-4xl">
                  Facilities Across Our Campus
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-foreground/70">
                  Everything your child needs for learning, safety and fun in one place.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={(i % 3) * 130}>
                  <div className="h-full rounded-3xl bg-gradient-to-br from-primary to-secondary p-7 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent font-heading text-lg font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold">{h.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={150}>
              <div className="mt-14 rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary p-8 text-center shadow-xl sm:p-12">
                <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  Ready To See It In Person?
                </h3>
                <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/85">
                  Book a campus visit to walk through the classrooms, meet our
                  teachers and experience Peace International first-hand.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                  >
                    Book a Campus Tour
                  </Link>
                  <Link
                    href="/#apply"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                  >
                    Apply for Admission
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
