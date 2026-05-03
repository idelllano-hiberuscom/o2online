# O2 España Homepage Migration Plan

## Source
- **URL:** https://www.o2online.es
- **Target:** AEM Edge Delivery Services (Universal Editor / xwalk template)
- **Existing Project:** xwalk boilerplate with hero, cards, columns, fragment blocks

---

## Page Analysis Summary

The O2 España homepage is a telecommunications provider landing page with a dark brand aesthetic, product pricing grids, tabbed navigation between service tiers, and promotional content. Key visual characteristics include a charcoal/dark background header and hero, white product cards with pricing emphasis, and a clean sans-serif typography system.

---

## Block Inventory & Mapping

| # | Source Section | EDS Block | Status | Notes |
|---|---|---|---|---|
| 1 | Header/Navigation | `header` | Exists (modify) | Add O2 branding, nav links, customer login |
| 2 | Hero Banner | `hero` | Exists (extend) | Add tagline + CTA button support, dark overlay |
| 3 | Service Tabs | `tabs` | **New** | Tabbed interface switching product categories |
| 4 | Tariff/Pricing Cards | `tariff-cards` | **New** | Product cards with specs, price, dual CTAs |
| 5 | Promo Banner | `promo-banner` | **New** | Inline promotion with icon, text, link |
| 6 | Coverage Check CTA | `cta-banner` | **New** | Icon + text + button callout |
| 7 | Content Carousel | `carousel` | **New** | Horizontal scrollable cards with images |
| 8 | Why O2 (Features) | `features` | **New** | 4-column icon + heading + description grid |
| 9 | App Promotion | `columns` | Exists (extend) | Two-column text+image layout (app download) |
| 10 | Advantages Grid | `advantages` | **New** | 6-item (2×3) icon + text benefit grid |
| 11 | Support CTA | `cta-banner` | Reuse #6 | Variant with phone number |
| 12 | Footer | `footer` | Exists (modify) | Multi-column links, social, legal |

**Total new blocks:** 7 (tabs, tariff-cards, promo-banner, cta-banner, carousel, features, advantages)
**Extended/modified blocks:** 3 (hero, header, footer)

---

## Design System Extraction

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#000028` | Dark navy/charcoal backgrounds |
| `--color-secondary` | `#0019A5` | Blue accent, active states |
| `--color-accent` | `#00C7B1` | Teal highlights, badges |
| `--color-white` | `#FFFFFF` | Text on dark, card backgrounds |
| `--color-gray-100` | `#F4F4F4` | Light section backgrounds |
| `--color-gray-200` | `#E0E0E0` | Borders, dividers |
| `--color-gray-600` | `#6C6C6C` | Secondary text |
| `--color-text` | `#1A1A1A` | Body text |
| `--color-cta` | `#0019A5` | Primary button background |

### Typography
| Token | Value |
|---|---|
| `--font-family-body` | `'On Air', sans-serif` (O2 brand font, fallback to system) |
| `--font-family-heading` | `'On Air', sans-serif` |
| `--font-size-hero` | `48px` (mobile) / `64px` (desktop) |
| `--font-size-h2` | `32px` / `40px` |
| `--font-size-h3` | `24px` / `28px` |
| `--font-size-body` | `16px` |
| `--font-size-small` | `14px` |
| `--font-weight-bold` | `700` |
| `--font-weight-medium` | `500` |
| `--font-weight-regular` | `400` |

### Spacing & Layout
| Token | Value |
|---|---|
| `--spacing-xs` | `8px` |
| `--spacing-sm` | `16px` |
| `--spacing-md` | `24px` |
| `--spacing-lg` | `40px` |
| `--spacing-xl` | `64px` |
| `--spacing-xxl` | `80px` |
| `--max-width` | `1200px` |
| `--nav-height` | `64px` |

### Breakpoints
| Name | Value |
|---|---|
| Mobile | `< 768px` |
| Tablet | `768px – 1023px` |
| Desktop | `≥ 1024px` |

---

## Detailed Block Specifications

### 1. `hero` (extend existing)
- **Fields:** image, imageAlt, heading, tagline, ctaText, ctaLink
- **Behavior:** Full-width dark background, centered text, CTA button
- **Responsive:** Stacks vertically on mobile, reduces heading size

### 2. `tabs` (new)
- **Fields:** Tab items (label, content reference)
- **Behavior:** Horizontal tab strip; switches visible content section below
- **Responsive:** Horizontal scroll on mobile if tabs overflow

