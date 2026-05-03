export default function decorate(block) {
  block.classList.add('features-block');

  [...block.children].forEach((row) => {
    row.classList.add('feature-item');

    const cells = [...row.children];
    if (cells[0]) cells[0].classList.add('feature-icon');
    if (cells[1]) cells[1].classList.add('feature-title');
    if (cells[2]) cells[2].classList.add('feature-description');
  });
}
