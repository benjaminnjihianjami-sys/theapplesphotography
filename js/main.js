// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .gallery-item, .package-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px'; ring.style.height = '56px';
    ring.style.opacity = '1'; cursor.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px'; ring.style.height = '36px';
    ring.style.opacity = '0.6'; cursor.style.opacity = '1';
  });
});

// ── Nav scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Nav ──
const hamburger  = document.getElementById('navHamburger');
const mobileNav  = document.getElementById('mobileNav');
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

// ── Reveal on scroll ──
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Package → WhatsApp ──
function bookPackage(name, price, description) {
  const msg = `Hi! 👋 I love the *${name} Package* (${price} – ${description}) and would love to book a session. Can you tell me more?`;
  window.open('https://wa.me/254705164438?text=' + encodeURIComponent(msg), '_blank');
}

// ── Booking Form → WhatsApp ──
function sendToWhatsApp() {
  const name  = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pkg   = document.getElementById('package').value;
  const type  = document.getElementById('shoot-type').value;
  const date  = document.getElementById('date').value;
  const msg   = document.getElementById('message').value.trim();

  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const lines = [
    '👋 *New Booking Enquiry — The Apples Photography*',
    '',
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    pkg  ? `*Package:* ${pkg}` : null,
    type ? `*Shoot Type:* ${type}` : null,
    date ? `*Preferred Date:* ${new Date(date).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : null,
    msg  ? `*Details:* ${msg}` : null,
  ].filter(Boolean).join('\n');

  window.open('https://wa.me/254705164438?text=' + encodeURIComponent(lines), '_blank');
}
