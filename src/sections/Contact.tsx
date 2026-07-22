"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/FormElements";
import { Section, Container, Grid } from "@/components/ui/Layouts";
import { typography } from "@/design-system/tokens";
import { submitLead } from "@/utils/formSubmitter";

export default function Contact() {
  const t = useTranslations("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contactSchema = zod.object({
    name: zod.string().min(3, { message: t("validation.name") }),
    email: zod.string().email({ message: t("validation.email") }),
    phone: zod.string().min(7, { message: t("validation.phone") }),
    service: zod.string().min(1, { message: t("validation.service") }),
    message: zod.string().min(10, { message: t("validation.message") }),
  });

  type ContactFormData = zod.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const success = await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      message: data.message,
    });

    if (success) {
      setSubmitStatus("success");
      reset();
    } else {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

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
    <Section id="contact" className="border-t border-white/5 scroll-mt-20 py-32 relative overflow-hidden">
      {/* Soft background light */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#D4AF37]/2 blur-[120px] pointer-events-none" />

      <Container>
        <Grid cols={12} gap={12}>
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cinematicReveal(0)}
                className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4"
              >
                {t("title")}
              </motion.div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cinematicReveal(0.1)}
                className={`${typography.headingXL} text-white mb-6 font-extrabold tracking-tight`}
              >
                {t("title")}
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cinematicReveal(0.2)}
                className="text-[#9B9B9B] leading-relaxed mb-10 text-sm"
              >
                {t("subtitle")}
              </motion.p>
            </div>

            {/* Direct Contacts Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 group-hover:border-[#D4AF37]/30 text-[#9B9B9B] group-hover:text-[#D4AF37] transition-all duration-300">
                  <Icon name="phone" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9B9B9B] font-semibold mb-0.5">Call Us</div>
                  <a href="tel:+15125637287" className="text-white hover:text-[#D4AF37] font-medium transition-colors duration-300">(512) 563-7287</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 group-hover:border-[#D4AF37]/30 text-[#9B9B9B] group-hover:text-[#D4AF37] transition-all duration-300">
                  <Icon name="mail" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9B9B9B] font-semibold mb-0.5">Email Us</div>
                  <a href="mailto:info@canitoconstruction.com" className="text-white hover:text-[#D4AF37] font-medium transition-colors duration-300">info@canitoconstruction.com</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 group-hover:border-[#D4AF37]/30 text-[#9B9B9B] group-hover:text-[#D4AF37] transition-all duration-300">
                  <Icon name="mapPin" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9B9B9B] font-semibold mb-0.5">Location</div>
                  <span className="text-white font-medium">Kyle, Texas & Surrounding Areas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cinematicReveal(0.15)}
              className="p-8 sm:p-12 rounded-[32px] border border-white/10 glass-card relative"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name */}
                <Input
                  id="name"
                  label={t("name")}
                  type="text"
                  error={errors.name?.message}
                  {...register("name")}
                />

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    id="email"
                    label={t("email")}
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <Input
                    id="phone"
                    label={t("phone")}
                    type="tel"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>

                {/* Project Type */}
                <Select
                  id="service"
                  label={t("service")}
                  placeholder={t("selectService")}
                  error={errors.service?.message}
                  {...register("service")}
                >
                  <option value="residential" className="bg-[#0B0B0B] text-white">Residential Remodeling</option>
                  <option value="commercial" className="bg-[#0B0B0B] text-white">Commercial Construction</option>
                  <option value="masonry" className="bg-[#0B0B0B] text-white">Concrete & Masonry</option>
                  <option value="roofing" className="bg-[#0B0B0B] text-white">Roofing & Siding</option>
                </Select>

                {/* Project Details */}
                <Textarea
                  id="message"
                  label={t("message")}
                  error={errors.message?.message}
                  {...register("message")}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="w-full relative group overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                  rightIcon={!isSubmitting && <Icon name="send" className="w-4 h-4" />}
                >
                  {t("submit")}
                </Button>

                {/* Status Alert */}
                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                    {t("success")}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                    {t("error")}
                  </div>
                )}

              </form>
            </motion.div>
          </div>

        </Grid>
      </Container>
    </Section>
  );
}
