import { FadeInBlur } from "@/components/ui/fade-in-blur";
import { Cover } from "@/components/ui/cover";

export default function VibesPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-0 md:pt-0">
      <FadeInBlur duration={1} delay={0.2}>
        <p className="text-gray-300 font-light tracking-normal text-l text-center">
          We believe the real MOAT today is
          <br />
          <Cover>velocity</Cover>
        </p>
      </FadeInBlur>
    </div>
  );
} 