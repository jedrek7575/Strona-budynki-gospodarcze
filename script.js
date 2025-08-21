document.addEventListener('DOMContentLoaded', function () {
  // Nasłuchujemy kliknięcia na kartach w container5
  const cards = document.querySelectorAll('.container5-cards .card');

  // Funkcja aktualizująca formularz po kliknięciu na kartę
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
          if (e.target.closest('.carousel')) return; 
      // Pobieramy tytuł i wymiary z atrybutów data- na karcie
      const title = card.getAttribute('data-title');
      const dimensions = card.getAttribute('data-dimensions');

      // Ustawiamy odpowiednią nazwę budynku w formularzu
      const buildingNameField = document.querySelector('textarea[name="message"]');
      buildingNameField.value = `Dzień dobry! Interesuje mnie ${title} z dostawą do (wpisz miejscowość). Proszę o jak najszybszą odpowiedź.`;

      // Usuwamy fragment o wymiarach z formularza
      const dimensionsField = document.getElementById('dimensions1');
      if (dimensionsField) {
        dimensionsField.style.display = 'none';  // Ukrywamy wymiary
      }

      // Ustawiamy tytuł budynku
      const titleField = document.querySelector('.contact-name');
      if (titleField) {
        titleField.textContent = title;  // Ustawiamy tytuł budynku
      }
    });
  });
});

// Funkcja do przewijania do sekcji "Dimensions"
const scrollTrigger = document.getElementById('scrollToDimensions');
const target = document.getElementById('dimensions');

if (scrollTrigger && target) {
  scrollTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    const yOffset = -60; // Offset dla górnej krawędzi
    const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}

// Funkcja do uzupełniania treści wiadomości
function updateMessageText() {
  const activeContainer = document.querySelector('.build-container.active');
  const width = activeContainer.querySelector('input[id^="widthRange"]').value;
  const length = activeContainer.querySelector('input[id^="lengthRange"]').value;

  const messageField = document.getElementById('message');
  
  if (messageField) {
    let containerName = 'Narzędziówka'; // Default name
    const buttons = document.querySelectorAll("#burgerMenu button[data-target]");
    buttons.forEach(button => {
      if (button.classList.contains('active')) {
        containerName = button.textContent.trim();
      }
    });

    messageField.value = `Dzień dobry! Interesuje mnie ${containerName} o wymiarach ${width} x ${length} m na terenie (wpisz miejscowość). Proszę o jak najszybszą odpowiedź.`;
  }
}

// Funkcja do nasłuchiwania zmian na suwakach tylko dla aktywnego kontenera
function addEventListenersForActiveContainer() {
  const activeContainer = document.querySelector('.build-container.active');

  const widthRange = activeContainer.querySelector('input[id^="widthRange"]');
  const lengthRange = activeContainer.querySelector('input[id^="lengthRange"]');

  widthRange.addEventListener('input', () => {
    updateCalculator(activeContainer.id.replace('container', ''));
    updateBuildingMap(); // Aktualizuj mapę po zmianie rozmiarów
  });

  lengthRange.addEventListener('input', () => {
    updateCalculator(activeContainer.id.replace('container', ''));
    updateBuildingMap(); // Aktualizuj mapę po zmianie rozmiarów
  });
}

// Funkcja aktualizująca wartości w polach suwaków oraz treści
function updateCalculator(containerId) {
  const widthRange = document.getElementById(`widthRange${containerId}`);
  const lengthRange = document.getElementById(`lengthRange${containerId}`);
  const widthValue = document.getElementById(`widthValue${containerId}`);
  const lengthValue = document.getElementById(`lengthValue${containerId}`);
  const priceEstimate = document.getElementById(`priceEstimate${containerId}`);

  const width = parseFloat(widthRange.value);
  const length = parseFloat(lengthRange.value);
  const area = width * length;

  const pricePerSquareMeter = {
    container1: 1017,
    container2: 1183,
    container3: 1286,
    container4: 768
  };

  const estimatedPrice = Math.round(area * pricePerSquareMeter[`container${containerId}`]);

  widthValue.textContent = width.toFixed(1);
  lengthValue.textContent = length.toFixed(1);
  priceEstimate.textContent = estimatedPrice.toLocaleString('pl-PL') + ' zł';

  updateMessageText();
}

