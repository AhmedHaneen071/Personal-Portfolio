/* ============================================================
   AHMED HANEEN — PORTFOLIO 2026 v2
   Calm, staged GSAP motion: preloader, reveals, counters,
   skill bars, custom cursor.
   ============================================================ */
(function () {
    'use strict';

    const isTouch =
        window.matchMedia('(hover: none), (pointer: coarse)').matches ||
        'ontouchstart' in window;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

    /* ---------- No-GSAP fallback ---------- */
    if (!hasGsap) {
        document.body.classList.add('no-anim');
        const pre = document.getElementById('preloader');
        if (pre) pre.classList.add('done');
    }

    /* ================= GITHUB WORKS ================= */
    (function loadGithubWorks() {
        const list = document.getElementById('github-works');
        if (!list) return;

        const fallback = [
            {
                name: 'LA Imperial',
                url: 'https://github.com/ahmedhaneen071/LA-imperial-Responsive_web_template',
                desc: 'Modern, clean one-page responsive template for digital agencies.',
                lang: 'CSS',
                stars: 0,
            },
            {
                name: 'Ethereal World',
                url: 'https://github.com/ahmedhaneen071/Ethereal-World-Beautiful-HTML5-Template-Design',
                desc: 'Elegant, immersive HTML5 template for premium web experiences.',
                lang: 'CSS',
                stars: 0,
            },
            {
                name: 'Introspect',
                url: 'https://github.com/ahmedhaneen071/Introspect-Simple-Beautiful-Web-Template',
                desc: 'Minimal, responsive landing page template for portfolios and startups.',
                lang: 'HTML',
                stars: 0,
            },
        ];

        async function fetchRepos() {
            try {
                const res = await fetch(
                    'https://api.github.com/users/ahmedhaneen071/repos?per_page=100&sort=pushed'
                );
                if (!res.ok) return null;
                const data = await res.json();
                return Array.isArray(data) && data.length ? data : null;
            } catch (err) {
                return null;
            }
        }

        function render(repos) {
            list.textContent = '';
            repos.forEach((repo, i) => {
                const name = (repo.name || '').split('/').pop() || 'Repository';
                const title = name.replace(/[-_]+/g, ' ').toUpperCase();
                const raw = (repo.desc || repo.description || '').trim();
                const desc = raw.length > 100 ? raw.slice(0, 97).trim() + '\u2026' : raw;

                const card = document.createElement('a');
                card.className = 'work-card';
                card.href = repo.url || repo.html_url || 'https://github.com/ahmedhaneen071';
                card.target = '_blank';
                card.rel = 'noopener';
                card.setAttribute('data-cursor', 'OPEN \u2197');

                const num = document.createElement('span');
                num.className = 'work-number';
                num.textContent = 'W/' + String(i + 1).padStart(2, '0');

                const main = document.createElement('div');
                main.className = 'work-main';

                const head = document.createElement('h3');
                head.className = 'work-title';
                head.textContent = title;

                const p = document.createElement('p');
                p.className = 'work-desc';
                p.textContent = desc || 'Public repository';

                const meta = document.createElement('div');
                meta.className = 'work-meta';
                if (repo.lang) {
                    const l = document.createElement('span');
                    l.className = 'work-lang';
                    l.textContent = repo.lang;
                    meta.appendChild(l);
                }
                if (repo.stars > 0) {
                    const s = document.createElement('span');
                    s.className = 'work-stars';
                    s.textContent = '\u2605 ' + repo.stars;
                    meta.appendChild(s);
                }

                main.appendChild(head);
                main.appendChild(p);
                if (meta.children.length) main.appendChild(meta);

                const foot = document.createElement('div');
                foot.className = 'work-foot';
                const arrow = document.createElement('span');
                arrow.className = 'work-arrow';
                arrow.textContent = '\u2197';
                foot.appendChild(arrow);

                card.appendChild(num);
                card.appendChild(main);
                card.appendChild(foot);
                list.appendChild(card);
            });

            requestAnimationFrame(() => {
                if (!reduceMotion && typeof gsap !== 'undefined') {
                    gsap.from(list.children, {
                        opacity: 0,
                        y: 26,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: 0.05,
                        scrollTrigger: { trigger: list, start: 'top 85%' },
                    });
                    ScrollTrigger.refresh();
                }
            });
        }

        fetchRepos().then((repos) => render(repos || fallback));
    })();

    /* ================= SCROLL LOCK ================= */
    function lockScroll(on) {
        document.body.style.overflow = on ? 'hidden' : '';
    }

    /* ================= MOBILE MENU ================= */
    (function initMenu() {
        const menu = document.getElementById('mobile-menu');
        const openBtn = document.getElementById('menu-toggle');
        const closeBtn = document.getElementById('menu-close');
        if (!menu || !openBtn) return;

        openBtn.addEventListener('click', () => {
            menu.classList.add('open');
            lockScroll(true);
        });
        const close = () => {
            menu.classList.remove('open');
            lockScroll(false);
        };
        closeBtn.addEventListener('click', close);
        menu.querySelectorAll('.mob-link').forEach((l) => l.addEventListener('click', close));
    })();

    /* ================= SMOOTH ANCHOR ================= */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (!hasGsap) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    /* ================= CUSTOM CURSOR ================= */
    if (!isTouch && !reduceMotion) {
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        if (dot && ring) {
            gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
            const dotX = gsap.quickTo(dot, 'x', { duration: 0.08 });
            const dotY = gsap.quickTo(dot, 'y', { duration: 0.08 });
            const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
            const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

            window.addEventListener('mousemove', (e) => {
                dotX(e.clientX);
                dotY(e.clientY);
                ringX(e.clientX);
                ringY(e.clientY);
            });
            document.addEventListener('mouseover', (e) => {
                if (e.target.closest('a, button, [data-cursor]')) gsap.to(ring, { scale: 1.6, duration: 0.25 });
            });
            document.addEventListener('mouseout', (e) => {
                if (e.target.closest('a, button, [data-cursor]')) gsap.to(ring, { scale: 1, duration: 0.25 });
            });
        }
    }

    /* ================= SCROLL PROGRESS ================= */
    gsap.to('.scroll-progress span', {
        width: '100%',
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });

    /* ================= HEADER HIDE / SHOW ================= */
    (function initHeader() {
        const header = document.getElementById('site-header');
        let last = 0;
        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                const y = self.scroll();
                if (y > last && y > 300) header.classList.add('hidden');
                else header.classList.remove('hidden');
                last = y;
            },
        });
    })();

    /* ================= NAV ACTIVE ================= */
    (function initNavSpy() {
        const links = document.querySelectorAll('.header-nav a');
        links.forEach((link) => {
            const sec = document.querySelector(link.getAttribute('href'));
            if (!sec) return;
            ScrollTrigger.create({
                trigger: sec,
                start: 'top 50%',
                end: 'bottom 45%',
                onToggle: (self) => {
                    if (self.isActive) {
                        links.forEach((l) => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                },
            });
        });
    })();

    /* ================= SCROLL REVEALS ================= */
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
        if (el.closest('.hero')) return; // hero animated by the intro
        const dir = (el.dataset.reveal || 'up').split('-');
        const mobile = window.matchMedia('(max-width: 640px)').matches;
        const from = { opacity: 0 };
        if (dir.includes('up') || (mobile && (dir.includes('left') || dir.includes('right')))) from.y = 34;
        if (dir.includes('down')) from.y = -34;
        if (!mobile) {
            if (dir.includes('left')) from.x = 44;
            if (dir.includes('right')) from.x = -44;
        }

        gsap.fromTo(
            el,
            from,
            {
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none play reverse',
                },
            }
        );
    });

    /* ================= STAGGER GROUPS ================= */
    document.querySelectorAll('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
            opacity: 0,
            y: 26,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 85%', toggleActions: 'play none play reverse' },
        });
    });

    /* ================= SPLIT TEXT ================= */
    gsap.utils.toArray('[data-split]').forEach((el) => {
        if (reduceMotion) return;
        const split = new SplitText(el, {
            type: 'words,chars',
            wordsClass: 'sw',
            charsClass: 'sc',
        });
        gsap.from(split.chars, {
            opacity: 0,
            yPercent: 105,
            rotateX: -35,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.02,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none play reverse' },
        });
    });

    /* ================= SKILL BARS ================= */
    document.querySelectorAll('[data-bar]').forEach((row) => {
        const bar = row.querySelector('.skill-bar span');
        if (!bar) return;
        gsap.fromTo(
            bar,
            { width: '0%' },
            {
                width: row.dataset.bar + '%',
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: row, start: 'top 86%', toggleActions: 'play none none reverse' },
            }
        );
    });

    /* ================= COUNTERS ================= */
    document.querySelectorAll('[data-count]').forEach((el) => {
        const end = parseInt(el.dataset.count, 10);
        const obj = { n: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                gsap.to(obj, {
                    n: end,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = Math.round(obj.n);
                    },
                });
            },
        });
    });

    /* ================= PRELOADER + HERO INTRO ================= */
    (function initIntro() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        const countEl = document.getElementById('preloader-count');
        const fillEl = document.getElementById('preloader-fill');
        lockScroll(true);

        const counter = { n: 0 };
        const tl = gsap.timeline({
            onComplete: () => {
                preloader.classList.add('done');
                lockScroll(false);
            },
        });

        tl.set(
            ['.hero-kicker', '.hero-text', '.hero-tags', '.hero-cta', '.hero-stats', '.hc', '.hero-cursor'],
            { opacity: 0 },
            0
        )
            .to(counter, {
                n: 100,
                duration: 1.4,
                ease: 'power2.inOut',
                onUpdate: () => {
                    countEl.textContent = String(Math.round(counter.n)).padStart(3, '0');
                    fillEl.style.width = counter.n + '%';
                },
            })
            .to('.preloader-inner', { y: -24, opacity: 0, duration: 0.45, ease: 'power2.in' })
            .to(
                preloader,
                { yPercent: -100, duration: 0.8, ease: 'power4.inOut' },
                '-=0.15'
            )
            .set(preloader, { display: 'none' });

        if (!reduceMotion) {
            tl.fromTo(
                '.hero-kicker',
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            )
                .fromTo(
                    '.hc',
                    { opacity: 0, yPercent: 110 },
                    {
                        opacity: 1,
                        yPercent: 0,
                        duration: 0.8,
                        ease: 'expo.out',
                        stagger: 0.04,
                    },
                    '-=0.25'
                )
                .fromTo(
                    '.hero-cursor',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 },
                    '-=0.5'
                )
                .fromTo(
                    ['.hero-text', '.hero-tags', '.hero-cta', '.hero-stats'],
                    { opacity: 0, y: 34 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
                    '-=0.4'
                );
        } else {
            gsap.to(preloader, {
                yPercent: -100,
                duration: 0.3,
                delay: 0.2,
                onComplete: () => {
                    preloader.classList.add('done');
                    lockScroll(false);
                },
            });
        }

        ScrollTrigger.refresh();
    })();

    window.addEventListener('load', () => ScrollTrigger.refresh());
})();