import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const SkillCard = ({ skillGroup, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onMouseMove={handleMouse}
      data-hover
      className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden group animated-border"
    >
      {/* Animated spotlight on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 229, 255, 0.06),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Top accent line */}
      <motion.div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2]"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      />

      <h3 className="text-2xl font-black mb-8 text-white tracking-tight relative z-10">{skillGroup.category}</h3>
      
      <div className="flex-1 flex flex-col gap-3 relative z-10">
        {skillGroup.items.map((item, itemIdx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={itemIdx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4 + index * 0.12 + itemIdx * 0.08 
              }}
              whileHover={{ x: 8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="p-3 bg-white/[0.04] rounded-xl text-[#00E5FF]" style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.3))" }}>
                <Icon size={22} />
              </div>
              <span className="font-bold text-zinc-300 text-base">{item.name}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-32 px-4 md:px-8 relative z-10">
      <div className="section-divider mb-32" />
      <div className="w-full max-w-6xl mx-auto relative">
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
            What I Work With
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.skills.map((skillGroup, groupIdx) => (
            <SkillCard key={groupIdx} skillGroup={skillGroup} index={groupIdx} />
          ))}
        </div>
      </div>
    </section>
  );
};
