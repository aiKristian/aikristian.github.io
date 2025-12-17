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

const activateView = (view) => {
  const viewButtons = document.querySelectorAll('.view-btn');
  
  // Remove active class from all view buttons
  viewButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  // Filter content within sections
  filterContentByView(view);

  // Save preference
  localStorage.setItem(VIEW_KEY, view);
  
  // Update body class for styling
  body.classList.remove('view-technical', 'view-management', 'view-complete');
  body.classList.add(`view-${view}`);
};

const filterContentByView = (view) => {
  // Filter sections - all sections are visible but content is filtered
  const sections = document.querySelectorAll('section[data-view]');
  sections.forEach(section => {
    section.style.display = '';
  });

  // Filter experience items
  const experienceItems = document.querySelectorAll('#experience .tab-pane');
  experienceItems.forEach(item => {
    const itemViews = item.getAttribute('data-view') || 'complete';
    const itemViewArray = itemViews.split(' ');
    
    if (view === VIEWS.complete || itemViewArray.includes(view)) {
      item.style.opacity = '1';
      item.style.pointerEvents = 'auto';
    } else {
      item.style.opacity = '0.2';
      item.style.pointerEvents = 'none';
    }
  });

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

  // Reorder sections based on view priority
  reorderSectionsByView(view);
};

const reorderSectionsByView = (view) => {
  const main = document.querySelector('main');
  const sectionOrder = {
    technical: ['profile', 'projects', 'skills', 'experience', 'education', 'certifications'],
    management: ['profile', 'experience', 'skills', 'certifications', 'projects', 'education'],
    complete: ['profile', 'experience', 'skills', 'projects', 'education', 'certifications']
  };

  const order = sectionOrder[view] || sectionOrder.complete;
  const sectionsArray = Array.from(document.querySelectorAll('main > section'));
  
  sectionsArray.sort((a, b) => {
    const aId = a.getAttribute('id');
    const bId = b.getAttribute('id');
    const aIndex = order.indexOf(aId);
    const bIndex = order.indexOf(bId);
    return aIndex - bIndex;
  });

  sectionsArray.forEach(section => {
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
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        button.classList.add('active');
        const target = button.getAttribute('data-target');
        document.querySelector(target).classList.add('active');
    });
});

// --- TOGGLE CERTIFICATIONS ---
const toggleCertsBtn = document.getElementById('toggle-certs');
const certsList = document.getElementById('certifications-list');
if (toggleCertsBtn && certsList) {
  toggleCertsBtn.addEventListener('click', () => {
    const isExpanded = certsList.classList.toggle('expanded');
    toggleCertsBtn.textContent = isExpanded ? 'Ver menos' : 'Ver más';
  });
}

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
