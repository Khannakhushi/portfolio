'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import Leadership from '@/components/leadership';
import Projects from '@/components/projects';
import Image from 'next/image';
import { useMemo } from 'react';
import MediumIcon from '@/components/medium-icon';
import Link from 'next/link';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

type FadeInSectionProps = {
  children: ReactNode;
  delay?: number;
};

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollY } = useScroll();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }

      // Update active section based on scroll position
      const sections = ['about', 'experience', 'projects', 'leadership', 'contact'];
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

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    }),
  };

  const FadeInSection = ({ children, delay = 0 }: FadeInSectionProps) => {
    return (
      <motion.div
        initial="hidden"
        variants={fadeInVariants}
        whileInView="visible"
        custom={delay}
        viewport={{ once: true, margin: '-100px' }}
      >
        {children}
      </motion.div>
    );
  };

  const memoizedHero = useMemo(
    () => (
      <FadeInSection>
        <Hero />
      </FadeInSection>
    ),
    [],
  );

  const memoizedAbout = useMemo(
    () => (
      <FadeInSection delay={0.2}>
        <About />
      </FadeInSection>
    ),
    [],
  );

  const memoizedExperience = useMemo(
    () => (
      <FadeInSection delay={0.3}>
        <Experience />
      </FadeInSection>
    ),
    [],
  );

  const memoizedProjects = useMemo(
    () => (
      <FadeInSection delay={0.4}>
        <Projects />
      </FadeInSection>
    ),
    [],
  );

  const memoizedLeadership = useMemo(
    () => (
      <FadeInSection delay={0.5}>
        <Leadership />
      </FadeInSection>
    ),
    [],
  );

  const memoizedContact = useMemo(
    () => (
      <FadeInSection delay={0.6}>
        <Contact />
      </FadeInSection>
    ),
    [],
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = document.querySelector('header')?.offsetHeight || 0;
      const paddingOffset = 50;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: yPosition - headerOffset - paddingOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} overflow-hidden`}>
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[hsl(var(--bg-gradient-from))] via-[hsl(var(--bg-gradient-via))] to-[hsl(var(--bg-gradient-to))] text-[hsl(var(--text-color))] transition-all duration-500">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          scrollToTop={scrollToTop}
        />

        <main className="container mx-auto space-y-24 overflow-x-hidden px-4 pb-16 pt-24">
          {memoizedHero}
          {memoizedAbout}
          {memoizedExperience}
          {memoizedProjects}
          {memoizedLeadership}
          {memoizedContact}
        </main>

        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 right-4"
            >
              <Button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                size="icon"
                className="h-10 w-10 rounded-full shadow-lg"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}
