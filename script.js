/* ============================================
   Portfolio Script — Ayoub Benfikri 2026
   ============================================ */

// ---------- Typed animation ----------
const roles = ['Full Stack Developer', 'React Developer', 'Laravel Developer', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (deleting) {
        charIdx--;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(type, 400);
            return;
        }
        setTimeout(type, 40);
    } else {
        charIdx++;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
        }
        setTimeout(type, 80);
    }
}
setTimeout(type, 800);

// ---------- Mobile FAB ----------
const fab        = document.getElementById('mobFab');
const mobMenu    = document.getElementById('mobMenu');
const mobOverlay = document.getElementById('mobOverlay');
const mobFabIcon = document.getElementById('mobFabIcon');
let fabOpen = false;

function openFab() {
    fabOpen = true;
    fab.classList.add('open');
    mobMenu.classList.add('open');
    mobOverlay.classList.add('visible');
    mobFabIcon.className = 'fas fa-times';
}

function closeFab() {
    fabOpen = false;
    fab.classList.remove('open');
    mobMenu.classList.remove('open');
    mobOverlay.classList.remove('visible');
    mobFabIcon.className = 'fas fa-bars';
}

fab?.addEventListener('click', () => fabOpen ? closeFab() : openFab());
mobOverlay?.addEventListener('click', closeFab);

document.querySelectorAll('.mob-menu .mob-item:not(.mob-theme)').forEach(item => {
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            closeFab();
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }, 250);
        }
    });
});

// Mobile theme toggle
const mobThemeBtn    = document.getElementById('mobTheme');
const mobThemeIconEl = document.getElementById('mobThemeIcon');

mobThemeBtn?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    const icon = isLight ? 'fas fa-moon' : 'fas fa-sun';
    if (themeIcon)      themeIcon.className      = icon;
    if (mobThemeIconEl) mobThemeIconEl.className = icon;
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ---------- Mobile nav (old hamburger) ----------
const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const bars = toggle.querySelectorAll('span');
    navLinks.classList.contains('open')
        ? (bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)', bars[1].style.opacity = '0', bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
        : (bars[0].style.transform = '', bars[1].style.opacity = '', bars[2].style.transform = '');
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const bars = toggle?.querySelectorAll('span');
        if (bars) { bars[0].style.transform = ''; bars[1].style.opacity = ''; bars[2].style.transform = ''; }
    });
});

// ---------- Header scroll ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});

// ---------- Sliders + Lightbox + Swipe ----------
document.querySelectorAll('.project-slider').forEach((slider, idx) => {
    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = document.getElementById(`dots-${idx}`);
    const prev = slider.querySelector('.slider-prev');
    const next = slider.querySelector('.slider-next');
    let cur = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Build dots
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot-btn' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.addEventListener('click', () => go(i));
        dotsContainer?.appendChild(d);
    });

    function go(n) {
        slides[cur].classList.remove('active');
        dotsContainer?.children[cur]?.classList.remove('active');
        cur = (n + slides.length) % slides.length;
        slides[cur].classList.add('active');
        dotsContainer?.children[cur]?.classList.add('active');
    }

    prev?.addEventListener('click', () => go(cur - 1));
    next?.addEventListener('click', () => go(cur + 1));

    // Keyboard nav when hovering slider
    slider.tabIndex = 0;
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') go(cur - 1);
        if (e.key === 'ArrowRight') go(cur + 1);
    });

    // Touch / Swipe support
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? go(cur + 1) : go(cur - 1);
        }
    }, { passive: true });

    // Click image to open lightbox
    slides.forEach((img) => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
});

// ---------- Lightbox ----------
function openLightbox(src, alt) {
    let box = document.getElementById('imgLightbox');
    if (!box) {
        box = document.createElement('div');
        box.id = 'imgLightbox';
        box.className = 'lightbox';
        box.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img class="lightbox-img" src="" alt="">
            <span class="lightbox-caption"></span>
        `;
        document.body.appendChild(box);

        box.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        box.addEventListener('click', (e) => { if (e.target === box) closeLightbox(); });
    }

    const img = box.querySelector('.lightbox-img');
    const cap = box.querySelector('.lightbox-caption');

    requestAnimationFrame(() => {
        img.src = src;
        img.alt = alt;
        cap.textContent = alt;
        box.classList.add('active');
    });

    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const box = document.getElementById('imgLightbox');
    if (box) {
        box.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Skill bars ----------
const skillsSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
                const w = bar.getAttribute('data-w');
                setTimeout(() => { bar.style.width = w + '%'; }, i * 60);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (skillsSection) skillObserver.observe(skillsSection);

// ---------- Theme Toggle ----------
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') applyLight();

function applyLight() {
    document.body.classList.add('light');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
    const m = document.getElementById('mobThemeIcon');
    if (m) m.className = 'fas fa-moon';
}
function applyDark() {
    document.body.classList.remove('light');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    const m = document.getElementById('mobThemeIcon');
    if (m) m.className = 'fas fa-sun';
}

themeBtn?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ---------- Active nav on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        const sectionTop = s.offsetTop - 100;
        if (window.scrollY >= sectionTop) current = s.id;
    });

    navAs.forEach(a => {
        const href = a.getAttribute('href');
        if (href === `#${current}`) {
            a.style.color = 'var(--green)';
            a.style.background = 'var(--green-dim)';
        } else {
            a.style.color = '';
            a.style.background = '';
        }
    });
}, { passive: true });

// ---------- Auto-hide FAB on scroll ----------
let lastScroll = 0;
const mobFab = document.getElementById('mobFab');
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (!mobFab) return;

    if (currentScroll > lastScroll && currentScroll > 200 && fabOpen === false) {
        mobFab.style.transform = 'translateY(100px)';
    } else {
        mobFab.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
}, { passive: true });