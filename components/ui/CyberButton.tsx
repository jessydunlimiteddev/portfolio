import React from 'react';

interface CyberButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-white transition-all duration-200 focus:outline-none ${className}`}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 w-full h-full bg-accent/10 transform skew-x-12 transition-all duration-300 group-hover:bg-accent/20 group-hover:skew-x-0 border border-accent/30"></div>
      
      {/* Top/Bottom Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-accent opacity-100 group-hover:opacity-0 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-accent opacity-100 group-hover:opacity-0 transition-opacity"></div>

      {/* Glitch Text Effect (Simple duplication) */}
      <span className="relative z-10 flex items-center gap-2 group-hover:tracking-widest transition-all duration-300">
        {children}
      </span>
      
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-accent blur-xl transition-opacity duration-300 -z-10"></div>
    </a>
  );
};