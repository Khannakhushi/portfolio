'use client';

import React from 'react';
import { projects } from '@/data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  name: string;
  subsection?: string;
  description: string;
  image?: string;
  imagePosition?: string;
  github: string;
}

interface ProjectCardProps {
  project: Project;
  isFeature: boolean;
}

export default function Projects() {
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

        {/* Masonry Layout */}
        <div className="relative">
          {/* Projects Grid */}
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project, index) => {
              // Only the first project spans 2 columns on desktop
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
                  <ProjectCard project={project} isFeature={isFeature} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isFeature }: ProjectCardProps) {
  return (
    <motion.div
      className="group h-full overflow-hidden rounded-xl border border-primary/10 bg-card/30 shadow-lg backdrop-blur-sm"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      {project.image && (
        <div className={`relative overflow-hidden ${isFeature ? 'h-64' : 'h-48'}`}>
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

        <div className="mt-auto flex justify-end">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
