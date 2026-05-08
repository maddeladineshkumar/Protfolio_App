import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', href, onClick, className = '' }) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-full overflow-hidden group border-2";
  
  const variants = {
    primary: "bg-[#00E5FF] border-[#00E5FF] text-black hover:scale-105 hover:shadow-[0_0_20px_#00E5FF]",
    outline: "bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/50"
  };

  const Element = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Element
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Element>
  );
};
