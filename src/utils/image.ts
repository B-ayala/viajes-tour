/**
 * Fallback determinista para imágenes que no cargan.
 * Usa picsum.photos con un seed estable para que cada recurso quebrado
 * muestre siempre la misma imagen placeholder (no parpadea entre renders).
 */
export const fallbackImage = (seed: string, w = 1200, h = 800): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

/** Handler listo para pasar a <img onError={...}> */
export const handleImageError =
  (seed: string, w = 1200, h = 800) =>
  (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const fb = fallbackImage(seed, w, h);
    if (img.src !== fb) img.src = fb;
  };
