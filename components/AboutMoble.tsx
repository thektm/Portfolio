"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Card data
const cards = [
  {
    title: "Experience",
    value: "5+",
    unit: "Years",
    icon: "⏳",
    description: "Building digital experiences",
  },
  {
    title: "Projects",
    value: "12+",
    unit: "Completed",
    icon: "🏆",
    description: "From concept to deployment",
  },
  {
    title: "Support",
    value: "24/7",
    unit: "Available",
    icon: "🛠️",
    description: "Dedicated assistance",
  },
  {
    title: "Journey",
    value: "",
    unit: "",
    icon: "🚀",
    description: "Kotlin → React → Beyond",
    isJourney: true,
  },
];

const AboutMobile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Set initial width
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      console.log(`Width: ${width}`);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Journey timeline component
  const JourneyTimeline = () => (
    <div className="flex-grow flex items-center justify-center mt-2">
      <div className="relative w-full h-12">
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-gray-300 via-gray-600 to-black"
          style={{ width: "100%", transform: "translateY(-50%)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
        {["K", "R", "∞"].map((point, index) => (
          <motion.div
            key={point}
            className="absolute top-1/2 w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center text-black text-xs font-bold shadow-md"
            style={{
              left: `${15 + index * 35}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ delay: 0.8 + index * 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
          >
            {point}
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Card component
  const Card = ({ card, index }: { card: any; index: number }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-black/10 flex-shrink-0 w-[85%] snap-center"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-4 flex flex-col">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2">
            <span className="text-lg text-white">{card.icon}</span>
          </div>
          <h3 className="font-bold text-black text-lg tracking-wide">
            {card.title}
          </h3>
        </div>

        {card.isJourney ? (
          <JourneyTimeline />
        ) : (
          <>
            <div className="text-center my-1">
              <span
                className="text-4xl font-bold text-black"
                style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
              >
                {card.value}
              </span>
              <span className="text-sm text-gray-600 ml-1 tracking-wide font-medium">
                {card.unit}
              </span>
            </div>
            <div className="text-center text-sm text-gray-700 mt-1 font-medium italic">
              {card.description}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <div
      className={`w-full py-2 px-4 ${width > 820 ? "hidden" : "flex flex-col"}`}
      ref={containerRef}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-gelline tracking-wider text-4xl">About Me</h2>
      </motion.div>

      {/* Image */}
      <motion.div
        className="relative w-full h-[250px] rounded-2xl overflow-hidden mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Image
          src="/About.jpg"
          fill
          alt="Full Stack Developer!"
          className="object-cover rounded-2xl shadow-2xl shadow-gray-300"
        />
      </motion.div>

      {/* Cards - Horizontal Scrollable Row */}
      <motion.div
        className="overflow-x-auto flex space-x-4 pb-4 snap-x snap-mandatory scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {cards.map((card, index) => (
          <Card key={card.title} card={card} index={index} />
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="flex justify-center mt-4 space-x-1"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {cards.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-black/30" />
        ))}
      </motion.div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default AboutMobile;