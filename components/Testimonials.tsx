import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow Systems',
    content: "Jessy's ability to translate complex requirements into intuitive user interfaces is unmatched. The dashboard redesign resulted in a 40% increase in user engagement within the first month.",
    image: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: 't2',
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'NovaStart',
    content: "One of the most technically proficient developers I've worked with. Not only is the code clean and scalable, but Jessy also brings a designer's eye to every feature implementation.",
    image: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: 't3',
    name: 'Emily Weiss',
    role: 'Senior Designer',
    company: 'Creative Studio X',
    content: "It's rare to find a developer who cares as much about the micro-interactions as the design team does. Jessy bridges the gap between design and engineering perfectly.",
    image: 'https://picsum.photos/100/100?random=12'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading number="05" title="Transmissions" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.15}>
            <div className="relative p-6 bg-surface border border-border h-full flex flex-col group hover:border-accent/40 transition-colors duration-300">
               {/* Cyber Decoration Header */}
               <div className="flex justify-between items-center mb-6 border-b border-border pb-3">
                  <div className="flex gap-1">
                     {[...Array(5)].map((_, starI) => (
                        <Star key={starI} size={12} className="fill-accent text-accent" />
                     ))}
                  </div>
                  <div className="text-[10px] font-mono text-accent/50 tracking-widest">
                     LOG_ENTRY_0{i+1}
                  </div>
               </div>

               <div className="relative flex-grow">
                  <Quote className="absolute -top-2 -left-2 text-accent/10 transform -scale-x-100" size={48} />
                  <p className="text-secondary relative z-10 italic leading-relaxed text-sm md:text-base">
                     "{t.content}"
                  </p>
               </div>

               <div className="mt-8 flex items-center gap-4">
                  <div className="relative">
                     <div className="w-10 h-10 rounded-sm overflow-hidden border border-accent/30 grayscale group-hover:grayscale-0 transition-all duration-300">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                     </div>
                     {/* Online Indicator */}
                     <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  </div>
                  <div>
                     <div className="text-white font-bold text-sm">{t.name}</div>
                     <div className="text-accent text-xs font-mono">{t.role} @ {t.company}</div>
                  </div>
               </div>
               
               {/* Background Scanline */}
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};