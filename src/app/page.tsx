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
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection);
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="relative min-h-screen overflow-hidden transition-colors duration-500">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          scrollToTop={scrollToTop}
        />

        <main className="relative">
          <Hero />
          <Experience />
          <Projects />
        </main>

        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-500/50 bg-background shadow-2xl shadow-orange-500/20 backdrop-blur-xl transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:shadow-orange-500/50"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-orange-500" />
            </motion.button>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}
