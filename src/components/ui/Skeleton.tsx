/**
 * AIROX 2026 - Skeleton Loading Foundations
 * Replaces loading spinners with pulse-animated layout representations
 * matching exact final content geometries.
 */

import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle' | 'button';
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const variantClasses = {
    text: 'h-4 w-full rounded-md',
    card: 'h-48 w-full rounded-2xl',
    circle: 'h-12 w-12 rounded-full',
    button: 'h-11 w-32 rounded-xl',
  };

  const style = {
    width: width ? width : undefined,
    height: height ? height : undefined,
  };

  return (
    <div
      style={style}
      className={`
        animate-pulse bg-slate-800/60 border border-slate-700/30
        ${variantClasses[variant]}
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-[#0B0F1A]/80 border border-slate-800 p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <Skeleton variant="button" width="90px" height="24px" />
        <Skeleton variant="text" width="60px" height="18px" />
      </div>
      <Skeleton variant="text" width="75%" height="24px" />
      <Skeleton variant="text" width="100%" height="16px" />
      <Skeleton variant="text" width="90%" height="16px" />
      <div className="pt-4 flex justify-between items-center border-t border-slate-800/80">
        <Skeleton variant="text" width="100px" height="16px" />
        <Skeleton variant="button" width="110px" height="38px" />
      </div>
    </div>
  );
};
