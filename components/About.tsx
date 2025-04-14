"use client";
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

// Memoized card component to prevent unnecessary re-renders
const Card = memo(
  ({ card, index, variants }: { card: any; index: number; variants: any }) => (
    <motion.div
      key={index}
      className={`relative bg-white p-4 rounded-2xl shadow-lg backdrop-blur-sm
      hover:shadow-xl transition-all duration-500 group overflow-hidden
      before:absolute before:inset-0 before:w-full before:h-1 before:bg-gradient-to-r ${card.accentColor} 
      before:top-0 before:left-0 ${card.hoverEffect} border border-gray-100`}
      variants={variants}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex flex-col items-center">
        <div
          className={`${card.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-1
        text-white shadow-lg ${card.iconShadow} transform group-hover:scale-110 
        group-hover:rotate-3 transition-all duration-500`}
          style={{ willChange: "transform" }}
        >
          <span className="text-xl">{card.icon}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-0.5 tracking-wide">
          {card.title}
        </h3>
        <p className="text-gray-600 text-sm font-medium">{card.value}</p>
      </div>
    </motion.div>
  )
);

Card.displayName = "Card";

// Memoized third card component
const ThirdCard = memo(({ card, variants }: { card: any; variants: any }) => (
  <motion.div
    className={`relative bg-white p-4 rounded-2xl shadow-lg backdrop-blur-sm
      hover:shadow-xl transition-all duration-500 group overflow-hidden col-span-2 sm:col-span-1
      before:absolute before:inset-0 before:w-full before:h-1 before:bg-gradient-to-r ${card.accentColor} 
      before:top-0 before:left-0 ${card.hoverEffect} border border-gray-100`}
    variants={variants}
    whileHover={{
      y: -8,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    }}
    style={{ willChange: "transform, opacity" }}
  >
    <div className="flex flex-col items-center">
      <div
        className={`${card.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-2
        text-white shadow-lg ${card.iconShadow} transform group-hover:scale-110 
        group-hover:rotate-3 transition-all duration-500 will-change-transform`}
      >
        <span className="text-xl">{card.icon}</span>
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-0.5 tracking-wide">
        {card.title}
      </h3>
      <p className="text-gray-600 text-sm font-medium">{card.value}</p>
    </div>
  </motion.div>
));

ThirdCard.displayName = "ThirdCard";

// Animation variants - defined outside component to prevent recreation on each render
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerItems = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

// Card data - defined outside component to prevent recreation on each render
const cards = [
  {
    icon: "⏱️",
    title: "Experience",
    value: "5+ Years Working",
    accentColor: "before:from-gray-800 before:to-black",
    iconBg: "bg-gradient-to-br from-gray-800 to-black",
    hoverEffect: "hover:shadow-gray-200/40",
    iconShadow: "shadow-gray-800/30",
  },
  {
    icon: "💼",
    title: "Completed",
    value: "12+ Projects",
    accentColor: "before:from-gray-700 before:to-gray-900",
    iconBg: "bg-gradient-to-br from-gray-700 to-gray-900",
    hoverEffect: "hover:shadow-gray-200/40",
    iconShadow: "shadow-gray-800/30",
  },
  {
    icon: "🎧",
    title: "Support",
    value: "Online 24/7",
    accentColor: "before:from-black before:to-gray-800",
    iconBg: "bg-gradient-to-br from-black to-gray-800",
    hoverEffect: "hover:shadow-gray-200/40",
    iconShadow: "shadow-gray-800/30",
  },
];

