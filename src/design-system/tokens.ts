/**
 * Design Tokens for Canito Construction LLC
 * Inspired by Apple, Stripe, and Vercel design languages.
 */

export const colors = {
  primary: "text-white bg-black hover:bg-[#111] active:bg-[#222]",
  gold: "#D4AF37",
  black: "#0B0B0B",
  white: "#FFFFFF",
  gray: {
    50: "#F9F9F9",
    100: "#F3F3F3",
    200: "#E6E6E6",
    300: "#D4D4D4",
    500: "#9B9B9B",
    700: "#4A4A4A",
    900: "#1A1A1A",
  },
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
  },
  glass: "bg-white/[0.01] backdrop-blur-md border border-white/5",
  glassStrong: "bg-black/80 backdrop-blur-lg border border-white/10",
  border: "border-white/5",
  borderHover: "border-[#D4AF37]/50",
  surface: "bg-white/[0.01]",
  background: "#0B0B0B",
};

export const spacing = {
  4: "1",       // 4px -> space-1 / p-1
  8: "2",       // 8px -> space-2 / p-2
  12: "3",      // 12px -> space-3 / p-3
  16: "4",      // 16px -> space-4 / p-4
  24: "6",      // 24px -> space-6 / p-6
  32: "8",      // 32px -> space-8 / p-8
  40: "10",     // 40px -> space-10 / p-10
  48: "12",     // 48px -> space-12 / p-12
  64: "16",     // 64px -> space-16 / p-16
  80: "20",     // 80px -> space-20 / p-20
  96: "24",     // 96px -> space-24 / p-24
  120: "28",    // 120px -> space-28 / p-28
  160: "40",    // 160px -> space-40 / p-40
};

export const radius = {
  small: "rounded-md",      // 6px
  medium: "rounded-xl",     // 12px
  large: "rounded-2xl",     // 16px
  xl: "rounded-3xl",        // 24px
  "2xl": "rounded-[32px]",  // 32px
  full: "rounded-full",
};

export const shadow = {
  xs: "shadow-sm",
  sm: "shadow",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-2xl",
  glowGold: "shadow-[0_0_50px_rgba(212,175,55,0.15)]",
  glassShadow: "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
};

export const typography = {
  displayXL: "text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.05]",
  displayL: "text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]",
  headingXL: "text-3xl sm:text-5xl font-bold tracking-tight leading-tight",
  headingL: "text-2xl sm:text-4xl font-bold tracking-tight leading-tight",
  headingM: "text-xl sm:text-2xl font-bold tracking-tight",
  headingS: "text-lg sm:text-xl font-semibold tracking-tight",
  bodyXL: "text-lg sm:text-xl leading-relaxed font-normal",
  bodyL: "text-base sm:text-lg leading-relaxed font-normal",
  body: "text-sm sm:text-base leading-relaxed font-normal",
  bodySmall: "text-xs sm:text-sm leading-relaxed font-normal",
  caption: "text-xs tracking-wider font-semibold uppercase",
  button: "text-xs font-bold uppercase tracking-wider",
  label: "text-xs font-semibold uppercase tracking-wider",
};
export const transition = "transition-all duration-300 ease-in-out";

export const zIndex = {
  hide: "-z-10",
  base: "z-0",
  dropdown: "z-10",
  sticky: "z-40",
  modal: "z-50",
};

export const opacity = {
  muted: "opacity-40",
  secondary: "opacity-60",
  active: "opacity-100",
};

export const blur = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
};

export const breakpoints = {
  mobile: "360px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1920px",
};

export const containerWidth = "max-w-7xl mx-auto px-6";
export const sectionPadding = "py-24 sm:py-32 scroll-mt-20";
