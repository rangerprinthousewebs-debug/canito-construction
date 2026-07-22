"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { containerWidth, zIndex, transition } from "@/design-system/tokens";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: t("services"), href: "#services" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ];

  const toggleLanguage = () => {
    return currentLocale === "en" ? "es" : "en";
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 ${zIndex.sticky} ${transition} ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "py-4 bg-[#0B0B0B]/85 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
          : "py-6 bg-transparent"
      }`}
    >
      <div className={`${containerWidth} flex items-center justify-between`}>
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Canito Construction Home">
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
            CANITO<span className="text-[#D4AF37] ml-1">CONSTRUCTION</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav role="navigation" aria-label="Main Navigation" className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#9B9B9B] hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Navigation CTA buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Toggle */}
          <Link
            href={pathname}
            locale={toggleLanguage()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            aria-label="Change Language"
          >
            <Icon name="globe" className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="uppercase">{currentLocale === "en" ? "ES" : "EN"}</span>
          </Link>

          {/* Quick Call */}
          <a
            href="tel:+15125550199"
            className="text-xs font-semibold text-white hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 focus:outline-none focus:text-[#D4AF37]"
            aria-label="Call Canito Construction"
          >
            <Icon name="phone" className="w-3.5 h-3.5" />
            <span>Call Now</span>
          </a>

          {/* Request Estimate */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const target = document.querySelector("#contact");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Request Estimate"
          >
            {t("getQuote")}
          </Button>
        </div>

        {/* Mobile Toggle & Language */}
        <div className="md:hidden flex items-center space-x-4">
          <Link
            href={pathname}
            locale={toggleLanguage()}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-white focus:outline-none"
            aria-label="Change Language"
          >
            <Icon name="globe" className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="uppercase">{currentLocale === "en" ? "ES" : "EN"}</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[#D4AF37] transition-colors p-1 focus:outline-none focus:text-[#D4AF37]"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <Icon name="close" className="w-6 h-6" /> : <Icon name="menu" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#0B0B0B] border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-12">
                <span className="font-extrabold text-lg text-white">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#9B9B9B] hover:text-white p-1"
                  aria-label="Close menu"
                >
                  <Icon name="close" className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-2xl font-bold text-[#9B9B9B] hover:text-white transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer CTAs / Contacts */}
            <div className="space-y-6 border-t border-white/5 pt-6">
              <a
                href="tel:+15125550199"
                className="w-full py-4 border border-white/10 hover:border-white rounded-xl text-white font-semibold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="phone" className="w-4 h-4 text-[#D4AF37]" />
                Call Now: (512) 555-0199
              </a>
              <Button
                variant="primary"
                size="lg"
                className="w-full text-center"
                onClick={() => {
                  setIsOpen(false);
                  const target = document.querySelector("#contact");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("getQuote")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
