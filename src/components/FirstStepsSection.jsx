
import React from 'react';
import { CheckCircle2, Video, Users, Gift, HelpCircle, GraduationCap } from 'lucide-react';

const FirstStepsSection = () => {
  const features = [{
    icon: <Users className="w-8 h-8" />,
    title: 'Kinek?',
    description: 'Bárkinek, aki szeretne tudatosabban törődni egészségével, legyen szó megelőzésről vagy konkrét panaszokról.'
  }, {
    icon: <HelpCircle className="w-8 h-8" />,
    title: 'Miről?',
    description: 'Átfogó egészségügyi témákról: a betegutaktól és ellátási formáktól kezdve a konkrét betegségek megelőzéséig.'
  }, {
    icon: <Gift className="w-8 h-8" />,
    title: 'Díjmentesen',
    description: 'A teljes tananyag és minden videó teljesen ingyenesen elérhető minden látogató számára, regisztráció nélkül.'
  }, {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Ismert szakértőkkel',
    description: 'Hiteles, gyakorló orvosok és elismert egészségügyi szakemberek adják át tudásukat érthető formában.'
  }];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              alt="Medical professionals discussing" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1658046470524-3f9d70a7d3f1" 
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-12">
              Értsük jobban az egészségünket!
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all border border-white/5">
                  <div className="text-[#7FD8BE] mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstStepsSection;
