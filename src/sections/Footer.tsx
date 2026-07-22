"use client";

import { useTranslations } from "next-intl";
import { Container, Grid } from "@/components/ui/Layouts";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer role="contentinfo" className="bg-[#0B0B0B] border-t border-white/5 py-16 relative z-10 text-left">
      <Container>
        <Grid cols={12} gap={12} className="mb-16">
          
          {/* Tagline / Brand */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
              CANITO<span className="text-[#D4AF37] ml-1">CONSTRUCTION</span>
            </span>
            <p className="text-[#9B9B9B] max-w-sm text-sm leading-relaxed">
              {t("tagline")}
            </p>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              {t("license")}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {["services", "about", "projects", "contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={(e) => handleScrollTo(e, `#${link}`)}
                    className="text-sm text-[#9B9B9B] hover:text-white transition-colors duration-200 capitalize focus:outline-none focus:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-[#9B9B9B]">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Residential Remodeling</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Commercial Construction</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Concrete & Masonry</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Roofing & Siding</a>
              </li>
            </ul>
          </div>

          {/* Social Links / Contacts Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-6">Follow Us</h4>
            <div className="flex items-center space-x-3 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook Link" className="p-3 rounded-full bg-white/[0.02] border border-white/10 hover:border-[#D4AF37] text-[#9B9B9B] hover:text-[#D4AF37] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram Link" className="p-3 rounded-full bg-white/[0.02] border border-white/10 hover:border-[#D4AF37] text-[#9B9B9B] hover:text-[#D4AF37] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Link" className="p-3 rounded-full bg-white/[0.02] border border-white/10 hover:border-[#D4AF37] text-[#9B9B9B] hover:text-[#D4AF37] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

        </Grid>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9B9B9B]">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span>&copy; {year} Canito Construction LLC. {t("rights")}</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline text-white/10">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div>
            Designed and Developed by <a href="https://rangerprinthouse.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">Ranger Print House</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
