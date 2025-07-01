"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FadeInBlur = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  show = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  show?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={show ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
      transition={{ delay, duration }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}; 