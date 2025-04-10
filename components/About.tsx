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
    <section className="w-full px-4 md:px-8 lg:px-16 bg-white relative z-0 overflow-hidden">
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
            className="w-full lg:w-7/12"
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
              className="flex justify-center sm:justify-start"
              variants={fadeIn}
              custom={0.8}
              style={{ willChange: "opacity, transform" }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
