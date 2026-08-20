/**
 * AIROX 2026 - Innovation Hub Button Component
 * Architectural precision button, warm ember accents, responsive lift & illumination.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  prefixSymbol?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  prefixSymbol,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a38] rounded-xl border font-medium';

  const sizeClasses = {
    sm: 'text-[11px] px-3.5 py-2 min-h-[36px] gap-1.5',
    md: 'text-xs px-5 py-2.5 min-h-[42px] gap-2',
    lg: 'text-sm px-7 py-3.5 min-h-[50px] gap-2.5',
  };

  const variantClasses = {
    // Primary: Warm Ember Glow Accent Button
    primary: 'bg-[#e07a38] hover:bg-[#d06927] text-white border-[#e07a38] shadow-[0_4px_16px_rgba(224,122,56,0.25)] hover:shadow-[0_6px_24px_rgba(224,122,56,0.4)]',
    // Amber / Warm Accent
    amber: 'bg-[#f09650] hover:bg-[#e08640] text-[#090a0d] font-bold border-[#f09650]',
    // Secondary: Dark Matte Panel with Subtle Light Border
    secondary: 'bg-[#1b1e2a] hover:bg-[#232738] text-gray-100 border-white/15 hover:border-white/25',
    // Outline: Transparent with Hairline Border and Warm Glow on Hover
    outline: 'bg-transparent hover:bg-white/5 text-gray-200 border-white/20 hover:border-[#e07a38]/60 hover:text-white',
    // Ghost: Text-only
    ghost: 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-100 border-transparent',
    // Danger / Highlight
    danger: 'bg-[#e07a38] hover:bg-[#d06927] text-white border-[#e07a38]',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      whileHover={{ y: disabled || isLoading ? 0 : -1 }}
      transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-[#e07a38] rounded-full animate-ping" />
          <span className="text-[11px] text-gray-400">PROCESSING...</span>
        </div>
      ) : (
        <>
          {prefixSymbol && <span className="text-[#f09650] font-bold text-[13px]">{prefixSymbol}</span>}
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};


