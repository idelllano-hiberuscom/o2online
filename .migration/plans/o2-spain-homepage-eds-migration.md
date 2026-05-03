# O2 Spain Homepage Migration Plan - AEM EDS (xwalk)

## Source Analysis Summary

**URL:** https://www.o2online.es  
**Page Title:** O2 | Fibra, Movil y sencillez. Respira

### Design Tokens Extracted
| Token | Value |
|-------|-------|
| Primary Blue | `rgb(0, 80, 255)` / `#0050FF` |
| Text Color | `rgb(74, 74, 74)` / `#4A4A4A` |
| Headings Color | `rgb(0, 0, 0)` / `#000` |
| White | `#FFF` |
| Light Gray BG | `rgb(248, 248, 248)` / `#F8F8F8` |
| Font Family | `OnAir-Light, Arial, sans-serif` (body), `OnAir-Regular` (headings) |
| Body Font Size | `18px` |
| H2 Size | `40px` |
| CTA Border Radius | `60px` |
| Card Border Radius | `40px` |
| Card Shadow | `rgba(0,0,0,0.1) 0px 8px 20px 0px` |
| Button Padding | `10px 24px` (hero), `12px 16px` (cards) |
| Footer BG | `rgb(0, 80, 255)` |

---

## Identified Blocks (8 blocks)

| # | Block Name | Type | Description |
|---|-----------|------|-------------|
| 1 | `hero` | Single (model) | Full-width hero with background image, H1, subtitle, CTA |
| 2 | `tariff-cards` | Repeatable (filter) | Pricing cards with tabs (Fibra y Movil, etc.), price, 2 CTAs |
| 3 | `coverage-banner` | Single (model) | Simple banner with text + CTA for cobertura check |
| 4 | `discover-grid` | Repeatable (filter) | 4-card promotional grid with bg colors and overlay text |
| 5 | `features` | Repeatable (filter) | "¿Por qué elegir O2?" - icon + title + description cards |
| 6 | `app-promo` | Single (model) | App Mi O2 section with features list + store badges |
| 7 | `advantages` | Repeatable (filter) | "Y con todas estas ventajas" - 6 benefit items with icons |
| 8 | `contact-strip` | Single (model) | Simple contact strip with phone number + link |

---

## Architecture Per Block

### 1. Hero (Single Content - model)
- **Files:** `blocks/hero/_hero.json`, `blocks/hero/hero.js`, `blocks/hero/hero.css`
- **JSON keys:** definitions, item-definitions: [], models, filters: []
- **Template:** `{ "name": "Hero", "model": "hero" }`
- **Model fields:** backgroundImage (reference), title (text), subtitle (text), ctaLink (aem-content)
- **JS:** Can reorganize DOM freely (no items)
- **Styles:** Full-width, bg image cover, white text, blue CTA pill button

### 2. Tariff Cards (Repeatable - filter)
- **Files:** `blocks/tariff-cards/_tariff-cards.json`, `blocks/tariff-cards/tariff-cards.js`, `blocks/tariff-cards/tariff-cards.css`
- **JSON keys:** definitions (parent with filter), item-definitions (child item), models (item model), filters (parent filter)
- **Parent template:** `{ "name": "Tariff Cards", "filter": "tariff-cards" }`
- **Child resourceType:** `core/franklin/components/block/v1/block/item`
- **Child template:** `{ "name": "Tariff Card", "model": "tariff-cards-item" }`
- **Item model fields:** planName (text), speed (text), data (text), price (text), priceLabel (text), ctaPrimary (aem-content), ctaSecondary (aem-content)
- **JS:** ONLY classList.add() on existing block.children divs
- **Styles:** White cards, 40px radius, shadow, `#F8F8F8` section background

### 3. Coverage Banner (Single - model)
- **Files:** `blocks/coverage-banner/_coverage-banner.json`, `blocks/coverage-banner/coverage-banner.js`, `blocks/coverage-banner/coverage-banner.css`
- **JSON keys:** definitions, item-definitions: [], models, filters: []
- **Model fields:** text (richtext), ctaLink (aem-content)
- **Styles:** Blue gradient background, white text, pill CTA

