import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function TeamPage() {
  const teamMembers = [
    {
      quote:
        "Drawing from quantitative trading experience at Tower Research, Optiver, and Goldman Sachs, Sharad drives AiStudio's vision to build enterprise-grade AI ventures across industries. He leads strategic operations and venture development, architecting the framework that transforms innovative AI concepts into scalable startups",
      name: "Sharad",
      designation: "CEO",
      src: "https://aistudio.ae/sharad.jpeg",
    },
    {
      quote:
        "Former high frequency trader with 6 years experience, built a trading desk from the ground up at Maven Securities London and formerly at Optiver Amsterdam. Abhishek combines technical expertise with a builder mindset to develop end-to-end production-ready AI solutions",
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