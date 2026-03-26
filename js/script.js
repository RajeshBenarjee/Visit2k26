/* =============================================
   VISIT2k26 — Main Script
   Clean, performant, no dependencies
============================================= */

/* ── Custom Cursor ── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .event-bar, .dev-card, .section-header').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width  = '14px';
      dot.style.height = '14px';
      ring.style.width  = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'var(--gold)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width  = '8px';
      dot.style.height = '8px';
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--accent2)';
    });
  });
})();

/* ── Loader ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1800);
  }
});

/* ── Navbar scroll ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── Mobile hamburger ── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
})();

/* ── Background Particles ── */
(function initParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 18 : 35;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
      background: ${Math.random() > 0.5 ? 'var(--accent)' : 'var(--accent2)'};
      opacity: ${Math.random() * 0.5 + 0.2};
    `;
    container.appendChild(s);
  }
})();

/* ── Seniors fade-in on scroll ── */
(function initSeniorsObserver() {
  const sections = document.querySelectorAll('.senior-section');
  if (!sections.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => obs.observe(s));
})();

/* ── Simple AOS (scroll reveal) ── */
(function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-animate');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ── Accordion (Competitions page) ── */
(function initAccordion() {
  const sections = document.querySelectorAll('.event-section');
  if (!sections.length) return;
  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = section.classList.contains('active');
      // Close all
      sections.forEach(s => s.classList.remove('active'));
      // Toggle clicked
      if (!isActive) section.classList.add('active');
    });
  });
})();


