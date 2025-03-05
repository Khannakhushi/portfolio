'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import Leadership from '@/components/leadership';
import Projects from '@/components/projects';
import Image from 'next/image';
import { useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import MediumIcon from '@/components/medium-icon';

type FadeInSectionProps = {
  children: ReactNode;
};

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollY } = useScroll();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [enableBitmoji, setEnableBitmoji] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save scroll position on unload
  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => window.removeEventListener('beforeunload', saveScrollPosition);
  }, []);

  // Restore scroll position on load
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const FadeInSection = ({ children }: FadeInSectionProps) => {
    return (
      <motion.div
        initial="hidden"
        variants={fadeInVariants}
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
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
      <FadeInSection>
        <About />
      </FadeInSection>
    ),
    [],
  );

  const memoizedExperience = useMemo(
    () => (
      <FadeInSection>
        <Experience />
      </FadeInSection>
    ),
    [],
  );

  const memoizedProjects = useMemo(
    () => (
      <FadeInSection>
        <Projects />
      </FadeInSection>
    ),
    [],
  );

  const memoizedLeadership = useMemo(
    () => (
      <FadeInSection>
        <Leadership />
      </FadeInSection>
    ),
    [],
  );

  const memoizedBitmoji = useMemo(
    () => (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className=""
      >
        <Image src="/wall burst.png" alt="Hero Image" width={400} height={400} />
      </motion.div>
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
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--bg-gradient-from))] via-[hsl(var(--bg-gradient-via))] to-[hsl(var(--bg-gradient-to))] text-[hsl(var(--text-color))] transition-all duration-500">
        <header className="fixed top-0 z-50 w-full bg-card shadow-md">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div>
              <h1
                className="font-calligraphy text-2xl font-bold"
                onClick={() => setEnableBitmoji(true)}
              >
                Khyaati
              </h1>
            </div>
            <nav>
              <Sheet>
                <ul className="hidden space-x-4 md:flex">
                  {['about', 'experience', 'projects', 'leadership', 'contact'].map((section) => (
                    <li key={section}>
                      <Button variant="ghost" onClick={() => scrollToSection(section)}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Button>
                    </li>
                  ))}
                  <li>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDarkMode(!darkMode)}
                      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </Button>
                  </li>
                </ul>
                <SheetTrigger className="md:hidden">
                  <HamburgerMenuIcon className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent>
                  <ul className="flex flex-col space-y-4 md:hidden">
                    {['about', 'experience', 'projects', 'leadership', 'contact'].map((section) => (
                      <li key={section}>
                        <Button variant="ghost" onClick={() => scrollToSection(section)}>
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Button>
                      </li>
                    ))}
                    <li>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                      >
                        {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                      </Button>
                    </li>
                  </ul>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </header>

        <main className="container mx-auto space-y-24 px-4 py-8">
          {memoizedHero}

          {memoizedAbout}
          {memoizedExperience}
          {memoizedProjects}
          {memoizedLeadership}

          <FadeInSection>
            <section id="contact">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-playfair mb-8 text-center text-3xl font-bold">Contact</h2>
                <p className="font-playfair mb-6 text-center text-lg">
                  I&apos;m always open to new opportunities and collaborations. Whether you have a
                  project in mind or just want to connect, feel free to reach out!
                </p>
                <div className="flex justify-center space-x-10">
                  <div className="flex justify-center space-x-10">
                    <a
                      href="https://github.com/Khannakhushi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="h-10 w-10 text-lg" variant="ghost" size="icon">
                        <Github className="h-8 w-8" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/khyaati-khanna/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="h-10 w-10 text-lg" variant="ghost" size="icon">
                        <Linkedin className="h-8 w-8" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </a>

                    <a
                      href="https://medium.com/@khannakhushi93"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="h-10 w-10 text-lg" variant="ghost" size="icon">
                        <MediumIcon className="h-8 w-8" />
                        <span className="sr-only">Medium</span>
                      </Button>
                    </a>

                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=khannakhyaati@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="h-10 w-10 text-lg" variant="ghost" size="icon">
                        <Mail className="h-8 w-8" />
                        <span className="sr-only">Email</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>
          {/* Scroll to Top Button */}
        </main>
        {showScrollButton && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4"
            aria-label="Scroll to top"
            size="icon"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        )}
        <footer className="font-playfair flex items-center justify-center px-4 pb-6 pt-2">
          <p className="flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} Made with <Heart className="" size={16} /> by Khyaati.
          </p>
        </footer>
      </div>
    </div>
  );
}
