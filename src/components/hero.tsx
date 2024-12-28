import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
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
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds
    return () => clearInterval(interval);
  }, [texts.length]);

  const handleEasterEgg = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 7000); // Hide after 5 seconds
  };

  const variants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.8 },
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative">
        {/* Profile Picture */}
        <Image
          src="/me.jpeg"
          alt="Khyaati Khanna profile picture"
          width={350}
          height={350}
          className="mb-4 aspect-square animate-pulse rounded-full object-cover shadow-lg"
        />

        {/* Wall Burst Easter Egg */}
        {showEasterEgg && (
          <Image
            src="/wall burst.png"
            alt="Wall Burst Effect"
            width={900}
            height={900}
            className="absolute top-0 left-0 z-10 rounded-full"
          />
        )}
      </div>
      
      {/* Name with Easter Egg Trigger */}
      <h1
        className="mb-4 text-center font-calligraphy text-7xl font-bold cursor-pointer"
        onClick={handleEasterEgg}
      >
        Khyaati Khanna
      </h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.7 }}
          className="font-playfair relative text-center text-3xl"
        >
          {texts[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default Hero;
