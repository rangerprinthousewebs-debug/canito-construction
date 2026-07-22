"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Icon, { IconType } from "@/components/ui/Icon";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

interface WhyItem {
  icon: IconType;
  titleKey: string;
  descKey: string;
}

export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");

  const items: WhyItem[] = [
    { icon: "award", titleKey: "item1Title", descKey: "item1Desc" },
    { icon: "layers", titleKey: "item2Title", descKey: "item2Desc" },
    { icon: "users", titleKey: "item3Title", descKey: "item3Desc" },
    { icon: "clock", titleKey: "item4Title", descKey: "item4Desc" },
    { icon: "pen", titleKey: "item5Title", descKey: "item5Desc" },
    { icon: "shield", titleKey: "item6Title", descKey: "item6Desc" },
  ];

  const itemReveal = (idx: number) => ({
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: idx * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <Section id="why-choose-us" className="bg-[#0B0B0B] border-t border-white/5 scroll-mt-20 py-32 relative">
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#D4AF37]/1 blur-[110px] pointer-events-none" />

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
            {t("title")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${typography.headingXL} text-white font-extrabold tracking-tight mb-6`}
          >
            {t("subtitle")}
          </motion.h2>
        </div>

        {/* Advantages Checklist Grid */}
        <Grid cols={3} gap={8}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemReveal(index)}
              className="text-left flex space-x-4 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-3 w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 text-[#9B9B9B] group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 group-hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center shrink-0">
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-[#9B9B9B] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {t(item.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
