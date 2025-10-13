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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });

    // Animate portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });

    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
});

// Contact form handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        const message = formData.get('message');
        
        // Create mailto link
        const subject = `New Project Inquiry: ${project}`;
        const body = `Hi Siddhant Gupta,

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
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Email client opened! Your message is ready to send.');
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const animateElements = document.querySelectorAll('.hero-content, .hero-visual');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200);
    });
});

// // Typing effect for hero title
// function typeWriter(element, text, speed = 50) {
//     let i = 0;
//     element.innerHTML = '';
//     // If the text contains HTML, split by tags and characters
//     const tokens = text.match(/<[^>]+>|[^<]/g);
//     function type() {
//         if (i < tokens.length) {
//             element.innerHTML += tokens[i];
//             i++;
//             setTimeout(type, speed);
//         }
//     }
//     type();
// }

// // Initialize typing effect when page loads
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.innerHTML;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 30);
//         }, 500);
//     }
// });
   if (typeof Typed !== 'undefined') {
        const typedOptions = {
            strings: [
                'Expert Full-Stack Development <span class="highlight">That delivers results.</span>'
            ],
            typeSpeed: 40,
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
        // Add the blink animation for the cursor
        const blinkKeyframes = document.createElement('style');
        blinkKeyframes.textContent = `@keyframes typed-blink { from, to { opacity: 1; } 50% { opacity: 0; } }`;
        document.head.appendChild(blinkKeyframes);
    }
// Add scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ffd700, #ffed4a);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        indicator.style.width = scrollPercent + '%';
    });
}

// Initialize scroll indicator
createScrollIndicator();

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
}); 

document.addEventListener('DOMContentLoaded', function () {
    // Scroll arrows for horizontally scrollable card sections
    function setupScrollArrows(gridSelector, arrowContainerSelector) {
        const grid = document.querySelector(gridSelector);
        const arrows = document.querySelector(arrowContainerSelector);
        if (!grid || !arrows) return;

        const left = arrows.querySelector('.arrow-left');
        const right = arrows.querySelector('.arrow-right');

        // Manual scrolling
        left.addEventListener('click', function(e) {
            e.preventDefault();
            grid.scrollBy({ left: -grid.offsetWidth * 0.8, behavior: 'smooth' });
        });
        right.addEventListener('click', function(e) {
            e.preventDefault();
            grid.scrollBy({ left: grid.offsetWidth * 0.8, behavior: 'smooth' });
        });

        // ---- AUTO SCROLL LOGIC ----
        let autoScrollInterval = setInterval(() => {
            // If we've reached the end, scroll back to start
            if (grid.scrollLeft + grid.offsetWidth >= grid.scrollWidth - 10) {
                grid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: grid.offsetWidth * 0.8, behavior: 'smooth' });
            }
        }, 3000); // every 3 seconds

        // Pause auto scroll on hover (optional)
        grid.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        grid.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                if (grid.scrollLeft + grid.offsetWidth >= grid.scrollWidth - 10) {
                    grid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    grid.scrollBy({ left: grid.offsetWidth * 0.8, behavior: 'smooth' });
                }
            }, 3000);
        });
    }

    // Initialize for all scrollable grids
    setupScrollArrows('.services-grid', '#services-arrows');
    setupScrollArrows('.portfolio-grid', '#portfolio-arrows');
    setupScrollArrows('.testimonials-grid', '#testimonials-arrows');
});
