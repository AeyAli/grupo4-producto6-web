// Carousel e inicializaciones para index.html
document.addEventListener('DOMContentLoaded', function(){
  let carousel = document.getElementById('carousel');
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  let idx = 0;
  function show(i){
    slides.forEach((s,n)=> s.classList.toggle('visible', n===i));
  }
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if (prev) prev.addEventListener('click', ()=> { idx = (idx-1+slides.length)%slides.length; show(idx); });
  if (next) next.addEventListener('click', ()=> { idx = (idx+1)%slides.length; show(idx); });
  show(idx);
  setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); }, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    { src: "Imagenes/Imagenes-Carrusel/Que-ver-en-Bilbao.jpg", title: "Casco Viejo de Bilbao" },
    { src: "Imagenes/Imagenes-Carrusel/f1_car_1.jpg", title: "Monoplaza de F1 en plena curva" },
    { src: "Imagenes/Imagenes-Carrusel/bilbao_ria.jpg", title: "La Ría de Bilbao y la ciudad" },
    { src: "Imagenes/Imagenes-Carrusel/f1_pit_stop.jpg", title: "Pit stop: cambio rápido de neumáticos" },
    { src: "Imagenes/Imagenes-Carrusel/bilbao_guggenheim.jpg", title: "Museo Guggenheim Bilbao" },
    { src: "Imagenes/Imagenes-Carrusel/f1_grid.jpg", title: "Parrilla de salida antes de la carrera" },
    { src: "Imagenes/Imagenes-Carrusel/bilbao_night.jpg", title: "Bilbao de noche iluminada" },
    { src: "Imagenes/Imagenes-Carrusel/f1_overtake.jpg", title: "Adelantamiento espectacular en pista" },
    { src: "Imagenes/Imagenes-Carrusel/bilbao_plaza.jpg", title: "Plaza y calles típicas de Bilbao" },
    { src: "Imagenes/Imagenes-Carrusel/f1_podium.jpg", title: "Podio: celebración del ganador" }
  ];

  // Preload imágenes
  images.forEach(i => { const p = new Image(); p.src = i.src; });

  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  // Solo imagen y título (sin controles ni "dots")
  carousel.innerHTML = `
    <div class="slide-image-wrap">
      <img id="carouselImage" class="FotosCarrusel" src="" alt="" />
    </div>
    <div id="carouselCaption" class="slide-caption" aria-live="polite"></div>
  `;

  const imgEl = document.getElementById("carouselImage");
  const captionEl = document.getElementById("carouselCaption");

  // Centrar el título desde el script (asegura centrado incluso sin CSS adicional)
  captionEl.style.textAlign = "center";
  captionEl.style.display = "block";
  captionEl.style.width = "100%";
  captionEl.style.marginTop = "0.4rem";

  let current = 0;
  const INTERVAL = 3000;
  let timer = null;

  function show(index) {
    const item = images[index];
    imgEl.src = item.src;
    imgEl.alt = item.title;
    captionEl.textContent = item.title;
    current = index;
  }

  function next() { show((current + 1) % images.length); }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  // Inicializar
  show(0);
  resetTimer();
});

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');
  const DEFAULT_INTERVAL = 4000; // ms

  carousels.forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const interval = carousel.dataset.interval ? Number(carousel.dataset.interval) : DEFAULT_INTERVAL;

    function show(index) {
      slides.forEach((s, i) => {
        const isVisible = i === index;
        s.classList.toggle('visible', isVisible);
        s.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      });
    }

    function start() {
      stop();
      timer = setInterval(() => {
        current = (current + 1) % slides.length;
        show(current);
      }, interval);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Inicializar
    show(current);
    start();

    // Pausar en hover y focus (mejora accesibilidad)
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    // Si hay varias carousels, evita que el timer se duplique
    // y permite configurar intervalo con data-attribute: <div class="carousel" data-interval="5000">
  });
});