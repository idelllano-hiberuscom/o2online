export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  rows.forEach((row) => {
    const cols = [...row.children];
    const card = document.createElement('div');
    card.className = 'feature-card';

    const iconCol = cols[0];
    if (iconCol) {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'feature-icon';
      const pic = iconCol.querySelector('picture') || iconCol.querySelector('img');
      if (pic) iconWrapper.appendChild(pic);
      card.appendChild(iconWrapper);
    }

    const titleCol = cols[1];
    if (titleCol) {
      const title = document.createElement('h3');
      title.className = 'feature-title';
      title.innerHTML = titleCol.innerHTML;
      card.appendChild(title);
    }

    const descCol = cols[2];
    if (descCol) {
      const desc = document.createElement('p');
      desc.className = 'feature-desc';
      desc.innerHTML = descCol.innerHTML;
      card.appendChild(desc);
    }

    block.appendChild(card);
  });
}
