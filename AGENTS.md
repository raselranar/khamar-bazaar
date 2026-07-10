<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AI Project Instructions: Khamar Bazaar (Livestock & Poultry Marketplace)

## Project Context

**Khamar Bazaar** is a minimalist full stack marketplace where local farmers and hobbyist breeders list livestock and poultry for sale — Muscovy ducks, chickens, eggs, ducklings, goats, cows, etc. Buyers can browse, filter, and contact sellers directly.

This is a **minimalist project**: clean, fast, uncluttered. Prioritize whitespace, typography, and content clarity over decoration. Fewer visual elements, done well, beats many elements done averagely.

Build a complete, production-ready full stack application using JavaScript that demonstrates strong understanding of:

- Frontend development
- Backend development
- Database management
- Authentication & authorization
- API design
- Professional, minimalist UI/UX practices

No placeholder or dummy content is allowed anywhere in the project — use real, contextual livestock/poultry data (breeds, prices in BDT, realistic descriptions).

---

## 1. Technology Stack

### Frontend

- React.js / Next.js
- JavaScript
- Tailwind CSS
- Shadcn UI
- Recharts / Chart.js (optional — e.g., price trend or listings-by-category chart)

### Backend

- Node.js + Express.js **or** Next.js API Routes
- JavaScript
- MongoDB with JWT authentication **or** static data with Firebase

---

## 2. Global UI & Design Rules (Minimalist)

- Use **2 primary colors + 1 neutral** only (e.g., a single earthy accent color like deep green or terracotta + off-white/gray neutral). No gradients, no busy patterns.
- Generous whitespace; avoid crowding cards or sections.
- Simple, readable typography — one font family, 2–3 weights max.
- Minimal shadows/borders — flat design preferred over heavy skeuomorphism.
- All cards and components of the same type must share identical size, border radius, and visual style.
- Fully responsive: mobile, tablet, desktop.
- No lorem ipsum or placeholder content.

---

## 3. Home / Landing Page

### Navbar

- Full-width background, minimal height.
- Logged out: Home, Explore, About (min 3 routes).
- Logged in: Home, Explore, Add Listing, Manage Listings, Profile (min 5 routes).
- Sticky/fixed position, fully responsive (hamburger on mobile).

### Hero Section

- Height: 60–70% of viewport.
- Simple headline (e.g., "স্থানীয় খামার থেকে সরাসরি আপনার কাছে" / "From local farms, straight to you") + one clear CTA ("Explore Listings").
- One subtle interactive element (e.g., a small image slider of duck/poultry photos) — avoid heavy animation to keep it minimal.

### Content Sections (minimum 7)

Suggested minimalist sections:

1. Featured Listings (top 4 cards)
2. How It Works (3-step: List → Browse → Contact)
3. Categories (Poultry, Ducks, Eggs, Livestock, Feed & Supplies)
4. Why Khamar Bazaar (trust/quality points)
5. Farmer Testimonials
6. Stats (e.g., listings count, farmers onboarded, districts covered)
7. Newsletter / Stay Updated
8. FAQ

### Footer

- Minimal, single-row or simple multi-column layout.
- Working links only, contact info, social links.

---

## 4. Core Listing / Card Section

Each card includes:

- Image (animal/product photo)
- Title (e.g., "Muscovy Duck – 3 months")
- Short description
- Meta info: **price (BDT), breed/type, age, location**
- "View Details" button

### Card Rules

- Same height/width, same border radius.
- Desktop: 4 cards per row.
- Skeleton loader while fetching data.

---

## 5. Details Page

- Publicly accessible.
- Multiple images (gallery) if available.
- Sections:
  - Description / Overview
  - Key Info (breed, age, weight, vaccination status, quantity available)
  - Seller info (name, location, contact)
  - Reviews / Ratings (if applicable)
  - Related listings (same category)

---

## 6. Listing / Explore Page

- Search bar (by title/breed).
- Filtering (minimum 2 fields): **category** (Duck, Chicken, Egg, Goat, Cow, Feed) + **price range**; optionally location.
- Sorting: price (low–high/high–low), newest first.
- Pagination or infinite scroll.

---

## 7. Authentication System

- Login and Registration pages — minimal form design, single column, clear spacing.
- Validation + error handling.
- Demo login button (auto-fill demo credentials).
- Optional: Google login.

---

## 8. Protected Page: Add Listing (`/listings/add`)

- Only accessible when logged in; redirect to `/login` otherwise.

### Form Fields

- Title (e.g., "Muscovy Duckling")
- Short description
- Full description
- Category (Duck / Chicken / Egg / Goat / Cow / Feed & Supplies)
- Price (BDT)
- Age / breed
- Location
- Optional image URL

### Actions

- Submit (Add Listing)

---

## 9. Protected Page: Manage Listings (`/listings/manage`)

- Table/grid of the logged-in user's own listings.
- Actions per row: **View**, **Delete**.
- Clean, readable, responsive layout — minimal use of icons, clear text labels.

---

## 10. Additional Pages (minimum 2)

- About (the story behind Khamar Bazaar — connecting local farmers to buyers)
- Contact
- Farming Tips / Blog (e.g., duck-rearing basics, feed schedules)
- Privacy / Terms

---

## 11. UX & Responsiveness Checklist

- [ ] No lorem ipsum or placeholder content anywhere
- [ ] Fully responsive across all screen sizes
- [ ] Consistent, generous spacing (minimalist feel maintained)
- [ ] Max 2 primary colors + neutral, respected everywhere
- [ ] Every button and link is functional and clickable

---

## 12. Final Submission Requirements

- Live website URL
- GitHub repository link (frontend and backend)
- Demo credentials:
  - User email & password
  - Admin email & password

---

## Development Checklist Summary

| Area            | Requirement                                          |
| --------------- | ---------------------------------------------------- |
| Domain          | Livestock & poultry marketplace (Khamar Bazaar)      |
| Stack           | JavaScript mandatory (frontend + backend)            |
| Design          | Minimalist — 2 colors + neutral, generous whitespace |
| Home Page       | Navbar, Hero, 7+ sections, Footer                    |
| Listing         | Cards (4/row desktop), skeleton loaders              |
| Details Page    | Public, multi-section layout                         |
| Explore Page    | Search, filter (category + price), sort, pagination  |
| Auth            | Login/Register, validation, demo login               |
| Protected Pages | Add Listing, Manage Listing (with redirect logic)    |
| Extra Pages     | 2+ (About, Contact, Blog, etc.)                      |
| Deployment      | Live URL + GitHub repo + demo credentials            |

---

## Suggested Data Model (MongoDB)

```ts
interface Listing {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Duck" | "Chicken" | "Egg" | "Goat" | "Cow" | "Feed & Supplies";
  price: number; // BDT
  age?: string;
  breed?: string;
  location: string;
  imageUrl?: string;
  sellerId: string; // ref to User
  createdAt: Date;
}

interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  location?: string;
  createdAt: Date;
}
```
