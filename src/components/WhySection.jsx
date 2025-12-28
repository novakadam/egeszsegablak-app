
import React from 'react';
const WhySection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Added Green Subtitle */}
        <span className="text-[#69BD9C] font-semibold tracking-wider uppercase text-sm mb-4 block">
          Miért?
        </span>
        
        <h2 className="text-3xl md:text-5xl font-medium text-white mb-8">
          Egészségről érthetően: közel 70 videó vezető szakértőktől
        </h2>
        <p className="text-xl text-white/80 leading-relaxed">
          Az egészségértésünk ma Magyarországon, átlagosan egy 12 éves gyermek szintjén áll. Pedig az egészségünk megőrzéséhez elengedhetetlen, hogy értsük a saját testünket, az ellátórendszert és azokat a döntéseket, amelyek rólunk szólnak
        </p>
      </div>
    </section>
  );
};
export default WhySection;
