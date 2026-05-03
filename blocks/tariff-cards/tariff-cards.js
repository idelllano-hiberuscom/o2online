import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cards = document.createElement('div');
  cards.classList.add('tariff-cards-grid');

  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('tariff-card');
    moveInstrumentation(row, card);

    const cells = [...row.children];
    cells.forEach((cell, index) => {
      const content = cell.innerHTML.trim();
      if (!content) return;

      switch (index) {
        case 0:
          cell.classList.add('tariff-card-title');
          break;
        case 1:
          cell.classList.add('tariff-card-specs');
          break;
        case 2:
          cell.classList.add('tariff-card-price');
          break;
        case 3:
          cell.classList.add('tariff-card-actions');
          cell.querySelectorAll('a').forEach((a, i) => {
            a.classList.add('button');
            if (i === 1) a.classList.add('secondary');
          });
          break;
        default:
          break;
      }
      card.append(cell);
    });

    cards.append(card);
  });

  block.replaceChildren(cards);
}
