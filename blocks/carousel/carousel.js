import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const track = document.createElement('div');
  track.classList.add('carousel-track');

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    moveInstrumentation(row, slide);

    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        cell.classList.add('carousel-slide-image');
        cell.querySelectorAll('picture > img').forEach((img) => {
          const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
          moveInstrumentation(img, optimized.querySelector('img'));
          img.closest('picture').replaceWith(optimized);
        });
      } else {
        cell.classList.add('carousel-slide-content');
        const link = cell.querySelector('a');
        if (link) link.classList.add('carousel-link');
      }
      slide.append(cell);
    });

    track.append(slide);
  });

  const nav = document.createElement('div');
  nav.classList.add('carousel-nav');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-prev');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '&#8249;';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-next');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '&#8250;';

  nav.append(prevBtn, nextBtn);

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.offsetWidth / 2, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.offsetWidth / 2, behavior: 'smooth' });
  });

  block.replaceChildren(track, nav);
}
