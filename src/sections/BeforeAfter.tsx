"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { m, useAnimation } from "framer-motion";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

export default function BeforeAfter() {
  const t = useTranslations("BeforeAfter");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1024);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cache the rect on drag start to avoid repeated getBoundingClientRect()
  // reads on every mousemove/touchmove (Forced Reflow / Layout Thrashing fix)
  const cachedRectRef = useRef<DOMRect | null>(null);
  const controls = useAnimation();

  const handleMove = useCallback((clientX: number) => {
    const rect = cachedRectRef.current;
    if (!rect) return;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const startDrag = useCallback(() => {
    if (containerRef.current) {
      // Cache rect at drag start — avoids layout thrashing on move events
      cachedRectRef.current = containerRef.current.getBoundingClientRect();
    }
    setIsDragging(true);
  }, []);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
    cachedRectRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        // Invalidate cached rect when container resizes
        cachedRectRef.current = null;
      }
    });
    resizeObserver.observe(containerRef.current);
    
    // Play subtle hint animation on load to show it's draggable
    const timer = setTimeout(async () => {
      await controls.start({ x: [0, -40, 40, 0], transition: { duration: 1.5, ease: "easeInOut" } });
    }, 1200);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [controls]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", stopDrag);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, stopDrag]);

  return (
    <Section id="before-after" className="scroll-mt-20 border-t border-white/5 relative overflow-hidden py-32">
      {/* Soft background light behind the slider */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/3 blur-[140px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0, 0.6)}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("title")}
          </m.div>
          <m.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1, 0.6)}
            className={`${typography.headingXL} text-white mb-4`}
          >
            {t("subtitle")}
          </m.h2>
        </div>

        {/* Interactive Comparison Slider */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.2, 0.8)}
          className="relative w-full aspect-[16/9] max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.7)] select-none group cursor-ew-resize"
          ref={containerRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          {/* AFTER (Base layer - kitchen 2) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/project2.jpg"
              alt="Kitchen After Remodel — Canito Construction LLC"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              loading="lazy"
              quality={75}
            />
            {/* Dynamic focus overlay */}
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
            <span className="absolute bottom-6 right-6 z-20 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-xs font-bold text-white tracking-widest uppercase border border-white/10 select-none">
              {t("after")}
            </span>
          </div>

          {/* BEFORE (Slider overlay layer - old kitchen) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden z-10"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 aspect-[16/9]" style={{ width: containerWidth }}>
              <Image
                src="/images/before_kitchen.jpg"
                alt="Kitchen Before Remodel — Canito Construction LLC"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
              <span className="absolute bottom-6 left-6 z-20 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-xs font-bold text-[#D4AF37] tracking-widest uppercase border border-[#D4AF37]/30 select-none">
                {t("before")}
              </span>
            </div>
          </div>

          {/* Slider line separator */}
          <div
            className="absolute inset-y-0 w-[2px] bg-white/30 z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Elegant Glow line */}
            <div className="absolute inset-y-0 -left-[1px] w-[4px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent blur-[1px]" />

            {/* Slider Dragging Handle */}
            <m.div
              animate={controls}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-black/80 backdrop-blur-lg border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-300"
            >
              <div className="flex items-center justify-center gap-1.5 text-white">
                <span className="text-xs text-[#D4AF37] font-extrabold select-none">◀</span>
                <span className="text-xs text-white font-extrabold select-none">▶</span>
              </div>
            </m.div>
          </div>
        </m.div>
      </Container>
    </Section>
  );
}
