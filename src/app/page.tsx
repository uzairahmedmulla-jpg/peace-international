import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Academics from "@/components/Academics";
import WhyChoose from "@/components/WhyChoose";
import Admissions from "@/components/Admissions";
import Fees from "@/components/Fees";
import CampusLife from "@/components/CampusLife";
import Cta from "@/components/Cta";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Academics />
        <WhyChoose />
        <CampusLife />
        <Admissions />
        <Fees />
        <Cta />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
