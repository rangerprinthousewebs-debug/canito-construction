import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Canito Construction LLC",
    short_name: "Canito Construction LLC",
    description: "Premium construction and remodeling services in Kyle, Texas.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0B",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
