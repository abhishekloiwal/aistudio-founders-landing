import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function TeamPage() {
  const teamMembers = [
    {
      quote:
        "Quantitative trading veteran from Tower Research, Optiver, and Goldman Sachs. Sharad architects AiStudio's framework for transforming AI concepts into scalable, enterprise-grade ventures across industries",
      name: "Sharad",
      designation: "CEO",
      src: "https://aistudio.ae/sharad.jpeg",
      linkedin: "https://www.linkedin.com/in/sharad157/",
    },
    {
      quote:
        "Former HFT trader who built a trading desk from the ground up at Maven Securities London.  Previously at Optiver Amsterdam, Abhishek brings deep technical expertise to develop production-ready AI solutions",
      name: "Abhishek",
      designation: "CPO",
      src: "https://aistudio.ae/abhishek.jpg",
      linkedin: "https://www.linkedin.com/in/abhishekloiwal/",
    },
    {
      quote:
        "Former VC at Lightbox Ventures, architected the investment analytics system powering their $400M fund. Monish drives data-driven decision making for venture evaluation and portfolio performance",
      name: "Monish",
      designation: "VC",
      src: "https://lightbox.vc/uploads/team/20240422061001_monish_pathare,_lightbox_2024.jpg",
      linkedin: "https://www.linkedin.com/in/monish-pathare",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AnimatedTestimonials testimonials={teamMembers} autoplay={true} />
    </div>
  );
} 