/* ============================================================
   BHUVANESH SRIKANTH — Portfolio Script v2.0
   Boot screen → Particles → Typewriter → Reveals → Konami
============================================================ */

// ── Utilities ──────────────────────────────────────────────
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Boot sequence ──────────────────────────────────────────
const BOOT_LINES = [
    'BIOS v2.0 — BHUVANESH_SYS',
    'Initializing memory banks...',
    'Detecting hardware interfaces... OK',
    'Loading NLP subsystem........... OK',
    'Mounting blockchain modules...... OK',
    'Checking IoT firmware............ OK',
    'Spawning React processes......... OK',
    'Connecting to Neo4j graph........ OK',
    'Loading project index [7/7]...... OK',
    'Calibrating CRT display.......... OK',
    'Running self-diagnostics......... PASS',
    '> ALL SYSTEMS NOMINAL',
    '> BOOT COMPLETE — WELCOME, RECRUIT',
];

async function runBoot() {
    const linesEl = $('#boot-lines');
    const bar     = $('#boot-bar');
    const pct     = $('#boot-pct');
    const screen  = $('#boot-screen');
    const main    = $('#main-portfolio');

    // Print each boot line with delay
    for (let i = 0; i < BOOT_LINES.length; i++) {
        await sleep(i < 3 ? 80 : 60);
        const span = document.createElement('span');
        span.className = 'bl';
        span.textContent = BOOT_LINES[i];
        linesEl.appendChild(span);

        // Force reflow to trigger animation
        span.getBoundingClientRect();
        span.style.opacity = '1';

        const progress = Math.round(((i + 1) / BOOT_LINES.length) * 100);
        bar.style.width = progress + '%';
        pct.textContent = progress + '%';
    }

    await sleep(400);

    // Fade out boot screen
    screen.classList.add('fade-out');
    main.classList.remove('hidden');

    // Wait for fade, then remove
    await sleep(650);
    screen.style.display = 'none';

    // Start all portfolio JS
    initPortfolio();
}

// ── Portfolio Init ─────────────────────────────────────────
function initPortfolio() {
    initParticles();
    initClock();
    initTypewriter();
    initNavbar();
    initReveal();
    initSkillBars();
    initProjectCards();
    initKonami();
    initConsole();
    initAvatarParallax();
    initGlitchTrigger();
}

// ── Particle system ────────────────────────────────────────
function initParticles() {
    const canvas = $('#particle-canvas');
    const ctx    = canvas.getContext('2d');

    let W, H, particles;

    const COLORS = ['#39ff14','#00ffff','#ff00ff','#bd00ff','#ffb800'];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.3,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.5 + 0.1,
            flicker: Math.random() * Math.PI * 2,
        }));
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.flicker += 0.04;

            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.flicker));
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.shadowBlur  = 8;
            ctx.shadowColor = p.color;
            ctx.fillStyle   = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // Draw connection lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    ctx.save();
                    ctx.globalAlpha = (1 - d / 100) * 0.08;
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth   = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });
}

// ── Clock ──────────────────────────────────────────────────
function initClock() {
    const el = $('#clock');
    const tick = () => {
        const now  = new Date();
        const h    = String(now.getHours()).padStart(2, '0');
        const m    = String(now.getMinutes()).padStart(2, '0');
        const s    = String(now.getSeconds()).padStart(2, '0');
        if (el) el.textContent = `${h}:${m}:${s}`;
    };
    tick();
    setInterval(tick, 1000);
}

// ── Typewriter ─────────────────────────────────────────────
function initTypewriter() {
    const el = $('#typewriter');
    if (!el) return;

    const lines = [
        'EXPLORING SYSTEMS BENEATH THE SURFACE.',
        'BUILDING SMART CONTRACTS & SMARTER UI.',
        'COMPSCI UNDERGRAD // CLASS OF 2027.',
        'AVAILABLE FOR INTERNSHIPS & COLLAB.',
    ];

    let lineIdx  = 0;
    let charIdx  = 0;
    let deleting = false;
    let pausing  = false;

    const SPEED_TYPE   = 60;
    const SPEED_DELETE = 30;
    const PAUSE_AFTER  = 2200;
    const PAUSE_BEFORE = 400;

    function tick() {
        const line = lines[lineIdx];

        if (pausing) return;

        if (!deleting) {
            charIdx++;
            el.textContent = line.slice(0, charIdx);

            if (charIdx === line.length) {
                pausing = true;
                setTimeout(() => { pausing = false; deleting = true; tick(); }, PAUSE_AFTER);
                return;
            }
            setTimeout(tick, SPEED_TYPE);
        } else {
            charIdx--;
            el.textContent = line.slice(0, charIdx);

            if (charIdx === 0) {
                pausing = true;
                deleting = false;
                lineIdx  = (lineIdx + 1) % lines.length;
                setTimeout(() => { pausing = false; tick(); }, PAUSE_BEFORE);
                return;
            }
            setTimeout(tick, SPEED_DELETE);
        }
    }

    tick();
}

