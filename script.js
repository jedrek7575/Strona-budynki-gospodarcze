// --- Navbar: zmiana stylu po scrollu
const navbar = document.querySelector('.navbar');
const whiteSections = ['#dimensions', '#gallery', '#contact'];

// Dodaj te elementy
const ikonazab = document.getElementById('ikonazab');
const ikonablack = document.getElementById('ikonablack');

function checkWhiteSectionInView() {
  const vh = window.innerHeight;
  const isVisible = whiteSections.some(selector => {
    const el = document.querySelector(selector);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < vh && rect.bottom > 0;
  });

  if (isVisible) {
    navbar.classList.add('white');
    if (ikonazab) ikonazab.classList.add('white');
    if (ikonablack) ikonablack.classList.add('white');
  } else {
    navbar.classList.remove('white');
    if (ikonazab) ikonazab.classList.remove('white');
    if (ikonablack) ikonablack.classList.remove('white');
  }
}

window.addEventListener('scroll', checkWhiteSectionInView);
checkWhiteSectionInView();
