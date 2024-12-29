'use client';

import React from 'react';
import { projects } from '@/data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Link2 } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="container mx-auto py-12 px-4">
      <h2 className="font-playfair mb-6 text-center text-3xl font-bold">Projects</h2>

      <div className="relative mx-auto flex max-w-4xl flex-col space-y-12">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`flex flex-col items-center justify-between space-y-4 md:space-y-0 md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            } ${index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left'}`}
          >
            {/* Project details card */}
            <div className="w-full md:w-1/2 p-1"> {/* Added padding */}
              <div className="w-full transform rounded-lg bg-background p-6 shadow-lg transition-all duration-500 hover:scale-105 border-2 border-primary/10"> {/* Added border */}
                <div className="transition-opacity duration-500">
                  <h3 className="font-playfair mb-2 text-2xl font-semibold">{project.name}</h3>

                  {project.subsection && (
                    <h4 className="font-playfair mb-2 text-lg font-medium text-gray-600 dark:text-gray-500">
                      {project.subsection}
                    </h4>
                  )}
                </div>

                <p className="text-sm mb-4">{project.description}</p>
                <div className="flex w-full justify-end">
                  <Button variant="ghost" asChild size="icon">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Link2 className="h-6 w-6" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline dot (hidden on mobile) */}
            <div className="relative z-10 hidden h-6 w-6 rounded-full bg-white md:block">
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"></div>
            </div>

            {/* Project image */}
            {project.image && (
              <div className="w-full md:w-1/2 p-1"> {/* Added padding */}
                <Link href={project.github} target="_blank" rel="noopener noreferrer" className="block h-64 w-full">
                  <div className="h-full w-full rounded-lg p-1 border-2 border-primary"> {/* Added border and padding */}
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={400}
                      height={300}
                      className="h-full w-full rounded-lg object-cover shadow-lg"
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* Vertical line for the timeline (hidden on mobile) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 transform bg-background md:block"></div>
      </div>
    </section>
  );
}

