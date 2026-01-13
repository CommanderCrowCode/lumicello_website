/**
 * Lumicello - Age Progression Timeline Component
 * Interactive timeline showing 6 LumiBox kits for 0-12 months
 *
 * Features:
 * - Horizontal timeline (desktop) / vertical cards (mobile)
 * - Click/tap to expand kit contents
 * - Keyboard navigation (arrow keys, Enter, Escape)
 * - Full ARIA accessibility
 */

// LumiBox Kit Data - 6 developmental stages
const LUMIBOX_KITS = [
    {
        id: 'kit-1',
        ageRange: '0-2 months',
        name: 'First Gazes Kit',
        focus: 'Visual tracking & bonding',
        description: 'Designed for newborns developing their first visual connections. High-contrast patterns and gentle sounds support early sensory development.',
        items: [
            { icon: '🎯', name: 'High-Contrast Cards', desc: 'Black & white patterns for developing vision' },
            { icon: '🔔', name: 'Soft Rattle Ring', desc: 'Gentle sounds to encourage head turning' },
            { icon: '🪞', name: 'Tummy Time Mirror', desc: 'Safe mirror for self-discovery' },
            { icon: '📖', name: 'Parent Guide', desc: 'Activities for the first weeks' }
        ]
    },
    {
        id: 'kit-2',
        ageRange: '3-4 months',
        name: 'Reaching Out Kit',
        focus: 'Grasping & hand-eye coordination',
        description: 'As babies begin to reach and grasp, these materials encourage controlled movements and tactile exploration.',
        items: [
            { icon: '🌈', name: 'Wooden Ring Set', desc: 'Natural rings for grasping practice' },
            { icon: '🧸', name: 'Crinkle Cloth', desc: 'Textured fabric for sensory play' },
            { icon: '🎵', name: 'Bell Ball', desc: 'Rollable ball with gentle chime' },
            { icon: '🖐️', name: 'Textured Cards', desc: 'Touch-and-feel exploration cards' }
        ]
    },
    {
        id: 'kit-3',
        ageRange: '5-6 months',
        name: 'Curious Hands Kit',
        focus: 'Object permanence & cause-effect',
        description: 'Babies are now actively exploring objects. These materials support understanding of how things work and where they go.',
        items: [
            { icon: '📦', name: 'Peek-a-Boo Box', desc: 'Introduces object permanence concept' },
            { icon: '🥄', name: 'Stacking Cups', desc: 'Nesting and stacking exploration' },
            { icon: '🔵', name: 'Spinning Drum', desc: 'Cause-effect through spinning' },
            { icon: '🧩', name: 'Shape Sorter Start', desc: 'Simple shapes, single holes' }
        ]
    },
    {
        id: 'kit-4',
        ageRange: '7-8 months',
        name: 'Little Mover Kit',
        focus: 'Crawling support & spatial awareness',
        description: 'Designed for babies on the move. Encourages crawling, reaching, and understanding space.',
        items: [
            { icon: '🏀', name: 'Chase Ball', desc: 'Slow-rolling ball for crawling motivation' },
            { icon: '🧱', name: 'Soft Blocks', desc: 'Lightweight blocks for stacking' },
            { icon: '🚗', name: 'Push Toy', desc: 'Simple vehicle for pushing play' },
            { icon: '🎪', name: 'Tunnel Tent', desc: 'Collapsible crawl-through tunnel' }
        ]
    },
    {
        id: 'kit-5',
        ageRange: '9-10 months',
        name: 'Problem Solver Kit',
        focus: 'Early problem-solving & fine motor',
        description: 'As cognitive skills develop, babies enjoy figuring things out. These materials present gentle challenges.',
        items: [
            { icon: '🎯', name: 'Stacking Rings', desc: 'Classic ring stacking toy' },
            { icon: '📍', name: 'Peg Board', desc: 'Large pegs for placement practice' },
            { icon: '📚', name: 'Lift-the-Flap Book', desc: 'Interactive discovery pages' },
            { icon: '🎹', name: 'Music Buttons', desc: 'Press buttons for sounds' }
        ]
    },
    {
        id: 'kit-6',
        ageRange: '10-12 months',
        name: 'First Steps Kit',
        focus: 'Pre-walking & language development',
        description: 'Supporting the transition to toddlerhood with materials that encourage standing, walking, and first words.',
        items: [
            { icon: '🚶', name: 'Push Walker', desc: 'Sturdy walker for first steps' },
            { icon: '🗣️', name: 'Word Cards', desc: 'First vocabulary picture cards' },
            { icon: '🎨', name: 'Chunky Crayons', desc: 'First mark-making tools' },
            { icon: '🧸', name: 'Nesting Dolls', desc: 'Simple nesting figures' }
        ]
    }
];

/**
 * Initialize the Age Progression Timeline
 */
