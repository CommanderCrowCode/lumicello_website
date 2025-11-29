document.addEventListener('DOMContentLoaded', () => {
    // Scroll Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    // Note: .nav-wrapper scroll behavior is handled by components.js initNavScroll()
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }


    // Testimonial Carousel
    let slideIndex = 1;
    // Only run if carousel exists
    if (document.querySelector('.quote-carousel')) {
        showSlides(slideIndex);

        // Auto advance every 5 seconds
        setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    }

    // Kit Image Carousels
    initKitCarousels();

    // Kit Journey Scroller (mobile)
    initKitJourneyScroller();

    // Cinematic Fingerprint Experience
    initFingerprintCinema();
});

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("quote-slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].className += " active";
}

// Kit Image Carousel functionality
function initKitCarousels() {
    const carousels = document.querySelectorAll('.kit-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.kit-carousel-track');
        const dots = carousel.querySelectorAll('.kit-dot');
        const images = carousel.querySelectorAll('.kit-carousel-track img');
        let currentIndex = 0;

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = index;
                updateCarousel();
            });
        });

        // Click on image to open lightbox
        images.forEach(img => {
            img.addEventListener('click', () => {
                const imageSrcs = Array.from(images).map(i => i.src);
                const imageAlts = Array.from(images).map(i => i.alt);
                openKitLightbox(imageSrcs, imageAlts, currentIndex);
            });
        });

        // Swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentIndex < images.length - 1) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                updateCarousel();
            }
        }

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 50}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    });
}

// Kit Lightbox functionality
function openKitLightbox(imageSrcs, imageAlts, startIndex = 0) {
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.kit-lightbox');

    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'kit-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="lightbox-image-container">
                    <img class="lightbox-image" src="" alt="">
                </div>
                <button class="lightbox-nav lightbox-next" aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div class="lightbox-counter"></div>
                <div class="lightbox-dots"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const dotsContainer = lightbox.querySelector('.lightbox-dots');
    const counterEl = lightbox.querySelector('.lightbox-counter');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');

    let currentIndex = startIndex;
    let isTransitioning = false;

    // Create dots
    dotsContainer.innerHTML = imageSrcs.map((_, i) =>
        `<button class="lightbox-dot ${i === currentIndex ? 'active' : ''}" aria-label="View image ${i + 1}"></button>`
    ).join('');

    const dots = dotsContainer.querySelectorAll('.lightbox-dot');

    // Smooth crossfade transition
    function transitionToImage(newIndex) {
        if (isTransitioning || newIndex === currentIndex) return;
        isTransitioning = true;

        // Fade out current image
        lightboxImage.classList.add('transitioning');

        setTimeout(() => {
            // Update to new image
            currentIndex = newIndex;
            lightboxImage.src = imageSrcs[currentIndex];
            lightboxImage.alt = imageAlts[currentIndex];
            updateUI();

            // Fade in new image
            setTimeout(() => {
                lightboxImage.classList.remove('transitioning');
                isTransitioning = false;
            }, 50);
        }, 250); // Match CSS transition duration
    }

    function updateUI() {
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex === imageSrcs.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === imageSrcs.length - 1 ? 'none' : 'auto';
        counterEl.textContent = `${currentIndex + 1} / ${imageSrcs.length}`;
    }

    function updateLightbox() {
        lightboxImage.src = imageSrcs[currentIndex];
        lightboxImage.alt = imageAlts[currentIndex];
        updateUI();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Event listeners with smooth transitions
    prevBtn.onclick = () => { if (currentIndex > 0) transitionToImage(currentIndex - 1); };
    nextBtn.onclick = () => { if (currentIndex < imageSrcs.length - 1) transitionToImage(currentIndex + 1); };
    closeBtn.onclick = closeLightbox;
    overlay.onclick = closeLightbox;

    dots.forEach((dot, i) => {
        dot.onclick = () => transitionToImage(i);
    });

    // Keyboard navigation with transitions
    const keyHandler = (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && currentIndex > 0) transitionToImage(currentIndex - 1);
        if (e.key === 'ArrowRight' && currentIndex < imageSrcs.length - 1) transitionToImage(currentIndex + 1);
    };

    document.removeEventListener('keydown', keyHandler);
    document.addEventListener('keydown', keyHandler);

    // Touch swipe for lightbox with transitions
    let touchStartX = 0;
    const imageContainer = lightbox.querySelector('.lightbox-image-container');

    imageContainer.ontouchstart = (e) => { touchStartX = e.changedTouches[0].screenX; };
    imageContainer.ontouchend = (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < imageSrcs.length - 1) transitionToImage(currentIndex + 1);
            else if (diff < 0 && currentIndex > 0) transitionToImage(currentIndex - 1);
        }
    };

    // Show lightbox
    updateLightbox();
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
}

