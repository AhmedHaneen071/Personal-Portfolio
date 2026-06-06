// Theme
const rootEl = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

// Initialize theme from storage
if (localStorage.getItem('theme') === 'light') rootEl.classList.add('light');

// Defensive listener attachment
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        rootEl.classList.toggle('light');
        localStorage.setItem('theme', rootEl.classList.contains('light') ? 'light' : 'dark');
    });
}

// Sticky nav
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
}

// Mobile menu
function toggleMenu() {
    const menu = document.getElementById('menuList');
    if (menu) menu.classList.toggle('open');
}

// Close mobile menu on link click
document.querySelectorAll('#menuList a').forEach((link) => {
    link.addEventListener('click', () => {
        document.getElementById('menuList').classList.remove('open');
    });
});

// Scroll reveal
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.portfolio-card, .repo-card, .about-img, .about-text').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
    // Elements (may not exist in this markup — guard defensively)
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-icon');
    const menuClose = document.getElementById('menu-close');

    // Theme: ensure only one consistent approach (root .light class)
    const themeToggle = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') document.documentElement.classList.add('light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('light');
            const isLight = document.documentElement.classList.contains('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Mobile menu logic with fallbacks
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                // Fallback to existing desktop/mobile list toggle
                toggleMenu();
            }
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close menu links (works for both mobileMenu and #menuList fallback)
    document.querySelectorAll('.mob-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                document.getElementById('menuList')?.classList.remove('open');
            }
        });
    });

    // Scroll reveal observer (separate instance to avoid name collisions)
    const scrollObserverOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, scrollObserverOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
        scrollObserver.observe(el);
    });

    // Smooth anchor scrolling (guard target existence)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
