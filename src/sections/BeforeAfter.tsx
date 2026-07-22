"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

export default function BeforeAfter() {
  const t = useTranslations("BeforeAfter");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1024);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
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
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <Section id="before-after" className="scroll-mt-20 border-t border-white/5">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-24 text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0, 0.6)}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("title")}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1, 0.6)}
            className={`${typography.headingXL} text-white mb-6`}
          >
            {t("subtitle")}
          </motion.h2>
        </div>

        {/* Interactive Comparison Slider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.2, 0.8)}
          className="relative w-full aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/5 shadow-2xl select-none"
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* AFTER (Base layer - kitchen 2) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/project2.jpg"
              alt="Kitchen After Remodel"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <span className="absolute bottom-6 right-6 z-20 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-white tracking-widest uppercase border border-white/10">
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
                alt="Kitchen Before Remodel"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
              <span className="absolute bottom-6 left-6 z-20 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-bold text-[#D4AF37] tracking-widest uppercase border border-[#D4AF37]/20">
                {t("before")}
              </span>
            </div>
          </div>

          {/* Slider line separator */}
          <div
            className="absolute inset-y-0 w-[2px] bg-white z-20 cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-white text-black font-bold text-lg flex items-center justify-center shadow-lg border border-black/10 select-none">
              ↔
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
