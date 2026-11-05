/* WeGolden Online Brochure — interactions */
(function () {
  'use strict';

  // Sticky header state
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const openMenu = () => mobileMenu.classList.add('open');
  const closeMenu = () => mobileMenu.classList.remove('open');
  if (burger) burger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Animated number counters for hero stats
  const animateCount = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
    if (!match) return;
    const prefix = match[1], numStr = match[2], suffix = match[3];
    const target = parseFloat(numStr.replace(/,/g, ''));
    if (isNaN(target)) return;
    const decimals = (numStr.split('.')[1] || '').length;
    const hasComma = numStr.includes(',');
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let val = target * eased;
      let out = decimals ? val.toFixed(decimals) : Math.round(val).toString();
      if (hasComma) out = Number(out).toLocaleString('en-US');
      el.textContent = prefix + out + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };

  const statNums = document.querySelectorAll('.hero-stats .num');
  if ('IntersectionObserver' in window && statNums.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    statNums.forEach(n => cio.observe(n));
  }

  // Active nav highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && navLinks.length) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => {
            l.style.color = l.getAttribute('href') === '#' + id ? 'var(--gold-3)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => sio.observe(s));
  }
})();
