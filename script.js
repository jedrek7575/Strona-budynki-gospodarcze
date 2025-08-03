document.addEventListener('DOMContentLoaded', () => {
  // Stopka - aktualny rok
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Suwaki i pola
  const widthRange = document.getElementById('widthRange');
  const lengthRange = document.getElementById('lengthRange');
  const widthValue = document.getElementById('widthValue');
  const lengthValue = document.getElementById('lengthValue');
  const priceEstimate = document.getElementById('priceEstimate');

  // SVG i etykiety
  const buildingRect = document.getElementById('buildingRect');
  const widthLabel = document.getElementById('widthLabel');
  const lengthLabel = document.getElementById('lengthLabel');

  const maxWidth = 5;
  const maxLength = 7;
  const maxSvgSize = 80;

  function updateSketch() {
    const width = parseFloat(widthRange.value);
    const length = parseFloat(lengthRange.value);

    widthValue.textContent = width.toFixed(1);
    lengthValue.textContent = length.toFixed(1);

    const area = width * length;
    const estimated = Math.round(area * 750);
    priceEstimate.textContent = estimated.toLocaleString('pl-PL') + ' zł';

    const scale = maxSvgSize / Math.max(maxWidth, maxLength);
    const scaledW = width * scale;
    const scaledH = length * scale;

    const x = (100 - scaledW) / 2;
    const y = (100 - scaledH) / 2;

    buildingRect.setAttribute('x', x.toFixed(1));
    buildingRect.setAttribute('y', y.toFixed(1));
    buildingRect.setAttribute('width', scaledW.toFixed(1));
    buildingRect.setAttribute('height', scaledH.toFixed(1));

    // Szerokość - na dole
    widthLabel.setAttribute('x', 50);
    widthLabel.setAttribute('y', y + scaledH + 10);
    widthLabel.setAttribute('transform', '');
    widthLabel.textContent = `Szerokość: ${width.toFixed(1)} m`;

    // Długość - po prawej stronie
    lengthLabel.setAttribute('x', x + scaledW + 5);
    lengthLabel.setAttribute('y', y + scaledH / 2);
    lengthLabel.setAttribute('transform', `rotate(-90 ${x + scaledW + 5},${y + scaledH / 2})`);
    lengthLabel.textContent = `Długość: ${length.toFixed(1)} m`;
  }

  widthRange.addEventListener('input', updateSketch);
  lengthRange.addEventListener('input', updateSketch);
  updateSketch();
});

// Płynne przewijanie do sekcji #offer po kliknięciu "Poznaj ofertę"
document.addEventListener('DOMContentLoaded', () => {
  const scrollTrigger = document.getElementById('scrollToOffer');
  const target = document.getElementById('offer');

  if (scrollTrigger && target) {
    scrollTrigger.addEventListener('click', e => {
      e.preventDefault();
      const yOffset = -60;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }
});

// Klasa "white" do navbaru przy widoczności wybranych sekcji
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const whiteSections = ['#dimensions', '#gallery', '#contact'];

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
    } else {
      navbar.classList.remove('white');
    }
  }

  window.addEventListener('scroll', checkWhiteSectionInView);
  window.addEventListener('load', checkWhiteSectionInView);
});
