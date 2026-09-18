# Eykotech

Business website for Eykotech — a Braunschweig-based local supplier of IT equipment, office furniture, printers, and networking gear with installation, delivery, and repair services.

## Tech Stack

- **React 19** + Vite 6
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- Hash-based routing (no server config needed)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build → dist/
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components (Header, Footer, Hero, etc.)
│   └── ui/            # Smaller primitives (Button, Reveal, Tilt, etc.)
├── pages/             # Route-level views (About, Contact, Delivery, etc.)
├── data.js            # Product catalog & site content
├── useAuth.jsx        # Auth state
├── useCart.jsx        # Cart state
├── useCatalog.jsx     # Product catalog filter/search
├── useHashRoute.js    # Hash-based router
└── index.css          # Global styles & Tailwind theme
public/
└── assets/            # Logo, favicon, product images, service SVGs
```

## Features

- Responsive design (mobile + desktop)
- Product catalogue with category filtering and search
- Shopping cart with slide-out drawer
- Product detail pages
- Contact form + contact info cards
- Delivery & repairs service pages
- Login / signup with role-based account menu
- Scroll-triggered reveal animations
- Hero image slideshow
