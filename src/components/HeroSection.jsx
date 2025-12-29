import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  BookPlus,

  // biztosan létező lucide ikonok
  LayoutGrid,
  HeartPulse,
  BookOpen,
  Ban,
  Pill,
  Siren,
} from "lucide-react";

import { fetchCategories } from "@/lib/wpApi";

const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\//, "")}`;

const CARD_BG_PNG = asset("assets/card-bg.png");

// ACF icon (string) -> Lucide komponens
// Ha WP-ben olyan string van, ami nincs itt, fallback lesz BookPlus.
const iconMap = {
  "layout-grid": LayoutGrid,
  "heart-pulse": HeartPulse,
  "book-open": BookOpen,
  ban: Ban,
  pill: Pill,
  siren: Siren,

  // NOTE: "scalpel" nincs lucide-ban nálatok -> fallback BookPlus
};

// --------- helpers ----------
function hexToRgb(hex) {
  if (!hex) return null;
  const h = String(hex).replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (full.length !== 6) return null;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function isLightHex(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const lum = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return lum > 0.68;
}

// “középre 1, balra 2, jobbra 3...” rendezés kirakási sorrendre
function centerOutReorder(sortedByOrderAsc) {
  if (!sortedByOrderAsc.length) return [];
  const center = sortedByOrderAsc[0];
  const left = [];
  const right = [];

  for (let i = 1; i < sortedByOrderAsc.length; i++) {
    const item = sortedByOrderAsc[i];
    if (i % 2 === 1) left.push(item);
    else right.push(item);
  }

  return [...left.reverse(), center, ...right];
}
// ----------------------------

const HeroSection = () => {
  const navigate = useNavigate();

  const [cats, setCats] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const all = await fetchCategories();
        if (cancelled) return;

        const featured = (all || []).filter((c) => c.featured);

        const sorted = featured.slice().sort((a, b) => {
          const ao = Number.isFinite(a.order) ? a.order : 9999;
          const bo = Number.isFinite(b.order) ? b.order : 9999;
          return ao - bo;
        });

        const arranged = centerOutReorder(sorted);
        setCats(arranged);

        const idxOrder1 = arranged.findIndex((c) => c.order === 1);
        if (idxOrder1 >= 0) setActiveIndex(idxOrder1);
        else setActiveIndex(Math.floor(arranged.length / 2));
      } catch (e) {
        console.error(e);
        if (!cancelled) setCats([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleNext = () => {
    if (!cats.length) return;
    setActiveIndex((prev) => (prev + 1) % cats.length);
  };

  const handlePrev = () => {
    if (!cats.length) return;
    setActiveIndex((prev) => (prev - 1 + cats.length) % cats.length);
  };

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const isActive = offset === 0;
    const isVisible = Math.abs(offset) <= 3;

    let x = offset * 160;
    let scale = 1 - Math.abs(offset) * 0.15;
    let zIndex = 50 - Math.abs(offset) * 10;
    let rotateY = offset * -5;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) x = offset * 110;

    if (isActive) scale = 1.15;

    return {
      x,
      scale,
      zIndex,
      opacity: isVisible ? 1 : 0,
      display: isVisible ? "block" : "none",
      rotateY,
    };
  };

  const dots = useMemo(() => cats.map((c) => c.id), [cats]);

  return (
    <section className="pt-32 pb-24 px-4 overflow-hidden relative">
      {/* Background PNG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={CARD_BG_PNG}
          alt=""
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[150%] max-w-none object-contain opacity-40"
        />
      </div>

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight">
          Egészség első lépés
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          Online tanfolyam a jobb egészségért.
        </p>
      </div>

      <div className="relative h-[480px] flex justify-center items-center perspective-1000 z-10">
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/20"
          disabled={loading || cats.length === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/20"
          disabled={loading || cats.length === 0}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="relative w-full max-w-5xl mx-auto h-full flex justify-center items-center">
          {cats.map((category, index) => {
            const IconComponent = iconMap[category.icon] || BookPlus;

            const bgHex = category.color || "#132260";
            const lightBg = isLightHex(bgHex);

            const textClass = lightBg ? "text-[#2A327A]" : "text-white";
            const iconClass = lightBg ? "text-[#2A327A]" : "text-white";
            const borderClass = lightBg ? "border-[#2A327A]/20" : "border-white/20";

            const styleProps = getCardStyle(index);

            return (
              <motion.div
                key={category.id}
                initial={false}
                animate={{
                  x: styleProps.x,
                  scale: styleProps.scale,
                  zIndex: styleProps.zIndex,
                  opacity: styleProps.opacity,
                  rotateY: styleProps.rotateY,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-72 h-[420px] rounded-[40px] shadow-2xl overflow-hidden cursor-pointer"
                style={{ backgroundColor: bgHex }}
                onClick={() => {
                  // ✅ 1. katt: középre hoz
                  // ✅ 2. katt (ha már active): navigál kategória oldalra
                  if (index === activeIndex) {
                    navigate(`/category/${category.id}`);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                {/* Kártya háttér PNG */}
                <img
                  src={CARD_BG_PNG}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
                  style={{ mixBlendMode: lightBg ? "multiply" : "screen" }}
                />

                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                  <div
                    className={[
                      "mb-8 p-5 rounded-3xl border-2",
                      borderClass,
                      index === activeIndex ? "scale-110" : "",
                      "transition-transform duration-300",
                    ].join(" ")}
                  >
                    <IconComponent className={`w-14 h-14 ${iconClass}`} strokeWidth={1.5} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 ${textClass} leading-tight`}>
                    {category.name}
                  </h3>

                  {index === activeIndex && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-base ${textClass} opacity-80 mt-2 font-medium`}
                    >
                      {category.description || "Kattints a részletekért"}
                    </motion.p>
                  )}
                </div>

                {index !== activeIndex && (
                  <div className="absolute inset-0 bg-[#343D8E]/60 z-20 pointer-events-none transition-colors duration-300" />
                )}
              </motion.div>
            );
          })}

          {loading && <div className="text-white/70">Betöltés…</div>}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-12 relative z-10">
        {dots.map((id, index) => (
          <button
            key={id}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-[#69BD9C] w-8" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
