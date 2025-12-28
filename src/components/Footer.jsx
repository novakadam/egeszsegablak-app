import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-32">
      {/* 🔵 Hullámív elválasztó */}
      <div className="absolute -top-1 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 90"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[90px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C120,70 240,70 360,55 480,40 600,10 720,15 840,20 960,60 1080,65 1200,70 1320,45 1440,35 L1440,0 L0,0 Z"
            fill="#2A327A"
          />
        </svg>
      </div>

      {/* 🔵 Footer tartalom */}
      <div className="relative bg-[#2A327A] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/egeszsegablak-logo.svg"
                alt="Egészségablak"
                className="h-10 md:h-12"
              />
            </Link>

            {/* Linkek */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
              <Link to="/adatvedelmi" className="hover:text-[#7FD8BE] transition-colors">
                Adatvédelmi tájékoztató
              </Link>
              <Link to="/adatkezelesi" className="hover:text-[#7FD8BE] transition-colors">
                Adatkezelési szabályzat
              </Link>
              <Link to="/suti" className="hover:text-[#7FD8BE] transition-colors">
                Süti szabályzat
              </Link>
              <Link to="/impresszum" className="hover:text-[#7FD8BE] transition-colors">
                Impresszum
              </Link>
            </nav>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-white/10" />

          {/* Copyright */}
          <div className="text-center text-xs text-white/50">
            Copyright © {new Date().getFullYear()} SMKLB · Minden jog fenntartva
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
