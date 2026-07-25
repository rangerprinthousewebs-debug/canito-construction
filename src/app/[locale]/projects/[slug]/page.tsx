import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectsRegistry } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Backgrounds from "@/components/ui/Backgrounds";
import { typography } from "@/design-system/tokens";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";

const BeforeAfter = dynamic(() => import("@/sections/BeforeAfter"));

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "es"];
  const paths: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    projectsRegistry.forEach((project) => {
      paths.push({ locale, slug: project.slug });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = projectsRegistry.find((p) => p.slug === slug);

  if (!project) return {};

  const t = await getTranslations({ locale, namespace: `ProjectsData.${project.slug}` });

  return {
    title: t("seoTitle"),
    description: t("seoDesc"),
    alternates: {
      canonical: `https://www.canitoconstruction.com/${locale}/projects/${slug}`,
      languages: {
        en: `https://www.canitoconstruction.com/en/projects/${slug}`,
        es: `https://www.canitoconstruction.com/es/projects/${slug}`,
        "x-default": `https://www.canitoconstruction.com/en/projects/${slug}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = projectsRegistry.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `ProjectsData.${project.slug}` });

  // JSON-LD structured data for project showcase
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": t("title"),
    "description": t("seoDesc"),
    "image": project.mainImage,
    "locationCreated": {
      "@type": "Place",
      "name": `${project.city}, ${project.state}`,
    },
    "creator": {
      "@type": "Organization",
      "name": "Canito Construction LLC",
    },
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <Navbar />

      <main className="flex-grow pt-24">
        {/* Project Hero */}
        <section className="relative py-32 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
          <Backgrounds variant="mesh" />
          <Backgrounds variant="glow" />
          
          <Container className="relative z-10 text-left">
            <div className="mb-6">
              <Breadcrumbs homeText={locale === "es" ? "Inicio" : "Home"} />
            </div>

            <div className="max-w-4xl mt-12">
              <Badge variant="premium" className="mb-6">
                Case Study
              </Badge>
              <h1 className={`${typography.displayL} text-white mb-6`}>
                {t("title")}
              </h1>
              <p className="text-lg sm:text-xl text-[#9B9B9B] leading-relaxed max-w-2xl">
                {t("descShort")}
              </p>
            </div>
          </Container>
        </section>

        {/* Project Details Section */}
        <Section className="bg-[#0B0B0B]">
          <Container>
            <Grid cols={12} gap={8}>
              {/* Left Main Details */}
              <div className="lg:col-span-8 space-y-16 text-left">
                {/* Description */}
                <div>
                  <h2 className={`${typography.headingL} text-white mb-6`}>
                    Project Overview
                  </h2>
                  <p className="text-base text-[#9B9B9B] leading-relaxed">
                    {t("descFull")}
                  </p>
                </div>

                {/* Challenges & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/5 pt-12">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-red-500">✕</span> The Challenge
                    </h3>
                    <p className="text-sm text-[#9B9B9B] leading-relaxed">
                      {t("challenges")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                      <span className="text-[#D4AF37]">✓</span> Solution Applied
                    </h3>
                    <p className="text-sm text-[#9B9B9B] leading-relaxed">
                      {t("solution")}
                    </p>
                  </div>
                </div>

                {/* Before / After Slider if enabled */}
                {project.hasBeforeAfter && (
                  <div className="border-t border-white/5 pt-12">
                    <BeforeAfter />
                  </div>
                )}

                {/* Project Video Showcase if present */}
                {project.videoUrl && (
                  <div className="border-t border-white/5 pt-12">
                    <h3 className={`${typography.headingM} text-white mb-8`}>
                      Project Video Walkthrough
                    </h3>
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 glass-card bg-black">
                      <video
                        src={project.videoUrl}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                        playsInline
                      />
                    </div>
                  </div>
                )}

                {/* Project Image Gallery */}
                <div className="border-t border-white/5 pt-12">
                  <h3 className={`${typography.headingM} text-white mb-8`}>
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.galleryImages.map((src, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 group">
                        <Image
                          src={src}
                          alt="Showcase Gallery Item"
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="border-t border-white/5 pt-12">
                  <Card variant="glass" className="p-8 italic text-white/90">
                    &ldquo;{t("testimonial")}&rdquo;
                    <span className="block mt-4 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      — Verified Client, {project.city}
                    </span>
                  </Card>
                </div>

              </div>

              {/* Right Sidebar specs */}
              <aside className="lg:col-span-4 space-y-6 text-left self-start lg:sticky lg:top-24">
                
                {/* Meta details specs */}
                <Card className="p-6">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-6">
                    Project Specifications
                  </h4>
                  <ul className="space-y-4 text-sm">
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-[#9B9B9B]">Location:</span>
                      <span className="text-white font-semibold">{project.city}, {project.state}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-[#9B9B9B]">Duration:</span>
                      <span className="text-white font-semibold">{project.duration}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-[#9B9B9B]">Dimensions:</span>
                      <span className="text-white font-semibold">{project.area}</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span className="text-[#9B9B9B]">Type:</span>
                      <span className="text-white font-semibold">{project.propertyType}</span>
                    </li>
                  </ul>
                </Card>

                {/* Materials used */}
                <Card className="p-6">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
                    Materials Sourced
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#9B9B9B]">
                    {project.materials.map((mat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">•</span>
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* CTAs */}
                <Link
                  href="/contact"
                  className="block w-full text-center px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37]/90 transition-colors"
                >
                  Request Estimate
                </Link>

              </aside>
            </Grid>
          </Container>
        </Section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
