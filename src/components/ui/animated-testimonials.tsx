"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 7500);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length, active]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto max-w-xs px-4 py-12 font-sans antialiased md:max-w-2xl md:px-8 lg:px-12 md:py-16">
      <div className="relative grid grid-cols-1 gap-12 md:gap-16 md:grid-cols-2">
        <div>
          <div className="relative h-56 w-full md:h-64 lg:h-72">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-2xl object-cover object-center grayscale"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-2 md:py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-xs md:text-sm text-gray-400">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-4 md:mt-6 text-sm md:text-base text-gray-300 leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-8 md:pt-12">
            <button
              onClick={handlePrev}
              className="group/button flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
            >
              <IconArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-400 transition-colors duration-300 group-hover/button:text-gray-300" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
            >
              <IconArrowRight className="h-4 w-4 md:h-5 md:w-5 text-gray-400 transition-colors duration-300 group-hover/button:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 