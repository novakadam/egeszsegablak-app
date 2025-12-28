// src/lib/categoryIcons.js
import {
  LayoutGrid,
  Stethoscope,
  HeartPulse,
  BookOpen,
  Map,
  Ban,
  Pill,
  Brain,
  Siren,
  Scissors,
} from "lucide-react";

export const CATEGORY_ICONS = {
  "layout-grid": LayoutGrid,
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  "book-open": BookOpen,
  map: Map,
  ban: Ban,
  pill: Pill,
  brain: Brain,
  scalpel: Scissors, // fallback
  siren: Siren,
};

export function getCategoryIcon(iconKeyRaw) {
  if (!iconKeyRaw) return null;

  // ✅ normalize: ACF néha adhat whitespace-t vagy eltérő case-t
  const key = String(iconKeyRaw).trim().toLowerCase();

  return CATEGORY_ICONS[key] || null;
}
