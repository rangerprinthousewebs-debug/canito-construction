"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * MotionProvider — Client Component
 *
 * Wraps page content with LazyMotion to load only the domAnimation feature
 * bundle (~17 KB) instead of the full Framer Motion runtime (~130 KB),
 * while keeping layout.tsx as a Server Component.
 *
 * Use this wrapper on any page/layout that has animated sections.
 * Replace all <motion.div> with <m.div> inside wrapped trees for maximum savings.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