// Kit Journey Scroller - Mobile horizontal scroll with progress tracking
function initKitJourneyScroller() {
    const wrapper = document.querySelector('.kits-journey-wrapper');
    const grid = document.querySelector('.kits-grid');
    const cards = document.querySelectorAll('.kits-grid .kit-card');
    const dots = document.querySelectorAll('.journey-dot');
    const progressFill = document.querySelector('.journey-progress-fill');
    const kitNumEl = document.querySelector('.current-kit-num');
    const kitNameEl = document.querySelector('.current-kit-name');

    if (!wrapper || !grid || cards.length === 0) return;

    // Kit names for the indicator
    const kitNames = [
        'First Gazes',
        'Tummy Time Discovery',
        'Grasp & Spin',
        'Peek & Find',
        'Stack & Sort',
        'Push & Play'
    ];

    // Only activate on mobile (matches CSS media query)
    const isMobile = () => window.innerWidth <= 768;

    let currentIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    // Update progress indicator based on scroll position
    function updateProgress() {
        if (!isMobile()) return;

        const scrollLeft = grid.scrollLeft;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(grid).gap || 16);
        const firstCardOffset = cards[0].offsetLeft - grid.offsetLeft;

        // Calculate which card is most centered
        const adjustedScroll = scrollLeft + (grid.offsetWidth / 2) - firstCardOffset;
        const newIndex = Math.round(adjustedScroll / cardWidth);
        const clampedIndex = Math.max(0, Math.min(newIndex, cards.length - 1));

        if (clampedIndex !== currentIndex) {
            currentIndex = clampedIndex;
            updateUI();
        }
    }

    // Update all UI elements
    function updateUI() {
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'passed');
            if (index === currentIndex) {
                dot.classList.add('active');
            } else if (index < currentIndex) {
                dot.classList.add('passed');
            }
        });

        // Update cards (active state)
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update progress bar
        if (progressFill) {
            const progress = (currentIndex / (cards.length - 1)) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Update kit name indicator
        if (kitNumEl) kitNumEl.textContent = currentIndex + 1;
        if (kitNameEl) kitNameEl.textContent = kitNames[currentIndex] || '';
    }

    // Scroll to specific card
    function scrollToCard(index) {
        if (!isMobile() || index < 0 || index >= cards.length) return;

        const card = cards[index];
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const gridCenter = grid.offsetWidth / 2;
        const scrollTarget = cardCenter - gridCenter;

        grid.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
        });
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToCard(index);
        });
    });

    // Scroll event listener with debounce
    grid.addEventListener('scroll', () => {
        if (!isMobile()) return;

        // Debounce the progress update
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                updateProgress();
                isScrolling = false;
            });
        }

        // Clear existing timeout
        clearTimeout(scrollTimeout);

        // Final update after scroll ends
        scrollTimeout = setTimeout(() => {
            updateProgress();
        }, 100);
    }, { passive: true });

    // Touch end - snap and update
    grid.addEventListener('touchend', () => {
        if (!isMobile()) return;
        setTimeout(updateProgress, 150);
    }, { passive: true });

    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isMobile()) {
                updateProgress();
                updateUI();
            } else {
                // Reset on desktop
                cards.forEach(card => card.classList.remove('active'));
            }
        }, 200);
    }, { passive: true });

    // Initial state
    if (isMobile()) {
        updateUI();
        cards[0].classList.add('active');
    }
}

