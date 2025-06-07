const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");
const cards = document.querySelectorAll(".card");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const toggleBtn = document.getElementById("theme-toggle");

let index = 0;

function updateLightbox() {
  const current = cards[index].querySelector("img");
  lightboxImg.src = current.src;
  caption.textContent = cards[index].dataset.title;
  counter.textContent = `Image ${index + 1} of ${cards.length}`;
}

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    index = i;
    updateLightbox();
    lightbox.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  updateLightbox();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  updateLightbox();
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});
