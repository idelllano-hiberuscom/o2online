# Promo Banner Block Generation Plan (Universal Editor / xwalk)

## Context

- **Project type**: AEM Edge Delivery Services with Universal Editor (xwalk)
- **Model structure**: Uses JSON spread syntax (`"..."`) for composition. Blocks live under `blocks/<name>/` with `_<name>.json` files.
- **Auto-discovery**: Glob patterns `../blocks/*/_*.json#/definitions` and `#/models` handle registration automatically.
- **Existing blocks**: `blocks/hero/` and `blocks/pricing-cards/` as pattern reference.

## Extracted Live Values from o2online.es

### Banner Container
| Property | Value |
|----------|-------|
| **Background color** | `rgb(0, 80, 255)` → `#0050FF` |
| **Height** | `94px` |
| **Padding** | `20px 0` |
| **Class** | `faldon-cobertura-mini-dark` |

### Icon (location/coverage SVG)
| Property | Value |
|----------|-------|
| **Source** | `https://web.static.o2online.es/media/public/cobertura-blanco.svg` |
| **Natural size** | 55×56px |
| **Rendered size** | `50px` width |
| **Display** | `inline-block` |
| **Vertical align** | `top` |
| **Margin right** | `20px` |
| **Color** | white (SVG) |

### Text
| Property | Value |
|----------|-------|
| **Content** | "Descubre si la fibra de O2 llega a tu domicilio." |
| **Font size** | `18px` |
| **Font weight** | `400` |
| **Color** | `rgb(255, 255, 255)` → `#fff` |
| **Line height** | `22px` |
| **Font family** | `OnAir-Light, Arial, sans-serif` |
| **Margin** | `16px 16px 16px 0` |

### CTA Button
| Property | Value |
|----------|-------|
| **Text** | "Comprobar cobertura O2" |
| **Href** | `/checkout/?s=3651_600MB_60GB_40GB_t` |
| **Background** | `rgb(255, 255, 255)` → `#fff` |
| **Color** | `rgb(0, 80, 255)` → `#0050FF` |
| **Border radius** | `60px` |
| **Padding** | `10px 24px` |
| **Font size** | `16px` |
| **Font weight** | `400` |
| **Border** | none |
| **Display** | `inline-block` |
| **Text decoration** | none |

### Layout
- Elements are inline (img, p, a) inside a centered column
- On desktop: all 3 elements sit on the same horizontal line
- The inner content is centered via Bootstrap's `row justify-content-md-center` / `col-md-auto`

## Files to Create

### 1. `blocks/promo-banner/promo-banner.js`

**Logic:**
- `export default function decorate(block)`:
  - Find `<img>` → keep as icon (add class `promo-banner-icon`)
  - Find `<p>` → add class `promo-banner-text`
  - Find `<a>` → add class `promo-banner-btn`
  - Create `div.promo-banner-inner` wrapper
  - Move icon, text, and CTA into the inner wrapper
  - Append inner wrapper to block (replacing original children)

### 2. `blocks/promo-banner/promo-banner.css`

```css
.promo-banner {
  background: #0050ff;
  padding: 20px 0;
}

.promo-banner-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.promo-banner-icon {
  width: 50px;
  height: auto;
  flex-shrink: 0;
}

.promo-banner-text {
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  line-height: 22px;
  margin: 0;
}

.promo-banner-btn {
  display: inline-block;
  background: #fff;
  color: #0050ff;
  border-radius: 60px;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  border: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.promo-banner-btn:hover {
  background: #e6e6e6;
}

@media (width <= 768px) {
  .promo-banner-inner {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}
```

### 3. `blocks/promo-banner/_promo-banner.json`

```json
{
  "definitions": [
    {
      "title": "Promo Banner",
      "id": "promo-banner",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Promo Banner",
              "model": "promo-banner"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "promo-banner",
      "fields": [
        {
          "component": "reference",
          "name": "icon",
          "label": "Icon",
          "multi": false
        },
        {
          "component": "text",
          "name": "iconAlt",
          "label": "Icon Alt Text"
        },
        {
          "component": "text",
          "name": "text",
          "label": "Banner Text"
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

Add `"promo-banner"` to `models/_section.json` filter so it can be placed inside sections.

### 5. No separate `component-definition.json` entry needed

Auto-discovery via globs handles it.

## Checklist

- [ ] Create `blocks/promo-banner/` directory
- [ ] Create `blocks/promo-banner/promo-banner.js` — decorate function that rebuilds DOM with inner flex container and auto-adds button class
- [ ] Create `blocks/promo-banner/promo-banner.css` — all styles with exact extracted values (`#0050FF` bg, white button, 60px radius, 18px text)
- [ ] Create `blocks/promo-banner/_promo-banner.json` — model definition with icon, iconAlt, text, ctaLabel, ctaUrl fields
- [ ] Update `models/_section.json` to add `promo-banner` to section filter
- [ ] Verify auto-discovery works via glob patterns

---

*Implementation requires exiting Plan mode. All values are extracted from the live o2online.es page — no placeholders used.*
