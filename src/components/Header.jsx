import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  BookOpen,
  HeartPulse,
  Pill,
  Siren,
  Ban,
  Scissors,
  Stethoscope,
  Map,
} from "lucide-react";

import { fetchCategories } from "@/lib/wpApi";
import { sortCategoriesSimple } from "@/lib/categoryOrder";

const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\//, "")}`;


const iconMap = {
  "layout-grid": LayoutGrid,
  "book-open": BookOpen,
  "heart-pulse": HeartPulse,
  pill: Pill,
  siren: Siren,
  ban: Ban,
  scalpel: Scissors,
  scissors: Scissors,
  stethoscope: Stethoscope,
  map: Map,
};

const Header = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesWp, setCategoriesWp] = useState([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cats = await fetchCategories();
        if (!cancelled) setCategoriesWp(sortCategoriesSimple(cats || []));
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = String(searchQuery || "").trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#3B4A8C]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img
  src={`${import.meta.env.BASE_URL}assets/egeszsegablak-logo.svg`}
  alt="Egészségablak"
  className="h-10 md:h-12"
/>
          </Link>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Keresés"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#7FD8BE]"
              />
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 px-5 py-2 bg-[#7FD8BE] text-[#2A327A] rounded-full hover:bg-[#6BC7AD] transition-colors font-medium"
              >
                Kategóriák
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl py-2 min-w-[250px] z-50">
                  <Link
                    to="/category/osszes"
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100"
                  >
                    <span className="font-bold text-gray-800">Összes videó</span>
                  </Link>

                  {categoriesWp.map((cat) => {
                    const key = String(cat.icon || "").trim().toLowerCase();
                    const Icon = iconMap[key] || null;

                    return (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                      >
                        {Icon ? (
                          <span className="text-[#3B4A8C]">
                            <Icon className="w-6 h-6" />
                          </span>
                        ) : null}
                        <span className="font-medium text-gray-800">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link to="/about" className="text-white hover:text-[#7FD8BE] transition-colors font-medium">
              Rólunk
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-[#7FD8BE] transition-colors font-medium"
            >
              Kapcsolat
            </Link>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Keresés"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/60"
                />
              </div>
            </form>

            <div className="space-y-2">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#7FD8BE] text-[#2A327A] rounded-full font-medium"
              >
                Kategóriák
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCategoryOpen && (
                <div className="bg-white/10 rounded-2xl p-2 space-y-1">
                  <Link
                    to="/category/osszes"
                    onClick={() => {
                      setIsCategoryOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-colors font-bold"
                  >
                    Összes videó
                  </Link>

                  {categoriesWp.map((cat) => {
                    const key = String(cat.icon || "").trim().toLowerCase();
                    const Icon = iconMap[key] || null;

                    return (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        onClick={() => {
                          setIsCategoryOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-colors"
                      >
                        {Icon ? (
                          <span className="text-2xl">
                            <Icon className="w-6 h-6" />
                          </span>
                        ) : null}
                        <span className="font-medium">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-white hover:bg-white/10 rounded-full transition-colors font-medium"
            >
              Rólunk
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-white hover:bg-white/10 rounded-full transition-colors font-medium"
            >
              Kapcsolat
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
