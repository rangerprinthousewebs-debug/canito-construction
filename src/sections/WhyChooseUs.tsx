"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Icon, { IconType } from "@/components/ui/Icon";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

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

  return (
    <Section id="why-choose-us" className="bg-[#0B0B0B] border-t border-white/5 scroll-mt-20">
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

        {/* Advantages Checklist Grid */}
        <Grid cols={3} gap={8}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(index * 0.1, 0.6)}
              className="text-left flex space-x-4"
            >
              <div className="p-3 w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-[#9B9B9B] leading-relaxed">
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
