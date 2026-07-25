"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

interface Step {
  num: string;
  titleKey: string;
  descKey: string;
}

export default function WorkProcess() {
  const t = useTranslations("Process");

  const steps: Step[] = [
    { num: "01", titleKey: "step1.title", descKey: "step1.desc" },
    { num: "02", titleKey: "step2.title", descKey: "step2.desc" },
    { num: "03", titleKey: "step3.title", descKey: "step3.desc" },
    { num: "04", titleKey: "step4.title", descKey: "step4.desc" },
    { num: "05", titleKey: "step5.title", descKey: "step5.desc" },
    { num: "06", titleKey: "step6.title", descKey: "step6.desc" },
  ];

  // GPU-only animations: no filter/blur
  const itemReveal = (idx: number) => ({
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: idx * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <Section id="process" className="scroll-mt-20 border-t border-white/5 bg-[#0B0B0B] py-32 relative">
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#D4AF37]/1 blur-[115px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("title")}
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${typography.headingXL} text-white font-extrabold tracking-tight mb-6`}
          >
            {t("subtitle")}
          </m.h2>
        </div>

        {/* Process Timeline - Desktop View */}
        <div className="hidden lg:grid grid-cols-6 gap-6 relative">
          <div className="absolute top-[35px] left-8 right-8 h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/30 to-[#D4AF37]/10 z-0" />
          {steps.map((step, idx) => (
            <m.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemReveal(idx)}
              className="text-center relative z-10 flex flex-col items-center group cursor-default"
            >
              {/* Dot / Number indicator */}
              <div className="w-[70px] h-[70px] rounded-full bg-[#0B0B0B] border-2 border-white/10 text-white flex items-center justify-center font-bold text-sm tracking-widest mb-6 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all duration-500">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                {t(step.titleKey)}
              </h3>
              <p className="text-xs text-[#9B9B9B] leading-relaxed px-2 group-hover:text-white/80 transition-colors duration-300">
                {t(step.descKey)}
              </p>
            </m.div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col space-y-12 relative pl-8">
          <div className="absolute top-0 bottom-0 left-[15px] w-[1px] bg-white/10 z-0" />
          {steps.map((step, idx) => (
            <m.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemReveal(idx)}
              className="text-left relative z-10 flex flex-col group"
            >
              {/* Circle indicator */}
              <div className="absolute left-[-42px] top-0 w-8 h-8 rounded-full bg-[#0B0B0B] border border-white/20 text-[#9B9B9B] group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] flex items-center justify-center font-bold text-[10px] tracking-widest transition-all duration-300">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                {t(step.titleKey)}
              </h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {t(step.descKey)}
              </p>
            </m.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