// ============================================
// CINEMATIC FINGERPRINT EXPERIENCE
// Auto-playing loop when visible - "The Living Light Show"
// ============================================
function initFingerprintCinema() {
    const fpCinema = document.getElementById('fp-cinema');
    if (!fpCinema) return;

    const sceneNumEl = fpCinema.querySelector('.fp-scene-num');
    const sceneNameEl = fpCinema.querySelector('.fp-scene-name');
    const sceneDescEl = fpCinema.querySelector('.fp-stage-desc');
    const timelineFill = fpCinema.querySelector('.fp-timeline-fill');
    const dots = fpCinema.querySelectorAll('.fp-dot');

    // Act configuration - timing in ms
    // Coherent narrative: Scan the fingerprint, Analyze data, Map connections, Complete Profile
    const acts = [
        { num: '01', name: 'SCAN', desc: 'Capturing unique patterns', duration: 2200 },
        { num: '02', name: 'ANALYZE', desc: 'Discovering interests', duration: 2500 },
        { num: '03', name: 'MAP', desc: 'Connecting the dots', duration: 2800 },
        { num: '04', name: 'PROFILE', desc: 'Your curiosity fingerprint', duration: 6000 }
    ];

    let currentAct = 0;
    let isPlaying = false;
    let animationLoop = null;
    let actTimeout = null;

    // Update the UI for current act
    function setAct(actIndex) {
        currentAct = actIndex;
        const act = acts[actIndex];

        // Update data attribute for CSS animations
        fpCinema.setAttribute('data-act', actIndex + 1);

        // Update scene label
        if (sceneNumEl) sceneNumEl.textContent = act.num;
        if (sceneNameEl) sceneNameEl.textContent = act.name;
        if (sceneDescEl) sceneDescEl.textContent = act.desc;

        // Update timeline progress
        if (timelineFill) {
            const progress = ((actIndex + 1) / acts.length) * 100;
            timelineFill.style.width = `${progress}%`;
        }

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'passed');
            if (i === actIndex) {
                dot.classList.add('active');
            } else if (i < actIndex) {
                dot.classList.add('passed');
            }
        });
    }

    // Advance to next act
    function nextAct() {
        const nextIndex = (currentAct + 1) % acts.length;

        // If looping back to start, reset animations
        if (nextIndex === 0) {
            fpCinema.removeAttribute('data-act');
            // Brief pause before restarting
            setTimeout(() => {
                setAct(0);
                scheduleNextAct();
            }, 300);
        } else {
            setAct(nextIndex);
            scheduleNextAct();
        }
    }

    // Schedule the next act transition
    function scheduleNextAct() {
        if (!isPlaying) return;

        const act = acts[currentAct];
        actTimeout = setTimeout(nextAct, act.duration);
    }

    // Start the cinema loop
    function startCinema() {
        if (isPlaying) return;

        isPlaying = true;
        fpCinema.classList.add('is-playing');

        // Start from act 1
        setAct(0);
        scheduleNextAct();
    }

    // Stop the cinema loop
    function stopCinema() {
        isPlaying = false;
        fpCinema.classList.remove('is-playing');

        if (actTimeout) {
            clearTimeout(actTimeout);
            actTimeout = null;
        }
    }

    // Intersection Observer - play when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                startCinema();
            } else {
                // Keep playing briefly when scrolling past
                // Only stop if really out of view
                if (entry.intersectionRatio < 0.1) {
                    stopCinema();
                }
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1]
    });

    observer.observe(fpCinema);

    // Click on dots to jump to act
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (actTimeout) clearTimeout(actTimeout);
            setAct(index);
            scheduleNextAct();
        });
    });

    // Pause on hover (optional - lets user study the animation)
    // fpCinema.addEventListener('mouseenter', () => {
    //     if (actTimeout) clearTimeout(actTimeout);
    // });
    // fpCinema.addEventListener('mouseleave', () => {
    //     if (isPlaying) scheduleNextAct();
    // });
}
