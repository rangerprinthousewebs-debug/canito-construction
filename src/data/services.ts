import { IconType } from "@/components/ui/Icon";

export interface ServiceData {
  slug: string;
  icon: IconType;
  translationKey: string;
  hasBeforeAfter: boolean;
  beforeImg?: string;
  afterImg?: string;
  galleryImages: string[];
}

export const servicesRegistry: ServiceData[] = [
  {
    slug: "interior-remodeling",
    icon: "home",
    translationKey: "interior",
    hasBeforeAfter: true,
    beforeImg: "/images/before_kitchen.jpg",
    afterImg: "/images/project2.jpg",
    galleryImages: ["/images/project2.jpg", "/images/project3.jpg", "/images/project1.jpg"],
  },
  {
    slug: "exterior-remodeling",
    icon: "layers",
    translationKey: "exterior",
    hasBeforeAfter: false,
    galleryImages: ["/images/project1.jpg", "/images/project2.jpg", "/images/project3.jpg"],
  },
  {
    slug: "painting",
    icon: "pen",
    translationKey: "painting",
    hasBeforeAfter: false,
    galleryImages: ["/images/project2.jpg", "/images/project3.jpg", "/images/project1.jpg"],
  },
  {
    slug: "drywall",
    icon: "shield",
    translationKey: "drywall",
    hasBeforeAfter: false,
    galleryImages: ["/images/project1.jpg", "/images/project2.jpg", "/images/project3.jpg"],
  },
  {
    slug: "flooring",
    icon: "layers",
    translationKey: "flooring",
    hasBeforeAfter: false,
    galleryImages: ["/images/project3.jpg", "/images/project2.jpg", "/images/project1.jpg"],
  },
  {
    slug: "carpentry",
    icon: "pen",
    translationKey: "carpentry",
    hasBeforeAfter: false,
    galleryImages: ["/images/project2.jpg", "/images/project1.jpg", "/images/project3.jpg"],
  },
  {
    slug: "handyman",
    icon: "users",
    translationKey: "handyman",
    hasBeforeAfter: false,
    galleryImages: ["/images/project3.jpg", "/images/project2.jpg", "/images/project1.jpg"],
  },
  {
    slug: "commercial-improvements",
    icon: "briefcase",
    translationKey: "commercial",
    hasBeforeAfter: false,
    galleryImages: ["/images/project1.jpg", "/images/project3.jpg", "/images/project2.jpg"],
  },
  {
    slug: "custom-renovations",
    icon: "award",
    translationKey: "custom",
    hasBeforeAfter: false,
    galleryImages: ["/images/project2.jpg", "/images/project3.jpg", "/images/project1.jpg"],
  },
];
