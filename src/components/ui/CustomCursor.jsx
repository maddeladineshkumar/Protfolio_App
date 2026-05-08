import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(0, springConfig);
  const cursorYSpring = useSpring(0, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    cursorXSpring.set(position.x);
    cursorYSpring.set(position.y);
  }, [position, cursorXSpring, cursorYSpring]);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-hover], [data-cursor-text]');
      if (target) {
        setIsHovering(true);
        if (target.dataset.cursorText) {
          setCursorText(target.dataset.cursorText);
        }
      }
    };
    
    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-hover], [data-cursor-text]');
      if (target) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const hasText = cursorText.length > 0;

  return (
    <>
      {/* Main dot / Text container */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center mix-blend-difference overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hasText ? 100 : (isHovering ? 60 : 12),
          height: hasText ? 100 : (isHovering ? 60 : 12),
          borderRadius: '50%',
          backgroundColor: '#fff',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: hasText ? 1 : 0, scale: hasText ? 1 : 0.5 }}
          className="text-black font-black text-sm tracking-[0.2em] pointer-events-none mix-blend-normal"
        >
          {cursorText}
        </motion.span>
      </motion.div>
      
      {/* Trailing ring (hidden when text is active) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hasText ? 120 : (isHovering ? 80 : 40),
            height: hasText ? 120 : (isHovering ? 80 : 40),
            opacity: hasText ? 0 : (isHovering ? 0.5 : 0.2),
            borderRadius: '50%',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="border border-[#00E5FF]/50"
        />
      </motion.div>
    </>
  );
};
