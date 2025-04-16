'use client';

import React, { useState } from 'react';
import { experiences } from '@/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, ArrowRight, Briefcase } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="container mx-auto px-4 py-16">
      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div className="mb-16 text-center" variants={itemVariants}>
          <motion.div
            className="mb-3 inline-block"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Briefcase className="h-7 w-7 text-primary" />
            </span>
          </motion.div>
          <h2 className="mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Experience
          </h2>
          <p className="mx-auto max-w-xl text-lg opacity-70">
            My professional journey and work experience
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Timeline navigation - made to match height */}
            <motion.div className="flex flex-col md:col-span-3" variants={itemVariants}>
              <div className="sticky top-24 flex h-full flex-col space-y-2">
                {experiences.map((exp, index) => (
                  <motion.button
                    key={index}
                    className={`group relative flex w-full items-start overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary/10 shadow-md' : 'hover:bg-primary/5'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { duration: 0.5, delay: index * 0.1 },
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Background for active item */}
                    {activeIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <span
                      className={`relative z-10 mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        activeIndex === index
                          ? 'bg-card-foreground text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="relative z-10 overflow-hidden">
                      <h3
                        className={`truncate text-sm font-medium ${activeIndex === index ? 'text-primary' : ''}`}
                      >
                        {exp.company}
                      </h3>
                      <p className="truncate text-xs opacity-70">{exp.period}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Experience details - height adjusted to match nav */}
            <motion.div className="relative md:col-span-9" variants={itemVariants}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="h-full rounded-2xl border border-primary/10 bg-card/30 p-8 shadow-lg backdrop-blur-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-6">
                      <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {experiences[activeIndex].company}
                      </div>
                      <h3 className="text-2xl font-bold md:text-3xl">
                        {experiences[activeIndex].title}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{experiences[activeIndex].period}</span>
                      </div>
                    </div>

                    <div className="prose prose-sm md:prose-base max-w-none flex-grow">
                      <p className="leading-relaxed">{experiences[activeIndex].description}</p>
                    </div>

                    <motion.div
                      className="mt-8 self-end"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href="#"
                        className="group inline-flex items-center text-sm font-medium text-primary"
                      >
                        <span>View details</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
