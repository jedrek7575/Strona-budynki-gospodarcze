document.addEventListener('DOMContentLoaded', () => {
  // --- STOPKA: aktualny rok
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- SUWAKI + CENA + RYSUNEK
  const widthRange = document.getElementById('widthRange');
  const lengthRange = document.getElementById('lengthRange');
  const widthValue = document.getElementById('widthValue');
  const lengthValue = document.getElementById('lengthValue');
  const priceEstimate = document.getElementById('priceEstimate');

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

    widthLabel.setAttribute('x', 50);
    widthLabel.setAttribute('y', y + scaledH + 10);
    widthLabel.setAttribute('transform', '');
    widthLabel.textContent = `Szerokość: ${width.toFixed(1)} m`;

    lengthLabel.setAttribute('x', x + scaledW + 5);
    lengthLabel.setAttribute('y', y + scaledH / 2);
    lengthLabel.setAttribute('transform', `rotate(-90 ${x + scaledW + 5},${y + scaledH / 2})`);
    lengthLabel.textContent = `Długość: ${length.toFixed(1)} m`;
  }

  // --- FORMULARZ: automatyczne uzupełnienie treści wiadomości
  function updateMessageText() {
    const width = widthRange.value;
    const length = lengthRange.value;
    const messageField = document.getElementById('message');
    if (messageField) {
      messageField.value = `Dzień dobry! Interesuje mnie budynek o wymiarach ${width} x ${length} m ` +
        `na terenie (wpisz miejscowość). Proszę o jak najszybszą odpowiedź.`;
    }
  }

  // Nasłuch zmian suwaków (dla rysunku i wiadomości)
  widthRange.addEventListener('input', () => {
    updateSketch();
    updateMessageText();
  });
  lengthRange.addEventListener('input', () => {
    updateSketch();
    updateMessageText();
  });

  // Inicjalizacja na start
  updateSketch();
  updateMessageText();

  // --- SCROLL: przewijanie do sekcji "O nas"
  const scrollTrigger = document.getElementById('scrollToDimensions');
  const target = document.getElementById('dimensions');
  if (scrollTrigger && target) {
    scrollTrigger.addEventListener('click', e => {
      e.preventDefault();
      const yOffset = -60;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  // --- Navbar: zmiana stylu po scrollu
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

const ikonazab = document.getElementById('ikonazab');
const ikonablack = document.getElementById('ikonablack');

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
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#burgerMenu button[data-target]");
  const containers = document.querySelectorAll(".build-container");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Dezaktywuj wszystkie przyciski i kontenery
      buttons.forEach((btn) => btn.classList.remove("active"));
      containers.forEach((c) => c.classList.remove("active"));

      // Aktywuj kliknięty przycisk i jego kontener
      button.classList.add("active");
      const targetId = button.getAttribute("data-target");
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) {
        targetContainer.classList.add("active");
      }
    });
  });
});
