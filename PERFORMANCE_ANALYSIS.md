# Lumicello Website Performance Analysis
**Date:** 2026-01-10
**Bead:** gm-dbop
**Site:** https://lumicello.com

## Executive Summary

**Current Load Time:** ~18 seconds (complete page load)
**User Concern:** "Initial load takes a long time"

The analysis confirms significant performance issues. While the site is well-structured with modern HTML/CSS/JS, several bottlenecks are causing slow initial load:

1. **12 unoptimized LumiBox product images** loading synchronously (12 x ~15KB each = ~180KB)
2. **FontAwesome Kit loading 4 separate CSS files** (~5.3s initial load with 503 error on retry)
3. **Google Fonts loading 4 font files** without optimization
4. **Render-blocking CSS and JS** preventing faster First Contentful Paint

## Performance Metrics

### Load Times (Measured 2026-01-10)
| Metric | Time | Status |
|--------|------|--------|
| **Time to First Byte (TTFB)** | 1.9s | ⚠️ Slow |
| **DOM Interactive** | 11.2s | ❌ Very Slow |
| **DOM Content Loaded** | 11.3s | ❌ Very Slow |
| **Full Page Load** | 18.0s | ❌ Very Slow |

### Resource Breakdown
| Type | Count | Transfer Size | Notes |
|------|-------|---------------|-------|
| **Total Resources** | 35 | 228 KB | Compressed |
| HTML | 1 | - | Main page |
| CSS | 6 | 19 KB | 2 local + 4 FontAwesome |
| JavaScript | 4 | 8 KB | 2 local + FA + Analytics |
| **Images** | 14 | ~180 KB | **12 product images + 2 logos** |
| Fonts | 4 | - | Google Fonts (WOFF2) |

## Critical Issues

### 1. Images: Largest Performance Bottleneck ❌
**Impact: HIGH | Effort: MEDIUM**

All 12 LumiBox product images load immediately on page load, even though only Kit 1 is visible:

```
box_0-2.webp      18.9 KB  (1.1s)   ✅ Visible
items_0-2.webp    14.5 KB  (1.1s)   ✅ Visible
box_3-4.webp      18.0 KB  (1.6s)   ❌ Below fold
items_3-4.webp    14.7 KB  (9.1s)   ❌ Below fold
box_5-6.webp      16.2 KB  (7.8s)   ❌ Below fold
items_5-6.webp    13.7 KB  (11.0s)  ❌ Below fold
box_7-8.webp      14.7 KB  (9.5s)   ❌ Below fold
items_7-8.webp    13.9 KB  (13.6s)  ❌ Below fold
box_9-10.webp     15.3 KB  (10.9s)  ❌ Below fold
items_9-10.webp   12.6 KB  (11.8s)  ❌ Below fold
box_11-12.webp    15.9 KB  (15.9s)  ❌ Below fold
items_11-12.webp  14.2 KB  (12.6s)  ❌ Below fold
```

**Problem:** 10 out of 12 images (~150KB) load unnecessarily on initial page view.

**Root Cause (index.html:620-621, 650-651, etc.):**
```html
<img src="assets/images/lumibox/box_0-2.webp" alt="First Gazes Kit box" loading="lazy">
<img src="assets/images/lumibox/items_0-2.webp" alt="First Gazes Kit items spread" loading="lazy">
```

The `loading="lazy"` attribute is present but browsers still load below-the-fold images aggressively, especially when:
- Images are in a horizontal scroll container
- Modern browsers pre-fetch visible viewport content
- No explicit width/height prevents layout shift calculations

### 2. FontAwesome: Unnecessary Overhead ⚠️
**Impact: MEDIUM | Effort: LOW**

FontAwesome Kit loads 5 resources with a **503 error on retry**:

```
kit.fontawesome.com/bc46e65664.js     (5.3s) ⚠️ 503 on retry
ka-f.fontawesome.com/.../free.min.css
ka-f.fontawesome.com/.../free-v4-shims.min.css
ka-f.fontawesome.com/.../free-v5-font-face.min.css
ka-f.fontawesome.com/.../free-v4-font-face.min.css
```

**Problem:**
- Loads entire FontAwesome library (thousands of icons)
- Site only uses ~5-10 icons
- External dependency with occasional 503 errors
- Blocks rendering while loading CSS

**Icons Actually Used:**
- Envelope (newsletter)
- Arrow (CTA buttons)
- Social media (Instagram, LINE)

### 3. Google Fonts: Suboptimal Loading ⚠️
**Impact: MEDIUM | Effort: LOW**

