'use client';

import React, { useRef } from 'react';
import { experiences } from '@/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const techKeywords = [
  'Python', 'FastAPI', 'React', 'React.js', 'Amazon Q', 'LLM', 'MCP',
  'Kafka', 'AWS', 'JUnit', 'Cucumber', 'Spring Boot', 'AngularJS',
  'CI/CD', 'GitLab', 'Next.js', 'Tailwind CSS', 'TailwindCSS', 'SQLite',
  'Figma', 'EBS', 'EC2', 'JavaScript', 'TypeScript', 'Node.js',
  'Java', 'C++', 'Swift', 'Docker', 'Git', 'Framer Motion'
];

const highlightTech = (text: string) => {
  const matches: Array<{ keyword: string; index: number; length: number }> = [];
  
  techKeywords.forEach(keyword => {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({ keyword: match[0], index: match.index, length: match[0].length });
    }
  });

  matches.sort((a, b) => {
    if (a.index !== b.index) return a.index - b.index;
    return b.length - a.length;
  });

  const uniqueMatches: Array<{ keyword: string; index: number; length: number }> = [];
  matches.forEach(match => {
    const overlaps = uniqueMatches.some(
      existing => 
        (match.index >= existing.index && match.index < existing.index + existing.length) ||
        (match.index + match.length > existing.index && match.index < existing.index)
    );
    if (!overlaps) {
      uniqueMatches.push(match);
    }
  });

  uniqueMatches.sort((a, b) => b.index - a.index);

  let result = text;
  uniqueMatches.forEach((match) => {
    const replacement = `<span class="font-semibold text-orange-500/90">${match.keyword}</span>`;
    result = result.substring(0, match.index) + replacement + result.substring(match.index + match.length);
  });

  return result;
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-24 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mb-3 rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-500">
            Career Journey
          </span>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Professional <span className="text-muted-foreground">Experience</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Minimal Line */}
          <div className="absolute left-[27px] top-0 h-full w-[1px] bg-border/50 md:left-1/2 md:-ml-[0.5px]">
            <motion.div 
              style={{ height }} 
              className="w-full bg-gradient-to-b from-amber-500 via-orange-500 to-rose-500"
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start gap-8 md:gap-0`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[13px] top-0 z-10 flex h-[29px] w-[29px] items-center justify-center rounded-full border-[6px] border-background bg-gradient-to-br from-amber-500 to-rose-500 shadow-sm md:left-1/2 md:-translate-x-1/2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-40px)] pl-16 md:pl-0 ${!isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative"
                    >
                      {/* Minimal Card Design */}
                      <div className="relative rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm transition-all duration-500 hover:border-orange-500/20 hover:bg-card/50 hover:shadow-lg hover:shadow-orange-500/5">
                        <div className={`mb-6 flex flex-col gap-1.5 ${!isEven ? 'md:items-end' : 'items-start'}`}>
                          <h3 className="text-2xl font-bold text-foreground">{exp.title}</h3>
                          <span className="text-lg font-medium text-orange-500">{exp.company}</span>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </div>
                        </div>

                        <div 
                          className="text-base leading-relaxed text-muted-foreground/80 text-left"
                          dangerouslySetInnerHTML={{ __html: highlightTech(exp.description) }}
                        />
                        
                        {/* Decorative Corner Gradient */}
                        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-orange-500/5 blur-2xl transition-all duration-500 group-hover:bg-orange-500/10" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Empty Space */}
                  <div className="hidden w-[calc(50%-40px)] md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
