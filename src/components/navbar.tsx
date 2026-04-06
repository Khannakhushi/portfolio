'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
  scrollToTop: () => void;
};

export default function Navbar({
  darkMode,
  setDarkMode,
  activeSection,
  scrollToSection,
  scrollToTop,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const navItems = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleScrollToSection = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Subtle top fade for readability */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background)) 60%, transparent)',
          }}
        />

        <div className="container relative mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-base tracking-tight transition-opacity hover:opacity-60"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'hsl(var(--warm))',
            }}
          >
            Khyaati
          </button>

          {/* Desktop Nav — right aligned, spaced out */}
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={`relative text-sm transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: 'hsl(var(--warm))' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Divider */}
            <div className="h-4 w-px bg-border" />

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-muted-foreground"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-start justify-center bg-background/98 px-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className={`text-left text-4xl font-light tracking-tight transition-opacity hover:opacity-60 ${
                    activeSection === item.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.08 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
