'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import React, { useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(251, 146, 60, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="container relative z-10 flex flex-col items-center gap-12 md:flex-row md:justify-between">
        {/* Text Content */}
        <motion.div style={{ y: y1 }} className="flex flex-1 flex-col items-start text-left">
          <motion.h1
            className="font-great-vibes mt-16 text-6xl font-light tracking-wide text-foreground md:mt-6 md:text-8xl lg:text-9xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Khyaati <br />
            <span className="text-orange-500">Khanna</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Building digital experiences that blend{' '}
            <span className="font-semibold text-foreground">engineering precision</span> with{' '}
            <span className="font-semibold text-foreground">creative soul</span>. A Software
            Engineer passionate about creating intuitive and impactful applications.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/Khanna_Resume.pdf" target="_blank" rel="noopener noreferrer" passHref>
              <Button variant="default" size="lg">
                Resume <Download className="h-4 w-4" />
              </Button>
            </Link>

            <a href="#contact">
              <div className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-tr from-amber-500 to-rose-600 p-0.5 font-medium text-white shadow-lg transition-all hover:shadow-xl">
                <span className="relative flex h-full w-full items-center justify-center rounded-full bg-background px-8 py-3 text-lg font-medium text-foreground transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
                  Contact Me
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Visual/Image */}
        <motion.div style={{ y: y2 }} className="relative flex flex-1 items-center justify-center">
          <div className="relative h-[400px] w-[300px] md:h-[500px] md:w-[400px]">
            {/* Decorative elements behind */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed border-orange-500/20 opacity-50"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-12 rounded-full border border-dashed border-rose-500/20 opacity-30"
            />

            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-white/0 p-2 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 hover:rotate-1">
              <div className="absolute inset-0 bg-linear-to-tr from-orange-500/10 via-transparent to-rose-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-900">
                <Image
                  src="/me.jpeg"
                  alt="Khyaati Khanna"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 rounded-full bg-orange-500" />
                    <span className="text-xs font-medium uppercase tracking-widest text-orange-500">
                      Developer
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">Previously @Amazon, @JPMorganChase</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="h-10 w-px bg-linear-to-b from-transparent via-orange-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
