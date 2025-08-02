// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toggle mobile menu
document.querySelector('.burger').addEventListener('click', function() {
    const navContainer = document.querySelector('.nav-container');
    navContainer.classList.toggle('open');
    if (navContainer.classList.contains('open')) {
        navContainer.scrollIntoView({ behavior: 'smooth' });
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a, .dropdown-toggle').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-container').classList.remove('open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navContainer = document.querySelector('.nav-container');
    const burger = document.querySelector('.burger');
    
    if (!navContainer.contains(event.target) && !burger.contains(event.target)) {
        navContainer.classList.remove('open');
    }
});

// Counter animation for stats
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

// Progress bar animation
function animateProgressBar(element, targetWidth) {
    setTimeout(() => {
        element.style.width = targetWidth + '%';
    }, 200);
}

// FAQ Accordion functionality - using event delegation
document.addEventListener('click', function(e) {
    // Check if clicked element is an FAQ question or its child
    const faqQuestion = e.target.closest('.faq-question');
    
    if (faqQuestion) {
        e.preventDefault();
        
        const faqItem = faqQuestion.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        const toggle = faqQuestion.querySelector('.faq-toggle i');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const otherToggle = item.querySelector('.faq-toggle i');
                if (otherToggle) {
                    otherToggle.className = 'fas fa-plus';
                }
            }
        });
        
        // Toggle current FAQ item
        if (isActive) {
            faqItem.classList.remove('active');
            if (toggle) {
                toggle.className = 'fas fa-plus';
            }
        } else {
            faqItem.classList.add('active');
            if (toggle) {
                toggle.className = 'fas fa-minus';
            }
        }
    }
});

// Start counter animations when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-container')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                animateCounter(statNumbers[0], 230, 'M+');
                animateCounter(statNumbers[1], 127, '+');
            }
            if (entry.target.classList.contains('nature-stats')) {
                const natureNumbers = entry.target.querySelectorAll('.nature-stat-number');
                animateCounter(natureNumbers[0], 37, '+');
                animateCounter(natureNumbers[1], 24, '/7');
                animateCounter(natureNumbers[2], 230, 'M+');
            }
            if (entry.target.classList.contains('progress-stats')) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                animateProgressBar(progressBars[0], 97);
                animateProgressBar(progressBars[1], 90);
            }
            observer.unobserve(entry.target);
        }
    });
});

// Add all sections to observer when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stats-container, .nature-stats, .progress-stats, .nature-content, .nature-image, .cottages-header, .cottage-1, .cottage-2, .cottage-3, .faq-header, .faq-left, .faq-right').forEach(el => {
        observer.observe(el);
    });
});

// Enhanced hover effects (removed scaling for activity cards)
document.querySelectorAll('.stat-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});