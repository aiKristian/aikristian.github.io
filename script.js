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
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => {
    observer.observe(section);
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
window.addEventListener('scroll', () => {
    let currentSectionId = '';
    contentSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});