import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  scale?: number;
}

// Custom hook to get responsive scale
function useResponsiveScale(overrideScale?: number) {
  const [scale, setScale] = useState(overrideScale || 1.75);

  useEffect(() => {
    if (overrideScale) {
      setScale(overrideScale);
      return;
    }

    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale(0.85); // Mobile
      } else if (width < 1024) {
        setScale(1.3); // Tablet  
      } else {
        setScale(1.75); // Desktop
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [overrideScale]);

  return scale;
}

export default function WorldMap({
  dots = [],
  lineColor = "#9ca3af", // gray-400 to match the theme
  scale: overrideScale,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const scale = useResponsiveScale(overrideScale);

  // DottedMap uses different dimensions, we need to match their coordinate system
  const MAP_WIDTH = 1024;
  const MAP_HEIGHT = 512;

  const projectPoint = (lat: number, lng: number) => {
    // Use simple Equirectangular projection (linear mapping)
    // This is likely what dotted-map uses internally
    const x = ((lng + 180) / 360) * MAP_WIDTH;
    const y = ((90 - lat) / 180) * MAP_HEIGHT;
    
    // Fine-tune alignment: dotted-map seems to have some padding/offset
    // Adjust these values if needed
    const xOffset = 0;
    const yOffset = 48;
    
    return { x: x + xOffset, y: y + yOffset };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 80;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Create dotted map
  useEffect(() => {
    if (containerRef.current) {
      const map = new DottedMap({ height: 60, grid: "diagonal" });
      
      const svgMap = map.getSVG({
        radius: 0.22,
        color: "#6b7280",
        shape: "circle",
        backgroundColor: "transparent",
      });

      // Create a wrapper div for the map
      const mapContainer = containerRef.current.querySelector('.map-container');
      if (mapContainer) {
        mapContainer.innerHTML = svgMap;
        // Style the generated SVG
        const svg = mapContainer.querySelector('svg');
        if (svg) {
          svg.style.width = '100%';
          svg.style.height = '100%';
          svg.style.opacity = '0.4';
        }
      }
    }
  }, []);

  // Add CSS for ping animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes worldmap-ping {
        0% {
          transform: scale(1);
          opacity: 0.4;
        }
        75% {
          transform: scale(2.5);
          opacity: 0;
        }
        100% {
          transform: scale(2.5);
          opacity: 0;
        }
      }
      .worldmap-animate-ping {
        animation: worldmap-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        transform-origin: center;
        transform-box: fill-box;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Debug: log coordinates to help with alignment
  useEffect(() => {
    dots.forEach((dot, i) => {
      const start = projectPoint(dot.start.lat, dot.start.lng);
      const end = projectPoint(dot.end.lat, dot.end.lng);
      console.log(`Connection ${i}:`, {
        [`${dot.start.label}`]: { lat: dot.start.lat, lng: dot.start.lng, x: start.x, y: start.y },
        [`${dot.end.label}`]: { lat: dot.end.lat, lng: dot.end.lng, x: end.x, y: end.y }
      });
    });
  }, [dots]);

  return (
    <div 
      ref={containerRef} 
      className="w-full aspect-[2/1] rounded-lg relative font-sans origin-center my-4 md:my-6 lg:my-8"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Map background */}
      <div className="map-container absolute inset-0 z-10" />
      
      {/* Connections and points overlay */}
      <svg
        className="absolute inset-0 z-20 w-full h-full"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const gradientId = `gradient-path-${i}`;
          
          return (
            <g key={`connection-${i}`}>
              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
                  <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Animated curved path */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 * i, ease: "easeOut" }}
              />

              {/* Start point (Dubai) - only render once */}
              {i === 0 && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <g transform={`translate(${startPoint.x}, ${startPoint.y})`}>
                    {/* Ping animation circle - ADJUST TIMING: Change 2s to your desired duration */}
                    <circle
                      r="4"
                      fill="white"
                      opacity="0.4"
                      className="worldmap-animate-ping"
                    />
                    {/* Static dot */}
                    <circle
                      r="3"
                      fill="white"
                    />
                    {/* Invisible hover area - 2x the size of the dot */}
                    <circle
                      r="12"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredCity(dot.start.label || null)}
                      onMouseLeave={() => setHoveredCity(null)}
                    />
                  </g>
                  {hoveredCity === dot.start.label && dot.start.label && (
                    <motion.text
                      x={startPoint.x}
                      y={startPoint.y - 20}
                      textAnchor="middle"
                      className="text-lg fill-gray-300 font-medium"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {dot.start.label}
                    </motion.text>
                  )}
                </motion.g>
              )}

              {/* End point */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 * i + 0.5 }}
              >
                <g transform={`translate(${endPoint.x}, ${endPoint.y})`}>
                  {/* Ping animation circle - ADJUST TIMING: Change 2s to your desired duration */}
                  <circle
                    r="4"
                    fill="white"
                    opacity="0.4"
                    className="worldmap-animate-ping"
                  />
                  {/* Static dot */}
                  <circle
                    r="3"
                    fill="white"
                  />
                  {/* Invisible hover area - 2x the size of the dot */}
                  <circle
                    r="12"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCity(dot.end.label || null)}
                    onMouseLeave={() => setHoveredCity(null)}
                  />
                </g>
                {hoveredCity === dot.end.label && dot.end.label && (
                  <motion.text
                    x={endPoint.x}
                    y={endPoint.y - 20}
                    textAnchor="middle"
                    className="text-lg fill-gray-300 font-medium"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {dot.end.label}
                  </motion.text>
                )}
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
} 