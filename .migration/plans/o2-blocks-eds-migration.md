# O2 Block Migration Plan — promo-banner, features, pricing-cards

## Overview

Migrate 3 blocks from o2online.es to AEM Edge Delivery Services for Universal Editor (xwalk). Two blocks already exist (`promo-banner`, `features`) and need CSS/JS refinement; one (`pricing-cards`) is new.

**Project type:** xwalk (Universal Editor)  
**Model file convention:** `_blockname.json` (per existing project pattern)  
**Instrumentation:** `moveInstrumentation()` from `../../scripts/scripts.js`

---

## Current State

| Block | Exists? | Status |
|-------|---------|--------|
| promo-banner | Yes | JS/CSS/model need updates for spec (pill CTA, 80px height, icon 40px) |
| features | Yes | JS/CSS/model need updates (white cards, shadow, proper responsive) |
| pricing-cards | No | New block needed (similar to existing `tariff-cards` but different layout) |

---

## Block 1: promo-banner

### Files to update:
- `blocks/promo-banner/promo-banner.js` — Rework decoration: single-row flex layout, add icon/text/cta class structure, pill button class
- `blocks/promo-banner/promo-banner.css` — Full rewrite for: `background: #1400FF`, `height: ~80px`, icon 40px white, text 16px white, pill CTA (white bg, #1400FF text, `border-radius: 999px`, padding `12px 24px`)
- `blocks/promo-banner/_promo-banner.json` — Update model fields to: `icon`, `text`, `linkText` (cta-label), `linkUrl` (cta-url)

### CSS Spec:
```
Container: full-width, bg #1400FF, min-height 80px
Layout: flex row, align-items center, justify-content center, gap 16px
Icon: 40px × 40px, filter: brightness(0) invert(1) for white
Text: 16px, white, font-weight 400
CTA: bg white, color #1400FF, border-radius 999px, padding 12px 24px, font-weight 700, no border
CTA hover: bg #f0f0f0
```

### JS Spec:
- Extract icon cell, text cell, and link from authored content
- Apply `.promo-banner-icon`, `.promo-banner-text`, `.promo-banner-cta` classes
- Use `moveInstrumentation` for UE compatibility
- CTA gets `.button.pill` classes

---

## Block 2: features

### Files to update:
- `blocks/features/features.js` — Already uses `moveInstrumentation`; minor refine for card wrapper
- `blocks/features/features.css` — Rewrite for: white cards with `border-radius: 16px`, `box-shadow: 0 2px 20px rgba(0,0,0,0.08)`, icon blue 48px centered, title bold 18px centered, description 14px muted centered
- `blocks/features/_features.json` — Model already has icon/heading/description; confirm fields match spec

### CSS Spec:
```
Grid: 4-col desktop, 2-col tablet, 1-col mobile
Card: bg white, border-radius 16px, box-shadow 0 2px 20px rgba(0,0,0,0.08), padding 32px 24px
Icon: 48px, color #1400FF (via filter or SVG fill), centered
Title: 18px, font-weight 700, color #0d0d0d, centered, margin-top 16px
Description: 14px, color #666666, centered, line-height 1.5
Section title (above): 36px, font-weight 800, color #0d0d0d, centered
```

### JS Spec:
- Current structure is correct (grid > items > icon + text)
- Ensure `moveInstrumentation` is called on each row→item transition

---

## Block 3: pricing-cards (NEW)

### Files to create:
- `blocks/pricing-cards/pricing-cards.js`
- `blocks/pricing-cards/pricing-cards.css`
- `blocks/pricing-cards/_pricing-cards.json`

### CSS Spec:
```
Section background: #f5f5f5
Section title: 40px, font-weight 800, color #0d0d0d, centered
Grid: 3-col desktop, 2-col tablet, 1-col mobile
Card: bg white, border-radius 20px, box-shadow 0 2px 20px rgba(0,0,0,0.08), padding 32px
Card layout: flex-column, min-height for alignment

TOP ROW (flex, space-between, align-items flex-start):
  Left (specs): list items 15px, bold values
  Right (price): "35" in 40px font-weight 800, "€/mes" 14px inline, "precio final" 12px muted block

BOTTOM ROW (margin-top auto):
  Primary CTA: bg #1400FF, color white, border-radius 999px, padding 14px 28px, font-weight 700, width 100%
  Secondary CTA: color #1400FF, no underline, font-weight 700, hover underline
```

### JS Spec:
- `export default function decorate(block)` with `moveInstrumentation`
- Parse cells: specs (index 0), price (index 1), primaryCta (index 2), secondaryCta (index 3)
- Build card structure with `.pricing-card`, `.pricing-card-specs`, `.pricing-card-price`, `.pricing-card-actions`
- Primary button gets `.button.primary`, secondary gets `.button.secondary`

### Model (_pricing-cards.json):
- Container block: `pricing-cards` with filter
- Item: `pricing-card` with model fields:
  - `specs` (richtext) — spec list with bold values
  - `price` (text) — e.g. "35"
  - `priceUnit` (text) — e.g. "€/mes"
  - `priceLabel` (text) — e.g. "precio final"
  - `primaryCtaText` (text)
  - `primaryCtaLink` (aem-content)
  - `secondaryCtaText` (text)
  - `secondaryCtaLink` (aem-content)

---

## Step 4: component-definition.json

Add entries for `pricing-cards` block and `pricing-card` item. The other two blocks (`promo-banner`, `features`) are already registered.

---

## Checklist

- [ ] **promo-banner JS** — Rewrite `blocks/promo-banner/promo-banner.js` with proper icon/text/cta structure and `moveInstrumentation`
- [ ] **promo-banner CSS** — Rewrite `blocks/promo-banner/promo-banner.css` with full-width blue banner, 80px height, pill CTA, 40px icon
- [ ] **promo-banner model** — Update `blocks/promo-banner/_promo-banner.json` fields (icon, text, linkText, linkUrl)
- [ ] **features JS** — Refine `blocks/features/features.js` to ensure card wrapper structure for shadow/radius
- [ ] **features CSS** — Rewrite `blocks/features/features.css` with white cards, border-radius 16px, shadow, proper colors/sizes
- [ ] **features model** — Verify `blocks/features/_features.json` has correct fields (icon, heading, description richtext)
- [ ] **pricing-cards JS** — Create `blocks/pricing-cards/pricing-cards.js` with specs/price/actions layout
- [ ] **pricing-cards CSS** — Create `blocks/pricing-cards/pricing-cards.css` with grey bg, white cards, radius 20px, shadow, pill CTAs
- [ ] **pricing-cards model** — Create `blocks/pricing-cards/_pricing-cards.json` with container + item definitions
- [ ] **component-definition.json** — Add `pricing-cards` and `pricing-card` entries to blocks group
- [ ] **Preview verification** — Check all 3 blocks render correctly in local preview

---

## Execution Notes

- Execution requires exiting Plan mode
- Will implement in output order: promo-banner → features → pricing-cards → component-definition.json
- All CSS uses brand tokens as CSS custom properties where applicable
- All JS uses vanilla ES modules with `export default function decorate(block)`
- All models follow xwalk conventions with proper `data-aue-*` instrumentation support
