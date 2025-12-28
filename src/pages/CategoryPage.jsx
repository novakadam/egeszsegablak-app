import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { fetchVideos, fetchCategories } from "@/lib/wpApi";
import { getCategoryIcon } from "@/lib/categoryIcons";
import VideoCard from "@/components/VideoCard";

const stripHtml = (html) => {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const CategoryPage = () => {
  const { categoryId } = useParams();

  const [videos, setVideos] = useState([]);
  const [categoriesWp, setCategoriesWp] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAll = categoryId === "osszes" || categoryId === "all";

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const [cats, vids] = await Promise.all([
          fetchCategories(),
          fetchVideos(isAll ? {} : { categoryId: Number(categoryId) }),
        ]);

        if (cancelled) return;

        setCategoriesWp(cats || []);
        setVideos(vids || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [categoryId, isAll]);

  const currentCategory = useMemo(() => {
    if (isAll) {
      return {
        id: "osszes",
        name: "Összes videó",
        description: "Böngéssz teljes videótárunkban.",
        icon: "layout-grid",
        color: null,
      };
    }
    const idNum = Number(categoryId);
    return categoriesWp.find((c) => c.id === idNum) || null;
  }, [isAll, categoryId, categoriesWp]);

  const filterCategories = useMemo(() => {
    return [
      { id: "osszes", name: "Összes", Icon: LayoutGrid, color: null },
      ...categoriesWp.map((c) => {
        const iconKey = (c?.icon ?? c?.acf?.icon ?? "")
          .toString()
          .trim()
          .toLowerCase();

        const Icon = getCategoryIcon(iconKey);
        const color = c?.color ?? c?.szin ?? c?.acf?.szin ?? null;

        return {
          id: String(c.id),
          name: c.name,
          Icon,
          color,
        };
      }),
    ];
  }, [categoriesWp]);

  const filteredVideos = useMemo(() => videos, [videos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#343D8E] font-sans">
        <Header />
        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center text-white/70">
            Betöltés…
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentCategory && !isAll) {
    return (
      <div className="min-h-screen bg-[#343D8E] flex items-center justify-center text-white">
        Kategória nem található
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentCategory?.name || "Videók"} - Egészségablak</title>
        <meta
          name="description"
          content={
            stripHtml(currentCategory?.description) ||
            "Egészségügyi videók tárháza"
          }
        />
      </Helmet>

      <div className="min-h-screen bg-[#343D8E] font-sans">
        <Header />

        <main className="pt-24 pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 mt-8">
              <h2 className="text-[#7FD8BE] font-medium text-lg uppercase tracking-wide mb-3">
                Videók
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {currentCategory?.name === "Összes videó"
                  ? "Minden videó"
                  : `${currentCategory?.name || ""}`}
              </h1>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Az egészségértésünk ma Magyarországon átlagosan egy 12 éves
                gyermek szintjén áll. Pedig az egészségünk megőrzéséhez
                elengedhetetlen, hogy értsük a saját testünket, az ellátórendszert
                és azokat a döntéseket, amelyek rólunk szólnak.
              </p>
            </div>

            {/* Filter Section */}
            <div className="mb-16">
              <h3 className="text-center text-white text-lg font-medium mb-6">
                Nézd meg kategóriáinkat, és válaszd ki a neked valót:
              </h3>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
                {filterCategories.map((cat) => {
                  const isActive = categoryId === cat.id || (isAll && cat.id === "osszes");

                  const activeStyle =
                    isActive && cat.color
                      ? {
                          boxShadow: `0 0 15px ${cat.color}55`,
                          borderColor: cat.color,
                        }
                      : undefined;

                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      style={activeStyle}
                      className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 uppercase tracking-wide",
                        isActive
                          ? "bg-[#7FD8BE] text-[#2A327A] border-[#7FD8BE] shadow-[0_0_15px_rgba(127,216,190,0.3)] transform scale-105"
                          : "bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                      )}
                    >
                      {cat.Icon ? (
                        <cat.Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                      ) : null}
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {filteredVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  motionDelay={index * 0.05}
                />
              ))}

              {/* Discover More Banner Card */}
              <div
                className="col-span-1 sm:col-span-2 relative aspect-[3/2] sm:aspect-auto sm:h-auto bg-[#7FD8BE] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-center p-8 group
                bg-[url('https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/ce40f1cb32aea69dc6d9ffe3f3b3207b.png')] bg-cover bg-center"
              >
                <h3 className="relative z-10 text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Fedezd fel további <br /> tartalmainkat!
                </h3>
                <div>
                  <Link
                    to="/category/osszes"
                    className="relative z-10 inline-block px-8 py-3 bg-[#2A327A] text-white rounded-full font-bold shadow-lg hover:bg-[#3B4A8C] transition-colors hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Megnézem
                  </Link>
                </div>
              </div>
            </div>

            {filteredVideos.length === 0 ? (
              <div className="text-center text-white/60 py-12 bg-white/5 rounded-2xl">
                Jelenleg nincsenek videók ebben a kategóriában.
              </div>
            ) : null}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
