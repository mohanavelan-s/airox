/**
 * AIROX 2026 - BlurImage Component
 * Progressive image loading with smooth blur placeholder transition,
 * error state resilience, and accessibility compliance.
 */

import React, { useState } from 'react';

export interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
  fallbackText?: string;
}

export const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  fallbackText,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${aspectClasses[aspectRatio]} ${className}`}>
      {/* Skeleton Blur Background while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse blur-md transform scale-105" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 text-xs text-center p-3 font-mono">
          {fallbackText || alt || 'Image unavailable'}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`
            w-full h-full object-cover transition-all duration-500 ease-out
            ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-105'}
          `}
          {...props}
        />
      )}
    </div>
  );
};
