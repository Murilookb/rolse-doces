(() => {
  document.documentElement.classList.add('js');

  // Hero: anima apenas na primeira abertura.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelector('.hero')?.classList.add('hero-ready');
  }));

  // Elementos que entram suavemente conforme aparecem na tela.
  const revealGroups = [
    ['.showcase-intro > div', 'reveal reveal-left', 0],
    ['.showcase-lede', 'reveal reveal-right', 1],
    ['.category-card', 'reveal', null],
    ['.menus-whatsapp-bridge', 'reveal', 0],
    ['.menus-heading', 'reveal', 0],
    ['.menu-card', 'reveal', null],
    ['.about-rolse-photo', 'reveal reveal-left', 0],
    ['.about-rolse-copy', 'reveal reveal-right', 1],
    ['.about-instagram-shot', 'reveal', 2],
    ['.order-copy', 'reveal reveal-left', 0],
    ['.order-map', 'reveal reveal-right', 1],
    ['.site-footer .footer-inner', 'reveal', 0]
  ];

  revealGroups.forEach(([selector, classes, fixedDelay]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      classes.split(' ').forEach(c => el.classList.add(c));
      const delay = fixedDelay ?? Math.min(i, 4);
      if (delay) el.dataset.delay = String(delay);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Navegação interna com scroll controlado e suave.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // "Instagram" no menu agora desliza até a apresentação da Rolse;
  // o clique no print/botão continua abrindo o Instagram real.
  document.querySelector('[data-instagram-nav]')?.addEventListener('click', () => {
    window.setTimeout(() => {
      const shot = document.querySelector('.about-instagram-shot');
      if (!shot) return;
      shot.classList.remove('nav-focus');
      void shot.offsetWidth;
      shot.classList.add('nav-focus');
    }, 650);
  });
})();
