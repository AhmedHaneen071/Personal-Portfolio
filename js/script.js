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

// Scroll reveal helper
function observeElements(selector) {
    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    scrollObserver.unobserve(e.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('reveal');
        scrollObserver.observe(el);
    });
}

observeElements('.portfolio-card, .about-img, .about-text');

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

    // ─── DYNAMIC GITHUB REPOS ──────────────────────────────
    const GITHUB_USER = 'AhmedHaneen071';

    function getLangClass(lang) {
        const map = { JavaScript: 'js-lang', HTML: 'html-lang', CSS: 'css-lang', TypeScript: 'ts-lang' };
        return map[lang] || '';
    }

    function getLangIcon(lang) {
        const map = {
            JavaScript: 'fa-solid fa-code',
            HTML: 'fa-brands fa-html5',
            CSS: 'fa-brands fa-css3-alt',
            TypeScript: 'fa-solid fa-code',
            Python: 'fa-brands fa-python',
            'C#': 'fa-solid fa-code'
        };
        return map[lang] || 'fa-solid fa-folder';
    }

    function formatRepoName(name) {
        return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    async function fetchGitHubRepos() {
        const grid = document.querySelector('.repos-grid');
        if (!grid) return;

        try {
            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
            );
            if (!res.ok) throw new Error('GitHub API error');
            const repos = await res.json();

            const ownRepos = repos.filter((r) => !r.fork);

            grid.innerHTML = ownRepos
                .map((repo) => {
                    const lang = repo.language || 'Unknown';
                    const langClass = getLangClass(lang);
                    const icon = getLangIcon(lang);
                    const isFeatured = repo.name === 'Task-Hub';

                    return `
                        <a href="${repo.html_url}" target="_blank" class="repo-card${isFeatured ? ' featured' : ''}">
                            <div class="repo-icon"><i class="${icon}"></i></div>
                            <h3>${formatRepoName(repo.name)}</h3>
                            <p>${repo.description || 'No description provided.'}</p>
                            <div class="repo-meta">
                                <span class="repo-lang ${langClass}">${lang}</span>
                                ${isFeatured ? `<span class="repo-stars"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                                <span class="repo-link">View Repo <i class="fa-solid fa-arrow-right"></i></span>
                            </div>
                        </a>
                    `;
                })
                .join('');

            // Observe new repo cards for scroll reveal
            observeElements('.repos-grid .repo-card');
        } catch (err) {
            grid.innerHTML =
                '<p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">Failed to load GitHub repositories.</p>';
        }
    }

    fetchGitHubRepos();
});
