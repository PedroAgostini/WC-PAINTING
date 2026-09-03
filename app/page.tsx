import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCall } from "@/components/layout/FloatingCall";
import { RevealObserver } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { ContactCta, MiddleCta } from "@/components/sections/CtaCards";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBand />
        <About />
        <Services />
        <MiddleCta />
        <Gallery />
        <WhyUs />
        <Reviews />
        <Process />
        <ContactCta />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
      <RevealObserver />
    </>
  );
}
