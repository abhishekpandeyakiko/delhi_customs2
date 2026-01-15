/**
 * Ticker Logic
 * Handles Pause/Play for the announcement marquee
 */

// Global state to track if we've initialized to prevent duplicates
window.tickerInitialized = false;

function initTickerChecker() {
    if (window.tickerInitialized) return;

    const pauseBtn = document.getElementById('ticker-pause-btn');
    const content = document.querySelector('.ticker-content');

    // If elements exist, initialize
    if (pauseBtn && content) {
        initTickerFeatures(pauseBtn, content);
        window.tickerInitialized = true;
    } else {
        // Retry every 500ms
        setTimeout(initTickerChecker, 500);
    }
}

function initTickerFeatures(pauseBtn, content) {
    const icon = pauseBtn.querySelector('i');
    let isPaused = false;

    // Toggle Function
    function toggleTicker() {
        isPaused = !isPaused;
        if (isPaused) {
            content.classList.add('paused');
            // Change icon to Play (indicating "Click to Play")
            if (icon) {
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
            }
        } else {
            content.classList.remove('paused');
            // Change icon to Pause (indicating "Click to Pause")
            if (icon) {
                icon.classList.remove('bi-play-fill');
                icon.classList.add('bi-pause-fill');
            }
        }
    }

    // Click Listener
    pauseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTicker();
    });

    // Hover Listeners (Optional: Pause on mouseover)
    content.addEventListener('mouseenter', function () {
        if (!isPaused) content.classList.add('paused');
    });

    content.addEventListener('mouseleave', function () {
        if (!isPaused) content.classList.remove('paused');
    });

    console.log('Ticker Initialized Successfully');
}

// Start checking when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTickerChecker);
} else {
    initTickerChecker();
}
