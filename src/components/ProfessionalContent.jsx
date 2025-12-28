
import React from 'react';
import { motion } from 'framer-motion';

const ProfessionalContent = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 leading-tight">
              Egészségünk kulcsa a tudás
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              Szakértőink segítségével megismerheted azokat a módszereket és gyakorlatokat, amelyek hatékonyan támogatják az egészségmegőrzést.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Platformunk átfogó képet nyújt a modern egészségügyi gyakorlatokról, amelyeket otthonodban, kényelmesen tanulhatsz meg.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="aspect-[3/4] rounded-3xl overflow-hidden"
              >
                <img alt="Professional health consultation" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                className="aspect-[3/4] rounded-3xl overflow-hidden mt-8"
              >
                <img alt="Healthy lifestyle concept" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1623571785635-cfdf12f0d113" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalContent;
