# Pricing Cards Block Generation Plan (Universal Editor / xwalk)

## Context

- **Project type**: AEM Edge Delivery Services with Universal Editor (xwalk)
- **Model structure**: Uses JSON spread syntax (`"..."`) for composition. Blocks live under `blocks/<name>/` with `_<name>.json` files containing `definitions`, `models`, and optionally `filters` keys.
- **Auto-discovery**: `models/_component-definition.json` uses glob `../blocks/*/_*.json#/definitions`; `models/_component-models.json` uses `../blocks/*/_*.json#/models` — no manual registration needed.
- **Existing block**: `blocks/hero/` already exists as reference for pattern.

## Extracted Live Values from o2online.es

### Section
| Property | Value |
|----------|-------|
| **Section background** | `rgb(248, 248, 248)` → `#F8F8F8` |
| **Section padding** | `40px 0px` |

### Section Title ("Elige tu tarifa")
| Property | Value |
|----------|-------|
| **Font size** | `40px` |
| **Font weight** | `500` (OnAir-Black font renders bold) |
| **Color** | `rgb(0, 0, 0)` → `#000` |
| **Text align** | `center` |
| **Line height** | `48px` |
| **Margin bottom** | `24px` |

### Cards Container
| Property | Value |
|----------|-------|
| **Display** | `flex` |
| **Flex wrap** | `wrap` |
| **Gap** | `16px` |

### Individual Card
| Property | Value |
|----------|-------|
| **Background** | `rgb(255, 255, 255)` → `#fff` |
| **Border radius** | `40px` |
| **Box shadow** | `rgba(0, 0, 0, 0.1) 0px 8px 20px 0px` |
| **Padding** | `24px` |
| **Display** | `flex` |
| **Flex direction** | `column` |
| **Border** | none |

### Card Top Section (specs + price row)
| Property | Value |
|----------|-------|
| **Display** | `flex` |
| **Flex direction** | `row` |
| **Justify content** | `space-between` |

### Specs (H3 title inside card)
| Property | Value |
|----------|-------|
| **Font size** | `16px` |
| **Font weight** | `500` |
| **Color** | `rgb(0, 0, 0)` → `#000` |
| **Line height** | `22px` |
| **Strong (values like "600MB")** | same size, weight 400, black |

### Price
| Property | Value |
|----------|-------|
| **Price number font size** | `32px` |
| **Price number font weight** | `400` (OnAir-Bold renders bold) |
| **Price number color** | `rgb(0, 0, 0)` → `#000` |
| **Price number line-height** | `40px` |
| **"€/mes" font size** | `16px`, weight 400, black |
| **"precio final" font size** | `16px`, weight 400, color `rgb(115, 115, 125)` → `#73737D` |

### Card Bottom Section (buttons)
| Property | Value |
|----------|-------|
| **Display** | `flex` |
| **Flex direction** | `row` |
| **Gap** | `8px` |
| **Margin top** | `auto` (pushes to bottom) |
| **Padding top** | `16px` |

### Primary Button ("Saber más")
| Property | Value |
|----------|-------|
| **Background** | `rgb(0, 80, 255)` → `#0050FF` |
| **Color** | white |
| **Border radius** | `60px` |
| **Padding** | `12px 16px` |
| **Font size** | `16px` |
| **Font weight** | `400` |
| **Border** | none |
| **Display** | `flex` (flex-fill) |

### Secondary Button ("Lo quiero")
| Property | Value |
|----------|-------|
| **Background** | `transparent` |
| **Color** | `rgb(0, 80, 255)` → `#0050FF` |
| **Border** | `2px solid rgb(255, 255, 255)` → white border (on dark bg context; for light bg context use `#0050FF`) |
| **Border radius** | `60px` |
| **Padding** | `12px 16px` |
| **Font size** | `16px` |
| **Font weight** | `400` |
| **Text decoration** | none |

### Sample Card Content
| Card | Specs | Price |
|------|-------|-------|
| Card 1 | Fibra **600MB** Móvil **60GB** | **35** €/mes precio final |
| Card 2 | Fibra **600MB** Móvil **10GB** Móvil **40GB** | **35** €/mes precio final |
| Card 3 | Fibra **1GB** Móvil **120GB** | **38** €/mes precio final |

## Files to Create

### 1. `blocks/pricing-cards/pricing-cards.js`

**Logic:**
- `export default function decorate(block)`:
  - The block will have rows (children divs) — each row is one card
  - For each row/card:
    - Find `<a>` tags: first → add class `pricing-btn-primary`, second → add class `pricing-btn-secondary`
    - Wrap the card content in appropriate structure: `div.pricing-card`
    - Inside each card, wrap top content in `div.pricing-card-top` and buttons in `div.pricing-card-actions`

### 2. `blocks/pricing-cards/pricing-cards.css`

All values from live page extraction (see tables above).

### 3. `blocks/pricing-cards/_pricing-cards.json`

**Structure** (follows existing xwalk pattern):

```json
{
  "definitions": [...],
  "models": [
    {
      "id": "pricing-cards",
      "fields": [
        { "component": "richtext", "name": "specs", "label": "Specs" },
        { "component": "text", "name": "price", "label": "Price" },
        { "component": "text", "name": "priceLabel", "label": "Price Label" },
        { "component": "text", "name": "primaryCtaLabel", "label": "Primary CTA Label" },
        { "component": "aem-content", "name": "primaryCtaUrl", "label": "Primary CTA Link" },
        { "component": "text", "name": "secondaryCtaLabel", "label": "Secondary CTA Label" },
        { "component": "aem-content", "name": "secondaryCtaUrl", "label": "Secondary CTA Link" }
      ]
    }
  ]
}
```

### 4. No separate `component-definition.json` entry needed

Auto-discovery via globs handles it.

### 5. Section filter update

Add `"pricing-cards"` to `models/_section.json` filter so it can be placed inside sections.

## Checklist

- [ ] Create `blocks/pricing-cards/` directory
- [ ] Create `blocks/pricing-cards/pricing-cards.js` — decorate function that wraps card content and auto-adds button classes
- [ ] Create `blocks/pricing-cards/pricing-cards.css` — all styles with exact extracted values
- [ ] Create `blocks/pricing-cards/_pricing-cards.json` — model definition with specs, price, priceLabel, CTA fields
- [ ] Update `models/_section.json` to add `pricing-cards` to section filter
- [ ] Verify auto-discovery works via glob patterns
