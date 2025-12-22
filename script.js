document.addEventListener('DOMContentLoaded', () => {
    
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
});