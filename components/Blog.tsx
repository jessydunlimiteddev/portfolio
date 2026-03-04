import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Calendar, Clock, ArrowRight, Hash } from 'lucide-react';
import { BlogPost } from '../types';
// import blog1 from '../assets/image/blog1.webp';
// import blog2 from '../assets/image/blog2.webp';
// import blog3 from '../assets/image/blog3.webp';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Will AI Replace Programmers?',
    excerpt: 'Developers can now use tools like GitHub Copilot, ChatGPT, and Amazon CodeWhisperer to write functional software at an incredibly fast pace.',
    date: '2025-06-30',
    readTime: '3 min read',
    image: '/images/blog1.webp', // Replace with your actual image path
    link: 'https://medium.com/@jessicaadiele575/will-ai-replace-programmers-60928eb4c1af', // Replace with your actual article URL
    tags: ['Ai']
  },
  {
    id: '2',
    title: '7 VSCode Hacks Every Developer Should Know',
    excerpt: 'While many developers use VS Code for the basics, there are hidden gems and workflow tricks that can help you streamline your workflow ',
    date: '2025-05-05',
    readTime: '8 min read',
    image: '/images/blog2.webp',
    link: 'https://medium.com/@jessicaadiele575/7-vs-code-hacks-every-developer-should-know-724327fbff12', // Replace with your actual article URL
    tags: ['VS Code', 'Productivity']
  },
  {
    id: '3',
    title: 'ChatGPT Isn’t Just Smart — It’s a Cheat Code ',
    excerpt: 'Let’s be real — most people are using ChatGPT like a fancier Google search bar. Ask a question, get an answer, copy-paste, and move on.',
    date: '2025-05-19',
    readTime: '6 min read',
    image: '/images/blog3.webp',
    link: 'https://medium.com/@jessicaadiele575/chatgpt-isnt-just-smart-it-s-a-cheat-code-if-you-know-how-to-use-it-c3007f4cce09', // Replace with your actual article URL
    tags: ['ChatGPT', 'AI']
  }
];

export const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading number="06" title="Latest Articles" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Reveal key={post.id} delay={index * 0.1} width="100%">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-surface border border-border rounded overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col h-full relative"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur border border-accent/30 px-3 py-1 rounded text-xs font-mono text-accent flex items-center gap-2">
                  <Calendar size={12} />
                  {post.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Tags */}
                <div className="flex gap-3 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-secondary flex items-center gap-1 border border-white/10 px-2 py-0.5 rounded">
                      <Hash size={10} className="text-accent" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="flex items-center gap-2 text-xs font-mono text-secondary/70">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-accent transition-colors"
                  >
                    Read Article
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};