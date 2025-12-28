import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VideoCard = ({
  video,
  badgeText,
  motionDelay = 0,
  className = "",
}) => {
  if (!video) return null;

  return (
    <Link
      to={`/video/${video.id}`}
      className={[
        "group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-900",
        className,
      ].join(" ")}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: motionDelay }}
        className="w-full h-full relative"
      >
        {/* Background Image - Zoom effect */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Speaker Overlay - ONLY if provided */}
        {video.overlayUrl ? (
          <img
            src={video.overlayUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          />
        ) : null}

        {/* Badge (optional) */}
        {badgeText ? (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-2 py-1 bg-[#69BD9C]/90 text-white text-[10px] uppercase font-bold rounded-full tracking-wide">
              {badgeText}
            </span>
          </div>
        ) : null}

        {/* Play Button - Top Right */}
        <div className="absolute top-4 right-4 z-20 bg-[#7FD8BE] rounded-full p-3 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <Play className="w-5 h-5 text-[#2A327A] fill-current" />
        </div>

        {/* Text Content - Bottom Left */}
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

        {/* Bottom gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-[5]" />
      </motion.div>
    </Link>
  );
};

export default VideoCard;
