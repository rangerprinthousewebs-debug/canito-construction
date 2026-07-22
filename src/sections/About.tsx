"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Icon, { IconType } from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

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
      size: "md:col-span-2",
    },
    {
      icon: "clock",
      title: t("bento2Title"),
      description: t("bento2Desc"),
      size: "md:col-span-1",
    },
    {
      icon: "award",
      title: t("bento3Title"),
      description: t("bento3Desc"),
      size: "md:col-span-1",
    },
    {
      icon: "users",
      title: t("bento4Title"),
      description: t("bento4Desc"),
      size: "md:col-span-2",
    },
  ];

  return (
    <Section id="about" className="scroll-mt-20">
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
            {t("subtitle")}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1, 0.6)}
            className={`${typography.headingXL} text-white mb-6`}
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(index * 0.1, 0.6)}
              className={card.size}
            >
              <Card variant="feature" className="h-full">
                <div>
                  <div className="mb-6 text-[#9B9B9B] group-hover:text-[#D4AF37] transition-colors duration-300">
                    <Icon name={card.icon} className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[#9B9B9B] leading-relaxed text-sm">
                  {card.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
