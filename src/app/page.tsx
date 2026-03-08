import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Compare } from "@/components/Compare";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Hero />
        <HowItWorks />
        <Demo />
        <Features />
        <Compare />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
