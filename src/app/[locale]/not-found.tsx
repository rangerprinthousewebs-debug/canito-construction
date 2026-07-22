import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Container } from "@/components/ui/Layouts";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <SmoothScroll>
      <Navbar />

      <main className="flex-grow pt-24 min-h-screen flex items-center justify-center bg-[#0B0B0B]">
        <Container className="text-center py-20">
          <Badge variant="premium" className="mb-6">
            Error 404
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-[#9B9B9B] max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button variant="primary">Go back home</Button>
          </Link>
        </Container>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
