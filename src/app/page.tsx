import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Compare } from "@/components/Compare";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      
      {/* Fixed margin lines - frame the page */}
      <div className="grid-margin-left" />
      <div className="grid-margin-right" />
      
      <Navbar />
      <main className="relative z-1">
        <Hero />
        <LogoStrip />
        <Features />
        <HowItWorks />
        <Demo />
        <Compare />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