### 4. Discover Grid (Repeatable - filter)
- **Files:** `blocks/discover-grid/_discover-grid.json`, `blocks/discover-grid/discover-grid.js`, `blocks/discover-grid/discover-grid.css`
- **Parent template:** `{ "name": "Discover Grid", "filter": "discover-grid" }`
- **Child template:** `{ "name": "Discover Card", "model": "discover-grid-item" }`
- **Item model fields:** image (reference, valueType: string), title (text), description (text), link (aem-content)
- **JS:** classList.add() only
- **Styles:** Flex grid, 60px radius cards, blue bg default, overlay text

### 5. Features (Repeatable - filter)
- **Files:** `blocks/features/_features.json`, `blocks/features/features.js`, `blocks/features/features.css`
- **Parent template:** `{ "name": "Features", "filter": "features" }`
- **Child template:** `{ "name": "Feature Item", "model": "features-item" }`
- **Item model fields:** icon (reference, valueType: string), title (text), description (richtext)
- **JS:** classList.add() only
- **Styles:** 2-column grid, H3 16px bold, text underneath

### 6. App Promo (Single - model)
- **Files:** `blocks/app-promo/_app-promo.json`, `blocks/app-promo/app-promo.js`, `blocks/app-promo/app-promo.css`
- **Model fields:** title (text), description (richtext), appStoreLink (aem-content), playStoreLink (aem-content), image (reference)
- **Styles:** Two-column layout, app image + text content

### 7. Advantages (Repeatable - filter)
- **Files:** `blocks/advantages/_advantages.json`, `blocks/advantages/advantages.js`, `blocks/advantages/advantages.css`
- **Parent template:** `{ "name": "Advantages", "filter": "advantages" }`
- **Child template:** `{ "name": "Advantage Item", "model": "advantages-item" }`
- **Item model fields:** icon (reference, valueType: string), title (text), description (richtext)
- **JS:** classList.add() only
- **Styles:** 3-column grid with icon + title + description

### 8. Contact Strip (Single - model)
- **Files:** `blocks/contact-strip/_contact-strip.json`, `blocks/contact-strip/contact-strip.js`, `blocks/contact-strip/contact-strip.css`
- **Model fields:** text (richtext), ctaLink (aem-content)
- **Styles:** Light gray background (`#F9F9F9`), centered text, padding 32px

---

## Infrastructure Changes

### `models/_component-definition.json`
Add to "Blocks" group:
```json
{ "...": "../blocks/*/_*.json#/item-definitions" }
```

### `models/_section.json`
Add all new block IDs to the section filter:
```
hero, tariff-cards, coverage-banner, discover-grid, features, app-promo, advantages, contact-strip
```

### Final Build
Run `npm run build:json` to merge all JSON files.

---

## Checklist

- [ ] **1. Create `blocks/hero/` block** — `_hero.json` (definitions, models, filters:[], item-definitions:[]), `hero.js`, `hero.css`
- [ ] **2. Create `blocks/tariff-cards/` block** — `_tariff-cards.json` (definitions with filter, item-definitions, models for item, filters), `tariff-cards.js` (classList only), `tariff-cards.css`
- [ ] **3. Create `blocks/coverage-banner/` block** — `_coverage-banner.json`, `coverage-banner.js`, `coverage-banner.css`
- [ ] **4. Create `blocks/discover-grid/` block** — `_discover-grid.json` (filter-based), `discover-grid.js` (classList only), `discover-grid.css`
- [ ] **5. Create `blocks/features/` block** — `_features.json` (filter-based), `features.js` (classList only), `features.css`
- [ ] **6. Create `blocks/app-promo/` block** — `_app-promo.json`, `app-promo.js`, `app-promo.css`
- [ ] **7. Create `blocks/advantages/` block** — `_advantages.json` (filter-based), `advantages.js` (classList only), `advantages.css`
- [ ] **8. Create `blocks/contact-strip/` block** — `_contact-strip.json`, `contact-strip.js`, `contact-strip.css`
- [ ] **9. Update `models/_component-definition.json`** — add `item-definitions` glob reference
- [ ] **10. Update `models/_section.json`** — add all new block IDs to section filter
- [ ] **11. Run `npm run build:json`** — validate merged output
- [ ] **12. Verify preview renders** — check blocks in local dev server

---

## Execution Notes

- All CSS values are extracted from the live site (no placeholders)
- Font `OnAir-Light` / `OnAir-Regular` will be referenced but may need @font-face declarations in `styles/fonts.css`
- Images referenced from the hero background (`oso_balcon_md.jpg`) will use DAM references in production
- This plan requires **Execute mode** to implement. Switch from Plan mode to proceed with file creation.
