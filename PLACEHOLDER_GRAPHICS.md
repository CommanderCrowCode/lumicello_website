# LumiBox Placeholder Graphics

> **Purpose**: Document all graphics needed for the scrollytelling redesign.
> **Status**: Implementation in progress
> **Last Updated**: 2026-01-15

---

## How Placeholders Work

In the code, placeholders use:
1. **CSS gradient backgrounds** with text labels for boxes
2. **SVG placeholders** for icons and illustrations
3. **Data attributes** for identification: `data-placeholder="true"`

To replace a placeholder:
1. Find elements with `data-placeholder="true"`
2. Replace the `src` or `background` with actual asset
3. Remove the `data-placeholder` attribute

---

## Year Two Box Images (NEEDED)

| Asset | Filename | Dimensions | Description | Priority |
|-------|----------|------------|-------------|----------|
| Walking Tall Box | `box_13-14.webp` | 800x800 | Box packaging for 13-14 month kit | HIGH |
| Walking Tall Items | `items_13-14.webp` | 1200x800 | Flat-lay of kit contents | HIGH |
| Self & World Box | `box_15-16.webp` | 800x800 | Box packaging for 15-16 month kit | HIGH |
| Self & World Items | `items_15-16.webp` | 1200x800 | Flat-lay of kit contents | HIGH |
| Word Explosion Box | `box_17-18.webp` | 800x800 | Box packaging for 17-18 month kit | HIGH |
| Word Explosion Items | `items_17-18.webp` | 1200x800 | Flat-lay of kit contents | HIGH |
| Big Feelings Box | `box_19-20.webp` | 800x800 | Box packaging for 19-20 month kit | HIGH |
| Big Feelings Items | `items_19-20.webp` | 1200x800 | Flat-lay of kit contents | HIGH |
| Pretend Play Box | `box_21-22.webp` | 800x800 | Box packaging for 21-22 month kit | HIGH |
| Pretend Play Items | `items_21-22.webp` | 1200x800 | Flat-lay of kit contents | HIGH |
| Little Thinker Box | `box_23-24.webp` | 800x800 | Box packaging for 23-24 month kit | HIGH |
| Little Thinker Items | `items_23-24.webp` | 1200x800 | Flat-lay of kit contents | HIGH |

**Notes for Year 2 boxes:**
- Style should match Year 1 boxes but feel slightly more "grown up"
- Box labels should clearly show age range
- Items flat-lay should highlight developmental focus

---

## Domain Box Images (NEEDED)

| Asset | Filename | Dimensions | Description | Priority |
|-------|----------|------------|-------------|----------|
| Music Box | `box_music.webp` | 800x800 | Music domain box packaging | HIGH |
| Music Items | `items_music.webp` | 1200x800 | Music kit contents (instruments, cards) | HIGH |
| Math Box | `box_math.webp` | 800x800 | Math domain box packaging | HIGH |
| Math Items | `items_math.webp` | 1200x800 | Math kit contents (shapes, counting toys) | HIGH |
| Color Box | `box_color.webp` | 800x800 | Color domain box packaging | HIGH |
| Color Items | `items_color.webp` | 1200x800 | Color kit contents (sorting, crayons) | HIGH |
| Alphabet Box | `box_alphabet.webp` | 800x800 | Alphabet domain box packaging | HIGH |
| Alphabet Items | `items_alphabet.webp` | 1200x800 | Alphabet kit contents (letters, books) | HIGH |

**Notes for domain boxes:**
- Each should have distinct visual identity matching domain theme
- Music: Coral/orange tones, wave patterns
- Math: Teal/blue tones, geometric patterns
- Color: Rainbow/gradient aesthetic
- Alphabet: Yellow/gold tones, typography elements

---

## Illustration Assets (NEEDED)

### Tree Growth Illustration
| Asset | Filename | Format | Description | Priority |
|-------|----------|--------|-------------|----------|
| Growing Tree | `tree-growth.svg` | SVG | Animated tree for scroll effect | HIGH |
| Tree Stage 1 | `tree-stage-1.svg` | SVG | Sprout (fallback) | MEDIUM |
| Tree Stage 2 | `tree-stage-2.svg` | SVG | Small plant (fallback) | MEDIUM |
| Tree Stage 3 | `tree-stage-3.svg` | SVG | Young tree (fallback) | MEDIUM |
| Tree Stage 4 | `tree-stage-4.svg` | SVG | Full tree (fallback) | MEDIUM |
| Tree Stage 5 | `tree-stage-5.svg` | SVG | Tree with blooms (fallback) | MEDIUM |

**Tree design notes:**
- Soft, organic style matching Lumicello brand
- Trunk should be visible throughout growth
- Branches should fork for Year 1 and Year 2
- "Blooms" represent domain boxes (4 colored flowers)
- Consider animatable paths for smooth transitions

