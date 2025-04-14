import React, { useState, useEffect } from "react";

export const Footer = () => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative w-full text-white py-16 overflow-hidden cursor-default pointer-events-none">
      {/* Complex gradient background */}
      <div className="absolute inset-0 bg-black pointer-events-none">
        {/* Primary gradient overlay with increased opacity */}
        <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

        {/* Accent gradients with increased opacity */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.4)_0%,_transparent_60%)]"></div>

        {/* Subtle dot pattern with increased opacity */}
        <div className="absolute inset-0 opacity-8 mix-blend-soft-light">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        {/* Animated gradient accent with increased opacity */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-8 animate-slow-spin">
          <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg,_transparent,_rgba(255,255,255,0.15)_10%,_transparent_40%)]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-4">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          {/* Only the span is clickable */}
          <div className="mb-8 md:mb-0">
            <span
              onClick={scrollToTop}
              className="font-gildeon h-fit uppercase text-5xl md:text-6xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white cursor-pointer transition-transform hover:scale-105 inline-block pointer-events-auto"
            >
              ghorbani
            </span>
          </div>

          {/* Social links - only the SVGs are clickable */}
          <div className="flex space-x-6">
            {/* GitHub */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center text-white/80 group overflow-hidden shadow-md cursor-default">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0  transition-opacity duration-500"></div>

              {/* Only this SVG is clickable */}
              <a
                href="https://github.com/thektm"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-xl pointer-events-auto cursor-pointer hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center w-full h-full"
              >
                {}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Subtle pulse animation on hover */}
              <div className="absolute inset-0 rounded-full opacity-0  transition-opacity duration-300">
                <div className="absolute inset-0 rounded-full animate-ping bg-white/5"></div>
              </div>
            </div>

            {/* Instagram */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center text-white/80 group overflow-hidden shadow-md cursor-default">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0  transition-opacity duration-500"></div>

              {/* Only this SVG is clickable */}
              <a
                href="https://instagram.com/nevertrusteyes"
                target="_blank"
                rel="noopener noreferrer"
                className="relative  text-xl pointer-events-auto cursor-pointer hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center w-full h-full"
              >
                {}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Subtle pulse animation on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-full animate-ping bg-white/5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with enhanced gradient */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-8 relative">
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Bottom section with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            © {currentYear} Ali Ghorbani. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Crafted with precision & passion
          </p>
        </div>
      </div>

      {/* Add this style for the slow spin animation */}
      <style jsx global>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 120s linear infinite;
        }
      `}</style>
    </footer>
  );
};
