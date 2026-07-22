"use client";

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
    <Section id="about" className="scroll-mt-20 py-32 relative">
      {/* Background glowing light for About */}
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#D4AF37]/2 blur-[130px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("subtitle")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${typography.headingXL} text-white font-extrabold tracking-tight mb-6`}
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
      </Container>
    </Section>
  );
}
