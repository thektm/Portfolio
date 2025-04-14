"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const serviceData = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Product Design",

    description:
      "Creating intuitive digital products with a focus on user experience and business goals.",
    modalContent: {
      title: "Product Design",
      description:
        "I create intuitive digital products that solve real problems. My approach combines user research, strategic thinking, and iterative design to deliver products that users love and businesses value.",
      services: [
        "User Research & Analysis",
        "Product Strategy",
        "Wireframing & Prototyping",
        "User Testing & Validation",
        "Design Systems",
      ],
    },
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3L3 8L8 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3L21 8L16 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 8H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 21L12 16L17 21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "UI/UX Design",

    description:
      "Crafting beautiful interfaces with seamless interactions that enhance user experience.",
    modalContent: {
      title: "UI/UX Design",
      description:
        "I design interfaces that are not only visually appealing but also intuitive and functional. My focus is on creating seamless user experiences that guide users effortlessly through digital products.",
      services: [
        "User Interface Design",
        "Interaction Design",
        "Usability Testing",
        "Information Architecture",
        "Responsive Design",
      ],
    },
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 7.5C2 5.29086 3.79086 3.5 6 3.5H18C20.2091 3.5 22 5.29086 22 7.5V16.5C22 18.7091 20.2091 20.5 18 20.5H6C3.79086 20.5 2 18.7091 2 16.5V7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 8.5L10 12.5L6 16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.5H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Visual Design",

    description:
      "Developing striking visual identities and graphics that communicate your brand message.",
    modalContent: {
      title: "Visual Design",
      description:
        "I create compelling visual designs that communicate your brand's story and captivate your audience. From brand identities to marketing materials, I ensure visual consistency and impact across all touchpoints.",
      services: [
        "Brand Identity Design",
        "Typography & Color Theory",
        "Illustration & Iconography",
        "Marketing Materials",
        "Visual Storytelling",
      ],
    },
  },
];

// Modal component
interface ServiceModalProps {
  service: any;
  isOpen: boolean;
  onClose: () => void;
}
const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  // Prevent unnecessary renders when service is null
  if (!service && !isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl will-change-transform"
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with close button */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-black">
                {service?.modalContent?.title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >{}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                {service?.modalContent?.description}
              </p>

              <h4 className="text-lg font-semibold mb-3 text-black">
                Services Offered:
              </h4>
              <ul className="space-y-2">
                {service?.modalContent?.services.map(
                  (item: any, index: any) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.2 }}
                    >
                      <span className="mr-2 mt-1 text-black">•</span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  )
                )}
              </ul>

              {/* Contact button */}
              <div className="mt-8">
                <button
                  className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={onClose}
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Simplified decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0L100 100M40 0L100 60M80 0L100 20"
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState(null);

  // Add this to prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedService !== null) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py- px-4 md:px-8 w-full bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-black opacity-[0.03] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-black opacity-[0.03] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-black opacity-[0.02] blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative ">
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="font-poppins text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-tight">
            Services
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light max-w-md mx-auto">
            What I offer
          </p>

          {/* Decorative line */}
          <motion.div
            className="w-16 h-0.5 bg-black mx-auto mt-6 "
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {serviceData.map((service: any, index) => (
            <motion.div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-xl p-2 md:p-8 
                shadow-sm hover:shadow-xl transition-all duration-500 
                before:absolute before:inset-0 before:w-full before:h-0.5 before:bg-black 
                before:top-0 before:left-0 before:scale-x-0 before:origin-left
                hover:before:scale-x-100 before:transition-transform before:duration-500
                overflow-hidden cursor-pointer"
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              onClick={() => setSelectedService(service)}
            >
              {/* Card content */}
              <div className="flex flex-col h-fit">
                {/* Icon */}
                <div className="flex">
                  <div className="relative mb-4">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center 
                    bg-gray-50 group-hover:bg-black text-black group-hover:text-white
                    transition-colors duration-500 shadow-sm"
                    >
                      {service.icon}
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 opacity-10 rounded-tl-xl bg-black transform rotate-45"></div>
                  </div>
                  <h3 className="text-xl font-semibold m-4 text-black mb-0.5">
                    {service.title}
                  </h3>
                </div>
                {/* Title and subtitle */}

                {/* Description - hidden on mobile for more compact cards */}
                <p className="text-gray-600 text-sm mb-6 hidden md:block">
                  {service.description}
                </p>

                {/* View more link */}
                <div className="mt-auto inline-flex items-center text-sm font-medium text-black">
                  <span className="relative overflow-hidden group-hover:pr-2 transition-all duration-300">
                    View More
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                  <span className="ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
