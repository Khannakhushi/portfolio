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
    <section id="projects" className="relative py-20">
      <div className="container mx-auto max-w-5xl px-5 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mb-12 sm:mb-20 flex items-end justify-between border-b border-border pb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="section-number text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
              02
            </span>
            <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">Projects</h2>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            What I&apos;ve been building
          </p>
        </motion.div>

        {/* Two-column text grid */}
        <motion.div
          className="grid grid-cols-1 gap-x-16 gap-y-0 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              onClick={() => setSelectedProject(project)}
              className="group flex cursor-pointer items-baseline justify-between gap-4 border-b border-border/40 py-5 transition-all duration-300 hover:border-border"
            >
              <div className="min-w-0">
                <h3 className="text-base font-medium text-foreground transition-all duration-300 group-hover:text-[hsl(var(--warm))]">
                  {project.name}
                </h3>
                <span
                  className="text-xs"
                  style={{ color: 'hsl(var(--warm))' }}
                >
                  {project.subsection}
                </span>
              </div>

              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/20 transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.div>
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
                className="relative flex max-h-[90vh] sm:max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-background shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>

                {selectedProject.image && (
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
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

                  <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                      >
                        Visit Website <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
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
