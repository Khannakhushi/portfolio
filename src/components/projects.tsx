'use client';

import React, { useState } from 'react';
import { projects } from '@/data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github, X, Maximize2 } from 'lucide-react';
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

interface ProjectCardProps {
  project: Project;
  isFeature: boolean;
  onImageClick: () => void;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Projects</h2>
          <p className="mx-auto max-w-xl text-lg opacity-70">
            A selection of my recent work and projects I&apos;ve contributed to
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="relative">
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project, index) => {
              const isFeature = index === 0;

              return (
                <motion.div
                  key={project.name}
                  className={`${isFeature ? 'md:col-span-2' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <ProjectCard
                    project={project}
                    isFeature={isFeature}
                    onImageClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.button
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5" />
              </motion.button>

              <motion.div
                className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {selectedProject.image && (
                  <div className="max-h-[70vh] w-full overflow-y-auto">
                    <div className="relative w-full">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.name}
                        width={1920}
                        height={1080}
                        className="h-auto w-full object-contain object-top"
                        sizes="(max-width: 1536px) 100vw, 1536px"
                        priority
                      />
                    </div>
                  </div>
                )}

                <div className="flex-shrink-0 border-t border-primary/10 bg-card/50 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2 text-2xl font-bold">{selectedProject.name}</h3>
                      {selectedProject.subsection && (
                        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-primary">
                          {selectedProject.subsection}
                        </p>
                      )}
                      <p className="text-sm opacity-80">{selectedProject.description}</p>
                    </div>

                    <div className="flex gap-2">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                          aria-label="View GitHub repository"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                          aria-label="View live project"
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </a>
                      )}
                    </div>
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

function ProjectCard({ project, isFeature, onImageClick }: ProjectCardProps) {
  return (
    <motion.div
      className="group h-full overflow-hidden rounded-xl border border-primary/10 bg-card/30 shadow-lg backdrop-blur-sm"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      {project.image && (
        <div
          className={`group/image relative cursor-pointer overflow-hidden ${isFeature ? 'h-64' : 'h-48'}`}
          onClick={onImageClick}
        >
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover/image:bg-black/20">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 transition-opacity duration-300 group-hover/image:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 className="h-5 w-5" />
            </motion.div>
          </div>
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={`${project.imagePosition || 'object-center'} object-cover transition-all duration-700 group-hover:scale-110`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold text-foreground">{project.name}</h3>
        {project.subsection && (
          <p className="mb-2 text-xs text-muted-foreground">{project.subsection}</p>
        )}
        <p className="mb-4 text-sm opacity-80">{project.description}</p>

        <div className="mt-auto flex justify-end gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
