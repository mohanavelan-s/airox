/**
 * AIROX 2026 - Innovation Hub Card Component
 * Architectural matte panels, hairline structural borders, warm accent lighting,
 * and subtle elevation.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'interactive' | 'outline' | 'onyx' | 'matte';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  glowOnHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'matte',
  padding = 'md',
  className = '',
  glowOnHover = false,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-9',
  };

  const variantClasses = {
    glass: 'bg-[#151821]/80 backdrop-blur-md border border-white/10 text-gray-200',
    solid: 'bg-[#151821] border border-white/10 text-gray-200',
    matte: 'bg-[#151821] border border-white/10 text-gray-200 shadow-md',
    interactive: 'panel-matte-interactive cursor-pointer text-gray-200',
    outline: 'bg-transparent border border-white/12 text-gray-200',
    onyx: 'bg-[#0f1117] border border-white/10 text-gray-200',
  };

  const hoverEffectClass = glowOnHover
    ? 'transition-all duration-300 hover:border-[#e07a38]/50 hover:shadow-[0_0_25px_-5px_rgba(224,122,56,0.15)]'
    : '';

  return (
    <motion.div
      className={`
        rounded-xl
        overflow-hidden
        ${paddingClasses[padding]}
        ${variantClasses[variant]}
        ${hoverEffectClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};


