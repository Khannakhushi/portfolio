'use client';

import React, { useState } from 'react';
import { leadership } from '@/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
export default function Leadership() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === leadership.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? leadership.length - 1 : prev - 1));
  };

  return (
    <section id="leadership" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Leadership</h2>
          <p className="mx-auto max-w-xl text-lg opacity-70">
            How I&apos;ve contributed to communities and led teams
          </p>
        </motion.div>

        <div className="relative pb-16">
          {/* Main Feature */}
          <div className="relative overflow-hidden rounded-xl bg-card/50 p-1">
            <div className="rounded-lg  p-8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-3"
                >
                  {/* Left: Icon and Role */}
                  <div className="relative flex flex-col items-center justify-center border-primary/10 md:border-r">
                    <motion.div
                      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {leadership[currentIndex].image && (
                        <Image
                          src={leadership[currentIndex].image}
                          alt={leadership[currentIndex].title}
                          width={96}
                          height={96}
                          className="rounded-full"
                        />
                      )}

                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-bold">{leadership[currentIndex].title}</h3>
                    <p className="mt-1 text-sm opacity-70">{leadership[currentIndex].project}</p>
                  </div>

                  {/* Center: Description */}
                  <div className="flex flex-col justify-center md:col-span-2">
                    <div className="mb-4 flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{leadership[currentIndex].period}</span>
                    </div>
                    <p className="text-base leading-relaxed">
                      {leadership[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-card shadow-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {leadership.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? 'w-6 bg-primary' : 'w-2 bg-primary/30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-card shadow-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* All Roles Preview */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {leadership.map((role, index) => (
              <motion.button
                key={index}
                className={`rounded-lg p-4 text-left transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-primary/20 shadow-md'
                    : 'bg-card/50 hover:bg-primary/5'
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ y: -2 }}
              >
                <p className="truncate font-medium">{role.title}</p>
                <p className="truncate text-xs opacity-70">{role.project}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
