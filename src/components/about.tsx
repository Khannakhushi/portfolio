import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StickyNote, GraduationCap, Briefcase, Code, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function About() {
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

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="">
            <Card className="border-primary">
              <CardContent className="flex flex-col gap-6 p-6 md:flex-row">
                <Image
                  src="/me2.jpeg"
                  alt="Khyaati Khanna"
                  className="mx-auto rounded-lg object-cover shadow-lg"
                  width={300}
                  height={200}
                />
                <div className="font-playfair text-lg">
                  <h3 className="mb-4 text-2xl font-semibold">Hello, I&apos;m Khyaati Khanna</h3>
                  <p className="mb-4">
                    I&apos;m a passionate software engineer and a junior at the University of
                    Houston, pursuing a major in Computer Science with minors in Business
                    Administration and Mathematics. Set to graduate in December 2025, I&apos;m on a
                    journey to become a versatile full-stack developer.
                  </p>
                  <div className="mb-4 flex items-center">
                    <GraduationCap className="mr-2" />
                    <span>University of Houston, Class of 2025</span>
                  </div>
                  <div className="mb-4 flex items-center">
                    <Briefcase className="mr-2" />
                    <span>Software Engineer Intern at USAA (Summer 2024)</span>
                  </div>
                  <div className="mb-4 flex items-center">
                    <Code className="mr-2" />
                    <span>Full-Stack Development Enthusiast</span>
                  </div>
                  <div className="mb-6 flex items-center">
                    <Globe className="mr-2" />
                    <span>Technology Explorer & Outdoor Enthusiast</span>
                  </div>
                  <div className="mb-6">
                    <h4 className="mb-2 text-lg font-semibold">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/Khanna_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" relative ml-0 block max-w-[200px] transform-gpu cursor-pointer overflow-hidden rounded-full border-2 border-transparent p-[0.175rem] text-center text-sm font-semibold leading-6 text-primary shadow-2xl shadow-secondary transition-all duration-500 hover:shadow-md"
                  >
                    <motion.div
                      className="absolute inset-0 h-10 rounded-full bg-secondary-foreground opacity-90 hover:opacity-100"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                        times: [0, 1],
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center rounded-full bg-secondary px-8 h-10">
                      <StickyNote className="mr-1 h-4 w-4" />
                      My Resume
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
