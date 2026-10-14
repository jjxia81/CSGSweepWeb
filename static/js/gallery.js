document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.results-gallery');
  if (!gallery) return;

  const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
  const count = gallery.querySelector('.gallery-count');
  const toggle = gallery.querySelector('[data-gallery-action="toggle"]');
  const rotationInterval = 3000;
  let current = 0;
  let isPlaying = true;
  let rotationTimer;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.hidden = !active;
    });
    count.textContent = `${current + 1} / ${slides.length}`;
  }

  function stopRotation() {
    window.clearInterval(rotationTimer);
    rotationTimer = undefined;
  }

  function startRotation() {
    stopRotation();
    if (isPlaying && !document.hidden) {
      rotationTimer = window.setInterval(() => show(current + 1), rotationInterval);
    }
  }

  function updateToggle() {
    const icon = toggle.querySelector('i');
    const label = toggle.querySelector('span');
    toggle.setAttribute('aria-pressed', String(isPlaying));
    toggle.setAttribute('aria-label', isPlaying ? 'Pause automatic rotation' : 'Play automatic rotation');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    label.textContent = isPlaying ? 'Pause' : 'Play';
  }

  function browse(index) {
    show(index);
    startRotation();
  }

  gallery.querySelector('[data-gallery-action="previous"]').addEventListener('click', () => browse(current - 1));
  gallery.querySelector('[data-gallery-action="next"]').addEventListener('click', () => browse(current + 1));
  toggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updateToggle();
    startRotation();
  });
  gallery.addEventListener('mouseenter', stopRotation);
  gallery.addEventListener('mouseleave', startRotation);
  gallery.addEventListener('focusin', stopRotation);
  gallery.addEventListener('focusout', startRotation);
  document.addEventListener('visibilitychange', startRotation);
  show(0);
  updateToggle();
  startRotation();
});
