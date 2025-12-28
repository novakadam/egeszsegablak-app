import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon, Play } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { fetchSearchVideos } from '@/lib/wpApi';

function useQueryParam(name) {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(name) || '', [search, name]);
}

const SearchPage = () => {
  const q = useQueryParam('q');
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError('');
        setLoading(true);

        const query = String(q || '').trim();
        if (!query) {
          if (!cancelled) setVideos([]);
          return;
        }

        const results = await fetchSearchVideos({ q: query, perPage: 100 });
        if (!cancelled) setVideos(results || []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError('Hiba történt a keresés közben.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [q]);

  const queryLabel = String(q || '').trim();

  return (
    <>
      <Helmet>
        <title>Keresés: {queryLabel || ''} - Egészségablak</title>
        <meta name="description" content={`Keresési találatok erre: ${queryLabel}`} />
      </Helmet>

      <div className="min-h-screen bg-[#343D8E] font-sans">
        <Header />

        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 mt-6">
              <div className="flex items-center justify-center gap-2 text-[#7FD8BE] uppercase tracking-wide font-medium">
                <SearchIcon className="w-5 h-5" />
                <span>Keresés</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mt-4">
                {queryLabel ? (
                  <>
                    Találatok erre: <span className="text-[#7FD8BE]">„{queryLabel}”</span>
                  </>
                ) : (
                  'Adj meg egy keresőkifejezést'
                )}
              </h1>

              {queryLabel ? (
                <p className="text-white/70 mt-4">
                  {loading ? 'Keresés folyamatban…' : `${videos.length} találat`}
                </p>
              ) : (
                <p className="text-white/70 mt-4">A keresőt a fejlécben tudod használni.</p>
              )}
            </div>

            {error ? (
              <div className="text-center text-white/80 py-10 bg-white/5 rounded-2xl">
                {error}
              </div>
            ) : null}

            {loading && queryLabel ? (
              <div className="text-center text-white/70 py-12">Betöltés…</div>
            ) : null}

            {!loading && queryLabel && videos.length === 0 ? (
              <div className="text-center text-white/70 py-12 bg-white/5 rounded-2xl">
                Nincs találat erre: <span className="text-white font-semibold">„{queryLabel}”</span>
              </div>
            ) : null}

            {/* Results grid */}
            {!loading && videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <Link
                    key={video.id}
                    to={`/video/${video.id}`}
                    className="group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-900"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {video.overlayUrl ? (
                        <img
                          src={video.overlayUrl}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                        />
                      ) : null}

                      <div className="absolute top-4 right-4 z-20 bg-[#7FD8BE] rounded-full p-3 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Play className="w-5 h-5 text-[#2A327A] fill-current" />
                      </div>

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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-[5]" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
