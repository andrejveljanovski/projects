import { items } from "../../Data/data.js";

export function initVisitorHomePage() {
  sliderAnimation();
  next.addEventListener("click", nextSlide);
  previous.addEventListener("click", previousSlide);
}

const sliderAnimation = () => {
  const animationLeft = document.querySelector(".animation-left");
  const animationRight = document.querySelector(".animation-right");

  items.forEach((item) => {
    animationLeft.innerHTML += `<a href="#visitorListing" class="slider-item">
    <img src="${item.image}" alt="${item.description}" >
  </a>`;
    animationRight.innerHTML += `<a href="#visitorListing" class="slider-item">
    <img src="${item.image}" alt="${item.description}" >
  </a>`;
  });
};

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

const nextSlide = () => {
  goToSlide(currentSlide + 1);
};

const previousSlide = () => {
  goToSlide(currentSlide - 1);
};

const goToSlide = (n) => {
  slides[currentSlide].className = "slide";
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].className = "slide showing";
};

const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
