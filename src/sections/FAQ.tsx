"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

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
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-200">
          {question}
        </span>
        <span className="text-[#D4AF37] font-bold text-xl ml-4 select-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-sm sm:text-base text-[#9B9B9B] leading-relaxed max-w-4xl">
              {answer}
            </p>
          </motion.div>
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

  // Schema.org FAQPage JSON-LD structured data
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
    <Section id="faq" className="scroll-mt-20 border-t border-white/5 bg-[#0B0B0B]">
      {/* FAQ Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0, 0.6)}
            className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
          >
            {t("title")}
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1, 0.6)}
            className={`${typography.headingXL} text-white mb-6`}
          >
            {t("subtitle")}
          </motion.h2>
        </div>

        {/* Accordion container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.2, 0.6)}
          className="max-w-4xl mr-auto text-left"
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
        </motion.div>
      </Container>
    </Section>
  );
}
