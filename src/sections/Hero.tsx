"use client";

import { useTranslations } from "next-intl";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Backgrounds from "@/components/ui/Backgrounds";
import { Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

export default function Hero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax elements — GPU-only: only opacity and transform
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const trustBadges = [
    "Licensed & Insured",
    "Free Estimates",
    "Quality Guaranteed",
  ] as const;

  // Cinematic reveal — GPU-only: no filter/blur, only opacity + y transform
  const cinematicReveal = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col items-center justify-between pt-32 pb-16 overflow-hidden"
    >
      {/* Ambient glowing meshes & grid */}
      <Backgrounds variant="ambient" />

      <Container className="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
        {/* Animated Badge */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={cinematicReveal(0.1)}
          style={{ y: yText, opacity: opacityText }}
          className="mb-6"
        >
          <Badge variant="premium">
            ✨ {t("badge")}
          </Badge>
        </m.div>

        {/* Huge Apple-Style Title */}
        <m.h1
          initial="hidden"
          animate="visible"
          variants={cinematicReveal(0.25)}
          style={{ y: yText, opacity: opacityText }}
          className={`${typography.displayXL} font-black tracking-tight text-white mb-6 select-none max-w-4xl`}
        >
          <span className="text-gradient-gold block sm:inline">{t("title")}</span>
          <span className="text-[#D4AF37]">.</span>
        </m.h1>

        {/* Minimal Subtitle */}
        <m.p
          initial="hidden"
          animate="visible"
          variants={cinematicReveal(0.4)}
          style={{ y: yText, opacity: opacityText }}
          className="text-base sm:text-lg text-[#9B9B9B] max-w-xl leading-relaxed mb-8 px-4"
        >
          {t("subtitle")}
        </m.p>

        {/* CTA Buttons with light glow */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={cinematicReveal(0.55)}
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto px-6"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto relative group overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
            onClick={() => {
              const target = document.querySelector("#contact");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            rightIcon={<Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          >
            {t("ctaPrimary")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/10 hover:bg-white/[0.03] backdrop-blur-sm"
            onClick={() => {
              const target = document.querySelector("#showcase");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("ctaSecondary")}
          </Button>
        </m.div>
      </Container>

      {/* Cinematic Architectural Render Image (Apple-style scroll transition) */}
      <m.div
        initial={{ opacity: 0, y: 80, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ scale: scaleImage, y: yImage }}
        className="relative z-10 w-full max-w-5xl px-4 sm:px-6 mx-auto mb-10"
      >
        <div className="relative aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] glass-card">
          <Image
            src="/images/hero-house.jpg"
            alt="Luxury home remodeling and construction in Kyle, Texas by Canito Construction LLC"
            fill
            className="object-cover object-center select-none"
            priority
            fetchPriority="high"
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
          />
          {/* Subtle overlay gradient on top and bottom of the image for seamless layout integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/30 via-transparent to-transparent" />
        </div>
      </m.div>

      {/* Trust indicators */}
      <m.div
        initial="hidden"
        animate="visible"
        variants={cinematicReveal(0.85)}
        className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[10px] sm:text-xs font-bold tracking-widest text-[#9B9B9B] uppercase select-none pb-4"
      >
        {trustBadges.map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span className="text-[#D4AF37]">✓</span>
            <span>{label}</span>
          </div>
        ))}
      </m.div>

      {/* Elegant bottom light separator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </section>
  );
}
