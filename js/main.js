(function(window, document) {
    'use strict';

    // Create a main application object
    const CosmiQLabsWebsite = {};

    /**
     * Initializes sticky header behavior
     */
    CosmiQLabsWebsite.initStickyHeader = function() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    /**
     * Initializes mobile hamburger menu
     */
    CosmiQLabsWebsite.initMobileMenu = function() {
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('main-nav');
        if (!hamburger || !nav) return;

        hamburger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    };

    /**
     * Initializes ScrollSpy for active nav link highlighting
     */
    CosmiQLabsWebsite.initScrollSpy = function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#main-nav a');
        if (sections.length === 0 || navLinks.length === 0) return;

        const headerOffset = 100; // Height of sticky header + buffer

        const activateLink = (id) => {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active-link');
                }
            });
        };

        const onScroll = () => {
            let currentSection = '';
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - headerOffset) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Special case for hero
            if (scrollY < sections[0].offsetTop - headerOffset) {
                currentSection = sections[0].getAttribute('id');
            }

            if (currentSection) {
                activateLink(currentSection);
            }
        };

        window.addEventListener('scroll', onScroll);
        onScroll(); // Run once on load
    };

    /**
     * Initializes the 'X' symbol generator for the hero background
     */
    CosmiQLabsWebsite.initSymbolGenerator = function() {
        const xOverlay = document.querySelector('.x-overlay-container');
        if (!xOverlay) return;

        const colors = [
            'var(--vibrant-orange)',
            'var(--dark-orange)',
            'var(--vibrant-red)', 
            'var(--dark-red)', 
            'var(--darker-blue)',
            'var(--dark-violet)', 
            'var(--dark-slate)',
            'var(--light-text)'
        ];
        const numSymbols = 100;

        for (let i = 0; i < numSymbols; i++) {
            const el = document.createElement('span');
            el.classList.add('x-symbol');
            
            // Set symbol
            const symbolType = i % 3;
            if (symbolType === 0) el.innerHTML = 'X';
            else if (symbolType === 1) el.innerHTML = '*';
            else el.innerHTML = 'O';
            
            // Set styles
            el.style.top = `${Math.random() * 100}%`;
            el.style.left = `${Math.random() * 100}%`;
            el.style.color = colors[Math.floor(Math.random() * colors.length)];
            el.style.animationDelay = `${Math.random() * 10}s`;
            el.style.fontSize = `${Math.random() * 14 + 12}px`; // 12px to 26px

            xOverlay.appendChild(el);
        }
    };

    
    /**
     * Initializes the scrolling image background for the About section
     */
    CosmiQLabsWebsite.initScrollingBackground = function() {
        const bgContainer = document.getElementById('about-bg');
        if (!bgContainer) return;

        const imageUrls = [
            'assets/images/scrollbg/1.jpg', 'assets/images/scrollbg/2.jpg', 'assets/images/scrollbg/3.jpg',
            'assets/images/scrollbg/4.jpg', 'assets/images/scrollbg/5.jpg', 'assets/images/scrollbg/6.jpg',
            'assets/images/scrollbg/7.jpg', 'assets/images/scrollbg/8.jpg', 'assets/images/scrollbg/9.jpg',
            'assets/images/scrollbg/10.jpg','assets/images/scrollbg/11.jpg','assets/images/scrollbg/12.jpg',
            'assets/images/scrollbg/13.jpg','assets/images/scrollbg/14.jpg','assets/images/scrollbg/15.jpg',
            'assets/images/scrollbg/16.jpg','assets/images/scrollbg/17.jpg','assets/images/scrollbg/18.jpg',
            'assets/images/scrollbg/19.jpg'
        ];
        
        const numColumns = 8; // Increased columns for fuller screen coverage
        const imagesPerColumn = 15; // Adjust based on image height and screen size
        
        // More varied speeds
        const speeds = [
            'scroll-slow', 'scroll-medium', 'scroll-fast', 'scroll-xfast',
            'scroll-slow', 'scroll-medium', 'scroll-fast', 'scroll-xfast'
        ];

        // Theme colors for glow
        const glowColors = [
            'glow-primary', 'glow-secondary', 'glow-red', 'glow-orange', 
            'glow-violet', 'glow-darker-blue', 'glow-light', 'glow-primary'
        ];

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            
            // Assign speed and glow class
            const speedClass = speeds[i % speeds.length];
            const glowClass = glowColors[i % glowColors.length];
            column.className = `bg-column ${speedClass} ${glowClass}`;
            // Randomize starting point so each column begins at a different offset
            // Use a negative animationDelay so the animation appears already partway through
            // const randomOffset = Math.random() * 80; // seconds
            // column.style.animationDelay = `-${randomOffset}s`;

            // Create the first set of images
            for (let j = 0; j < imagesPerColumn; j++) {
                const img = document.createElement('img');
                img.src = imageUrls[j % imageUrls.length];
                img.alt = 'ESG Snapshot';
                column.appendChild(img);
            }
            
            // Create seamless loop by cloning
            for (let j = 0; j < imagesPerColumn; j++) {
                const imgClone = column.children[j].cloneNode(true);
                column.appendChild(imgClone);
            }

            bgContainer.appendChild(column);
        }
    };

    /**
     * (NEW) Initializes the animated counters for the impact section
     */
    CosmiQLabsWebsite.initCounterAnimation = function() {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;

        const duration = 2000; // Animate over 2 seconds

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target'); // Get target and convert to number
            const startTime = Date.now();

            const updateCount = () => {
                const now = Date.now();
                const progress = Math.min(1, (now - startTime) / duration); // Value between 0 and 1
                
                const value = Math.floor(progress * target); // Calculate current value
                
                // Format with commas (e.g., 120,000)
                counter.innerText = value.toLocaleString(); 

                if (progress < 1) {
                    requestAnimationFrame(updateCount); // Continue animation
                } else {
                    counter.innerText = target.toLocaleString(); // Ensure final value is exact
                }
            };
            requestAnimationFrame(updateCount);
        };

        // Use IntersectionObserver to start animation only when visible
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter); // Animate only once
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the element is visible
        });

        // Observe each counter
        counters.forEach(counter => {
            observer.observe(counter);
        });
    };

    
    /**
     * Main initialization function (CONSOLIDATED & FIXED)
     */
    CosmiQLabsWebsite.init = function() {
        console.log('CosmIQ Labs website initializing...');
        this.initStickyHeader();
        this.initMobileMenu();
        this.initScrollSpy();
        this.initSymbolGenerator();
        this.initScrollingBackground();
        this.initCounterAnimation(); // <-- Added the new function call
        console.log('Initialization complete.');
    };

    // Run the app once the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        CosmiQLabsWebsite.init();
    });

})(window, document);