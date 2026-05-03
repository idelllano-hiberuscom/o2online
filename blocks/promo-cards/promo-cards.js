export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('promo-card');

    const cols = [...row.children];

    const imgCol = cols[0];
    if (imgCol) {
      const img = imgCol.querySelector('img');
      if (img) {
        row.style.backgroundImage = `url(${img.src})`;
        imgCol.hidden = true;
      }
    }

    const badgeCol = cols[1];
    if (badgeCol) {
      badgeCol.classList.add('promo-card-badge');
    }

    const titleCol = cols[2];
    if (titleCol) {
      titleCol.classList.add('promo-card-title');
    }

    const ctaCol = cols[3];
    if (ctaCol) {
      const a = ctaCol.querySelector('a');
      if (a) a.classList.add('promo-card-link');
      ctaCol.classList.add('promo-card-cta');
    }
  });
}
