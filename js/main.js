const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = `${mx}px`;
  cursor.style.top = `${my}px`;
});

function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;
  requestAnimationFrame(animateRing);
}

animateRing();

document.querySelectorAll('a, button, .gallery-item, .package-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.opacity = '1';
    cursor.style.opacity = '0';
  });

  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.opacity = '0.6';
    cursor.style.opacity = '1';
  });
});

const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
let activeHeroSlide = 0;

if (heroSlides.length > 1) {
  window.setInterval(() => {
    heroSlides[activeHeroSlide].classList.remove('is-active');
    activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
    heroSlides[activeHeroSlide].classList.add('is-active');
  }, 5000);
}

const filmViewer = document.getElementById('filmViewer');
const filmPoster = document.getElementById('filmPoster');
const filmPlayButton = document.getElementById('filmPlayButton');
const filmTitle = document.getElementById('filmTitle');
const filmCopy = document.getElementById('filmCopy');
const filmOptions = Array.from(document.querySelectorAll('.film-option'));

function loadSelectedFilm() {
  const activeOption = filmOptions.find(item => item.classList.contains('is-active'));

  if (!activeOption || !filmViewer || !filmPoster) {
    return;
  }

  filmViewer.src = `${activeOption.dataset.videoSrc}?autoplay=1`;
  filmViewer.classList.add('is-active');
  filmPoster.classList.remove('is-visible');
}

filmOptions.forEach(option => {
  option.addEventListener('click', () => {
    filmOptions.forEach(item => item.classList.remove('is-active'));
    option.classList.add('is-active');

    if (filmViewer) {
      filmViewer.src = '';
      filmViewer.classList.remove('is-active');
    }

    if (filmPoster) {
      filmPoster.style.backgroundImage = `url('${option.dataset.thumbnailSrc || ''}')`;
      filmPoster.classList.add('is-visible');
    }

    if (filmTitle) {
      filmTitle.textContent = option.dataset.filmTitle || 'Featured Film';
    }

    if (filmCopy) {
      filmCopy.textContent = option.dataset.filmCopy || '';
    }
  });
});

if (filmPlayButton) {
  filmPlayButton.addEventListener('click', loadSelectedFilm);
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileNavClose');

hamburger.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});

mobileClose.addEventListener('click', closeMobileNav);
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileNav));

function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

function expandReel(card, embedUrl) {
  card.innerHTML = `<iframe class="reel-embed" src="${embedUrl}" allowfullscreen scrolling="no" allow="encrypted-media; autoplay; clipboard-write"></iframe>`;
  card.classList.add('expanded');
  card.onclick = null;
}

function bookPackage(name, price, description) {
  const msg = `Hi! I love the *${name} Package* (${price} - ${description}) and would love to book a session. Can you tell me more?`;
  window.open(`https://wa.me/254705164438?text=${encodeURIComponent(msg)}`, '_blank');
}

function sendToWhatsApp() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pkg = document.getElementById('package').value;
  const type = document.getElementById('shoot-type').value;
  const date = document.getElementById('date').value;
  const msg = document.getElementById('message').value.trim();

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  const lines = [
    '*New Booking Enquiry - The Apples Photography*',
    '',
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    pkg ? `*Package:* ${pkg}` : null,
    type ? `*Shoot Type:* ${type}` : null,
    date ? `*Preferred Date:* ${new Date(date).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : null,
    msg ? `*Details:* ${msg}` : null,
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/254705164438?text=${encodeURIComponent(lines)}`, '_blank');
}