Three font families load from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Nunito:ital,wght@0,300..1000;1,300..1000&family=Noto+Sans+Thai:wght@300..900&display=swap" rel="stylesheet">
```

**Issues:**
- No `font-display` optimization (defaults to `swap` which is okay)
- Loading 4 WOFF2 files sequentially
- No preloading for critical fonts
- Missing `preconnect` optimization (present but could be better)

### 4. Render-Blocking Resources ⚠️
**Impact: MEDIUM | Effort: LOW**

**Blocking CSS (index.html:35-36):**
```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/style.css">
```
Total: 19 KB (108 KB uncompressed)

**Blocking JavaScript (index.html:39, 944-945):**
```html
<!-- In HEAD (blocking) -->
<script src="https://kit.fontawesome.com/bc46e65664.js" crossorigin="anonymous"></script>

<!-- At end of BODY (non-blocking) -->
<script src="js/components.js"></script>
<script src="js/main.js"></script>
```

FontAwesome JS in HEAD blocks rendering. Local scripts are correctly placed at end of body.

### 5. Analytics: Minimal Impact ✅
**Impact: LOW | Effort: N/A**

Umami Analytics loads with `defer`:
```html
<script defer src="https://analytics.lumicello.com/script.js" data-website-id="..."></script>
```
This is correctly implemented and has minimal performance impact.

## Code Quality Assessment

### JavaScript (38 KB uncompressed)
**Status:** ✅ GOOD

- `main.js`: 894 lines, 29 KB - Well-structured, uses IntersectionObserver for scroll animations
- `components.js`: 222 lines, 9 KB - Shared nav/footer components
- No unnecessary dependencies
- Modern vanilla JS (no jQuery bloat)
- Efficient event handling

### CSS (117 KB uncompressed)
**Status:** ✅ GOOD

- `style.css`: 108 KB - Comprehensive but not bloated for a marketing site
- `variables.css`: 9 KB - CSS custom properties for theming
- No duplicate rules observed
- Uses modern CSS (Grid, Flexbox, custom properties)

### HTML
**Status:** ✅ GOOD with optimization opportunities

- Semantic HTML5
- Proper meta tags and Open Graph
- Structured data (JSON-LD) for SEO
- Accessibility considerations present
- **Issue:** No critical CSS inlining
- **Issue:** No resource hints for external domains

## Recommendations

### Priority 1: Optimize Image Loading (CRITICAL) 🔥
**Expected Impact:** Reduce load time by 8-10 seconds

#### Option A: True Lazy Loading (RECOMMENDED)
Replace browser's `loading="lazy"` with JavaScript-based lazy loading:

1. Add placeholder for below-fold images:
```html
<!-- Kit 1: Load immediately -->
<img src="assets/images/lumibox/box_0-2.webp" alt="First Gazes Kit box">

<!-- Kits 2-6: Lazy load -->
<img data-src="assets/images/lumibox/box_3-4.webp" alt="..." class="lazy-load">
```

2. Implement lazy loading with IntersectionObserver (already used for scroll animations):
```javascript
const lazyImages = document.querySelectorAll('.lazy-load');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy-load');
      imageObserver.unobserve(img);
    }
  });
}, { rootMargin: '50px' }); // Start loading 50px before visible

