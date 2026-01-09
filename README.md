# Lumicello Website

A marketing website for Lumicello, a personalized, interest-driven learning platform for children. The site focuses on lead capture via newsletter signup and social media engagement.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks
- **Google Fonts** - Fraunces (headings), Nunito (body), Noto Sans Thai
- **FontAwesome** - Icons (Kit ID: bc46e65664)
- **Kit.com** - Newsletter forms

## Project Structure

```
lumicello_website/
├── index.html              # Main landing page
├── contact.html            # Contact form page
├── coming-soon.html        # Pre-launch page
├── careers.html            # Careers page
├── welcome.html            # Post-signup confirmation
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── voucher-terms.html      # Voucher terms & conditions
├── 404.html                # Custom error page
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Core interactions (scroll, mobile menu)
│   └── components.js       # Reusable UI components
├── assets/
│   ├── images/             # Hero, product images (.webp preferred)
│   └── icons/              # Social media SVGs
├── design_specs/           # Brand & design documentation (internal)
├── build.js                # Build script for deployment
└── render.yaml             # Render.com deployment configuration
```

## Getting Started

### Prerequisites

- Python 3.x (for local development server)
- Node.js (for build process)

### Local Development

```bash
# Clone the repository
git clone https://github.com/CommanderCrowCode/lumicello_website.git
cd lumicello_website

# Start local development server
python -m http.server 8080

# Visit http://localhost:8080
```

### Building for Production

```bash
# Run the build script
node build.js

# Output will be in dist/ directory
```

The build script copies only public files to `dist/`, excluding:
- Documentation files (*.md)
- Design specs
- Configuration files
- Git and internal tooling

## Deployment

Deployed on **Render.com** as a static site.

| Setting | Value |
|---------|-------|
| Build Command | `node build.js` |
| Publish Directory | `dist` |
| Production Domain | `www.lumicello.com` |

Auto-deploys on commit to `main` branch.

## Third-Party Services

| Service | Purpose |
|---------|---------|
| [Kit.com](https://app.kit.com) | Newsletter management |
| [Formspree](https://formspree.io) | Contact form submissions |
| [Render.com](https://dashboard.render.com) | Static site hosting |
| [FontAwesome](https://fontawesome.com) | Icon library |

## Design System

The site uses a **MUJI-inspired design** with calm, natural, earthy tones:

- **Primary:** Forest Olive (`#4A5D4B`)
- **Accent:** Soft Mustard (`#D9A835`)
- **Background:** Warm Cream (`#F7F4EE`)

Key design principles:
- Soft, rounded corners (no sharp edges)
- Gentle scroll-reveal animations
- Premium whitespace and typography
- Child-friendly but sophisticated aesthetic

See `css/variables.css` for the full design token reference.

## Documentation

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | AI assistant instructions for this codebase |
| `SECURITY_DECISIONS.md` | Security headers and CSP rationale |
| `QA_CHECKLIST.md` | Testing checklist for changes |
| `SETUP_REQUIREMENTS.md` | Detailed setup requirements |

## License

Proprietary - All rights reserved.

## Contact

- Website: [lumicello.com](https://www.lumicello.com)
- Instagram: [@lumicello.th](https://www.instagram.com/lumicello.th)
- LINE: [Official Account](https://lin.ee/eH1GxA5)
