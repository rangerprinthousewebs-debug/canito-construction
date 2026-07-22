import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { servicesRegistry } from "@/data/services";
import { projectsRegistry } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Backgrounds from "@/components/ui/Backgrounds";
import { typography } from "@/design-system/tokens";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";

const BeforeAfter = dynamic(() => import("@/sections/BeforeAfter"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all 9 services
export async function generateStaticParams() {
  const locales = ["en", "es"];
  const paths: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    servicesRegistry.forEach((service) => {
      paths.push({ locale, slug: service.slug });
    });
  });

  return paths;
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = servicesRegistry.find((s) => s.slug === slug);

  if (!service) return {};

  const t = await getTranslations({ locale, namespace: `ServicesPagesData.${service.translationKey}` });

  return {
    title: t("seoTitle"),
    description: t("seoDesc"),
    alternates: {
      canonical: `/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        es: `/es/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = servicesRegistry.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `ServicesPagesData.${service.translationKey}` });

  // Get related services (excluding current)
  const relatedServices = servicesRegistry
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const serviceProjects = projectsRegistry.filter((p) => p.associatedService === slug);

  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t("faq.q1"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a1"),
        },
      },
      {
        "@type": "Question",
        "name": t("faq.q2"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("faq.a2"),
        },
      },
    ],
  };

  // Service Schema JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t("title"),
    "description": t("seoDesc"),
    "provider": {
      "@type": "LocalBusiness",
      "name": "Canito Construction LLC",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kyle",
        "addressRegion": "TX",
        "addressCountry": "US",
      },
    },
  };

  return (
    <SmoothScroll>
      {/* Schema injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Navbar />

      <main className="flex-grow pt-24">
        {/* Service Hero */}
        <section className="relative py-32 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
          <Backgrounds variant="mesh" />
          <Backgrounds variant="glow" />
          
          <Container className="relative z-10 text-left">
            <div className="mb-6">
              <Breadcrumbs homeText={locale === "es" ? "Inicio" : "Home"} />
            </div>
            
            <div className="max-w-4xl mt-12">
              <Badge variant="premium" className="mb-6">
                Canito Service
              </Badge>
              <h1 className={`${typography.displayL} text-white mb-6`}>
                {t("title")}
              </h1>
              <p className="text-lg sm:text-xl text-[#9B9B9B] leading-relaxed max-w-2xl mb-10">
                {t("seoDesc")}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#contact-service"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37]/90 transition-colors"
                >
                  Request Estimate
                  <Icon name="arrowRight" className="w-4 h-4" />
                </a>
                <a
                  href="tel:+15125550199"
                  className="px-6 py-3 border border-white/10 hover:border-white rounded-full text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Icon name="phone" className="w-4 h-4 text-[#D4AF37]" />
                  Call Now
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Content Layout split */}
        <Section className="bg-[#0B0B0B]">
          <Container>
            <Grid cols={12} gap={8}>
              {/* Main Content Side */}
              <div className="lg:col-span-8 space-y-24 text-left">
                {/* Description */}
                <div>
                  <h2 className={`${typography.headingL} text-white mb-6`}>
                    About our service
                  </h2>
                  <p className="text-base text-[#9B9B9B] leading-relaxed">
                    {t("longDesc")}
                  </p>
                </div>

                {/* Benefits */}
                <div className="border-t border-white/5 pt-16">
                  <h3 className={`${typography.headingM} text-white mb-10`}>
                    Key Advantages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {["b1", "b2", "b3"].map((key) => (
                      <Card key={key} variant="feature" className="p-6 min-h-0 flex flex-col justify-start">
                        <div className="p-3 w-10 h-10 rounded-lg bg-white/[0.02] border border-white/15 text-[#D4AF37] mb-6 flex items-center justify-center">
                          <Icon name="award" className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-white text-sm mb-2">
                          {t(`benefits.${key}Title`)}
                        </h4>
                        <p className="text-xs text-[#9B9B9B] leading-relaxed">
                          {t(`benefits.${key}Desc`)}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="border-t border-white/5 pt-16">
                  <h3 className={`${typography.headingM} text-white mb-10`}>
                    Execution Timeline
                  </h3>
                  <div className="flex flex-col space-y-8 relative pl-8">
                    <div className="absolute top-0 bottom-0 left-[15px] w-[1px] bg-white/10 z-0" />
                    {["step1", "step2", "step3"].map((key, idx) => (
                      <div key={key} className="relative z-10 flex flex-col">
                        <div className="absolute left-[-42px] top-0 w-8 h-8 rounded-full bg-[#0B0B0B] border border-white/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1 tracking-tight">
                          {t(`timeline.${key}`)}
                        </h4>
                        <p className="text-sm text-[#9B9B9B] leading-relaxed">
                          {t(`timeline.${key}Desc`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before After if relevant */}
                {service.hasBeforeAfter && (
                  <div className="border-t border-white/5 pt-16">
                    <BeforeAfter />
                  </div>
                )}

                {/* Photo Gallery */}
                <div className="border-t border-white/5 pt-16">
                  <h3 className={`${typography.headingM} text-white mb-10`}>
                    Showcase Gallery & Projects
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {serviceProjects.length > 0 ? (
                      serviceProjects.map((project) => (
                        <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                          <Card variant="project" className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-end p-6">
                            <Image
                              src={project.mainImage}
                              alt={project.category}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105 z-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent z-10" />
                            <div className="relative z-20 text-left">
                              <h4 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors">{project.category}</h4>
                              <p className="text-xs text-[#9B9B9B]">{project.city}, {project.state}</p>
                            </div>
                          </Card>
                        </Link>
                      ))
                    ) : (
                      service.galleryImages.map((src, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 group">
                          <Image
                            src={src}
                            alt="Showcase Gallery Image"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* FAQ */}
                <div className="border-t border-white/5 pt-16">
                  <h3 className={`${typography.headingM} text-white mb-6`}>
                    Service FAQs
                  </h3>
                  <div className="space-y-6">
                    {["q1", "q2"].map((key) => (
                      <div key={key} className="border-b border-white/5 pb-6">
                        <h4 className="text-base font-bold text-white mb-2">
                          {t(`faq.${key}`)}
                        </h4>
                        <p className="text-sm text-[#9B9B9B] leading-relaxed">
                          {t(`faq.${key === "q1" ? "a1" : "a2"}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final CTA specific for the service */}
                <Card variant="glass" className="p-8 sm:p-12 text-center border-[#D4AF37]/20 flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Need professional {t("title")}?
                  </h3>
                  <p className="text-[#9B9B9B] text-sm max-w-lg mb-8 leading-relaxed">
                    Contact Canito Construction LLC in Texas today for an on-site visit and free quote.
                  </p>
                  <a
                    href="#contact-service"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37]/90 transition-colors"
                  >
                    Request Free Estimate
                  </a>
                </Card>

              </div>

              {/* Sidebar Info Side (Desktop) */}
              <aside className="lg:col-span-4 space-y-6 text-left self-start lg:sticky lg:top-24">
                
                {/* Related services */}
                <Card className="p-6">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
                    Other Services
                  </h4>
                  <ul className="space-y-3">
                    {relatedServices.map((rel) => (
                      <li key={rel.slug}>
                        <Link
                          href={`/services/${rel.slug}`}
                          className="text-sm text-[#9B9B9B] hover:text-white transition-colors flex items-center justify-between"
                        >
                          <span>{rel.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</span>
                          <Icon name="arrowRight" className="w-3.5 h-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Working hours / Schedule */}
                <Card className="p-6">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
                    Hours & Info
                  </h4>
                  <ul className="space-y-3 text-xs text-[#9B9B9B]">
                    <li className="flex justify-between">
                      <span>Mon - Fri:</span>
                      <span className="text-white font-semibold">8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="text-white font-semibold">9:00 AM - 3:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="text-[#D4AF37] font-semibold">Closed</span>
                    </li>
                  </ul>
                </Card>

                {/* Quick Call */}
                <a
                  href="tel:+15125550199"
                  className="w-full py-4 border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#D4AF37]/5 rounded-xl text-[#D4AF37] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <Icon name="phone" className="w-4 h-4" />
                  Call (512) 555-0199
                </a>

              </aside>
            </Grid>
          </Container>
        </Section>

        {/* Contact preview Form anchor point */}
        <section id="contact-service" className="scroll-mt-20">
          <Section className="border-t border-white/5 bg-[#0B0B0B]">
            <Container>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4 block">Get a Quote</span>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Schedule Consultation</h2>
                <p className="text-[#9B9B9B] max-w-lg mx-auto text-sm leading-relaxed">
                  Fill in your details below and our team will prepare a localized custom estimate for {t("title")}.
                </p>
              </div>

              {/* Form container */}
              <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl border border-white/5 bg-white/[0.01]">
                <ContactForm />
              </div>
            </Container>
          </Section>
        </section>

      </main>

      <Footer />
    </SmoothScroll>
  );
}
