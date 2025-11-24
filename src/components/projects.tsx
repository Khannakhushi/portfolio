'use client';

import React, { useState } from 'react';
import { projects } from '@/data';
import Image from 'next/image';
import { ArrowUpRight, Github, X, Rocket, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Project {
  name: string;
  subsection?: string;
  description: string;
  image?: string;
  imagePosition?: string;
  github: string;
  link?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Show all projects by default as requested
  const featuredProjects = projects;

  return (
    <section id="projects" className="relative py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[100px]" />
        <div className="absolute -left-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mb-3 rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-500">
            My Work
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Featured <span className="text-muted-foreground">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A showcase of my technical explorations and creative solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.name}
              variants={item}
              layoutId={`card-${project.name}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xs transition-all hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              {/* Image Container */}
              <div
                className="relative aspect-video w-full cursor-pointer overflow-hidden bg-muted"
                onClick={() => setSelectedProject(project)}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className={`object-cover transition-transform duration-700 will-change-transform group-hover:scale-105 ${project.imagePosition || 'object-center'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
                    <Code2 className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                {/* Floating Action Button on Hover */}
                <div className="absolute right-4 top-4 flex translate-y-[-10px] gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-md">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    {project.subsection && (
                      <span className="text-xs font-medium text-orange-500">
                        {project.subsection}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mb-6 line-clamp-2 text-sm text-muted-foreground/90">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-orange-500"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source</span>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-orange-500"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                layoutId={`card-${selectedProject.name}`}
                className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform hover:scale-110"
                >
                  <X className="h-5 w-5" />
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

                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold md:text-3xl">{selectedProject.name}</h2>
                    {selectedProject.subsection && (
                      <p className="mt-2 text-lg font-medium text-orange-500">
                        {selectedProject.subsection}
                      </p>
                    )}
                  </div>

                  <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-orange-500 px-8 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/40"
                      >
                        Visit Website <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-input bg-background px-8 text-sm font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground"
                      >
                        <Github className="h-4 w-4" />
                        View Source
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
