"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  onAnimationComplete,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  onAnimationComplete?: () => void;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    ).then(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-gray-300 opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-light", className)}>
      <div className="mt-4">
        <div className="text-gray-300 text-sm leading-relaxed tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
}; 