"use client";

import { motion } from "framer-motion";

const HEARTS = [
  { left: "8%", top: "12%", size: 14, delay: 0, duration: 3.2 },
  { left: "85%", top: "18%", size: 10, delay: 0.6, duration: 4 },
  { left: "22%", top: "75%", size: 12, delay: 1.2, duration: 3.6 },
  { left: "70%", top: "65%", size: 16, delay: 0.3, duration: 3.8 },
  { left: "50%", top: "8%", size: 11, delay: 0.9, duration: 3.4 },
  { left: "92%", top: "50%", size: 9, delay: 1.5, duration: 4.2 },
];

export function FloatingHearts({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.slice(0, count).map((h, i) => (
        <motion.span
          key={i}
          className="absolute text-kawaii-pink/40"
          style={{ left: h.left, top: h.top, fontSize: h.size }}
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: h.duration, repeat: Infinity, ease: "easeInOut", delay: h.delay }}
        >
          &#9829;
        </motion.span>
      ))}
    </div>
  );
}

const SPARKLES = [
  { left: "15%", top: "20%", delay: 0, duration: 2.5 },
  { left: "75%", top: "10%", delay: 0.8, duration: 3 },
  { left: "45%", top: "80%", delay: 0.4, duration: 2.8 },
  { left: "90%", top: "40%", delay: 1.2, duration: 3.2 },
  { left: "5%", top: "60%", delay: 0.6, duration: 2.6 },
];

export function SparkleEffect({ count = 5 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLES.slice(0, count).map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-sm text-kawaii-peach/50"
          style={{ left: s.left, top: s.top }}
          animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          &#10022;
        </motion.span>
      ))}
    </div>
  );
}

export function WaveDivider({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block h-[40px] w-full"
        fill="currentColor"
      >
        <path d="M0,30 Q150,0 300,30 T600,30 T900,30 T1200,30 V60 H0 Z" />
      </svg>
    </div>
  );
}
