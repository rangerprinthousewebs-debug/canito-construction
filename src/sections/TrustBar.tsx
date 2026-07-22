"use client";

import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layouts";
import { fadeUp } from "@/design-system/motion";

export default function TrustBar() {
  const trustItems = [
    { icon: "shield", label: "Licensed" },
    { icon: "award", label: "Bonded" },
    { icon: "users", label: "Professional Team" },
    { icon: "layers", label: "Premium Materials" },
    { icon: "home", label: "Residential" },
    { icon: "briefcase", label: "Commercial" },
  ] as const;

  return (
    <section className="py-8 bg-white/[0.01] border-b border-white/5 relative z-10 overflow-hidden">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm text-[#9B9B9B] font-semibold tracking-wider uppercase select-none">
          {trustItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(idx * 0.1, 0.5)}
              className="flex items-center space-x-2.5 hover:text-white transition-colors duration-300"
            >
              <Icon name={item.icon} className="w-4 h-4 text-[#D4AF37]" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
