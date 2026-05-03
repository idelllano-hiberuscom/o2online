export default function decorate(block) {
  const rows = [...block.children];
  block.classList.add('pricing-cards-wrapper');

  rows.forEach((row) => {
    row.classList.add('pricing-card');

    const links = row.querySelectorAll('a');
    if (links[0]) links[0].classList.add('pricing-btn-primary');
    if (links[1]) links[1].classList.add('pricing-btn-secondary');

    const actions = document.createElement('div');
    actions.className = 'pricing-card-actions';
    links.forEach((a) => actions.appendChild(a));

    const top = document.createElement('div');
    top.className = 'pricing-card-top';
    while (row.firstChild) {
      top.appendChild(row.firstChild);
    }
    row.appendChild(top);
    row.appendChild(actions);
  });
}
