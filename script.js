const body = document.body;

// --- FOCUS & PRINT BUTTONS ---
const focusBtn = document.getElementById('focus-mode');
if (focusBtn) {
  focusBtn.addEventListener('click', () => body.classList.toggle('focus-mode'));
}
const printBtn = document.getElementById('print-cv');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}
const focusBtnDesktop = document.getElementById('focus-mode-desktop');
if (focusBtnDesktop) {
  focusBtnDesktop.addEventListener('click', () => body.classList.toggle('focus-mode'));
}
const printBtnDesktop = document.getElementById('print-cv-desktop');
if (printBtnDesktop) {
  printBtnDesktop.addEventListener('click', () => window.print());
}

// --- THEME SWITCHER ---
const themeButtons = document.querySelectorAll('.theme-btn');
const THEME_KEY = 'selected_theme';

const activateTheme = (theme) => {
  body.classList.remove('theme-developer', 'theme-retro');
  if (theme !== 'light') {
    body.classList.add(`theme-${theme}`);
  }
  
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });

  localStorage.setItem(THEME_KEY, theme);
};

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    activateTheme(button.dataset.theme);
  });
});

// Load saved theme on page load
const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
activateTheme(savedTheme);

// --- VIEW SWITCHER (Múltiples Vistas) ---
const VIEW_KEY = 'selected_view';
const VIEWS = {
  technical: 'technical',
  management: 'management',
  complete: 'complete'
};

const VIEW_HINTS = {
  complete:
    'Orden estándar: todas las secciones visibles con equilibrio entre técnica y gestión.',
  technical:
    'Orden orientado a perfiles técnicos: proyectos y habilidades de stack al inicio.',
  management:
    'Orden orientado a liderazgo y producto: experiencia y certificaciones priorizadas.'
};

const updateViewHint = (view) => {
  const el = document.getElementById('view-mode-hint');
  if (el && VIEW_HINTS[view]) {
    el.textContent = VIEW_HINTS[view];
  }
};

const syncCertCategoriesVisibility = () => {
  const bar = document.getElementById('cert-filter-bar');
  if (!bar) return;
  const activeFilter = bar.dataset.activeFilter || 'all';
  document.querySelectorAll('#certifications-list .cert-category').forEach(cat => {
    const key = cat.dataset.category;
    if (!key) return;
    const filterOk = activeFilter === 'all' || activeFilter === key;
    const cards = cat.querySelectorAll('.cert-card');
    const visibleCount = Array.from(cards).filter(c => c.style.display !== 'none').length;
    cat.classList.toggle('cert-category--hidden', !filterOk || visibleCount === 0);
  });
};

const activateView = (view) => {
  const viewButtons = document.querySelectorAll('.view-btn');

  viewButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  updateViewHint(view);
  filterContentByView(view);

  localStorage.setItem(VIEW_KEY, view);

  body.classList.remove('view-technical', 'view-management', 'view-complete');
  body.classList.add(`view-${view}`);
};

const applyExperiencePaneViewFilter = (view) => {
  const experienceItems = document.querySelectorAll('#experience .tab-pane');
  experienceItems.forEach(item => {
    item.style.opacity = '';
    item.style.pointerEvents = '';
    const itemViews = item.getAttribute('data-view') || 'complete';
    const itemViewArray = itemViews.split(' ');
    const matches = view === VIEWS.complete || itemViewArray.includes(view);
    const isActive = item.classList.contains('active');
    item.classList.toggle('cv-pane-view-off', isActive && !matches);
  });
};

const filterContentByView = (view) => {
  // Filter sections - all sections are visible but content is filtered
  const sections = document.querySelectorAll('section[data-view]');
  sections.forEach(section => {
    section.style.display = '';
  });

  applyExperiencePaneViewFilter(view);

  // Filter skills sections
  const skillsSections = document.querySelectorAll('#skills [data-view]');
  skillsSections.forEach(section => {
    const sectionViews = section.getAttribute('data-view') || 'complete';
    const sectionViewArray = sectionViews.split(' ');
    
    if (view === VIEWS.complete || sectionViewArray.includes(view)) {
      section.style.display = '';
      section.style.opacity = '1';
    } else {
      section.style.display = 'none';
    }
  });

  // Filter certification cards
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    const cardViews = card.getAttribute('data-view') || 'complete';
    const cardViewArray = cardViews.split(' ');
    
    if (view === VIEWS.complete || cardViewArray.includes(view)) {
      card.style.display = '';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
  });

  reorderSectionsByView(view);
  syncCertCategoriesVisibility();
};

