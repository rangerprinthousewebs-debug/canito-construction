# Developer Technical Guide - Canito Construction LLC

This technical documentation outlines the system architecture, component design guidelines, and maintenance procedures for the Canito Construction LLC Next.js application.

---

## 1. Architectural Overview & Directories
The site is built as a fully static localized application targeting Next.js 15, React 19, TailwindCSS v4, next-intl, and Framer Motion:

```text
canito-construction/
├── messages/                # Translation dictionaries (en.json, es.json)
├── src/
│   ├── app/                 # Localized page routers, manifests, sitemaps, and error views
│   ├── components/          # Reusable layouts, breadcrumbs, icons, and filter grids
│   ├── data/                # Data registries (services, projects)
│   ├── design-system/       # Tokens (colors, spacing, motion curves)
│   ├── sections/            # Visual layout sections (Hero, Showcase, BeforeAfter, FAQ, Contact)
│   ├── types/               # TypeScript models (Project interfaces)
│   └── utils/               # Decoupled submission APIs
```

---

## 2. Dynamic Registries & Data Management

### Adding a New Project Case Study
1. Open the project models in `src/types/project.ts` and verify requirements.
2. Edit `src/data/projects.ts` to add a new project entry in `projectsRegistry`:
   ```typescript
   {
     id: "unique-id",
     slug: "project-slug",
     category: "Category Name",
     city: "City",
     state: "TX",
     propertyType: "Residential",
     associatedService: "interior-remodeling", // matches service slug
     mainImage: "/images/project-image.jpg",
     galleryImages: ["/images/img1.jpg", "/images/img2.jpg"],
     hasBeforeAfter: false,
     date: "2026-07",
     duration: "3 Weeks",
     area: "500 sq ft",
     materials: ["Material A", "Material B"],
     tags: ["Tag1", "Tag2"]
   }
   ```
3. Update `messages/en.json` and `messages/es.json` by adding the corresponding keys under the `"ProjectsData"` object:
   ```json
   "ProjectsData": {
     "project-slug": {
       "title": "Project Title",
       "seoTitle": "SEO Title | Canito",
       "seoDesc": "SEO Description",
       "descShort": "Short Description",
       "descFull": "Detailed Case Study Text",
       "challenges": "Challenges faced...",
       "solution": "Solutions implemented...",
       "testimonial": "Client feedback text."
     }
   }
   ```

---

## 3. Form Submission & Abstraction Layer
The validation utilizes React Hook Form with Zod schemas inside `src/components/ContactForm.tsx`.
The submission goes through `src/utils/formSubmitter.ts`:
- Local testing logs output values and mocks responses.
- In production, set the environment variable:
  `NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit`
- The function resolves with `Promise<boolean>` to allow connecting to Web3Forms, FormSubmit, Resend, or custom SMTP setups without touching layout components.

---

## 4. Performance & Core Web Vitals Practices
To maintain Lighthouse scores above 95 and near-zero CLS (Cumulative Layout Shift):
- **Image Priority**: The main background header uses CSS-based meshes and glows to keep LCP times minimal. Always define explicit `sizes` on next/image elements.
- **Code-Splitting**: Load heavy client components (like the comparative `BeforeAfter` slider and Zod-heavy `ContactForm`) using Next's dynamic import helper:
  `const ContactForm = dynamic(() => import("@/components/ContactForm"));`
- **TypeScript Strict Checking**: Avoid using the `any` keyword. Cast locale props to `"en" | "es"` explicitly.
- **ESLint Validation**: Clean up unused imports, empty interfaces, and render-pass ref reading actions to keep compilation flags green.
