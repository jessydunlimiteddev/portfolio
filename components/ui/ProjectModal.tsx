import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Hash, Terminal } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-[#0a0410] border border-accent/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.15)] flex flex-col max-h-[90vh] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={(node) => node?.focus()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-accent font-mono text-sm">
            <Terminal size={16} />
            <span>PROJECT_PREVIEW // {project.title.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-white hover:rotate-90 transition-all duration-300 focus:outline-none focus:text-accent"
            aria-label="Close Modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-grow custom-scrollbar">
          {/* Image Area */}
          <div className="relative w-full aspect-video bg-black/50 group overflow-hidden border-b border-white/10">
             <img
               src={project.image}
               alt=""
               className="w-full h-full object-cover"
             />
             {/* Scanline overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
             
             {/* Live Preview Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm z-20">
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-accent text-background font-bold rounded hover:bg-white transition-colors transform hover:scale-105 duration-200 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                    >
                      <ExternalLink size={20} />
                      Open Live Demo
                    </a>
                  )}
              </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 space-y-6">
             <div>
                <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                      <Hash size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-secondary leading-relaxed text-lg">
                  {project.description}
                </p>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-white/5 flex flex-wrap gap-4 justify-end">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-secondary hover:text-white hover:bg-white/10 rounded transition-colors border border-transparent hover:border-white/20"
              >
                <Github size={18} />
                View Source
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 text-sm font-mono font-bold bg-accent text-background rounded hover:bg-white transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
        </div>
      </motion.div>
    </div>
  );
};