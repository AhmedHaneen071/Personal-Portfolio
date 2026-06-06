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
document.querySelectorAll('#menuList a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menuList').classList.remove('open');
    });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.portfolio-card, .repo-card, .about-img, .about-text').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});
