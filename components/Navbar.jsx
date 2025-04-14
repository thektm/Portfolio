"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import {
  HomeIcon,
  Shapes,
  X,
  User,
  BriefcaseIcon,
  Sheet,
  Image,
  Link2,
  Link,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// This script runs immediately when the component is loaded
if (typeof window !== "undefined") {
  // Force scroll to top immediately
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Prevent default scroll restoration
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

const NavLink = ({ href, children, progress, isActive }) => {
  return (
    <a
      href={`#${href}`}
      className="hover:text-gray-600 transition-colors cursor-pointer relative py-1 px-2"
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(href);
        if (element) {
          const navbarHeight = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {children}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-black"
          initial={{ width: 0 }}
          animate={{ width: isActive ? `${progress}%` : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </a>
  );
};

const MobileNavItem = ({ Icon, label, sectionId, closeMenu, isActive }) => (
  <div
    className={`flex flex-col text-xl justify-center items-center w-full cursor-pointer relative p-2 rounded-xl ${
      isActive ? "bg-gray-100" : ""
    }`}
    onClick={() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        closeMenu();
      }
    }}
  >
    <div className="relative">
      <Icon
        className={`w-6 h-6 mb-1 transition-all duration-300 ${
          isActive ? "text-black" : "text-gray-500"
        }`}
      />
    </div>
    <div
      className={`font-gelline text-center transition-colors duration-300 ${
        isActive ? "text-black" : "text-gray-500"
      }`}
    >
      {label}
    </div>
  </div>
);

const Navbar = () => {
  // Define layout breakpoints
  const LAYOUT = {
    MOBILE: "mobile", // Bottom navbar with hamburger menu (< 640px)
    MEDIUM: "medium", // Top navbar with fewer items (640px - 1024px)
    DESKTOP: "desktop", // Full top navbar (> 1024px)
  };

  const [layout, setLayout] = useState(LAYOUT.DESKTOP);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sectionProgress, setSectionProgress] = useState({
    home: 100, // Set initial progress for home to 100%
  });
  const [activeSection, setActiveSection] = useState("home");
  const initialLoadRef = useRef(true);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setLayout(LAYOUT.MOBILE);
    } else if (width < 1024) {
      setLayout(LAYOUT.MEDIUM);
    } else {
      setLayout(LAYOUT.DESKTOP);
    }
  }, [LAYOUT]);

  // Force scroll to top on initial load with higher priority
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Set up a series of attempts to ensure we stay at the top
    const scrollAttempts = [0, 10, 50, 100, 500];

    scrollAttempts.forEach((delay) => {
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, delay);
    });

    // Disable scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Block any scroll events briefly
    const blockScroll = (e) => {
      if (initialLoadRef.current) {
        e.preventDefault();
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("scroll", blockScroll, { passive: false });

    // After a short time, allow scrolling again
    setTimeout(() => {
      initialLoadRef.current = false;
      window.removeEventListener("scroll", blockScroll);
    }, 500);

    return () => {
      window.removeEventListener("scroll", blockScroll);
    };
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Calculate section positions for scroll tracking
    const calculateSectionPositions = () => {
      const sectionPositions = {};
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          sectionPositions[item.id] = {
            top: rect.top + window.pageYOffset,
            bottom: rect.bottom + window.pageYOffset,
            height: rect.height,
          };
        }
      });
      return sectionPositions;
    };

    // Handle scroll to determine active section and progress
    const handleScroll = () => {
      // If we're at the very top of the page, force "home" as active section
      if (window.scrollY < 50) {
        setActiveSection("home");
        setSectionProgress((prev) => ({
          ...prev,
          home: 100, // Set to 100% when at the top
        }));
        return;
      }
      const scrollPosition = window.pageYOffset + 100; // Add offset for navbar
      const positions = calculateSectionPositions();
      const windowHeight = window.innerHeight;

      // Find the current active section
      let currentSection = null;
      let maxVisibility = 0;

      Object.entries(positions).forEach(([id, position]) => {
        // Calculate how much of the section is visible
        const sectionTop = Math.max(position.top, scrollPosition);
        const sectionBottom = Math.min(
          position.bottom,
          scrollPosition + windowHeight
        );
        const visibleHeight = Math.max(0, sectionBottom - sectionTop);
        const visibilityRatio = visibleHeight / position.height;

        // For sections smaller than viewport, prioritize the one most in view
        if (visibilityRatio > maxVisibility) {
          maxVisibility = visibilityRatio;
          currentSection = id;
        }

        // Calculate progress for the progress bar
        let progress = 0;

        if (scrollPosition >= position.top) {
          // If we've scrolled past the top of the section
          if (position.height <= windowHeight) {
            // For sections smaller than viewport
            progress = Math.min(
              100,
              ((scrollPosition - position.top) / position.height) * 100
            );

            // If we're at the bottom of the section, it's 100%
            if (scrollPosition >= position.bottom - windowHeight) {
              progress = 100;
            }
          } else {
            // For sections larger than viewport
            progress = Math.min(
              100,
              ((scrollPosition - position.top) /
                (position.height - windowHeight)) *
                100
            );
          }
        }

        setSectionProgress((prev) => ({
          ...prev,
          [id]: Math.min(100, Math.max(0, progress)),
        }));
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial calculation - with a slight delay to ensure DOM is fully loaded
    setTimeout(() => {
      handleScroll();
      // Ensure home section has 100% progress on initial load
      setSectionProgress((prev) => ({
        ...prev,
        home: 100,
      }));
    }, 100);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize]);

  const toggleMobileMenu = () => setMobileMenu((prev) => !prev);

  // Define navigation items for consistency
  const navItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "about", label: "About", icon: User, hideOnMedium: true },
    { id: "skills", label: "Skills", icon: Sheet },
    { id: "services", label: "Services", icon: BriefcaseIcon },
    { id: "qualify", label: "Qualify", icon: Image, hideOnMedium: true },
    { id: "contact", label: "Contact", icon: Link2 },
  ];

  const isMobile = layout === LAYOUT.MOBILE;
  const isMedium = layout === LAYOUT.MEDIUM;

  // Filter nav items for medium layout
  const displayedNavItems = navItems.filter(
    (item) => !(isMedium && item.hideOnMedium)
  );

  return (
    <div>
      <div
        className={`w-full bg-white/95 backdrop-blur-sm z-5 h-16 flex fixed ${
          isMobile ? "bottom-0 border-t border-gray-200" : "top-0 shadow-sm"
        } px-[5%] md:px-[10%]`}
      >
        <div
          className={`font-gelline text-black self-center cursor-pointer ${
            isMobile ? "text-3xl  w-1/2" : "text-4xl ml-2 w-1/4"
          }`}
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          Ghorbani
        </div>

        {!isMobile ? (
          <div className="flex font-gelline tracking-wide antialiased text-black items-center text-2xl w-3/4 justify-end gap-4">
            {displayedNavItems.map((item) => (
              <NavLink
                key={item.id}
                href={item.id}
                progress={sectionProgress[item.id] || 0}
                isActive={activeSection === item.id}
              >
                <span
                  className={`${
                    activeSection === item.id ? "text-black" : "text-gray-500"
                  } transition-colors duration-300`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="flex w-1/2 justify-end items-center ">
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Shapes
                className="cursor-pointer"
                color="black"
                onClick={toggleMobileMenu}
              />
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              style={{ willChange: "transform" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 border-t border-gray-200 w-full h-fit text-2xl z-50"
            >
              <div className="mb-16 grid grid-cols-3 gap-4 gap-y-6 items-center justify-items-center max-w-md mx-auto">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.id}
                    Icon={item.icon}
                    label={item.label}
                    sectionId={item.id}
                    closeMenu={() => setMobileMenu(false)}
                    isActive={activeSection === item.id}
                  />
                ))}
              </div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-5 bottom-5 cursor-pointer"
              >
                <X color="black" size={25} onClick={toggleMobileMenu} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Add padding to content to account for fixed navbar */}
      <div className={isMobile ? "pb-16" : "pt-16"}></div>
    </div>
  );
};

export default Navbar;
