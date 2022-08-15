'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const h1 = document.querySelector('h1');

// General Way

const h1Alert = function (e) {
  alert(`You are reading the heading!`);
};

h1.addEventListener('mouseenter', h1Alert);
// REmoving an event listerner
setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 3000);
// ---------------------------------------------------------/
// CAlling the property directly on the varibale

// h1.onmouseenter = function(e){
//   alert(`You are reading the header!`)
// }
// ------------------------------------------------


//Scrolling to the sections

document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior : 'smooth'
    })
  })
})