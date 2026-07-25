"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import Icon, { IconType } from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

interface ServiceItem {
  icon: IconType;
  titleKey: string;
  descKey: string;
}

export default function Services() {
  const t = useTranslations("Services");

  const servicesList: ServiceItem[] = [
    {
      icon: "home",
      titleKey: "interior.title",
      descKey: "interior.description",
    },
    {
      icon: "layers",
      titleKey: "exterior.title",
      descKey: "exterior.description",
    },
    {
      icon: "pen",
      titleKey: "painting.title",
      descKey: "painting.description",
    },
    {
      icon: "shield",
      titleKey: "drywall.title",
      descKey: "drywall.description",
    },
    {
      icon: "layers",
      titleKey: "flooring.title",
      descKey: "flooring.description",
    },
    {
      icon: "pen",
      titleKey: "carpentry.title",
      descKey: "carpentry.description",
    },
    {
      icon: "users",
      titleKey: "handyman.title",
      descKey: "handyman.description",
    },
    {
      icon: "briefcase",
      titleKey: "commercial.title",
      descKey: "commercial.description",
    },
    {
      icon: "award",
      titleKey: "custom.title",
      descKey: "custom.description",
    },
  ];

  // GPU-only animations: no filter/blur
  const itemReveal = (idx: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: idx * 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <Section id="services" className="scroll-mt-20 py-32 relative">
      {/* Background glowing light for Services */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#D4AF37]/2 blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("title")}
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${typography.headingXL} text-white font-extrabold tracking-tight mb-6`}
          >
            {t("subtitle")}
          </m.h2>
        </div>

        {/* Services Grid (9 services layout) */}
        <Grid cols={3} gap={6}>
          {servicesList.map((service, index) => (
            <m.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemReveal(index)}
            >
              <Card variant="service" className="h-full group">
                {/* Gold glow effect on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#D4AF37]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="mb-6 p-4 w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-[#D4AF37]/30 text-[#9B9B9B] group-hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center">
                  <Icon name={service.icon} className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>
                
                <p className="text-[#9B9B9B] leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-300">
                  {t(service.descKey)}
                </p>
              </Card>
            </m.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
