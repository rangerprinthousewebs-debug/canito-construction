"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "outline" | "success" | "warning" | "premium" | "dark";
}

export default function Badge({
  className,
  children,
  variant = "primary",
  ...props
}: BadgeProps) {
  const baseStyle =
    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none";

  const variants = {
    primary: "bg-[#D4AF37] text-black",
    outline: "border border-white/20 text-white",
    success: "bg-green-500/10 border border-green-500/20 text-green-400",
    warning: "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400",
    premium: "border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]",
    dark: "bg-white/[0.03] border border-white/10 text-white",
  };

  return (
    <span
      className={twMerge(clsx(baseStyle, variants[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
