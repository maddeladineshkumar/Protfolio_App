export const Marquee = ({ textItems }) => {
  return (
    <div className="w-full overflow-hidden py-8 bg-[#020205]/40 backdrop-blur-xl border-y border-white/[0.03] relative z-10 flex select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* We render the text items twice to create the infinite seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-10 px-5">
            {textItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-10">
                <span className="text-xl md:text-3xl font-black text-white/[0.05] tracking-[0.2em] uppercase transition-colors duration-500 hover:text-[#00E5FF]/40 cursor-default">
                  {item}
                </span>
                <span className="text-[#8A2BE2]/30 text-xl md:text-2xl">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
