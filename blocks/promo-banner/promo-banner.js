export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-banner-content');

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        cell.classList.add('promo-banner-image');
      } else {
        cell.classList.add('promo-banner-text');
        const link = cell.querySelector('a');
        if (link) link.classList.add('button', 'accent');
      }
      wrapper.append(cell);
    });
  });

  block.replaceChildren(wrapper);
}
