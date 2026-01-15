/**
 * LumiBox Scrollytelling JavaScript
 * "Growing Together" - A Two-Year Journey
 *
 * Handles:
 * - Intersection Observer for reveal animations
 * - Scroll progress tracking
 * - Tree growth animation (placeholder for SVG)
 * - Confetti animation on birthday section
 * - Smooth scrolling for navigation
 */

(function() {
    'use strict';

    // ========================================
    // Configuration
    // ========================================
    const CONFIG = {
        revealThreshold: 0.15,
        revealRootMargin: '0px 0px -50px 0px',
        treeGrowthStart: 0.1,
        treeGrowthEnd: 0.9,
        confettiCount: 50,
        smoothScrollDuration: 800
    };

    // ========================================
    // Utility Functions
    // ========================================

    /**
     * Debounce function for scroll events
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function for frequent events
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Linear interpolation
     */
    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }

    /**
     * Clamp value between min and max
     */
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    // ========================================
    // Reveal Animations (Intersection Observer)
    // ========================================

    class RevealAnimator {
        constructor() {
            this.observedElements = new Set();
            this.setupObserver();
            this.observeElements();
        }

        setupObserver() {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: CONFIG.revealThreshold,
                    rootMargin: CONFIG.revealRootMargin
                }
            );
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optionally unobserve after reveal (one-time animation)
                    // this.observer.unobserve(entry.target);
                }
            });
        }

        observeElements() {
            const revealElements = document.querySelectorAll(
                '.reveal, .reveal-left, .reveal-right, .reveal-scale'
            );

            revealElements.forEach(el => {
                this.observer.observe(el);
                this.observedElements.add(el);
            });
        }

        // For dynamically added elements
        observe(element) {
            if (!this.observedElements.has(element)) {
                this.observer.observe(element);
                this.observedElements.add(element);
            }
        }
    }

    // ========================================
    // Tree Growth Animation (Video Scroll-Scrub)
    // ========================================

    class TreeGrowthAnimator {
        constructor() {
            this.treeSection = document.querySelector('.scroll-tree');
            this.video = document.getElementById('treeVideo');

            if (!this.treeSection || !this.video) {
                console.log('[LumiBox] Tree video not found, skipping scroll-scrub');
                return;
            }

            this.videoDuration = 0;
            this.isReady = false;

            this.setupVideo();
        }

        setupVideo() {
            // Wait for video metadata to load
            this.video.addEventListener('loadedmetadata', () => {
                this.videoDuration = this.video.duration;
                this.isReady = true;
                this.video.currentTime = 0;
                console.log(`[LumiBox] Tree video ready, duration: ${this.videoDuration}s`);
                this.setupScrollTracking();
            });

            // Fallback if already loaded
            if (this.video.readyState >= 1) {
                this.videoDuration = this.video.duration;
                this.isReady = true;
                this.video.currentTime = 0;
                this.setupScrollTracking();
            }

            // Mobile: Wake up video on first user interaction
            this.wakeUpMobile();
        }

        wakeUpMobile() {
            const wakeUp = () => {
                // Play and immediately pause to "unlock" video on mobile
                const playPromise = this.video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.video.pause();
                        this.video.currentTime = 0;
                        console.log('[LumiBox] Video unlocked for mobile');
                    }).catch(err => {
                        console.log('[LumiBox] Video play blocked:', err);
                    });
                }
                // Remove listeners after first interaction
                document.removeEventListener('touchstart', wakeUp);
                document.removeEventListener('click', wakeUp);
                document.removeEventListener('scroll', wakeUp);
            };

            document.addEventListener('touchstart', wakeUp, { once: true, passive: true });
            document.addEventListener('click', wakeUp, { once: true });
            document.addEventListener('scroll', wakeUp, { once: true, passive: true });
        }

        setupScrollTracking() {
            // Use scroll event with rAF for smooth scrubbing (no throttle)
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.updateVideoTime();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            this.updateVideoTime(); // Initial call
        }

        updateVideoTime() {
            if (!this.isReady) return;

            const videoRect = this.video.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight / 2;

            // Progress: 0 when video top enters viewport (bottom of screen)
            //           1 when video center reaches viewport center
            const videoTop = videoRect.top;
            const videoCenter = videoTop + (videoRect.height / 2);

            // Start: videoTop = viewportHeight (just entering)
            // End: videoCenter = viewportCenter (centered)
            const startPoint = viewportHeight;
            const endPoint = viewportCenter;

            let progress = (startPoint - videoTop) / (startPoint - endPoint + (videoRect.height / 2));
            progress = clamp(progress, 0, 1);

            // Map progress to video time and set directly (already in rAF)
            this.video.currentTime = progress * this.videoDuration;
        }
    }

    // ========================================
    // Confetti Animation
    // ========================================

    class ConfettiAnimator {
        constructor() {
            this.birthdaySection = document.querySelector('.birthday-section');
            this.confettiContainer = document.querySelector('.confetti-container');

            if (!this.birthdaySection || !this.confettiContainer) return;

            this.isPlaying = false;
            this.setupObserver();
        }

        setupObserver() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.isPlaying) {
                            this.play();
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(this.birthdaySection);
        }

        play() {
            this.isPlaying = true;

            // Generate additional confetti pieces dynamically
            const colors = [
                'var(--phase-1-primary)',
                'var(--phase-2-primary)',
                'var(--phase-3-primary)',
                'var(--phase-4-primary)',
                'var(--phase-5-primary)',
                'var(--phase-6-primary)',
                'var(--domain-music-primary)',
                'var(--domain-math-primary)',
                'var(--domain-color-primary)',
                'var(--domain-alphabet-primary)'
            ];

            for (let i = 0; i < CONFIG.confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                    animation: confetti-fall-dynamic ${Math.random() * 3 + 2}s ease-out forwards;
                    animation-delay: ${Math.random() * 2}s;
                `;

                this.confettiContainer.appendChild(confetti);

                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }

            // Reset after animation cycle
            setTimeout(() => {
                this.isPlaying = false;
            }, 6000);
        }
    }

    // Add dynamic confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall-dynamic {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ========================================
    // Smooth Scroll Navigation
    // ========================================

    class SmoothScroller {
        constructor() {
            this.setupScrollLinks();
            this.setupScrollIndicator();
        }

        setupScrollLinks() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        this.scrollTo(target);
                    }
                });
            });
        }

        setupScrollIndicator() {
            const indicator = document.querySelector('.scroll-indicator');
            if (!indicator) return;

            indicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.tree-section') ||
                                   document.querySelector('.phase-section');
                if (nextSection) {
                    this.scrollTo(nextSection);
                }
            });
        }

        scrollTo(target, offset = 0) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ========================================
    // Domain Orb Interactions
    // ========================================

    class DomainOrbs {
        constructor() {
            this.orbs = document.querySelectorAll('.domain-orb');
            this.setupInteractions();
        }

        setupInteractions() {
            this.orbs.forEach(orb => {
                orb.addEventListener('click', () => {
                    const domain = orb.dataset.domain;
                    const targetSection = document.querySelector(`.domain-section[data-domain="${domain}"]`);

                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }
    }

    // ========================================
    // Phase Progress Indicator
    // ========================================

    class PhaseProgressIndicator {
        constructor() {
            this.phases = document.querySelectorAll('.phase-section');
            if (this.phases.length === 0) return;

            this.createIndicator();
            this.setupScrollTracking();
        }

        createIndicator() {
            // Create progress indicator element
            this.indicator = document.createElement('div');
            this.indicator.className = 'phase-progress-indicator';
            this.indicator.innerHTML = `
                <div class="phase-progress-track">
                    <div class="phase-progress-fill"></div>
                </div>
                <div class="phase-progress-dots"></div>
            `;

            // Add dots for each phase
            const dotsContainer = this.indicator.querySelector('.phase-progress-dots');
            this.phases.forEach((phase, index) => {
                const dot = document.createElement('div');
                dot.className = 'phase-progress-dot';
                dot.dataset.phase = phase.dataset.phase;
                dotsContainer.appendChild(dot);
            });

            document.body.appendChild(this.indicator);

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .phase-progress-indicator {
                    position: fixed;
                    right: var(--space-lg);
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: var(--z-sticky);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--space-xs);
                    opacity: 0;
                    transition: opacity var(--duration-normal) var(--ease-out);
                }

                .phase-progress-indicator.visible {
                    opacity: 1;
                }

                .phase-progress-track {
                    width: 4px;
                    height: 200px;
                    background: var(--color-border-subtle);
                    border-radius: var(--radius-pill);
                    overflow: hidden;
                }

                .phase-progress-fill {
                    width: 100%;
                    height: 0%;
                    background: var(--color-primary);
                    transition: height var(--duration-fast) var(--ease-out);
                }

                .phase-progress-dots {
                    position: absolute;
                    top: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 200px;
                    padding: var(--space-xs) 0;
                }

                .phase-progress-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--color-bg-main);
                    border: 2px solid var(--color-border-medium);
                    transition: all var(--duration-fast) var(--ease-out);
                }

                .phase-progress-dot.active {
                    background: var(--color-primary);
                    border-color: var(--color-primary);
                    transform: scale(1.2);
                }

                @media (max-width: 768px) {
                    .phase-progress-indicator {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setupScrollTracking() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        const phaseNum = entry.target.dataset.phase;
                        const dot = this.indicator.querySelector(`.phase-progress-dot[data-phase="${phaseNum}"]`);

                        if (entry.isIntersecting) {
                            dot?.classList.add('active');
                            this.indicator.classList.add('visible');
                        } else {
                            dot?.classList.remove('active');
                        }
                    });

                    // Hide indicator if no phases visible
                    const anyVisible = Array.from(this.phases).some(phase => {
                        const rect = phase.getBoundingClientRect();
                        return rect.top < window.innerHeight && rect.bottom > 0;
                    });

                    if (!anyVisible) {
                        this.indicator.classList.remove('visible');
                    }
                },
                { threshold: 0.3 }
            );

            this.phases.forEach(phase => observer.observe(phase));
        }
    }

    // ========================================
    // Initialize Everything
    // ========================================

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initComponents);
        } else {
            initComponents();
        }
    }

    function initComponents() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize components
        new RevealAnimator();
        new SmoothScroller();
        new DomainOrbs();

        // Only initialize animated components if not reduced motion
        if (!prefersReducedMotion) {
            new TreeGrowthAnimator();
            new ConfettiAnimator();
            new PhaseProgressIndicator();
        }

        // Log initialization
        console.log('[LumiBox Scroll] Initialized');
    }

    // Start
    init();

})();
