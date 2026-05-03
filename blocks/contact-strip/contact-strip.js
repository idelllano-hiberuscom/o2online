export default function decorate(block) {
  const rows = [...block.children];

  block.classList.add('contact-strip-block');

  const wrapper = document.createElement('div');
  wrapper.classList.add('contact-strip-content');

  if (rows[0]) {
    const p = document.createElement('p');
    p.innerHTML = rows[0].innerHTML;
    wrapper.appendChild(p);
    rows[0].remove();
  }

  if (rows[1]) {
    const link = rows[1].querySelector('a');
    if (link) {
      link.classList.add('contact-link');
      wrapper.appendChild(link);
    }
    rows[1].remove();
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
