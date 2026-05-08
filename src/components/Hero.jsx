import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Mail } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

// Split text into individual characters for animation
const SplitText = ({ text, className = "", delay = 0 }) => {
  const chars = text.split("");
  
  return (
    <motion.span
      className={`inline-flex ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02, delayChildren: delay } }
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block", minWidth: char === " " ? "0.3em" : "auto" }}
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transition: { 
                type: "spring", 
                damping: 12, 
                stiffness: 200 
              }
            }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Word-by-word animation
const AnimatedWords = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: { 
                type: "spring", 
                damping: 15, 
                stiffness: 150
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const Hero = () => {
  const { name, title, tagline, supportingLine } = portfolioData.hero;
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
      
      {/* Radial gradient spotlight behind name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 60%)' }}
      />

      <motion.div 
        style={{ y, opacity, scale }}
        className="w-full max-w-6xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Name - character by character with 3D rotation */}
        <div className="mb-4 overflow-hidden mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.95]"
          >
            Hi, I'm
          </motion.div>
        </div>
        
        <div className="mb-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplitText 
              text={name}
              delay={0.7}
              className="text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-[0.85] text-gradient pb-4"
            />
          </motion.div>
        </div>

        {/* Title with blur-in */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/90 tracking-tight">{title}</span>
        </motion.div>

        {/* Tagline - word by word with blur */}
        <div className="mb-5 max-w-4xl">
          <AnimatedWords 
            text={tagline}
            delay={1.5}
            className="text-xl md:text-2xl lg:text-3xl text-zinc-400 font-medium leading-relaxed"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 2.2, duration: 1 }}
          className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          {supportingLine}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 2.5 } }
          }}
        >
          <motion.div variants={{
            hidden: { opacity: 0, y: 40, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
          }}>
            <MagneticButton href="#projects">
              <motion.div
                whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(0,229,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-5 bg-[#00E5FF] text-black font-black text-lg rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,229,255,0.2)] tracking-wide"
              >
                View Projects <ArrowRight size={22} strokeWidth={3} />
              </motion.div>
            </MagneticButton>
          </motion.div>

          <motion.div variants={{
            hidden: { opacity: 0, y: 40, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
          }}>
            <MagneticButton href="#contact">
              <motion.div
                whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.06)" }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-5 bg-transparent border-2 border-white/12 text-white font-black text-lg rounded-full flex items-center gap-3 tracking-wide"
              >
                Contact Me <Mail size={22} strokeWidth={3} />
              </motion.div>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="mt-auto pb-12 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Scroll</span>
        <motion.div className="w-7 h-11 rounded-full border-2 border-zinc-700 flex justify-center pt-2.5">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-[#00E5FF] to-[#8A2BE2]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