// ── Navbar ─────────────────────────────────────────────────
function initNavbar() {
    const nav   = $('.navbar');
    const links = $$('.nav-link');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);

        // Active link highlight
        const sections = ['hero','projects','quests','skills'];
        let current = '';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = id;
        });
        links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
    });

    // Smooth scroll
    links.forEach(l => {
        l.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(l.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ── Scroll reveal ──────────────────────────────────────────
function initReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger children inside section-header
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // Add stagger delays to project cards and timeline items
    $$('.pcard').forEach((el, i) => { el.dataset.delay = i * 80; });
    $$('.tl-item').forEach((el, i) => { el.dataset.delay = i * 120; });

    $$('.reveal').forEach(el => obs.observe(el));
}

// ── Skill bars ─────────────────────────────────────────────
function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $$('.skill-fill').forEach(bar => {
                    bar.style.width = bar.dataset.w + '%';
                });
                obs.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = $('#skills');
    if (skillsSection) obs.observe(skillsSection);
}

// ── Project cards — mouse glow ─────────────────────────────
function initProjectCards() {
    $$('.pcard').forEach(card => {
        // Set CSS accent color from data attribute
        const color = card.dataset.color;
        if (color) card.style.setProperty('--accent', color);

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const mx   = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
            const my   = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
            card.style.setProperty('--mx', mx);
            card.style.setProperty('--my', my);
        });

        // Click ripple
        card.addEventListener('click', e => {
            const rect   = card.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position:absolute;
                left:${e.clientX - rect.left}px;
                top:${e.clientY - rect.top}px;
                width:4px;height:4px;
                border-radius:50%;
                background:${color || 'var(--blue)'};
                pointer-events:none;
                z-index:10;
                transform:translate(-50%,-50%) scale(0);
                animation:rippleOut 0.5s ease-out forwards;
            `;
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Inject ripple keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleOut {
            to { transform: translate(-50%,-50%) scale(60); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ── Avatar parallax on mouse ───────────────────────────────
function initAvatarParallax() {
    const avatar = $('.avatar-container');
    if (!avatar) return;

    document.addEventListener('mousemove', e => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;  // -1 to 1
        const dy = (e.clientY - cy) / cy;
        avatar.style.transform = `perspective(600px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)`;
    });
}

// ── Glitch on section entry ────────────────────────────────
function initGlitchTrigger() {
    const overlay = $('#glitch-overlay');
    if (!overlay) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                overlay.classList.remove('active');
                void overlay.offsetWidth; // reflow
                overlay.classList.add('active');
                setTimeout(() => overlay.classList.remove('active'), 600);
            }
        });
    }, { threshold: 0.5 });

    $$('.section-header').forEach(el => obs.observe(el));
}

// ── Konami Code ────────────────────────────────────────────
function initKonami() {
    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                 'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;

    document.addEventListener('keydown', e => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const req  = SEQ[idx].length === 1 ? SEQ[idx].toLowerCase() : SEQ[idx];
        idx = key === req ? idx + 1 : 0;
        if (idx === SEQ.length) { activateGodMode(); idx = 0; }
    });
}

function activateGodMode() {
    // Screen flash
    const overlay = $('#glitch-overlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 600);
    }

    // Hacker-green all CSS vars
    const root = document.documentElement;
    root.style.setProperty('--pink',   '#0f0');
    root.style.setProperty('--purple', '#0f0');
    root.style.setProperty('--yellow', '#0f0');
    root.style.setProperty('--orange', '#0f0');

    // Unlock secret card
    const grid = $('.projects-grid');
    if (grid && !$('#secret-card')) {
        const card = document.createElement('div');
        card.id        = 'secret-card';
        card.className = 'pcard reveal visible';
        card.dataset.color = '#0f0';
        card.style.setProperty('--accent', '#0f0');
        card.innerHTML = `
            <div class="pcard-num">STAGE ???</div>
            <div class="pcard-glow"></div>
            <div class="pcard-body">
                <h3 class="pcard-title">SECRET: IDKFA.EXE</h3>
                <p class="pcard-desc">You entered the Konami Code. GOD MODE ACTIVATED. All cheats enabled. Am I hired yet?</p>
                <div class="pcard-stack">
                    <span class="tag">NES</span>
                    <span class="tag">1986</span>
                    <span class="tag">Konami</span>
                    <span class="tag">↑↑↓↓←→←→BA</span>
                </div>
            </div>
            <div class="pcard-footer">
                <span class="pcard-status blink-dot">● GOD MODE</span>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="pcard-btn">RUN DOOM.EXE ›</a>
            </div>
        `;
        grid.prepend(card);
    }

    console.log('%c GOD MODE ACTIVATED ', 'background:#000;color:#0f0;font-size:18px;font-family:monospace;border:2px solid #0f0;padding:10px;');
}

// ── Console Easter Egg ─────────────────────────────────────
function initConsole() {
    console.log('%c BHUVANESH_SYS v2.0 ', 'background:#000;color:#39ff14;font-size:22px;font-family:monospace;border:2px solid #39ff14;padding:12px;');
    console.log('%c ↑↑↓↓←→←→BA for a surprise ', 'color:#00ffff;font-family:monospace;font-size:12px;');
    console.log('%c Built with: HTML + CSS + JS. No frameworks harmed.', 'color:#bd00ff;font-family:monospace;font-size:11px;');
}

// ── Kick it off ────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', runBoot);