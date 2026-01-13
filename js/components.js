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
const getHref = anchor => (isHomepage ? anchor : `index.html${anchor}`);

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
        { href: 'careers.html', text: 'Careers' },
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
const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/lumicello.th',
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
            <a href="index.html" class="logo">
                <img src="assets/images/lumicello_logo.webp" alt="Lumicello" class="logo-image" width="977" height="333" fetchpriority="high">
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
            const href = link.anchor ? getHref(link.anchor) : link.href;
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
                    <a href="index.html" class="logo">
                        <img src="assets/images/lumicello_logo.webp" alt="Lumicello" class="logo-image" width="977" height="333" loading="lazy">
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
                    <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
