"use client";

import React, { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/Icon";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down near the bottom, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEstimateClick = () => {
    // Scroll to contact form anchors if present on page
    const target = document.querySelector("#contact-service") || document.querySelector("form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on page, redirect to contact
      window.location.href = "/contact";
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0B0B0B]/90 backdrop-blur-md border-t border-white/5 md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-3 gap-3">
        {/* Call Now */}
        <a
          href="tel:+15125637287"
          className="flex flex-col items-center justify-center py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-white hover:text-[#D4AF37] transition-colors"
        >
          <Icon name="phone" className="w-4 h-4 mb-1 text-[#D4AF37]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/15125637287?text=Hola,%20me%20interesa%20solicitar%20una%20cotizacion%20para%20un%20proyecto."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-white hover:text-[#D4AF37] transition-colors"
        >
          <Icon name="users" className="w-4 h-4 mb-1 text-[#D4AF37]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Request Estimate */}
        <button
          onClick={handleEstimateClick}
          className="col-span-1 flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#D4AF37]/90 transition-colors cursor-pointer"
        >
          <Icon name="arrowRight" className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Quote</span>
        </button>
      </div>
    </div>
  );
}
