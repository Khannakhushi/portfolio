'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react';
import MediumIcon from '@/components/medium-icon';

export default function Footer() {
  const socials = [
    { href: 'mailto:khannakhyaati@gmail.com', icon: Mail, label: 'Email' },
    { href: 'https://github.com/Khannakhushi', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/khyaati-khanna/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://medium.com/@khannakhushi93', icon: MediumIcon, label: 'Medium' },
  ];

  return (
    <footer id="contact" className="relative py-20">
      <div className="container mx-auto max-w-5xl px-5 sm:px-6">
        {/* Section header */}
        <motion.div
          className="border-border mb-10 border-b pb-6 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-number text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
            03
          </span>
          <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            Let&apos;s Connect
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 sm:gap-16 md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              I&apos;m always open to interesting conversations, collaboration opportunities, and
              new challenges. Let&apos;s build something great together.
            </p>

            <a
              href="https://www.linkedin.com/in/khyaati-khanna/"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-foreground mt-8 inline-flex items-center gap-3 transition-opacity hover:opacity-70"
            >
              <span className="text-2xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
                Say hello
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-4">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group text-muted-foreground hover:text-foreground flex items-center gap-3 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{social.label}</span>
                  <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                    &rarr;
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-border text-muted-foreground mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:mt-32 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Khyaati Khanna</p>
          <p className="flex items-center gap-1.5">
            Built with love{' '}
            <Heart className="h-3.5 w-3.5 animate-pulse fill-red-500 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
