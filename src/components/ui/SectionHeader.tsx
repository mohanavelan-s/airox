/**
 * AIROX 2026 - Innovation Hub SectionHeader Component
 * Syne display titles, monospaced research eyebrows with warm ember status indicator,
 * and optional subtle ghosted watermark.
 */

import React from 'react';

export interface SectionHeaderProps {
  badgeText?: string;
  title: string;
  description?: string;
  ghostWatermark?: string;
  align?: 'left' | 'center';
  darkBg?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  description,
  ghostWatermark,
  align = 'left',
  darkBg = true,
  className = '',
}) => {
  const alignClasses = align === 'center' ? 'text-center mx-auto items-center' : 'text-left';

  return (
    <div className={`relative flex flex-col space-y-3 max-w-4xl ${alignClasses} ${className}`}>
      {/* Ghosted Architectural Watermark */}
      {ghostWatermark && (
        <div
          className={`absolute -top-10 ${
            align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
          } font-display text-7xl sm:text-8xl lg:text-9xl uppercase font-extrabold select-none pointer-events-none opacity-[0.04] text-white whitespace-nowrap overflow-hidden`}
          aria-hidden="true"
        >
          {ghostWatermark}
        </div>
      )}

      {badgeText && (
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#f09650]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e07a38] shrink-0 animate-pulse" />
          <span>{badgeText}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-white">
        {title}
      </h2>

      {description && (
        <p className="text-sm sm:text-base font-sans text-gray-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};


