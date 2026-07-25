import Script from "next/script";

/**
 * Analytics — Server Component
 *
 * Loads Google Analytics using next/script with strategy="afterInteractive"
 * so the script never blocks the initial render or delays LCP.
 * Replace GA_TRACKING_ID with the real tracking ID when ready.
 */
export default function Analytics() {
  const GA_TRACKING_ID = ""; // e.g. "G-XXXXXXXXXX"

  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
