/* ============================================================
   AHMED HANEEN — PORTFOLIO 2026
   GSAP choreography: preloader, SplitText, ScrollTrigger,
   custom cursor, magnetic + tilt interactions.
   ============================================================ */
(function () {
    'use strict';

    document.documentElement.classList.add('js');

    const isTouch =
        window.matchMedia('(hover: none), (pointer: coarse)').matches ||
        'ontouchstart' in window;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

    /* ---------- No-GSAP fallback: reveal everything ---------- */
    if (!hasGsap) {
        document.body.classList.add('no-anim');
        const pre = document.getElementById('preloader');
        if (pre) {
            pre.classList.add('done');
            document.body.classList.remove('no-scroll');
        }
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

    /* ================= BODY SCROLL LOCK ================= */
    function lockScroll(on) {
        document.body.style.overflow = on ? 'hidden' : '';
    }

    /* ================= MOBILE MENU ================= */
    (function initMenu() {
        const menu = document.getElementById('mobile-menu');
        const openBtn = document.getElementById('menu-toggle');
        const closeBtn = document.getElementById('menu-close');
        if (!menu) return;

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

    /* ================= SMOOTH ANCHOR NAV ================= */
    (function initAnchor() {
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
    })();

    if (!hasGsap) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    /* ================= CUSTOM CURSOR ================= */
    if (!isTouch && !reduceMotion) {
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        const label = document.createElement('span');
        label.className = 'cursor-label';
        ring.appendChild(label);

        const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
        const ringScale = gsap.quickTo(ring, 'scale', { duration: 0.25, ease: 'power2.out' });

        window.addEventListener('mousemove', (e) => {
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
        });

        document.addEventListener('mouseover', (e) => {
            const hot = e.target.closest('a, button, [data-cursor], [data-magnetic]');
            if (hot) {
                ringScale(1.8);
                ring.classList.add('growing');
                if (hot.hasAttribute('data-cursor')) {
                    label.textContent = hot.getAttribute('data-cursor');
                    ring.classList.add('labeled');
                }
            }
        });
        document.addEventListener('mouseout', (e) => {
            const hot = e.target.closest('a, button, [data-cursor], [data-magnetic]');
            if (hot) {
                ringScale(1);
                ring.classList.remove('growing', 'labeled');
            }
        });

        gsap.set('.cursor-dot, .cursor-ring', { xPercent: -50, yPercent: -50 });
    }

    /* ================= MAGNETIC ================= */
    if (!isTouch) {
        document.querySelectorAll('[data-magnetic]').forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
            el.addEventListener('mousemove', (e) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
            });
            el.addEventListener('mouseleave', () => {
                xTo(0);
                yTo(0);
            });
        });
    }

    /* ================= 3D TILT ================= */
    if (!isTouch && !reduceMotion) {
        document.querySelectorAll('.edu-card, .xp-body').forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
                const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
                gsap.to(card, {
                    rotationX: rx,
                    rotationY: ry,
                    transformPerspective: 800,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
            });
        });
    }

    /* ================= SCROLL PROGRESS ================= */
    gsap.to('.scroll-progress span', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.4,
        },
    });

    /* ================= HEADER HIDE / SHOW ================= */
    (function initHeaderTimeline() {
        const header = document.getElementById('site-header');
        let last = 0;
        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                const y = self.scroll();
                if (y > last && y > 320) header.classList.add('hidden');
                else header.classList.remove('hidden');
                last = y;
            },
        });
    })();

    /* ================= NAV ACTIVE STATE ================= */
    (function initNavSpy() {
        const links = document.querySelectorAll('.header-nav a');
        const map = {};
        links.forEach((l) => {
            const id = l.getAttribute('href');
            const sec = document.querySelector(id);
            if (sec) map[id] = { link: l, sec };
        });
        Object.values(map).forEach(({ link, sec }) => {
            ScrollTrigger.create({
                trigger: sec,
                start: 'top 45%',
                end: 'bottom 55%',
                onToggle: (self) => {
                    if (self.isActive) {
                        links.forEach((l) => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                },
            });
        });
    })();

    /* ================= SCROLL REVEAL (fade in/out) ================= */
    (function initReveals() {
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
            if (el.closest('.hero')) return; // hero is owned by the intro timeline
            const dir = (el.dataset.reveal || 'up').split('-');
            const from = { opacity: 0 };
            if (dir.includes('up')) from.y = 46;
            if (dir.includes('down')) from.y = -46;
            if (dir.includes('left')) from.x = -60;
            if (dir.includes('right')) from.x = 60;
            if (dir.includes('zoom')) from.scale = 0.86;

            gsap.fromTo(
                el,
                from,
                {
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        end: 'bottom 12%',
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        });

        // stagger groups
        document.querySelectorAll('[data-stagger]').forEach((group) => {
            gsap.from(group.children, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.09,
                scrollTrigger: {
                    trigger: group,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse',
                },
            });
        });
    })();

    /* ================= SPLIT TEXT (headings) ================= */
    (function initSplit() {
        gsap.utils.toArray('[data-split]').forEach((el) => {
            if (reduceMotion) return;
            const split = new SplitText(el, {
                type: 'words,chars',
                wordsClass: 'sw',
                charsClass: 'sc',
            });
            gsap.from(split.chars, {
                opacity: 0,
                yPercent: 110,
                rotateX: -45,
                duration: 0.6,
                ease: 'expo.out',
                stagger: 0.02,
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none play reverse' },
            });
        });
    })();

    /* ================= SKILLS BARS ================= */
    (function initBars() {
        document.querySelectorAll('[data-bar]').forEach((row) => {
            const bar = row.querySelector('.skill-bar span');
            if (!bar) return;
            gsap.fromTo(
                bar,
                { width: '0%' },
                {
                    width: row.dataset.bar + '%',
                    duration: 1.4,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none reverse' },
                }
            );
        });
    })();

    /* ================= COUNT-UP STATS ================= */
    (function initCounters() {
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
                        duration: 1.6,
                        ease: 'power2.out',
                        onUpdate: () => {
                            el.textContent = Math.round(obj.n);
                        },
                    });
                },
            });
        });
    })();

    /* ================= PRELOADER + INTRO ================= */
    (function initIntro() {
        const preloader = document.getElementById('preloader');
        const countEl = document.getElementById('preloader-count');
        const fillEl = document.getElementById('preloader-fill');

        if (!preloader) return;

        lockScroll(true);

        const counter = { n: 0 };
        const tl = gsap.timeline({
            onComplete: () => {
                preloader.classList.add('done');
                lockScroll(false);
                document.body.dataset.loaded = '1';
            },
        });

        tl.set(
            '.hero-kicker, .hero-text, .hero-stats, .scroll-cue, .hero-char-wrap, .hero-cursor',
            { opacity: 0 },
            0
        )
            .to(counter, {
            n: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
                const v = Math.round(counter.n);
                countEl.textContent = String(v).padStart(3, '0');
                fillEl.style.width = v + '%';
            },
        })
            .to('.preloader-inner', { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in' })
            .to(
                preloader,
                {
                    yPercent: -100,
                    duration: 0.85,
                    ease: 'expo.inOut',
                },
                '-=0.2'
            )
            .set(preloader, { display: 'none' });

        // hero intro if motion allowed
        if (!reduceMotion) {
            tl.fromTo(
                '.hero-kicker',
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            )
                .fromTo(
                    '.hero-char-wrap',
                    {
                        opacity: 0,
                        yPercent: 110,
                        rotate: 6,
                        transformOrigin: 'left bottom',
                    },
                    {
                        opacity: 1,
                        yPercent: 0,
                        rotate: 0,
                        duration: 0.9,
                        ease: 'expo.out',
                        stagger: 0.045,
                    },
                    '-=0.3'
                )
                .fromTo(
                    '.hero-cursor',
                    { opacity: 0, width: 0 },
                    { opacity: 1, width: '0.12em', duration: 0.4 },
                    '-=0.6'
                )
                .fromTo(
                    ['.hero-text', '.hero-stats'],
                    { opacity: 0, y: 44 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
                    '-=0.5'
                )
                .fromTo(
                    '.scroll-cue',
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.4'
                );
        } else {
            // reduced motion: show everything instantly, hide preloader fast
            gsap.to(preloader, {
                yPercent: -100,
                duration: 0.3,
                delay: 0.2,
                ease: 'power1.inOut',
                onComplete: () => {
                    preloader.classList.add('done');
                    document.body.classList.remove('no-scroll');
                },
            });
        }

        ScrollTrigger.refresh();
    })();

    /* ================= HERO PARALLAX ================= */
    if (!reduceMotion) {
        gsap.to('.hero', {
            yPercent: 16,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
            },
        });

        gsap.utils.toArray('.hero-float').forEach((el) => {
            gsap.to(el, {
                yPercent: -40 + Math.random() * 80,
                xPercent: -20 + Math.random() * 40,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.2,
                },
            });
        });
    }

    /* ================= WORK CARD HOVER PARALLAX ================= */
    document.querySelectorAll('.work-card').forEach((card) => {
        const img = card.querySelector('.work-image');
        if (!img || isTouch) return;
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 20;
            gsap.to(img, { x, y, duration: 0.5, ease: 'power2.out' });
        });
    });

    /* ================= LENIS-STYLE SNAPPY SCROLL (optional enhancer) ================= */
    window.addEventListener('load', () => ScrollTrigger.refresh());
})();