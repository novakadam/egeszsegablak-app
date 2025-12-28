import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Play, Share2, Download, ArrowLeft, Globe, X, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecommendedVideos from '@/components/RecommendedVideos';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchVideos } from '@/lib/wpApi';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  const [video, setVideo] = React.useState(null);
  const [allVideos, setAllVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchVideos({ perPage: 100 });
        if (!alive) return;

        setAllVideos(data);
        const found = data.find(v => String(v.id) === String(videoId));
        setVideo(found || null);
      } catch (e) {
        if (!alive) return;
        setVideo(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [videoId]);

  const relatedVideos = useMemo(() => {
    if (!video || !allVideos?.length) return [];
    const sameCat = allVideos.filter(
      v => v.id !== video.id && v.categoryId && v.categoryId === video.categoryId
    );
    if (sameCat.length >= 6) return sameCat.slice(0, 6);
    const others = allVideos.filter(v => v.id !== video.id);
    return [...sameCat, ...others].slice(0, 6);
  }, [video, allVideos]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Megosztás',
        description: 'Link kimásolva a vágólapra.',
      });
    } catch {
      toast({
        title: 'Megosztás',
        description: 'Nem sikerült automatikusan másolni. Másold ki manuálisan a címsorból.',
      });
    }
  };

  // WP-s struktúra: relatedLinks / downloadableFiles -> közös lista
  // FONTOS: itt label-t használunk (nem title-t), mert a wpApi.js így adja vissza
  const resources = useMemo(() => {
    if (!video) return [];

    const links = Array.isArray(video.relatedLinks)
      ? video.relatedLinks
          .filter(r => r?.url)
          .map(r => ({
            type: 'web',
            label: r.label || r.url, // <-- EZ a lényeg: url_1_label
            url: r.url,
          }))
      : [];

    const files = Array.isArray(video.downloadableFiles)
      ? video.downloadableFiles
          .filter(r => r?.url)
          .map(r => ({
            type: 'file',
            label: r.label || 'Letöltés', // <-- EZ a lényeg: fájlnév / media title
            url: r.url,
          }))
      : [];

    return [...links, ...files];
  }, [video]);

  const ResourceButton = ({ type, label, url }) => {
    const isDownload = type === 'pdf' || type === 'file' || type === 'download';
    const Icon = isDownload ? Download : Globe;

    if (!url) {
      return (
        <button
          onClick={() =>
            toast({
              title: label,
              description: 'Ehhez a tételhez nincs megadva link / fájl.',
            })
          }
          className="flex items-center gap-3 w-full p-4 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-sm text-left"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-medium text-sm md:text-base">{label}</span>
        </button>
      );
    }

    return (
      <a
        href={url}
        target="_blank"                 // 1) új ablakban nyitás
        rel="noopener noreferrer"
        download={isDownload ? '' : undefined}
        className="flex items-center gap-3 w-full p-4 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-sm text-left"
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-medium text-sm md:text-base">{label}</span>
        <span className="ml-auto opacity-70 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4" />
        </span>
      </a>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#343D8E] text-white flex items-center justify-center">
        Betöltés...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-[#343D8E] text-white flex items-center justify-center">
        Video not found
      </div>
    );
  }

  const pageTitle = `${video.title} - Egészségablak`;
  const metaDesc =
    (video.descriptionText || '').slice(0, 160) ||
    (typeof video.description === 'string'
      ? video.description.replace(/<[^>]+>/g, '').slice(0, 160)
      : '') ||
    'Egészségablak videó';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <div className="relative min-h-screen bg-[#343D8E] text-white font-sans overflow-x-hidden">
        <Header />

        {/* Full Page Background Cover */}
        <div className="fixed inset-0 z-0">
          <img
            src={video.backgroundUrl || video.thumbnailUrl}
            alt="Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A327A] via-[#2A327A]/95 to-transparent lg:via-[#2A327A]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A327A] via-[#2A327A] to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-[#2A327A]/30 mix-blend-multiply" />
        </div>

        {/* Video Player Overlay */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-4"
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-6 right-6 text-white hover:text-[#7FD8BE] transition-colors z-50 p-2 bg-black/50 rounded-full"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10 pt-24 min-h-screen flex flex-col">
          <div className="flex-grow container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column Content */}
            <div className="flex flex-col justify-center pt-8 pb-16">
              {/* Back & Category */}
              <div className="flex items-center gap-3 mb-8 text-sm md:text-base font-medium tracking-wide text-white/80">
                <Link
                  to="/"
                  className="hover:text-[#7FD8BE] transition-colors p-1 bg-white/10 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <span className="uppercase">{video.categoryName || 'Videó'}</span>
              </div>

              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1] uppercase max-w-2xl">
                  {video.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
                  {video.descriptionText || ''}
                </p>
              </motion.div>

              {/* Main Actions */}
              <motion.div
                className="flex flex-wrap gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-3 px-8 py-4 bg-[#7FD8BE] text-[#2A327A] rounded-full font-bold text-lg hover:bg-[#6BC7AD] hover:scale-105 transition-all shadow-lg shadow-[#7FD8BE]/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Lejátszás
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all border border-white/20 backdrop-blur-md"
                >
                  <Share2 className="w-5 h-5" />
                  Megosztás
                </button>
              </motion.div>

              {/* Resources Section */}
              <motion.div
                className="max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-6 text-white/90">
                  További tartalmak és letöltések:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resources.length > 0 ? (
                    resources.map((res, idx) => (
                      <ResourceButton
                        key={idx}
                        type={res.type}
                        label={res.label}
                        url={res.url}
                      />
                    ))
                  ) : (
                    <>
                      <ResourceButton type="web" label="Kapcsolódó cikkek" url={null} />
                      <ResourceButton type="web" label="További anyagok" url={null} />
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="hidden lg:block" />
          </div>

          {/* Bottom Carousel */}
          <div className="bg-gradient-to-t from-[#2A327A] via-[#2A327A]/90 to-transparent pt-12 pb-6">
            <div className="container mx-auto px-6">
              <RecommendedVideos videos={relatedVideos} />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default VideoDetailPage;
