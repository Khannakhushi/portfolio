'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleScrollToSection = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-card/80 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between overflow-hidden px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="cursor-pointer font-calligraphy text-2xl font-bold"
              onClick={scrollToTop}
            >
              Khyaati
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className={`transition-all duration-300 ${activeSection === item.id ? 'font-semibold' : ''}`}
                    onClick={() => handleScrollToSection(item.id)}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="ml-2"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={darkMode ? 'dark' : 'light'}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'open' : 'closed'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 overflow-hidden bg-card/95 pt-16 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto p-4">
              <nav>
                <ul className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: navItems.indexOf(item) * 0.1 }}
                    >
                      <Button
                        variant={activeSection === item.id ? 'default' : 'ghost'}
                        className="w-full justify-start text-left text-lg"
                        onClick={() => handleScrollToSection(item.id)}
                      >
                        {item.label}
                      </Button>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </motion.li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