### Celebration Assets
| Asset | Filename | Format | Description | Priority |
|-------|----------|--------|-------------|----------|
| Birthday Cake | `birthday-cake.svg` | SVG | Simple cake illustration | MEDIUM |
| Confetti Pieces | `confetti-set.svg` | SVG | Various confetti shapes | LOW |

### Domain Icons
| Asset | Filename | Format | Description | Priority |
|-------|----------|--------|-------------|----------|
| Music Icon | `icon-music.svg` | SVG | Musical note/instrument | MEDIUM |
| Math Icon | `icon-math.svg` | SVG | Numbers/shapes | MEDIUM |
| Color Icon | `icon-color.svg` | SVG | Palette/rainbow | MEDIUM |
| Alphabet Icon | `icon-alphabet.svg` | SVG | Letters ABC | MEDIUM |

### UI Elements
| Asset | Filename | Format | Description | Priority |
|-------|----------|--------|-------------|----------|
| Scroll Indicator | `scroll-arrow.svg` | SVG | Animated down arrow | LOW |

---

## Background Patterns (OPTIONAL)

| Asset | Filename | Use Case | Priority |
|-------|----------|----------|----------|
| Sound Waves | `pattern-waves.svg` | Music domain background | LOW |
| Geometric Grid | `pattern-geo.svg` | Math domain background | LOW |
| Color Spectrum | `pattern-spectrum.svg` | Color domain background | LOW |
| Typography | `pattern-type.svg` | Alphabet domain background | LOW |

---

## Existing Assets (Available)

These assets already exist in `assets/images/lumibox/`:

| Asset | Filename | Status |
|-------|----------|--------|
| First Gazes Box | `box_0-2.webp` | ✅ Available |
| First Gazes Items | `items_0-2.webp` | ✅ Available |
| Tummy Time Box | `box_3-4.webp` | ✅ Available |
| Tummy Time Items | `items_3-4.webp` | ✅ Available |
| Grasp & Spin Box | `box_5-6.webp` | ✅ Available |
| Grasp & Spin Items | `items_5-6.webp` | ✅ Available |
| Sit & Explore Box | `box_7-8.webp` | ✅ Available |
| Sit & Explore Items | `items_7-8.webp` | ✅ Available |
| Stand & Move Box | `box_9-10.webp` | ✅ Available |
| Stand & Move Items | `items_9-10.webp` | ✅ Available |
| First Words Box | `box_11-12.webp` | ✅ Available |
| First Words Items | `items_11-12.webp` | ✅ Available |

---

## Placeholder Implementation

### CSS Placeholder for Missing Box Images

```css
.kit-card[data-placeholder="true"] .kit-card__image {
    background: linear-gradient(135deg, var(--placeholder-color-1) 0%, var(--placeholder-color-2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
```

### HTML Placeholder Structure

```html
<div class="kit-card__image" data-placeholder="true" data-asset-needed="box_13-14.webp">
    <span class="placeholder-label">Walking Tall Box</span>
    <span class="placeholder-note">13-14 months</span>
</div>
```

---

## Replacement Checklist

When assets are ready, use this checklist:

### Year 2 Boxes
- [ ] `box_13-14.webp` - Replace placeholder in Phase 4
- [ ] `items_13-14.webp` - Replace placeholder in Phase 4
- [ ] `box_15-16.webp` - Replace placeholder in Phase 4
- [ ] `items_15-16.webp` - Replace placeholder in Phase 4
- [ ] `box_17-18.webp` - Replace placeholder in Phase 5
- [ ] `items_17-18.webp` - Replace placeholder in Phase 5
- [ ] `box_19-20.webp` - Replace placeholder in Phase 5
- [ ] `items_19-20.webp` - Replace placeholder in Phase 5
- [ ] `box_21-22.webp` - Replace placeholder in Phase 6
- [ ] `items_21-22.webp` - Replace placeholder in Phase 6
- [ ] `box_23-24.webp` - Replace placeholder in Phase 6
- [ ] `items_23-24.webp` - Replace placeholder in Phase 6

### Domain Boxes
- [ ] `box_music.webp` - Replace in Music section
- [ ] `items_music.webp` - Replace in Music section
- [ ] `box_math.webp` - Replace in Math section
- [ ] `items_math.webp` - Replace in Math section
- [ ] `box_color.webp` - Replace in Color section
- [ ] `items_color.webp` - Replace in Color section
- [ ] `box_alphabet.webp` - Replace in Alphabet section
- [ ] `items_alphabet.webp` - Replace in Alphabet section

### Illustrations
- [ ] `tree-growth.svg` - Replace CSS placeholder tree
- [ ] `birthday-cake.svg` - Replace emoji placeholder
- [ ] Domain icons - Replace emoji placeholders

---

## Quick Find Commands

Find all placeholders in the codebase:
```bash
grep -r "data-placeholder" lumibox.html
grep -r "asset-needed" lumibox.html
```

Find placeholder CSS:
```bash
grep -r "placeholder" css/lumibox-scroll.css
```
