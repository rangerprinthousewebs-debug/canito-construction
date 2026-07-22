"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { projectsRegistry } from "@/data/projects";
import { Link } from "@/i18n/routing";

interface GalleryContentProps {
  locale: string;
}

export default function GalleryContent({ locale }: GalleryContentProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { label: locale === "es" ? "Todos" : "All Works", value: "all" },
    { label: locale === "es" ? "Interior" : "Interior", value: "interior-remodeling" },
    { label: locale === "es" ? "Exterior" : "Exterior", value: "exterior-remodeling" },
    { label: locale === "es" ? "Pisos" : "Flooring", value: "flooring" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projectsRegistry
    : projectsRegistry.filter((p) => p.associatedService === activeFilter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap items-center justify-start gap-3 mb-16 select-none">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeFilter === filter.value
                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/15"
                : "bg-white/[0.02] border border-white/10 text-[#9B9B9B] hover:text-white hover:border-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <Card variant="project" className="aspect-[4/3] relative rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-end p-8">
              <Image
                src={project.mainImage}
                alt={project.category}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105 z-0"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent z-10" />

              <div className="relative z-20 transition-transform duration-300 group-hover:translate-y-[-5px] text-left">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                  {project.category}
                </h3>
                <p className="text-[#9B9B9B] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon name="mapPin" className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {project.city}, {project.state}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
