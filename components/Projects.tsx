import React, { useState } from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { Project } from '../types';
import { Github, ExternalLink, Terminal, Eye } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectModal } from './ui/ProjectModal';
// import project1 from '../assets/image/project1.jpg';
// import project2 from '../assets/image/project2.jpg';
// import project3 from '../assets/image/project3.jpg';
// import project1 from '../assets/image/project1.jpg';

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive dashboard for managing online stores. Features real-time analytics, inventory management, and order tracking. Built with performance and accessibility in mind.',
    tags: [ 'TypeScript', 'Tailwind'],
    github: 'https://github.com/jessydunlimiteddev/Nexus-Retail-Dashboard-AI-powered-',
    link: 'https://retail-dashboardd.netlify.app',
    image: '/images/project2.jpg',
  },
  {
    id: '2',
    title: 'Transportation company',
    description: 'A collaborative task management tool that allows teams to organize tasks, set deadlines, and track progress. Includes drag-and-drop functionality and real-time updates.',
    tags: ['React','TypeScript', 'Tailwind'],
    github: 'https://github.com/jessydunlimiteddev/NaijaX',
    link: 'https://naijax.netlify.app',
    image: '/images/project1.jpg',
  },
  {
    id: '3',
    title: 'Food website',
    description: 'A responsive website for a local restaurant, featuring a modern design and easy navigation. Includes a menu section and online ordering functionality.',
    tags: ['js', 'Html', 'scss' , 'css'],
    github: 'https://github.com/jessydunlimiteddev/BiteBase',
    link: 'https://bitebasee.netlify.app/',
    image: '/images/project3.jpg',
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading number="04" title="Featured Projects" />
      
      {/* Projects List */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id} 
              className="flex flex-col gap-4 h-full group"
            >
              {/* Image Side */}
              <div 
                className="w-full relative overflow-hidden rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent aspect-video"
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
              >
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                 
                 {/* Image with Zoom Effect */}
                 <img 
                   src={project.image} 
                   alt="" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out shadow-lg"
                 />

                 {/* Click Hint Overlay */}
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-[2px]">
                    {project.link && project.link !== '#' ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent font-mono text-sm border border-accent px-4 py-2 rounded uppercase tracking-widest flex items-center gap-2 bg-black/50 hover:bg-accent hover:text-black transition-colors"
                      >
                        <Eye size={16} />
                        View Project
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-accent font-mono text-sm border border-accent px-4 py-2 rounded uppercase tracking-widest flex items-center gap-2 bg-black/50 hover:bg-accent hover:text-black transition-colors"
                      >
                        <Eye size={16} />
                        View Project
                      </button>
                    )}
                 </div>
              </div>

              {/* Content Side */}
              <div className="w-full flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <Reveal key={`${project.id}-title`}>
                       <h3 className="text-xl font-bold text-white">
                         <button
                            onClick={() => setSelectedProject(project)}
                            className="hover:text-accent transition-colors text-left focus:outline-none focus:text-accent"
                         >
                          {project.title}
                         </button>
                      </h3>
                    </Reveal>
                    
                    <div className="flex gap-3 text-white">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="View Source Code on GitHub">
                          <Github size={18} />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Visit Live Project">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                </div>
                
                <div 
                  className="bg-surfaceHighlight p-4 rounded shadow-md text-secondary text-sm leading-relaxed mb-4 border border-border cursor-pointer hover:border-accent/30 transition-colors flex-grow"
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Description for ${project.title}, click to view details`}
                >
                  {project.description}
                </div>

                <ul className="flex flex-wrap gap-2 mt-auto text-xs font-mono text-secondary">
                  {project.tags.map(tag => (
                    <li 
                      key={tag}
                      className="px-2 py-1 rounded bg-white/5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};