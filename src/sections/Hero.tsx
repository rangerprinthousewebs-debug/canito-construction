"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Backgrounds from "@/components/ui/Backgrounds";
import { Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

export default function Hero() {
  const t = useTranslations("Hero");

  const trustBadges = [
    "Licensed & Insured",
    "Free Estimates",
    "Quality Guaranteed",
  ] as const;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Premium Background Mesh / Gradients */}
      <Backgrounds variant="mesh" />
      <Backgrounds variant="glow" />

      <Container className="relative z-10 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0, 0.8)}
          className="mb-8"
        >
          <Badge variant="premium">
            ✨ {t("badge")}
          </Badge>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.15, 0.8)}
          className={`${typography.displayXL} text-white mb-8`}
        >
          {t("title")}<span className="text-[#D4AF37]">.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.3, 0.8)}
          className="text-lg sm:text-xl text-[#9B9B9B] max-w-2xl leading-relaxed mb-12"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.45, 0.8)}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const target = document.querySelector("#contact");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            rightIcon={<Icon name="arrowRight" className="w-4 h-4" />}
          >
            {t("ctaPrimary")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const target = document.querySelector("#projects");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("ctaSecondary")}
          </Button>
        </motion.div>

        {/* Trust indicators (Licensed, Insured, etc.) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.6, 0.8)}
          className="flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs font-bold tracking-widest text-[#9B9B9B] uppercase select-none"
        >
          {trustBadges.map((label, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-[#D4AF37]">✓</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Elegant bottom light separator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
