// src/app/page.tsx

import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import CTASection from "@/components/CTASection";
import PurposeGrid from "@/components/PurposeGrid";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <section className="py-20 px-6">
        <FeatureCards />
      </section>
      <section className="py-20 px-6">
        <CTASection />
      </section>
      <section className="px-6">
        <CategoryGrid />
      </section>
      <section className="px-6">
        <PurposeGrid />
      </section>
    </main>
  );
}
