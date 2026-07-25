"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "framer-motion";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-white/5 py-6">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-200">
          {question}
        </span>
        <m.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-[#D4AF37] font-bold text-xl ml-4 select-none"
        >
          ＋
        </m.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-sm text-[#9B9B9B] leading-relaxed max-w-4xl">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { qKey: "q1", aKey: "a1" },
    { qKey: "q2", aKey: "a2" },
    { qKey: "q3", aKey: "a3" },
    { qKey: "q4", aKey: "a4" },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": t(faq.qKey),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(faq.aKey),
      },
    })),
  };

  return (
    <Section id="faq" className="scroll-mt-20 border-t border-white/5 bg-[#0B0B0B] py-32 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#D4AF37]/1 blur-[110px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("title")}
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${typography.headingXL} text-white font-extrabold tracking-tight mb-6`}
          >
            {t("subtitle")}
          </m.h2>
        </div>

        {/* Accordion container */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto text-left"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={t(faq.qKey)}
              answer={t(faq.aKey)}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </m.div>
      </Container>
    </Section>
  );
}
