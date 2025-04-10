"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// --- Helper function for Scramble Text ---
const scrambleText = (
  element: HTMLElement | null,
  finalText: string,
  durationPerChar: number = 0.05,
  scrambleCycles: number = 5
) => {
  if (!element) return gsap.timeline();

  // If a scramble animation is already running on this element, kill it and clear any intervals
  if ((element as any).scrambleTimeline) {
    (element as any).scrambleTimeline.kill();
    if ((element as any).scrambleIntervals) {
      (element as any).scrambleIntervals.forEach((interval: number) =>
        clearInterval(interval)
      );
    }
  }
  // Initialize storage for intervals
  (element as any).scrambleIntervals = [];

  // (Re)create spans for each character if needed
  if (element.children.length !== finalText.length) {
    element.innerHTML = "";
    finalText.split("").forEach((char) => {
      const span = document.createElement("span");
      if (char === " ") {
        span.style.display = "inline-block";
        span.innerText = " ";
        span.style.width = "0.5em";
      } else {
        span.textContent = "-";
      }
      element.appendChild(span);
    });
  }

  const letters = element.querySelectorAll("span");
  if (!letters.length) {
    element.textContent = finalText;
    return gsap.timeline();
  }

  // Create a new timeline and store it on the element
  const tl = gsap.timeline();
  (element as any).scrambleTimeline = tl;

  const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

  letters.forEach((letter, i) => {
    const originalChar = finalText[i] || " ";
    letter.style.opacity = "0";
    tl.to(
      letter,
      {
        opacity: 1,
        duration: durationPerChar * 0.5,
        delay: i * (durationPerChar * 0.8),
        onStart: () => {
          letter.textContent = "-";
          let currentCycle = 0;
          const intervalDuration =
            (durationPerChar * 1000) / (scrambleCycles + 1);
          // Set up the scramble interval and store it on the element
          const scrambleInterval = setInterval(() => {
            letter.textContent =
              originalChar === " "
                ? "-"
                : chars[Math.floor(Math.random() * chars.length)];
            currentCycle++;
            if (currentCycle >= scrambleCycles) {
              clearInterval(scrambleInterval);
              letter.textContent = originalChar;
            }
          }, intervalDuration);
          (element as any).scrambleIntervals.push(scrambleInterval);
        },
        onComplete: () => {
          if (letter.textContent !== originalChar) {
            letter.textContent = originalChar;
          }
        },
      },
      0
    );
  });

  // When the timeline completes, clear the stored timeline and intervals
  tl.eventCallback("onComplete", () => {
    delete (element as any).scrambleTimeline;
    (element as any).scrambleIntervals = [];
  });

  return tl;
};

