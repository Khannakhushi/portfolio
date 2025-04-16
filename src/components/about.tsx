import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  StickyNote,
  GraduationCap,
  Briefcase,
  Code,
  Globe,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

// Custom CSS for scrollbar
const scrollbarStyles = `
  .subtle-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  .subtle-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .subtle-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.3);
    border-radius: 20px;
    border: 2px solid rgba(0, 0, 0, 0);
  }
  .subtle-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(100, 100, 100, 0.5);
  }
  /* Firefox */
  .subtle-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 100, 100, 0.3) transparent;
  }
`;

// Animated underline component
const AnimatedUnderline = () => (
  <motion.div
    className="mt-2 h-[2px] w-16 rounded-full bg-primary"
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: 48, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
  />
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    'C++',
    'Java',
    'Javascript',
    'Spring Boot',
    'Node.js',
    'AngularJS',
    'React',
    'Next.js',
    'TailwindCSS',
    'CI/CD',
    'Git',
  ];

  const categories = [
    { name: 'Languages', items: ['C++', 'Java', 'Javascript', 'TypeScript', 'Swift', 'Python'] },
    { name: 'Frontend', items: ['React', 'Next.js', 'AngularJS', 'TailwindCSS'] },
    { name: 'Backend', items: ['Spring Boot', 'Node.js', 'Express', 'FastAPI', 'AWS'] },
    { name: 'Tools', items: ['Git', 'CI/CD', 'Docker'] },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { current } = containerRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <style jsx global>
        {scrollbarStyles}
      </style>

      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h2>
        <p className="mx-auto max-w-xl text-lg opacity-70">
          My background, education, and technical skills
        </p>
      </motion.div>

      <div className="relative">
        {/* Scroll Controls */}
        <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 transform md:block">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-card shadow-md transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5 rotate-180 transform" />
          </button>
        </div>
        <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 transform md:block">
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-card shadow-md transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          ref={containerRef}
          className="subtle-scrollbar flex snap-x snap-mandatory space-x-8 overflow-x-auto pb-8 pt-4"
        >
          {/* Panel 1: Intro & Photo */}
          <div className="flex min-w-[90vw] snap-center flex-col gap-8 rounded-2xl border border-primary/10 bg-card/30 p-8 shadow-lg backdrop-blur-sm md:min-w-[600px] md:flex-row">
            <motion.div
              className="relative aspect-square w-full md:aspect-auto md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/me2.jpeg"
                  alt="Khyaati Khanna"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              </div>
            </motion.div>

            <div className="flex w-full flex-col justify-center md:w-1/2">
              <motion.h1
                className="mb-4 text-3xl font-bold md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hello, I'm Khyaati
              </motion.h1>
              <motion.p
                className="mb-6 max-w-2xl text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                I'm a passionate software engineer and a junior at the University of Houston,
                majoring in Computer Science with a minor in Mathematics. Set to graduate in
                December 2025, I'm on a journey to become a versatile software engineer with a focus
                on full-stack development.
              </motion.p>

              <Link
                href="/Khanna_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-fit overflow-hidden rounded-full border-2 border-transparent p-[0.175rem] text-primary shadow-lg transition-all duration-500 hover:shadow-md"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-white opacity-80"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="relative z-10 flex h-10 items-center justify-center gap-2 rounded-full bg-card px-6 font-medium">
                  <StickyNote className="h-4 w-4" />
                  <span>View My Resume</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>

          {/* Panel 2: Education & Experience */}
          <div className="min-w-[90vw] snap-center rounded-2xl border border-primary/10 bg-card/30 p-8 shadow-lg backdrop-blur-sm md:min-w-[500px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="flex items-center text-xl font-bold">
                <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                Education & Experience
              </h3>
              <AnimatedUnderline />
            </motion.div>

            <div className="mt-6 space-y-6">
              {[
                {
                  icon: <GraduationCap className="h-5 w-5" />,
                  title: 'University of Houston',
                  subtitle: 'Class of 2025',
                  description:
                    'Major in Computer Science with minors in Business Administration and Mathematics',
                },
                {
                  icon: <Briefcase className="h-5 w-5" />,
                  title: 'Software Engineer Intern at USAA',
                  subtitle: 'Summer 2024',
                  description:
                    'Led migration of applications to Spring Boot and improved UI with AngularJS',
                },
                {
                  icon: <Code className="h-5 w-5" />,
                  title: 'Teaching Assistant',
                  subtitle: 'University of Houston - CS Department',
                  description: 'Conducted weekly labs for 100+ students in Data Structures',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm opacity-70">{item.subtitle}</p>
                    <p className="mt-1 text-sm opacity-80">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Panel 3: Skills */}
          <div className="min-w-[90vw] snap-center rounded-2xl border border-primary/10 bg-card/30 p-8 shadow-lg backdrop-blur-sm md:min-w-[500px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="flex items-center text-xl font-bold">
                <Code className="mr-2 h-5 w-5 text-primary" />
                Technical Skills
              </h3>
              <AnimatedUnderline />
            </motion.div>

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              {categories.map((category, idx) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="mb-3 text-base font-medium opacity-80">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-primary/5 px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 rounded-lg border border-primary/10 bg-primary/5 p-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm italic opacity-80">
                &quot;I am constantly exploring new technologies and frameworks to expand my
                skillset and stay at the cutting edge of software development.&quot;
              </p>
            </motion.div>
          </div>

          {/* Panel 4: Interests */}
          <div className="min-w-[90vw] snap-center rounded-2xl border border-primary/10 bg-card/30 p-8 shadow-lg backdrop-blur-sm md:min-w-[500px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="flex items-center text-xl font-bold">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Beyond Coding
              </h3>
              <AnimatedUnderline />
            </motion.div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: 'Technology',
                  items: ['AI/ML', 'Web Development', 'Cloud Computing', 'Mobile Development'],
                },
                {
                  title: 'Interests',
                  items: ['Art & Design', 'Music', 'Travel', 'Watching Movies'],
                },
              ].map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-primary/5 p-5"
                >
                  <h4 className="mb-3 text-base font-medium">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-primary/60"></div>
                        <span className="text-sm opacity-80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 rounded-xl bg-primary/5 p-5"
            >
              <h4 className="mb-3 flex items-center text-base font-medium">
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs">
                  <Globe className="h-3 w-3" />
                </span>
                Currently Working On
              </h4>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-primary/60"></div>
                    <span className="font-medium">Synkly</span>
                  </div>
                  <p className="mt-1 pl-4 text-xs opacity-80">
                    Cross-Platform Playlist Synchronization and Music Discovery App
                  </p>
                </li>
                <li>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-primary/60"></div>
                    <span className="font-medium">DevMatch</span>
                  </div>
                  <p className="mt-1 pl-4 text-xs opacity-80">
                    Tinder-style swipe website to match developers with their perfect dev tools
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-6 flex justify-center md:hidden">
          <p className="text-xs opacity-60">Swipe to explore more →</p>
        </div>
      </div>
    </section>
  );
}
