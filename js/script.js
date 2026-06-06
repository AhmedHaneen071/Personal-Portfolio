// Theme
const body = document.body;
const themeBtn = document.getElementById('themeBtn');

if (localStorage.getItem('theme') === 'light') body.classList.add('light');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// Sticky nav
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
function toggleMenu() {
    document.getElementById('menuList').classList.toggle('open');
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
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const themeToggle = document.getElementById('theme-toggle');

    // 1. Theme Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    }

    themeToggle.onclick = () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // 2. Mobile Menu Logic
    menuToggle.onclick = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    menuClose.onclick = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close menu when clicking a link
    document.querySelectorAll('.mob-link').forEach((link) => {
        link.onclick = () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    });

    // 3. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
        observer.observe(el);
    });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        });
    });
});
