export default function decorate(block) {
  const rows = [...block.children];

  block.classList.add('app-promo-block');

  const textCol = document.createElement('div');
  textCol.classList.add('app-promo-text');

  const imageCol = document.createElement('div');
  imageCol.classList.add('app-promo-image');

  const titleRow = rows[0];
  const descRow = rows[1];
  const appStoreRow = rows[2];
  const playStoreRow = rows[3];
  const imageRow = rows[4];

  if (titleRow) {
    const h2 = document.createElement('h2');
    h2.textContent = titleRow.textContent.trim();
    textCol.appendChild(h2);
    titleRow.remove();
  }

  if (descRow) {
    const div = document.createElement('div');
    div.classList.add('app-promo-description');
    div.innerHTML = descRow.innerHTML;
    textCol.appendChild(div);
    descRow.remove();
  }

  const badges = document.createElement('div');
  badges.classList.add('app-promo-badges');

  if (appStoreRow) {
    const link = appStoreRow.querySelector('a');
    if (link) {
      link.classList.add('badge-link');
      badges.appendChild(link);
    }
    appStoreRow.remove();
  }

  if (playStoreRow) {
    const link = playStoreRow.querySelector('a');
    if (link) {
      link.classList.add('badge-link');
      badges.appendChild(link);
    }
    playStoreRow.remove();
  }

  textCol.appendChild(badges);

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      imageCol.appendChild(picture);
    }
    imageRow.remove();
  }

  block.textContent = '';
  block.appendChild(textCol);
  block.appendChild(imageCol);
}
