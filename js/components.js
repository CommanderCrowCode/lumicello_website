/**
 * Lumicello - Shared Components
 * Provides reusable header and footer components for all pages
 */

// Configuration for navigation links
const NAV_LINKS = [
    { href: 'index.html#platform', text: 'Platform' },
    { href: 'index.html#fingerprint', text: 'Curiosity Fingerprint' },
    { href: 'index.html#kits', text: 'Exploration Kits' },
    { href: 'index.html#about', text: 'About' }
];

// Configuration for footer links
const FOOTER_LINKS = {
    product: [
        { href: 'index.html#platform', text: 'Platform' },
        { href: 'index.html#fingerprint', text: 'Curiosity Fingerprint' },
        { href: 'index.html#kits', text: 'Exploration Kits' },
        { href: '#', text: 'For Educators' }
    ],
    company: [
        { href: 'index.html#about', text: 'About Us' },
        { href: '#', text: 'Our Mission' },
        { href: '#', text: 'Careers' },
        { href: '#', text: 'Press' }
    ],
    support: [
        { href: '#', text: 'Help Center' },
        { href: 'contact.html', text: 'Contact Us' },
        { href: 'privacy.html', text: 'Privacy Policy' },
        { href: 'terms.html', text: 'Terms of Service' }
    ]
};

// Social links configuration
const SOCIAL_LINKS = {
    facebook: 'https://web.facebook.com/LumicelloGroup',
    line: 'https://lin.ee/eH1GxA5'
};

/**
 * Generate the navigation HTML
 * @returns {string} Navigation HTML
 */
function generateNavigation() {
    const navLinksHTML = NAV_LINKS.map(link =>
        `<li><a href="${link.href}">${link.text}</a></li>`
    ).join('\n                ');

    return `
    <nav class="nav-wrapper">
        <div class="nav-container">
            <a href="index.html" class="logo">
                <img src="assets/images/lumicello_logo.webp" alt="Lumicello" class="logo-image">
            </a>

            <ul class="nav-links">
                ${navLinksHTML}
            </ul>

            <div class="nav-actions">
                <a href="index.html#community" class="btn btn-secondary">Join Community</a>
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
    return links.map(link =>
        `<li><a href="${link.href}">${link.text}</a></li>`
    ).join('\n                        ');
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
                        <img src="assets/images/lumicello_logo.webp" alt="Lumicello" class="logo-image">
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
                    <a href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </a>
                    <a href="${SOCIAL_LINKS.line}" target="_blank" rel="noopener" aria-label="LINE">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755z"/>
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
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadSharedComponents);
