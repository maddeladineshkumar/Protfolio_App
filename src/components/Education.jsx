import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { GraduationCap, Award } from 'lucide-react';

export const Education = () => {
  const { institution, degree, status, focus } = portfolioData.education;

  return (
    <section id="education" className="py-32 px-4 md:px-8 relative z-10">
      <div className="section-divider mb-32" />
      <div className="w-full max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-[2rem] p-10 md:p-16 relative overflow-hidden group"
        >
          {/* Animated top border */}
          <motion.div 
            className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF]"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Background watermark */}
          <motion.div 
            className="absolute -right-16 -bottom-16 text-white pointer-events-none select-none"
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 0.02, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <GraduationCap size={400} />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="flex-shrink-0 p-7 rounded-3xl bg-white/[0.03] border border-white/[0.06]"
            >
              <GraduationCap size={56} className="text-[#8A2BE2]" style={{ filter: "drop-shadow(0 0 15px rgba(138,43,226,0.4))" }} />
            </motion.div>

            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mb-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20 text-sm font-black tracking-wider uppercase"
              >
                <Award size={18} />
                {status}
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight"
              >
                {degree}
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl text-zinc-400 mb-10 font-semibold"
              >
                {institution}
              </motion.h3>

              <div className="flex flex-wrap gap-4">
                {focus.map((item, idx) => (
                  <motion.span 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + idx * 0.08 }}
                    whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                    data-hover
                    className="px-6 py-3 rounded-2xl bg-white/[0.03] text-base font-bold text-white/90 border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
