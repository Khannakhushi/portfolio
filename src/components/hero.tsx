'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import { ArrowDown, Download } from 'lucide-react';
import Link from 'next/link';
import HeroBg from '@/components/hero-bg';

function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Animated particle background */}
      <HeroBg />

      <div className="relative z-10 container mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-32">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex flex-col">
            <motion.div
              className="mb-6 flex items-center gap-4 sm:mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="h-px w-8 sm:w-12" style={{ backgroundColor: 'hsl(var(--warm))' }} />
              <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase sm:text-sm">
                Software Engineer
              </span>
            </motion.div>

            <motion.h1
              className="text-foreground font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: 'var(--font-serif)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Khyaati
              <br />
              <span className="italic" style={{ color: 'hsl(var(--warm))' }}>
                Khanna
              </span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed sm:mt-8 sm:text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Software Engineer at JPMorgan Chase & Co. building scalable financial technology.
              Previously at Amazon and USAA. Passionate about crafting systems that are as elegant
              as they are robust.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/Khanna_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-foreground bg-foreground text-background hover:text-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-transparent sm:px-6 sm:py-3"
              >
                Resume
                <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>

              <a
                href="#contact"
                className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
              >
                Get in touch
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </motion.div>
          </div>

          {/* Image — visible on md+ (tablet and up) */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[380px] w-[280px] lg:h-[520px] lg:w-[380px]">
              {/* Frame accent */}
              <div
                className="absolute -right-2 -bottom-2 h-full w-full rounded-2xl lg:-right-3 lg:-bottom-3"
                style={{ border: '1px solid hsl(var(--warm) / 0.3)' }}
              />
              <div className="bg-muted relative h-full w-full overflow-hidden rounded-2xl">
                <Image src="/me.jpeg" alt="Khyaati Khanna" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Image — mobile only, smaller centered version */}
          <motion.div
            className="relative md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative h-[280px] w-[200px]">
              <div
                className="absolute -right-2 -bottom-2 h-full w-full rounded-xl"
                style={{ border: '1px solid hsl(var(--warm) / 0.2)' }}
              />
              <div className="bg-muted relative h-full w-full overflow-hidden rounded-xl">
                <Image src="/me.jpeg" alt="Khyaati Khanna" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        <ArrowDown className="text-muted-foreground h-4 w-4" />
      </motion.div>
    </section>
  );
}

export default Hero;
