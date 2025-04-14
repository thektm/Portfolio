import React, { useRef } from "react";
import Hero from "@/components/Hero";
import SCrollSlider from "@/components/ScrollSlide";
import Navbar from "@/components/Navbar";
import { ReactLenis } from "lenis/react";
import { Splash } from "@/components/Splash";
import AnimatedTextCard from "@/components/Banner";
import { About } from "@/components/About";
import Skills from "@/components/Skills";
import { Services } from "@/components/Services";
import { Qualification } from "@/components/Qualification";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <ReactLenis root>
      <Splash />
      <Navbar />
      <Hero />
      <About />
     <AnimatedTextCard />
      <SCrollSlider />
      <Skills />
      <Services />
      <Qualification />
      <Contact />
      <Footer/>
    </ReactLenis>
  );
}
