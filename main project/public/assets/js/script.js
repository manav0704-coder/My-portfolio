'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

//add to cart

document.getElementById('addToCartBtn').addEventListener('click', function() {
    const photoUrl = document.getElementById('productPhoto').src;
    const price = document.getElementById('productPrice').textContent;

    // Send product information to server
    fetch('/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ photoUrl, price })
    })
    .then(response => response.text())
    .then(message => {
        console.log(message); // Log success message from server
        // Optionally, display a success message to the user
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally, display an error message to the user
    });
});



// document.addEventListener('DOMContentLoaded', function() {
//   const params = new URLSearchParams(window.location.search);
//   const loggedIn = params.get('login');

//   if (loggedIn === 'true') {
//       // If user is logged in, change the icon to an image
//       const iconButton = document.getElementById('icon');
//       iconButton.innerHTML = '<img src="assets/images/ceo.jpg" alt="Logged In">';
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const params = new URLSearchParams(window.location.search);
//   const loggedIn = params.get('login');

//   if (loggedIn === 'true') {
//       // If user is logged in, show the icon
//       const iconButton = document.getElementById('icon');
//       iconButton.classList.remove('hidden');
//   }
// });
