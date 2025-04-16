'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import MediumIcon from '@/components/medium-icon';
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="flex flex-col items-center gap-10 md:flex-row md:items-stretch"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Left Column: Title and Description */}
          <div className="flex w-full flex-col space-y-6 md:w-1/2">
            <h2 className="text-4xl font-bold md:text-5xl">
              Get in{' '}
              <span className="relative">
                Touch
                <motion.div
                  className="absolute -bottom-1 left-0 h-1 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>

            <p className="max-w-md text-lg opacity-80">
              I&apos;m always open to new opportunities, collaborations, and interesting
              conversations. Feel free to reach out!
            </p>

            <motion.div
              className="relative mt-8 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/5" />
              <div className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-primary/10" />
              <motion.div
                className="absolute right-10 top-10 h-10 w-10 rounded-full bg-primary/20"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Right Column: Connect Cards */}
          <div className="flex w-full flex-col space-y-4 md:w-1/2">
            {[
              {
                href: 'https://github.com/Khannakhushi',
                icon: <Github className="h-6 w-6 text-white dark:text-black" />,
                label: 'GitHub',
                username: 'Khannakhushi',
                color: 'bg-black dark:bg-white',
              },
              {
                href: 'https://www.linkedin.com/in/khyaati-khanna/',
                icon: <Linkedin className="h-6 w-6 text-white dark:text-black" />,
                label: 'LinkedIn',
                username: 'khyaati-khanna',
                color: 'bg-black dark:bg-white',
              },
              {
                href: 'https://medium.com/@khannakhushi93',
                icon: <MediumIcon className="h-6 w-6 text-black dark:text-white" />,
                label: 'Medium',
                username: '@khannakhushi93',
                color: 'bg-black dark:bg-white',
              },
              {
                href: 'https://mail.google.com/mail/?view=cm&fs=1&to=khannakhyaati@gmail.com',
                icon: <Mail className="h-6 w-6 text-white dark:text-black" />,
                label: 'Email',
                username: 'khannakhyaati@gmail.com',
                color: 'bg-black dark:bg-white',
              },
            ].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="block w-full"
                >
                  <motion.div
                    className="flex items-center rounded-xl border border-primary/10 bg-card p-4 shadow-sm"
                    whileHover={{ x: 5, backgroundColor: 'hsl(var(--primary)/0.05)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`${link.color} mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white`}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-medium">{link.label}</p>
                      <p className="text-sm opacity-60">{link.username}</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 opacity-50" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
