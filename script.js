// TikTok Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tiktokSlider = document.querySelector('.tiktok-slider');
    const slides = document.querySelectorAll('.tiktok-slide');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Initialize TikTok embed script
    function loadTikTokScript() {
        if (!window.tiktokScriptLoaded) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }
    
    // Hide scroll indicator after scrolling
    tiktokSlider.addEventListener('scroll', function() {
        // Show scroll indicator only at the start
        if (tiktokSlider.scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 500);
        }
        
        // Reload TikTok embed script when needed
        if (window.tiktokEmbed) {
            window.tiktokEmbed.reload();
        }
    });
    
    // Initialize by loading TikTok script
    loadTikTokScript();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            tiktokSlider.scrollBy({
                top: -tiktokSlider.clientHeight,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            tiktokSlider.scrollBy({
                top: tiktokSlider.clientHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Make the scroll indicator clickable to scroll to next video
    scrollIndicator.addEventListener('click', function() {
        tiktokSlider.scrollBy({
            top: tiktokSlider.clientHeight,
            behavior: 'smooth'
        });
    });

    // Add swipe functionality for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    tiktokSlider.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    tiktokSlider.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance in pixels
        const swipeDistance = touchEndY - touchStartY;
        
        if (Math.abs(swipeDistance) < threshold) {
            return; // Not a significant swipe
        }
        
        if (swipeDistance > 0) {
            // Swipe down - go to previous
            tiktokSlider.scrollBy({
                top: -tiktokSlider.clientHeight,
                behavior: 'smooth'
            });
        } else {
            // Swipe up - go to next
            tiktokSlider.scrollBy({
                top: tiktokSlider.clientHeight,
                behavior: 'smooth'
            });
        }
    }
    
    // Fix for iOS momentum scrolling
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        tiktokSlider.style.WebkitOverflowScrolling = 'touch';
    }
    
    // Optimize initial load on mobile
    if (window.innerWidth <= 768) {
        // Force smaller video heights on mobile
        document.querySelectorAll('.tiktok-slide').forEach(slide => {
            slide.style.height = '100%';
        });
    }
}); 