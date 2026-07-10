# Design System: Khamar Bazaar

## Design Direction

Khamar Bazaar connects rural Bangladeshi farmers with buyers looking for ducks, chickens, eggs, and livestock. The design should feel like an honest, well-kept farm ledger, not a generic tech marketplace: calm, tactile, and grounded in the world it serves (ponds, hay, rice fields, morning light) — never decorated for decoration's sake.

**Signature element — the Ripple.** Ducks live on water, so a single soft ripple/concentric-ring motif is the one recurring visual and motion signature: it appears faintly behind the hero image, and as the hover/press feedback on cards and buttons. It is used in exactly these two places and nowhere else — restraint is what makes it a signature instead of a pattern.

This is a **minimalist** build: precision in spacing and type does the work that decoration would do elsewhere. When in doubt, remove an element rather than add one.

---

## 1. Color System

| Token | Hex | Role |
|---|---|---|
| `pond-teal` | `#2B6664` | Primary — buttons, links, active states, icons |
| `pond-teal-tint` | `#DCEEEC` | Primary background tint — badges, selected filters, hover backgrounds |
| `hay-gold` | `#B8823A` | Secondary accent — price tags, ratings, small highlights (use sparingly, never for large fills) |
| `rice-paper` | `#F7F5EF` | Page background |
| `surface` | `#FFFFFF` | Card/panel background |
| `ink` | `#26241F` | Primary text |
| `husk-gray` | `#8C887E` | Secondary text, borders, placeholders |
| `error-clay` | `#B3452F` | Error states only |

**Rules:**
- Only `pond-teal` and `hay-gold` count as the "2 primary colors." Everything else is neutral.
- `hay-gold` never fills a large area (no gold buttons, no gold sections) — it marks small, specific data points: a price, a star rating, a "featured" tag.
- Text is always `ink` on `rice-paper`/`surface`, or white on `pond-teal`. No gray-on-gray text.

---

## 2. Typography

Two typefaces, chosen for the audience (mixed Bengali + English content) and for structural clarity.

| Role | Typeface | Notes |
|---|---|---|
| Headings & body | **Hind Siliguri** | Clean humanist face with full Bengali + Latin support. Used everywhere for actual language content. |
| Numbers & meta data | **IBM Plex Mono** | Prices, ages, dates, ratings, quantities. Setting numbers in mono visually separates "data" from "words" without adding another decorative face. |

**Type scale (rem, base 16px):**

| Style | Size | Weight | Line height |
|---|---|---|---|
| H1 (hero) | 2.75rem | 600 | 1.1 |
| H2 (section title) | 2rem | 600 | 1.2 |
| H3 (card/subsection) | 1.25rem | 600 | 1.3 |
| Body | 1rem | 400 | 1.6 |
| Small / meta | 0.875rem | 400 | 1.5 |
| Price (mono) | 1.125rem | 500 | 1.4 |

Only two weights per family are used: 400 and 600. No italics, no all-caps except small eyebrow labels (e.g. "FEATURED").

---

## 3. Spacing, Radius & Elevation

- **Base unit:** 4px. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Border radius:** 12px for cards/inputs/buttons, 999px for pills/badges only. No sharp (0px) corners — soft edges match the organic subject.
- **Elevation:** two shadow levels only.
  - `shadow-sm`: `0 1px 2px rgba(38,36,31,0.06)` — default card resting state.
  - `shadow-md`: `0 8px 20px rgba(38,36,31,0.10)` — hover/active state only.
- **Grid:** 12-column, max content width 1200px, gutter 24px. Card grid: 4 columns desktop → 2 tablet → 1 mobile.

---

## 4. Breakpoints

| Name | Width |
|---|---|
| `sm` (mobile) | 0–639px |
| `md` (tablet) | 640–1023px |
| `lg` (desktop) | 1024px+ |

---

## 5. Component Notes

**Navbar** — white surface, `shadow-sm` only when scrolled (not at top), 64px height, logo left, nav links right, single `pond-teal` filled button for primary CTA ("Add Listing" / "Login"). Mobile menu uses shadcn `Sheet`.

**Hero** — `rice-paper` background, faint single ripple SVG behind the hero image (opacity ~0.08, `pond-teal`), headline in Hind Siliguri 600, one primary button (shadcn `Button`).

**Card** — shadcn `Card` as the base, `surface` background, 12px radius, `shadow-sm` resting. Image top (4:3 ratio), title (H3), short description (2-line clamp), meta row (category + `hay-gold` price in mono), "View Details" as a text link with arrow, not a filled button (keeps cards light).

**Buttons** — shadcn `Button` with two variants in play: `default` restyled to `pond-teal` fill/white text for primary actions, `outline` restyled to `pond-teal` border/text for secondary. No third button style — don't introduce shadcn's `secondary`/`ghost`/`destructive` variants unless a real destructive action (e.g. delete listing) needs `destructive`.

**Forms** — shadcn `Input`, `Textarea`, `Select`, `Label`, `Form` (react-hook-form + zod) — single column, 12px radius inputs, `husk-gray` border at rest, `pond-teal` border on focus, label above field (never placeholder-as-label).

**Filters (Explore page)** — shadcn `Select` for category, `Slider` for price range, `Sheet` for the mobile filter drawer.

