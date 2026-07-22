"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type LayoutProps = React.HTMLAttributes<HTMLDivElement>;

// Container component
export function Container({ className, children, ...props }: LayoutProps) {
  return (
    <div
      className={twMerge("max-w-7xl mx-auto px-6 w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Section component
export interface SectionProps extends LayoutProps {
  id?: string;
}

export function Section({ className, children, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={twMerge("py-24 sm:py-32 scroll-mt-20 relative z-10", className)}
      {...props}
    >
      {children}
    </section>
  );
}

// Grid component
export interface GridProps extends LayoutProps {
  cols?: 1 | 2 | 3 | 4 | 12;
  gap?: 4 | 6 | 8 | 12;
}

export function Grid({
  className,
  children,
  cols = 12,
  gap = 6,
  ...props
}: GridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    12: "grid-cols-1 lg:grid-cols-12",
  };

  const gapClasses = {
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    12: "gap-12",
  };

  return (
    <div
      className={twMerge(
        clsx("grid", colClasses[cols], gapClasses[gap], className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Stack helper component
export function Stack({ className, children, ...props }: LayoutProps) {
  return (
    <div
      className={twMerge("flex flex-col space-y-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Flex helper component
export function Flex({ className, children, ...props }: LayoutProps) {
  return (
    <div
      className={twMerge("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}
