"use strict";
function getEvenNumbers(i) {
  let evenNumbers = [];
  for (let i = 0; i <= 25; i++) {
    if (i % 2 === 0) {
      evenNumbers.push(i);
    }
  }
  return evenNumbers[i];
}
function getOddNumbers(i) {
  let oddNumbers = [];
  for (let i = 0; i <= 25; i++) {
    if (i % 2 !== 0) {
      oddNumbers.push(i);
    }
  }
  return oddNumbers[i];
}
const arr = [
  `საუკეთესო`,
  `შამპუნი "ჩინური რეცეპტი"`,
  `კრემი`,
  `მუსი`,
  "სკრაბი/შამპუნი",
  "თმის შეჭრა",
  "თმის მოვლა",
  "კორექცია",
  "სკანდინავიური გუფთა",
  "ხაჭოს დესერტი",
  "გშია?",
  "ცივი აჯაფსანდალი",
  "ჯანსაღი ჩაი",
  "სუში ლანჩზე",
  "ნიუ ბოტი",
  "ყურსასმენი",
  "მტვერსასრუტი",
  "სმარტ საათი",
  "ულტრაბიოტიკი",
  "დორიტრიცინი",
  "ბიოქსინი",
  "ენტეროსგელი",
  "დრიფტი",
  "კარტინგი",
  "რბოლა",
  "ფორმულა ერთი",
];
const arr2 = [
  "Beauty",
  "Beauty",
  "Beauty",
  "Beauty",
  "Beauty",
  "Beauty",
  "Beauty",
  "Beauty",
  "Food and Beverage",
  "Food and Beverage",
  "Food and Beverage",
  "Food and Beverage",
  "Food and Beverage",
  "Food and Beverage",
  "Technology",
  "Technology",
  "Technology",
  "Technology",
  "Medicine",
  "Medicine",
  "Medicine",
  "Medicine",
  "Sport",
  "Sport",
  "Sport",
  "Sport",
];
// test
const test2 = function () {};
const test = document.querySelector(`.carousel-slides`);
for (let i = 0; i <= 25; i++) {
  const markup = `
  <div
  data-slide="${i}"
  class="carousel-main grid grid--2cls-2rws slide--${i}"
>
</div>

  `;
  test.insertAdjacentHTML(`beforeend`, markup);
}

document.querySelectorAll(`.carousel-main`).forEach((el, i) => {
  const markup = `
    <div class="card-box">
    <img
      src="/img/pic${getEvenNumbers(i)}.jpg"
      alt="beauty-picture"
      class="card-img"
    />
    <p class="name">${arr[getEvenNumbers(i)]}</p>
    <p class="category">${arr2[getEvenNumbers(i)]}</p>
  </div>
  <div class="card-box">
  <img
    src="/img/pic${getOddNumbers(i)}.jpg"
    alt="beauty-picture"
    class="card-img"
  />
  <p class="name">${arr2[getOddNumbers(i)]}</p>
  <p class="category">${arr2[getOddNumbers(i)]}</p>
</div>
    `;
  el.insertAdjacentHTML(`afterbegin`, markup);
});
// variables
const header = document.querySelector(`.header`);
const hero = document.querySelector(`.hero-main`);
const percentages = document.querySelectorAll(`.percentage`);
const percentageBOX = document.querySelector(`.truth-secondary`);
const sliderBox = document.querySelector(`.carousel-slides`);
const lineBox = document.querySelector(`.carousel-btns`);
const allSlides = document.querySelectorAll(`.carousel-main`);
const allLines = document.querySelectorAll(`.btm-line`);
// header show / hide && percentage run / observe / stop
// #######################################################################################
// main carousel
class Carousel {
  #currSLD = 0;
  constructor() {
    this._initCarousel();
    sliderBox.addEventListener(`click`, this._carouselMain.bind(this));
    lineBox.addEventListener(`click`, this._lineMain.bind(this));
  }
  _initCarousel() {
    allSlides.forEach(
      (el, i) => (el.style.transform = `translateX(${i * 100}%)`)
    );
  }
  _removeLines() {
    allLines.forEach((el) => el.classList.remove(`btm-show`));
  }
  _changeSLD(currSLD) {
    allSlides.forEach(
      (el, i) => (el.style.transform = `translateX(${(i - currSLD) * 100}%)`)
    );
  }
  _carouselMain(e) {
    const target = e.target.closest(`.carousel-btn`);
    if (!target) return;
    if (target.dataset.side === `r`) {
      this.#currSLD++;
      if (this.#currSLD > 12) {
        this.#currSLD = 0;
        this._removeLines();
        allLines[0].classList.add(`btm-show`);
      }
      this._changeSLD(this.#currSLD);
    }
    if (target.dataset.side === `l`) {
      this.#currSLD--;
      if (this.#currSLD <= 0) this.#currSLD = 0;
      this._changeSLD(this.#currSLD);
    }
    if (+allSlides[this.#currSLD].dataset.slide === 4 && this.#currSLD === 4) {
      this._removeLines();
      allLines[1].classList.add(`btm-show`);
    }
    if (+allSlides[this.#currSLD].dataset.slide === 7 && this.#currSLD === 7) {
      this._removeLines();
      allLines[2].classList.add(`btm-show`);
    }
    if (+allSlides[this.#currSLD].dataset.slide === 9 && this.#currSLD === 9) {
      this._removeLines();
      allLines[3].classList.add(`btm-show`);
    }
    if (
      +allSlides[this.#currSLD].dataset.slide === 11 &&
      this.#currSLD === 11
    ) {
      this._removeLines();
      allLines[4].classList.add(`btm-show`);
    }
  }
  _lineMain(e) {
    const target = e.target.closest(`p`).querySelector(`span`);
    if (!target) return;
    this._changeSLD(target.dataset.line);
    this.#currSLD = target.dataset.line;
    this._removeLines();
    if (+target.dataset.line === 0) {
      allLines[0].classList.add(`btm-show`);
    }
    if (+target.dataset.line === 4) {
      allLines[1].classList.add(`btm-show`);
    }
    if (+target.dataset.line === 7) {
      allLines[2].classList.add(`btm-show`);
    }
    if (+target.dataset.line === 9) {
      allLines[3].classList.add(`btm-show`);
    }
    if (+target.dataset.line === 11) {
      allLines[4].classList.add(`btm-show`);
    }
  }
}
const carouselApp = new Carousel();
