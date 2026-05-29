import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { ProductFlow } from "@/components/sections/ProductFlow";
import { WorkflowCards } from "@/components/sections/WorkflowCards";
import { Integrations } from "@/components/sections/Integrations";
import { Testimonial } from "@/components/sections/Testimonial";
import { PlatformSection } from "@/components/sections/PlatformSection";
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <PlatformSection />
      <ProductFlow />
      <WorkflowCards />
      <Testimonial />
      <Integrations />
    </>
  );
}
