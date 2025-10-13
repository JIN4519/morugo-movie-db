import React, { useEffect, useMemo, useState } from 'react';

export interface ImageWithFallbackProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

// Lightweight inline SVG placeholder to avoid external dependency
const DEFAULT_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
      <rect width="100%" height="100%" fill="#e5e7eb" />
      <g fill="#9ca3af" font-family="sans-serif" text-anchor="middle">
        <text x="200" y="300" font-size="20">No Image</text>
      </g>
    </svg>`
  );

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  onError,
  loading = 'lazy',
  ...rest
}: ImageWithFallbackProps) {
  const resolvedFallback = useMemo(() => fallbackSrc || DEFAULT_FALLBACK, [fallbackSrc]);
  const initial = useMemo(() => (src && String(src).trim().length > 0 ? String(src) : resolvedFallback), [src, resolvedFallback]);

  const [currentSrc, setCurrentSrc] = useState<string>(initial);

  useEffect(() => {
    setCurrentSrc(src && String(src).trim().length > 0 ? String(src) : resolvedFallback);
  }, [src, resolvedFallback]);

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
    }
    onError?.(e);
  };

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
    />
  );
}

export default ImageWithFallback;

