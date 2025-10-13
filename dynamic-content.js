// Dynamic Content Loader
class DynamicContentLoader {
    constructor() {
        this.slideshowTimers = {};
        this.loadContent();
    }

    async loadContent() {
        try {
            await this.loadPersonalDetails();
            await this.loadProjects();
            await this.loadSkills();
            await this.loadTestimonials();
            await this.loadServices();
        } catch (error) {
            console.error('Failed to load content:', error);
        }
    }

    async loadPersonalDetails() {
        try {
            const personal = await SupabaseDB.getPersonalDetails();
            // console.log('Personal Details:', personal.title);
            if (!personal) return;
        
        // Update navigation logo
        const navLogo = document.querySelector('.nav-logo span');
        if (navLogo) navLogo.textContent = personal.name;

        // Update hero title
        // const heroTitle = document.querySelector('.hero-title');
        // if (heroTitle) {
        //     heroTitle.innerHTML = `${personal.title} <span class="highlight">That Delivers Results</span>`;
        // }
        // const highlightitem = document.getElementsByClassName('highlight');
        // console.log('Highlight Item:', highlightitem);
        // if (highlightitem.length > 0) {
        //     highlightitem[0].innerHTML = 'That delivers results.';
        // }

        // Update contact details
        const emailElement = document.querySelector('.contact-item span');
        if (emailElement && emailElement.textContent.includes('@')) {
            emailElement.textContent = personal.email;
        }

        const phoneElement = document.querySelector('.whatsapp-link');
        if (phoneElement) {
            phoneElement.textContent = personal.phone;
            phoneElement.href = `https://wa.me/${personal.phone.replace(/\D/g, '')}`;
        }

            // Update footer
            const footerLogo = document.querySelector('.footer-logo span');
            if (footerLogo) footerLogo.textContent = personal.name;

            const footerYear = document.querySelector('.footer-bottom p');
            if (footerYear) {
                footerYear.innerHTML = `&copy; ${new Date().getFullYear()} ${personal.name}. All rights reserved.`;
            }
        } catch (error) {
            console.error('Failed to load personal details:', error);
        }
    }

