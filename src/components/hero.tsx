import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

function Hero() {
  const texts = [
    'Software Engineer',
    'Designer',
    'Computer Science Student',
    'Artist',
    'Music Enthusiast',
  ];
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts.length]);

  const handleEasterEgg = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 5000); // Hide after 5 seconds
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  const imageVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    hover: { scale: 1.05, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  // Parallax effect for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || !isHovering) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate position between -15 and 15
      const moveX = (clientX / innerWidth - 0.5) * 20;
      const moveY = (clientY / innerHeight - 0.5) * 20;

      // Apply transform
      imageRef.current.style.transform = `perspective(1000px) rotateX(${moveY * -0.5}deg) rotateY(${moveX}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center overflow-hidden py-16 md:py-20">
      <motion.div
        className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Text Content */}
        <div className="order-2 flex flex-col items-center space-y-6 md:order-1 md:items-start">
          <motion.h2
            className="text-center text-xl font-light tracking-wider md:text-left md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hello, I&apos;m
          </motion.h2>

          <motion.h1
            className="cursor-pointer text-center font-calligraphy text-5xl font-bold md:text-left md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={handleEasterEgg}
          >
            Khyaati Khanna
          </motion.h1>

          <div className="flex h-12 items-center justify-center md:justify-start">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="font-playfair text-xl md:text-2xl"
              >
                {texts[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className="max-w-md text-center text-lg opacity-80 md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            A passionate software engineer and computer science student at the University of
            Houston, crafting digital experiences with creativity and precision.
          </motion.p>

          <motion.div
            className="flex space-x-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
              href="#projects"
              className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="rounded-full border border-primary bg-transparent px-6 py-3 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>

        {/* Image */}
        <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
          {/* Outer decorative border */}
          <div className="relative max-w-full rounded-2xl p-2">
            <div className="absolute inset-0 rounded-2xl border-[2px] border-black/70 dark:border-white/70"></div>
            <motion.div
              ref={imageRef}
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={imageVariants}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                if (imageRef.current) {
                  imageRef.current.style.transform = '';
                }
              }}
              className="relative max-w-full overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Easter Egg - inside the image container */}
              <AnimatePresence>
                {showEasterEgg && (
                  <motion.div
                    className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src="/wall burst.png"
                      alt="Easter Egg"
                      width={600}
                      height={600}
                      className="h-[110%] w-[110%] object-contain"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Image
                src="/me.jpeg"
                alt="Khyaati Khanna"
                width={500}
                height={500}
                className="h-80 w-80 object-cover md:h-96 md:w-96"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
