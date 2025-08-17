import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FadeInBlur } from "@/components/ui/fade-in-blur";
import CTAButton from "@/polymet/components/cta-button";
import RotatingPolygon from "@/polymet/components/rotating-polygon";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  
  const heroText = "The AI Partner for Financial Institutions";

  return (
    <div className="flex flex-col items-center">
      <div className="mb-1">
        <RotatingPolygon />
      </div>

      <TextGenerateEffect 
        words={heroText} 
        className="mb-1 text-center max-w-3xl select-none" 
        duration={0.8}
        onAnimationComplete={() => setShowButton(true)}
      />

      <FadeInBlur show={showButton} delay={0.2} duration={0.8} className="mt-4">
        <CTAButton label="Get in Touch" onClick={() => navigate("/apply")} />
      </FadeInBlur>
    </div>
  );
}

