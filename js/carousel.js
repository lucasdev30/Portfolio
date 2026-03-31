const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = 320;
const visible = 3;
let index = 0;
let isTransitioning = false;

// Ne cloner que si on a plus d'items que visible
const needsClone = items.length > visible;

if (needsClone) {
  for (let i = 0; i < visible; i++) {
    const clone = items[i].cloneNode(true);
    track.appendChild(clone);
  }
}

const totalItems = document.querySelectorAll('.carousel-item').length;
const maxIndex = needsClone ? totalItems - visible : 0;

function moveToIndex(newIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  index = newIndex;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${itemWidth * index}px)`;

  if (needsClone && index >= maxIndex) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = `translateX(0px)`;
      isTransitioning = false;
    }, 500);
  } else {
    setTimeout(() => { isTransitioning = false; }, 500);
  }
}

function moveNext() {
  if (!needsClone && index >= items.length - visible) return; // Bloque si pas assez d'items
  moveToIndex(index + 1);
}

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  moveNext();
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  if (!needsClone) {
    if (index === 0) return; // Bloque au début
    moveToIndex(index - 1);
    return;
  }
  if (index === 0) {
    index = maxIndex;
    track.style.transition = "none";
    track.style.transform = `translateX(-${itemWidth * index}px)`;
  }
  setTimeout(() => { moveToIndex(index - 1); }, 20);
});