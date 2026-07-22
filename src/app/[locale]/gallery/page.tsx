import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Section, Container } from "@/components/ui/Layouts";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Backgrounds from "@/components/ui/Backgrounds";
import { typography } from "@/design-system/tokens";
import GalleryContent from "@/components/portfolio/GalleryContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return {
    title: locale === "es" ? "Galería de Proyectos Premium | Canito Construction" : "Premium Projects Gallery | Canito Construction",
    description: locale === "es" ? "Explore nuestro portafolio de remodelaciones de lujo en Austin y Kyle, TX." : "Explore our luxury remodeling and structural construction portfolio in Austin and Kyle, TX.",
    alternates: {
      canonical: "/gallery",
      languages: {
        en: "/en/gallery",
        es: "/es/gallery",
      },
    },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <SmoothScroll>
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Gallery Hero */}
        <section className="relative py-24 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
          <Backgrounds variant="mesh" />
          <Backgrounds variant="glow" />
          
          <Container className="relative z-10 text-left">
            <div className="mb-6">
              <Breadcrumbs homeText={locale === "es" ? "Inicio" : "Home"} />
            </div>
            
            <div className="max-w-3xl mt-12">
              <Badge variant="premium" className="mb-6">
                Premium Gallery
              </Badge>
              <h1 className={`${typography.displayL} text-white mb-6`}>
                Our Portfolio
              </h1>
              <p className="text-base sm:text-lg text-[#9B9B9B] leading-relaxed max-w-xl">
                Explore hand-crafted structural builds, kitchens, bathrooms, and modern restorations delivered across Central Texas.
              </p>
            </div>
          </Container>
        </section>

        {/* Portfolio Showcase Grid */}
        <Section className="bg-[#0B0B0B]">
          <Container>
            <GalleryContent locale={locale} />
          </Container>
        </Section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
