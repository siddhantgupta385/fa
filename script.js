// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 30, 30, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(30, 30, 30, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Animate all sections on scroll
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Animate all cards with a staggered delay
    ['.service-card', '.portfolio-card', '.testimonial-card'].forEach(selector => {
        document.querySelectorAll(selector).forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-on-scroll');
            observer.observe(card);
        });
    });
});

// Contact form handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        const message = formData.get('message');
        
        const subject = `New Project Inquiry: ${project}`;
        const body = `Hi CodeCrafterz,

I'm interested in working with you on a project.

Name: ${name}
Email: ${email}
Project Type: ${project}

Project Description:
${message}

Looking forward to hearing from you!

Best regards,
${name}`;
        
        const mailtoLink = `mailto:siddhantgupta385@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        showNotification('Email client opened! Your message is ready to send.');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    document.querySelector('.notification')?.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed; top: 90px; right: 20px;
        background: #10b981; color: white;
        padding: 1rem 1.5rem; border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1001; max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.querySelector('.notification-content').style.cssText = `
        display: flex; align-items: center; gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideOutRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100%); } }
`;
document.head.appendChild(notificationStyles);

// Page load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.hero-content, .hero-visual').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200);
    });
});

// Typing effect for hero title (if Typed.js library is included)
if (typeof Typed !== 'undefined') {
    const typedOptions = {
        strings: ['Expert Full-Stack Development <span class="highlight">That delivers results.</span>'],
        typeSpeed: 30,
        showCursor: true,
        cursorChar: '|',
        startDelay: 100,
        onComplete: (self) => {
            if (self.cursor) {
                self.cursor.style.animation = 'typed-blink 0.75s infinite';
            }
        },
    };
    if (document.querySelector('#typed-output')) {
        new Typed('#typed-output', typedOptions);
    }
    const blinkKeyframes = document.createElement('style');
    blinkKeyframes.textContent = `@keyframes typed-blink { 50% { opacity: 1; } from, to { opacity: 0; } }`;
    document.head.appendChild(blinkKeyframes);
}

// Scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed; top: 70px; left: 0;
        width: 0%; height: 3px;
        background: linear-gradient(90deg, #ffd700, #ffed4a);
        z-index: 1001; transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (window.pageYOffset / docHeight) * 100;
        indicator.style.width = scrollPercent + '%';
    });
}
createScrollIndicator();

// Button hover and ripple effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-2px) scale(1.02)'; });
    btn.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
    btn.addEventListener('click', createRipple);
});

const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn { position: relative; overflow: hidden; }
    .ripple { position: absolute; border-radius: 50%; background-color: rgba(255, 255, 255, 0.6); transform: scale(0); animation: ripple 0.6s linear; }
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
`;
document.head.appendChild(rippleStyles);

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    button.querySelector('.ripple')?.remove();
    button.appendChild(circle);
}

// ✅ CORRECTED CAROUSEL LOGIC WITH ROBUST SWIPE SUPPORT
document.addEventListener('DOMContentLoaded', function () {
    function setupCarousel(gridSelector, arrowContainerSelector) {
        const grid = document.querySelector(gridSelector);
        const arrows = document.querySelector(arrowContainerSelector);
        if (!grid) return;
        
        const observer = new MutationObserver((mutations, obs) => {
            const cards = grid.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
            if (cards.length > 0) {
                initialize(cards);
                obs.disconnect(); // Stop observing once cards are found
            }
        });
        observer.observe(grid, { childList: true });

        function initialize(cards) {
            let currentIndex = 0;
            const totalCards = cards.length;

            function updateCarousel() {
                cards.forEach((card, i) => {
                    card.classList.remove('card-center', 'card-left', 'card-right', 'card-far-left', 'card-far-right');
                    
                    const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
                    const rightIndex = (currentIndex + 1) % totalCards;
                    const farLeftIndex = (currentIndex - 2 + totalCards) % totalCards;
                    const farRightIndex = (currentIndex + 2) % totalCards;

                    if (i === currentIndex) card.classList.add('card-center');
                    else if (i === rightIndex) card.classList.add('card-right');
                    else if (i === leftIndex) card.classList.add('card-left');
                    else if (i === farRightIndex) card.classList.add('card-far-right');
                    else if (i === farLeftIndex) card.classList.add('card-far-left');
                });
            }

            function showNext() {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCarousel();
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateCarousel();
            }

            // Arrow controls
            if (arrows) {
                arrows.querySelector('.arrow-left')?.addEventListener('click', showPrev);
                arrows.querySelector('.arrow-right')?.addEventListener('click', showNext);
            }
            
            // Allow clicking on side cards to navigate
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    if (card.classList.contains('card-left')) showPrev();
                    else if (card.classList.contains('card-right')) showNext();
                });
            });
            
            // --- ✅ NEW ROBUST TOUCH SWIPE LOGIC ---
            let touchStartX = 0;
            let touchStartY = 0;

            grid.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true }); // Use passive for better scroll performance

            grid.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;

                const deltaX = touchStartX - touchEndX;
                const deltaY = touchStartY - touchEndY;

                // Only trigger swipe if horizontal movement is greater than vertical
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Check for a minimum swipe distance (threshold)
                    if (Math.abs(deltaX) > 50) {
                        if (deltaX > 0) {
                            // Swiped left
                            showNext();
                        } else {
                            // Swiped right
                            showPrev();
                        }
                    }
                }
            });
            // --- END OF NEW LOGIC ---
            
            updateCarousel(); // Initial setup
        }
    }

    // Initialize for all carousels
    setupCarousel('.services-grid', '#services-arrows');
    setupCarousel('.portfolio-grid', '#portfolio-arrows');
    setupCarousel('.testimonials-grid', '#testimonials-arrows');
});