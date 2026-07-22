"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Container } from "@/components/ui/Layouts";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Layout Exception caught:", error);
  }, [error]);

  return (
    <SmoothScroll>
      <Navbar />

      <main className="flex-grow pt-24 min-h-screen flex items-center justify-center bg-[#0B0B0B]">
        <Container className="text-center py-20">
          <Badge variant="premium" className="mb-6">
            Error
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            Something went wrong
          </h1>
          <p className="text-base sm:text-lg text-[#9B9B9B] max-w-md mx-auto mb-10 leading-relaxed">
            An unexpected error occurred during rendering. Please try again or contact our team if the issue persists.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="primary" onClick={() => reset()}>
              Try again
            </Button>
            <Link
              href="/"
              className="px-6 py-3 border border-white/10 hover:border-white rounded-full text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Go home
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
