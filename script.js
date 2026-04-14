/* ─── CURSOR ─── */
const dot = document.getElementById('c-dot'), ring = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
(function loop() { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); })();
document.querySelectorAll('a, button, .acc-head').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-gold'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-gold'));
});

/* ─── PROGRESS BAR ─── */
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('pbar').style.width = pct + '%';
});

/* ─── PARTICLES ─── */
const cv = document.getElementById('pcanvas'), c = cv.getContext('2d');
let W, H;
function rsz() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; } rsz();
window.addEventListener('resize', rsz);
const pts = Array.from({ length: 55 }, () => ({
    x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.2 + 0.3,
    col: Math.random() > 0.55 ? 'rgba(0,230,118,' : 'rgba(245,197,24,',
    a: Math.random() * 0.35 + 0.05
}));
(function anim() { c.clearRect(0, 0, W, H); pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; c.beginPath(); c.arc(p.x, p.y, p.r, 0, Math.PI * 2); c.fillStyle = p.col + p.a + ')'; c.fill(); }); requestAnimationFrame(anim); })();

/* ─── NAV ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', window.scrollY > 50));
const ham = document.getElementById('ham'), mob = document.getElementById('mobMenu');
if (ham) {
    ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
}
document.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));

/* ─── ACTIVE NAV ─── */
const secs = document.querySelectorAll('section[id]'), nls = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = ''; secs.forEach(s => { if (window.scrollY >= s.offsetTop - 180) cur = s.id; });
    nls.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
});

/* ─── TYPEWRITER ─── */
const phrases = ['Full Stack Developer.', 'Flask & Node.js Engineer.', 'Web Scraping Specialist.', 'Cricket Data Analyst.', 'B.Tech CSE & AI Student.'];
let pi = 0, ci = 0, dl = false; const twEl = document.getElementById('tw');
function type() {
    if (!twEl) return;
    const c = phrases[pi];
    if (!dl) { twEl.textContent = c.slice(0, ci + 1); ci++; if (ci === c.length) { dl = true; setTimeout(type, 2000); return; } }
    else { twEl.textContent = c.slice(0, ci - 1); ci--; if (ci === 0) { dl = false; pi = (pi + 1) % phrases.length; } }
    setTimeout(type, dl ? 48 : 82);
}
if (twEl) type();

/* ─── COUNTERS ─── */
function cnt(el, t, suf, dur) {
    let s = 0, step = t / 55;
    const id = setInterval(() => { s = Math.min(s + step, t); el.textContent = Math.floor(s) + (suf || ''); if (s >= t) clearInterval(id); }, dur / 55);
}
const counterObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        cnt(document.getElementById('hs1'), 2, '', 700);
        cnt(document.getElementById('hs2'), 10, '+', 700);
        cnt(document.getElementById('hs3'), 2024, '', 1100);
        counterObs.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });
if (document.querySelector('.hero-stats')) counterObs.observe(document.querySelector('.hero-stats'));

/* ─── REVEAL ─── */
const revealObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(r => revealObs.observe(r));

/* ─── SKILL BARS ─── */
const skillObs = new IntersectionObserver(es => {
    es.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.sk-fill').forEach(b => b.style.width = b.dataset.w + '%');
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.sg').forEach(g => skillObs.observe(g));


/* ─── PROJECT TABS ─── */
document.querySelectorAll('.psw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.psw-btn').forEach(b => b.classList.remove('on'));
        document.querySelectorAll('.pnl').forEach(p => p.classList.remove('on'));
        btn.classList.add('on');
        document.getElementById('pnl-' + btn.dataset.p).classList.add('on');
    });
});

/* ─── ACCORDION ─── */
document.querySelectorAll('.acc-head').forEach(h => {
    h.addEventListener('click', () => {
        const it = h.parentElement, wasOpen = it.classList.contains('open');
        h.closest('.accordion').querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) it.classList.add('open');
    });
});

/* ─── RESUME TABS ─── */
document.querySelectorAll('.cvnav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cvnav-btn').forEach(b => b.classList.remove('on'));
        document.querySelectorAll('.cv-panel').forEach(p => p.classList.remove('on'));
        btn.classList.add('on');
        document.getElementById('r-' + btn.dataset.r).classList.add('on');
    });
});

/* ─── CONTACT FORM ─── */
const contactForm = document.getElementById('cform');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const st = document.getElementById('fstat'), sb = this.querySelector('.csend');
        sb.textContent = 'Sending...'; sb.disabled = true;
        setTimeout(() => {
            st.textContent = '✓ Message sent! I\'ll reply shortly.'; st.className = 'fstat ok';
            sb.textContent = 'Send Message'; sb.disabled = false; this.reset();
            setTimeout(() => { st.textContent = ''; st.className = 'fstat'; }, 5000);
        }, 1200);
    });
}

/* ═══════════════════════════════════════════════════
   GOLDEN EMAIL CORE
═══════════════════════════════════════════════════ */
const goldEmail = document.getElementById('copyEmail');
const copyMsg = document.getElementById('copyMsg');

if (goldEmail) {
    goldEmail.addEventListener('click', () => {
        const email = goldEmail.dataset.email;
        navigator.clipboard.writeText(email).then(() => {
            goldEmail.classList.add('copied');
            setTimeout(() => {
                goldEmail.classList.remove('copied');
            }, 3000);
        });
    });
}
