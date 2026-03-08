import { CosmicCanvas } from "@/components/CosmicCanvas";
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
      <CosmicCanvas />
      <Navbar />
      <main>
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
