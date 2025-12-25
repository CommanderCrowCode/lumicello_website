/**
 * Lumicello - Shared Components
 * Provides reusable header and footer components for all pages
 */

// Detect if we're on the homepage
const isHomepage =
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/') ||
    window.location.pathname === '';

// Helper to get correct href based on current page
const getHref = anchor => (isHomepage ? anchor : `/${anchor}`);

// Configuration for navigation links
const NAV_LINKS = [
    { anchor: '#platform', text: 'Platform' },
    { anchor: '#fingerprint', text: 'Curiosity Fingerprint' },
    { anchor: '#kits', text: 'LumiBox' },
    { anchor: '#about', text: 'About' },
];

// Configuration for footer links
const FOOTER_LINKS = {
    product: [
        { anchor: '#platform', text: 'Platform' },
        { anchor: '#fingerprint', text: 'Curiosity Fingerprint' },
        { anchor: '#kits', text: 'LumiBox' },
        { href: 'coming-soon.html', text: 'For Educators' },
    ],
    company: [
        { anchor: '#about', text: 'About Us' },
        { href: 'coming-soon.html', text: 'Our Mission' },
        { href: 'coming-soon.html', text: 'Careers' },
        { href: 'coming-soon.html', text: 'Press' },
    ],
    support: [
        { href: 'coming-soon.html', text: 'Help Center' },
        { href: 'contact.html', text: 'Contact Us' },
        { href: 'privacy.html', text: 'Privacy Policy' },
        { href: 'terms.html', text: 'Terms of Service' },
    ],
};

// Social links configuration
// Note: Facebook has two links - Page for support/footer, Group for community/engagement
const SOCIAL_LINKS = {
    facebookPage: 'https://web.facebook.com/LumicelloCompany/', // Company page - for footer, contact, support
    facebookGroup: 'https://web.facebook.com/share/g/1ByigscXwU/', // Community group - for engagement
    line: 'https://lin.ee/eH1GxA5',
};

/**
 * Generate the navigation HTML
 * @returns {string} Navigation HTML
 */
function generateNavigation() {
    const navLinksHTML = NAV_LINKS.map(
        link => `<li><a href="${getHref(link.anchor)}">${link.text}</a></li>`
    ).join('\n                ');

    const communityHref = getHref('#community');

    return `
    <nav class="nav-wrapper">
        <div class="nav-container">
            <a href="/" class="logo">
                <img src="/assets/images/lumicello_logo.webp" alt="Lumicello" class="logo-image">
            </a>

            <ul class="nav-links">
                ${navLinksHTML}
            </ul>

            <div class="nav-actions">
                <a href="${communityHref}" class="btn btn-secondary nav-cta">Join Community</a>
                <div class="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>`;
}

/**
 * Generate footer links HTML for a category
 * @param {Array} links - Array of link objects
 * @returns {string} Links HTML
 */
function generateFooterLinks(links) {
    return links
        .map(link => {
            // Use absolute paths for all links
            const href = link.anchor ? getHref(link.anchor) : `/${link.href}`;
            return `<li><a href="${href}">${link.text}</a></li>`;
        })
        .join('\n                        ');
}

/**
 * Generate the footer HTML
 * @returns {string} Footer HTML
 */
function generateFooter() {
    return `
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="/" class="logo">
                        <img src="/assets/images/lumicello_logo.webp" alt="Lumicello" class="logo-image">
                    </a>
                    <p class="footer-tagline">Every child has a light inside. We help it shine.</p>
                </div>

                <div class="footer-column">
                    <h4>Product</h4>
                    <ul class="footer-links">
                        ${generateFooterLinks(FOOTER_LINKS.product)}
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Company</h4>
                    <ul class="footer-links">
                        ${generateFooterLinks(FOOTER_LINKS.company)}
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Support</h4>
                    <ul class="footer-links">
                        ${generateFooterLinks(FOOTER_LINKS.support)}
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="footer-copyright">&copy; ${new Date().getFullYear()} Lumicello. All rights reserved.</p>
                <div class="footer-social">
                    <a href="${SOCIAL_LINKS.facebookPage}" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </a>
                    <a href="${SOCIAL_LINKS.line}" target="_blank" rel="noopener" aria-label="LINE">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>`;
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

/**
 * Initialize nav scroll behavior
 * Adds 'scrolled' class to nav-wrapper when user scrolls down
 */
function initNavScroll() {
    const navWrapper = document.querySelector('.nav-wrapper');

    if (navWrapper) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navWrapper.classList.add('scrolled');
            } else {
                navWrapper.classList.remove('scrolled');
            }
        };

        // Check initial scroll position
        handleScroll();

        // Listen for scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

/**
 * Load shared components into the page
 * Call this function after DOM is ready
 */
function loadSharedComponents() {
    // Find placeholder elements
    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Insert navigation if placeholder exists
    if (navPlaceholder) {
        navPlaceholder.outerHTML = generateNavigation();
    }

    // Insert footer if placeholder exists
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = generateFooter();
    }

    // Initialize mobile menu after components are loaded
    initMobileMenu();

    // Initialize nav scroll behavior
    initNavScroll();
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadSharedComponents);
