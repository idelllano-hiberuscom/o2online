export default function decorate(block) {
  const rows = [...block.children];
  const textRow = rows[0];
  const ctaRow = rows[1];

  block.classList.add('coverage-banner-block');

  const wrapper = document.createElement('div');
  wrapper.classList.add('coverage-banner-content');

  if (textRow) {
    const p = document.createElement('p');
    p.innerHTML = textRow.innerHTML;
    wrapper.appendChild(p);
    textRow.remove();
  }

  if (ctaRow) {
    const link = ctaRow.querySelector('a');
    if (link) {
      link.classList.add('coverage-cta');
      wrapper.appendChild(link);
    }
    ctaRow.remove();
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
