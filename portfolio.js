(function () {
  'use strict';

  var ANALYTICS_DOMAIN = document.documentElement.dataset.analytics || '';

  if (ANALYTICS_DOMAIN) {
    var s = document.createElement('script');
    s.defer = true;
    s.dataset.domain = ANALYTICS_DOMAIN;
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }

  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  function setNavOpen(open) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!expanded);
    });

    navMenu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
          setNavOpen(false);
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNavOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setNavOpen(false);
      }
    });
  }

  var wrap = document.querySelector('.stitch-nav-section');
  if (wrap) {
    var links = wrap.querySelectorAll('a[href^="#"]');
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (id) {
        var el = document.getElementById(id);
        if (el) sections.push({ id: id, link: a });
      }
    });

    function setActive() {
      var y = window.scrollY + 120;
      var current = sections[0];
      sections.forEach(function (s) {
        var el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s;
      });
      links.forEach(function (a) {
        a.classList.remove('text-indigo-200', 'font-semibold', 'stitch-nav-link--active');
        a.classList.add('text-slate-400');
      });
      if (current && current.link) {
        current.link.classList.remove('text-slate-400');
        current.link.classList.add('text-indigo-200', 'font-semibold', 'stitch-nav-link--active');
      }
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  var bar = document.getElementById('stitch-scroll-progress');
  var track = document.querySelector('.stitch-scroll-track');
  var backTop = document.getElementById('stitch-back-top');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateScrollBar() {
    if (!bar || reduceMotion) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    bar.style.transform = 'scaleX(' + p + ')';
  }

  function updateBackTop() {
    if (!backTop) return;
    backTop.classList.toggle('is-visible', window.scrollY > 400);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateScrollBar();
      updateBackTop();
      ticking = false;
    });
  }

  if (reduceMotion && track) {
    track.style.display = 'none';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollBar();
  updateBackTop();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  var nodes = document.querySelectorAll('.motion-reveal');
  if (nodes.length) {
    if (reduceMotion) {
      nodes.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              obs.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -5% 0px', threshold: 0.06 }
      );
      nodes.forEach(function (el) {
        obs.observe(el);
      });
    }
  }
})();
