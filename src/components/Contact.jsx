import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const MagneticLink = ({ href, children, className = "" }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-hover
      whileHover={{ y: -6, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.06] transition-colors duration-300 block ${className}`}
    >
      {children}
    </motion.a>
  );
};

export const Contact = () => {
  const { email, github, linkedin, instagram } = portfolioData.contact;
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden z-10">
      <div className="section-divider mb-32" />
      
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-bold text-[#00E5FF] tracking-[0.3em] uppercase mb-6 block"
          >
            Get In Touch
          </motion.span>
          
          <h2 className="text-7xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.85] mb-10">
            Let's Build<br />
            <span className="text-gradient">Something.</span>
          </h2>
          
          <motion.a 
            href={`mailto:${email}`}
            data-hover
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-5 text-3xl md:text-5xl font-bold text-zinc-400 hover:text-white transition-colors group"
          >
            {email}
            <ArrowUpRight className="text-[#00E5FF] group-hover:rotate-45 transition-transform duration-300" size={48} />
          </motion.a>
        </motion.div>

        {/* Footer row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="border-t border-white/[0.06] pt-10 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="text-center md:text-left">
            <span className="font-black text-2xl text-white tracking-tight block">M Dinesh Kumar</span>
            <span className="text-sm text-zinc-500 font-semibold mt-1 block">AI & Data Science Student</span>
          </div>

          <div className="flex gap-5">
            <MagneticLink href={github}>
              <GithubIcon size={24} className="text-white" />
            </MagneticLink>
            <MagneticLink href={linkedin}>
              <LinkedinIcon size={24} className="text-[#00E5FF]" />
            </MagneticLink>
            <MagneticLink href={instagram}>
              <InstagramIcon size={24} className="text-white" />
            </MagneticLink>
          </div>

          <div className="text-sm font-semibold text-zinc-600">
            &copy; {currentYear}. Designed & Built with logic.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
