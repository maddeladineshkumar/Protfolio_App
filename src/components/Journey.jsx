import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

export const Journey = () => {
  return (
    <section id="journey" className="py-32 px-4 md:px-8 relative z-10">
      <div className="section-divider mb-32" />
      <div className="w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-bold text-[#8A2BE2] tracking-[0.3em] uppercase mb-4 block"
          >
            My Path
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            The <span className="text-gradient">Trajectory</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* The glowing timeline line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00E5FF] via-[#8A2BE2] to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
          />
          
          {portfolioData.journey.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                className={`relative mb-16 last:mb-0 pl-16 md:pl-0 w-full md:w-1/2 ${
                  isEven ? 'md:pr-16 md:left-0 md:text-right' : 'md:pl-16 md:left-1/2'
                }`}
              >
                {/* Timeline Node with pulse */}
                <div className={`absolute top-2 left-4 md:left-auto w-5 h-5 rounded-full ${
                  isEven ? 'md:-right-[10px]' : 'md:-left-[10px]'
                }`}>
                  <div className="w-full h-full rounded-full bg-[#050505] border-[3px] border-[#00E5FF]" />
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="absolute inset-0 rounded-full bg-[#00E5FF]/30"
                  />
                </div>

                <motion.div 
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8 hover:border-white/[0.12] transition-colors duration-500"
                >
                  <span className="inline-block px-4 py-2 mb-5 text-xs font-black tracking-widest text-black bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] rounded-full">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-black mb-3 text-white tracking-tight">{item.title}</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
