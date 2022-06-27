'use strict';

const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.landingpage');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
})