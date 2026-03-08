import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Compare } from "@/components/Compare";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingShapes } from "@/components/FloatingShapes";
import { GridOverlay } from "@/components/GridOverlay";

export default function Home() {
  return (
    <>
      <CustomCursor />
      {/* Grid overlay with crosses and labels */}
      <GridOverlay />
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      <Navbar />
      <main className="relative z-1">
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
