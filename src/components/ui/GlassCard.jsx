import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hoverTilt = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card p-6 md:p-8 relative group overflow-hidden ${className}`}
      whileHover={hoverTilt ? { y: -5 } : {}}
    >
      {/* Subtle radial glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