const reorderSectionsByView = (view) => {
  const main = document.querySelector('main');
  if (!main) return;

  const sectionOrder = {
    technical: ['profile', 'projects', 'skills', 'experience', 'education', 'certifications'],
    management: ['profile', 'experience', 'skills', 'certifications', 'projects', 'education'],
    complete: ['profile', 'experience', 'skills', 'projects', 'education', 'certifications']
  };

  const order = sectionOrder[view] || sectionOrder.complete;
  const sectionsArray = Array.from(main.querySelectorAll(':scope > section'));
  const hasOrdered = sectionsArray.some((s) => order.includes(s.getAttribute('id')));
  if (!hasOrdered) return;

  sectionsArray.sort((a, b) => {
    const aId = a.getAttribute('id');
    const bId = b.getAttribute('id');
    const aIndex = order.indexOf(aId);
    const bIndex = order.indexOf(bId);
    const rankA = aIndex === -1 ? 999 : aIndex;
    const rankB = bIndex === -1 ? 999 : bIndex;
    return rankA - rankB;
  });

  sectionsArray.forEach((section) => {
    main.appendChild(section);
  });
};

// Initialize view switcher
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    activateView(button.dataset.view);
  });
});

// Load saved view on page load
const savedView = localStorage.getItem(VIEW_KEY) || VIEWS.complete;
if (viewButtons.length > 0) {
  activateView(savedView);
}

// --- SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        const el = id && id.length > 1 ? document.querySelector(id) : null;
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- FADE-IN SECTIONS ON SCROLL ---
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// --- EXPERIENCE TABS ---
const activateExperienceTab = (targetSelector) => {
  const pane = targetSelector ? document.querySelector(targetSelector) : null;
  if (!pane || !pane.classList.contains('tab-pane')) return;

  document.querySelectorAll('.tab-button').forEach(btn => {
    const match = btn.getAttribute('data-target') === targetSelector;
    btn.classList.toggle('active', match);
    btn.setAttribute('aria-selected', match ? 'true' : 'false');
  });

  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');

  const currentView = localStorage.getItem(VIEW_KEY) || VIEWS.complete;
  applyExperiencePaneViewFilter(currentView);
};

const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    if (target) activateExperienceTab(target);
  });
});

// --- CERTIFICATION CATEGORY FILTER ---
const certFilterBar = document.getElementById('cert-filter-bar');
if (certFilterBar) {
  certFilterBar.querySelectorAll('.cert-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.certFilter || 'all';
      certFilterBar.dataset.activeFilter = f;
      certFilterBar.querySelectorAll('.cert-filter-btn').forEach(b => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      syncCertCategoriesVisibility();
    });
  });
}

// --- TOGGLE CERTIFICATIONS ---
const toggleCertsBtn = document.getElementById('toggle-certs');
const certsList = document.getElementById('certifications-list');
if (toggleCertsBtn && certsList) {
  toggleCertsBtn.addEventListener('click', () => {
    const isExpanded = certsList.classList.toggle('expanded');
    toggleCertsBtn.textContent = isExpanded ? 'Ver menos' : 'Ver más';
  });
}

// --- MODO LECTURA ---
const readingModeBtns = document.querySelectorAll(
  '#cv-reading-mode-mobile, #cv-reading-mode-desktop'
);
const syncReadingModeButtons = () => {
  const on = body.classList.contains('cv-reading-mode');
  readingModeBtns.forEach(b => b.setAttribute('aria-pressed', on ? 'true' : 'false'));
};
readingModeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    body.classList.toggle('cv-reading-mode');
    syncReadingModeButtons();
  });
});
syncReadingModeButtons();

// --- ACTIVE NAVIGATION LINK ON SCROLL ---
const navLinks = document.querySelectorAll('.sidebar nav a');
const contentSections = document.querySelectorAll('main section');

const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

contentSections.forEach(section => {
    navObserver.observe(section);
});

// --- VOLVER ARRIBA (CV) ---
const cvBackTop = document.getElementById('cv-back-top');
if (cvBackTop) {
  let cvBackTicking = false;
  const syncCvBackTop = () => {
    cvBackTop.classList.toggle('is-visible', window.scrollY > 400);
  };
  cvBackTop.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  window.addEventListener(
    'scroll',
    () => {
      if (cvBackTicking) return;
      cvBackTicking = true;
      requestAnimationFrame(() => {
        syncCvBackTop();
        cvBackTicking = false;
      });
    },
    { passive: true }
  );
  syncCvBackTop();
}
