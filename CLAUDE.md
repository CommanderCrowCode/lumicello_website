# Lumicello Website - Claude Code Instructions

## Project Overview

**Lumicello** is a marketing website for a personalized, interest-driven learning platform for children. The site focuses on lead capture via newsletter signup and social media engagement.

- **Type:** Static HTML/CSS/JavaScript website (no framework)
- **Deployment:** Render.com static site hosting
- **Branch:** `main` (production)

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks
- **Google Fonts** - Fraunces (headings), Nunito (body), Noto Sans Thai
- **FontAwesome** - Icons (Kit ID: bc46e65664)
- **Kit.com** - Newsletter form (Form ID: 8398985)

## File Structure

```
├── index.html              # Single-page entry point (Poketo-inspired design)
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   └── style.css           # Main stylesheet (all components)
├── js/
│   └── main.js             # Interactions (scroll, mobile menu)
├── assets/
│   ├── images/             # Hero, kit images (.webp preferred)
│   └── icons/              # Social media SVGs
└── design_specs/           # Brand & design documentation (READ ONLY)
```

## Development

### Running Locally

| Branch | Port | URL | Purpose |
|--------|------|-----|---------|
| `main` | 8080 | http://localhost:8080 | Production testing |
| `responsive` | 8765 | http://localhost:8765 | Responsiveness testing |

```bash
# On main branch
python -m http.server 8080

# On responsive branch
python -m http.server 8765
```

### Testing Changes
- Test responsive design at: 320px, 768px, 1024px, 1440px
- Check mobile hamburger menu functionality
- Verify scroll reveal animations trigger correctly
- Test newsletter form submission
- Verify fingerprint ring animation in bento grid

## Design System

### Colors (from `css/variables.css`)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1A2B4C` | Jefferson Blue - text, buttons |
| `--color-accent` | `#F2C94C` | Lumen Gold - highlights, CTAs |
| `--color-bg-main` | `#F9F8F4` | Soft Canvas - main background |
| `--color-bg-sage` | `#E6EBE6` | Sage Whisper - section backgrounds |
| `--color-bg-clay` | `#F0E6DD` | Pale Clay - section backgrounds |
| `--color-bg-mist` | `#E3F2F5` | Mist Blue - section backgrounds |
| `--color-text-secondary` | `#5E6A71` | Secondary text |

### Typography
- **Headings:** `var(--font-heading)` - Fraunces serif
- **Body:** `var(--font-body)` - Nunito with Thai fallback

### Spacing & Borders
- **Card radius:** `24px` (`--radius-card`)
- **Card radius small:** `16px` (`--radius-card-sm`)
- **Button radius:** `50px` (`--radius-btn`)
- **Section padding:** `clamp(60px, 8vw, 120px)` (`--spacing-section`)
- **Grid gap:** `16px` (`--grid-gap`)
- **Container max:** `1400px` (`--container-max`)

### Animation
- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (`--ease-fluid`)
- **Scroll reveal:** 0.8s fade-up animation (`.reveal` class)
- **Fingerprint pulse:** 4s infinite animation
- **Hover states:** Soft transitions with translateY(-5px)

## Code Conventions

### Code Style (IMPORTANT)
When writing code for this project, follow these formatting rules:
- **Indentation:** 4 spaces (not tabs)
- **Quotes:** Single quotes for JavaScript strings
- **Semicolons:** Always use semicolons in JavaScript
- **Line length:** ~100 characters max

Config files: `.prettierrc`, `.eslintrc.json`

### CSS
- Use CSS custom properties from `variables.css`
- Mobile-first responsive design
- Breakpoints: `768px` (mobile), `1024px` (tablet/desktop)
- Soft shadows: `box-shadow: 0 20px 60px rgba(26, 43, 76, 0.1)`

### JavaScript
- Vanilla JS only - no libraries
- Scroll reveal using IntersectionObserver pattern
- Smooth scroll for anchor links
- Mobile menu toggle
- Add JSDoc comments to functions (see `js/main.js` for examples)

