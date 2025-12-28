import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const RecommendedVideos = ({ videos }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="w-full pb-8">
      <h3 className="text-xl font-semibold text-white mb-6 pl-2">
        Hasonló videók neked válogatva
      </h3>

      <div className="flex overflow-x-auto gap-6 pb-4 px-2 snap-x snap-mandatory scrollbar-hide -mx-2 md:-mx-0">
        {videos.map((video) => {
          const id = video?.id;

          // ✅ WP-ből jövő új mezők + fallback a régiekre
          const title = video?.title || '';
          const speaker =
            video?.speakerName ||
            video?.speaker ||
            video?.speaker_name ||
            '';

          const thumb =
            video?.thumbnailUrl ||
            video?.thumbnail ||
            video?.thumbnail_url ||
            '';

          const overlay =
            video?.overlayUrl ||
            video?.overlay ||
            video?.overlay_url ||
            '';

          return (
            <motion.div
              key={id}
              className="flex-shrink-0 w-72 snap-center group"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link to={`/video/${id}`} className="block h-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all hover:transform hover:scale-[1.02] duration-300 shadow-lg border border-white/5">
                  <div className="relative aspect-[3/4]">
                    {/* Background / thumbnail */}
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2350]/90 via-black/20 to-transparent" />

                    {/* ✅ Speaker overlay image (előadó “kivágott” kép) */}
                    {overlay ? (
                      <img
                        src={overlay}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                      />
                    ) : null}

                    {/* Play button */}
                    <div className="absolute top-4 right-4 z-20 bg-[#7FD8BE] rounded-full p-3 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-5 h-5 text-[#2A327A] fill-current" />
                    </div>

                    {/* Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h4 className="text-white font-bold text-xl leading-tight mb-2 line-clamp-3 drop-shadow-md">
                        {title}
                      </h4>

                      {/* ✅ Előadó név */}
                      {speaker ? (
                        <p className="text-white/90 font-medium text-sm drop-shadow-sm">
                          {speaker}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedVideos;
