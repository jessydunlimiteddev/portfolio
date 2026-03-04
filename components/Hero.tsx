import React from 'react';
import { Reveal } from './ui/Reveal';
import { Typewriter } from './ui/Typewriter';
import { ArrowDown } from 'lucide-react';
import { CyberButton } from './ui/CyberButton';
import { HeroGraphic } from './ui/HeroGraphic';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 relative max-w-7xl mx-auto pt-20 overflow-hidden">
      
      {/* 3D Animated Graphic Background */}
      <HeroGraphic />

      <div className="max-w-3xl relative z-10">
        <Reveal delay={0.2}>
          <p className="font-mono text-white/80 mb-2 ml-1">Hi, my name is</p>
        </Reveal>
        
        <Reveal delay={0.35}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 shadow-accent/20 drop-shadow-lg">
            Jessy.
          </h1>
        </Reveal>
        
        <Reveal delay={0.45}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-secondary mb-12 h-[1.3em]">
            <Typewriter 
              strings={[
                "I'm a Technical Writer.", 
                "I'm a Web Developer.", 
                "I build accessible solutions."
              ]}
              typeSpeed={70}
              deleteSpeed={50}
              delay={2000}
            />
          </h2>
        </Reveal>

        <Reveal delay={0.55}>
          <p className="text-secondary text-lg max-w-xl leading-relaxed mb-12 border-l-2 border-accent/30 pl-6 bg-background/50 backdrop-blur-sm rounded-r lg:bg-transparent lg:backdrop-blur-none">
            I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
          </p>
        </Reveal>

        <Reveal delay={0.65}>
          <CyberButton href="#projects">
             Initialize_Project_View
          </CyberButton>
        </Reveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-secondary hidden md:block opacity-50 z-10" aria-hidden="true">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

