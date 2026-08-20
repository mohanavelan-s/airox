/**
 * AIROX 2026 - Container Component
 * Restrains ultra-wide layouts with maximum 7xl width and proportional mobile padding.
 */

import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'normal',
}) => {
  const sizeClasses = {
    narrow: 'max-w-5xl',
    normal: 'max-w-[1536px]',
    wide: 'max-w-[1750px]',
  };

  return (
    <div className={`w-full ${sizeClasses[size]} mx-auto px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};
