import { SiteFrameRoot } from "@/components/layout/SiteFrame";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { ProductFlow } from "@/components/sections/ProductFlow";
import { ProductSurfaces } from "@/components/sections/ProductSurfaces";
import { Integrations } from "@/components/sections/Integrations";
import { Footer } from "@/components/sections/Footer";
import { Testimonial } from "@/components/sections/Testimonial";
import { PlatformSection, PlatformMockup } from "@/components/sections/PlatformSection";
import { PlatformPillars } from "@/components/sections/PlatformPillars";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <PlatformSection />
      <SiteFrameRoot>
        <div className="site-frame-platform-lead overflow-visible">
          <PlatformMockup />
          <PlatformPillars />
        </div>
        <ProductFlow />
        <ProductSurfaces />
        <Testimonial />
        <Integrations />
      </SiteFrameRoot>
      <Footer />
    </>
  );
}
