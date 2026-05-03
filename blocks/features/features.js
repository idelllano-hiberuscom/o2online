import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('features-grid');

  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('features-card');
    moveInstrumentation(row, card);

    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('.icon') || cell.querySelector('picture')) {
        cell.classList.add('features-card-icon');
      } else {
        cell.classList.add('features-card-text');
      }
      card.append(cell);
    });

    grid.append(card);
  });

  block.replaceChildren(grid);
}
