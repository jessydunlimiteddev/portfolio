import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Monitor, PenTool, Search, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkillCategory } from '../types';

const skillCategories: SkillCategory[] = [
  {
    title: 'SEO Writing',
    description: 'Optimizing content visibility and driving organic traffic through strategic keyword implementation.',
    icon: Search,
    skills: [
      'Keyword Research & Strategy',
      'On-Page & Off-Page SEO',
      'Content Audit & Optimization',
      'Google Analytics & Search Console',
      'Competitor Analysis'
    ]
  },
  {
    title: 'Technical Blogs',
    description: 'Translating complex engineering concepts into clear, engaging, and educational content.',
    icon: PenTool,
    skills: [
      'Deep-Dive Technical Tutorials',
      'API Documentation & Guides',
      'Case Studies & White Papers',
      'Developer Advocacy Content',
      'Editing & Proofreading'
    ]
  },
  {
    title: 'Web Development',
    description: 'Building modern, performant, and accessible digital experiences.',
    icon: Code2,
    skills: [
      'React, Next.js & TypeScript',
      'Responsive UI/UX Implementation',
      'Performance Optimization',
      'Accessibility (WCAG) Compliance',
      'Modern CSS (Tailwind, Framer Motion)'
    ]
  }
];

export const Skills: React.FC = () => {
  // Animation variants for the icon
  const iconVariants = {
    rest: { 
      scale: 1, 
      color: "#00f3ff", 
      boxShadow: "0 0 0px rgba(0, 243, 255, 0)",
    },
    hover: { 
      scale: [1, 1.15, 1],
      color: "#ffffff",
      boxShadow: [
        "0 0 0px rgba(0, 243, 255, 0)", 
        "0 0 15px rgba(0, 243, 255, 0.6)", 
        "0 0 0px rgba(0, 243, 255, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading number="02" title="Capabilities" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.1} width="100%">
            <motion.div 
              className="group relative h-full bg-surface/50 border border-border p-8 rounded hover:border-accent/50 transition-colors duration-300"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              {/* Icon with Animation */}
              <motion.div 
                variants={iconVariants}
                className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded bg-surfaceHighlight border border-accent/20 relative z-10"
              >
                <category.icon size={24} />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {category.title}
              </h3>
              
              <p className="text-secondary text-sm mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skill List Styled as Terminal Output */}
              <ul className="space-y-2 font-mono text-xs md:text-sm text-secondary/80">
                {category.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">{'>'}</span>
                    <span className="group-hover:text-white transition-colors">{skill}</span>
                  </li>
                ))}
              </ul>
              
              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"></div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};