import "./css/style.scss";
import "./scripts/timeline.js";

import feather from "feather-icons";

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
});


const burgerButton = document.querySelector('.burger');


burgerButton.addEventListener('click', () => {

  const closeMenu = document.querySelector('.close-menu');
  const navMenu = document.querySelector('.page-navbar__menu');
  navMenu.classList.add('page-navbar__menu--active');

  closeMenu.addEventListener('click', () => navMenu.classList.remove('page-navbar__menu--active'))

});