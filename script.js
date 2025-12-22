document.addEventListener('DOMContentLoaded', () => {
    // --- 0. LENIS SMOOTH SCROLL (INTERNAL DIV) ---
    // We target '.screen-container' because that's where your scrollbar is!
    const scrollContainer = document.querySelector('.screen-container');
    
    const lenis = new Lenis({
        wrapper: scrollContainer, // The element that has overflow: auto
        content: document.querySelector('.screen-content'), // The content inside
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // --- 1. Dynamic Clock ---
    // Updates the time in the top-right corner every second
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.innerText = timeString;
        }
    };
    setInterval(updateTime, 1000);
    updateTime();

    // --- 2. Sound Toggle (UI Logic) ---
    // Simulates a sound toggle switch. Add actual Audio() objects here if you have mp3s.
    const soundToggle = document.getElementById('sound-toggle');
    let isSoundOn = false;

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            isSoundOn = !isSoundOn;
            soundToggle.innerText = isSoundOn ? "[SOUND: ON]" : "[SOUND: OFF]";
            
            // Visual feedback: Change color when ON
            soundToggle.style.color = isSoundOn ? "var(--neon-green)" : "inherit";
            soundToggle.style.textShadow = isSoundOn ? "0 0 10px var(--neon-green)" : "none";
        });
    }

    // --- 3. Scroll Animation for Health Bars ---
    // Uses IntersectionObserver to trigger animations only when bars enter the viewport
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                
                // Apply the width from the data attribute to trigger CSS transition
                if (targetWidth) {
                    bar.style.width = targetWidth;
                }
                
                // Stop observing once animated so it doesn't reset
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    // Attach observer to all elements with class 'health-bar-fill'
    document.querySelectorAll('.health-bar-fill').forEach(bar => {
        observer.observe(bar);
    });

    // --- 4. Developer Console Easter Egg ---
    // A fun message for recruiters who inspect your code
    console.log(
        "%c READY PLAYER ONE ", 
        "background: #000; color: #39ff14; font-size: 20px; font-family: monospace; border: 2px solid #39ff14; padding: 10px;"
    );
    console.log("Welcome to Bhuvanesh's System Architecture.");
});document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Clock ---
    // Updates the time in the top-right corner every second
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.innerText = timeString;
        }
    };
    setInterval(updateTime, 1000);
    updateTime();

    // --- 2. Sound Toggle (UI Logic) ---
    // Simulates a sound toggle switch. Add actual Audio() objects here if you have mp3s.
    const soundToggle = document.getElementById('sound-toggle');
    let isSoundOn = false;

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            isSoundOn = !isSoundOn;
            soundToggle.innerText = isSoundOn ? "[SOUND: ON]" : "[SOUND: OFF]";
            
            // Visual feedback: Change color when ON
            soundToggle.style.color = isSoundOn ? "var(--neon-green)" : "inherit";
            soundToggle.style.textShadow = isSoundOn ? "0 0 10px var(--neon-green)" : "none";
        });
    }

    // --- 3. Scroll Animation for Health Bars ---
    // Uses IntersectionObserver to trigger animations only when bars enter the viewport
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                
                // Apply the width from the data attribute to trigger CSS transition
                if (targetWidth) {
                    bar.style.width = targetWidth;
                }
                
                // Stop observing once animated so it doesn't reset
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    // Attach observer to all elements with class 'health-bar-fill'
    document.querySelectorAll('.health-bar-fill').forEach(bar => {
        observer.observe(bar);
    });

    // --- 4. Developer Console Easter Egg ---
    // A fun message for recruiters who inspect your code
    console.log(
        "%c READY PLAYER ONE ", 
        "background: #000; color: #39ff14; font-size: 20px; font-family: monospace; border: 2px solid #39ff14; padding: 10px;"
    );
    console.log("Welcome to Bhuvanesh's System Architecture.");
    // =========================================
    // === 5. KONAMI CODE EASTER EGG         ===
    // =========================================
    
    // The sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        // 1. Check if the key pressed matches the current step in the sequence
        // We use toLowerCase() for letters to ensure 'A' and 'a' both work
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const requiredKey = konamiCode[konamiIndex].length === 1 ? konamiCode[konamiIndex].toLowerCase() : konamiCode[konamiIndex];

        if (key === requiredKey) {
            konamiIndex++; // Move to the next key in the sequence
            
            // 2. If the full sequence is entered successfully:
            if (konamiIndex === konamiCode.length) {
                activateGodMode();
                konamiIndex = 0; // Reset for next time
            }
        } else {
            konamiIndex = 0; // Mistake made! Reset the sequence.
        }
    });

    function activateGodMode() {
        // Visual Feedback
        //alert("★ GOD MODE ACTIVATED ★\nSystem resources unlocked.");
        
        // 1. Change the Color Scheme to "Hacker Green" (Matrix Style)
        document.documentElement.style.setProperty('--neon-pink', '#0f0');
        document.documentElement.style.setProperty('--neon-blue', '#0f0');
        document.documentElement.style.setProperty('--neon-yellow', '#0f0');
        document.body.style.background = '#001100'; // Dark green background
        
        // 2. Unlock a Secret "Hidden" Project Card
        const grid = document.querySelector('.grid');
        
        // Check if we already added it so we don't add duplicates
        if (!document.getElementById('secret-card')) {
            const secretCard = document.createElement('div');
            secretCard.id = 'secret-card';
            secretCard.className = 'card theme-green';
            secretCard.setAttribute('data-stage', '???');
            
            // Inner HTML for the secret card
            secretCard.innerHTML = `
                <div class="card-body">
                    <div class="tech-header">
                        <div class="tech-icon-wrapper" data-name="IDKFA">
                            <svg class="icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                        </div>
                    </div>
                    <h3>SECRET PROJECT: DOOM</h3>
                    <p>You found the easter egg! Am I hired yet?!</p>
                </div>
                <div class="card-actions">
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="btn-retro">RUN DOOM.EXE</a>
                </div>
            `;
            
            // Add it to the top of the list
            grid.prepend(secretCard); 
        }
    }
});