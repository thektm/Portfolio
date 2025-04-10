"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  Shapes,
  X,
  User,
  BriefcaseIcon,
  Sheet,
  Image,
  Link2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ href, children }) => (
  <Link href={href} className="hover:text-gray-600 transition-colors">
    {children}
  </Link>
);

const MobileNavItem = ({ Icon, label }) => (
  <div className="flex-row text-xl justify-center items-center w-full">
    <Icon className="w-1/6 h-1/6 justify-self-center" color="black" />
    <div className="font-gelline justify-self-center">{label}</div>
  </div>
);

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const toggleMobileMenu = () => setMobileMenu((prev) => !prev);

  return (
    <div>
      <div
        className={`w-full bg-gray-50 z-3 h-16 flex md:px-[10%] fixed ${
          isMobile ? "bottom-0 border-t-1 border-gray-100" : "top-0"
        }`}
      >
        <h1 className="font-gelline text-3xl md:text-4xl text-black ml-4 w-1/2 md:ml-2 justify-self-start self-center">
          Ghorbani
        </h1>
        {!isMobile ? (
          <div className="flex text-2xl w-1/2 font-gelline tracking-wide antialiased text-black gap-4 justify-between items-center">
            <NavLink href="">Home</NavLink>
            <NavLink href="" className="lg:flex hidden">
              About
            </NavLink>
            <NavLink href="">Skills</NavLink>
            <NavLink href="">Services</NavLink>
            <NavLink href="" className="lg:flex hidden">
              Portfolio
            </NavLink>
            <NavLink href="">Contact</NavLink>
          </div>
        ) : (
          <div className="flex w-1/2 justify-end items-center mr-8">
            <Shapes className="" color="black" onClick={toggleMobileMenu} />
          </div>
        )}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              style={{ willChange: "transform" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-0 bg-white rounded-t-2xl p-2 border-2 border-gray-100 w-full h-fit text-2xl"
            >
              <div className="mb-16 grid grid-cols-3 gap-2 gap-y-4 items-center justify-center">
                <MobileNavItem Icon={HomeIcon} label="Home" />
                <MobileNavItem Icon={User} label="About" />
                <MobileNavItem Icon={Sheet} label="Skills" />
                <MobileNavItem Icon={BriefcaseIcon} label="Services" />
                <MobileNavItem Icon={Image} label="Portfolio" />
                <MobileNavItem Icon={Link2} label="Contact" />
              </div>
              <X
                color="black"
                size={25}
                className="absolute right-10 bottom-5"
                onClick={toggleMobileMenu}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
