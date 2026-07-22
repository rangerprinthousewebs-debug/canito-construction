export interface Project {
  id: string;
  slug: string;
  category: string;
  city: string;
  state: string;
  propertyType: string;
  associatedService: string;
  mainImage: string;
  galleryImages: string[];
  hasBeforeAfter: boolean;
  beforeImg?: string;
  afterImg?: string;
  date: string;
  duration: string;
  area: string;
  materials: string[];
  tags: string[];
}
