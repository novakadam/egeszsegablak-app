
import React from 'react';
import { motion } from 'framer-motion';

// Use only the strip image provided by the user
const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\//, "")}`;

const STRIP_IMAGE = asset("assets/szakertok-caroussel-line.jpg");
// Configuration for the 12 rows
// Significantly reduced speeds (duration ~200s)
// Alternating directions
const rows = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  direction: i % 2 === 0 ? 'left' : 'right',
  speed: 200 + (i % 3) * 30 + Math.random() * 40, // Very slow animation
}));

const AnimatedGridSection = () => {
  return (
    <section className="py-16 md:py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Text Content */}
        <div className="order-2 lg:order-1 relative z-10 text-left">
          
          {/* Updated Main Title as requested */}
          <h2 className="text-3xl md:text-5xl font-normal mb-8 leading-relaxed tracking-wide">
            Közel 70 videóból álló tanfolyami anyag vár, elismert szakértőktől.
          </h2>
          
          <div className="space-y-8 text-blue-100/90 text-lg leading-loose">
            {/* The previous text that was identical to the new title has been removed to avoid redundancy. */}
            <p>
              Csatlakozz több ezer elégedett tanulóhoz és szakértőhöz, akik már velünk tartanak az egészségmegőrzés útján.
            </p>
            <p>
              Hiteles forrásból származó tudás, gyakorlati tanácsok és érthető magyarázatok várnak minden témakörben. Fedezd fel videótárunkat és bővítsd ismereteidet kényelmesen, saját tempódban.
            </p>
          </div>
        </div>

        {/* Right Column: Animated Strip Container */}
        <div className="order-1 lg:order-2 relative h-[450px] w-full rounded-[40px] overflow-hidden bg-[#2a327a] shadow-2xl">
             {/* Inner container for rows - No gap, rows touch seamlessly */}
             <div className="absolute inset-0 flex flex-col justify-center gap-0 bg-[#343D8E]">
                {rows.map((row) => (
                    <MarqueeStrip key={row.id} settings={row} />
                ))}
             </div>
             
             {/* Vignette Overlay for depth and visual integration */}
             <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] pointer-events-none rounded-[40px] z-20" />
        </div>

      </div>
    </section>
  );
};

const MarqueeStrip = ({ settings }) => {
  // Use direction to determine start and end points for the loop
  // Left: 0% -> -50% (moves left)
  // Right: -50% -> 0% (moves right)
  const xRange = settings.direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="relative h-9 w-full flex overflow-hidden flex-shrink-0">
      <motion.div
        className="flex w-fit h-full"
        animate={{ x: xRange }}
        transition={{
          duration: settings.speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Render multiple copies to ensure seamless loop. 
            The image is a strip, so we just place them side-by-side. 
        */}
        {[1, 2, 3, 4].map((i) => (
            <div 
                key={i} 
                className="h-full flex-shrink-0"
            >
                <img 
                    src={STRIP_IMAGE} 
                    alt="" 
                    className="h-full w-auto max-w-none object-cover select-none"
                    // Adding a slight scale ensures no pixel gaps
                    style={{ transform: 'scale(1.01)' }} 
                />
            </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedGridSection;
