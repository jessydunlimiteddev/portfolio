import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ number, title, className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-4 mb-12 ${className}`}
    >
      <span className="font-mono text-xl md:text-2xl text-accent font-bold">{number}.</span>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary uppercase font-mono">
        {title}
      </h2>
      <div className="h-[1px] bg-border flex-grow ml-4 max-w-xs"></div>
    </motion.div>
  );
};