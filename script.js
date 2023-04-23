// Mobile Navbar Opening/Closing
document.getElementById('mobile-nav').addEventListener('click', () => {
  const navbar = document.getElementById('nav-bar');
  navbar.classList.toggle('hidden');

  const hamburger = document.getElementById('hamburger-icon');
  if (hamburger.getAttribute('src') === './assets/shared/icon-hamburger.svg') {
    hamburger.setAttribute('src', './assets/shared/icon-close.svg');
    document.getElementById('mobile-nav').setAttribute('aria-expanded', 'true');
  } else {
    hamburger.setAttribute('src', './assets/shared/icon-hamburger.svg');
    document
      .getElementById('mobile-nav')
      .setAttribute('aria-expanded', 'false');
  }
});
