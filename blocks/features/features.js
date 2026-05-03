export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('feature-card');

    const cols = [...row.children];

    const iconCol = cols[0];
    if (iconCol) {
      iconCol.classList.add('feature-icon');
    }

    const titleCol = cols[1];
    if (titleCol) {
      titleCol.classList.add('feature-title');
    }

    const descCol = cols[2];
    if (descCol) {
      descCol.classList.add('feature-desc');
    }
  });
}
