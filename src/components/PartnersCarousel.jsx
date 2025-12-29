import React from "react";
import { motion } from "framer-motion";

// 🔑 base-aware asset helper (dev: / | prod: /app/)
const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const PartnersCarousel = () => {
  const partners = [
    {
      name: "Partner 1",
      logo: asset("assets/partnerek/semmelweis.png") + "?w=200&h=100&fit=crop",
    },
    {
      name: "Partner 2",
      logo: asset("assets/partnerek/dr24.png") + "?w=200&h=100&fit=crop",
    },
    {
      name: "Partner 3",
      logo: asset("assets/partnerek/egeszsegablak.png") + "?w=200&h=100&fit=crop",
    },
    {
      name: "Partner 4",
      logo: asset("assets/partnerek/omsz.png") + "?w=200&h=100&fit=crop",
    },
    {
      name: "Partner 5",
      logo: asset("assets/partnerek/bm.png") + "?w=200&h=100&fit=crop",
    },
    {
      name: "Partner 6",
      logo: asset("assets/partnerek/semmelweis.png") + "?w=200&h=100&fit=crop",
    },
  ];

  return (
    <section className="py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-medium text-white text-center mb-12">
          Partnereink
        </h3>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-24 bg-white rounded-xl shadow-md flex items-center justify-center p-6"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
