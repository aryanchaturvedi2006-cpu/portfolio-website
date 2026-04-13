/* script.js — GSAP Animations + Interactions */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HAMBURGER MENU ── */
  const hamburger   = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
  });

  // Close drawer when any mobile link is clicked
  document.querySelectorAll('.mobile-link, .mobile-hire').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
    });
  });

  /* ── GSAP SETUP ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── CUSTOM CURSOR ── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05 });
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── HERO ENTRANCE ── */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#heroBadge',   { opacity: 1, y: 0, duration: 0.7, delay: 0.2 })
    .to('.name-line',   { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.3')
    .to('#heroRole',    { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('#heroBio',     { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('#heroActions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('#heroStats',   { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('#scrollIndicator', { opacity: 1, duration: 0.5 }, '-=0.2');

  /* ── SCROLL REVEAL (all .reveal elements) ── */
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: (i % 3) * 0.1,
    });
  });

  /* ── SKILL BARS (animate on scroll) ── */
  document.querySelectorAll('.skill-fill').forEach((bar) => {
    const target = bar.getAttribute('data-width');
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(bar, {
          width: target + '%',
          duration: 1.4,
          ease: 'power2.out',
        });
      },
    });
  });

  /* ── STAGGERED CASE STUDY ENTRANCE ── */
  gsap.utils.toArray('.case-study').forEach((card) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' }
      }
    );
  });

  /* ── INFO CARDS STAGGER ── */
  gsap.utils.toArray('.info-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 90%' }
      }
    );
  });

  /* ── STAT COUNTER ANIMATION ── */
  gsap.utils.toArray('.stat-num').forEach((el) => {
    const end = parseInt(el.textContent.replace(/\D/g, ''));
    const suffix = el.textContent.replace(/[0-9]/g, '');
    if (!isNaN(end) && end > 0) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: end }, {
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          });
        },
      });
    }
  });

  /* ── CONTACT FORM ── */
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Message sent successfully. I will respond shortly.';
      status.style.color = '#10b981';
      form.reset();
      setTimeout(() => { status.textContent = ''; }, 5000);
    });
  }

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach((a) => {
      a.style.color = a.getAttribute('href') === '#' + current ? '#10b981' : '';
    });
  });

});
