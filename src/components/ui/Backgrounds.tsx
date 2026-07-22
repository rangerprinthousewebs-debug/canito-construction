"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "mesh" | "noise" | "grid" | "glow" | "dark";
}

export default function Backgrounds({
  className,
  variant = "dark",
  children,
  ...props
}: BackgroundProps) {
  const baseStyle = "absolute inset-0 z-0 overflow-hidden pointer-events-none";

  const variants = {
    dark: "bg-[#0B0B0B]",
    mesh: "bg-[#0B0B0B] bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]",
    noise: "bg-[#0B0B0B] opacity-35 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:16px_16px]",
    grid: "bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]",
    glow: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/5 blur-[120px]",
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
