import { MetadataRoute } from "next";
import { servicesRegistry } from "@/data/services";
import { projectsRegistry } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://canitoconstruction.com";
  const locales = ["en", "es"];
  const staticPages = ["", "/gallery", "/contact"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static routes (Home, Gallery)
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    });
  });

  // Dynamic services pages
  locales.forEach((locale) => {
    servicesRegistry.forEach((service) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // Dynamic projects pages
  locales.forEach((locale) => {
    projectsRegistry.forEach((project) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
