import { useEffect, useState } from "react";
import { fetchVideos } from "@/lib/wpApi";

export function useVideos({ search, categoryId } = {}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVideos({ search, categoryId });
        if (!cancelled) setVideos(data);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [search, categoryId]);

  return { videos, loading, error };
}
