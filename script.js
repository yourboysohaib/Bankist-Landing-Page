'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// creating button by DOM manipulations.
// Selecting particular element and class via DOM
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics of the site. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

//Removing the button when clicked

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Working with CSS styles.

message.style.backgroundColor = '#37383d';
message.style.width = '100%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// Attributes
// add, remove, contains, toggle

//SCrolling to the  next secion
//1st Way

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // -------------------------------------------------------------------
  // Smooth Scrolling

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior : 'smooth'
  // });

  // ---------------------------------------------------------------
  // Method works with modern browser
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Event Listerner

// const h1 = document.querySelector('h1');

// General Way

// const h1Alert = function (e) {
//   alert(`You are reading the heading!`);
// };

// h1.addEventListener('mouseenter', h1Alert);
// REmoving an event listerner
// setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 3000);
// ---------------------------------------------------------/
// CAlling the property directly on the varibale

// h1.onmouseenter = function(e){
//   alert(`You are reading the header!`)
// }
// ------------------------------------------------

//Scrolling to the sections

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

//Tabs Container
// DEfiing active and hide classes to the content for tabs switch
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tabs--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tabs--active');

  // ACtivating content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//----------------------------------------------------------------------------------
// Sticky Navigation.
//header already declared uptown @ line 34

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

// Adding the class of sticky in the element
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entries.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// Using the IntersectionObserver() function
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//---------------------------------------------------------------------------------
// Revealing Section while scrolling

// AChieve the effect by adding classes in the CSS using intersection Observer API

// const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //Removing the class from the tag with target method.
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
// the below code as some error i wasn't able to find at that time??!!!!!!!
// const imgTargets = document.querySelectorAll('img [data-src]');
// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   // Replacing src with the data imag

//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     // Removin the blurry filter once the load function is done loading the right image 
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target)
// };
// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px'
// });

// imgTargets.forEach(img => imgObserver.observe(img));


// -----------------------------------------------------------
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
// --------------------------------------------------------------