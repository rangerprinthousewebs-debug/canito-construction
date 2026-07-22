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
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/ContactForm"));

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return {
    title: locale === "es" ? "Contacto y Cotizaciones | Canito Construction" : "Contact & Request Estimates | Canito Construction",
    description: locale === "es" ? "Solicite una cotización de remodelación gratuita. Contáctenos hoy en Kyle y Austin, TX." : "Request a free remodeling quote. Contact our team today in Kyle and Austin, TX.",
    alternates: {
      canonical: "/contact",
      languages: {
        en: "/en/contact",
        es: "/es/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  const contactOptions = [
    {
      icon: "phone" as const,
      title: "Call Direct",
      value: "(512) 563-7287",
      href: "tel:+15125637287",
    },
    {
      icon: "users" as const,
      title: "WhatsApp Chat",
      value: "Chat on WhatsApp",
      href: "https://wa.me/15125637287?text=Hola,%20me%20interesa%20solicitar%20una%20cotizacion%20para%20un%20proyecto.",
    },
    {
      icon: "briefcase" as const,
      title: "Email Inquiry",
      value: "info@canitoconstruction.com",
      href: "mailto:info@canitoconstruction.com",
    },
  ];

  return (
    <SmoothScroll>
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Contact Hero */}
        <section className="relative py-24 bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
          <Backgrounds variant="mesh" />
          <Backgrounds variant="glow" />
          
          <Container className="relative z-10 text-left">
            <div className="mb-6">
              <Breadcrumbs homeText={locale === "es" ? "Inicio" : "Home"} />
            </div>

            <div className="max-w-3xl mt-12">
              <Badge variant="premium" className="mb-6">
                Get in Touch
              </Badge>
              <h1 className={`${typography.displayL} text-white mb-6`}>
                Contact Our Team
              </h1>
              <p className="text-base sm:text-lg text-[#9B9B9B] leading-relaxed max-w-xl">
                Ready to transform your home or commercial space? Reach out below for professional advice and free project estimates.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Split Grid */}
        <Section className="bg-[#0B0B0B]">
          <Container>
            <Grid cols={12} gap={8}>
              {/* Form Section */}
              <div className="lg:col-span-7 space-y-8 bg-white/[0.01] border border-white/5 p-8 sm:p-12 rounded-3xl">
                <div className="text-left mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Request Estimate</h2>
                  <p className="text-sm text-[#9B9B9B]">Fill in the form below and we will prepare a personalized project schedule.</p>
                </div>
                <ContactForm />
              </div>

              {/* Direct Info & Map Side */}
              <div className="lg:col-span-5 space-y-6 text-left">
                {/* Contact parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {contactOptions.map((opt, idx) => (
                    <a
                      key={idx}
                      href={opt.href}
                      target={opt.href.startsWith("http") ? "_blank" : undefined}
                      rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block group"
                    >
                      <Card className="p-6 border-white/5 hover:border-[#D4AF37]/50 flex items-center gap-4 transition-all duration-300">
                        <div className="p-3 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37]">
                          <Icon name={opt.icon} className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#9B9B9B] block mb-1">
                            {opt.title}
                          </span>
                          <span className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                            {opt.value}
                          </span>
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>

                {/* Operations & coverage info */}
                <Card className="p-6">
                  <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">
                    Service Areas & Hours
                  </h3>
                  <ul className="space-y-3 text-xs text-[#9B9B9B]">
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span>Mon - Fri:</span>
                      <span className="text-white font-semibold">8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span>Saturday:</span>
                      <span className="text-white font-semibold">9:00 AM - 3:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span>Coverage:</span>
                      <span className="text-white font-semibold">Kyle, Austin & Central Texas</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Office:</span>
                      <span className="text-white font-semibold">100 Center St, Kyle, TX</span>
                    </li>
                  </ul>
                </Card>

                {/* Google Maps responsive iframe */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02]">
                  <iframe
                    title="Canito Construction Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3457.652033621415!2d-97.8793887!3d29.9868997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865cb465a39794cb%3A0xe543e3d937077a5!2sKyle%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale invert opacity-80"
                  />
                </div>

              </div>
            </Grid>
          </Container>
        </Section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
