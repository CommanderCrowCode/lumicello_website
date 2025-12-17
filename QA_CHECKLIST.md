# Lumicello Website QA Checklist

> **Note:** This document is for internal QA purposes only and should not be deployed to production.

## Quick Reference: Facebook Links Policy

| Link Type | URL | Use For |
|-----------|-----|---------|
| **Facebook Group** | `https://web.facebook.com/share/g/1ByigscXwU/` | Community, engagement, content sharing |
| **Facebook Page** | `https://web.facebook.com/LumicelloCompany/` | Footer, Contact, Support, Legal pages |

---

## 1. Homepage (`index.html`)

### Navigation
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Logo | Navigate to homepage | `index.html` |
| Platform | Scroll to Bento Grid section | `#platform` |
| Curiosity Fingerprint | Scroll to Fingerprint section | `#fingerprint` |
| LumiBox | Scroll to Kits section | `#kits` |
| About | Scroll to About section | `#about` |
| Join Community (button) | Scroll to Community section | `#community` |
| Mobile hamburger menu | Toggle mobile nav | JS toggle |

### Hero Section
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Join Our Community | Scroll to Community section | `#community` |
| Explore Kits | Scroll to Kits section | `#kits` |

### Community Section
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Newsletter form | Submit to Kit.com | `https://app.kit.com/forms/8398985/subscriptions` |
| Newsletter fields | Collect name + email | `fields[first_name]`, `email_address` |
| LINE Card (entire card clickable) | Open LINE Official | `https://lin.ee/eH1GxA5` _(new tab)_ |
| Facebook Card (entire card clickable) | Open Facebook **GROUP** | `https://web.facebook.com/share/g/1ByigscXwU/` _(new tab)_ |

### Footer (Homepage)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Logo | Navigate to homepage | `index.html` |
| Product links | Scroll to respective sections | `#platform`, `#fingerprint`, `#kits` |
| For Educators | Coming Soon page | `coming-soon.html` |
| Company links | Various | See footer section below |
| Support links | Various | See footer section below |
| Facebook icon | Open Facebook **PAGE** | `https://web.facebook.com/LumicelloCompany/` _(new tab)_ |
| LINE icon | Open LINE Official | `https://lin.ee/eH1GxA5` _(new tab)_ |

---

## 2. Contact Page (`contact.html`)

### Contact Methods
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| LINE Card | Open LINE Official | `https://lin.ee/eH1GxA5` _(new tab)_ |
| Facebook Card | Open Facebook **PAGE** | `https://web.facebook.com/LumicelloCompany/` _(new tab)_ |
| Email link | Open mail client | `mailto:contact@lumicello.com` |

### Contact Form (Formspree)
| Element | Expected Behavior | Details |
|---------|-------------------|---------|
| Form action | Submit to Formspree | `https://formspree.io/f/xzznrzdb` |
| Form fields | Collect contact info | `first_name`, `last_name`, `email`, `subject`, `message` |
| After submit | Redirect back to contact page | `contact.html?submitted=true` |
| Email notification | Send to Lumicello | `contact@lumicello.com` |

---

## 3. Legal Pages

### Terms of Service (`terms.html`)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| LINE link | Open LINE Official | `https://lin.ee/eH1GxA5` _(new tab)_ |
| Facebook link | Open Facebook **PAGE** | `https://web.facebook.com/LumicelloCompany/` _(new tab)_ |

### Privacy Policy (`privacy.html`)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| LINE link | Open LINE Official | `https://lin.ee/eH1GxA5` _(new tab)_ |
| Facebook link | Open Facebook **PAGE** | `https://web.facebook.com/LumicelloCompany/` _(new tab)_ |

---

## 4. Shared Components (`js/components.js`)

These components are injected into subpages via JavaScript.

### Navigation (all subpages)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Logo | Navigate to homepage | `index.html` |
| Platform | Navigate to homepage section | `index.html#platform` |
| Curiosity Fingerprint | Navigate to homepage section | `index.html#fingerprint` |
| LumiBox | Navigate to homepage section | `index.html#kits` |
| About | Navigate to homepage section | `index.html#about` |
| Join Community | Navigate to homepage section | `index.html#community` |

### Footer (all subpages)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Logo | Navigate to homepage | `index.html` |
| Facebook icon | Open Facebook **PAGE** | `https://web.facebook.com/LumicelloCompany/` _(new tab)_ |
| LINE icon | Open LINE Official | `https://lin.ee/eH1GxA5` _(new tab)_ |

---

## 5. Other Pages

### Coming Soon (`coming-soon.html`)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Back to Home | Navigate to homepage | `index.html` |
| Contact Us | Navigate to contact page | `contact.html` |
| Newsletter form | Submit to Kit.com | `https://app.kit.com/forms/8398985/subscriptions` |
| Newsletter fields | Collect name + email | `fields[first_name]`, `email_address` |

### 404 Page (`404.html`)
| Element | Expected Behavior | Link/Action |
|---------|-------------------|-------------|
| Back to Home | Navigate to homepage | `index.html` |
| Get Help | Navigate to contact page | `contact.html` |
| Curiosity Fingerprint (suggestion) | Navigate to fingerprint section | `index.html#fingerprint` |
| LumiBox (suggestion) | Navigate to kits section | `index.html#kits` |
| Join Community (suggestion) | Navigate to community section | `index.html#community` |

---

## 6. Functional Tests

### Newsletter Form
- [ ] First name field accepts text input
- [ ] Email field validates email format
- [ ] Form submits successfully to Kit.com
- [ ] Success/error feedback displays correctly

### Mobile Menu
- [ ] Hamburger icon toggles menu visibility
- [ ] Menu links navigate correctly
- [ ] Menu closes after clicking a link
- [ ] Menu closes when clicking outside

### Scroll Reveal Animations
- [ ] Elements fade in when scrolling into view
- [ ] Animation timing feels smooth (0.8s)
- [ ] No janky or stuttering animations

### Responsive Breakpoints
Test at these widths:
- [ ] 320px (mobile)
- [ ] 768px (tablet)
- [ ] 1024px (small desktop)
- [ ] 1440px (large desktop)

---

## 7. External Link Verification

All external links should:
- [ ] Open in new tab (`target="_blank"`)
- [ ] Have security attributes (`rel="noopener"`)
- [ ] Actually load the correct destination

| URL | Expected Destination |
|-----|---------------------|
| `https://lin.ee/eH1GxA5` | LINE Official Account add friend page |
| `https://web.facebook.com/share/g/1ByigscXwU/` | Lumicello Parents Global Facebook Group |
| `https://web.facebook.com/LumicelloCompany/` | Lumicello Facebook Company Page |
| `https://app.kit.com/forms/8398985/subscriptions` | Kit.com newsletter subscription |

---

## 8. Image Loading

| Image | Location | Lazy Loading |
|-------|----------|--------------|
| Logo (nav) | All pages | No (above fold) |
| Hero image | Homepage | No (above fold) |
| Kit images (6) | Homepage | Yes |
| Logo (footer) | All pages | Yes |

---

## Notes for QA Team

1. **Facebook Group vs Page**: This is critical. Community/engagement CTAs go to the Group. Support/contact links go to the Page.

2. **LINE links**: All LINE links should go to the same Official Account.

3. **Newsletter**: Both homepage and coming-soon page have newsletter forms - test both.

4. **Components.js**: The footer and nav on subpages are generated by JavaScript. If JS fails to load, these won't appear.

---

_Last updated: November 2025_
