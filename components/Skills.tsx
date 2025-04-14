"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Define skill data structure
interface Skill {
  name: string;
  level: "Basic" | "Intermediate" | "Advanced";
}

interface SkillCategory {
  title: string;
  subtitle?: string;
  skills: Skill[];
}

const Skills: React.FC = () => {
  // Updated skill data
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend And Client Side",
      skills: [
        { name: "JavaScript", level: "Advanced" },
        { name: "Kotlin", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "Android Framework", level: "Advanced" },
        { name: "Tailwind", level: "Advanced" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Python", level: "Advanced" },
        { name: "Django", level: "Advanced" },
        { name: "Node.js", level: "Basic" },
        { name: "MySQL", level: "Advanced" },
        { name: "Firebase", level: "Intermediate" },
        { name: "Supabase", level: "Advanced" },
      ],
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto"
    id="skills">
      {/* Section header with elegant animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-5xl tracking-widest font-poppins md:text-6xl font-bold mb-2 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Skills
          <motion.span
            className="absolute -bottom-1 left-0 h-1 bg-black"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.h2>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          My technical level
        </motion.p>
      </motion.div>

      {/* Skills grid with contrasting cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <SkillCard
              title={category.title}
              subtitle={category.subtitle}
              skills={category.skills}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Enhanced SkillCard component with contrasting themes
interface SkillCardProps {
  title: string;
  subtitle?: string;
  skills: Skill[];
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  subtitle,
  skills,
  index,
}) => {
  const cardThemes = [
    // Enhanced Black theme (for Frontend - index 0)
    {
      card: "bg-gradient-to-br from-gray-900 via-black to-gray-800 border-gray-800 text-white",
      title: "text-white",
      badge:
        "bg-gradient-to-br from-gray-800 to-black border-gray-700 group-hover:border-white",
      check: "text-white",
      skillText: "text-gray-300 group-hover:text-white",
      decorative: "from-white/10 via-indigo-500/5 to-transparent",
      divider: "from-transparent via-white/40 to-transparent",
    },
    // Enhanced White theme (for Backend - index 1)
    {
      card: "bg-gradient-to-br from-white via-gray-50 to-gray-100 border-gray-200 text-black",
      title: "text-gray-900",
      badge:
        "bg-gradient-to-br from-gray-100 to-white border-gray-300 group-hover:border-black",
      check: "text-gray-900",
      skillText: "text-gray-800 group-hover:text-black",
      decorative: "from-black/5 via-indigo-500/5 to-transparent",
      divider: "from-transparent via-black/30 to-transparent",
    },
  ];

  // Use index directly to get the theme
  // Frontend (index 0) gets the black theme, Backend (index 1) gets the white theme
  const theme = cardThemes[index];

  // Level colors based on theme
  const levelColors =
    index === 0
      ? {
          Basic: "text-gray-400",
          Intermediate: "text-gray-300 font-medium",
          Advanced: "text-white font-semibold",
        }
      : {
          Basic: "text-gray-500",
          Intermediate: "text-gray-700 font-medium",
          Advanced: "text-black font-semibold",
        };

  return (
    <motion.div
      className={`${theme.card} rounded-2xl shadow-lg p-6 border h-full relative overflow-hidden backdrop-blur-sm`}
      whileHover={{
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        y: -5,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle decorative elements */}
      <div
        className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${theme.decorative} opacity-60`}
      ></div>
      <div
        className={`absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-gradient-to-tr ${theme.decorative} opacity-60`}
      ></div>

      {/* Card title with elegant styling */}
      <motion.div
        className="text-center mb-8 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className={`text-xl font-bold ${theme.title}`}>{title}</h3>

        <motion.div
          className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 w-16 bg-gradient-to-r ${theme.divider}`}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 64, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </motion.div>

      {/* Skills grid with enhanced items */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-4">
        {skills.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            className="flex flex-col"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * skillIndex }}
            whileHover={{ x: 3 }}
          >
            <div className="flex items-center mb-1 group">
              {/* Animated badge with check icon */}
              <motion.div
                className={`w-6 h-6 mr-2 flex items-center justify-center relative ${theme.badge} rounded-full border shadow-sm group-hover:shadow`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: 0.1 * skillIndex,
                  }}
                >
                  <Check size={12} className={theme.check} />
                </motion.div>
              </motion.div>

              {/* Skill name with hover effect */}
              <motion.span
                className={`font-medium ${theme.skillText}`}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill.name}
              </motion.span>
            </div>

            {/* Skill level with custom styling based on level */}
            <motion.span
              className={`text-sm ml-8 ${
                levelColors[skill.level]
              } opacity-80 group-hover:opacity-100`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.3, delay: 0.2 + 0.05 * skillIndex }}
            >
              {skill.level}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
