async function displayDestinationsData(planet = 0) {
  const { destinations } = await fetch('data.json').then((response) =>
    response.json()
  );

  displayDestinationDataToDOM(destinations, planet);
}

function displayDestinationDataToDOM(data, planet) {
  const tabList = document.getElementById('tab-list');
  tabList.innerHTML = '';

  data.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.classList.add(
      'ff-sans-cond',
      'fs-300',
      'letter-spacing-2',
      'text-light',
      'uppercase'
    );
    if (index === planet) {
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.setAttribute('aria-selected', 'false');
    }
    btn.innerHTML = item.name;
    tabList.appendChild(btn);
  });

  const destinationImage = document.getElementById('destination-image');
  destinationImage.setAttribute('src', data[planet].images.png);
  destinationImage.setAttribute('alt', data[planet].name);

  const destinationName = document.getElementById('planet-name');
  destinationName.innerText = data[planet].name;

  const destinationText = document.getElementById('planet-text');
  destinationText.innerText = data[planet].description;

  const distance = document.getElementById('average-distance');
  distance.innerText = data[planet].distance;

  const travelTime = document.getElementById('travel-time');
  travelTime.innerText = data[planet].travel;
}

async function displayCrewData() {
  const { crew } = await fetch('data.json').then((response) => response.json());
}

async function displayTechnologyData() {
  const { technology } = await fetch('data.json').then((response) =>
    response.json()
  );
}

document.getElementById('tab-list').addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.getAttribute('aria-selected') === 'false') {
    const children = Array.from(e.currentTarget.children);
    children.forEach((item, index) => {
      item.setAttribute('aria-selected', 'false');
      if (e.target === item) {
        item.setAttribute('aria-selected', 'true');
        displayDestinationsData(index);
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // TODO: Simple routing
  displayDestinationsData(0);
});

// Mobile Navbar Opening/Closing
document.getElementById('mobile-nav').addEventListener('click', () => {
  const navbar = document.getElementById('nav-bar');
  navbar.classList.toggle('hidden');
  console.log('clicked');
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
