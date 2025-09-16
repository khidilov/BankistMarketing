'use strict';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const s1Coordinates = section1.getBoundingClientRect();
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const message = document.createElement('div');
const tabs = document.querySelectorAll('.operations__tab');
const tabParent = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Sildim, çünki bunun yerinə foreach istifadə etdim.

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';

header.append(message);

// Cookie bildirişinin silinməsi

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Cookie mesajının stilizasiyası
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
const messageHeight = getComputedStyle(message).height;
message.style.height = Number.parseFloat(messageHeight) + 30 + 'px';

// Scroll

btnScroll.addEventListener('click', e => {
  e.preventDefault();

  section1.scrollIntoView({ behavior: 'smooth' });

  // Köhnə üsuldur, həm də burda koordinatları bir-bir hesablamaq lazımdır. Bu arada Jonas öz dərsində bu koordinatlarla yanaşı cari scroll vəziyyətini də key-lərə əlavə edirdi məs.: top: s1Coordinates.top + window.scrollY amma məndə bu düz işləmir, niyə? Sualın cavabını tapdım. Sən demə, koordinatları event listener-dən çöldə təyin etdikdə cari scroll-u əlavə etməyə ehtiyac qalmır, niyə?

  /*
  window.scrollTo({
    left: s1Coordinates.left + window.scrollX,
    top: s1Coordinates.top + window.scrollY,
    behavior: 'smooth',
  });
  */
});

// Page Navigation

// Bu üsulu istifadə etsəm də, düzgün deyil, çünki hər bir link üçün ayrıca event listener yaranmış olur, daha müasir üsul: Event delegation-dur
/*
document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target.getAttribute('href'));
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
*/

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

// A tabbed component

tabParent.addEventListener('click', t => {
  const clicked = t.target.closest('.operations__tab');

  if (!clicked) return;
  // Klik olunmayan məzmunların silinməsi
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContents.forEach(c => c.classList.remove('operations__content--active'));

  // Klik edilən məzmunun görünməsi

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Implementing navbar fade-in fade-out

// Jonas's solution

const opacityHandler = function (e, op) {
  if (e.target.classList.contains('nav__link')) {
    let link = e.target;
    const logo = document.querySelector('.nav__logo');
    let navlinks = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(navlinks);
    navlinks.forEach(e => {
      if (e !== link) {
        e.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', opacityHandler.bind(0.5));
nav.addEventListener('mouseout', opacityHandler.bind(1));

// Alternative solution

// const handleHover = function (o) {
//   return function (e) {
//     if (e.target.classList.contains('nav__link')) {
//       let link = e.target;
//       const logo = document.querySelector('.nav__logo');
//       let navlinks = link.closest('.nav').querySelectorAll('.nav__link');

//       navlinks.forEach(e => {
//         if (e !== link) {
//           e.style.opacity = o;
//         }
//         logo.style.opacity = o;
//       });
//     }
//   };
// };
// nav.addEventListener('mouseover', handleHover(0.5));
// nav.addEventListener('mouseout', handleHover(1));

/*
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
// Root-dakı rəngin dəyişdirilməsi
document.documentElement.style.setProperty('--color-primary', 'pink');

// Elementin atributlarına müdaxilə
const logo = document.querySelector('.nav__logo');
logo.setAttribute('alt', 'Beatuful minimalistic logo of Bankist company');

// Eventin propoqandası, bubbling, capturing
/*
const ranNum = (min, max) => Math.floor(Math.random() * max - min + 1 + min);
const ranCl = () =>
  `rgb(${ranNum(0, 255)},${ranNum(0, 255)},${ranNum(0, 255)}) `;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = ranCl();
});
*/

// DOM traversing
/*
const h1 = document.querySelector('h1');
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.parentElement);
console.log(h1.parentNode);
console.log(h1.nextElementSibling);
console.log(h1.previousElementSibling);

h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'green';
*/
