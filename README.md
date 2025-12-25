# Niyamo Capital - Next.js Website with CMS

A modern Next.js rebuild of the Niyamo Capital investment website with an expansive CMS for managing all content types.

## Features

- **Modern Tech Stack**: Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui
- **Expansive CMS**: Admin dashboard to manage all content types
- **Dynamic Routing**: Investment portfolio pages with dynamic slugs
- **Responsive Design**: Mobile-first design matching original theme
- **SEO Optimized**: Proper metadata and semantic HTML

## Pages

- **Home** (`/`) - Hero slider, about section, portfolio grid
- **About** (`/about`) - Company information and vision
- **Investments** (`/investments`) - Portfolio overview
- **Investment Detail** (`/investments/[slug]`) - Individual investment pages
- **Contact** (`/contact`) - Contact form
- **Privacy Policy** (`/privacy-policy`) - Legal page
- **Cookies Policy** (`/cookies-policy`) - Legal page

## Admin CMS

Access the CMS at `/admin` to manage:

- **Site Settings** - Logo, navigation, contact info, social links
- **Home Page** - Hero slides, about section, features
- **About Page** - Company content, pillars, galleries
- **Investments** - Add/edit/remove portfolio items
- **Legal Pages** - Privacy and cookies policies
- **Media Library** - Browse and manage images
- **Contact Settings** - Form configuration

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # CMS admin pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── investments/       # Investments pages
│   ├── privacy-policy/    # Privacy policy page
│   ├── cookies-policy/    # Cookies policy page
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer, PageTitle
│   ├── sections/          # HeroSlider, AboutSection, etc.
│   └── ui/                # shadcn/ui components
├── content/               # CMS JSON data files
│   ├── site.json          # Global site settings
│   ├── home.json          # Home page content
│   ├── about.json         # About page content
│   ├── investments.json   # Portfolio items
│   └── pages.json         # Legal pages content
└── lib/                   # Utility functions and content helpers
```

## Content Management

All content is stored in JSON files in `src/content/`. The CMS admin interface provides a user-friendly way to edit these files. To persist changes, integrate with a backend API or use a headless CMS.

## Customization

- **Colors**: Edit CSS variables in `globals.css` (gold: `#c9a96e`, navy: `#1a1a2e`)
- **Fonts**: Playfair Display (headings) and Inter (body) via Google Fonts
- **Images**: Add to `public/assets/` directory

## Deploy

Deploy to Vercel, Netlify, or any Node.js hosting platform:

```bash
npm run build
npm start
```
