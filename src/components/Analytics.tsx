"use client";

import React from "react";

export default function Analytics() {
  // Replace placeholders with client GA_TRACKING_ID in production
  const GA_TRACKING_ID = ""; // e.g. "G-XXXXXXXXXX"

  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
