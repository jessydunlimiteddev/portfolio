import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { motion } from 'framer-motion';
import { 
  Code2, 
  GitBranch, 
  Box, 
  Cpu, 
  Terminal, 
  Wind,
  Globe
} from 'lucide-react';
import { Tool } from '../types';

const tools: Tool[] = [
  // { name: 'Next.js', category: 'Framework', icon: Globe },
  { name: 'React', category: 'Library', icon: Code2 },
  { name: 'TypeScript', category: 'Language', icon: Terminal },
  { name: 'Tailwind', category: 'Styling', icon: Wind },
  { name: 'FastAPI', category: 'Framework', icon: Cpu },
  { name: 'Vite', category: 'Build Tool', icon: Box },
  { name: 'Git & GitHub', category: 'Version Control', icon: GitBranch },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Toolkit: React.FC = () => {
  return (
    <section id="toolkit" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading number="03" title="Toolkit" />
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {tools.map((tool) => (
          <motion.div 
            key={tool.name}
            variants={item}
            className="group relative p-6 bg-surface border border-border rounded hover:border-accent/50 transition-colors duration-300 overflow-hidden"
          >
            {/* Subtle Gradient Background Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col items-start h-full">
              <div className="p-3 bg-surfaceHighlight rounded-lg mb-4 text-white group-hover:text-accent transition-colors">
                <tool.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                {tool.name}
              </h3>
              
              <p className="text-sm font-mono text-secondary group-hover:text-white/80 transition-colors">
                {tool.category}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};