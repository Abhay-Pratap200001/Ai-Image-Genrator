import { Footer } from "@/components/Footer";
import { GalleryShowcaseSection } from "@/components/GalleryShowcaseSection";
import { HomeHeroSection } from "@/components/HomeHeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">
        <HomeHeroSection />
        <GalleryShowcaseSection />
        <HowItWorksSection />
        <Testimonials />
        <PricingSection/>
        <Footer/>
      </main>
    </div>
  );
}
