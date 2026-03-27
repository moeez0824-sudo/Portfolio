const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const menuLinks = document.getElementById('menuLinks');
const navLinks = document.querySelectorAll('.menu-links a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const rotatingRole = document.getElementById('rotatingRole');
const year = document.getElementById('year');

const roles = [
  'Front-End Engineering',
  'AI Product Development',
  'Automation Workflows',
  'Clean UI Architecture',
];

let roleIndex = 0;

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle('scrolled', window.scrollY > 14);
};

const updateActiveSection = () => {
  const marker = window.scrollY + 130;
  let current = '';

  sections.forEach((section) => {
    if (marker >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const match = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', match);
  });
};

if (menuToggle && menuLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

if (rotatingRole) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    rotatingRole.textContent = roles[roleIndex];
  }, 2200);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
  updateHeaderState();
  updateActiveSection();
});

updateHeaderState();
updateActiveSection();