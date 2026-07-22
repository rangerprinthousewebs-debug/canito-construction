"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { fadeUp } from "@/design-system/motion";

export default function FinalCTA() {

  return (
    <section className="py-32 bg-[#0B0B0B] relative z-10 border-t border-white/5 overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] z-0" />
      
      <Container className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0, 0.6)}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Accent Gold Badge */}
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-6">
            Get Started Today
          </span>

          {/* Heading */}
          <h2 className={`${typography.headingXL} text-white mb-8 max-w-2xl leading-tight`}>
            Ready to design your luxury space? Let&apos;s build it.
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#9B9B9B] max-w-xl leading-relaxed mb-12">
            Schedule an on-site consultation with our expert team in Kyle, Texas and receive a free comprehensive estimate.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                const target = document.querySelector("#contact");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              rightIcon={<Icon name="arrowRight" className="w-4 h-4" />}
            >
              Request Estimate
            </Button>
            <a
              href="tel:+15125550199"
              className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white rounded-full text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Icon name="phone" className="w-4 h-4 text-[#D4AF37]" />
              Call (512) 555-0199
            </a>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
