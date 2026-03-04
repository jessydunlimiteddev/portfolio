import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavItem } from '../types';
import { Menu, X } from 'lucide-react';

const navItems: NavItem[] = [
  { number: '01', label: 'About', href: '#about' },
  { number: '02', label: 'Skills', href: '#skills' },
  { number: '03', label: 'Toolkit', href: '#toolkit' },
  { number: '04', label: 'Projects', href: '#projects' },
  { number: '05', label: 'Reviews', href: '#testimonials' },
  { number: '06', label: 'Blog', href: '#blog' },
  { number: '07', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Calculate offset for fixed navbar (approx 100px to give breathing room)
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 border-b border-border py-4 shadow-lg shadow-black/50 backdrop-blur-md' 
          : 'bg-transparent py-6 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="text-xl font-mono font-bold tracking-tighter text-white z-50 hover:text-accent transition-colors flex items-center gap-2"
          aria-label="Jessy's Portfolio Home"
        >
          <span className="text-accent" aria-hidden="true">&gt;_</span> 
          <span aria-hidden="true">portfolio</span>
          <span className="animate-pulse text-accent text-xs align-top" aria-hidden="true">▮</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="group flex items-center gap-1 text-sm font-mono text-secondary hover:text-white transition-colors"
            >
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 transform duration-300 text-[10px]" aria-hidden="true">
                {item.number} //
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white z-50 relative hover:text-accent transition-colors p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={mobileOpen ? { height: '100vh', opacity: 1 } : { height: 0, opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-center items-center overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
      >
          <div className="flex flex-col gap-8 text-center w-full max-w-sm px-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="flex items-center justify-between text-2xl font-mono font-bold text-secondary hover:text-white transition-colors border-b border-white/10 pb-2 group"
                tabIndex={mobileOpen ? 0 : -1}
              >
                 <span className="group-hover:text-accent transition-colors">{item.label}</span>
                 <span className="text-accent text-xs tracking-widest opacity-50 group-hover:opacity-100" aria-hidden="true">{item.number}</span>
              </a>
            ))}
          </div>
      </motion.div>
    </motion.nav>
  );
};