class AgeProgressionTimeline {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.warn('Age Timeline: Container not found:', containerSelector);
            return;
        }

        this.activeIndex = null;
        this.milestones = [];

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.setupKeyboardNavigation();
    }

    render() {
        const html = `
            <div class="age-timeline" role="region" aria-label="LumiBox developmental timeline">
                <div class="age-timeline__track" role="tablist" aria-label="Select age range">
                    <div class="age-timeline__line" aria-hidden="true"></div>
                    ${LUMIBOX_KITS.map((kit, index) => this.renderMilestone(kit, index)).join('')}
                </div>
                <div class="age-timeline__panel-wrapper">
                    <div class="age-timeline__panel"
                         role="tabpanel"
                         aria-labelledby="milestone-0"
                         id="timeline-panel">
                        ${this.renderPanelContent(LUMIBOX_KITS[0])}
                    </div>
                </div>
            </div>
        `;
        this.container.innerHTML = html;

        this.milestones = this.container.querySelectorAll('.age-timeline__milestone');
        this.panel = this.container.querySelector('.age-timeline__panel');
    }

    renderMilestone(kit, index) {
        return `
            <button class="age-timeline__milestone"
                    role="tab"
                    id="milestone-${index}"
                    aria-selected="false"
                    aria-controls="timeline-panel"
                    tabindex="${index === 0 ? '0' : '-1'}"
                    data-index="${index}">
                <div class="age-timeline__dot" aria-hidden="true">
                    <div class="age-timeline__dot-inner"></div>
                </div>
                <span class="age-timeline__badge">${kit.ageRange}</span>
                <div class="age-timeline__info">
                    <div class="age-timeline__kit-name">${kit.name}</div>
                    <div class="age-timeline__focus">${kit.focus}</div>
                </div>
                <div class="age-timeline__thumbnail" aria-hidden="true">
                    <div style="width:100%;height:100%;background:var(--color-bg-sage);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">
                        📦
                    </div>
                </div>
            </button>
        `;
    }

    renderPanelContent(kit) {
        return `
            <button class="age-timeline__close"
                    aria-label="Close kit details"
                    type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <div class="age-timeline__panel-header">
                <div class="age-timeline__panel-image" aria-hidden="true">
                    <div style="width:100%;height:100%;background:var(--color-bg-sage);display:flex;align-items:center;justify-content:center;font-size:3rem;">
                        📦
                    </div>
                </div>
                <div>
                    <h3 class="age-timeline__panel-title">${kit.name}</h3>
                    <div class="age-timeline__panel-subtitle">${kit.ageRange}</div>
                    <p class="age-timeline__panel-description">${kit.description}</p>
                </div>
            </div>
            <div class="age-timeline__contents">
                ${kit.items.map(item => `
                    <div class="age-timeline__item">
                        <div class="age-timeline__item-icon" aria-hidden="true">${item.icon}</div>
                        <div class="age-timeline__item-content">
                            <div class="age-timeline__item-name">${item.name}</div>
                            <div class="age-timeline__item-desc">${item.desc}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    bindEvents() {
        // Milestone click handlers
        this.milestones.forEach((milestone, index) => {
            milestone.addEventListener('click', () => this.selectMilestone(index));
        });

        // Panel close button
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.age-timeline__close')) {
                this.closePanel();
            }
        });
    }

    setupKeyboardNavigation() {
        this.container.addEventListener('keydown', (e) => {
            const focusedMilestone = document.activeElement;
            if (!focusedMilestone?.classList.contains('age-timeline__milestone')) {
                return;
            }

            const currentIndex = parseInt(focusedMilestone.dataset.index);
            let newIndex;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    newIndex = (currentIndex + 1) % LUMIBOX_KITS.length;
                    this.focusMilestone(newIndex);
                    break;

                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    newIndex = currentIndex === 0 ? LUMIBOX_KITS.length - 1 : currentIndex - 1;
                    this.focusMilestone(newIndex);
                    break;

                case 'Home':
                    e.preventDefault();
                    this.focusMilestone(0);
                    break;

                case 'End':
                    e.preventDefault();
                    this.focusMilestone(LUMIBOX_KITS.length - 1);
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.selectMilestone(currentIndex);
                    break;

                case 'Escape':
                    if (this.activeIndex !== null) {
                        e.preventDefault();
                        this.closePanel();
                    }
                    break;
            }
        });
    }

    focusMilestone(index) {
        // Update tabindex for roving tabindex pattern
        this.milestones.forEach((m, i) => {
            m.setAttribute('tabindex', i === index ? '0' : '-1');
        });
        this.milestones[index].focus();
    }

    selectMilestone(index) {
        // Toggle if already active
        if (this.activeIndex === index) {
            this.closePanel();
            return;
        }

        // Update active states
        this.milestones.forEach((m, i) => {
            const isActive = i === index;
            m.classList.toggle('is-active', isActive);
            m.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update panel
        this.activeIndex = index;
        this.panel.innerHTML = this.renderPanelContent(LUMIBOX_KITS[index]);
        this.panel.classList.add('is-open');
        this.panel.setAttribute('aria-labelledby', `milestone-${index}`);

        // Scroll panel into view on mobile
        if (window.innerWidth <= 968) {
            setTimeout(() => {
                this.panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }

        // Announce to screen readers
        this.announceToScreenReader(`${LUMIBOX_KITS[index].name} selected. ${LUMIBOX_KITS[index].description}`);
    }

    closePanel() {
        this.panel.classList.remove('is-open');

        if (this.activeIndex !== null) {
            this.milestones[this.activeIndex].classList.remove('is-active');
            this.milestones[this.activeIndex].setAttribute('aria-selected', 'false');
            this.milestones[this.activeIndex].focus();
        }

        this.activeIndex = null;
        this.announceToScreenReader('Kit details closed');
    }

    announceToScreenReader(message) {
        // Use live region for screen reader announcements
        let liveRegion = document.getElementById('timeline-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'timeline-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize on any page with the timeline container
    const timelineContainer = document.getElementById('age-timeline-container');
    if (timelineContainer) {
        window.ageTimeline = new AgeProgressionTimeline('#age-timeline-container');
    }
});

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AgeProgressionTimeline, LUMIBOX_KITS };
}
