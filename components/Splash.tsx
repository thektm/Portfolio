"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const Splash: React.FC = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameText = "Ali Ghorbani";
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const letters = gsap.utils.toArray<HTMLElement>(".splash-letter");
      const tl = gsap.timeline({
        onComplete: () => {
          // Reduce the delay to 0.2s after letters animation completes
          gsap.delayedCall(0.2, () => {
            // Get the position of the Hero component's name element
            const heroNameElement = document.querySelector(".hero-name");
            if (heroNameElement && containerRef.current) {
              const heroRect = heroNameElement.getBoundingClientRect();
              const splashContainer = containerRef.current;
              const splashRect = splashContainer.getBoundingClientRect();

              // Calculate the transform values needed to match positions
              // We'll use a direct approach without scaling to ensure exact positioning
              const translateX = heroRect.left - splashRect.left;
              const translateY = heroRect.top - splashRect.top;

              // Animate the splash container to the hero position
              const outroTl = gsap.timeline({
                onComplete: () => {
                  // Add a 0.2s delay before completing the animation
                  gsap.delayedCall(0.2, () => {
                    setIsAnimationDone(true);
                    // Make sure onAnimationComplete is a function before calling it
                  });
                },
              });

              // Fade out the background

              // Move the text to match hero position
              outroTl.to(
                splashContainer,
                {
                  x: translateX,
                  y: translateY,

                  duration: 1,
                  ease: "power3.inOut",
                },
                0
              );

              // Adjust text styling to match hero

              // Reveal the actual hero name by fading it in at the end
              outroTl.to(
                heroNameElement,
                {
                  opacity: 1,
                  duration: 0.3,
                  delay: 0.7,
                },
                0
              );
            }
          });
        },
      });

      // Initially hide all letters, position them off-screen to the right,
      // and set a blur effect.
      gsap.set(letters, {
        opacity: 0,
        x: "100vw",
        filter: "blur(20px)",
      });

      // Animate each letter one by one, fading in and removing the blur as it reaches its place.
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

      // Add a subtle bounce effect after all letters are in place
      
    },
    { scope: containerRef }
  );

  return (
    <div
      className={`splash-container inset-0 fixed h-full w-full justify-self-center z-50 bg-white flex justify-center items-center ${
        isAnimationDone ? "pointer-events-none opacity-0" : ""
      }`}
      style={{
        transition: "opacity 0.3s ease-out",
      }}
    >
      <div
        ref={containerRef}
        className="text-black font-gelline md:text-7xl text-6xl  tracking-wider uppercase m-2"
      >
        {nameText.split("").map((letter, index) => (
          <span
            key={index}
            className={`splash-letter relative  inline-block opacity-0 ${
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
    </div>
  );
};
