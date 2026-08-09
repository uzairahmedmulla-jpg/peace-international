import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ReviewsSection from "@/components/ReviewsSection";
import ApplyNowButton from "@/components/apply/ApplyNowButton";

export const metadata: Metadata = {
  title: "Parent Reviews | Peace International School, Harihar",
  description:
    "Read reviews from parents and students of Peace International School, Harihar — and add your own review.",
};

export default function ReviewsPage() {
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
          <div className="absolute inset-0 bg-[#10122b]/50" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Parent Reviews
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-heading text-3xl font-bold text-white text-balance sm:text-5xl">
                What Our <span className="text-accent">Community Says</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                Read real experiences from parents and students — and share your
                own story with the Peace International family.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <ApplyNowButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark">
                Apply for Admission
              </ApplyNowButton>
            </Reveal>
          </div>
        </section>

        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
