"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for the preloader (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center">
            {/* Name with staggered animation */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.2
                }}
              >
                <span className="font-serif text-4xl md:text-6xl text-paper tracking-tight">
                  Ntuthuko
                </span>
              </motion.div>
            </div>

            <div className="overflow-hidden -mt-1">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.35
                }}
              >
                <span className="font-serif italic text-4xl md:text-6xl text-ash tracking-tight">
                  Smith
                </span>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="mt-12 w-32 h-[1px] bg-paper/10 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1
                }}
                className="h-full bg-accent"
              />
            </div>

            {/* Edition marker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ash"
            >
              2026 Edition
            </motion.div>
          </div>

          {/* Exit wipe */}
          <motion.div
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 1 }}
            className="absolute inset-0 bg-paper"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
