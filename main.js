const container = document.querySelector("#mySlider");
const track = container.firstElementChild;
const slides = track.children;
const prevBtn = container.querySelector(".prev");
const nextBtn = container.querySelector(".next");
const dotsWrapper = container.querySelector(".dots");

let total = slides.length;
let index = 0;
let slideWidth = container.clientWidth;

function setUpWidths() {
  track.style.width = total * slideWidth + "px";
  Array.from(slides).map((slide) => {
    slide.style.width = slideWidth + "px";
  });
}

function update(isInstance) {
  track.style.transition = isInstance ? "none" : "transform 0.3s ease";
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  updateDots();
}

function move(step) {
  index += step;
  if (index < 0) index = 0;
  if (index > total - 1) index = total - 1;
  update();
}

const dots = [];

function createDots() {
  dotsWrapper.innerHTML = "";
  let cur = track.firstElementChild;
  let i = 0;
  while (cur) {
    const dot = document.createElement("button");
    const idx = i;
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = idx;
      update();
      updateDots();
    });
    dotsWrapper.appendChild(dot);
    dots.push(dot);
    cur = cur.nextElementSibling;
    i++;
  }
}

function updateDots() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle("active", i === index);
  }
}

setUpWidths();
createDots();
update();

prevBtn.addEventListener("click", () => move(-1));
nextBtn.addEventListener("click", () => move(1));

window.addEventListener("resize", () => {
  setUpWidths();
  update(true);
});