const ScrollSlider: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationFlags = useRef({});
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parameters adjusted for mobile devices
  const scrambleParams = {
    durationPerChar: isMobile ? 0.03 : 0.05,
    scrambleCycles: isMobile ? 3 : 5,
  };

  // Images, text, and titles data
  const images = ["/hero1.webp", "/hero2.webp", "/hero3.webp"];
  const text = [
    `Drawn by the digital age's transformative power, I embarked on a coding journey to not just understand the technology shaping our world, but to actively contribute to its evolution, crafting innovative solutions that drive progress and connect communities on a global scale.`,
    `Programming is a way to turn your ideas into reality. With code, you have the power to create something that has never existed before.`,
    `You want Dopamine ? That's where coding comes in. coding generally releases dopamine more than any other activity for me.`,
  ];
  const titles = ["FIRST", "SECOND", "THIRD"];

  // Main GSAP animations using useGSAP hook
  useGSAP(
    useCallback(() => {
      if (!container.current) return;

      const stickySection = container.current.querySelector(".sticky-cards");
      if (!stickySection) return;

      const counts = container.current.querySelectorAll(".textCount");
      const animeTextElements =
        container.current.querySelectorAll<HTMLElement>(".animeText");
      const cards = container.current.querySelectorAll(".card");
      const cardImages = container.current.querySelectorAll(".card img");

      const totalItems = Math.min(
        counts.length,
        animeTextElements.length,
        cards.length
      );
      if (totalItems === 0) return;

      // Initial Setup: Make the first item visible; hide others
      gsap.set(counts[0], { opacity: 1, x: "0%", willChange: "opacity, transform" });
      gsap.set(animeTextElements[0], { opacity: 1, willChange: "opacity, transform" });
      gsap.set(cards[0], { x: "0%", opacity: 1, willChange: "opacity, transform" });
      gsap.set(cardImages[0], { x: "0%", opacity: 1, willChange: "opacity, transform" });
      gsap.set(animeTextElements[0]?.querySelectorAll("span"), { opacity: 0, willChange: "opacity" });

      for (let i = 1; i < totalItems; i++) {
        gsap.set(counts[i], { x: "100%", opacity: 0, willChange: "opacity, transform" });
        gsap.set(animeTextElements[i], { opacity: 0, willChange: "opacity, transform" });
        gsap.set(animeTextElements[i]?.querySelectorAll("span"), {
          opacity: 0,
          willChange: "opacity",
        });
        gsap.set(cards[i], { x: "-100%", opacity: 0, willChange: "opacity, transform" });
        gsap.set(cardImages[i], { x: "0%", opacity: 0, willChange: "opacity, transform" });
      }

      // Trigger the first scramble animation when entering view
      ScrollTrigger.create({
        trigger: animeTextElements[0],
        start: "top 80%",
        once: true,
        onEnter: () => {
          scrambleText(
            animeTextElements[0],
            text[0],
            scrambleParams.durationPerChar,
            scrambleParams.scrambleCycles
          );
        },
      });

      // Main scroll timeline with pinning and transitions
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stickySection,
          start: "top top",
          end: `+=${window.innerHeight * (totalItems - 1)}`,
          scrub: 0.5,
          pin: true,
        },
      });

      // Animate transitions between items
      for (let i = 0; i < totalItems - 1; i++) {
        const currentTextCount = counts[i];
        const currentAnimeText = animeTextElements[i];
        const currentCard = cards[i];
        const currentCardImage = cardImages[i];

        const nextTextCount = counts[i + 1];
        const nextAnimeText = animeTextElements[i + 1];
        const nextCard = cards[i + 1];
        const nextCardImage = cardImages[i + 1];

        const position = i;

        // Animate OUT current elements
        timeline
          .to(
            currentTextCount,
            { x: "-100%", opacity: 0, duration: 1, ease: "none" },
            position
          )
          .to(
            currentAnimeText,
            { x: "-50%", opacity: 0, duration: 0.7, ease: "power1.in" },
            position
          )
          .to(
            currentCard,
            { x: "100%", opacity: 0, duration: 1, ease: "none" },
            position
          )
          .to(
            currentCardImage,
            { x: "50%", opacity: 0, duration: 1, ease: "none" },
            position
          );

        // Animate IN next elements
        timeline
          .fromTo(
            nextTextCount,
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 1, ease: "none" },
            position
          )
          .fromTo(
            nextAnimeText,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "none" },
            position + 0.5
          )
          .call(
            () => {
              gsap.set(nextAnimeText.querySelectorAll("span"), { opacity: 0 });
              scrambleText(
                nextAnimeText,
                text[i + 1],
                scrambleParams.durationPerChar,
                scrambleParams.scrambleCycles
              );
            },
            [],
            position + 0.7
          )
          .fromTo(
            nextCard,
            { x: "-100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 1, ease: "none" },
            position
          )
          .fromTo(
            nextCardImage,
            { x: "0%", opacity: 0 },
            { opacity: 1, duration: 1, ease: "none" },
            position
          );
      }

      // Update the timeline to set the current index
      timeline.eventCallback("onUpdate", () => {
        const progress = timeline.progress();
        const newIndex = Math.floor(progress * (totalItems - 1));
        setCurrentIndex(newIndex);
      });
    }, [scrambleParams]),
    { scope: container }
  );

  // Function to generate blur data URL
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);
  return (
    <div ref={container} className="overflow-hidden">
      <section className="sticky-cards relative w-full h-screen bg-black overflow-hidden flex justify-center items-center text-white">
        <div className="relative w-screen h-screen overflow-hidden">
          {images.map((image, index) => (
            <div
              key={`img-${index}`}
              className="card absolute w-full h-full overflow-hidden opacity-0"
              style={{ willChange: 'opacity, transform' }}
            >
              <Image
                src={image}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={75}
                alt={`Background ${index + 1}`}
                className="relative w-full h-full object-cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                style={{ willChange: 'opacity, transform' }}
              />
            </div>
          ))}

          {text.map((item, index) => (
            <div
              key={`text-${index}`}
              className="textCount z-10 absolute w-[90%] h-full top-[15%] left-[5%] overflow-hidden pointer-events-none mix-blend-exclusion"
              style={{ willChange: 'opacity, transform' }}
            >
              <span className="font-gildeon border-b-2 border-cyan-600 p-1 border-solid text-4xl md:text-7xl bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)] tracking-wider"
                    style={{ willChange: 'opacity, transform' }}>
                {titles[index]}
              </span>
              <div className="animeText md:text-5xl text-3xl pt-2 w-fit h-fit font-bold relative opacity-0 backdrop-blur-sm"
                   style={{ willChange: 'opacity, transform' }}>
                {item.split(" ").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="inline-block bg-gradient-to-br from-gray-200 to-gray-100 bg-clip-text text-transparent transition-all duration-500 hover:duration-200 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(167,139,250,0.4)]"
                    style={{
                      transformOrigin: "center bottom",
                      transitionProperty: "transform, text-shadow, color",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "transform, text-shadow, color, opacity",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default ScrollSlider;