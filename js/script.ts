interface observerOPS {
  root: null;
  threshold: number;
  rootMargin?: string;
}
// variables
const header = document.querySelector(`.header`) as HTMLHeadElement;
const hero = document.querySelector(`.hero-main`) as HTMLDivElement;
const percentages = document.querySelectorAll(`.percentage`);
const percentageBOX = document.querySelector(`.truth-secondary`) as HTMLDivElement;
const sliderBox = document.querySelector(`.carousel-slides`) as HTMLDivElement;
const lineBox = document.querySelector(`.carousel-btns`) as HTMLDivElement;
const allSlides = document.querySelectorAll<HTMLDivElement>(`.carousel-main`);
const allLines = document.querySelectorAll<HTMLDivElement>(`.btm-line`);

// header show / hide && percentage run / observe / stop
class HeaderObserver {
  #observer?: IntersectionObserver;
  constructor(protected toObserve: HTMLDivElement, protected obsOption: observerOPS) {
    this._getObserver();
  }
  _itemPos(e: any) {
    const [event] = e;
    !event.isIntersecting ? header.classList.add(`fixed`) : header.classList.remove(`fixed`);
  }
  _getObserver() {
    this.#observer = new IntersectionObserver(this._itemPos.bind(this), this.obsOption);
    this.#observer.observe(this.toObserve);
  }
}
class PercentageObserver extends HeaderObserver {
  #done = false;
  #maxNum = 84;
  #num = 0;
  constructor(protected toObserve: HTMLDivElement, protected obsOption: observerOPS) {
    super(toObserve, obsOption);
  }
  _itemPos(e: any) {
    const [event] = e;
    if (event.isIntersecting) {
      if (this.#done === false) {
        const interval = setInterval(() => {
          this.#num++;
          if (this.#num === this.#maxNum) clearInterval(interval);
          percentages.forEach((_, i) => {
            percentages[0].textContent = `${this.#num}%`;
            percentages[1].textContent = `${this.#num < 73 ? this.#num : 73}%`;
            percentages[2].textContent = `${this.#num < 56 ? this.#num : 56}%`;
          });
        }, 30);
      }
      this.#done = true;
    }
  }
}
const headerAnim = new HeaderObserver(hero, { root: null, threshold: 0.5, rootMargin: "90px" });
const counterDownAnim = new PercentageObserver(percentageBOX, { root: null, threshold: 0.4 });
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
    allSlides.forEach((el, i) => (el.style.transform = `translateX(${i * 100}%)`));
  }
  _removeLines() {
    allLines.forEach((el) => el.classList.remove(`btm-show`));
  }
  _changeSLD(currSLD: number) {
    allSlides.forEach((el, i) => (el.style.transform = `translateX(${(i - currSLD) * 100}%)`));
  }
  _carouselMain(e) {
    const target = e.target.closest(`.carousel-btn`);
    if (!target) return;
    if (target.dataset.side === `r`) {
      this.#currSLD++;
      if (this.#currSLD > 4) this.#currSLD = 0;
      this._changeSLD(this.#currSLD);
    }
    if (target.dataset.side === `l`) {
      this.#currSLD--;
      if (this.#currSLD <= 0) this.#currSLD = 0;
      this._changeSLD(this.#currSLD);
    }
    if (allSlides[this.#currSLD].dataset.slide === allLines[this.#currSLD].dataset.line) {
      this._removeLines();
      allLines[this.#currSLD].classList.add(`btm-show`);
    }
  }
  _lineMain(e) {
    const target = e.target.closest(`p`).lastChild;
    if (!target) return;
    this._changeSLD(target.dataset.line);
    this.#currSLD = target.dataset.line;
    this._removeLines();
    allLines[target.dataset.line].classList.add(`btm-show`);
  }
}
const carouselApp = new Carousel();
