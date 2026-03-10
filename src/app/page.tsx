import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { StarBackground } from "@/components/StarBackground";

export default function Home() {
  return (
    <>
      <StarBackground />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Demo />
        <Features />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
