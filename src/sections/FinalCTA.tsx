"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";

export default function FinalCTA() {
  const cinematicReveal = (delay = 0) => ({
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  });

  return (
    <section className="py-36 bg-[#0B0B0B] relative z-10 border-t border-white/5 overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/3 blur-[120px] pointer-events-none animate-pulse-slow" />
      
      <Container className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cinematicReveal(0)}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Accent Gold Badge */}
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-6">
            Get Started Today
          </span>

          {/* Heading */}
          <h2 className={`${typography.headingXL} text-gradient-gold mb-6 max-w-2xl leading-tight font-extrabold`}>
            Ready to design your luxury space? Let&apos;s build it.
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#9B9B9B] max-w-md leading-relaxed mb-10 px-4">
            Schedule an on-site consultation with our expert team in Kyle, Texas and receive a free comprehensive estimate.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto relative group overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
              onClick={() => {
                const target = document.querySelector("#contact");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              rightIcon={<Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            >
              Request Estimate
            </Button>
            <a
              href="tel:+15125637287"
              className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 rounded-full text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/[0.02]"
            >
              <Icon name="phone" className="w-4 h-4 text-[#D4AF37]" />
              Call (512) 563-7287
            </a>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
