"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold uppercase tracking-wider rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 focus:ring-offset-[#0B0B0B] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#D4AF37] to-[#AA8413] hover:from-white hover:to-white text-black font-bold shadow-lg shadow-[#D4AF37]/10 hover:shadow-white/10 active:scale-95",
      secondary:
        "bg-white text-black hover:bg-[#D4AF37] active:scale-95",
      outline:
        "bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white active:scale-95",
      ghost:
        "bg-transparent hover:bg-white/5 text-white active:bg-white/10",
      link:
        "bg-transparent text-[#D4AF37] hover:text-white underline p-0 rounded-none shadow-none focus:ring-0",
      danger:
        "bg-red-600 hover:bg-red-500 text-white active:scale-95 focus:ring-red-500/50",
    };

    const sizes = {
      xs: "text-[10px] px-3 py-1.5",
      sm: "text-xs px-4 py-2",
      md: "text-xs px-6 py-3",
      lg: "text-xs px-8 py-4",
      xl: "text-sm px-10 py-5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {loading && <Icon name="spinner" className="animate-spin w-4 h-4 mr-2" />}
        {!loading && leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
