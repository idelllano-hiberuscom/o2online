export default function decorate(block) {
  const rows = [...block.children];
  const picture = block.querySelector('picture');

  if (picture) {
    const pictureContainer = picture.closest('div');
    pictureContainer.classList.add('hero-image');
  }

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (!cell.querySelector('picture')) {
        cell.classList.add('hero-content');
      }
    });
  });

  const content = block.querySelector('.hero-content');
  if (content) {
    const heading = content.querySelector('h1, h2');
    if (heading) heading.classList.add('hero-heading');

    const paragraphs = content.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (!p.querySelector('a') && !p.querySelector('picture')) {
        p.classList.add('hero-tagline');
      }
    });

    const cta = content.querySelector('a');
    if (cta) {
      cta.classList.add('button', 'hero-cta');
    }
  }
}
