'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { experiences } from '@/data';

export default function Experience() {
  return (
    <section id="experience" className="container mx-auto py-12">
      <h2 className="font-playfair mb-6 text-center text-3xl font-bold">Experience</h2>
      <Tabs
        defaultValue={experiences[0].title}
        orientation="vertical"
        className="flex flex-col items-center justify-center md:flex-row"
      >
        <TabsList className="flex w-full flex-col space-y-2 md:border-r md:border-gray-200 md:pr-4 md:w-1/3">
          {experiences.map((exp) => (
            <TabsTrigger
              key={exp.title}
              value={exp.title}
              className="group relative w-fit justify-start py-2 text-left font-bold transition-all duration-300"
            >
              <span className="relative z-10 block">{exp.title}</span>
              <div className="absolute bottom-1 left-0 h-1 w-0 rounded bg-secondary transition-all duration-300 ease-out group-hover:w-full group-focus:w-full group-active:w-full data-[state=active]:w-full dark:bg-background"></div>
              <div className="absolute bottom-2 left-0 h-1 w-0 rounded bg-secondary blur transition-all duration-300 ease-out group-hover:w-full group-focus:w-full group-active:w-full data-[state=active]:w-full"></div>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="w-full md:w-2/3 md:pl-8">
          {experiences.map((exp) => (
            <TabsContent key={exp.title} value={exp.title}>
              <div className="rounded-lg bg-card p-6 text-card-foreground shadow-md">
                <h3 className="font-playfair mb-2 text-2xl font-semibold">{exp.title}</h3>
                <p className="font-playfair mb-2 text-sm text-muted/70 dark:text-muted-foreground/70">
                  {exp.company} | {exp.period}
                </p>
                <p className="font-playfair text-lg">{exp.description}</p>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
}
