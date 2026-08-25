document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.results-gallery');
  if (!gallery) return;

  const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
  const count = gallery.querySelector('.gallery-count');
  let current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.hidden = !active;
    });
    count.textContent = `${current + 1} / ${slides.length}`;
  }

  gallery.querySelector('[data-gallery-action="previous"]').addEventListener('click', () => show(current - 1));
  gallery.querySelector('[data-gallery-action="next"]').addEventListener('click', () => show(current + 1));
  show(0);
});
