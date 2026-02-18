"use client";

import { motion } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gm-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 2.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {/* パレット風の色の滲み */}
      <div className="absolute h-[40vmin] w-[40vmin] -translate-x-[15vmin] -translate-y-[10vmin] rounded-full bg-gm-indigo/[0.07] blur-[80px]" />
      <div className="absolute h-[30vmin] w-[30vmin] translate-x-[12vmin] translate-y-[8vmin] rounded-full bg-gm-rose/[0.06] blur-[80px]" />
      <div className="absolute h-[25vmin] w-[25vmin] -translate-y-[15vmin] translate-x-[5vmin] rounded-full bg-gm-sage/[0.05] blur-[70px]" />

      {/* タイトル */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tighter"
      >
        <span className="text-gm-text">Galaxy</span>
        <span className="text-gm-indigo">Mind</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-4 text-sm tracking-[0.3em] text-gm-text-muted md:text-base"
      >
        模索する、すべてのひとへ。
      </motion.p>
    </motion.div>
  );
}