### 3. `tariff-cards` (new)
- **Fields:** Per card: title, speed, data, features[], price, priceLabel, primaryCta, secondaryCta
- **Behavior:** Grid of product cards (2-4 columns responsive)
- **Responsive:** 1 col mobile → 2 col tablet → 3-4 col desktop

### 4. `promo-banner` (new)
- **Fields:** icon, text, linkText, linkUrl, image (optional)
- **Behavior:** Full-width inline banner with accent styling
- **Responsive:** Image hidden on mobile

### 5. `cta-banner` (new)
- **Fields:** icon, heading, description, buttonText, buttonLink
- **Behavior:** Centered callout with icon and prominent CTA
- **Responsive:** Stacks vertically, full-width button on mobile

### 6. `carousel` (new)
- **Fields:** Items with image, heading, description, linkText, linkUrl
- **Behavior:** Horizontal scroll with navigation dots/arrows
- **Responsive:** 1 visible item mobile → 2 tablet → 4 desktop

### 7. `features` (new)
- **Fields:** Per item: icon, heading, description
- **Behavior:** 4-column grid of icon + text features
- **Responsive:** 1 col mobile → 2 col tablet → 4 col desktop

### 8. `advantages` (new)
- **Fields:** Per item: icon, heading, description
- **Behavior:** 2×3 grid layout of benefits
- **Responsive:** 1 col mobile → 2 col tablet → 3 col desktop

---

## File Output Plan

### Global Styles
- `styles/styles.css` — O2 brand tokens, reset, global typography
- `styles/fonts.css` — O2 "On Air" font-face declarations (with Roboto fallback if custom font unavailable)

### Block Files (per block)
```
blocks/hero/hero.js, hero.css, _hero.json
blocks/tabs/tabs.js, tabs.css, _tabs.json
blocks/tariff-cards/tariff-cards.js, tariff-cards.css, _tariff-cards.json
blocks/promo-banner/promo-banner.js, promo-banner.css, _promo-banner.json
blocks/cta-banner/cta-banner.js, cta-banner.css, _cta-banner.json
blocks/carousel/carousel.js, carousel.css, _carousel.json
blocks/features/features.js, features.css, _features.json
blocks/advantages/advantages.js, advantages.css, _advantages.json
blocks/header/header.js, header.css
blocks/footer/footer.js, footer.css
```

### Universal Editor Configuration
- `component-definition.json` — Register all blocks
- `component-models.json` — Field definitions for all blocks
- `component-filters.json` — Container allowlists

### Page Content
- `content/index.html` — Homepage xwalk markup with `data-aue-*` attributes

---

## Checklist

- [ ] Extract and apply O2 design system to `styles/styles.css`
- [ ] Update `styles/fonts.css` with O2 brand typography
- [ ] Extend `blocks/hero/` with tagline + CTA support
- [ ] Create `blocks/tabs/` (js + css + _model.json)
- [ ] Create `blocks/tariff-cards/` (js + css + _model.json)
- [ ] Create `blocks/promo-banner/` (js + css + _model.json)
- [ ] Create `blocks/cta-banner/` (js + css + _model.json)
- [ ] Create `blocks/carousel/` (js + css + _model.json)
- [ ] Create `blocks/features/` (js + css + _model.json)
- [ ] Create `blocks/advantages/` (js + css + _model.json)
- [ ] Update `blocks/header/` with O2 navigation structure
- [ ] Update `blocks/footer/` with O2 footer structure
- [ ] Update `component-definition.json` with all new blocks
- [ ] Update `component-models.json` with all field definitions
- [ ] Update `component-filters.json` with container rules
- [ ] Generate `content/index.html` with full xwalk markup
- [ ] Verify page renders correctly in local preview
- [ ] Visual comparison with source page

---

## Dependencies & Risks

| Risk | Mitigation |
|---|---|
| O2 "On Air" brand font not publicly available | Use Roboto as fallback with similar metrics |
| Tabs require JS-heavy interaction | Keep decoration minimal, progressively enhance |
| Tariff cards have complex pricing layouts | Structured model with clear field separation |
| Carousel needs touch/swipe support | CSS scroll-snap with minimal JS enhancement |
| Page is content-heavy (15+ sections) | Break into fragment-based sections for authoring |

---

## Execution Requirements

This plan requires **Execute mode** to implement. Switch out of Plan mode to begin generating files in the order specified above.
