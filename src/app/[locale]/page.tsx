import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero";
import TrustBar from "@/sections/TrustBar";
import Services from "@/sections/Services";
import About from "@/sections/About";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Showcase from "@/sections/Showcase";
import BeforeAfter from "@/sections/BeforeAfter";
import Testimonials from "@/sections/Testimonials";
import WorkProcess from "@/sections/WorkProcess";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
      url: `https://canitoconstruction.com/${locale}`,
      siteName: "Canito Construction LLC",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function LocalePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <WhyChooseUs />
        <Showcase />
        <BeforeAfter />
        <Testimonials />
        <WorkProcess />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
