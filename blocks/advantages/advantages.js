export default function decorate(block) {
  block.classList.add('advantages-block');

  [...block.children].forEach((row) => {
    row.classList.add('advantage-item');

    const cells = [...row.children];
    if (cells[0]) cells[0].classList.add('advantage-icon');
    if (cells[1]) cells[1].classList.add('advantage-title');
    if (cells[2]) cells[2].classList.add('advantage-description');
  });
}
