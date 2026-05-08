import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
);

const ProjectCard = ({ project, onClick, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      onMouseMove={handleMouse}
      onClick={onClick}
      data-hover
      data-cursor-text="VIEW"
      className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-10 md:p-12 cursor-pointer relative group h-full flex flex-col overflow-hidden animated-border"
    >
      {/* Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 229, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Animated top border */}
      <motion.div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2]"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Project number */}
        <motion.span 
          className="text-[8rem] md:text-[10rem] font-black text-white/[0.02] absolute -top-8 -right-4 leading-none select-none pointer-events-none"
        >
          0{index + 1}
        </motion.span>

        <div className="flex justify-between items-start mb-10">
          <h3 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00E5FF] group-hover:to-[#8A2BE2] transition-all duration-500">
            {project.title}
          </h3>
          <motion.div 
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]/30 transition-all duration-500"
            whileHover={{ rotate: 45 }}
          >
            <ArrowUpRight className="text-zinc-500 group-hover:text-[#00E5FF] transition-colors duration-300" size={28} />
          </motion.div>
        </div>

        <p className="text-xl md:text-2xl text-zinc-400 mb-12 font-medium leading-relaxed flex-1">
          {project.tagline}
        </p>
        
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, idx) => (
            <motion.span 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.15 + idx * 0.05 }}
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-[#00E5FF]/[0.06] text-[#00E5FF] border border-[#00E5FF]/15"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-32 px-4 md:px-8 relative z-10">
      <div className="section-divider mb-32" />
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-bold text-[#00E5FF] tracking-[0.3em] uppercase mb-4 block"
          >
            Selected Work
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={idx}
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
            style={{ cursor: "auto" }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 md:p-14 relative rounded-3xl shadow-[0_0_100px_rgba(0,229,255,0.08)]"
              style={{ cursor: "auto" }}
            >
              <motion.button 
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
                style={{ cursor: "pointer" }}
              >
                <X size={28} />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">{selectedProject.title}</h2>
                <p className="text-2xl md:text-3xl text-[#00E5FF] font-semibold mb-14">{selectedProject.tagline}</p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6">Problem & Solution</h3>
                  <p className="text-zinc-400 text-xl leading-relaxed mb-12">
                    {selectedProject.description}
                  </p>
                  
                  <h3 className="text-3xl font-bold text-white mb-8">Key Features</h3>
                  <ul className="space-y-5">
                    {selectedProject.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex items-center gap-5 text-zinc-300 text-xl font-medium"
                      >
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] shadow-[0_0_12px_#00E5FF] flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="space-y-10 bg-white/[0.03] p-10 rounded-3xl border border-white/[0.06] h-fit"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-base font-bold text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Links</h3>
                    <div className="flex flex-col gap-4">
                      <motion.a
                        href={selectedProject.links.github}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 px-6 rounded-2xl bg-transparent border-2 border-white/15 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                        style={{ cursor: "pointer" }}
                      >
                        <GithubIcon size={22} /> View Source
                      </motion.a>
                      <motion.a
                        href={selectedProject.links.live}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,229,255,0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 px-6 rounded-2xl bg-[#00E5FF] text-black font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                        style={{ cursor: "pointer" }}
                      >
                        <ExternalLink size={22} /> Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
