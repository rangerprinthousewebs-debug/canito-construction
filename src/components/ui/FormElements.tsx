"use client";

import React, { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";

interface BaseFieldProps {
  label: string;
  error?: string;
  success?: boolean;
}

// Input Component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, id, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    return (
      <div className="flex flex-col text-left w-full">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            "w-full px-5 py-4 rounded-xl bg-white/[0.03] border text-white placeholder-white/20 focus:outline-none transition-colors",
            error
              ? "border-red-500 focus:border-red-500"
              : success
              ? "border-green-500 focus:border-green-500"
              : "border-white/10 focus:border-[#D4AF37]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 mt-1 font-medium">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, success, id, rows = 5, ...props }, ref) => {
    const defaultId = useId();
    const textareaId = id || defaultId;
    return (
      <div className="flex flex-col text-left w-full">
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2"
        >
          {label}
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={twMerge(
            "w-full px-5 py-4 rounded-xl bg-white/[0.03] border text-white placeholder-white/20 focus:outline-none transition-colors resize-none",
            error
              ? "border-red-500 focus:border-red-500"
              : success
              ? "border-green-500 focus:border-green-500"
              : "border-white/10 focus:border-[#D4AF37]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 mt-1 font-medium">{error}</span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// Select Component
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseFieldProps {
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, success, placeholder, children, id, ...props }, ref) => {
    const defaultId = useId();
    const selectId = id || defaultId;
    return (
      <div className="flex flex-col text-left w-full">
        <label
          htmlFor={selectId}
          className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9B] mb-2"
        >
          {label}
        </label>
        <select
          id={selectId}
          ref={ref}
          className={twMerge(
            "w-full px-5 py-4 rounded-xl bg-white/[0.03] border text-white placeholder-white/20 focus:outline-none transition-colors cursor-pointer appearance-none",
            error
              ? "border-red-500 focus:border-red-500"
              : success
              ? "border-green-500 focus:border-green-500"
              : "border-white/10 focus:border-[#D4AF37]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#0B0B0B] text-[#9B9B9B]">
              {placeholder}
            </option>
          )}
          {children}
        </select>
        {error && (
          <span className="text-xs text-red-500 mt-1 font-medium">{error}</span>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
