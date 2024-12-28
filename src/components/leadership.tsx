'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { leadership } from '@/data';

export default function Leadership() {
  return (
    <section id="leadership" className="container mx-auto py-12">
      <h2 className="font-playfair mb-6 text-center text-3xl font-bold">Leadership</h2>
      <Tabs
        defaultValue={leadership[0].title}
        orientation="vertical"
        className="flex flex-col-reverse md:flex-row items-center justify-center"
      >
        {/* Description content now on the left */}
        <div className="w-full md:w-2/3 md:pr-8">
          {leadership.map((lead) => (
            <TabsContent key={lead.title} value={lead.title}>
              <div className="rounded-lg bg-card p-6 text-card-foreground shadow-md">
                <h3 className="font-playfair mb-2 text-2xl font-semibold">{lead.title}</h3>
                <p className="font-playfair mb-2 text-sm text-muted/70 dark:text-muted-foreground/70">
                  {lead.project} | {lead.period}
                </p>
                <p className="font-playfair text-lg">{lead.description}</p>
              </div>
            </TabsContent>
          ))}
        </div>

        {/* Tabs now on the right */}
        <TabsList className="flex w-full md:w-1/3 flex-col space-y-2 md:border-l md:border-gray-200 md:pl-4">
          {leadership.map((lead) => (
            <TabsTrigger
            key={lead.title}
            value={lead.title}
            className="group relative w-fit justify-start py-2 text-left font-bold transition-all duration-300"
          >
            <span className="relative z-10 block ">{lead.title}</span>
            <div className="absolute bottom-1 left-0 h-1 w-0 rounded bg-secondary dark:bg-background transition-all duration-300 ease-out group-hover:w-full group-focus:w-full group-active:w-full data-[state=active]:w-full"></div>
            <div className="absolute bottom-2 left-0 h-1 w-0 rounded bg-secondary blur transition-all duration-300 ease-out group-hover:w-full group-focus:w-full group-active:w-full data-[state=active]:w-full"></div>
          </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </section>
  );
}
