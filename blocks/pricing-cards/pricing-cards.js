import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('pricing-cards-grid');

  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('pricing-card');
    moveInstrumentation(row, card);

    const cells = [...row.children];

    const topRow = document.createElement('div');
    topRow.classList.add('pricing-card-top');

    const bottomRow = document.createElement('div');
    bottomRow.classList.add('pricing-card-bottom');

    cells.forEach((cell, index) => {
      const content = cell.innerHTML.trim();
      if (!content) return;

      switch (index) {
        case 0:
          cell.classList.add('pricing-card-specs');
          topRow.append(cell);
          break;
        case 1:
          cell.classList.add('pricing-card-price');
          topRow.append(cell);
          break;
        case 2:
          cell.classList.add('pricing-card-actions');
          cell.querySelectorAll('a').forEach((a, i) => {
            a.classList.add('button');
            if (i === 0) a.classList.add('primary');
            if (i === 1) a.classList.add('secondary');
          });
          bottomRow.append(cell);
          break;
        default:
          break;
      }
    });

    card.append(topRow);
    card.append(bottomRow);
    grid.append(card);
  });

  block.replaceChildren(grid);
}
