"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Instagram, Github } from "lucide-react";
import { motion, useWillChange } from "framer-motion";
import Image from "next/image";

interface ScrollIndicatorProps {
  color?: string;
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  color = "black",
  className = "",
}) => {
  return (
    <div className={className}>
      {/* Mouse shape container */}
      <div
        className={`relative w-[30px] h-[50px] border-2 border-${color} rounded-full mb-4 cursor-pointer`}
        style={{ boxSizing: "border-box" }}
      >
        {/* Animated dot inside mouse */}
        <div
          className={`absolute left-1/2 -ml-[3px] w-[6px] h-[6px] bg-${color} rounded-full`}
          style={{
            bottom: "30px",
            boxShadow: `0px -5px 3px 1px rgba(42, 84, 112, 0.4)`,
            animation: "scrollDownDot 2s infinite",
          }}
        />
      </div>

      {/* Chevrons container */}
      <div className="pt-[6px] w-[30px] flex flex-col items-center -mt-2">
        {/* First chevron */}
        <div
          className={`relative border-solid border-${color} border-r-[3px] border-b-[3px] border-l-0 border-t-0 inline-block w-[10px] h-[10px] rotate-45 -mt-[6px]`}
          style={{ animation: "pulseChevron 500ms ease infinite alternate" }}
        />
        {/* Second chevron */}
        <div
          className={`relative border-solid border-${color} border-r-[3px] border-b-[3px] border-l-0 border-t-0 inline-block w-[10px] h-[10px] rotate-45 -mt-[6px]`}
          style={{
            animation: "pulseChevron 500ms ease infinite alternate 250ms",
          }}
        />
      </div>

      {/* Required keyframe animations */}
      <style jsx>{`
        @keyframes scrollDownDot {
          0% {
            opacity: 0;
            height: 6px;
          }
          40% {
            opacity: 1;
            height: 10px;
          }
          80% {
            transform: translate(0, 20px);
            height: 10px;
            opacity: 0;
          }
          100% {
            height: 3px;
            opacity: 0;
          }
        }

        @keyframes pulseChevron {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

// Removed canvas interfaces since they're not used in the provided code

const Hero: React.FC = () => {
  const willChange = useWillChange();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const resizeTimeout = useRef<NodeJS.Timeout>(null as any);

  const checkScreenSize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    checkScreenSize();

    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout.current);
    };
  }, [checkScreenSize]);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="box-border relative w-full md:w-[90%] lg:w-[80%] h-screen mx-auto"
      style={{ willChange }}
    >
      {/* Social Icons - Removed will-change from className */}
      <motion.div
        className="absolute left-0 md:top-[40%] top-[10%] ml-2 md:ml-0 scale-90 md:scale-100 w-[8%] flex flex-col items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Instagram size={30} color="black" className="cursor-pointer m-4" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Github size={30} color="black" className="cursor-pointer m-4" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 cursor-pointer m-4"
          >
            <path
              fill="currentColor"
              d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Main Content Area - Removed will-change from className */}
      <div className="absolute top-0 left-0 w-full h-[90%] flex flex-col items-center sm:flex-row sm:top-[20%] sm:left-auto sm:right-0 sm:w-[85%] sm:h-[60%]">
        {/* Image Block */}
        <motion.div
          initial={
            isSmallScreen ? { opacity: 0, y: -200 } : { opacity: 0, x: 100 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3, delay: 3, ease: "easeOut" }}
          className="order-1 sm:order-2 min-w-[40vh] min-h-[40vh] sm:w-[45%] sm:h-full p-4 mt-12 relative"
        >
          <motion.div
            className="wave-reveal w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            style={{ transform: "translateZ(0)" }} // Promote to own layer
          >
            <Image
              src="/Hero.jpg"
              fill
              className="wave-image object-cover"
              alt="Profile"
              sizes="(max-width: 640px) 100vw, 45vw"
              priority
              quality={85}
              style={{
                transform: "scale(1.15)",
                transition:
                  "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Text Content Block */}
        <div className="order-2 sm:order-1 w-full sm:w-[55%] h-auto sm:h-full flex flex-col justify-center px-4 sm:px-0 relative">
          <div className="hero-name font-gelline text-6xl sm:text-7xl tracking-wider uppercase m-2 text-black">
            Ali Ghorbani
          </div>
          <div className="w-full h-5 pb-3 flex items-center">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "25%" }}
              transition={{ duration: 1, delay: 3 }}
              className="h-[1px] bg-black"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, delay: 3 }}
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              className="typewriter font-sans text-black text-lg sm:text-2xl mx-2"
            >
              Full Stack Developer
            </motion.div>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "fit-content", opacity: 1 }}
            transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
            className="text-sm sm:text-xl text-black p-2 md:pt-3 -mt-2 w-full overflow-hidden"
          >
            Hi, I'm Ali Ghorbani from Karaj. I'm a full-stack developer focused
            on crafting clean, effective digital experiences. I blend thoughtful
            design with practical solutions.
          </motion.div>
          <motion.button
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "fit-content", opacity: 1 }}
            transition={{ duration: 0.3, delay: 4.3, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex self-start h-12 mt-[8%] md:mt-[12%] overflow-hidden rounded-xl  sm:mt-[10%] ml-2 sm:ml-0 p-[2px] focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#FFFFFF_50%,#000000_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-7 text-sm font-medium text-black backdrop-blur-3xl gap-2">
              Contact me
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 448 512"
                className="h-[1em] w-[1em]"
              >
                <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
              </svg>
            </span>
          </motion.button>
        </div>
      </div>
      <ScrollIndicator className=" flex-col items-center py-5 hidden md:flex absolute bottom-10 left-1/2 " />

      <style jsx global>{`
        /* Optimized animations */
        .wave-reveal {
          animation: wave-mask 8s linear infinite;
          overflow: hidden;
          position: relative;
          transform: translateZ(0); /* Hardware acceleration */
        }

        @keyframes wave-mask {
          0%,
          100% {
            border-radius: 50%;
          }
          12.5% {
            border-radius: 65% 35% 65% 32%;
          }
          25% {
            border-radius: 60% 40% 55% 45%;
          }
          37.5% {
            border-radius: 35% 65% 42% 66%;
          }
          50% {
            border-radius: 50% 50% 45% 60%;
          }
          62.5% {
            border-radius: 65% 45% 50% 30%;
          }
          75% {
            border-radius: 45% 70% 65% 45%;
          }
          87.5% {
            border-radius: 50% 50% 68% 43%;
          }
        }

        .wave-reveal::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 0.8);
          animation: pulse-border 2s ease-in-out infinite alternate;
          pointer-events: none;
        }

        @keyframes pulse-border {
          0% {
            box-shadow: inset 0 0 0 7px rgba(0, 0, 0, 0.8);
          }
          100% {
            box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 1);
          }
        }

        .typewriter::after {
          content: "|";
          animation: blink 1s step-end infinite;
          animation-delay: 3s; /* Sync with text animation */
          display: inline-block;
          margin-left: 2px;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        /* Reduced motion media query */
        @media (prefers-reduced-motion: reduce) {
          .wave-reveal,
          .wave-reveal::after,
          .typewriter::after {
            animation: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Hero;
