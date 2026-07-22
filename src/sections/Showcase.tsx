"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";
import { projectsRegistry } from "@/data/projects";
import { Link } from "@/i18n/routing";

export default function Showcase() {
  const t = useTranslations("Projects");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Section id="projects" className="overflow-hidden scroll-mt-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
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
              className={`${typography.headingXL} text-white`}
            >
              {t("subtitle")}
            </motion.h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollPrev}
              className="p-3.5 rounded-full border border-white/10 hover:border-white text-white hover:text-[#D4AF37] transition-all bg-[#0B0B0B] cursor-pointer"
              aria-label="Previous Project"
            >
              <Icon name="chevronLeft" className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3.5 rounded-full border border-white/10 hover:border-white text-white hover:text-[#D4AF37] transition-all bg-[#0B0B0B] cursor-pointer"
              aria-label="Next Project"
            >
              <Icon name="chevronRight" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {projectsRegistry.map((project, index) => (
              <div
                key={project.slug}
                className="flex-[0_0_100%] min-w-0 pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <Card variant="project">
                    {/* Image Background */}
                    <Image
                      src={project.mainImage}
                      alt={project.category}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105 z-0"
                      priority={index === 0}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent z-10" />

                    {/* Info */}
                    <div className="relative z-20 transition-transform duration-300 group-hover:translate-y-[-5px] text-left">
                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {project.category}
                      </h3>
                      <p className="text-[#9B9B9B] text-xs font-semibold uppercase tracking-wider">
                        {project.city}, {project.state}
                      </p>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
