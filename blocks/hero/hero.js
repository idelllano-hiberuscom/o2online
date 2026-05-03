export default function decorate(block) {
  const rows = [...block.children];
  const bgRow = rows[0];
  const titleRow = rows[1];
  const subtitleRow = rows[2];
  const ctaRow = rows[3];

  const picture = bgRow?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      block.style.backgroundImage = `url('${img.src}')`;
    }
    bgRow.remove();
  }

  block.classList.add('hero-block');

  const content = document.createElement('div');
  content.classList.add('hero-content');

  if (titleRow) {
    const h1 = document.createElement('h1');
    h1.textContent = titleRow.textContent.trim();
    content.appendChild(h1);
    titleRow.remove();
  }

  if (subtitleRow) {
    const p = document.createElement('p');
    p.classList.add('hero-subtitle');
    p.textContent = subtitleRow.textContent.trim();
    content.appendChild(p);
    subtitleRow.remove();
  }

  if (ctaRow) {
    const link = ctaRow.querySelector('a');
    if (link) {
      link.classList.add('hero-cta');
      content.appendChild(link);
    }
    ctaRow.remove();
  }

  block.textContent = '';
  block.appendChild(content);
}
