# Canito Construction LLC Website

This repository contains the premium, high-conversion bilingual corporate website for **Canito Construction LLC**, a construction and remodeling company based in Kyle, Texas, servicing Central Texas (including Austin, Buda, San Marcos, and surrounding areas).

Developed using **Next.js 15**, **React 19**, **TypeScript**, **TailwindCSS v4**, and **Framer Motion**, the site features modern visual layouts matching standard aesthetics from Vercel, Apple, and Stripe.

---

## Technical Stack & Libraries
- **Core**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS v4 (using `@import "tailwindcss"` and direct theme configurations in `globals.css`)
- **Localization**: next-intl (Bilingual English / Spanish routing structure)
- **Forms & Validation**: React Hook Form, Zod schema resolvers
- **Smooth Scrolling**: Lenis
- **Slider Carousel**: Embla Carousel

---

## Folder Structure
```text
canito-construction/
├── messages/                # JSON dictionaries for English (en) and Spanish (es)
├── src/
│   ├── app/                 # Next.js App Router paths (localized routes)
│   ├── components/          # Core reusable layouts and Base UI library components
│   │   ├── ui/              # Buttons, Cards, Badges, Forms elements, Icon registry
│   │   └── portfolio/       # Live portfolio category grid filters
│   ├── data/                # Data-Driven registries (services, projects)
│   ├── design-system/       # Styling tokens (spacing, typography scales, motion presets)
│   ├── sections/            # Component sections (Hero, TrustBar, Showcase, FAQ, Contact, Footer)
│   └── utils/               # Decoupled submission APIs
└── public/                  # Static image assets, icons, and manifests
```

---

## Deployment on Vercel

The site is fully optimized to be deployed as a static or dynamic Next.js application on **Vercel** with zero-configuration:

### Step 1: Create a Vercel Account & Import Repo
1. Sign up on [Vercel](https://vercel.com).
2. Click **Add New** > **Project** in the dashboard.
3. Import your GitHub repository containing this codebase.

### Step 2: Configure Build Settings
Vercel automatically detects Next.js:
- **Framework Preset**: `Next.js`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Step 3: Add Environment Variables
Add the following key-value pairs under the **Environment Variables** section in the Vercel project settings:
- `NEXT_PUBLIC_FORM_ENDPOINT` = `https://api.web3forms.com/submit` (or your preferred dispatch gateway URL)

### Step 4: Deploy
Click **Deploy**. Once completed, Vercel provides a custom production URL and automatically sets up SSL certificates. Future pushes to the `main` branch trigger incremental static builds automatically.

---

## Maintenance & Updates Procedures

### 1. How to Replace Images in Portfolios & Sliders
All images reside under the `public/images/` directory. To swap mock images with actual photographs from the client, simply replace the corresponding WebP/JPG files in `public/images/` using the exact same filenames:
- `/public/images/before_kitchen.jpg` (The primary outdated comparison kitchen)
- `/public/images/project2.jpg` (The luxury charcoal after remodel image)
- `/public/images/project1.jpg` (Exterior remodeling facade)
- `/public/images/project3.jpg` (Slate bathroom flooring project)

*Note: Te recomendamos optimizar las imágenes en formato **WebP** y con dimensiones máximas de 1200 píxeles de ancho para asegurar que la página web cargue de forma ultra rápida.*

### 2. How to Add or Edit Projects in the Portafolio
All portfolio projects are loaded dynamically from the central registry file:
**[src/data/projects.ts](file:///C:/Users/ivang/Desktop/Ranger%20Print%20House%20Clientes/canito-construction/src/data/projects.ts)**
1. Open the registry file and add a new entry to the `projectsRegistry` array containing slug, location, property type, materials, and tags.
2. Open the translation dictionary files (`messages/en.json` and `messages/es.json`) and add the matching text metadata namespaces under the `"ProjectsData"` property (e.g. `ProjectsData.<slug>.title`, `descFull`, `challenges`, `solution`, `testimonial`).

### 3. How to Configure or Swap Lead Form Providers
The form submission logic is fully decoupled from the components:
**[src/utils/formSubmitter.ts](file:///C:/Users/ivang/Desktop/Ranger%20Print%20House%20Clientes/canito-construction/src/utils/formSubmitter.ts)**
- In development, the form mocks a successful dispatch and logs values to the console.
- For production, configure the public environment endpoint in your `.env` or Vercel dashboard:
  `NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit`
- The abstraction layer can easily connect to Resend, EmailJS, or custom API endpoints without changing the frontend components.

---

## Setup & Production Commands

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```

### Production Build compilation
To build and optimize the application:
```bash
npm run build
```

This compiles static paths, runs type checks, and outputs static pages optimized for Vercel deployment.
