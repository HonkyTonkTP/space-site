async function displayDestinationsData(planet = 0) {
  /*const { destinations } = await fetch('data.json').then((response) =>
    response.json()
  );*/

  const { destinations } = await fetch(
    'https://honkytonktp.github.io/space-site/data.json'
  ).then((response) => response.json());

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

async function displayCrewData(member = 0) {
  // const { crew } = await fetch('data.json').then((response) => response.json());

  const { crew } = await fetch(
    'https://honkytonktp.github.io/space-site/data.json'
  ).then((response) => response.json());

  displayCrewDataToDOM(crew, member);
}

function displayCrewDataToDOM(data, member) {
  console.log('data: ');
  console.log(data);

  const dotList = document.getElementById('dot-list');
  dotList.innerHTML = '';

  data.forEach((item, index) => {
    const btn = document.createElement('button');
    if (index === member) {
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.setAttribute('aria-selected', 'false');
    }

    const span = document.createElement('span');
    span.classList.add('sr-only');
    span.innerHTML = item.role;
    btn.appendChild(span);

    dotList.appendChild(btn);
  });

  const memberImage = document.getElementById('member-image');
  memberImage.setAttribute('src', data[member].images.png);
  memberImage.setAttribute('alt', data[member].name);

  const memberRole = document.getElementById('member-role');
  memberRole.innerText = data[member].role;

  const memberName = document.getElementById('member-name');
  memberName.innerText = data[member].name;

  const memberBio = document.getElementById('member-bio');
  memberBio.innerText = data[member].bio;
}

async function displayTechnologyData(tech = 0) {
  // const { technology } = await fetch('data.json').then((response) =>
  //   response.json()
  // );

  const { technology } = await fetch(
    'https://honkytonktp.github.io/space-site/data.json'
  ).then((response) => response.json());

  displayTechnologyDataToDOM(technology, tech);
}

function displayTechnologyDataToDOM(data, tech) {
  const numList = document.getElementById('num-list');
  numList.innerHTML = '';

  if (window.innerWidth <= 768) {
    const image = document.getElementById('tech-image');
    image.setAttribute('src', data[tech].images.landscape);
    image.setAttribute('alt', data[tech].name);
  } else {
    const image = document.getElementById('tech-image');
    image.setAttribute('src', data[tech].images.portrait);
    image.setAttribute('alt', data[tech].name);
  }

  data.forEach((item, index) => {
    const btn = document.createElement('button');
    if (index === tech) {
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.setAttribute('aria-selected', 'false');
    }

    btn.innerText = index + 1;
    btn.classList.add('ff-serif', 'fs-600', 'text-white');

    numList.appendChild(btn);
  });

  const techName = document.getElementById('tech-name');
  techName.innerText = data[tech].name;

  const techDesc = document.getElementById('tech-description');
  techDesc.innerText = data[tech].description;
}

function updateDOMAndDisplayData(e, cb) {
  if (e.target.getAttribute('aria-selected') === 'false') {
    const children = Array.from(e.currentTarget.children);
    children.forEach((item, index) => {
      item.setAttribute('aria-selected', 'false');
      if (e.target === item) {
        item.setAttribute('aria-selected', 'true');
        cb(index);
      }
    });
  }
}

function getTabData(e) {
  e.preventDefault();

  switch (window.location.pathname) {
    case '/destination.html':
      updateDOMAndDisplayData(e, displayDestinationsData);
      break;
    case '/crew.html':
      updateDOMAndDisplayData(e, displayCrewData);
      break;
    case '/technology.html':
      updateDOMAndDisplayData(e, displayTechnologyData);
      break;
    case '/index.html':
    default:
  }
}

document.addEventListener('DOMContentLoaded', () => {
  switch (window.location.pathname) {
    case '/destination.html':
      displayDestinationsData();
      document.getElementById('tab-list').addEventListener('click', getTabData);
      break;
    case '/crew.html':
      displayCrewData();
      document.getElementById('dot-list').addEventListener('click', getTabData);
      break;
    case '/technology.html':
      displayTechnologyData();
      document.getElementById('num-list').addEventListener('click', getTabData);
      break;
    case '/index.html':
    default:
  }
});

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
