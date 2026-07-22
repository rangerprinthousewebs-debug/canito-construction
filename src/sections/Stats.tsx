"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { Container } from "@/components/ui/Layouts";
import { fadeUp } from "@/design-system/motion";

export default function Stats() {
  const t = useTranslations("Stats");

  const statItems = [
    { value: "15+", label: t("experience") },
    { value: "350+", label: t("projects") },
    { value: "100%", label: t("satisfaction") },
  ];

  return (
    <section className="py-20 bg-[#0B0B0B] relative z-10 border-b border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {statItems.map((stat, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp(idx * 0.15, 0.6)}
            >
              <Card variant="stats">
                <span className="text-5xl md:text-7xl font-extrabold text-[#D4AF37] mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#9B9B9B]">
                  {stat.label}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
