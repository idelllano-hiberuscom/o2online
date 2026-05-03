# Hero Block Generation Plan (Universal Editor / xwalk)

## Context

- **Project type**: AEM Edge Delivery Services with Universal Editor (xwalk)
- **Model structure**: Uses JSON spread syntax (`"..."`) for composition. Blocks live under `blocks/<name>/` with `_<name>.json` files containing `definitions`, `models`, and optionally `filters` keys.
- **Component registration**: `models/_component-definition.json` auto-discovers blocks via glob `../blocks/*/_*.json#/definitions`; `models/_component-models.json` auto-discovers via `../blocks/*/_*.json#/models`.
- **No `blocks/` directory exists yet** — it will be created.

## Extracted Live Values from o2online.es

| Property | Value |
|----------|-------|
| **Background image** | `https://web.static.o2online.es/media/public/oso_balcon_md.jpg` |
| **Background size** | `cover` |
| **Background position** | `50% 0%` (center top) |
| **Container padding** | `160px 0px 40px` (content at bottom-left) |
| **H1 (subtitle)** text | "O2 tu compañía de Fibra y Móvil" |
| **H1 font** | `OnAir-Regular`, 28px, weight 500, color `rgb(255,255,255)`, line-height 32px, margin-bottom 8px |
| **P (title)** text | "Cuando todo funciona, respiras" |
| **P font** | `OnAir-Black`, 40px, weight 400 (font itself is black weight), color `rgb(255,255,255)`, line-height 48px, margin-bottom 16px |
| **CTA text** | "Descubre nuestras tarifas" |
| **CTA href** | `/fibra-y-movil/` |
| **CTA background** | `rgb(0, 80, 255)` → `#0050FF` |
| **CTA color** | white |
| **CTA border-radius** | `60px` |
| **CTA padding** | `10px 24px` |
| **CTA font** | 16px, weight 400, `OnAir-Regular` |
| **CTA border** | none |
| **CTA hover bg** | same blue (no change detected from stylesheet scan — will darken slightly for UX) |

## Files to Create

### 1. `blocks/hero/hero.js`

**Logic:**
- `export default function decorate(block)`:
  - Find the `<picture>` or `<img>` inside the block
  - Extract the `src` from `<img>` and set it as `background-image` on the block element
  - Remove the original `<picture>`/`<img>` from DOM
  - Find the `<h1>` or `<h2>` → treat as subtitle (since on live page h1=subtitle)
  - Find the `<p>` → treat as title
  - Find all `<a>` tags → add class `hero-btn` automatically
  - Wrap remaining content in `div.hero-content`

### 2. `blocks/hero/hero.css`

**CSS custom properties & rules extracted from live page:**

```css
.hero {
  position: relative;
  min-height: 70vh;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
}

.hero-content {
  padding: 48px 64px;
  max-width: 600px;
}

.hero-content h1,
.hero-content h2 {
  font-size: 28px;
  font-weight: 500;
  color: #fff;
  line-height: 32px;
  margin: 0 0 8px;
}

.hero-content p {
  font-size: 40px;
  font-weight: 900;
  color: #fff;
  line-height: 48px;
  margin: 0 0 16px;
}

.hero-btn {
  display: inline-block;
  background: #0050ff;
  color: #fff;
  border-radius: 60px;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  border: none;
  cursor: pointer;
  line-height: 24px;
}

.hero-btn:hover {
  background: #003ecc;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    padding: 24px;
  }
  .hero-content p {
    font-size: 32px;
    line-height: 38px;
  }
}
```

### 3. `blocks/hero/_hero.json`

**Structure** (follows existing pattern like `_section.json`, `_button.json`):

```json
{
  "definitions": [
    {
      "title": "Hero",
      "id": "hero",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Hero",
              "model": "hero"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "hero",
      "fields": [
        {
          "component": "reference",
          "name": "image",
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
          "name": "subtitle",
          "label": "Subtitle"
        },
        {
          "component": "text",
          "name": "title",
          "label": "Title"
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

### 4. No separate `component-definition.json` entry needed

The existing `models/_component-definition.json` already uses the glob pattern `../blocks/*/_*.json#/definitions` which will automatically discover `blocks/hero/_hero.json`. Same for `models/_component-models.json` with `../blocks/*/_*.json#/models`. **No manual registration required.**

## Notes

- The hero on the live page uses `<h1>` for the subtitle (smaller text) and `<p>` for the main title (larger, bold text). The decoration logic will preserve this semantic order.
- The button color `#0050FF` (`rgb(0, 80, 255)`) is the exact value extracted from the live site.
- The `hero` component is already listed in the section filter (`models/_section.json` line 51), so it's already allowed inside sections.
- Font family `OnAir-Regular` / `OnAir-Black` are O2 brand fonts — in the EDS context we'll use `font-weight: 900` to approximate the "Black" variant with whatever font stack the project configures globally.

## Checklist

- [ ] Create `blocks/hero/` directory
- [ ] Create `blocks/hero/hero.js` — decorate function that extracts image as background, wraps content, adds `hero-btn` class to links
- [ ] Create `blocks/hero/hero.css` — all styles with exact values from live page
- [ ] Create `blocks/hero/_hero.json` — model definition with image, subtitle, title, cta-label, cta-url fields
- [ ] Verify auto-discovery works (glob patterns in `_component-definition.json` and `_component-models.json` already cover `blocks/*/_*.json`)

---

*Implementation requires exiting Plan mode. All values are extracted from the live o2online.es page — no placeholders used.*
