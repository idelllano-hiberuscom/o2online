export default function decorate(block) {
  block.classList.add('tariff-cards-block');

  [...block.children].forEach((row) => {
    row.classList.add('tariff-card');

    const cells = [...row.children];
    if (cells[0]) cells[0].classList.add('tariff-card-header');
    if (cells[1]) cells[1].classList.add('tariff-card-speed');
    if (cells[2]) cells[2].classList.add('tariff-card-data');
    if (cells[3]) cells[3].classList.add('tariff-card-price');
    if (cells[4]) cells[4].classList.add('tariff-card-price-label');
    if (cells[5]) cells[5].classList.add('tariff-card-cta-primary');
    if (cells[6]) cells[6].classList.add('tariff-card-cta-secondary');
  });
}
