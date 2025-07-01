import { FadeInBlur } from "@/components/ui/fade-in-blur";
import WorldMap from "@/components/ui/world-map";

export default function AboutPage() {
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

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-4 md:py-16">
      <div className="max-w-7xl w-full space-y-8 md:space-y-20">
        <FadeInBlur duration={1} delay={0.2}>
          <p className="text-gray-300 font-light tracking-normal text-base sm:text-lg text-center px-4">
            Transforming MENA's $96B technology vision into reality
            <br />
            through systematic venture building
          </p>
        </FadeInBlur>
        
        <FadeInBlur duration={1.2} delay={0.5}>
          <div className="w-full overflow-visible">
            <WorldMap dots={mapConnections} lineColor="#9ca3af" />
          </div>
        </FadeInBlur>
      </div>
    </div>
  );
} 