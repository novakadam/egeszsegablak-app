import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchVideos, fetchCategories } from "@/lib/wpApi";
import VideoCard from "@/components/VideoCard";

const MONTHLY_CATEGORY_SLUG = "havi-valogatas";
const PER_PAGE = 5;

const MonthlyThemeCarousel = () => {
  const scrollRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        // 1) megtaláljuk a havi válogatás kategória ID-t slug alapján
        const cats = await fetchCategories();
        const monthlyCat = (cats || []).find(
          (c) => String(c.slug || "").trim().toLowerCase() === MONTHLY_CATEGORY_SLUG
        );

        if (!monthlyCat?.id) {
          if (!cancelled) setVideos([]);
          return;
        }

        // 2) csak ebből a kategóriából kérjük a videókat
        const data = await fetchVideos({
          categoryId: monthlyCat.id,
          perPage: PER_PAGE,
          page: 1,
        });

        if (!cancelled) setVideos(data || []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setVideos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const themeVideos = useMemo(() => (videos || []).slice(0, PER_PAGE), [videos]);

  if (loading) {
    return (
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-[#69BD9C] font-semibold tracking-wider text-sm mb-4 block">
              Havi válogatásunk egy témából
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
              Kék zónákban tudják a hosszú élet titkát
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Fedezd fel a világ legegészségesebb közösségeit, ahol az emberek rekord ideig élnek.
              Ismerd meg életmódjukat, táplálkozási szokásaikat és a boldog, hosszú élet titkait
              szakértőink segítségével.
            </p>
          </div>

          <div className="text-white/70 text-center">Betöltés…</div>
        </div>
      </section>
    );
  }

  // Ha nincs havi válogatás videó, ne jelenjen meg a blokk
  if (!themeVideos.length) return null;

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-[#69BD9C] font-semibold tracking-wider text-sm mb-4 block">
            Havi válogatásunk egy témából
          </span>
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
            Kék zónákban tudják a hosszú élet titkát
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Fedezd fel a világ legegészségesebb közösségeit, ahol az emberek rekord ideig élnek.
            Ismerd meg életmódjukat, táplálkozási szokásaikat és a boldog, hosszú élet titkait
            szakértőink segítségével.
          </p>
        </div>

        {/* Slider */}
        <div className="relative group/slider">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/10"
            aria-label="Previous videos"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/10"
            aria-label="Next videos"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {themeVideos.map((video, index) => (
              <div key={video.id} className="flex-shrink-0 w-72 snap-center">
                <VideoCard
                  video={video}
                  badgeText="Havi téma"
                  motionDelay={index * 0.03}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyThemeCarousel;
