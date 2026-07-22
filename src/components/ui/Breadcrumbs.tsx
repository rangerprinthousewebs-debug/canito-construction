"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  homeText?: string;
}

export default function Breadcrumbs({ homeText = "Home" }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Split paths and remove empty items
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  // Generate breadcrumb items data
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { name, url };
  });

  // Schema.org JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeText,
        "item": "https://canitoconstruction.com",
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `https://canitoconstruction.com${item.url}`,
      })),
    ],
  };

  return (
    <>
      {/* Schema.org breadcrumb injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="flex py-3 px-4 rounded-lg bg-white/[0.02] border border-white/5 w-fit text-xs text-[#9B9B9B] select-none">
        <ol className="inline-flex items-center space-x-1.5 md:space-x-2.5">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-[#9B9B9B] hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              {homeText}
            </Link>
          </li>
          
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={index} className="inline-flex items-center">
                <ChevronRight className="w-3 h-3 text-white/20 mx-1" />
                {isLast ? (
                  <span className="text-[#D4AF37] font-semibold" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-[#9B9B9B] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
