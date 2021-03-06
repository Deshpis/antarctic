import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  const body = document.querySelector('.page__body');
  const navMain = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.main-nav__toggle');
  const navOverlay = document.querySelector('.main-nav__overlay');

  if (navMain) {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.remove('main-nav--nojs');
    navMain.classList.add('main-nav--closed');

    const disableScroll = () => {
      const pagePosition = window.scrollY;
      body.classList.add('page__body--disable-scroll');
      body.dataset.position = pagePosition;
      body.style.top = -pagePosition + 'px';
    };

    const enableScroll = () => {
      const pagePosition = parseInt(document.body.dataset.position, 10);
      body.style.top = 'auto';
      body.classList.remove('page__body--disable-scroll');
      window.scroll({top: pagePosition, left: 0});
      body.removeAttribute('data-position');
    };

    const openNav = () => {
      disableScroll();
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    };

    const closeNav = () => {
      enableScroll();
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    };

    navMain.addEventListener('click', (evt) => {
      if (evt.target.nodeName === 'A') {
        closeNav();
      }
    });

    navToggle.addEventListener('click', function () {
      if (navMain.classList.contains('main-nav--closed')) {
        openNav();
      } else {
        closeNav();
      }
    });

    navOverlay.addEventListener('click', function () {
      closeNav();
    });
  }

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
