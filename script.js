// Main JavaScript for LMS FinTax Website

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ENHANCED NAVBAR FUNCTIONALITY ==========
    const navbar = document.querySelector('.navbar');
    
    // Add scroll indicator and sticky header
    window.addEventListener('scroll', function() {
        // Scroll progress indicator
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Sticky header
        if (window.pageYOffset > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // ========== ENHANCED MOBILE NAVIGATION TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Mobile menu toggle with animation
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        mobileNav.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) && 
            mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== FADE IN ANIMATIONS ==========
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered delay for multiple elements
                const delay = entry.target.style.animationDelay || '0s';
                entry.target.style.animationDelay = delay;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // ========== ANIMATED COUNTERS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = countTo / (duration / 16); // 60fps
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= countTo) {
                        target.textContent = countTo + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, 16);
                
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });
    
    // ========== ENHANCED SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ========== ENHANCED ACTIVE NAV LINK HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        // Update desktop nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Use throttled scroll for better performance
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    
    // ========== ADD GET STARTED BUTTON TO DESKTOP NAV ==========
    function addWhatsAppButtonToNav() {
        const navLinksContainer = document.querySelector('.nav-links');
        if (!navLinksContainer) return;
        
        const existingWhatsAppBtn = navLinksContainer.querySelector('.whatsapp-btn');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (!existingWhatsAppBtn && window.innerWidth > 1024 && mobileMenuBtn) {
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = "https://wa.me/919999999999?text=Hi%20LMS%20FinTax,%20I%20need%20accounting%20services";
            whatsappBtn.target = "_blank";
            whatsappBtn.className = "whatsapp-btn nav-link";
            whatsappBtn.textContent = "Get Started";
            whatsappBtn.style.marginLeft = "1rem";
            
            navLinksContainer.insertBefore(whatsappBtn, mobileMenuBtn);
        }
    }
    
    // Call on load and resize
    window.addEventListener('load', addWhatsAppButtonToNav);
    window.addEventListener('resize', addWhatsAppButtonToNav);
    
    // ========== FORM SUBMISSION HANDLING ==========
    const serviceButtons = document.querySelectorAll('.service-btn[href*="docs.google.com"]');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href').includes('form')) {
                e.preventDefault();
                // Show a modal or redirect to a contact form
                alert('Please contact us via WhatsApp for this service. We will guide you through the process.');
                window.open('https://wa.me/919999999999?text=Hi%20LMS%20FinTax,%20I%20need%20help%20with%20your%20services', '_blank');
            }
        });
    });
    
    // ========== REVIEWS SLIDER/CAROUSEL ==========
    const reviewsSlider = document.querySelector('.reviews-slider');
    const reviewCards = document.querySelectorAll('.review-card');
    let currentReviewIndex = 0;
    
    if (reviewCards.length > 0) {
        // Auto-rotate reviews every 5 seconds
        const reviewInterval = setInterval(() => {
            currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
            updateReviewsSlider();
        }, 5000);
        
        function updateReviewsSlider() {
            reviewCards.forEach((card, index) => {
                card.style.transform = `translateX(${(index - currentReviewIndex) * 110}%)`;
                card.style.opacity = index === currentReviewIndex ? '1' : '0.7';
                card.style.zIndex = index === currentReviewIndex ? '2' : '1';
            });
        }
        
        // Pause on hover
        if (reviewsSlider) {
            reviewsSlider.addEventListener('mouseenter', () => {
                clearInterval(reviewInterval);
            });
            
            reviewsSlider.addEventListener('mouseleave', () => {
                setInterval(() => {
                    currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
                    updateReviewsSlider();
                }, 5000);
            });
        }
        
        // Initialize slider
        updateReviewsSlider();
    }
    
    // ========== PRICING CARD HOVER EFFECTS ==========
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            const isMiddleCard = this.querySelector('.step-arrow')?.textContent === '2';
            this.style.transform = isMiddleCard ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)';
            this.style.zIndex = isMiddleCard ? '5' : '1';
        });
    });
    
    // ========== INDUSTRY BOX INTERACTIVITY ==========
    const industryBoxes = document.querySelectorAll('.industry-box');
    
    industryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const industryName = this.querySelector('h4')?.textContent || 'business';
            const message = `Hi LMS FinTax, I need accounting services for my ${industryName} business.`;
            const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
            
            // Show a confirmation before redirecting
            if (confirm(`Would you like to get specialized services for ${industryName}?`)) {
                window.open(whatsappUrl, '_blank');
            }
        });
    });
    
    // ========== WHATSAPP FLOAT BUTTON PULSE ANIMATION ==========
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        setInterval(() => {
            whatsappFloat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappFloat.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    }
    
    // ========== FORM VALIDATION FOR FUTURE FORMS ==========
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                    
                    // Reset border color on focus
                    field.addEventListener('focus', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We will contact you soon.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // ========== LAZY LOADING IMAGES ==========
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    
    // // ========== COOKIE CONSENT BANNER ==========
    // if (!localStorage.getItem('cookiesAccepted')) {
    //     setTimeout(() => {
    //         const cookieBanner = document.createElement('div');
    //         cookieBanner.className = 'cookie-banner';
    //         cookieBanner.innerHTML = `
    //             <div class="cookie-content">
    //                 <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
    //                 <div class="cookie-buttons">
    //                     <button class="cookie-accept">Accept</button>
    //                     <button class="cookie-decline">Decline</button>
    //                 </div>
    //             </div>
    //         `;
    //         document.body.appendChild(cookieBanner);
            
    //         // Add CSS for cookie banner
    //         const cookieStyles = `
    //             .cookie-banner {
    //                 position: fixed;
    //                 bottom: 0;
    //                 left: 0;
    //                 right: 0;
    //                 background: var(--dark);
    //                 color: white;
    //                 padding: 1rem;
    //                 z-index: 1000;
    //                 box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    //                 transition: transform 0.3s ease;
    //             }
    //             .cookie-content {
    //                 max-width: 1200px;
    //                 margin: 0 auto;
    //                 display: flex;
    //                 justify-content: space-between;
    //                 align-items: center;
    //                 gap: 2rem;
    //             }
    //             .cookie-buttons {
    //                 display: flex;
    //                 gap: 1rem;
    //             }
    //             .cookie-accept, .cookie-decline {
    //                 padding: 0.5rem 1.5rem;
    //                 border-radius: var(--radius);
    //                 border: none;
    //                 cursor: pointer;
    //                 font-weight: 600;
    //                 transition: var(--transition);
    //             }
    //             .cookie-accept {
    //                 background: var(--primary);
    //                 color: white;
    //             }
    //             .cookie-decline {
    //                 background: transparent;
    //                 color: white;
    //                 border: 1px solid white;
    //             }
    //             @media (max-width: 768px) {
    //                 .cookie-content {
    //                     flex-direction: column;
    //                     text-align: center;
    //                 }
    //             }
    //         `;
            
    //         const styleSheet = document.createElement('style');
    //         styleSheet.textContent = cookieStyles;
    //         document.head.appendChild(styleSheet);
            
    //         // Cookie button events
    //         cookieBanner.querySelector('.cookie-accept').addEventListener('click', () => {
    //             localStorage.setItem('cookiesAccepted', 'true');
    //             cookieBanner.style.transform = 'translateY(100%)';
    //             setTimeout(() => cookieBanner.remove(), 300);
    //         });
            
    //         cookieBanner.querySelector('.cookie-decline').addEventListener('click', () => {
    //             cookieBanner.style.transform = 'translateY(100%)';
    //             setTimeout(() => cookieBanner.remove(), 300);
    //         });
    //     }, 2000);
    // }
    
    // ========== LOADING ANIMATION ==========
    window.addEventListener('load', function() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading LMS FinTax...</p>
            </div>
        `;
        
        const loadingStyles = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            .loading-spinner {
                text-align: center;
                color: white;
            }
            .spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loadingStyles;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(loadingScreen);
        
        // Remove loading screen after page loads
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
        }, 1000);
    });
    
    // ========== KEYBOARD SHORTCUTS ==========
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + / to focus search (if added later)
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) searchInput.focus();
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // ========== PRINT PAGE OPTIMIZATION ==========
    window.addEventListener('beforeprint', function() {
        // Hide elements that shouldn't print
        const navbar = document.querySelector('.navbar');
        const whatsappFloat = document.querySelector('.whatsapp-float');
        const backToTop = document.querySelector('.back-to-top');
        
        if (navbar) navbar.style.display = 'none';
        if (whatsappFloat) whatsappFloat.style.display = 'none';
        if (backToTop) backToTop.style.display = 'none';
    });
    
    window.addEventListener('afterprint', function() {
        // Restore elements after printing
        const navbar = document.querySelector('.navbar');
        const whatsappFloat = document.querySelector('.whatsapp-float');
        const backToTop = document.querySelector('.back-to-top');
        
        if (navbar) navbar.style.display = '';
        if (whatsappFloat) whatsappFloat.style.display = '';
        if (backToTop) backToTop.style.display = '';
    });
    
    // // ========== SERVICE PACKAGE COMPARISON ==========
    // const compareButtons = document.querySelectorAll('.plan-select-btn');
    
    // compareButtons.forEach(button => {
    //     button.addEventListener('click', function(e) {
    //         if (this.textContent.includes('Contact')) {
    //             e.preventDefault();
                
    //             // Create comparison modal
    //             const modal = document.createElement('div');
    //             modal.className = 'comparison-modal';
    //             modal.innerHTML = `
    //                 <div class="modal-content">
    //                     <span class="close-modal">&times;</span>
    //                     <h3>Custom ELITE Package</h3>
    //                     <p>Our ELITE package is customized based on your business needs. Please provide some details:</p>
    //                     <form class="custom-quote-form">
    //                         <div class="form-group">
    //                             <label>Monthly Revenue (approx.)</label>
    //                             <select required>
    //                                 <option value="">Select Range</option>
    //                                 <option value="<1L">Less than ₹1 Lakh</option>
    //                                 <option value="1-5L">₹1-5 Lakhs</option>
    //                                 <option value="5-10L">₹5-10 Lakhs</option>
    //                                 <option value="10-50L">₹10-50 Lakhs</option>
    //                                 <option value="50L+">Above ₹50 Lakhs</option>
    //                             </select>
    //                         </div>
    //                         <div class="form-group">
    //                             <label>Number of Monthly Transactions</label>
    //                             <input type="number" min="1" required placeholder="e.g., 500">
    //                         </div>
    //                         <div class="form-group">
    //                             <label>Additional Requirements</label>
    //                             <textarea placeholder="Any specific needs?"></textarea>
    //                         </div>
    //                         <button type="submit" class="submit-quote">Get Custom Quote</button>
    //                     </form>
    //                 </div>
    //             `;
                
    //             document.body.appendChild(modal);
                
    //             // Add modal styles
    //             const modalStyles = `
    //                 .comparison-modal {
    //                     position: fixed;
    //                     top: 0;
    //                     left: 0;
    //                     width: 100%;
    //                     height: 100%;
    //                     background: rgba(0,0,0,0.7);
    //                     display: flex;
    //                     justify-content: center;
    //                     align-items: center;
    //                     z-index: 2000;
    //                 }
    //                 .modal-content {
    //                     background: white;
    //                     padding: 2rem;
    //                     border-radius: var(--radius);
    //                     max-width: 500px;
    //                     width: 90%;
    //                     position: relative;
    //                 }
    //                 .close-modal {
    //                     position: absolute;
    //                     top: 1rem;
    //                     right: 1rem;
    //                     font-size: 1.5rem;
    //                     cursor: pointer;
    //                     color: var(--gray);
    //                 }
    //                 .form-group {
    //                     margin-bottom: 1rem;
    //                 }
    //                 .form-group label {
    //                     display: block;
    //                     margin-bottom: 0.5rem;
    //                     font-weight: 600;
    //                 }
    //                 .form-group select,
    //                 .form-group input,
    //                 .form-group textarea {
    //                     width: 100%;
    //                     padding: 0.5rem;
    //                     border: 1px solid var(--gray-light);
    //                     border-radius: var(--radius);
    //                 }
    //                 .submit-quote {
    //                     background: var(--primary);
    //                     color: white;
    //                     padding: 1rem 2rem;
    //                     border: none;
    //                     border-radius: var(--radius);
    //                     width: 100%;
    //                     font-weight: 600;
    //                     cursor: pointer;
    //                     margin-top: 1rem;
    //                     transition: var(--transition);
    //                 }
    //                 .submit-quote:hover {
    //                     transform: translateY(-2px);
    //                     box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
    //                 }
    //             `;
                
    //             const styleSheet = document.createElement('style');
    //             styleSheet.textContent = modalStyles;
    //             document.head.appendChild(styleSheet);
                
    //             // Modal functionality
    //             modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    //             modal.addEventListener('click', (e) => {
    //                 if (e.target === modal) modal.remove();
    //             });
                
    //             modal.querySelector('form').addEventListener('submit', function(e) {
    //                 e.preventDefault();
    //                 alert('Thank you! We will contact you within 24 hours with a custom quote.');
    //                 modal.remove();
    //             });
    //         }
    //     });
    // });
    
    // ========== INITIALIZE TOOLTIPS ==========
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            tooltip.style.position = 'absolute';
            tooltip.style.left = (rect.left + scrollLeft + rect.width/2 - tooltip.offsetWidth/2) + 'px';
            tooltip.style.top = (rect.top + scrollTop - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.background = 'var(--dark)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = 'var(--radius)';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
    
    console.log('LMS FinTax website initialized successfully!');
});

// ========== ADDITIONAL UTILITY FUNCTIONS ==========

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Currency formatter
function formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(amount);
}

// Date formatter
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Email validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation for Indian numbers
function isValidIndianPhone(phone) {
    const re = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return re.test(phone);
}

// Add these utility functions to window object for debugging
window.lmsUtils = {
    formatCurrency,
    formatDate,
    copyToClipboard,
    isValidEmail,
    isValidIndianPhone,
    debounce,
    throttle
};

// ========== SERVICE WORKER FOR OFFLINE SUPPORT (OPTIONAL) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered: ', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}