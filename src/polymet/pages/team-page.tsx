import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function TeamPage() {
  const teamMembers = [
    {
      quote:
        "Quantitative trading veteran from Tower Research, Optiver, and Goldman Sachs. Sharad architects AiStudio's framework for transforming AI ventures into scalable, enterprise-grade products",
      name: "Sharad",
      designation: "CEO",
      src: "https://aistudio.ae/sharad.jpeg",
    },
    {
      quote:
        "Former HFT trader who built a trading desk from the ground up at Maven Securities London.  Previously at Optiver Amsterdam, Abhishek brings deep technical expertise to develop production-ready AI solutions",
      name: "Abhishek",
      designation: "CPO",
      src: "https://aistudio.ae/abhishek.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AnimatedTestimonials testimonials={teamMembers} autoplay={true} />
    </div>
  );
} 