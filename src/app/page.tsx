import { CustomCursor } from "@/components/CustomCursor";
import { CosmicCanvas } from "@/components/CosmicCanvas";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { HowItWorks } from "@/components/HowItWorks";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Compare } from "@/components/Compare";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { FloatingButton } from "@/components/FloatingButton";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <CosmicCanvas />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Demo />
        <Features />
        <Compare />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
      <FloatingButton />
    </>
  );
}
