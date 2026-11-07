// MBS Nova Studio — language switch, mobile menu, gallery, copy e-mail, scroll reveal.
(function () {
  var root = document.documentElement;

  function setLang(lang, save) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });
    if (save) { try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ } }
  }
  setLang(root.getAttribute('data-lang') || 'tr', false);
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang'), true); });
  });

  // Header: shadow on scroll + mobile menu
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  function closeMenu() { header.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () {
    var open = !header.classList.contains('open');
    header.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Screenshot gallery arrows
  document.querySelectorAll('[data-gallery]').forEach(function (nav) {
    var track = document.getElementById(nav.getAttribute('data-gallery'));
    nav.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: Number(b.getAttribute('data-dir')) * track.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  });

  // Copy e-mail address
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
        b.setAttribute('data-copied', 'true');
        setTimeout(function () { b.removeAttribute('data-copied'); }, 2000);
      });
    });
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
