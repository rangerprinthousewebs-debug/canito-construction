"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

interface TestimonialItem {
  commentKey: string;
  nameKey: string;
  cityKey: string;
  rating: number;
}

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  const list: TestimonialItem[] = [
    { commentKey: "client1.comment", nameKey: "client1.name", cityKey: "client1.city", rating: 5 },
    { commentKey: "client2.comment", nameKey: "client2.name", cityKey: "client2.city", rating: 5 },
    { commentKey: "client3.comment", nameKey: "client3.name", cityKey: "client3.city", rating: 5 },
  ];

  return (
    <Section id="testimonials" className="bg-[#0B0B0B] border-t border-white/5 scroll-mt-20">
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

        {/* Testimonial Cards Grid */}
        <Grid cols={3} gap={6}>
          {list.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(index * 0.1, 0.6)}
            >
              <Card variant="feature" className="p-8 sm:p-10 flex flex-col justify-between h-full min-h-[300px]">
                {/* Rating stars */}
                <div className="flex space-x-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-lg">★</span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-white/80 leading-relaxed italic mb-8 flex-grow">
                  &ldquo;{t(item.commentKey)}&rdquo;
                </p>

                {/* Client info */}
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-sm tracking-tight">
                    {t(item.nameKey)}
                  </h4>
                  <p className="text-xs text-[#9B9B9B] mt-0.5">
                    {t(item.cityKey)}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
