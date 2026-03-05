import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="py-24 px-6 max-w-7xl mx-auto"
      aria-label="About Me"
    >
      <SectionHeading number="01" title="About Me" />
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-secondary text-lg leading-relaxed">
          <Reveal>
            <p>
              Hello! My name is Jessica and I build things on the web and I explain how they work.
              As both a web developer and technical writer, I’m comfortable moving between codebases and documentation. I enjoy translating complex technical concepts into structured, human-readable content while also developing clean, responsive web experiences.
              I’ve worked with startups where clarity and speed matter. That experience shaped how I approach both development and writing: deliberate architecture, thoughtful UX, and documentation that doesn’t waste the reader’s time.
            </p>
          </Reveal>
          {/* <Reveal>
            <p>
              Fast-forward to today, and I’ve had the privilege of working at an <span className="text-accent">advertising agency</span>, a <span className="text-accent">start-up</span>, a <span className="text-accent">huge corporation</span>, and a <span className="text-accent">student-led design studio</span>.
            </p> yup
          </Reveal> */}
          <Reveal>
            <p>
              I am passionate about cutting-edge pixel-perfect, beautiful interfaces and intuitively implemented UX.
            </p>
          </Reveal>
        </div>

        <div className="relative group mx-auto md:mx-0 max-w-xs">
          <Reveal width="100%">
             <div className="relative" role="img" aria-label="Portrait of Jessy">
                {/* Decorative border - hidden from screen readers */}
                <div 
                  className="absolute inset-0 border-2 border-accent translate-x-4 translate-y-4 rounded transition-transform group-hover:translate-x-2 group-hover:translate-y-2"
                  aria-hidden="true"
                ></div>
                <div className="relative bg-surfaceHighlight rounded overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <img 
                    src="/images/aboutme.jpeg" 
                    alt="Jessica, Developer Portrait" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative overlay - hidden from screen readers */}
                  <div 
                    className="absolute inset-0 bg-accent/20 hover:bg-transparent transition-colors"
                    aria-hidden="true"
                  ></div>
                </div>
             </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};