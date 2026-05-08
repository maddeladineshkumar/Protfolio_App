import { useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { AuroraBackground } from './components/ui/ParticleField';
import { Preloader } from './components/ui/Preloader';
import { Marquee } from './components/ui/Marquee';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(() => {
    // Show preloader on normal load or refresh, but NOT when navigating back
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type === "back_forward") {
      return false;
    }
    return true;
  });

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <div className="bg-[#020205] min-h-screen text-white font-sans relative noise">
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Floating Navbar */}
      <Navbar />
      
      {/* The entire page is relative so the canvas can stretch behind it */}
      <div className="relative">
        {/* Aurora + Stars + Shooting Stars Canvas Background */}
        <AuroraBackground />

        <main className="relative z-10">
          <Hero />
          
          <Marquee 
            textItems={[
              "AI & DATA SCIENCE",
              "SYSTEMS ARCHITECTURE",
              "UI/UX DESIGN",
              "FULL STACK DEVELOPMENT",
              "MACHINE LEARNING",
              "PROBLEM SOLVING"
            ]} 
          />

          <About />
          <Skills />
          <Projects />
          <Journey />
          <Education />
        </main>
        
        <div className="relative z-10">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
