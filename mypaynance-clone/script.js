document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Navbar Behavior ===
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting
        highlightActiveSection();
    });

    // === Mobile Menu Toggle ===
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('.nav-item');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

    // === Smooth Scrolling for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if(anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElem = document.getElementById(targetId);
            
            if (targetElem) {
                // Adjust for sticky header height (72px approx)
                const offsetTop = targetElem.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Active Section Highlighting ===
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    function highlightActiveSection() {
        let scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Get offset, minding the fixed header
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // === Tabs Functionality ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find target pane and activate it
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // === Inline Form & CTA Logic ===
    const inlineLeadForm = document.getElementById('inlineLeadForm');

    // Attach to global window object so onclick handlers in HTML can use it
    window.openModal = function() {
        const getStartedSection = document.getElementById('get-started');
        if(getStartedSection) {
            // Get slightly offset to not hide the title under the sticky nav
            const offsetTop = getStartedSection.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Form Submission Handler
    if (inlineLeadForm) {
        inlineLeadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock processing state
            const submitBtn = inlineLeadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Demo Mode: Thank you! A financing specialist will contact you shortly.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                lucide.createIcons();
                inlineLeadForm.reset();
            }, 1000);
        });
    }
    // === US Healthcare Finance Phone Plans Selection ===
    const cpPlanCards = document.querySelectorAll('.cp-plan-card');
    cpPlanCards.forEach(card => {
        card.addEventListener('click', () => {
            cpPlanCards.forEach(c => {
                c.classList.remove('active');
                const radio = c.querySelector('.cp-plan-radio');
                if (radio) radio.classList.add('empty');
            });
            card.classList.add('active');
            const radio = card.querySelector('.cp-plan-radio');
            if (radio) radio.classList.remove('empty');
        });
    });

    // === US Healthcare Finance Features Accordion ===
    const cpFeatures = document.querySelectorAll('.cp-feature-item');
    cpFeatures.forEach(feature => {
        feature.addEventListener('click', () => {
            cpFeatures.forEach(f => f.classList.remove('active'));
            feature.classList.add('active');
        });
    });
});
