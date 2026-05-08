import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '../data/portfolio';
import profileImg from '../assets/profile.jpeg';
import profile2Img from '../assets/profile2.jpeg';

export const About = () => {
  const { intro, growth, vision, stats } = portfolioData.about;
  const ref = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = [profile2Img, profileImg];
  
  // Scroll Parallax for Stats
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  // 3D Tilt Effect for Image
  const x = useMotionValue(0);
  const yAxis = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(yAxis, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    yAxis.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    yAxis.set(0);
  };

  const handlePhotoClick = () => {
    setActivePhoto((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section id="about" ref={ref} className="py-32 px-4 md:px-8 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center lg:text-left"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-bold text-[#00E5FF] tracking-[0.3em] uppercase mb-4 block"
          >
            Who I Am
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-gradient">About Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
          
          {/* LEFT: 3D Profile Image */}
          <motion.div 
            className="w-full lg:w-5/12 perspective-1000"
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handlePhotoClick}
              className="relative w-full aspect-[4/5] rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl p-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-pointer"
              data-hover
              data-cursor-text="SWITCH"
            >
              {/* Glow Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/20 to-[#8A2BE2]/20 rounded-[2.5rem] blur-2xl -z-10 translate-z-[-50px]" />
              
              {/* Click hint label */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase pointer-events-none"
                style={{ transform: "translateZ(60px) translateX(-50%)" }}
              >
                Click to switch
              </motion.div>

              {/* Image Container with AnimatePresence for swap */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative" style={{ transform: "translateZ(30px)" }}>
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60 z-10" />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={photos[activePhoto]}
                    alt="M Dinesh Kumar"
                    className="w-full h-full object-cover absolute inset-0"
                    style={
                      activePhoto === 0
                        ? { objectPosition: "center 20%", scale: 1.25, transformOrigin: "center 20%" }
                        : { objectPosition: "center 15%", scale: 1.15, transformOrigin: "center 15%" }
                    }
                    initial={{ clipPath: "inset(100% 0% 0% 0%)", filter: "brightness(1.5) saturate(0)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", filter: "brightness(1) saturate(1)" }}
                    exit={{ clipPath: "inset(0% 0% 100% 0%)", filter: "brightness(1.5) saturate(0)" }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  />
                </AnimatePresence>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF] rounded-tl-xl" style={{ transform: "translateZ(50px)" }} />
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#8A2BE2] rounded-br-xl" style={{ transform: "translateZ(50px)" }} />

              {/* Photo dots indicator */}
              <div className="absolute bottom-6 left-1/2 flex gap-2 z-30" style={{ transform: "translateZ(60px) translateX(-50%)" }}>
                {photos.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      width: i === activePhoto ? 20 : 6,
                      backgroundColor: i === activePhoto ? "#00E5FF" : "rgba(255,255,255,0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Text Content + Stats Grid */}
          <div className="w-full lg:w-7/12 space-y-12">
            
            {/* Paragraphs */}
            <div className="space-y-8">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-white/95 text-2xl md:text-3xl font-semibold leading-snug tracking-tight"
              >
                {intro}
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-zinc-400 text-lg md:text-xl leading-relaxed"
              >
                {growth}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl relative overflow-hidden group animated-border"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <p className="italic text-white/85 text-xl font-medium leading-relaxed relative z-10">"{vision}"</p>
              </motion.div>
            </div>

            {/* Stats Unified Panel */}
            <motion.div 
              style={{ y }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="mt-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-[2rem] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-[#8A2BE2]/5 opacity-50 pointer-events-none" />
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-6 xl:p-8 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] transition-colors duration-500 border-white/[0.05]
                      ${index === 0 ? 'border-b border-r md:border-b-0' : ''}
                      ${index === 1 ? 'border-b md:border-b-0 md:border-r' : ''}
                      ${index === 2 ? 'border-r' : ''}
                    `}
                  >
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2 group-hover:text-[#00E5FF] transition-colors duration-300">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
