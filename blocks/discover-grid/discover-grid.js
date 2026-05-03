export default function decorate(block) {
  block.classList.add('discover-grid-block');

  [...block.children].forEach((row) => {
    row.classList.add('discover-card');

    const cells = [...row.children];
    if (cells[0]) cells[0].classList.add('discover-card-image');
    if (cells[1]) cells[1].classList.add('discover-card-title');
    if (cells[2]) cells[2].classList.add('discover-card-description');
    if (cells[3]) cells[3].classList.add('discover-card-link');
  });
}
