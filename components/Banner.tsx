"use client"
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedTextCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // GSAP animations
  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current || !isInView) return;

      // Get all letter elements
      const letters = textRef.current.querySelectorAll(".splash-letter");

      // Initially hide all letters, position them off-screen to the right,
      // and set a blur effect (similar to Splash component)
      gsap.set(letters, {
        opacity: 0,
        x: "100vw",
        filter: "blur(20px)",
      });

      // Create main timeline
      const tl = gsap.timeline();

      // Animate each letter one by one, fading in and removing the blur as it reaches its place
      // This matches the animation in the Splash component
      letters.forEach((letter, index) => {
        tl.to(
          letter,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
          },
          index * 0.1
        );
      });

      // Animate the scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.5,
            ease: "power2.out",
          }
        );

        // Create pulsing animation for scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef, dependencies: [isInView] }
  );

  // Text content - split into parts for responsive layout
  const textFirstLine = "Why did I";
  const textSecondLine = "choose";
  const textThirdLine = "programming";

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col py-10  items-center justify-center  overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              background: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0) 70%)`,
              width: `${30 + i * 10}vw`,
              height: `${30 + i * 10}vw`,
              left: `${50 + i * 5 * (i % 2 === 0 ? 1 : -1)}%`,
              top: `${50 + i * 3 * (i % 2 === 0 ? -1 : 1)}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

            {/* Main text - responsive layout */}
            <div
        ref={textRef}
        className="text-black font-gelline md:text-7xl text-6xl tracking-wider uppercase m-2 text-center flex flex-col md:block md:space-x-4"
      >
        {/* First line - "Why did I" */}
        <div className="block md:inline">
          {textFirstLine.split("").map((letter, index) => (
            <span
              key={`first-${index}`}
              className={`splash-letter relative inline-block opacity-0 ${
                letter === " " ? "md:w-5 w-[17px]" : ""
              }`}
              style={{
                willChange: "transform, opacity, filter",
                backfaceVisibility: "hidden",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {/* Second line - "choose" */}
        <div className="block md:inline -mt-2 md:mt-0">
          {textSecondLine.split("").map((letter, index) => (
            <span
              key={`second-${index}`}
              className={`splash-letter relative inline-block opacity-0`}
              style={{
                willChange: "transform, opacity, filter",
                backfaceVisibility: "hidden",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {/* Third line - "programming" */}
        <div className="block md:inline -mt-2 md:mt-0">
          {textThirdLine.split("").map((letter, index) => (
            <span
              key={`third-${index}`}
              className={`splash-letter relative inline-block opacity-0`}
              style={{
                willChange: "transform, opacity, filter",
                backfaceVisibility: "hidden",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Elegant line separator */}
      <motion.div
        className="w-24 h-px bg-gradient-to-r from-transparent via-black to-transparent my-4"
        initial={{ width: 0, opacity: 0 }}
        animate={
          isInView ? { width: 96, opacity: 0.7 } : { width: 0, opacity: 0 }
        }
        transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
      />

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="flex flex-col items-center mt-2 mb-4 opacity-0"
      >
        <span className="text-sm text-black mb-2 tracking-wider">Scroll</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Subtle code symbols floating in background */}
      {["{ }", "( )", "< >", "[ ]"].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-xs md:text-sm font-gelline opacity-10 text-black"
          style={{
            left: `${15 + i * 20}%`,
            
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedTextCard;