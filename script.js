const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const body = document.body;

// Palette handling
const paletteIcons = [
  document.getElementById('palette-1'),
  document.getElementById('palette-2'),
];

function setPalette(palette) {
  body.classList.remove('palette-1', 'palette-2');
  body.classList.add('palette-' + palette);
  paletteIcons.forEach((icon, idx) => {
    if (idx === palette - 1) {
      icon.classList.add('selected');
    } else {
      icon.classList.remove('selected');
    }
  });
  localStorage.setItem('palette', palette);
}

paletteIcons.forEach((icon, idx) => {
  icon.addEventListener('click', () => setPalette(idx + 1));
});

const savedPalette = localStorage.getItem('palette') || '1';
setPalette(Number(savedPalette));

// Theme toggle
themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  if (icon) {
    if (html.classList.contains('dark')) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }
});

const icon = themeToggle.querySelector('i');
if (icon && html.classList.contains('dark')) {
  icon.classList.remove('fa-sun');
  icon.classList.add('fa-moon');
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});

// Tabs for experience section
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Deactivate all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Activate clicked tab
        button.classList.add('active');
        const target = button.getAttribute('data-target');
        document.querySelector(target).classList.add('active');
    });
});

// Print / Download CV
const printBtn = document.getElementById('print-cv');
if (printBtn) {
  printBtn.addEventListener('click', () => {
    window.print();
  });
}

// Focus mode toggle
const focusBtn = document.getElementById('focus-mode');
if (focusBtn) {
  focusBtn.addEventListener('click', () => {
    body.classList.toggle('focus-mode');
  });
}