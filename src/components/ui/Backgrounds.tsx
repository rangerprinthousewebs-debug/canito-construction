"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "mesh" | "noise" | "grid" | "glow" | "dark" | "ambient";
}

export default function Backgrounds({
  className,
  variant = "dark",
  children,
  ...props
}: BackgroundProps) {
  const baseStyle = "absolute inset-0 z-0 overflow-hidden pointer-events-none";

  if (variant === "ambient") {
    return (
      <div className={twMerge(baseStyle, "bg-[#0B0B0B]", className)} {...props}>
        {/* Animated ambient light 1 */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#D4AF37]/4 blur-[140px] animate-mesh-1" />
        {/* Animated ambient light 2 */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-white/2 blur-[130px] animate-mesh-2" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        {children}
      </div>
    );
  }

  const variants = {
    dark: "bg-[#0B0B0B]",
    mesh: "bg-[#0B0B0B] bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]",
    noise: "bg-[#0B0B0B] opacity-35 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:16px_16px]",
    grid: "bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]",
    glow: "absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#D4AF37]/5 blur-[120px] animate-pulse-slow",
  };

  return (
    <div
      className={twMerge(clsx(baseStyle, variants[variant as keyof typeof variants], className))}
      {...props}
    >
      {children}
    </div>
  );
}
