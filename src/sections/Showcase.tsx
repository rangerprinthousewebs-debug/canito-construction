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
import { projectsRegistry } from "@/data/projects";
import { Link } from "@/i18n/routing";

export default function Showcase() {
  const t = useTranslations("Projects");
  const [activeTab, setActiveTab] = React.useState<"remodeling" | "construction">("remodeling");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Re-initialize Embla carousel when activeTab changes to reset scroll position
  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, false);
    }
  }, [activeTab, emblaApi]);

  const filteredProjects = projectsRegistry.filter(
    (project) => project.projectType === activeTab
  );

  return (
    <Section id="projects" className="overflow-hidden scroll-mt-20 py-32 relative">
      <div className="absolute top-[20%] right-[-10%] w-[380px] h-[380px] rounded-full bg-[#D4AF37]/1 blur-[110px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
            >
              {t("title")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`${typography.headingXL} text-white font-extrabold tracking-tight`}
            >
              {t("subtitle")}
            </motion.h2>
          </div>

          {/* Carousel Arrows with Glow indicators */}
          <div className="flex items-center space-x-3">
            <button
              onClick={scrollPrev}
              className="p-3.5 rounded-full border border-white/10 hover:border-[#D4AF37]/50 text-[#9B9B9B] hover:text-[#D4AF37] transition-all bg-white/[0.01] hover:bg-white/[0.03] hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
              aria-label="Previous Project"
            >
              <Icon name="chevronLeft" className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3.5 rounded-full border border-white/10 hover:border-[#D4AF37]/50 text-[#9B9B9B] hover:text-[#D4AF37] transition-all bg-white/[0.01] hover:bg-white/[0.03] hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
              aria-label="Next Project"
            >
              <Icon name="chevronRight" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center justify-start gap-4 mb-12 border-b border-white/5 pb-6 select-none">
          <button
            onClick={() => setActiveTab("remodeling")}
            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "remodeling"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15"
                : "bg-white/[0.01] border border-white/10 text-[#9B9B9B] hover:text-white hover:border-white/30"
            }`}
          >
            Remodeling Projects
          </button>
          <button
            onClick={() => setActiveTab("construction")}
            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "construction"
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15"
                : "bg-white/[0.01] border border-white/10 text-[#9B9B9B] hover:text-white hover:border-white/30"
            }`}
          >
            Construction Projects
          </button>
        </div>

        {/* Embla Carousel Viewport */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="overflow-hidden" 
          ref={emblaRef}
        >
          <div className="flex -ml-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.slug}
                className="flex-[0_0_100%] min-w-0 pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <Card variant="project" className="relative group overflow-hidden border border-white/10 glass-card">
                    {/* Image Background with premium smooth zoom */}
                    <Image
                      src={project.mainImage}
                      alt={project.category}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                      priority={index === 0}
                    />

                    {/* Gradient Overlay for visual stability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent z-10" />

                    {/* Info display */}
                    <div className="relative z-20 transition-transform duration-500 ease-out group-hover:translate-y-[-4px] text-left">
                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {project.category}
                      </h3>
                      <p className="text-[#9B9B9B] text-[10px] font-bold uppercase tracking-wider">
                        {project.city}, {project.state}
                      </p>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
