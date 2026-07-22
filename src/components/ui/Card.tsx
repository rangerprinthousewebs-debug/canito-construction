"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "glass" | "service" | "project" | "feature" | "stats";
}

export default function Card({
  className,
  children,
  variant = "base",
  ...props
}: CardProps) {
  const baseStyle =
    "relative overflow-hidden transition-all duration-500 rounded-3xl border border-white/5 bg-white/[0.01] glass-card";

  const variants = {
    base: "",
    glass: "backdrop-blur-lg bg-white/[0.01] hover:bg-[#D4AF37]/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
    service: "p-8 hover:bg-white/[0.03] group hover:scale-[1.02] active:scale-[0.98]",
    project: "group aspect-[4/3] flex flex-col justify-end p-8 hover:scale-[1.02]",
    feature: "p-8 hover:bg-white/[0.02] flex flex-col justify-between min-h-[220px] group hover:scale-[1.02] active:scale-[0.98]",
    stats: "flex flex-col items-center justify-center p-6 bg-white/[0.01] backdrop-blur-sm",
  };

  return (
    <div
      className={twMerge(clsx(baseStyle, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
}