// Funkcja do aktualizacji mapki budynku w aktywnym kontenerze
function updateBuildingMap() {
  const activeContainer = document.querySelector('.build-container.active');

  const width = activeContainer.querySelector('input[id^="widthRange"]').value;
  const length = activeContainer.querySelector('input[id^="lengthRange"]').value;

  const buildingMap = activeContainer.querySelector('.building-map');

  if (buildingMap) {
    const mapWidth = width * 50; // Szerokość w px
    const mapHeight = length * 50; // Wysokość w px

    buildingMap.style.width = `${mapWidth}px`;
    buildingMap.style.height = `${mapHeight}px`;
  }
}

// Funkcja do ustawienia nasłuchiwania na kliknięcie przycisku w burger menu
function setUpBurgerMenu() {
  const buttons = document.querySelectorAll("#burgerMenu button[data-target]");
  const containers = document.querySelectorAll(".build-container");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      containers.forEach((c) => c.classList.remove("active"));

      button.classList.add("active");
      const targetId = button.getAttribute("data-target");
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) {
        targetContainer.classList.add("active");
      }

      addEventListenersForActiveContainer(); // Ustaw nasłuch na suwakach
      updateBuildingMap(); // Aktualizuj mapkę po zmianie kontenera
    });
  });
}

// Inicjalizujemy nasłuch i aktualizacje mapki dla aktywnego kontenera
setUpBurgerMenu();
addEventListenersForActiveContainer();
updateBuildingMap(); // Inicjalizujemy mapkę przy załadowaniu strony


document.addEventListener('DOMContentLoaded', () => {
  // Nasłuchujemy na kliknięcia przycisków "Zapytaj o dostępność" we wszystkich kontenerach
  const allButtons = document.querySelectorAll('.container5 .btn, .build-container .btn'); // Przycisk w każdym kontenerze

  // Iteracja po wszystkich przyciskach
  allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Zapobiega domyślnemu zachowaniu, jeśli jest to link

      const contactSection = document.getElementById('contact'); // Sekcja kontaktowa
      if (contactSection) {
        const yOffset = -60; // Offset, aby uwzględnić wysokość nagłówka
        const y = contactSection.getBoundingClientRect().top + window.scrollY + yOffset;

        // Przewijanie strony do sekcji kontaktowej
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});


document.querySelectorAll('#container5 .carousel .carousel-control-prev, #container5 .carousel .carousel-control-next')
  .forEach(ctrl => ctrl.addEventListener('click', e => e.stopPropagation()));   // <-- DODAJ


  document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("dog-lightbox");
  const closeBtn = document.querySelector(".dog-lightbox-close");
  const mainImg = document.getElementById("dog-lightbox-main-img");
  const thumbsContainer = document.getElementById("dog-lightbox-thumbs");

  // Przykładowe galerie zdjęć dla każdej budy
  const dogGalleries = {
    "villa-cerber": ["Buda12.webp", "Buda11.webp", "Buda13.webp", "image1.jpg", "image2.jpg"],
    "dog2": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
    "dog3": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
    "dog4": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
    "dog5": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
  };

  // Kliknięcie w obrazek w karcie
  document.querySelectorAll(".dog-card img").forEach(img => {
    img.addEventListener("click", () => {
      const card = img.closest(".dog-card");
      const galleryKey = card.getAttribute("data-title").toLowerCase().replace(/\s+/g,"-");

      if (dogGalleries[galleryKey]) {
        thumbsContainer.innerHTML = ""; // czyścimy miniatury
        dogGalleries[galleryKey].forEach((src, i) => {
          const thumb = document.createElement("img");
          thumb.src = src;
          if (i === 0) {
            thumb.classList.add("active");
            mainImg.src = src;
          }
          thumb.addEventListener("click", () => {
            mainImg.src = src;
            document.querySelectorAll(".dog-lightbox-thumbs img").forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
          });
          thumbsContainer.appendChild(thumb);
        });

        lightbox.style.display = "flex";
      }
    });
  });

  // Zamknięcie
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Zamknięcie klikając w tło
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});
