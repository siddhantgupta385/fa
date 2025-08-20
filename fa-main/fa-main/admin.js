// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.adminPassword = 'admin123'; // Change this to your desired password
        this.currentEditId = null;
        this.currentEditType = null;
        this.currentEditSkillId = null;
        this.currentImageFile = null;
        this.currentProjectMediaFiles = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Theme toggle button
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Form submissions
        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });



        document.getElementById('testimonialForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTestimonial();
        });

        document.getElementById('serviceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveService();
        });

        // Image upload handler
        document.getElementById('testimonialImageInput').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
        
        // Project media upload handler
        document.getElementById('projectMediaInput').addEventListener('change', (e) => {
            this.handleProjectMediaUpload(e);
        });
    }

    handleLogin() {
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');

        if (password === this.adminPassword) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            sessionStorage.setItem('adminLoggedIn', 'true');
            this.loadAllData();
        } else {
            errorDiv.textContent = 'Invalid password. Please try again.';
        }
    }

    logout() {
        sessionStorage.removeItem('adminLoggedIn');
        document.getElementById('loginContainer').style.display = 'flex';
        document.getElementById('adminPanel').style.display = 'none';
        document.getElementById('password').value = '';
    }

    toggleTheme() {
        const themeBtn = document.getElementById('themeBtn');
        const currentTheme = localStorage.getItem('siteTheme') || 'default';
        
        if (currentTheme === 'default') {
            localStorage.setItem('siteTheme', 'pink');
            themeBtn.innerHTML = '<i class="fas fa-palette"></i> Default Theme';
            this.showSuccess('Main site theme changed to Pink/Blue');
        } else {
            localStorage.setItem('siteTheme', 'default');
            themeBtn.innerHTML = '<i class="fas fa-palette"></i> Pink Theme';
            this.showSuccess('Main site theme changed to Default');
        }
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.admin-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');
    }

    loadInitialData() {
        // Check if user is already logged in
        if (sessionStorage.getItem('adminLoggedIn') === 'true') {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            this.loadAllData();
        }
        
        // Load current site theme setting
        const currentTheme = localStorage.getItem('siteTheme') || 'default';
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            if (currentTheme === 'pink') {
                themeBtn.innerHTML = '<i class="fas fa-palette"></i> Default Theme';
            } else {
                themeBtn.innerHTML = '<i class="fas fa-palette"></i> Pink Theme';
            }
        }
    }



    loadAllData() {
        this.loadProjects();
        this.loadPersonalDetails();
        this.loadTestimonials();
        this.loadServices();
    }

    async showError(message) {
        alert('Error: ' + message);
        console.error(message);
    }

    async showSuccess(message) {
        // You can replace this with a toast notification
        console.log('Success: ' + message);
    }

    // Projects Management
    async loadProjects() {
        try {
            const projects = await SupabaseDB.getProjects();
            const projectsList = document.getElementById('projectsList');
            projectsList.innerHTML = '';

            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'item-card';
                const mediaInfo = project.media_url ? `Media: ${project.media_type || 'image'}` : `Icon: ${project.icon}`;
                projectCard.innerHTML = `
                    <div class="item-content">
                        <h4>${project.title}</h4>
                        <p>${project.description.substring(0, 100)}...</p>
                        <small>Status: ${project.status} | ${mediaInfo} | Tech: ${project.technologies.join(', ')}</small>
                    </div>
                    <div class="item-actions">
                        <button class="edit-btn" onclick="admin.editProject(${project.id})">Edit</button>
                        <button class="delete-btn" onclick="admin.deleteProject(${project.id})">Delete</button>
                    </div>
                `;
                projectsList.appendChild(projectCard);
            });
        } catch (error) {
            this.showError('Failed to load projects: ' + error.message);
        }
    }

    async openProjectModal(project = null) {
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('projectModalTitle');
        
        if (project) {
            title.textContent = 'Edit Project';
            document.getElementById('projectTitle').value = project.title;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectTech').value = project.technologies.join(', ');
            document.getElementById('projectStatus').value = project.status;
            document.getElementById('projectIcon').value = project.icon || '';
            document.getElementById('projectUrl').value = project.url || '';
            document.getElementById('projectMediaType').value = project.media_type || 'image';
            this.currentEditId = project.id;
            
            // Handle existing media
            if (project.media_urls && project.media_urls.length > 0) {
                this.currentProjectMediaFiles = project.media_urls.map(media => ({
                    url: media.url,
                    type: media.type,
                    isExisting: true
                }));
                this.displayMultipleMediaPreview();
            } else if (project.media_url) {
                this.currentProjectMediaFiles = [{
                    url: project.media_url,
                    type: project.media_type || 'image',
                    isExisting: true
                }];
                this.displayMultipleMediaPreview();
            } else {
                this.resetProjectMediaUpload();
            }
        } else {
            title.textContent = 'Add Project';
            document.getElementById('projectForm').reset();
            this.currentEditId = null;
            this.resetProjectMediaUpload();
        }
        
        modal.style.display = 'block';
    }

    async saveProject() {
        try {
            let mediaUrl = null;
            let mediaType = document.getElementById('projectMediaType').value;
            
            // Process multiple media files
            const mediaUrls = [];
            for (const mediaFile of this.currentProjectMediaFiles) {
                if (mediaFile.isExisting) {
                    // If existing entry is a base64 data URL, upload it to storage to avoid huge payloads
                    if (mediaFile.url && typeof mediaFile.url === 'string' && mediaFile.url.startsWith('data:')) {
                        const guessedExt = mediaFile.type === 'video' ? 'mp4' : 'png';
                        const fileFromDataUrl = await this.dataUrlToFile(mediaFile.url, `existing-${Date.now()}.${guessedExt}`);
                        const uploadedUrl = await this.uploadProjectMedia(fileFromDataUrl);
                        mediaUrls.push({ url: uploadedUrl, type: mediaFile.type });
                    } else {
                        mediaUrls.push({ url: mediaFile.url, type: mediaFile.type });
                    }
                } else {
                    const uploadedUrl = await this.uploadProjectMedia(mediaFile.file);
                    mediaUrls.push({ url: uploadedUrl, type: mediaFile.type });
                }
            }
            
            const projectData = {
                title: document.getElementById('projectTitle').value,
                description: document.getElementById('projectDescription').value,
                technologies: document.getElementById('projectTech').value.split(',').map(t => t.trim()),
                status: document.getElementById('projectStatus').value,
                icon: document.getElementById('projectIcon').value || 'fas fa-code',
                url: document.getElementById('projectUrl').value || null,
                media_urls: mediaUrls.length > 0 ? mediaUrls : null,
                media_type: mediaType,
                media_url: mediaUrl
            };

            // Ensure backward compatibility fields are set when media_urls exist
            if (!mediaUrl && mediaUrls.length > 0) {
                const firstImage = mediaUrls.find(m => (m.type || '').toLowerCase() === 'image');
                const primary = firstImage || mediaUrls[0];
                projectData.media_url = primary.url || null;
                projectData.media_type = (primary.type || 'image').toLowerCase();
            }

            if (this.currentEditId) {
                await SupabaseDB.updateProject(this.currentEditId, projectData);
                this.showSuccess('Project updated successfully');
            } else {
                await SupabaseDB.createProject(projectData);
                this.showSuccess('Project created successfully');
            }

            this.loadProjects();
            this.closeModal('projectModal');
        } catch (error) {
            this.showError('Failed to save project: ' + error.message);
        }
    }

    // Convert data URL (base64) to File for upload
    async dataUrlToFile(dataUrl, filename) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        return new File([blob], filename, { type: blob.type || 'application/octet-stream' });
    }

    async editProject(id) {
        try {
            const projects = await SupabaseDB.getProjects();
            const project = projects.find(p => p.id === id);
            this.openProjectModal(project);
        } catch (error) {
            this.showError('Failed to load project: ' + error.message);
        }
    }

    async deleteProject(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await SupabaseDB.deleteProject(id);
                this.showSuccess('Project deleted successfully');
                this.loadProjects();
            } catch (error) {
                this.showError('Failed to delete project: ' + error.message);
            }
        }
    }



    // Personal Details Management
    async loadPersonalDetails() {
        try {
            const personal = await SupabaseDB.getPersonalDetails();
            if (personal) {
                document.getElementById('personalName').value = personal.name;
                document.getElementById('personalEmail').value = personal.email;
                document.getElementById('personalPhone').value = personal.phone;
                document.getElementById('personalTitle').value = personal.title;
            }
        } catch (error) {
            this.showError('Failed to load personal details: ' + error.message);
        }
    }

    async savePersonalDetails() {
        try {
            const personalData = {
                name: document.getElementById('personalName').value,
                email: document.getElementById('personalEmail').value,
                phone: document.getElementById('personalPhone').value,
                title: document.getElementById('personalTitle').value
            };
            
            await SupabaseDB.updatePersonalDetails(personalData);
            alert('Personal details saved successfully!');
        } catch (error) {
            this.showError('Failed to save personal details: ' + error.message);
        }
    }

    // Testimonials Management
    async loadTestimonials() {
        try {
            const testimonials = await SupabaseDB.getTestimonials();
            const testimonialsList = document.getElementById('testimonialsList');
            testimonialsList.innerHTML = '';

            testimonials.forEach(testimonial => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'item-card';
                testimonialCard.innerHTML = `
                    <div class="item-content">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.text.substring(0, 100)}...</p>
                        <small>Project: ${testimonial.project} | Rating: ${testimonial.rating}/5</small>
                    </div>
                    <div class="item-actions">
                        <button class="edit-btn" onclick="admin.editTestimonial(${testimonial.id})">Edit</button>
                        <button class="delete-btn" onclick="admin.deleteTestimonial(${testimonial.id})">Delete</button>
                    </div>
                `;
                testimonialsList.appendChild(testimonialCard);
            });
        } catch (error) {
            this.showError('Failed to load testimonials: ' + error.message);
        }
    }

    async openTestimonialModal(testimonial = null) {
        const modal = document.getElementById('testimonialModal');
        const title = document.getElementById('testimonialModalTitle');
        
        if (testimonial) {
            title.textContent = 'Edit Testimonial';
            document.getElementById('testimonialAuthor').value = testimonial.author;
            document.getElementById('testimonialProject').value = testimonial.project;
            document.getElementById('testimonialProjectLink').value = testimonial.project_link || '';
            document.getElementById('testimonialRating').value = testimonial.rating;
            document.getElementById('testimonialText').value = testimonial.text;
            this.currentEditId = testimonial.id;
            
            // Handle existing image
            if (testimonial.image_url) {
                this.displayImagePreview(testimonial.image_url);
            } else {
                this.resetImageUpload();
            }
        } else {
            title.textContent = 'Add Testimonial';
            document.getElementById('testimonialForm').reset();
            this.currentEditId = null;
            this.resetImageUpload();
        }
        
        modal.style.display = 'block';
    }

    async saveTestimonial() {
        try {
            let imageUrl = null;
            
            // Process image if selected
            if (this.currentImageFile) {
                imageUrl = await this.uploadImage(this.currentImageFile, 'testimonials');
            }
            
            const testimonialData = {
                author: document.getElementById('testimonialAuthor').value,
                project: document.getElementById('testimonialProject').value,
                project_link: document.getElementById('testimonialProjectLink').value || null,
                rating: parseInt(document.getElementById('testimonialRating').value),
                text: document.getElementById('testimonialText').value
            };
            
            // Add image_url if we have an image
            if (imageUrl) {
                testimonialData.image_url = imageUrl;
            }

            if (this.currentEditId) {
                await SupabaseDB.updateTestimonial(this.currentEditId, testimonialData);
                this.showSuccess('Testimonial updated successfully');
            } else {
                await SupabaseDB.createTestimonial(testimonialData);
                this.showSuccess('Testimonial created successfully');
            }

            this.loadTestimonials();
            this.closeModal('testimonialModal');
        } catch (error) {
            this.showError('Failed to save testimonial: ' + error.message);
        }
    }

    async editTestimonial(id) {
        try {
            const testimonials = await SupabaseDB.getTestimonials();
            const testimonial = testimonials.find(t => t.id === id);
            this.openTestimonialModal(testimonial);
        } catch (error) {
            this.showError('Failed to load testimonial: ' + error.message);
        }
    }

    async deleteTestimonial(id) {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await SupabaseDB.deleteTestimonial(id);
                this.showSuccess('Testimonial deleted successfully');
                this.loadTestimonials();
            } catch (error) {
                this.showError('Failed to delete testimonial: ' + error.message);
            }
        }
    }

    // Services Management
    async loadServices() {
        try {
            const services = await SupabaseDB.getServices();
            const servicesList = document.getElementById('servicesList');
            servicesList.innerHTML = '';

            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'item-card';
                serviceCard.innerHTML = `
                    <div class="item-content">
                        <h4>${service.title}</h4>
                        <p>${service.description.substring(0, 100)}...</p>
                        <small>Tech: ${service.technologies.join(', ')}</small>
                    </div>
                    <div class="item-actions">
                        <button class="edit-btn" onclick="admin.editService(${service.id})">Edit</button>
                        <button class="delete-btn" onclick="admin.deleteService(${service.id})">Delete</button>
                    </div>
                `;
                servicesList.appendChild(serviceCard);
            });
        } catch (error) {
            this.showError('Failed to load services: ' + error.message);
        }
    }

    async openServiceModal(service = null) {
        const modal = document.getElementById('serviceModal');
        const title = document.getElementById('serviceModalTitle');
        
        if (service) {
            title.textContent = 'Edit Service';
            document.getElementById('serviceTitle').value = service.title;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('serviceIcon').value = service.icon;
            document.getElementById('serviceTech').value = service.technologies.join(', ');
            this.currentEditId = service.id;
        } else {
            title.textContent = 'Add Service';
            document.getElementById('serviceForm').reset();
            this.currentEditId = null;
        }
        
        modal.style.display = 'block';
    }

    async saveService() {
        try {
            const serviceData = {
                title: document.getElementById('serviceTitle').value,
                description: document.getElementById('serviceDescription').value,
                icon: document.getElementById('serviceIcon').value,
                technologies: document.getElementById('serviceTech').value.split(',').map(t => t.trim())
            };

            if (this.currentEditId) {
                await SupabaseDB.updateService(this.currentEditId, serviceData);
                this.showSuccess('Service updated successfully');
            } else {
                await SupabaseDB.createService(serviceData);
                this.showSuccess('Service created successfully');
            }

            this.loadServices();
            this.closeModal('serviceModal');
        } catch (error) {
            this.showError('Failed to save service: ' + error.message);
        }
    }

    async editService(id) {
        try {
            const services = await SupabaseDB.getServices();
            const service = services.find(s => s.id === id);
            this.openServiceModal(service);
        } catch (error) {
            this.showError('Failed to load service: ' + error.message);
        }
    }

    async deleteService(id) {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                await SupabaseDB.deleteService(id);
                this.showSuccess('Service deleted successfully');
                this.loadServices();
            } catch (error) {
                this.showError('Failed to delete service: ' + error.message);
            }
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            
            this.currentImageFile = file;
            
            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.displayImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
    
    displayImagePreview(imageSrc) {
        const container = document.getElementById('imagePreviewContainer');
        const upload = document.getElementById('testimonialImageUpload');
        
        container.innerHTML = `
            <img src="${imageSrc}" class="image-preview" alt="Preview">
            <button type="button" class="remove-image" onclick="admin.resetImageUpload()">Remove Image</button>
        `;
        upload.classList.add('has-image');
    }
    
    resetImageUpload() {
        const container = document.getElementById('imagePreviewContainer');
        const upload = document.getElementById('testimonialImageUpload');
        const input = document.getElementById('testimonialImageInput');
        
        container.innerHTML = `
            <div class="upload-text">
                <i class="fas fa-cloud-upload-alt"></i><br>
                Click to upload client image<br>
                <small>JPG, PNG, GIF (Max 5MB)</small>
            </div>
        `;
        upload.classList.remove('has-image');
        input.value = '';
        this.currentImageFile = null;
    }
    
    async uploadImage(file, folder) {
        try {
            // Convert image to base64 for storage in database
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error('Failed to read image file'));
                reader.readAsDataURL(file);
            });
        } catch (error) {
            throw new Error('Failed to process image: ' + error.message);
        }
    }
    
    handleProjectMediaUpload(event) {
        const files = Array.from(event.target.files);
        
        for (const file of files) {
            // Validate file size (20MB max for both images and videos)
            const maxSize = 20 * 1024 * 1024;
            if (file.size > maxSize) {
                alert(`File ${file.name} size must be less than ${maxSize / (1024 * 1024)}MB`);
                continue;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                alert(`Please select only image or video files. ${file.name} is not supported.`);
                continue;
            }
            
            const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
            
            // Add to media files array
            this.currentProjectMediaFiles.push({
                file: file,
                type: mediaType,
                isExisting: false
            });
        }
        
        this.displayMultipleMediaPreview();
        event.target.value = ''; // Reset input
    }
    
    displayMultipleMediaPreview() {
        const container = document.getElementById('projectMediaPreviewContainer');
        
        if (this.currentProjectMediaFiles.length === 0) {
            this.resetProjectMediaUpload();
            return;
        }
        
        let previewHtml = '<div class="media-grid">';
        
        this.currentProjectMediaFiles.forEach((mediaFile, index) => {
            let mediaElement = '';
            
            if (mediaFile.isExisting) {
                if (mediaFile.type === 'video') {
                    mediaElement = `<video src="${mediaFile.url}" class="media-preview" muted></video>`;
                } else {
                    mediaElement = `<img src="${mediaFile.url}" class="media-preview" alt="Preview">`;
                }
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const preview = document.querySelector(`[data-index="${index}"] .media-placeholder`);
                    if (preview) {
                        if (mediaFile.type === 'video') {
                            preview.innerHTML = `<video src="${e.target.result}" class="media-preview" muted></video>`;
                        } else {
                            preview.innerHTML = `<img src="${e.target.result}" class="media-preview" alt="Preview">`;
                        }
                    }
                };
                reader.readAsDataURL(mediaFile.file);
                mediaElement = '<div class="media-placeholder">Loading...</div>';
            }
            
            previewHtml += `
                <div class="media-item" data-index="${index}">
                    ${mediaElement}
                    <button type="button" class="remove-media-item" onclick="admin.removeMediaItem(${index})">&times;</button>
                    <span class="media-type">${mediaFile.type}</span>
                </div>
            `;
        });
        
        previewHtml += '</div>';
        previewHtml += `<button type="button" id="addMediaBtn" class="add-media-btn">+ Add More Media</button>`;
        
        container.innerHTML = previewHtml;
        
        // Re-attach event listener for add button
        document.getElementById('addMediaBtn').addEventListener('click', () => {
            document.getElementById('projectMediaInput').click();
        });
    }
    
    resetProjectMediaUpload() {
        const container = document.getElementById('projectMediaPreviewContainer');
        const input = document.getElementById('projectMediaInput');
        
        container.innerHTML = `
            <div class="upload-text">
                <i class="fas fa-cloud-upload-alt"></i><br>
                Click to upload project images/videos<br>
                <small>JPG, PNG, GIF, MP4, WebM (Max 20MB each)</small>
            </div>
        `;
        input.value = '';
        this.currentProjectMediaFiles = [];
    }
    
    removeMediaItem(index) {
        this.currentProjectMediaFiles.splice(index, 1);
        this.displayMultipleMediaPreview();
    }
    
    async uploadProjectMedia(file) {
        try {
            // Upload to Supabase Storage and return public URL
            const fileExt = file.name.split('.').pop();
            const safeExt = fileExt ? fileExt.toLowerCase() : 'dat';
            const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
            const path = `projects/${uniqueId}.${safeExt}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(path, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type || undefined
                });
            if (uploadError) {
                throw new Error(uploadError.message || 'Upload failed');
            }

            const { data: publicData } = supabase.storage
                .from('media')
                .getPublicUrl(path);
            return publicData.publicUrl;
        } catch (error) {
            throw new Error('Failed to upload media: ' + error.message);
        }
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        this.currentEditId = null;
        this.currentEditType = null;
        this.currentEditSkillId = null;
        this.currentImageFile = null;
        this.currentProjectMediaFiles = [];
        if (modalId === 'testimonialModal') {
            this.resetImageUpload();
        }
        if (modalId === 'projectModal') {
            this.resetProjectMediaUpload();
        }
    }
}

// Global functions for onclick handlers
function openProjectModal() {
    admin.openProjectModal();
}



function openTestimonialModal() {
    admin.openTestimonialModal();
}

function openServiceModal() {
    admin.openServiceModal();
}

function closeModal(modalId) {
    admin.closeModal(modalId);
}

function savePersonalDetails() {
    admin.savePersonalDetails();
}

// Initialize admin panel
const admin = new AdminPanel();

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}