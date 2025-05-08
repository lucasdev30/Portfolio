  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const itemWidth = 320;
  const visible = 3;
  let index = 0;
  let isTransitioning = false;

  // Clonage des premiers éléments pour la boucle
  for (let i = 0; i < visible; i++) {
    const clone = items[i].cloneNode(true);
    track.appendChild(clone);
  }

  const totalItems = document.querySelectorAll('.carousel-item').length;

  function moveToIndex(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    index = newIndex;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${itemWidth * index}px)`;

    // Si on arrive aux clones (fin), on réinitialise après la transition
    if (index >= totalItems - visible) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(0px)`;
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function moveNext() {
    moveToIndex(index + 1);
  }


// Boutons gauche/droite sans auto-slide
document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  moveNext();
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  if (index === 0) {
    // Aller à la fin "clonée", instantanément
    index = totalItems - visible;
    track.style.transition = "none";
    track.style.transform = `translateX(-${itemWidth * index}px)`;
  }
  setTimeout(() => {
    moveToIndex(index - 1);
  }, 20);
});

