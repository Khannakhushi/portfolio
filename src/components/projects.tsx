'use client';

import React, { useState } from 'react';
import { projects } from '@/data';
import Image from 'next/image';
import { ArrowUpRight, Github, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  name: string;
  subsection?: string;
  description: string;
  image?: string;
  imagePosition?: string;
  github: string;
  link?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-12 sm:py-16">
      <div className="container mx-auto max-w-5xl px-5 sm:px-6">
        {/* Section header */}
        <motion.div
          className="border-border mb-8 flex items-end justify-between border-b pb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="section-number text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
              02
            </span>
            <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Projects
            </h2>
          </div>
          <p className="text-muted-foreground hidden text-sm md:block">
            What I&apos;ve been building
          </p>
        </motion.div>

        {/* Two-column text grid */}
        <motion.div
          className="grid grid-cols-1 gap-x-16 gap-y-0 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {projects.map((project) => (
            <div
              key={project.name}
              onClick={() => setSelectedProject(project)}
              className="group border-border/40 hover:border-border flex cursor-pointer items-baseline justify-between gap-4 border-b py-5 transition-all duration-300"
            >
              <div className="min-w-0">
                <h3 className="text-foreground text-base font-medium transition-all duration-300 group-hover:text-[hsl(var(--warm))]">
                  {project.name}
                </h3>
                <span className="text-xs" style={{ color: 'hsl(var(--warm))' }}>
                  {project.subsection}
                </span>
              </div>

              <ArrowUpRight className="text-muted-foreground/20 group-hover:text-foreground h-3.5 w-3.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border-border bg-background relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border shadow-2xl sm:max-h-[85vh] sm:rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-background/80 text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {selectedProject.image && (
                  <div className="bg-muted relative aspect-video w-full shrink-0 overflow-hidden">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-5 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-medium">{selectedProject.name}</h2>
                    {selectedProject.subsection && (
                      <p className="mt-1 text-sm" style={{ color: 'hsl(var(--warm))' }}>
                        {selectedProject.subsection}
                      </p>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                      >
                        Visit Website <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-border hover:bg-accent inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
