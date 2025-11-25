# Lumicello Website - Claude Code Instructions

## Project Overview

**Lumicello** is a marketing website for a personalized, interest-driven learning platform for children. The site focuses on lead capture via newsletter signup and social media engagement.

- **Type:** Static HTML/CSS/JavaScript website (no framework)
- **Deployment:** Render.com static site hosting
- **Branch:** `homepage_structure` (active development)

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks
- **Google Fonts** - Fraunces (headings), DM Sans (body), Noto Sans Thai
- **FontAwesome** - Icons (Kit ID: bc46e65664)
- **Kit.com** - Newsletter form (Form ID: 8398985)

## File Structure

```
├── index.html              # Single-page entry point
├── css/
│   ├── variables.css       # Design tokens (EDIT THIS for colors/fonts)
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # Interactions (scroll, carousel, mobile menu)
├── assets/
│   ├── images/             # Hero, kit images (.webp preferred)
│   └── icons/              # Social media SVGs
├── design_specs/           # Brand & design documentation (READ ONLY)
└── work_pipeline/          # Experimental drafts (IGNORE)
```

## Development

### Running Locally
```bash
# No build step needed - serve static files
python -m http.server 8000
# Visit http://localhost:8000
```

### Testing Changes
- Test responsive design at: 320px, 768px, 1024px, 1440px
- Check mobile hamburger menu functionality
- Verify scroll animations trigger correctly
- Test newsletter form submission

## Design System

### Colors (from `css/variables.css`)
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1A2B4C` | Jefferson Blue - text, buttons |
| `--color-accent` | `#F2C94C` | Lumen Gold - highlights, CTAs |
| `--color-bg-main` | `#F9F8F4` | Soft Canvas - main background |
| `--color-bg-sage` | `#E6EBE6` | Section backgrounds |
| `--color-bg-clay` | `#F0E6DD` | Section backgrounds |
| `--color-bg-mist` | `#E3F2F5` | Section backgrounds |

### Typography
- **Headings:** `var(--font-heading)` - Fraunces serif
- **Body:** `var(--font-body)` - DM Sans with Thai fallback

### Spacing & Borders
- **Card radius:** `24px` (`--radius-card`)
- **Button radius:** `50px` (`--radius-btn`)
- **Section padding:** `120px` (`--spacing-section`)

### Animation
- **Easing:** `cubic-bezier(0.25, 1, 0.5, 1)` (`--ease-fluid`)
- **Scroll reveal:** 0.8s fade-up animation
- **Hover states:** Soft transitions, no sharp changes

## Code Conventions

### CSS
- Use CSS custom properties from `variables.css`
- Mobile-first responsive design
- Breakpoints: `768px` (tablet), `1024px` (desktop)
- No inline styles (except FontAwesome generated)
- Soft shadows: `box-shadow: 0 10px 40px -10px rgba(26, 43, 76, 0.08)`

### JavaScript
- Vanilla JS only - no libraries
- Use `DOMContentLoaded` event wrapper
- IntersectionObserver for scroll animations
- Event delegation where appropriate

### HTML
- Semantic elements (`<section>`, `<nav>`, `<aside>`, `<footer>`)
- ARIA labels on interactive elements
- Lazy loading on below-fold images: `loading="lazy"`
- External links: `target="_blank" rel="noopener"`

### Images
- Prefer `.webp` format for production
- Keep `.png` backups in same directory
- Optimize to quality 85%
- Use descriptive alt text

## Page Sections

1. **Navigation** - Fixed navbar with mobile hamburger
2. **Hero** - H1 + subtitle + CTA button
3. **Community** - Newsletter form + social cards
4. **Value Props** - 3 feature cards with icons
5. **Exploration Kits** - 6 product cards in grid
6. **Social Proof** - Testimonial carousel
7. **Footer** - Brand info + links

## External Integrations

### Kit.com Newsletter
- Form ID: `8398985`
- Action: `https://app.kit.com/forms/8398985/subscriptions`
- Fields: `fields[first_name]`, `email_address`
- Custom styling overrides default Kit styles

### Social Links
- Line Official: `https://lin.ee/eH1GxA5`
- Facebook: `https://web.facebook.com/LumicelloGroup`

### FontAwesome
- Kit ID: `bc46e65664`
- Load via: `https://kit.fontawesome.com/bc46e65664.js`

## Known Issues

### Testimonial Carousel Bug (CRITICAL)
- **Location:** `js/main.js:55`
- **Issue:** `slideIndex` variable scoped inside `DOMContentLoaded`, causing reference errors
- **Fix:** Move `let slideIndex = 1;` outside the callback to module scope

## Design Philosophy

**"Warm Intelligence"** - The site should feel like a digital hug backed by scientific precision.

- **Soft & Fluid:** No sharp 90-degree angles, rounded corners everywhere
- **Breathing Motion:** Gentle animations, smooth easing
- **Premium Feel:** Generous whitespace, sophisticated typography
- **Child-friendly but not childish:** Approachable without being cartoonish

Reference sites: Headspace (approachable), Adaline (scientific/premium), Poketo (grid layouts)

## Deployment

### Render.com Static Site
- **Build Command:** (empty - pure static)
- **Publish Directory:** `./` (root)
- **Entry Point:** `index.html`

### Pre-deployment Checklist
- [ ] Fix testimonial carousel JS bug
- [ ] Verify all images load (webp format)
- [ ] Test newsletter form submission
- [ ] Check responsive design on mobile
- [ ] Validate social links open correctly
