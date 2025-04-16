'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="font-playfair px-4 py-6 text-center opacity-80">
      <motion.p
        className="flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        &copy; {new Date().getFullYear()} Made with <Heart className="text-red-500" size={16} /> by
        Khyaati
      </motion.p>
    </footer>
  );
}
