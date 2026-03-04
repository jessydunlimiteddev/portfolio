import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Toolkit } from './components/Toolkit';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { FloatingSocials } from './components/FloatingSocials';
import { FloatingEmail } from './components/FloatingEmail';
import { TechBackground } from './components/ui/TechBackground';
import { BootSequence } from './components/ui/BootSequence';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <BootSequence onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          className="bg-background min-h-screen text-primary overflow-x-hidden selection:bg-accent/30 selection:text-white relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <TechBackground />
          
          <Navbar />
          <FloatingSocials />
          <FloatingEmail />
          
          <main className="w-full relative z-10">
            <Hero />
            <About />
            <Skills />
            <Toolkit />
            <Projects />
            <Testimonials />
            <Blog />
            <Contact />
          </main>
        </motion.div>
      )}
    </>
  );
};

export default App;