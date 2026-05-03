export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.classList.add('cta-banner-content');

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('.icon') || cell.querySelector('picture')) {
        cell.classList.add('cta-banner-icon');
      } else {
        cell.classList.add('cta-banner-body');
        const link = cell.querySelector('a');
        if (link) link.classList.add('button');
      }
      wrapper.append(cell);
    });
  });

  block.replaceChildren(wrapper);
}
