/* =====================================================
   HJ WEDDING PLANNER — APP JAVASCRIPT
   ===================================================== */

(function () {
  'use strict';

  /* ---- Loader ---- */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 900);
  });

  /* ---- Scroll Progress ---- */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  /* ---- Navbar ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Team Toggle ---- */
  /* ---- Team card 3D tilt effect ---- */
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'translateY(-10px) rotateX(' + (-y*6) + 'deg) rotateY(' + (x*6) + 'deg)';
      card.style.transition = 'box-shadow 0.1s, border-color 0.4s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });

  /* ---- Hero Leaf Canvas ---- */
  initLeafCanvas();
  initCtaCanvas();

  function initLeafCanvas() {
    const canvas = document.getElementById('leaf-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const PARTICLE_COUNT = 28;

    class Particle {
      constructor() { this.reset(true); }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -20;
        this.size = Math.random() * 14 + 6;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.opacity = Math.random() * 0.35 + 0.08;
        this.type = Math.floor(Math.random() * 3);
        this.color = this.type === 0
          ? `rgba(${74 + Math.random()*40},${124 + Math.random()*30},${89 + Math.random()*20},`
          : this.type === 1
          ? `rgba(${184 + Math.random()*20},${150 + Math.random()*20},${90 + Math.random()*20},`
          : `rgba(${106 + Math.random()*30},${158 + Math.random()*20},${114},`;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 30) this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === 2) {
          // Small dot
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = this.color + '1)';
          ctx.fill();
        } else {
          // Leaf shape
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 0.5);
          ctx.bezierCurveTo(
            this.size * 0.6, -this.size * 0.2,
            this.size * 0.6, this.size * 0.3,
            0, this.size * 0.5
          );
          ctx.bezierCurveTo(
            -this.size * 0.6, this.size * 0.3,
            -this.size * 0.6, -this.size * 0.2,
            0, -this.size * 0.5
          );
          ctx.fillStyle = this.color + '0.9)';
          ctx.fill();

          // Vein
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 0.4);
          ctx.lineTo(0, this.size * 0.4);
          ctx.strokeStyle = this.color + '0.4)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  function initCtaCanvas() {
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.0003 + 0.0001,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      stars.forEach(star => {
        star.pulse += star.speed * 60;
        const opacity = star.opacity * (0.7 + 0.3 * Math.sin(star.pulse));
        ctx.beginPath();
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,110,${opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ---- Smooth Scroll for nav links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Parallax on Hero Orbs ---- */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.hero-orb');
    orbs.forEach((orb, i) => {
      const speed = 0.05 + i * 0.03;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ---- Number Counter Animation ---- */
  function animateCounter(el) {
    const target = el.innerText;
    const isPercent = target.includes('%');
    const hasPlus = target.includes('+');
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * num);
      el.innerText = current + (isPercent ? '%' : '') + (hasPlus ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
      else el.innerText = target;
    }
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statsObserver.observe(statsEl);

  /* ---- Section transition gradient lines ---- */
  // Add subtle decorative lines between sections via CSS injection
  const style = document.createElement('style');
  style.textContent = `
    #features::before, #how-it-works::before, #highlights::before, #trust::before {
      content: '';
      display: block;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(184,150,90,0.2) 30%, rgba(106,158,114,0.15) 70%, transparent);
      margin-bottom: 0;
    }
  `;
  document.head.appendChild(style);

})();
