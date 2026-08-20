/**
 * AIROX 2026 - Design Tokens
 * Strictly derived from the AIROX Logo (Golden Flame & Dark Obsidian) 
 * and Official JJCET Logo (Royal Navy Blue & Cardinal Accent).
 */

export const COLOR_TOKENS = {
  // Primary Obsidian Canvas Backgrounds
  background: {
    base: '#05070E',     // Deepest obsidian black
    surface: '#0B0F1A',  // Card and panel surface
    elevated: '#121726', // Floating modal/dropdown background
    glass: 'rgba(11, 15, 26, 0.75)',
  },

  // Brand Primary: AIROX Golden Flame (Triangle & Wings)
  flame: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Core Brand Amber
    600: '#D97706', // Deep Flame
    700: '#B45309',
    800: '#92400E',
    glow: 'rgba(245, 158, 11, 0.25)',
  },

  // Brand Secondary: JJCET Royal Navy Blue (Institution Heritage)
  navy: {
    900: '#0B132B',
    800: '#1C2541',
    700: '#1E3A8A', // Official JJCET Navy
    600: '#2563EB',
    500: '#3B82F6',
    glow: 'rgba(30, 58, 138, 0.35)',
  },

  // Sowdambikaa Banner Red Accent
  cardinal: {
    500: '#EF4444',
    600: '#DC2626',
    glow: 'rgba(220, 38, 38, 0.25)',
  },

  // Neutral Typography & Borders
  text: {
    heading: '#FFFFFF',
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    muted: '#64748B',
    dark: '#020617',
  },

  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    default: 'rgba(255, 255, 255, 0.15)',
    highlight: 'rgba(245, 158, 11, 0.4)',
    navyHighlight: 'rgba(59, 130, 246, 0.4)',
  },
} as const;

export const TYPOGRAPHY_TOKENS = {
  fontFamily: {
    heading: 'Plus Jakarta Sans, sans-serif',
    body: 'Plus Jakarta Sans, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
  },
  scaleRatio: 1.25, // Major Third scale for high-clarity technical layout
} as const;

export const RADIUS_TOKENS = {
  sm: '6px',
  md: '10px',
  lg: '16px', // Standard cap for cards as specified
  pill: '9999px', // Restricted strictly to buttons & tags
} as const;

export const MOTION_PRESETS = {
  spring: {
    stiffness: 300,
    damping: 25,
  },
  duration: {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
  },
  easing: [0.16, 1, 0.3, 1], // Custom easeOutExponential
} as const;
