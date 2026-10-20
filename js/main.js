/* ============================================================
   CleanCity Rank — Main JavaScript
   Project : Cleanliness Ranking Dashboard for Cities
   Team    : Shyamala, Blesson, Rohit  |  Parul University 2025-26
   ============================================================ */

// ── Preloader ─────────────────────────────────────────────────
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('hidden'), 700);
});

// ── DOMContentLoaded ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initHamburger();
  initCounters();
  initHeroCanvas();
  initActiveLinks();
  initSidebarLinks();
});

// ── AOS ───────────────────────────────────────────────────────
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 680, easing: 'ease-out-cubic', once: true, offset: 55 });
  }
}

// ── Sticky Navbar ─────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

// ── Hamburger (Mobile Menu) ───────────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      menu.classList.remove('open');
    });
  });

  // close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('active');
      menu.classList.remove('open');
    }
  });
}

// ── Counter Animations ────────────────────────────────────────
function initCounters() {
  const els = document.querySelectorAll('.count');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
}

function runCounter(el) {
  const target   = +el.dataset.target || 0;
  const duration = 1800;
  const step     = target / (duration / 16);
  let   val      = 0;
  const t = setInterval(() => {
    val += step;
    if (val >= target) { val = target; clearInterval(t); }
    el.textContent = Math.floor(val);
  }, 16);
}

// ── Hero Canvas — Particle Network ───────────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  class Dot {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.r  = Math.random() * 2 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.a  = Math.random() * 0.55 + 0.1;
      this.color = Math.random() > 0.5 ? '46,204,113' : '52,152,219';
    }
    move() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.init();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.a})`;
      ctx.fill();
    }
  }

  const connect = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(46,204,113,${0.05 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.move(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  };

  resize();
  particles = Array.from({ length: 80 }, () => new Dot());
  loop();
  window.addEventListener('resize', () => { resize(); particles.forEach(p => p.init()); });
}

// ── Active Nav Links (scroll spy) ────────────────────────────
function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${entry.target.id}`) l.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-30% 0px -65% 0px' });

  sections.forEach(s => io.observe(s));
}

// ── Dashboard Sidebar links ───────────────────────────────────
function initSidebarLinks() {
  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}
