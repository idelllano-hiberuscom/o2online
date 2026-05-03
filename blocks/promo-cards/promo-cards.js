export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  rows.forEach((row) => {
    const cols = [...row.children];
    const card = document.createElement('div');
    card.className = 'promo-card';

    const imgCol = cols[0];
    if (imgCol) {
      const pic = imgCol.querySelector('picture');
      const img = imgCol.querySelector('img');
      if (img) {
        card.style.backgroundImage = `url(${img.src})`;
      }
      if (pic) pic.remove();
      else if (img) img.remove();
    }

    const badgeCol = cols[1];
    if (badgeCol) {
      const badge = document.createElement('span');
      badge.className = 'promo-card-badge';
      badge.innerHTML = badgeCol.innerHTML;
      card.appendChild(badge);
    }

    const titleCol = cols[2];
    if (titleCol) {
      const title = document.createElement('p');
      title.className = 'promo-card-title';
      title.innerHTML = titleCol.innerHTML;
      card.appendChild(title);
    }

    const ctaCol = cols[3];
    if (ctaCol) {
      const a = ctaCol.querySelector('a');
      if (a) {
        a.classList.add('promo-card-link');
        card.appendChild(a);
      }
    }

    block.appendChild(card);
  });
}
