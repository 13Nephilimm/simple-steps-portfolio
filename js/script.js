"use strict";
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
class HeaderObserver {
    toObserve;
    obsOption;
    #observer;
    constructor(toObserve, obsOption) {
        this.toObserve = toObserve;
        this.obsOption = obsOption;
        this._getObserver();
    }
    _itemPos(e) {
        const [event] = e;
        !event.isIntersecting ? header.classList.add(`fixed`) : header.classList.remove(`fixed`);
    }
    _getObserver() {
        this.#observer = new IntersectionObserver(this._itemPos.bind(this), this.obsOption);
        this.#observer.observe(this.toObserve);
    }
}
class PercentageObserver extends HeaderObserver {
    toObserve;
    obsOption;
    #done = false;
    #maxNum = 84;
    #num = 0;
    constructor(toObserve, obsOption) {
        super(toObserve, obsOption);
        this.toObserve = toObserve;
        this.obsOption = obsOption;
    }
    _itemPos(e) {
        const [event] = e;
        if (event.isIntersecting) {
            if (this.#done === false) {
                const interval = setInterval(() => {
                    this.#num++;
                    if (this.#num === this.#maxNum)
                        clearInterval(interval);
                    percentages.forEach((_, i) => {
                        percentages[0].textContent = `${this.#num}%`;
                        percentages[1].textContent = `${this.#num < 73 ? this.#num : 73}%`;
                        percentages[2].textContent = `${this.#num < 56 ? this.#num : 56}%`;
                    });
                }, 30);
            }
            this.#done = true;
            console.log(this.toObserve);
        }
    }
}
console.log(typeof null);
// console.log(`23`);
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
    _changeSLD(currSLD) {
        allSlides.forEach((el, i) => (el.style.transform = `translateX(${(i - currSLD) * 100}%)`));
    }
    _carouselMain(e) {
        const target = e.target.closest(`.carousel-btn`);
        if (!target)
            return;
        if (target.dataset.side === `r`) {
            this.#currSLD++;
            if (this.#currSLD > 4)
                this.#currSLD = 0;
            this._changeSLD(this.#currSLD);
        }
        if (target.dataset.side === `l`) {
            this.#currSLD--;
            if (this.#currSLD <= 0)
                this.#currSLD = 0;
            this._changeSLD(this.#currSLD);
        }
        if (allSlides[this.#currSLD].dataset.slide === allLines[this.#currSLD].dataset.line) {
            this._removeLines();
            allLines[this.#currSLD].classList.add(`btm-show`);
        }
    }
    _lineMain(e) {
        const target = e.target.closest(`p`).lastChild;
        if (!target)
            return;
        this._changeSLD(target.dataset.line);
        this.#currSLD = target.dataset.line;
        this._removeLines();
        allLines[target.dataset.line].classList.add(`btm-show`);
    }
}
const carouselApp = new Carousel();
