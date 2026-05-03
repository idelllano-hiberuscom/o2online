# Fix Component Model Architecture for Universal Editor

## Problem

All repeatable blocks (`pricing-cards`, `features`, `promo-cards`) define fields at root block level instead of using the parent/child architecture required by Universal Editor xwalk. Additionally, `hero` and `promo-banner` have a redundant `ctaLabel` field — the `aem-content` link component already provides both href and text via the `<a>` element it generates.

## Architecture Pattern (xwalk repeatable blocks)

```
Parent block (container, no fields)
  └── Child item (repeatable, has fields)
```

Each repeatable block needs:
1. **Parent definition** — `resourceType: core/franklin/components/block/v1/block`
2. **Child definition** — `resourceType: core/franklin/components/block/v1/block/item`
3. **Parent model** — empty `fields: []`
4. **Child model** — actual content fields
5. **Filter** — declares which children are allowed inside parent

## Files to Modify

### 1. `blocks/pricing-cards/_pricing-cards.json`
- Parent definition: `id: "pricing-cards"`, model with empty fields
- Child definition: `id: "pricing-card-item"`, resourceType `block/item`
- Child model: `id: "pricing-card-item"` with specs, price, price-label, CTAs
- Filter: `id: "pricing-cards"`, components: `["pricing-card-item"]`

### 2. `blocks/features/_features.json`
- Parent definition: `id: "features"`, model with empty fields
- Child definition: `id: "features-item"`, resourceType `block/item`
- Child model: `id: "features-item"` with icon, title (richtext), description (richtext)
- Filter: `id: "features"`, components: `["features-item"]`

### 3. `blocks/promo-cards/_promo-cards.json`
- Parent definition: `id: "promo-cards"`, model with empty fields
- Child definition: `id: "promo-card-item"`, resourceType `block/item`
- Child model: `id: "promo-card-item"` with background-image, badge, title, date, cta-url
- Filter: `id: "promo-cards"`, components: `["promo-card-item"]`

### 4. `blocks/hero/_hero.json`
- Remove `ctaLabel` field
- Remove `ctaUrl` field, replace with single `cta` field of type `aem-content`

### 5. `blocks/promo-banner/_promo-banner.json`
- Remove `ctaLabel` field
- Remove `ctaUrl` field, replace with single `cta` field of type `aem-content`

### 6. `blocks/pricing-cards/pricing-cards.js`
- Already reads from child divs (rows) — structure is correct
- No changes needed (each `block.children` = one card item)

### 7. `blocks/features/features.js`
- Already reads from child divs (rows with cols) — structure is correct
- No changes needed

### 8. `blocks/promo-cards/promo-cards.js`
- Already reads from child divs (rows with cols) — structure is correct
- No changes needed

### 9. `blocks/hero/hero.js`
- Already does `querySelector('a')` and adds class — no change needed
- The `<a>` from UE already has href and text

### 10. `blocks/promo-banner/promo-banner.js`
- Already does `querySelector('a')` and adds class — no change needed

## Checklist

- [ ] Rewrite `blocks/pricing-cards/_pricing-cards.json` — parent/child definitions, models, and filter
- [ ] Rewrite `blocks/features/_features.json` — parent/child definitions, models, and filter
- [ ] Rewrite `blocks/promo-cards/_promo-cards.json` — parent/child definitions, models, and filter
- [ ] Update `blocks/hero/_hero.json` — remove ctaLabel, simplify cta to single aem-content field
- [ ] Update `blocks/promo-banner/_promo-banner.json` — remove ctaLabel, simplify cta to single aem-content field
- [ ] Verify JS files need no changes (they already read from child divs and querySelector('a'))

---

*Implementation requires Execute mode. JS files already handle the DOM structure correctly — only the JSON model files need updating.*