export const About = () => {
  const controls = useAnimation();
  const textControls = useAnimation();
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.2 });

  // Use a ref for window width to avoid unnecessary re-renders
  const widthRef = useRef(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [screenWidth, setScreenWidth] = useState(widthRef.current);

  // Memoized resize handler
  const handleResize = useCallback(() => {
    const currentWidth = window.innerWidth;
    if (Math.abs(currentWidth - widthRef.current) > 50) {
      // Only update if change is significant
      widthRef.current = currentWidth;
      setScreenWidth(currentWidth);
    }
  }, []);

  // Optimized resize listener with debounce
  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Trigger animations when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-16 bg-white relative z-0 overflow-hidden -mt-10"
      id="about"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full"></div>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          custom={0}
          style={{ willChange: "opacity, transform" }}
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 tracking-tight">
            About Me
          </h2>
          <motion.p
            className="text-gray-500 mt-2 font-light"
            variants={fadeIn}
            custom={0.2}
            style={{ willChange: "opacity, transform" }}
          >
            My introduction
          </motion.p>
        </motion.div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
          {/* Image */}
          <motion.div
            className="w-full lg:w-5/12"
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            custom={0.3}
            style={{ willChange: "opacity, transform" }}
          >
            <div className="relative w-56 h-56 md:w-52 md:h-52 lg:w-80 lg:h-80 mx-auto">
              {/* Image container with decorative elements */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-gray-900 to-gray-800 transform rotate-6 opacity-20"></div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 transform -rotate-3 opacity-20"></div>
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border border-gray-200"
                style={{ willChange: "transform" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent z-10"></div>
                <Image
                  src="/About.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 208px, 320px"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            ref={infoRef}
            className="w-full lg:w-7/12 min-h-[400px]" // Added min-height to ensure enough space
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
            variants={staggerItems}
            style={{ willChange: "opacity" }}
          >
            {/* Cards */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:gap-3 gap-2 mb-1 md:mb-2">
              {cards.slice(0, 2).map((card, index) => (
                <Card
                  key={card.title}
                  card={card}
                  index={index}
                  variants={cardItem}
                />
              ))}

              {/* Third card takes full width on mobile, normal width on larger screens */}
              <ThirdCard card={cards[2]} variants={cardItem} />
            </motion.div>

            {/* Description */}
            <motion.div
              className="relative mb-12 p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm"
              variants={fadeIn}
              custom={0.6}
              whileHover={{ boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
              style={{ willChange: "opacity, transform, box-shadow" }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gray-900 to-gray-700 rounded-l-2xl"></div>
              <p className="text-gray-700 text-lg leading-relaxed pl-2">
                Full Stack Developer specializing in both frontend and backend
                technologies. I craft elegant UI/UX experiences while building
                robust server architectures. My passion lies in creating
                seamless, end-to-end digital solutions that deliver exceptional
                user experiences.
              </p>
            </motion.div>

            {/* Download CV Button */}
            <motion.div
              className="flex md:justify-center justify-start"
              variants={fadeIn}
              custom={0.8}
              style={{ willChange: "opacity, transform" }}
            >
              <div className="relative group">
                {/* Animated background glow effect */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-900 to-black rounded-lg blur-md opacity-0 
                  focus-within:opacity-70 transition-all duration-500 group-focus-within:duration-200"
                ></div>

                <button
                  className="relative z-10 md:px-7 px-3 py-3.5 bg-gradient-to-br from-gray-800 to-black text-white font-medium rounded-lg shadow-lg 
                  flex items-center gap-3 overflow-hidden transition-all duration-300 border border-gray-700 focus:outline-none"
                  onClick={(e) => e.currentTarget.focus()} // Ensure focus on click
                >
                  <span className="relative z-10 text-base tracking-wide">
                    Download CV
                  </span>
                  <div className="relative z-10 p-1.5 bg-white/10 rounded-full group-focus-within:bg-white/20 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 group-focus-within:translate-y-0.5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  {/* Animated shine effect */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-focus-within:animate-shine"></div>
                </button>

                {/* Language selection - now appearing as a horizontal row to the right */}
                <div
                  className="absolute left-full ml-1 top-0 opacity-0 translate-x-2 invisible group-focus-within:opacity-100
                  group-focus-within:visible group-focus-within:translate-x-0 transition-all duration-300 z-5 flex items-center"
                >
                  {/* Decorative connector */}
                  <div className="absolute top-1/2 -left-2 w-2 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>

                  {/* English CV button */}
                  <a
                    href="/CvEN.pdf"
                    download
                    className="flex items-center justify-center bg-white rounded-lg shadow-md border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-all duration-200 mr-2 group/item"
                  >
                    <span className="text-gray-800 font-medium">EN</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500 ml-2 group-hover/item:text-gray-800 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>

                  {/* Farsi CV button */}
                  <a
                    href="/CvFA.pdf"
                    download
                    className="flex items-center justify-center bg-white rounded-lg shadow-md border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-all duration-200 group/item"
                  >
                    <span className="text-gray-800 font-medium">FA</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500 ml-2 group-hover/item:text-gray-800 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
