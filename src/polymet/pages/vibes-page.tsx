import { Cover } from "@/components/ui/cover";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import CardDemo from "@/components/ui/cards-demo-3";
import { FadeInBlur } from "@/components/ui/fade-in-blur";

export default function VibesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 5;

  // Advisor data
  const advisors = [
    {
      name: "Aditya Nambiar",
      title: "Co-founder, Fennel AI",
      subtitle: "(Acquired by Databricks)",
      description: "Built data infrastructure for machine learning teams",
      image: "/images/advisors/aditya-C.jpg",
      linkedin: "https://www.linkedin.com/in/adityanambiar7/"
    },
    {
      name: "Sagar Savla",
      title: "Lead PM, Google DeepMind",
      subtitle: "(12+ years at Google, Meta)",
      description: "Lead for projects in CV and research around ML Fairness",
      image: "/images/advisors/Sagar-C.jpg",
      linkedin: "https://www.linkedin.com/in/sagarsavla/"
    },
    {
      name: "Hamza Naimi",
      title: "Principal, BCG Dubai",
      subtitle: "(6+ years in UAE)",
      description: "Strategic Advisor with deep ties in the UAE ecosystem",
      image: "/images/advisors/Hamza-C.jpg",
      linkedin: "https://www.linkedin.com/in/hamzanajmi/"
    },
    {
      name: "Ritika Bansal",
      title: "Leader, Nishith Desai Associates",
      subtitle: "(Global law firm, 100+ lawyers)",
      description: "International Arbitration, Corporate Litigation",
      image: "/images/advisors/Ritika-C.jpg",
      linkedin: "https://www.linkedin.com/in/ritika-bansal-705030131/"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      
      // Calculate current section
      const sectionHeight = scrollContainer.clientHeight;
      const section = Math.round(scrollTop / sectionHeight);
      setCurrentSection(section);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Scroll Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {[...Array(totalSections)].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const scrollContainer = scrollContainerRef.current;
              if (scrollContainer) {
                scrollContainer.scrollTo({
                  top: index * scrollContainer.clientHeight,
                  behavior: 'smooth'
                });
              }
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-gray-400 scale-125' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Scrollable container with snap points */}
      <div 
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* Internet Explorer 10+ */
        }}
      >
        {/* Section 1: Our Three-Pronged Approach */}
        <section className="h-screen flex items-center justify-center snap-start px-4">
          <FadeInBlur duration={1} delay={0.2}>
            <div className="text-center max-w-2xl">
              <h2 className="text-white text-2xl font-light mb-4">Our Three-Pronged Approach</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Strategy without black boxes. Build with AI-to-build-AI.<br />
                Deploy with embedded teams and aligned incentives.
              </p>
            </div>
          </FadeInBlur>
        </section>

        {/* Section 2: Velocity */}
        <section className="h-screen flex items-center justify-center snap-start">
          <div className="text-gray-300 font-light tracking-normal text-sm text-center">
            We believe the real MOAT today is
            <br />
            <Cover>velocity</Cover>
          </div>
        </section>

        {/* Section 3: Mission-Aligned Industry Leaders */}
        <section className="h-screen flex items-center justify-center snap-start px-4">
          <div className="max-w-4xl w-full">
            <h2 className="text-white text-xl font-light mb-12 text-center">Mission-Aligned Industry Leaders</h2>
            <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <a 
                    href={advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 cursor-pointer"
                  >
                    <img 
                      src={advisor.image} 
                      alt={advisor.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </a>
                  <h3 className="text-white text-sm font-medium">{advisor.name}</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {advisor.title}
                    {advisor.subtitle && <span className="block">{advisor.subtitle}</span>}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">{advisor.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Partner Ecosystem */}
        <section className="h-screen flex items-center justify-center snap-start px-4">
          <CardDemo />
        </section>

        {/* Section 5: AI Orchestration Layer */}
        <section className="h-screen flex items-center justify-center snap-start px-4">
          <div className="text-center max-w-4xl">
            <h2 className="text-white text-xl font-light mb-12">AI Orchestration Layer</h2>
            <div className="grid grid-cols-2 gap-12 mb-8">
              <div className="text-left">
                <h3 className="text-gray-300 text-base mb-6 text-center">Core Banking AI</h3>
                <div className="space-y-3">
                  {[
                    "Risk assessment & credit scoring",
                    "Fraud detection & AML compliance",
                    "Customer intelligence & personalization",
                    "Regulatory reporting automation"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-gray-600">→</span>
                      <span className="text-gray-400 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-gray-300 text-base mb-6 text-center">Operations AI</h3>
                <div className="space-y-3">
                  {[
                    "Document processing & extraction",
                    "Trade reconciliation & settlement",
                    "Portfolio optimization & rebalancing",
                    "Predictive maintenance & forecasting"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 4) * 0.15 }}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-gray-600">→</span>
                      <span className="text-gray-400 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="text-gray-300 font-light tracking-normal text-sm text-center">
                <Cover>Unified intelligence across your institution</Cover>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 