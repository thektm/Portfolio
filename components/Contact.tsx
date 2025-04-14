import React, { useState, useEffect } from "react";
import { FaEnvelope, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { IoSend, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("uZa1HO_wrPYAwq5G5"); // Replace with your actual public key
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    success?: boolean;
    message: string;
  }>({
    visible: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (success: boolean, message: string) => {
    setToast({
      visible: true,
      success,
      message,
    });

    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace these with your actual EmailJS IDs from your dashboard
    const serviceId = "service_yv9fene"; // Your EmailJS service ID
    const templateId = "template_m0p94qd"; // Your EmailJS template ID

    // Prepare template parameters - these should match your template variables
    const templateParams = {
      name: formData.name,
      email: formData.email,
      project: formData.project,
    };

    emailjs
      .send(serviceId, templateId, templateParams)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        showToast(
          true,
          "Message sent successfully! I will get back to you soon."
        );
        // Reset form after submission
        setFormData({ name: "", email: "", project: "" });
      })
      .catch((error) => {
        console.error("Failed to send email:", error.text);
        showToast(false, "Failed to send message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-8 lg:px-[15%] bg-gray-50">
      {/* Toast Notification */}
      <div
        className={`fixed left-1/2 bottom-10 transform -translate-x-1/2 p-4 min-w-60 max-w-md rounded-lg shadow-lg z-50 flex items-center gap-3 transition-all duration-300 ${
          toast.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        } ${
          toast.success
            ? "bg-green-50 text-green-800 border-l-4 border-green-500"
            : "bg-red-50 text-red-800 border-l-4 border-red-500"
        }`}
      >
        {toast.success ? (
          <IoCheckmarkCircle className="text-green-500 text-xl flex-shrink-0" />
        ) : (
          <IoCloseCircle className="text-red-500 text-xl flex-shrink-0" />
        )}
        <p>{toast.message}</p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-Poppins text-gray-800 mb-2">
            Get in touch
          </h2>
          <p className="text-gray-600">Contact Me</p>
        </div>

        {/* Contact Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Side - Talk to me */}
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold justify-self-center font-gelline tracking-wider text-gray-800 mb-6 md:mb-8">
              Talk to me
            </h3>

            <div className="space-y-2 px-10">
              {/* Email Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                <FaEnvelope className="text-2xl mb-2" />
                <h4 className="font-medium">Email</h4>
                <p className="text-gray-500 text-sm mb-4">Goftaraligr@gmail.com</p>
                <a
                  href="mailto:Goftaraligr@gmail.com"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  Write me <span className="ml-1">→</span>
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                <FaWhatsapp className="text-2xl mb-2" />
                <h4 className="font-medium">WhatsApp</h4>
                <p className="text-gray-500 text-sm mb-4">+98 933 530 1755</p>
                <a
                  href="https://wa.me/+989335301755"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  Write me <span className="ml-1">→</span>
                </a>
              </div>

              {/* Messenger Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                <FaTelegram className="text-2xl mb-2" />
                <h4 className="font-medium">Telegram</h4>
                <p className="text-gray-500 text-sm mb-4">IranMainDeveloper</p>
                <a
                  href="https://t.me/IranMainDeveloper"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  Write me <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Write me your project */}
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold font-gelline tracking-wider justify-self-center text-gray-800 mb-6 md:mb-8">
              Write me your project
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="text-sm text-gray-500 absolute -top-2.5 left-4 bg-white px-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Insert your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="text-sm text-gray-500 absolute -top-2.5 left-4 bg-white px-1">
                  Mail
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Insert your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  required
                />
              </div>

              {/* Project Field */}
              <div className="relative">
                <label className="text-sm text-gray-500 absolute -top-2.5 left-4 bg-white px-1">
                  Project
                </label>
                <textarea
                  name="project"
                  placeholder="Write your project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 min-h-[150px]"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-800 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
