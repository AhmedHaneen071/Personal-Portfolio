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

    /* ================= THEME ================= */
    (function initTheme() {
        const root = document.documentElement;
        const saved = localStorage.getItem('theme');
        if (saved) root.setAttribute('data-theme', saved);

        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
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
        const from = { opacity: 0 };
        if (dir.includes('up')) from.y = 34;
        if (dir.includes('down')) from.y = -34;
        if (dir.includes('left')) from.x = 44;
        if (dir.includes('right')) from.x = -44;

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