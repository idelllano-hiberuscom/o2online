import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('advantages-grid');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    item.classList.add('advantages-item');
    moveInstrumentation(row, item);

    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('.icon') || cell.querySelector('picture')) {
        cell.classList.add('advantages-item-icon');
      } else {
        cell.classList.add('advantages-item-text');
      }
      item.append(cell);
    });

    grid.append(item);
  });

  block.replaceChildren(grid);
}
