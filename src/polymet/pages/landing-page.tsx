import { useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FadeInBlur } from "@/components/ui/fade-in-blur";
import CTAButton from "@/polymet/components/cta-button";
import RotatingPolygon from "@/polymet/components/rotating-polygon";

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);
  
  const heroText = "Where Systematic Thinkers Build AI-First Companies";

  return (
    <div className="flex flex-col items-center">
      <div className="mb-1">
        <RotatingPolygon />
      </div>

      <TextGenerateEffect 
        words={heroText} 
        className="mb-1 text-center max-w-3xl" 
        duration={0.8}
        onAnimationComplete={() => setShowButton(true)}
      />

      <FadeInBlur show={showButton} delay={0.2} duration={0.8} className="mt-4">
        <CTAButton label="Apply" />
      </FadeInBlur>
    </div>
  );
}
