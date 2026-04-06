'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Hero from '@/components/hero';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);

      const sections = ['experience', 'projects', 'contact'];

      // If scrolled near bottom, activate contact
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      if (atBottom) {
        setActiveSection('contact');
        return;
      }

      // Check which section is in view
      let found = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 0) {
          found = section;
        }
      }

      if (found) {
        setActiveSection(found);
      } else if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="relative min-h-screen transition-colors duration-500">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          scrollToTop={scrollToTop}
        />

        <main>
          <Hero />
          <Experience />
          <Projects />
        </main>

        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/80 shadow-lg backdrop-blur-sm transition-all hover:bg-card"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}
