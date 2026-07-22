"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

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

  return (
    <Section id="process" className="scroll-mt-20 border-t border-white/5 bg-[#0B0B0B]">
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

        {/* Process Timeline */}
        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-6 gap-6 relative">
          <div className="absolute top-[35px] left-8 right-8 h-[1px] bg-white/10 z-0" />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(idx * 0.1, 0.6)}
              className="text-left relative z-10 flex flex-col"
            >
              {/* Dot / Number indicator */}
              <div className="w-[70px] h-[70px] rounded-full bg-[#0B0B0B] border-2 border-white/10 text-white flex items-center justify-center font-bold text-sm tracking-widest mb-6 group hover:border-[#D4AF37] transition-colors duration-300">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {t(step.titleKey)}
              </h3>
              <p className="text-xs text-[#9B9B9B] leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col space-y-12 relative pl-8">
          <div className="absolute top-0 bottom-0 left-[15px] w-[1px] bg-white/10 z-0" />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(idx * 0.1, 0.6)}
              className="text-left relative z-10 flex flex-col"
            >
              {/* Circle indicator */}
              <div className="absolute left-[-42px] top-0 w-8 h-8 rounded-full bg-[#0B0B0B] border border-white/20 text-[#D4AF37] flex items-center justify-center font-bold text-[10px] tracking-widest">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {t(step.titleKey)}
              </h3>
              <p className="text-sm text-[#9B9B9B] leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
