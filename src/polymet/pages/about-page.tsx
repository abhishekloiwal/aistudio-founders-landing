import { FadeInBlur } from "@/components/ui/fade-in-blur";
import WorldMap from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function AboutPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 3;

  const mapConnections = [
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" }, // Dubai (center)
      end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" }, // SF
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" }, // Dubai (center)
      end: { lat: 40.7128, lng: -74.0060, label: "New York" }, // New York
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" }, // Dubai (center)
      end: { lat: 51.5074, lng: -0.1278, label: "London" }, // London
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" }, // Dubai (center)
      end: { lat: 19.0760, lng: 72.8777, label: "Mumbai" }, // Mumbai
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" }, // Dubai (center)
      end: { lat: 12.9716, lng: 77.5946, label: "Bangalore" }, // Bangalore
    },
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
        {/* Section 1: The Problem We Solve */}
        <section className="h-screen snap-start">
          <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
            <div className="max-w-7xl w-full space-y-12">
              <FadeInBlur duration={1} delay={0.2}>
                <p className="text-gray-300 font-light tracking-normal text-sm text-center">
                  Too many Financial AI projects deliver shiny demos but underdeliver on business outcomes
                  <br />
                  We deliver production-ready solutions that drive measurable outcomes
                </p>
              </FadeInBlur>
              
              <FadeInBlur duration={1.2} delay={0.5}>
                <div className="w-full overflow-visible">
                  <WorldMap dots={mapConnections} lineColor="#9ca3af" scale={1.0} />
                </div>
              </FadeInBlur>
            </div>
          </div>
        </section>

        {/* Section 2: Our Approach */}
        <section className="h-screen flex items-center justify-center snap-start px-4">
          <div className="text-center max-w-4xl">
            <FadeInBlur duration={1} delay={0.2}>
              <h2 className="text-white text-2xl font-light mb-8">Outcome-Driven Partnership</h2>
              <div className="text-gray-300 font-light tracking-normal text-sm mb-8">
                No Black Boxes. Full Transparency. Aligned Incentives.
              </div>
            </FadeInBlur>
            
            <FadeInBlur duration={1.2} delay={0.5}>
              <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                <p>
                  Our founders built trading systems managing $200MM+ at Tower Research and Optiver. We understand the rigor financial institutions demand—observability, governance, and measurable returns.
                </p>
                <p>
                  We embed with your teams, structure our engagement around measurable outcomes, and deliver production-ready AI with the speed and rigor your institution demands. Every model, prompt, and decision is transparent and auditable.
                </p>
                <p className="text-gray-300">
                  We don't build demos. We build systems that generate value from day one.
                </p>
              </div>
            </FadeInBlur>
          </div>
        </section>

        {/* Section 3: Why AI Studio */}
        <section className="h-screen flex items-center justify-center snap-start px-4">
          <div className="text-center max-w-4xl">
            <FadeInBlur duration={1} delay={0.2}>
              <h2 className="text-white text-2xl font-light mb-8">Why AI Studio</h2>
              <div className="text-gray-300 font-light tracking-normal text-sm mb-8">
                Accelerating Your AI Transformation with Production-Grade Solutions
              </div>
            </FadeInBlur>
            
            <FadeInBlur duration={1.2} delay={0.5}>
              <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                <p>
                  While consultants deliver PowerPoints and vendors push black-box solutions, we build. Our AI-to-build-AI approach accelerates delivery while maintaining finance-grade standards.
                </p>
                <div className="grid grid-cols-3 gap-8 my-8">
                  {[
                    { title: "2-Week Workshop", desc: "AI North Star Defined" },
                    { title: "Rapid Deployment", desc: "Production-Ready" },
                    { title: "Outcome-Based", desc: "Aligned Incentives" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-center"
                    >
                      <div className="text-gray-300 font-medium text-sm">{item.title}</div>
                      <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-300">
                  We're not another vendor. We're your technical co-founders for the AI transformation journey.
                </p>
              </div>
            </FadeInBlur>
          </div>
        </section>
      </div>
    </div>
  );
} 