    async loadProjects() {
        try {
            const projects = await SupabaseDB.getProjects();
            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (!portfolioGrid) return;

            // Clear any existing slideshow timers
            if (this.slideshowTimers) {
                Object.values(this.slideshowTimers).forEach(id => clearInterval(id));
                this.slideshowTimers = {};
            }

            portfolioGrid.innerHTML = '';

            projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'portfolio-card';
            
            const statusClass = project.status === 'active' ? 'active' : 'completed';
            const statusText = project.status === 'active' ? 'Active Project' : 'Completed';
            
            const urlLink = project.url ? `<br><a href="${project.url}" target="_blank">${project.url}</a>` : '';
            
            // Handle project media (supports media_urls array or single media_url)
            let mediaContent = '';
            const mediaArray = Array.isArray(project.media_urls) ? project.media_urls : [];
            if (mediaArray.length > 1) {
                const slidesHtml = mediaArray.map((m, idx) => {
                    const url = m.url || m;
                    const type = (m.type || 'image').toLowerCase();
                    if (type === 'video') {
                        return `
                <div class="portfolio-slide${idx === 0 ? ' active' : ''}">
                    <video src="${url}" muted loop></video>
                </div>`;
                    }
                    return `
                <div class="portfolio-slide${idx === 0 ? ' active' : ''}">
                    <img src="${url}" alt="${project.title}" loading="lazy">
                </div>`;
                }).join('');
                mediaContent = `
                <div class="portfolio-slideshow" data-project-id="${project.id}">
                    ${slidesHtml}
                    <button class="slide-next" aria-label="Next image" title="Next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>`;
            } else {
                let primaryMediaUrl = null;
                let primaryMediaType = null;

                if (mediaArray.length === 1) {
                    const single = mediaArray[0];
                    primaryMediaUrl = single.url || single;
                    primaryMediaType = (single.type || 'image').toLowerCase();
                } else if (project.media_url) {
                    primaryMediaUrl = project.media_url;
                    primaryMediaType = (project.media_type || 'image').toLowerCase();
                }

                if (primaryMediaUrl) {
                    if (primaryMediaType === 'video') {
                        mediaContent = `<video src="${primaryMediaUrl}" controls muted loop></video>`;
                    } else {
                        mediaContent = `<img src="${primaryMediaUrl}" alt="${project.title}" loading="lazy">`;
                    }
                } else {
                    mediaContent = `<i class="${project.icon || 'fas fa-code'}"></i>`;
                }
            }
            
            projectCard.innerHTML = `
                <div class="portfolio-image">
                    ${mediaContent}
                </div>
                <div class="portfolio-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}${urlLink}</p>
                    <div class="portfolio-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="portfolio-status">
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                </div>
            `;
            
                portfolioGrid.appendChild(projectCard);

                // Initialize slideshow if present
                const slideshow = projectCard.querySelector('.portfolio-slideshow');
                if (slideshow) {
                    this.setupSlideshow(slideshow, project.id);
                }
            });
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    }

    setupSlideshow(slideshowElement, projectId) {
        const slides = Array.from(slideshowElement.querySelectorAll('.portfolio-slide'));
        if (slides.length <= 1) return;

        let currentIndex = 0;

        const setActive = (index) => {
            slides.forEach((slide, i) => {
                const isActive = i === index;
                slide.classList.toggle('active', isActive);
                const video = slide.querySelector('video');
                if (video) {
                    if (isActive) {
                        try { video.play(); } catch (e) {}
                    } else {
                        video.pause();
                        try { video.currentTime = 0; } catch (e) {}
                    }
                }
            });
        };

        const next = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            setActive(currentIndex);
        };

        const start = () => {
            const id = setInterval(next, 3500);
            this.slideshowTimers[projectId] = id;
        };
        const stop = () => {
            if (this.slideshowTimers[projectId]) {
                clearInterval(this.slideshowTimers[projectId]);
                delete this.slideshowTimers[projectId];
            }
        };

        start();

        slideshowElement.addEventListener('mouseenter', () => {
            stop();
        });
        slideshowElement.addEventListener('mouseleave', () => {
            stop();
            start();
        });

        const nextBtn = slideshowElement.querySelector('.slide-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stop();
                next();
                start();
            });
        }
    }

    async loadSkills() {
        try {
            const skillsData = await SupabaseDB.getSkills();
            const skillsCategories = document.querySelector('.skills-categories');
            if (!skillsCategories) return;

            skillsCategories.innerHTML = '';

            const iconMap = {
                'Frontend': 'fas fa-laptop-code',
                'Backend': 'fas fa-database',
                'Cloud & Tools': 'fas fa-cloud',
                'AI & Data': 'fas fa-brain'
            };

            // Group skills by category
            const skillsByCategory = {};
            skillsData.forEach(skill => {
                if (!skillsByCategory[skill.category]) {
                    skillsByCategory[skill.category] = [];
                }
                skillsByCategory[skill.category].push(skill.name);
            });

            Object.entries(skillsByCategory).forEach(([category, skills]) => {
            const skillCategory = document.createElement('div');
            skillCategory.className = 'skill-category';
            
            skillCategory.innerHTML = `
                <h3><i class="${iconMap[category] || 'fas fa-code'}"></i> ${category}</h3>
                <div class="skill-tags">
                    ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            `;
            
                skillsCategories.appendChild(skillCategory);
            });
        } catch (error) {
            console.error('Failed to load skills:', error);
        }
    }

    async loadTestimonials() {
        try {
            const testimonials = await SupabaseDB.getTestimonials();
            const testimonialsGrid = document.querySelector('.testimonials-grid');
            if (!testimonialsGrid) return;

            testimonialsGrid.innerHTML = '';

            testimonials.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            
            const stars = Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('');
            
            // Handle client image or default avatar
            const clientImage = testimonial.image_url 
                ? `<img src="${testimonial.image_url}" alt="${testimonial.author}" loading="lazy">` 
                : '<i class="fas fa-user"></i>';
            
            testimonialCard.innerHTML = `
                <div class="testimonial-image">
                    <div class="client-avatar">
                        ${clientImage}
                    </div>
                </div>
                <div class="testimonial-rating">
                    <div class="stars">
                        ${stars}
                    </div>
                    <span class="rating-text">${testimonial.rating}.0/5</span>
                </div>
                <p class="testimonial-text">
                    "${testimonial.text}"
                </p>
                <div class="testimonial-author">
                    <strong>${testimonial.author}</strong>
                    <span>${testimonial.project_link ? `<a href="${testimonial.project_link}" target="_blank">${testimonial.project}</a>` : testimonial.project}</span>
                </div>
            `;
            
                testimonialsGrid.appendChild(testimonialCard);
            });
        } catch (error) {
            console.error('Failed to load testimonials:', error);
        }
    }

    async loadServices() {
        try {
            const services = await SupabaseDB.getServices();
            const servicesGrid = document.querySelector('.services-grid');
            if (!servicesGrid) return;

            servicesGrid.innerHTML = '';

            services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <ul class="service-tech">
                    ${service.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            `;
            
                servicesGrid.appendChild(serviceCard);
            });
        } catch (error) {
            console.error('Failed to load services:', error);
        }
    }
}

// Initialize dynamic content loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DynamicContentLoader();
    
    // Load theme setting
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'pink') {
        document.body.classList.add('pink-theme');
    }
});

