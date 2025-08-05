document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll("#burgerMenu button[data-target]");
  const containers = document.querySelectorAll(".build-container");

  // Funkcja do uzupełniania treści wiadomości
  function updateMessageText() {
    const activeContainer = document.querySelector('.build-container.active');
    const width = activeContainer.querySelector('input[id^="widthRange"]').value;
    const length = activeContainer.querySelector('input[id^="lengthRange"]').value;

    const messageField = document.getElementById('message');
    
    if (messageField) {
      let containerName = 'Budynek'; // Default name
      buttons.forEach(button => {
        if (button.classList.contains('active')) {
          containerName = button.textContent.trim();
        }
      });

      messageField.value = `Dzień dobry! Interesuje mnie ${containerName} o wymiarach ${width} x ${length} m na terenie (wpisz miejscowość). Proszę o jak najszybszą odpowiedź.`;
    }
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
      container1: 850,
      container2: 900,
      container3: 1300,
      container4: 450
    };

    const estimatedPrice = Math.round(area * pricePerSquareMeter[`container${containerId}`]);

    widthValue.textContent = width.toFixed(1);
    lengthValue.textContent = length.toFixed(1);
    priceEstimate.textContent = estimatedPrice.toLocaleString('pl-PL') + ' zł';

    updateMessageText();
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
});

document.addEventListener('DOMContentLoaded', () => {
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
});
