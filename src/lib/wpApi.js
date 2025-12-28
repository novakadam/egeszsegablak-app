// src/lib/wpApi.js

const WP_BASE = import.meta.env.VITE_WP_BASE;
// pl: https://purple-shark-245382.hostingersite.com

function buildUrl(path, params = {}) {
  const url = new URL(`${WP_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    url.searchParams.set(k, String(v));
  });
  return url.toString();
}

async function wpFetch(path, params) {
  const url = buildUrl(path, params);

  // cache-buster (devben sokszor a Vite/Browser cache össze tud kavarni)
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`WP API error ${res.status}: ${txt}`);
  }
  return res.json();
}

async function wpPost(path, body = {}) {
  const url = buildUrl(path);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(body),
  });

  // próbáljuk JSON-ként olvasni, de ha nem megy, jöhet text
  const contentType = res.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && payload.message) ||
      (typeof payload === "string" ? payload : "") ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return payload;
}

// --- helpers ---
function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function youtubeIdFromUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/embed\/([^/]+)/);
    if (m) return m[1];
  } catch {}
  return null;
}

function featuredImageFromEmbed(item) {
  const fm = item?._embedded?.["wp:featuredmedia"]?.[0];
  return fm?.source_url || null;
}

function basenameFromPath(pathOrUrl) {
  if (!pathOrUrl) return null;
  try {
    const s = String(pathOrUrl);
    const cleaned = s.split("?")[0];
    const parts = cleaned.split("/");
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

// ha ACF file / image field csak ID-t ad vissza
async function fetchMedia(id) {
  if (!id) return null;
  try {
    return await wpFetch(`/wp-json/wp/v2/media/${id}`);
  } catch {
    return null;
  }
}

// ACF image mező feloldása: URL string / object / ID -> URL
async function resolveImageUrl(field) {
  if (!field) return null;

  // A) már URL
  if (typeof field === "string") return field;

  // B) ACF image array/object: { url, ... }
  if (typeof field === "object" && field.url) return field.url;

  // C) attachment ID
  if (typeof field === "number") {
    const media = await fetchMedia(field);
    return media?.source_url || null;
  }

  return null;
}

function bestFileLabel({ explicitLabel, media, fallbackUrl }) {
  if (explicitLabel) return explicitLabel;

  const title = media?.title?.rendered?.trim();
  if (title) return title;

  const filePath = media?.media_details?.file; // pl: 2025/12/valami.pdf
  const fromMediaPath = basenameFromPath(filePath);
  if (fromMediaPath) return fromMediaPath;

  const fromUrl = basenameFromPath(fallbackUrl || media?.source_url);
  if (fromUrl) return fromUrl;

  return "Letöltés";
}

function getAny(acf, keys) {
  for (const k of keys) {
    const v = acf?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return null;
}

async function mapMaterials(acf) {
  // Linkek: url_1 + label
  const links = [];
  for (let i = 1; i <= 5; i++) {
    const url = getAny(acf, [`url_${i}`]);
    if (!url) continue;

    const label = getAny(acf, [
      `url_${i}_label`,
      `url_${i}_url_label`,
      `url_${i}_label_url`,
      `url_${i}_title`,
    ]);

    links.push({
      type: "web",
      label: label || url,
      url,
    });
  }

  // Letöltések: material_1_file (objektum/ID/string), label
  const downloads = [];
  for (let i = 1; i <= 5; i++) {
    const fileField = getAny(acf, [`material_${i}_file`]);
    if (!fileField) continue;

    const explicitLabel = getAny(acf, [
      `material_${i}_label`,
      `material_${i}_file_label`,
      `material_${i}_title`,
    ]);

    let fileUrl = null;
    let media = null;

    // A) objektum (ACF file array)
    if (typeof fileField === "object") {
      fileUrl = fileField.url || null;
      if (!fileUrl) continue;

      downloads.push({
        type: "file",
        label: bestFileLabel({ explicitLabel, media: null, fallbackUrl: fileUrl }),
        url: fileUrl,
      });
      continue;
    }

    // B) ID (attachment)
    if (typeof fileField === "number") {
      media = await fetchMedia(fileField);
      fileUrl = media?.source_url || null;
    }

    // C) string (közvetlen URL)
    if (typeof fileField === "string") {
      fileUrl = fileField;
    }

    if (!fileUrl) continue;

    downloads.push({
      type: "file",
      label: bestFileLabel({ explicitLabel, media, fallbackUrl: fileUrl }),
      url: fileUrl,
    });
  }

  return { links, downloads };
}

// --------------------
// ✅ CATEGORIES
// --------------------
function toBool(v) {
  return v === true || v === 1 || v === "1" || v === "true";
}
function toNumOrNull(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function fetchCategories() {
  const items = await wpFetch("/wp-json/wp/v2/video_category", { per_page: 100 });

  return (items || []).map((c) => {
    const acf = c?.acf || {};
    return {
      id: c.id,
      name: c.name || "",
      slug: c.slug || "",
      description: c.description || "",
      link: c.link || "",

      icon: acf.icon || null,         // pl "book-open"
      color: acf.szin || "",          // pl "#505dd6"
      featured: toBool(acf.featured), // true/false
      order: toNumOrNull(acf.order),  // number/null
    };
  });
}

// --------------------
// ✅ VIDEOS
// --------------------
export async function fetchVideos({ search, categoryId, page = 1, perPage = 50 } = {}) {
  const params = {
    per_page: perPage,
    page,
    orderby: "date",
    order: "desc",
    _embed: 1,
    status: "publish",
  };
  if (search) params.search = search;
  if (categoryId) params.video_category = categoryId;

  const items = await wpFetch("/wp-json/wp/v2/video", params);

  const mapped = await Promise.all(
    (items || []).map(async (item) => {
      const acf = item.acf || {};
      const yt = youtubeIdFromUrl(acf.youtube_url);

      const { links, downloads } = await mapMaterials(acf);

      return {
        id: item.id,
        title: stripHtml(item.title?.rendered || ""),
        description: item.content?.rendered || "",
        excerpt: stripHtml(item.excerpt?.rendered || ""),
        categoryId: item.video_category?.[0] || null,
        youtubeId: yt,

        // előadó (videóknál)
        speakerName: acf.eloado_neve || acf.speaker_name || acf.speaker || "",

        // képek (ID / URL / object mind jó)
        thumbnailUrl: featuredImageFromEmbed(item),
        backgroundUrl: await resolveImageUrl(acf.background_image),
        overlayUrl: await resolveImageUrl(acf.speaker_overlay_image),

        relatedLinks: links,
        downloadableFiles: downloads,

        raw: item,
      };
    })
  );

  return mapped;
}

// --------------------
// ✅ SEARCH (Videos)
// --------------------
export async function fetchSearchVideos({ q, page = 1, perPage = 50 } = {}) {
  const query = String(q || "").trim();
  if (!query) return [];

  return fetchVideos({
    search: query,
    page,
    perPage,
  });
}

// --------------------
// ✅ CONTACT (send message)
// --------------------
export async function sendContactMessage({ name, email, message, website } = {}) {
  const payload = {
    name: String(name || "").trim(),
    email: String(email || "").trim(),
    message: String(message || "").trim(),
    // opcionális honeypot mező (frontendben egy hidden inputból jöhet)
    website: website ? String(website) : "",
  };

  return wpPost("/wp-json/egeszsegablak/v1/contact", payload);
}
