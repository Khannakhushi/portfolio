'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react';
import MediumIcon from '@/components/medium-icon';

export default function Footer() {
  const socials = [
    {
      href: 'mailto:khannakhyaati@gmail.com',
      icon: Mail,
      label: 'Email',
    },
    {
      href: 'https://github.com/Khannakhushi',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/khyaati-khanna/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'https://medium.com/@khannakhushi93',
      icon: MediumIcon,
      label: 'Medium',
    },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden py-24 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center gap-6"
        >
          <h2 className="text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
            Let&apos;s Connect.
          </h2>
          <p className="max-w-lg text-lg text-muted-foreground">
            I&apos;m always open to new opportunities and interesting conversations.
          </p>
          
          <a 
            href="https://www.linkedin.com/in/khyaati-khanna/"
            target="_blank"
            rel="noopener noreferrer" 
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-4 text-lg font-medium text-background transition-transform hover:scale-105"
          >
            <span>Say Hello</span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{social.label}</span>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Khyaati Khanna.</p>
          <p className="flex items-center gap-1">
            Designed & Built with <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
