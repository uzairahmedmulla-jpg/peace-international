import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MediaImage from "@/components/MediaImage";

const activities = [
  {
    slug: "sports",
    title: "Sports & Athletics",
    tag: "Sports",
    description:
      "Football, cricket, athletics and indoor games that build teamwork, discipline and fitness. Explore our sports gallery and videos.",
    longText:
      "Physical education is a core part of life at Peace International. Through football, cricket, athletics, indoor games and more, students learn teamwork, resilience and the value of an active lifestyle.",
  },
  {
    slug: "arts",
    title: "Arts & Creativity",
    tag: "Arts",
    description:
      "Music, dance, drama and fine arts help every student find their expressive voice. Explore our arts gallery and videos.",
    longText:
      "Our arts programme nurtures imagination and confidence. From music and dance to drama and fine arts, every student discovers a creative outlet that stays with them for life.",
    video: "/campus/art.mp4",
  },
  {
    slug: "clubs",
    title: "Clubs & Activities",
    tag: "Clubs",
    description:
      "Debate, robotics, eco and literary clubs that spark curiosity beyond the classroom. Explore our clubs gallery and videos.",
    longText:
      "Clubs are where curiosity comes alive. Debate, robotics, eco and literary clubs give students hands-on opportunities to lead, create and collaborate beyond the regular timetable.",
  },
  {
    slug: "annual-events",
    title: "Annual Events",
    tag: "Events",
    description:
      "Fests, sports day and cultural celebrations bring the whole community together. Explore our events gallery and videos.",
    longText:
      "Annual fests, sports day and cultural celebrations are the highlights of our school calendar — joyful occasions where the entire Peace family comes together to celebrate talent and togetherness.",
  },
];

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) return { title: "Not Found" };
  return {
    title: `${activity.title} | Peace International School, Harihar`,
    description: activity.description,
  };
}

export default async function CampusLifeActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) notFound();

  const images = Array.from(
    { length: 4 },
    (_, i) => `/campus-life/${slug}-${i + 1}.jpg`,
  );
  const videos = Array.from({ length: 2 }, (_, i) => ({
    src: `/campus-life/${slug}-${i + 1}.mp4`,
    title: `${activity.title} Video ${i + 1}`,
  }));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="neon-section py-16 sm:py-20">
          <div className="neon-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <Link
                href="/#campus-life"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 3 5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Campus Life
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <span className="mt-6 block text-xs font-bold tracking-[0.2em] text-accent uppercase">
                Campus Life · {activity.tag}
              </span>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-5xl">
                {activity.title}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">
                {activity.longText}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="neon-section py-20 sm:py-24">
          <div className="neon-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
                  <span className="h-px w-6 bg-accent" />
                  Gallery
                  <span className="h-px w-6 bg-accent" />
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white text-balance sm:text-4xl">
                  Moments From {activity.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/70">
                  A glimpse of the experiences, energy and joy in this part of campus life.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {images.map((src, i) => (
                <Reveal key={src} delay={(i % 2) * 130}>
                  <MediaImage
                    src={src}
                    alt={`${activity.title} image ${i + 1}`}
                    className="h-72 rounded-[1.75rem] shadow-soft"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="neon-section py-20 sm:py-24">
          <div className="neon-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
                  <span className="h-px w-6 bg-accent" />
                  Videos
                  <span className="h-px w-6 bg-accent" />
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white text-balance sm:text-4xl">
                  {activity.title} In Motion
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/70">
                  Watch highlights and moments captured on our campus.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {activity.video ? (
                <Reveal>
                  <video
                    src={activity.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="card-3d aspect-video w-full rounded-[1.75rem] border border-white/10 bg-black shadow-soft"
                  >
                    Your browser does not support the video tag.
                  </video>
                </Reveal>
              ) : (
                videos.map((video, i) => (
                  <Reveal key={video.src} delay={i * 150}>
                    <div className="card-3d relative flex aspect-video items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] shadow-soft">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,0,0.18),transparent_55%)]" />
                      <div className="relative flex flex-col items-center gap-3 p-8 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" />
                            <path d="m10 8.5 5 3.5-5 3.5v-7Z" fill="white" />
                          </svg>
                        </span>
                        <p className="font-heading text-lg font-semibold text-white">
                          {video.title}
                        </p>
                        <p className="text-xs text-white/40">Video coming soon</p>
                      </div>
                    </div>
                  </Reveal>
                ))
              )}
            </div>

            <Reveal delay={150}>
              <div className="mt-14 text-center">
                <Link
                  href="/#apply"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,122,0,0.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  Apply for Admission
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
