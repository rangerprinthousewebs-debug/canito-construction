"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Icon, { IconType } from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

interface AboutCard {
  icon: IconType;
  title: string;
  description: string;
  size: string;
}

export default function About() {
  const t = useTranslations("About");

  const cards: AboutCard[] = [
    {
      icon: "pen",
      title: t("bento1Title"),
      description: t("bento1Desc"),
      size: "col-span-1",
    },
    {
      icon: "clock",
      title: t("bento2Title"),
      description: t("bento2Desc"),
      size: "col-span-1",
    },
    {
      icon: "award",
      title: t("bento3Title"),
      description: t("bento3Desc"),
      size: "col-span-1",
    },
    {
      icon: "users",
      title: t("bento4Title"),
      description: t("bento4Desc"),
      size: "col-span-1",
    },
  ];

  const itemReveal = (idx: number) => ({
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: idx * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <Section id="about" className="scroll-mt-20 py-32 relative overflow-hidden">
      {/* Background glowing light for About */}
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#D4AF37]/2 blur-[130px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Brand Composition (Logo Card) */}
          <div className="lg:col-span-5 w-full flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative aspect-square sm:aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 glass-card bg-gradient-to-br from-white/[0.01] to-white/[0.03] flex items-center justify-center p-8 sm:p-12 group"
            >
              {/* Subtle structural architectural background image */}
              <div className="absolute inset-0 z-0 opacity-15 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none">
                <Image
                  src="/images/hero-house.jpg"
                  alt="Architectural detailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale filter contrast-125"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
              </div>
              
              {/* Large high-res Brand Logo */}
              <div className="relative z-10 w-[64%] aspect-square flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Canito Construction Brand Logo"
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
                  className="object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column: About header and details grid */}
          <div className="lg:col-span-7 flex flex-col order-1 lg:order-2 text-left">
            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
              >
                {t("subtitle")}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`${typography.headingXL} text-white font-extrabold tracking-tight mb-4`}
              >
                {t("title")}
              </motion.h2>
            </div>

            {/* Reorganized Bento Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={itemReveal(index)}
                  className={card.size}
                >
                  <Card variant="feature" className="h-full flex flex-col justify-between p-8 group">
                    <div>
                      <div className="mb-6 text-[#9B9B9B] group-hover:text-[#D4AF37] transition-colors duration-300">
                        <Icon name={card.icon} className="w-8 h-8 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[#9B9B9B] leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-300">
                      {card.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
