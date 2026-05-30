import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { ProductFlow } from "@/components/sections/ProductFlow";
import { ProductSurfaces } from "@/components/sections/ProductSurfaces";
import { Integrations } from "@/components/sections/Integrations";
import { Footer } from "@/components/sections/Footer";
import { Testimonial } from "@/components/sections/Testimonial";
import { PlatformSection } from "@/components/sections/PlatformSection";
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <PlatformSection />
      <ProductFlow />
      <ProductSurfaces />
      <Testimonial />
      <Integrations />
      <Footer />
    </>
  );
}