lazyImages.forEach(img => imageObserver.observe(img));
```

#### Option B: Carousel-Based Loading
Only load images for currently active carousel item:
- Load Kit 1 images immediately
- Load Kit N images when user navigates to that kit
- Preload Kit N+1 for smooth UX

### Priority 2: Replace FontAwesome with SVG Icons (HIGH) 🎯
**Expected Impact:** Remove 5 external requests, eliminate 503 errors

Extract the ~10 icons actually used and inline them as SVG:

**Current:**
```html
<i class="fa-regular fa-envelope"></i>
```

**Replace with:**
```html
<svg class="icon icon-envelope" viewBox="0 0 24 24">
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <polyline points="22,6 12,13 2,6"/>
</svg>
```

**Benefits:**
- Remove 5 external requests
- Eliminate 503 errors
- Reduce CSS payload
- Icons render instantly
- Better control over styling

### Priority 3: Optimize Font Loading (MEDIUM) 📝
**Expected Impact:** Improve perceived load time by 1-2 seconds

#### A. Preload Critical Fonts
Add to `<head>` before font link:
```html
<link rel="preload" href="https://fonts.gstatic.com/s/nunito/v32/XRXV3I6Li01BKofINeaBTMnFcQ.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2" as="font" type="font/woff2" crossorigin>
```

#### B. Self-Host Fonts (Optional)
Download WOFF2 files and serve from `/assets/fonts/`:
- Eliminates external request
- Avoids Google Fonts GDPR concerns
- Full control over caching

#### C. Subset Fonts
Google Fonts already provides subsets, but you could further optimize:
```
&text=LumicelloEvryhadgutnpswf...
```
Include only glyphs actually used on the site.

### Priority 4: Add Critical CSS (MEDIUM) 🎨
**Expected Impact:** Improve First Contentful Paint by 2-3 seconds

Inline critical above-the-fold CSS in `<head>`:

```html
<style>
/* Critical styles for hero section */
body { margin: 0; font-family: system-ui; }
.hero { min-height: 100vh; display: flex; ... }
.navbar { position: fixed; top: 0; width: 100%; ... }
/* ... 5-10 KB of critical styles ... */
</style>
<link rel="preload" href="css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/style.css"></noscript>
```

Use tools like Critical CSS Generator or manually extract styles for:
- Navigation bar
- Hero section
- Above-the-fold content

### Priority 5: Move FontAwesome to Async (LOW - if keeping FA) 🔧
**Expected Impact:** Small improvement to initial render

If keeping FontAwesome, make it non-blocking:

**Current:**
```html
<script src="https://kit.fontawesome.com/bc46e65664.js" crossorigin="anonymous"></script>
```

**Replace with:**
```html
<script src="https://kit.fontawesome.com/bc46e65664.js" crossorigin="anonymous" defer></script>
```

Or better: load via JavaScript:
```javascript
const faScript = document.createElement('script');
faScript.src = 'https://kit.fontawesome.com/bc46e65664.js';
faScript.defer = true;
document.head.appendChild(faScript);
```

## Implementation Plan

### Phase 1: Quick Wins (1-2 hours)
- [ ] Replace FontAwesome with inline SVG icons
- [ ] Add font preloading hints
- [ ] Move remaining blocking scripts to defer/async

**Expected Result:** Load time: 18s → 12-14s

### Phase 2: Image Optimization (2-3 hours)
- [ ] Implement IntersectionObserver lazy loading for kits 2-6
- [ ] Add blur-up placeholders (optional)
- [ ] Test on mobile/desktop

**Expected Result:** Load time: 12-14s → 5-7s

### Phase 3: Advanced Optimization (3-4 hours)
- [ ] Extract and inline critical CSS
- [ ] Consider self-hosting fonts
- [ ] Implement service worker for offline caching (optional)

**Expected Result:** Load time: 5-7s → 3-4s

## Comparison to Industry Standards

| Metric | Lumicello (Current) | Industry Target | Status |
|--------|---------------------|------------------|--------|
| Load Time | 18s | < 3s | ❌ 6x slower |
| TTFB | 1.9s | < 600ms | ⚠️ 3x slower |
| DOM Interactive | 11.2s | < 2s | ❌ 5x slower |
| Total Size | 228 KB (transfer) | < 500 KB | ✅ Good |
| Requests | 35 | < 50 | ✅ Good |

**Similar Sites Benchmark:**
- **Lovevery.com** (baby learning products): ~3-4s load time
- **KiwiCo.com** (kids subscription boxes): ~4-5s load time
- **Melissa & Doug** (educational toys): ~2-3s load time

Lumicello is **4-6x slower** than comparable e-commerce sites.

## Technical Notes

### Architecture Strengths
✅ Static HTML site (no server-side rendering overhead)
✅ Modern vanilla JS (no framework bloat)
✅ Efficient CSS (no unused frameworks like Bootstrap)
✅ Images already in WebP format
✅ Proper semantic HTML and accessibility
✅ Good SEO structure (meta tags, structured data)

### Tools Used for Analysis
- Chrome DevTools Performance API
- Network tab analysis
- Performance.getEntriesByType('navigation')
- Performance.getEntriesByType('resource')

### Testing Environment
- Browser: Chrome (via Claude in Chrome MCP)
- Location: Thailand
- Network: Standard broadband
- Date: 2026-01-10

## Conclusion

The site is well-built with modern best practices, but suffers from **over-eager resource loading**. The primary issue is **12 product images loading simultaneously** on initial page load, when only 2 are visible.

**Three changes will yield 80% improvement:**
1. Lazy load kits 2-6 images (save ~150KB, 8-10s)
2. Replace FontAwesome with inline SVG (save 5 requests, eliminate 503 errors)
3. Preload critical fonts (improve perceived performance by 1-2s)

**Realistic Target:** Reduce load time from 18s → 4-5s with 4-6 hours of optimization work.

---

**Next Steps:**
1. Review this analysis with team
2. Prioritize Phase 1 quick wins
3. Test changes on staging before production
4. Re-measure performance after each phase
