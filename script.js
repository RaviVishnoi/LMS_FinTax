// ========== MAIN JAVASCRIPT FOR LMS FINTEX WEBSITE ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('LMS FinTax Website Initializing...');
  
  // ========== ENHANCED NAVIGATION ==========
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  // Handle scroll effects
  function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Add scroll indicator
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Sticky header
    if (scrollPosition > 100) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
    
    // Update active nav link
    updateActiveNavLink();
  }
  
  // Throttle scroll handler
  window.addEventListener('scroll', throttle(handleScroll, 100));
  
  // ========== MOBILE NAVIGATION ==========
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on overlay
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeMobileMenu();
        }
      });
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileMenu();
      }
    });
    
    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
  
  function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  function openMobileMenu() {
    mobileNav.classList.add('active');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    mobileNav.classList.remove('active');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
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
    
    // Update nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href && href.includes(currentSectionId)) {
        link.classList.add('active');
      }
    });
  }
  
  // ========== BACK TO TOP BUTTON ==========
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '#!') return;
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileNav && mobileNav.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });
  });
  
  // ========== FADE IN ANIMATIONS ==========
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  // ========== ANIMATED COUNTERS ==========
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-count') || '0');
        
        if (isNaN(target)) return;
        
        animateCounter(element, target);
        counterObserver.unobserve(element);
      }
    });
  }, {
    threshold: 0.5
  });
  
  statNumbers.forEach(number => {
    counterObserver.observe(number);
  });
  
  function animateCounter(element, target) {
    const duration = 2000;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    let count = 0;
    
    const timer = setInterval(() => {
      current += step;
      count = Math.floor(current);
      
      if (count >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = count;
      }
    }, duration / steps);
  }
  
  // ========== FORM VALIDATION ==========
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        submitForm(this);
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearFieldError(input));
    });
  });
  
  function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name || field.id;
    const errorElement = field.nextElementSibling?.classList.contains('error-message') 
      ? field.nextElementSibling 
      : document.getElementById(`${name}-error`);
    
    // Clear previous states
    field.classList.remove('error', 'success');
    if (errorElement) errorElement.classList.remove('show');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = 'This field is required';
        errorElement.classList.add('show');
      }
      return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        field.classList.add('error');
        if (errorElement) {
          errorElement.textContent = 'Please enter a valid email address';
          errorElement.classList.add('show');
        }
        return false;
      }
    }
    
    // Phone validation (Indian numbers)
    if (name.includes('phone') && value) {
      const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        field.classList.add('error');
        if (errorElement) {
          errorElement.textContent = 'Please enter a valid Indian phone number';
          errorElement.classList.add('show');
        }
        return false;
      }
    }
    
    // If all validations pass
    if (value) {
      field.classList.add('success');
    }
    
    return true;
  }
  
  function clearFieldError(field) {
    field.classList.remove('error');
    const name = field.name || field.id;
    const errorElement = field.nextElementSibling?.classList.contains('error-message') 
      ? field.nextElementSibling 
      : document.getElementById(`${name}-error`);
    
    if (errorElement) errorElement.classList.remove('show');
  }
  
  function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Reset form
      form.reset();
      
      // Show success message
      showToast('Message sent successfully! We will contact you soon.', 'success');
      
      // Reset button
      submitBtn.classList.remove('loading');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Remove success classes
      form.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
    }, 2000);
  }
  
  // ========== TOAST NOTIFICATIONS ==========
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add styles
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: type === 'success' ? '#10b981' : '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      borderRadius: 'var(--radius)',
      zIndex: '9999',
      boxShadow: 'var(--shadow-lg)',
      fontSize: '0.95rem',
      fontWeight: '500',
      animation: 'slideUp 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // ========== TOOLTIP FUNCTIONALITY ==========
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
  
  function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = this.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    
    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    let top = rect.top - tooltipHeight - 10 + scrollTop;
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) {
      left = window.innerWidth - tooltipWidth - 10;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    
    // Show tooltip
    setTimeout(() => tooltip.classList.add('show'), 10);
    
    // Store reference
    this._tooltip = tooltip;
  }
  
  function hideTooltip() {
    if (this._tooltip) {
      this._tooltip.remove();
      this._tooltip = null;
    }
  }
  
  // ========== LAZY LOAD IMAGES ==========
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
  
  // ========== WHATSAPP BUTTON FUNCTIONALITY ==========
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn:not(.whatsapp-float)');
  
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.tagName === 'A' && this.href.includes('wa.me')) {
        // Track WhatsApp click
        console.log('WhatsApp button clicked:', this.textContent);
      }
    });
  });
  
  // ========== PRICING CARD INTERACTIONS ==========
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      const isMiddle = this.classList.contains('featured');
      this.style.transform = isMiddle ? 'translateY(-5px)' : 'translateY(0)';
      this.style.zIndex = isMiddle ? '5' : '1';
    });
    
    // Plan selection
    const selectBtn = card.querySelector('.plan-select-btn');
    if (selectBtn) {
      selectBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const planName = card.querySelector('.plan-name').textContent;
        showPlanModal(planName);
      });
    }
  });
  
  function showPlanModal(planName) {
    const message = `Hi LMS FinTax, I'm interested in the ${planName} plan. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    
    // Show confirmation
    if (confirm(`You selected the ${planName} plan. Continue to WhatsApp for more details?`)) {
      window.open(whatsappUrl, '_blank');
    }
  }
  
  // ========== INDUSTRY BOX INTERACTIONS ==========
  const industryBoxes = document.querySelectorAll('.industry-box');
  
  industryBoxes.forEach(box => {
    box.addEventListener('click', function() {
      const industry = this.querySelector('h4').textContent;
      const message = `Hi LMS FinTax, I need accounting services for my ${industry} business.`;
      const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
      
      if (confirm(`Get specialized services for ${industry}?`)) {
        window.open(whatsappUrl, '_blank');
      }
    });
  });
  
  // ========== COOKIE CONSENT ==========
  function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
      showCookieBanner();
    }
  }
  
  function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <div class="cookie-buttons">
          <button class="cookie-accept">Accept</button>
          <button class="cookie-decline">Decline</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    // Add event listeners
    banner.querySelector('.cookie-accept').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.remove();
    });
    
    banner.querySelector('.cookie-decline').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      banner.remove();
    });
  }
  
  // Check cookie consent on page load
  setTimeout(checkCookieConsent, 1000);
  
  // ========== INITIALIZATION COMPLETE ==========
  console.log('LMS FinTax Website Initialized Successfully!');
  
  // Initialize on first load
  handleScroll();
});

// ========== UTILITY FUNCTIONS ==========
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

// Add utilities to window for debugging
window.lmsUtils = {
  throttle,
  debounce,
  formatCurrency: (amount) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount),
  formatDate: (date) => new Date(date).toLocaleDateString('en-IN')
};

// Service Worker Registration (Optional)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}