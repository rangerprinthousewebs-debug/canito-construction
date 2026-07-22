"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { submitLead } from "@/utils/formSubmitter";
import Button from "@/components/ui/Button";

const leadSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  city: z.string().min(2, { message: "Please enter your city." }),
  service: z.string().min(2, { message: "Please select a service type." }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, { message: "Please describe your project (minimum 10 characters)." }),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setStatus("loading");
    const success = await submitLead(data);
    if (success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25 rounded-full flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-white">Request Submitted!</h3>
        <p className="text-[#9B9B9B] max-w-md mx-auto text-sm leading-relaxed">
          {t("success")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="form-name" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">First Name</label>
          <input
            id="form-name"
            type="text"
            {...register("name")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="John"
          />
          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="form-lastname" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">Last Name</label>
          <input
            id="form-lastname"
            type="text"
            {...register("lastName")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="Doe"
          />
          {errors.lastName && <span className="text-xs text-red-500 mt-1">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="form-email" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">{t("email")}</label>
          <input
            id="form-email"
            type="email"
            {...register("email")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="john@example.com"
          />
          {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="form-phone" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">{t("phone")}</label>
          <input
            id="form-phone"
            type="tel"
            {...register("phone")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="(512) 555-0199"
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="form-city" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">City / Location</label>
          <input
            id="form-city"
            type="text"
            {...register("city")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="Kyle"
          />
          {errors.city && <span className="text-xs text-red-500 mt-1">{errors.city.message}</span>}
        </div>

        {/* Service */}
        <div className="flex flex-col">
          <label htmlFor="form-service" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">{t("service")}</label>
          <select
            id="form-service"
            {...register("service")}
            className="px-5 py-4 rounded-xl bg-[#141414] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
          >
            <option value="">{t("selectService")}</option>
            <option value="interior-remodeling">Interior Remodeling</option>
            <option value="exterior-remodeling">Exterior Remodeling</option>
            <option value="drywall">Drywall</option>
            <option value="painting">Painting</option>
            <option value="flooring">Flooring</option>
            <option value="carpentry">Carpentry</option>
            <option value="handyman">Handyman</option>
            <option value="commercial-improvements">Commercial Improvements</option>
            <option value="custom-renovations">Custom Renovations</option>
          </select>
          {errors.service && <span className="text-xs text-red-500 mt-1">{errors.service.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Budget */}
        <div className="flex flex-col">
          <label htmlFor="form-budget" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">Estimated Budget (Optional)</label>
          <input
            id="form-budget"
            type="text"
            {...register("budget")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="$5,000 - $15,000"
          />
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          <label htmlFor="form-timeline" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">Estimated Timeline (Optional)</label>
          <input
            id="form-timeline"
            type="text"
            {...register("timeline")}
            className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50"
            placeholder="Next 2-4 Weeks"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label htmlFor="form-message" className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2">{t("message")}</label>
        <textarea
          id="form-message"
          rows={4}
          {...register("message")}
          className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none"
          placeholder="Briefly describe your project goals..."
        />
        {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message.message}</span>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">
          {t("error")}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full h-14"
        loading={status === "loading"}
      >
        Submit Request
      </Button>
    </form>
  );
}
