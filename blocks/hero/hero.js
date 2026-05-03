export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      block.style.backgroundImage = `url(${img.src})`;
    }
    picture.remove();
  }

  const links = block.querySelectorAll('a');
  links.forEach((a) => a.classList.add('hero-btn'));

  const content = document.createElement('div');
  content.className = 'hero-content';
  while (block.firstChild) {
    content.appendChild(block.firstChild);
  }
  block.appendChild(content);
}