### HTML
- Semantic elements (`<section>`, `<nav>`, `<footer>`)
- ARIA labels on interactive elements
- Lazy loading on below-fold images: `loading="lazy"`
- External links: `target="_blank" rel="noopener"`

### Images
- Prefer `.webp` format for production
- Keep `.png` backups in same directory
- Optimize to quality 85%
- Use descriptive alt text

## Page Sections (9 Total)

1. **Announcement Bar** - Top banner with Curiosity Fingerprint CTA
2. **Navigation** - Sticky navbar with logo image, nav-links, mobile toggle
3. **Hero** - 2-column grid with badge, h1, floating card, decorations
4. **Bento Grid** - Value props with mixed card sizes (sage background)
5. **Community Section** - Newsletter form (span 2) + LINE & Facebook cards, dark background
6. **50/50 Split Section** - Image left, content right
7. **Exploration Kits** - 6 baby kit cards (First Year Collection, 0-12 months)
8. **Testimonials** - Single centered quote with author
9. **Footer** - 4-column grid (brand 2fr + 3x1fr), social icons (LINE, Facebook)

## Third-Party Services (SaaS)

| Service | Purpose | Dashboard |
|---------|---------|-----------|
| **Kit.com** | Newsletter management | https://app.kit.com |
| **Formspree** | Contact form submissions | https://formspree.io |
| **Render.com** | Static site hosting | https://dashboard.render.com |
| **FontAwesome** | Icon library | https://fontawesome.com/kits |

### Kit.com (Newsletter)
- **Form ID:** `8398985`
- **Action URL:** `https://app.kit.com/forms/8398985/subscriptions`
- **Fields:** `fields[first_name]`, `email_address`
- **Used on:** Homepage (Community Section), Coming Soon page
- **Confirmation redirect:** `welcome.html`

### Formspree (Contact Forms)
- **Dashboard:** https://formspree.io/forms
- **Used on:** Contact page (`contact.html`)
- **Features:** Spam filtering, email notifications, submission archive

### Social Links
- LINE Official: `https://lin.ee/eH1GxA5`

**Facebook (two separate links):**
- **Facebook Group** (community/engagement): `https://web.facebook.com/share/g/1ByigscXwU/`
  - Use for: Community section, content sharing, engagement CTAs
- **Facebook Page** (company/support): `https://web.facebook.com/LumicelloCompany/`
  - Use for: Footer, Contact page, customer support, complaints

### Formspree Contact Form
- Form ID: `xzznrzdb`
- Action: `https://formspree.io/f/xzznrzdb`
- Fields: `first_name`, `last_name`, `email`, `subject`, `message`
- Located on Contact page (`contact.html`)
- Submissions sent to: `contact@lumicello.com`
- Hidden fields: `_subject` (email subject), `_next` (redirect after submit)

### FontAwesome
- **Kit ID:** `bc46e65664`
- **Load via:** `https://kit.fontawesome.com/bc46e65664.js`

## Design Philosophy

**"Warm Intelligence"** - The site should feel like a digital hug backed by scientific precision.

- **Soft & Fluid:** No sharp 90-degree angles, rounded corners everywhere
- **Breathing Motion:** Gentle animations, smooth easing
- **Premium Feel:** Generous whitespace, sophisticated typography
- **Child-friendly but not childish:** Approachable without being cartoonish
- **Poketo-inspired:** Bento grid layouts, bold section colors, product-focused

Reference sites: Headspace (approachable), Adaline (scientific/premium), Poketo (grid layouts)

## Deployment

### Render.com Static Site
- **Build Command:** (empty - pure static)
- **Publish Directory:** `./` (root)
- **Entry Point:** `index.html`

### Pre-deployment Checklist
- [ ] Verify all images load (webp format)
- [ ] Test newsletter form submission
- [ ] Check responsive design on mobile
- [ ] Validate social links open correctly
- [ ] Test scroll reveal animations
- [ ] Verify fingerprint animation renders
