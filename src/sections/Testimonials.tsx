"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import Card from "@/components/ui/Card";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

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

  // GPU-only animations: no filter/blur
  const itemReveal = (idx: number) => ({
    hidden: { opacity: 0, y: 30 },
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
    <Section id="testimonials" className="bg-[#0B0B0B] border-t border-white/5 scroll-mt-20 py-32 relative">
      <div className="absolute top-[20%] left-[-10%] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/1 blur-[110px] pointer-events-none" />

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

        {/* Testimonial Cards Grid */}
        <Grid cols={3} gap={6}>
          {list.map((item, index) => (
            <m.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemReveal(index)}
            >
              <Card variant="feature" className="p-8 flex flex-col justify-between h-full min-h-[260px] group border border-white/10 glass-card">
                {/* Rating stars */}
                <div className="flex space-x-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-base drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">★</span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-white/80 leading-relaxed italic mb-6 flex-grow">
                  &ldquo;{t(item.commentKey)}&rdquo;
                </p>

                {/* Client info — h3 instead of h4 to preserve heading hierarchy (h2 → h3) */}
                <div className="border-t border-white/5 pt-4">
                  <h3 className="font-bold text-white text-xs tracking-tight">
                    {t(item.nameKey)}
                  </h3>
                  <p className="text-[10px] text-[#9B9B9B] mt-0.5 uppercase tracking-wider font-bold">
                    {t(item.cityKey)}
                  </p>
                </div>
              </Card>
            </m.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
