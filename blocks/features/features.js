import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('features-grid');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    item.classList.add('features-item');
    moveInstrumentation(row, item);

    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('.icon') || cell.querySelector('picture')) {
        cell.classList.add('features-item-icon');
      } else {
        cell.classList.add('features-item-text');
      }
      item.append(cell);
    });

    grid.append(item);
  });

  block.replaceChildren(grid);
}
