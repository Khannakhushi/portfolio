'use client';

import React from 'react';
import { experiences } from '@/data';
import { motion } from 'framer-motion';

const techKeywords = [
  'Python',
  'FastAPI',
  'React',
  'React.js',
  'Amazon Q',
  'LLM',
  'MCP',
  'Kafka',
  'AWS',
  'JUnit',
  'Cucumber',
  'Spring Boot',
  'AngularJS',
  'CI/CD',
  'GitLab',
  'Next.js',
  'Tailwind CSS',
  'TailwindCSS',
  'SQLite',
  'Figma',
  'EBS',
  'EC2',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Java',
  'C++',
  'Swift',
  'Docker',
  'Git',
  'Framer Motion',
  '.NET Core',
  'C#',
  'Microsoft SQL Server',
];

const highlightTech = (text: string) => {
  const matches: Array<{ keyword: string; index: number; length: number }> = [];

  techKeywords.forEach((keyword) => {
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
  matches.forEach((match) => {
    const overlaps = uniqueMatches.some(
      (existing) =>
        (match.index >= existing.index && match.index < existing.index + existing.length) ||
        (match.index + match.length > existing.index && match.index < existing.index),
    );
    if (!overlaps) {
      uniqueMatches.push(match);
    }
  });

  uniqueMatches.sort((a, b) => b.index - a.index);

  let result = text;
  uniqueMatches.forEach((match) => {
    const replacement = `<span style="color: hsl(var(--warm))">${match.keyword}</span>`;
    result =
      result.substring(0, match.index) + replacement + result.substring(match.index + match.length);
  });

  return result;
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-12 sm:py-16">
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
              01
            </span>
            <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Experience
            </h2>
          </div>
          <p className="text-muted-foreground hidden text-sm md:block">
            Where I&apos;ve been building
          </p>
        </motion.div>

        {/* Experience list */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="border-border/60 grid gap-2 border-b py-7 transition-all duration-500 sm:gap-4 sm:py-10 md:grid-cols-[200px_1fr] md:gap-12 lg:grid-cols-[240px_1fr]">
                {/* Left column - meta */}
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    {exp.period}
                  </span>
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color: 'hsl(var(--warm))' }}
                  >
                    {exp.company}
                  </span>
                </div>

                {/* Right column - content */}
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-medium sm:mb-3 sm:text-xl md:text-2xl">
                    {exp.title}
                  </h3>
                  <div
                    className="text-muted-foreground text-sm leading-relaxed md:text-base"
                    dangerouslySetInnerHTML={{ __html: highlightTech(exp.description) }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