**Delete confirmation** — shadcn `AlertDialog` (not a plain `Dialog` — it's a destructive confirm action).

**Success/error messages** — shadcn `Sonner` (toast).

**Loading state** — shadcn `Skeleton`.

**Footer** — `ink` background, `rice-paper` text, single row on desktop (logo, 3 link columns, social icons), stacks on mobile.

---

## 6. Motion System

**Library:** [Motion for React](https://motion.dev) (formerly Framer Motion).

```bash
npm install motion
```

```tsx
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
```

### Principles

- Motion confirms and guides — it never performs. If an animation doesn't help someone understand a state change (loading, entering, leaving, succeeding, failing), cut it.
- Keep interactive feedback under 250ms; reserve 300–450ms for entrances and page-level moments.
- Animate only `transform` and `opacity` — never `width`/`height`/`top` directly (use `layout` or wrap in a height container instead), since the target audience includes lower-end mobile devices on slower connections.
- Always check `useReducedMotion()` and drop the transform component (keep only an instant opacity fade) when it returns `true`.

### Where motion is used

| Moment | Behavior | Duration / easing |
|---|---|---|
| Hero entrance (page load) | Headline → subheadline → CTA → image fade up 16px, staggered 80ms apart | 450ms, `ease-out` |
| Section scroll-reveal | Fade up 12px, `whileInView`, `viewport={{ once: true, amount: 0.2 }}`, children staggered 60ms | 350ms, `ease-out` |
| Card hover (desktop) | Lift `translateY(-4px)`, shadow-sm → shadow-md, faint ripple ring expands from card center at 6% opacity (the signature element) | 200ms, `ease-out` |
| Card press (mobile) | Scale to 0.98, no lift | 100ms |
| Button press | `whileTap={{ scale: 0.97 }}` | 100ms |
| Filter panel open/close | Height + opacity via `AnimatePresence`, mobile drawer slides up 100% → 0% | 250ms, `ease-in-out` |
| Route/page transition | Fade only (opacity 0 → 1), `AnimatePresence mode="wait"` — no slide, keeps it calm | 180ms |
| Delete-listing confirm modal | Backdrop fade + modal scale 0.95 → 1 | 200ms, soft spring (`stiffness: 300, damping: 30`) |
| Form validation error | Error text fade-in + 4px slide down, input border color transition — no shake | 150ms |
| Success toast (e.g. "Listing added") | Slide in from top + fade, auto-dismiss exit fade after 3s | 200ms in / 150ms out |
| Skeleton loader | CSS opacity pulse (no JS needed) | 1.4s loop, `ease-in-out` |

### Example: card hover with ripple signature

```tsx
<motion.div
  className="card"
  whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: "var(--shadow-md)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  {/* card content */}
</motion.div>
```

### Example: scroll-reveal section

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.35, ease: "easeOut" }}
>
  {/* section content */}
</motion.div>
```

---

## 7. Accessibility & Performance

- Visible keyboard focus ring on every interactive element: 2px `pond-teal` outline, 2px offset.
- Color contrast: `ink` on `rice-paper`/`surface` and white on `pond-teal` both pass WCAG AA for body text.
- Respect `prefers-reduced-motion` globally via `useReducedMotion()` — never rely on animation alone to convey state (always pair with a text/color change).
- Keep total motion-library bundle impact in mind: only animate what's listed above — resist adding animation to elements not in this table.

---

## 8. shadcn/ui Setup & Theming

shadcn/ui components are copied into the project (not an npm dependency), so this design system is applied by editing the generated files directly, not by fighting a theme prop.

```bash
npx shadcn@latest init
# baseColor: neutral · style: new-york · cssVariables: true
npx shadcn@latest add button card input textarea label select slider
npx shadcn@latest add sheet alert-dialog sonner skeleton form
```

**Map these tokens into the CSS variables the CLI writes to `app/globals.css`** (values are the light-theme set; this project ships light-mode only, no dark mode, to keep the scope minimal):

| shadcn variable | Value | Source token |
|---|---|---|
| `--background` | `#F7F5EF` | `rice-paper` |
| `--foreground` | `#26241F` | `ink` |
| `--card` | `#FFFFFF` | `surface` |
| `--card-foreground` | `#26241F` | `ink` |
| `--primary` | `#2B6664` | `pond-teal` |
| `--primary-foreground` | `#FFFFFF` | white |
| `--secondary` | `#DCEEEC` | `pond-teal-tint` |
| `--secondary-foreground` | `#2B6664` | `pond-teal` |
| `--muted` | `#EFEBE2` | slightly darker than `rice-paper` |
| `--muted-foreground` | `#8C887E` | `husk-gray` |
| `--border` / `--input` | `#8C887E` at 30% opacity | `husk-gray` |
| `--ring` | `#2B6664` | `pond-teal` (focus ring) |
| `--destructive` | `#B3452F` | `error-clay` |
| `--radius` | `0.75rem` (12px) | matches Section 3 |

`hay-gold` (`#B8823A`) is **not** mapped to any shadcn semantic variable — it's never a component background/border color, only ever an inline text/badge color applied directly (e.g. `<span className="text-[#B8823A] font-mono">`) where a price or rating needs it. Keeping it out of the theme variables is what prevents it from accidentally becoming a button or section color.

**Division of labor with Motion:** shadcn's own Radix-based primitives (`Sheet`, `AlertDialog`, `Select`, dropdowns) already ship accessible enter/exit animations via `tailwindcss-animate` and `data-state` attributes — leave those as-is, don't rewrap them in `motion.div`. Reach for Motion only for the bespoke, brand-level moments in the table above that shadcn doesn't own: hero entrance, scroll-reveals, the card-hover ripple, and page transitions.
