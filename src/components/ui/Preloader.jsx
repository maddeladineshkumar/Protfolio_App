import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Fast counter, slows down slightly at the end
      const increment = Math.random() * 5 + 2;
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800); // Wait a moment at 100% before sliding out
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100000] bg-[#020205] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 noise pointer-events-none opacity-30" />
      
      <div className="flex flex-col items-center z-10 w-full max-w-sm px-8">
        <div className="flex items-end justify-between w-full mb-4">
          <span className="text-sm font-bold text-zinc-500 tracking-[0.3em] uppercase">Loading System</span>
          <span className="text-6xl md:text-8xl font-black text-white">{progress}<span className="text-3xl text-[#00E5FF]">%</span></span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/[0.05] relative overflow-hidden rounded-full">
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
