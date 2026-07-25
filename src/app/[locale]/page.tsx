import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero";
import TrustBar from "@/sections/TrustBar";

// Above-fold sections: imported statically for fast LCP + FCP
import Services from "@/sections/Services";

// Below-fold sections: dynamically imported to reduce initial JS bundle
// SSR is kept enabled on all sections (default) because they don't use browser-only APIs
const About = dynamic(() => import("@/sections/About"));
const WhyChooseUs = dynamic(() => import("@/sections/WhyChooseUs"));
const Showcase = dynamic(() => import("@/sections/Showcase"));
const BeforeAfter = dynamic(() => import("@/sections/BeforeAfter"));
const Testimonials = dynamic(() => import("@/sections/Testimonials"));
const WorkProcess = dynamic(() => import("@/sections/WorkProcess"));
const FAQ = dynamic(() => import("@/sections/FAQ"));
const FinalCTA = dynamic(() => import("@/sections/FinalCTA"));
const Contact = dynamic(() => import("@/sections/Contact"));
const Footer = dynamic(() => import("@/sections/Footer"));

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://www.canitoconstruction.com";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      // Absolute canonical URL required — relative canonicals cause indexing issues
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
      url: `${BASE_URL}/${locale}`,
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
