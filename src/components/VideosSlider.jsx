import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { fetchVideos } from "@/lib/wpApi";
import { motion } from "framer-motion";

const VideosSlider = () => {
  const scrollRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 400;
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
        const data = await fetchVideos({ perPage: 8 });
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

  const latestVideos = useMemo(() => (videos || []).slice(0, 8), [videos]);

  if (loading) {
    return (
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-white">
            A legújabb és legnépszerűbb videók
          </h2>
          <div className="mt-8 text-white/70">Betöltés…</div>
        </div>
      </section>
    );
  }

  if (!latestVideos.length) return null;

  return (
    <section className="py-24 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-white">
            A legújabb és legnépszerűbb videók
          </h2>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Balra görgetés"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label="Jobbra görgetés"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {latestVideos.map((video, index) => (
            <Link
              key={video.id}
              to={`/video/${video.id}`}
              className="flex-shrink-0 w-72 snap-center group"
            >
              {/* ugyanaz a kártya logika, mint CategoryPage */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-900"
              >
                {/* Background Image */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Speaker Overlay */}
                {video.overlayUrl ? (
                  <img
                    src={video.overlayUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                  />
                ) : null}

                {/* Play Button */}
                <div className="absolute top-4 right-4 z-20 bg-[#7FD8BE] rounded-full p-3 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Play className="w-5 h-5 text-[#2A327A] fill-current" />
                </div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full flex flex-col items-start text-left">
                  <h3 className="text-white text-xl font-bold leading-tight mb-2 line-clamp-3 drop-shadow-md">
                    {video.title}
                  </h3>

                  {video.speakerName ? (
                    <p className="text-white/90 font-medium text-sm drop-shadow-sm">
                      {video.speakerName}
                    </p>
                  ) : null}
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-[5]" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSlider;
