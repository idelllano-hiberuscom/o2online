import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  moveInstrumentation(block, block);

  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-banner-content');

  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('.icon') || cell.querySelector('picture')) {
        cell.classList.add('promo-banner-icon');
        wrapper.append(cell);
      } else {
        const link = cell.querySelector('a');
        if (link) {
          link.classList.add('button', 'pill');
          const ctaWrapper = document.createElement('div');
          ctaWrapper.classList.add('promo-banner-cta');
          ctaWrapper.append(link);
          wrapper.append(ctaWrapper);

          const remainingContent = cell.cloneNode(true);
          remainingContent.querySelector('a')?.closest('p')?.remove();
          if (remainingContent.textContent.trim()) {
            remainingContent.classList.add('promo-banner-text');
            wrapper.insertBefore(remainingContent, ctaWrapper);
          }
        } else {
          cell.classList.add('promo-banner-text');
          wrapper.append(cell);
        }
      }
    });
  });

  block.replaceChildren(wrapper);
}
