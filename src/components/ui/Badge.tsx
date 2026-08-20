/**
 * AIROX 2026 - Innovation Hub Badge / Tag Component
 * Technical mono labels, warm amber/ember accent indicators, matte dark compatibility.
 */

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ember' | 'onyx' | 'ghost' | 'neutral' | 'outline' | 'amber';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'onyx',
  size = 'md',
  icon,
  showDot = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider gap-1.5',
    md: 'text-xs px-3 py-1 tracking-wider gap-1.5',
  };

  const variantClasses = {
    onyx: 'bg-[#1b1e2a] text-gray-200 border border-white/10',
    ember: 'bg-[#e07a38]/15 text-[#f09650] border border-[#e07a38]/30',
    amber: 'bg-[#f09650]/20 text-[#f09650] border border-[#f09650]/40 font-semibold',
    ghost: 'bg-white/5 text-gray-300 border border-white/10',
    neutral: 'bg-[#151821] text-gray-300 border border-white/10',
    outline: 'bg-transparent text-gray-400 border border-white/15',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center max-w-full select-none font-mono uppercase font-medium rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {showDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#e07a38] shrink-0 animate-pulse" />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate max-w-full">{children}</span>
    </span>
  );
};


