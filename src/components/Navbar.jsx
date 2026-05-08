import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    setHidden(latest > prev && latest > 200);
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center py-5 px-4 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            data-hover
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="relative px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors rounded-full group"
          >
            <span className="relative z-10">{link.label}</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100"
              layoutId="navHover"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};
