export default function decorate(block) {
  const img = block.querySelector('img');
  const p = block.querySelector('p');
  const a = block.querySelector('a');

  const inner = document.createElement('div');
  inner.className = 'promo-banner-inner';

  if (img) {
    img.classList.add('promo-banner-icon');
    inner.appendChild(img);
  }

  if (p) {
    p.classList.add('promo-banner-text');
    inner.appendChild(p);
  }

  if (a) {
    a.classList.add('promo-banner-btn');
    inner.appendChild(a);
  }

  block.textContent = '';
  block.appendChild(inner);
}
