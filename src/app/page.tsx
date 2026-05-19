import { Hero } from "@/components/landing/Hero";
import { EventInfo } from "@/components/landing/EventInfo";
import { Activities } from "@/components/landing/Activities";
import { Gallery } from "@/components/landing/Gallery";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventInfo />
      <Activities />
      <Gallery />
      <CTASection />
      <Footer />
    </main>
  );
}
