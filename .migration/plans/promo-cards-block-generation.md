# Promo Cards Block Generation Plan (Universal Editor / xwalk)

## Context

- **Project type**: AEM Edge Delivery Services with Universal Editor (xwalk)
- **Model structure**: Blocks use `_<name>.json` files with `definitions` and `models` keys, auto-discovered via glob.
- **Existing blocks**: `hero`, `pricing-cards`, `promo-banner`, `features`.

## Extracted Live Values from o2online.es

### Section ("Descubre todo lo que O2 tiene para ti")
| Property | Value |
|----------|-------|
| **Background** | `#fff` (white) |
| **Padding** | `50px 0` |

### Cards Container
| Property | Value |
|----------|-------|
| **Layout** | flex row, wrap, 4 columns (`col-xl-3`) |
| **Gap** | `30px` effective (15px padding each side per col) |
| **Column margin-bottom** | via `mb-4` class |

### Individual Card (`.card` div)
| Property | Value |
|----------|-------|
| **Border radius** | `16px` |
| **Height** | `~453px` |
| **Display** | `flex` |
| **Flex direction** | `column` |
| **Overflow** | `visible` |
| **Box shadow** | none |
| **Padding** | `0` (card body has `20px` padding) |

### Card Body (`.card-body`)
| Property | Value |
|----------|-------|
| **Padding** | `20px` |
| **Position** | `relative` |

### Card Backgrounds (vary per card)
| Card | Background |
|------|-----------|
| Card 1 | `background: black` (solid) |
| Card 2 | `background: #F5F5F7` (light grey) |
| Card 3 | `linear-gradient(rgb(0,0,140) 0%, rgb(0,80,255) 50%, rgb(175,215,255) 100%)` |
| Card 4 | `url('...gradient-esim.svg'); background-size: cover` |

### Title (H3 / badge)
| Property | Value |
|----------|-------|
| **Font size** | `20px` |
| **Font weight** | `500` (OnAir-Black) |
| **Line height** | `24px` |
| **Margin bottom** | `8px` |
| **Colors vary** | Card 1: `rgb(253,80,74)` → `#FD504A`, Card 2-3: `rgb(65,182,230)` → `#41B6E6` |

### Description / Subtitle (P)
| Property | Value |
|----------|-------|
| **Font size** | `28px` |
| **Font weight** | `400` (OnAir-Black font) |
| **Color** | `rgb(255,255,255)` → `#fff` |
| **Line height** | `34px` |

### "Saber más" Link
| Property | Value |
|----------|-------|
| **Font size** | `18px` |
| **Font weight** | `400` |
| **Color** | `#fff` (white) |
| **Display** | `inline` |

### Card Content (4 cards)
| # | Badge/Title | Description | CTA | Background | Bottom Image |
|---|-------------|-------------|-----|------------|--------------|
| 1 | La Liga EA Sports (`#FD504A`) | Espanyol - Real Madrid, 3 mayo | Saber más | black | mini-carrusel-101.png |
| 2 | NOVEDAD (`#41B6E6`) | (product image) | Saber más | #F5F5F7 | mini-carrusel-iphone17.png |
| 3 | O2 Cloud (`#41B6E6`) | Todas tus fotos y vídeos a salvo | Saber más | blue gradient | mini-carrusel-04.png |
| 4 | eSIM para viajes (white) | 3 días gratis de datos ilimitados | Saber más | gradient-esim.svg | mini-carrusel-08.png |

## Files to Create

### 1. `blocks/promo-cards/promo-cards.js`

**Logic:**
- `export default function decorate(block)`:
  - Each child div of `block` = one card row
  - Each row has columns: [background image] | [badge text] | [title/description] | [CTA link]
  - For each row:
    - Extract `<picture>`/`<img>` from col 0 → set as `background-image` on card → remove from DOM
    - Col 1 → badge span with class `promo-card-badge`
    - Col 2 → title/description with class `promo-card-title`
    - Col 3 → find `<a>` → add class `promo-card-link`
    - Wrap in `div.promo-card`

### 2. `blocks/promo-cards/promo-cards.css`

```css
.promo-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.promo-card {
  min-height: 400px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.promo-card-badge {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 8px;
  color: #41b6e6;
}

.promo-card-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  line-height: 34px;
  margin: 0;
}

.promo-card-link {
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  text-decoration: none;
  margin-top: auto;
}

.promo-card-link:hover {
  text-decoration: underline;
}

@media (width <= 1024px) {
  .promo-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width <= 600px) {
  .promo-cards {
    grid-template-columns: 1fr;
  }
}
```

### 3. `blocks/promo-cards/_promo-cards.json`

```json
{
  "definitions": [
    {
      "title": "Promo Cards",
      "id": "promo-cards",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Promo Cards",
              "model": "promo-cards"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "promo-cards",
      "fields": [
        {
          "component": "reference",
          "name": "backgroundImage",
          "label": "Background Image",
          "multi": false
        },
        {
          "component": "text",
          "name": "imageAlt",
          "label": "Image Alt Text"
        },
        {
          "component": "text",
          "name": "badge",
          "label": "Badge Text"
        },
        {
          "component": "text",
          "name": "title",
          "label": "Title"
        },
        {
          "component": "text",
          "name": "date",
          "label": "Date"
        },
        {
          "component": "text",
          "name": "ctaLabel",
          "label": "CTA Label"
        },
        {
          "component": "aem-content",
          "name": "ctaUrl",
          "label": "CTA Link"
        }
      ]
    }
  ]
}
```

### 4. Section filter update

Add `"promo-cards"` to `models/_section.json` filter.

### 5. No separate `component-definition.json` entry needed

Auto-discovery via globs handles it.

## Checklist

- [ ] Create `blocks/promo-cards/` directory
- [ ] Create `blocks/promo-cards/promo-cards.js` — decorate function that extracts image as background, builds badge/title/link, adds `promo-card-link` class to `<a>` tags
- [ ] Create `blocks/promo-cards/promo-cards.css` — 4-col grid, 16px gap, 16px border-radius, 400px min-height, responsive breakpoints
- [ ] Create `blocks/promo-cards/_promo-cards.json` — model with backgroundImage, imageAlt, badge, title, date, ctaLabel, ctaUrl
- [ ] Update `models/_section.json` to add `promo-cards` to section filter
- [ ] Verify auto-discovery works via glob patterns

---

*Implementation requires exiting Plan mode. All values are extracted from the live o2online.es page — no placeholders used.*
