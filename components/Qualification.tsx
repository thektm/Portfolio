import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Education and experience data
const educationData = [
  {
    title: "Learning Syntax at age of thirteen",
    location: "Self-taught",
    period: "2013",
  },
  {
    title: "Certified Android Developer",
    location: "Daneshjooyar",
    period: "2016-2017",
  },
  {
    title: "Python and Django Framework",
    location: "Self-taught",
    period: "2018-2019",
  },
];

const experienceData = [
  {
    title: "Developing Windows Applications",
    location: "Personal Projects",
    period: "2014-2015",
  },
  {
    title: "Freelancing",
    location: "Karlancer and Ponisha",
    period: "2019-2022",
  },
  {
    title: "Full Stack Developer",
    location: "Private Companies and Groups",
    period: "2022-Present",
  },
];

// Combine and alternate data
const combinedData = [];
const maxLength = Math.max(educationData.length, experienceData.length);
for (let i = 0; i < maxLength; i++) {
  if (i < educationData.length) {
    combinedData.push({
      type: "education",
      ...educationData[i],
    });
  }
  if (i < experienceData.length) {
    combinedData.push({
      type: "experience",
      ...experienceData[i],
    });
  }
}

export const Qualification = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  // Get the scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Update the line height based on scroll
  useEffect(() => {
    const updateLineHeight = () => {
      if (!lineRef.current) return;

      // Get the current scroll progress value
      const progress = scrollYProgress.get();
      // Apply the height based on scroll progress
      lineRef.current.style.height = `${Math.min(progress * 150, 100)}%`;
    };

    // Set up the scroll event listener
    const unsubscribe = scrollYProgress.onChange(updateLineHeight);

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins text-gray-900 mb-2">
            Qualification
          </h2>
          <p className="text-gray-500 text-lg">My personal journey</p>
        </div>

        {/* Section headers */}
        <div className="flex justify-center mb-12 gap-8">
          <div className="flex items-center gap-2 text-lg font-medium">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <rect
                x="3"
                y="6"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 11V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="11" r="1" fill="currentColor" />
            </svg>
           Education
          </div>

          <div className="flex items-center gap-2 text-lg font-medium">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M12 3L20 9V21H4V9L12 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21V12H15V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Experience
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line with scroll effect */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 w-px bg-gray-600 transform -translate-x-1/2 origin-top"
            style={{ height: "0%" }}
          ></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {combinedData.map((item, index) => (
              <div
                key={index}
                className="relative grid grid-cols-2 gap-8 items-start"
              >
                {/* Left side (if education) */}
                {item.type === "education" ? (
                  <motion.div
                    className="text-right pr-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mt-1">{item.location}</p>
                    <div className="flex items-center justify-end mt-2 text-gray-500">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 2V6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 2V6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 10H21"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      {item.period}
                    </div>
                  </motion.div>
                ) : (
                  <div className="pr-8"></div>
                )}

                {/* Right side (if experience) */}
                {item.type === "experience" ? (
                  <motion.div
                    className="pl-8"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mt-1">{item.location}</p>
                    <div className="flex items-center mt-2 text-gray-500">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 2V6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 2V6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 10H21"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      {item.period}
                    </div>
                  </motion.div>
                ) : (
                  <div className="pl-8"></div>
                )}

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 w-4 h-4 bg-gray-600 rounded-full transform -translate-x-1/2 "
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                ></motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
