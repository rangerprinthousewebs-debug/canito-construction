import React from "react";

export default function SchemaOrg() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Canito Construction LLC",
    "url": "https://www.canitoconstruction.com",
    "logo": "https://www.canitoconstruction.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-512-555-0199",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["English", "Spanish"],
    },
    "sameAs": [
      "https://www.facebook.com/canitoconstruction",
      "https://www.instagram.com/canitoconstruction",
      "https://www.linkedin.com/company/canitoconstruction",
    ],
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ConstructionCompany",
    "name": "Canito Construction LLC",
    "image": "https://www.canitoconstruction.com/images/project2.jpg",
    "@id": "https://www.canitoconstruction.com/#localbusiness",
    "url": "https://www.canitoconstruction.com",
    "telephone": "+1-512-555-0199",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Center St",
      "addressLocality": "Kyle",
      "addressRegion": "TX",
      "postalCode": "78640",
      "addressCountry": "US",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.9869",
      "longitude": "-97.8772",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00",
      },
    ],
    "areaServed": [
      "Kyle, TX",
      "Austin, TX",
      "Buda, TX",
      "San Marcos, TX",
      "Round Rock, TX",
      "Lockhart, TX",
      "Driftwood, TX",
      "Wimberley, TX",
      "New Braunfels, TX",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
    </>
  );
}
