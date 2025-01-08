// Elemente auswählen
const images = document.querySelectorAll('.gallery-image');
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeButton = document.getElementById('close-button');

// Bild im Vollbildmodus anzeigen
images.forEach(image => {
  image.addEventListener('click', () => {
    fullscreenImage.src = image.src; // Quelle des angeklickten Bildes setzen
    overlay.classList.remove('hidden'); // Overlay sichtbar machen
  });
});

// Overlay schließen
closeButton.addEventListener('click', () => {
  overlay.classList.add('hidden'); // Overlay ausblenden
});

// Optional: Vollbild mit Klick auf den Hintergrund schließen
overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.classList.add('hidden');
  }
});
