import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import VideoDetailPage from "@/pages/VideoDetailPage";
import CategoryPage from "@/pages/CategoryPage";
import SearchPage from "@/pages/SearchPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

// ✅ Ha a React appot ide töltöd fel: public_html/app/
// akkor basename = "/app"
// Lokálban (npm run dev) ez üres marad, mert isDev alapján választunk.
const isDev = import.meta.env.DEV;
const BASENAME = isDev ? "/" : "/app";

function App() {
  return (
    <Router basename={BASENAME}>
      <ScrollToTop />
      <Toaster />
      <CookieConsent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:videoId" element={<VideoDetailPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />

        {/* 🔍 SEARCH */}
        <Route path="/search" element={<SearchPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
