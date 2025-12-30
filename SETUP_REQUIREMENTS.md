# Lumicello Website - Setup Requirements

> **Note:** This document is for internal setup purposes only and is not deployed to production.

This document tracks all external integrations, deployment configuration, and setup requirements.

---

## Table of Contents

1. [External Scripts](#external-scripts)
2. [Kit.com Newsletter Integration](#kitcom-newsletter-integration)
3. [Formspree Contact Form](#formspree-contact-form)
4. [Social Media URLs](#social-media-urls)
5. [Render.com Deployment](#rendercom-deployment)
6. [Project Structure](#project-structure)
7. [Analytics & Tracking](#analytics--tracking-optional)
8. [Completion Checklist](#completion-checklist)

---

## External Scripts

| Script | Value | Used On |
|--------|-------|---------|
| FontAwesome | `<script src="https://kit.fontawesome.com/bc46e65664.js" crossorigin="anonymous"></script>` | All pages |
| Google Fonts | Fraunces, Nunito, Noto Sans Thai | All pages (via CSS) |

---

## Kit.com Newsletter Integration

| Item | Status | Value |
|------|--------|-------|
| Form Action URL | [x] Done | `https://app.kit.com/forms/8398985/subscriptions` |
| Form ID | [x] Done | `8398985` |
| Form UID | [x] Done | `65a3e2d3a6` |
| Form Fields | [x] Done | Name: `fields[first_name]`, Email: `email_address` |

**Used on:**
- `index.html` - Community section newsletter form
- `coming-soon.html` - Notify Me form

### How to Get Kit.com Form Code
1. Log in to [Kit.com](https://kit.com)
2. Go to **Grow** → **Landing Pages & Forms**
3. Create or select your newsletter form
4. Click **Publish** → **HTML**
5. Copy the form action URL or full embed code

---

## Formspree Contact Form

| Item | Status | Value |
|------|--------|-------|
| Form ID | [x] Done | `xzznrzdb` |
| Form Action URL | [x] Done | `https://formspree.io/f/xzznrzdb` |
| Submissions sent to | [x] Done | `contact@lumicello.com` |

**Form Fields:**
- `first_name` - First name (required)
- `last_name` - Last name (required)
- `email` - Email address (required)
- `subject` - Subject line (required)
- `message` - Message body (required)

**Hidden Fields:**
- `_subject` - Email subject: "New Contact Form Submission - Lumicello"
- `_next` - Redirect URL after submission: `contact.html?submitted=true`

**Used on:**
- `contact.html` - Contact form with success modal

### How to Manage Formspree
1. Log in to [Formspree.io](https://formspree.io)
2. Go to your form dashboard
3. View submissions, configure spam filtering, set email notifications
4. Free tier: 50 submissions/month

---

## Social Media URLs

| Platform | Status | URL | Use For |
|----------|--------|-----|---------|
| LINE Official Account | [x] Done | `https://lin.ee/eH1GxA5` | All LINE links |
| Instagram | [x] Done | `https://www.instagram.com/lumicello.th` | Community section, Footer, Contact page |

---

## Render.com Deployment

### Overview

The website uses a **build script** to ensure sensitive files (documentation, config) are not publicly accessible. Only public files are copied to the `dist/` folder for deployment.

### Deployment Configuration

| Setting | Value |
|---------|-------|
| Service Type | Static Site |
| Build Command | `node build.js` |
| Publish Directory | `dist` |
| Branch | `main` |

### How to Deploy on Render.com

#### Step 1: Create Static Site

1. Log in to [Render.com](https://render.com)
2. Click **New** → **Static Site**
3. Connect your GitHub repository
4. Select the `lumicello_website` repository
5. Choose the `main` branch

#### Step 2: Configure Build Settings

| Field | Value |
|-------|-------|
| Name | `lumicello-website` |
| Branch | `main` |
| Build Command | `node build.js` |
| Publish Directory | `dist` |

#### Step 3: Deploy

1. Click **Create Static Site**
2. Render will automatically:
   - Clone the repository
   - Run `node build.js`
   - Deploy contents of `dist/` folder
3. Wait for build to complete (usually 1-2 minutes)

#### Step 4: Configure Custom Domain (Optional)

1. Go to your static site dashboard
2. Click **Settings** → **Custom Domains**
3. Add `lumicello.com` and `www.lumicello.com`
4. Update DNS records as instructed:
   - `A` record pointing to Render's IP
   - Or `CNAME` record pointing to your Render URL
5. SSL certificate is automatically provisioned

### Build Script Details

The `build.js` script uses a **whitelist approach** for security:

**Files Included:**
```
index.html
contact.html
privacy.html
terms.html
voucher-terms.html
404.html
coming-soon.html
welcome.html
robots.txt
sitemap.xml
llms.txt
favicon.ico
favicon.png
favicon-192.png
apple-touch-icon.png
svg_favicon.svg
```

**Folders Included:**
```
css/
js/
assets/
```

**Files Excluded (Protected):**
```
*.md files (CLAUDE.md, QA_CHECKLIST.md, SETUP_REQUIREMENTS.md, etc.)
design_specs/
render.yaml
_redirects
build.js
.gitignore
.git/
.playwright-mcp/
```

### Testing the Build Locally

```bash
# Run the build script
node build.js

# Verify dist/ contents
ls -la dist/

# Serve locally to test
cd dist && python -m http.server 8080
```

### Automatic Deployments

Render automatically redeploys when you push to the `main` branch. No manual action needed.

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `build.js` for syntax errors, ensure Node.js is available |
| Missing files | Add files to `PUBLIC_FILES` or `PUBLIC_FOLDERS` in `build.js` |
| 404 on all routes | Ensure `render.yaml` has correct `staticPublishPath: ./dist` |
| Sensitive files visible | Verify build script runs and `dist/` doesn't contain `.md` files |

---

## Project Structure

```
lumicello_website/
├── index.html              # Homepage
├── contact.html            # Contact page with Formspree form
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── voucher-terms.html      # Voucher T&C (unlisted)
├── 404.html                # Custom 404 page
├── coming-soon.html        # Coming Soon page (For Educators)
├── welcome.html            # Newsletter confirmation page
├── favicon.ico             # Site favicon
├── css/
│   ├── variables.css       # Design tokens
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Main interactions
│   └── components.js       # Shared nav/footer components
├── assets/
│   ├── images/             # All images
│   └── icons/              # SVG icons
├── design_specs/           # Internal design documentation (NOT deployed)
├── build.js                # Build script for deployment
├── render.yaml             # Render.com configuration
├── _redirects              # Redirect rules (reference only, not used by Render)
├── CLAUDE.md               # Claude Code instructions (NOT deployed)
├── QA_CHECKLIST.md         # QA testing checklist (NOT deployed)
└── SETUP_REQUIREMENTS.md   # This file (NOT deployed)
```

---

## Analytics & Tracking (Optional)

| Service | Status | ID |
|---------|--------|-----|
| Google Analytics 4 | [ ] Pending | G-XXXXXXXXXX |
| LINE Tag | [ ] Pending | |

---

## Completion Checklist

### Required for Launch
- [x] Kit.com newsletter form integration
- [x] Formspree contact form integration
- [x] Social media URLs configured
- [x] All pages created and linked
- [x] Responsive design tested
- [x] Build script for secure deployment

### Required for Production
- [x] Render.com deployment configured
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic on Render)
- [ ] DNS records updated

### Nice to Have
- [ ] Analytics tracking (GA4)
- [ ] Additional testimonials
- [ ] Performance optimization (image compression)
- [ ] SEO meta tags review

---

## Contact Information

| Purpose | Email |
|---------|-------|
| General Contact | contact@lumicello.com |
| Form Submissions | contact@lumicello.com (via Formspree) |

---

_Last updated: December 2025_
