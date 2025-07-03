"use client";
import { animate, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SiAmazon, SiNvidia, SiAtlassian, SiNotion } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

export default function CardDemo() {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>$500K+ in Partner Credits</CardTitle>
      <CardDescription>
        World-class technology partners supporting your journey from idea to scale
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-ignore
      repeat: Infinity,
      repeatDelay: 1,
      delay: 0.6,
    });
  }, []);
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-2">
        <Container 
          className="h-8 w-8 circle-1"
          gradient="radial-gradient(circle at center, rgba(255, 153, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)"
        >
          <SiAmazon className="h-4 w-4 text-[#FF9900]" />
        </Container>
        <Container 
          className="h-12 w-12 circle-2"
          gradient="radial-gradient(circle at center, rgba(118, 185, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)"
        >
          <SiNvidia className="h-6 w-6 text-[#76B900]" />
        </Container>
        <Container 
          className="circle-3"
          gradient="radial-gradient(circle at center, rgba(66, 133, 244, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)"
        >
          <FcGoogle className="h-8 w-8" />
        </Container>
        <Container 
          className="h-12 w-12 circle-4"
          gradient="radial-gradient(circle at center, rgba(0, 82, 204, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)"
        >
          <SiAtlassian className="h-6 w-6 text-[#0052CC]" />
        </Container>
        <Container 
          className="h-8 w-8 circle-5"
          gradient="radial-gradient(circle at center, rgba(156, 163, 175, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)"
        >
          <SiNotion className="h-4 w-4 text-gray-300" />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};
const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-gray-600"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-xs w-full mx-auto p-6 rounded-xl border border-gray-900 bg-gray-950 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-base text-gray-300 py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-gray-500 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[12rem] md:h-[14rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-gray-900 [mask-image:radial-gradient(60%_60%_at_50%_50%,black_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
  gradient,
}: {
  className?: string;
  children: React.ReactNode;
  gradient?: string;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center
    shadow-[0px_0px_4px_0px_rgba(0,0,0,0.8)_inset,0px_16px_12px_-8px_rgba(0,0,0,0.9)]
    border border-gray-900/50`,
        className
      )}
      style={{
        background: gradient || 'rgba(3, 7, 18, 0.6)',
      }}
    >
      {children}
    </div>
  );
}; 