// Typing animation function
function initTypingAnimation(element) {
    // Reset the element's state if it's already been processed
    if (element.classList.contains('typing-in-progress') || 
        element.classList.contains('typing-complete')) {
        element.classList.remove('typing-complete', 'typing-in-progress');
        element.textContent = '';
    }
    
    const text = element.getAttribute('data-text');
    if (!text) return;
    
    // Clear any existing content and set initial styles
    element.textContent = '';
    element.style.visibility = 'visible';
    element.style.display = 'inline-block';
    
    // Add cursor effect
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
    
    // Mark as being processed
    element.classList.add('typing-in-progress');
    
    let charIndex = 0;
    const typeSpeed = 50; // Speed in milliseconds
    
    function type() {
        if (charIndex < text.length) {
            // Update text content
            element.textContent = text.substring(0, charIndex + 1);
            // Re-append cursor
            element.appendChild(cursor);
            charIndex++;
            requestAnimationFrame(() => setTimeout(type, typeSpeed));
        } else {
            // Animation complete
            element.classList.remove('typing-in-progress');
            element.classList.add('typing-complete');
            // Remove cursor when done
            if (cursor.parentNode === element) {
                element.removeChild(cursor);
            }
        }
    }
    
    type();
}

// Function to initialize typing animation observer
function initTypingObserver() {
    const typingElements = document.querySelectorAll('.text-typing');
    
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Reset animation if element is visible
                if (element.classList.contains('typing-complete')) {
                    element.classList.remove('typing-complete');
                }
                // Only initialize if not in progress
                if (!element.classList.contains('typing-in-progress')) {
                    initTypingAnimation(element);
                }
            }
        });
    }, { threshold: 0.5 });
    
    typingElements.forEach(element => typingObserver.observe(element));
}

// Function to animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.parentElement;
        const targetWidth = progress.getAttribute('data-width') || '100%';
        // Reset width and opacity for animation
        bar.style.width = '0';
        bar.style.opacity = '1';
        progress.classList.remove('animate');
        // Trigger reflow
        void bar.offsetWidth;
        // Animate to target width
        setTimeout(() => {
            bar.style.width = targetWidth;
            progress.classList.add('animate');
        }, 50);
    });
}

// Function to set progress bar widths according to data-width
function setProgressBarWidths() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.parentElement;
        const targetWidth = progress.getAttribute('data-width') || '100%';
        bar.style.width = targetWidth;
    });
}

// Project data
const projects = {
    heart: {
        title: 'Heart Disease Prediction System',
        image: './images/heart-disease.jpg',
        description: 'A machine learning-powered web application designed to assess the likelihood of heart disease based on user-provided medical parameters such as age, blood pressure, cholesterol levels, heart rate, and other key health indicators.',
        features: [
            'Built with Python and Flask for the backend',
            'Machine learning model trained on real medical data',
            'Responsive and user-friendly interface',
            'Secure data handling and processing',
            'Detailed risk assessment with explanations'
        ],
        tags: ['Machine Learning', 'Python', 'Flask', 'scikit-learn', 'Pandas'],
       
        
    },
    portfolio: {
        title: 'Personal Portfolio Website',
        image: './images/portfolio.jpg',
        description: 'A responsive portfolio website built with HTML, CSS, and JavaScript to showcase my projects, skills, and experience with a modern and clean design.',
        features: [
            'Fully responsive design for all devices',
            'Interactive UI with smooth animations',
            'Project showcase with detailed modals',
            'Skills section with animated progress bars',
            'Contact form with validation'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX'],
        liveUrl: 'https://myportfoliopooja.netlify.app/'
      
    },
    weather: {
        title: 'Weather Forecast App',
        image: './images/weather.png',
        description: 'A responsive weather application that displays current weather and forecasts using a weather API with an intuitive and beautiful interface.',
        features: [
            'Real-time weather data from a weather API',
            '5-day weather forecast',
            'Location-based weather information',
            'Responsive design that works on all devices',
            'Beautiful UI with weather icons'
        ],
        tags: ['JavaScript', 'API Integration', 'Responsive Design', 'CSS3', 'HTML5'],
        liveUrl: '#'
       
    },
    netflix: {
        title: 'Netflix Clone',
        image: './images/netflix.jfif',
        description: 'A Netflix Clone built with React that mimics the look and feel of the original Netflix UI, including movie browsing, search, and responsive design.',
        features: [
            'Built with React and modern JavaScript',
            'Responsive Netflix-like UI',
            'Movie browsing and search functionality',
            'API integration for movie data',
            'Attractive and interactive design'
        ],
        tags: ['React', 'JavaScript', 'API', 'Responsive Design'],
        liveUrl: 'https://stream-zone.netlify.app/'
      
    }
};

// Initialize project modals
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to open modal with project details
    function openModal(projectId) {
        const project = projects[projectId];
        if (!project) return;
        modalContent.innerHTML = `
            <h2 class="modal-project-title">${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <p class="modal-project-description">${project.description}</p>
            <div class="modal-project-features">
                <h4>Key Features:</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span class=\"badge bg-secondary\">${tag}</span>`).join('')}
            </div>
            <div class="modal-project-links">
                ${projectId !== 'heart' ? `<a href="${project.liveUrl}" class="btn btn-live" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
        modalContent.setAttribute('tabindex', '0');
        modalContent.focus();
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Reset modal state for accessibility
        modal.setAttribute('aria-hidden', 'true');
        modalContent.removeAttribute('tabindex');
    }

    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = card.getAttribute('data-project');
            if (projectId) {
                openModal(projectId);
            }
        });

        // Add keyboard support for project cards
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = card.getAttribute('data-project');
                if (projectId) {
                    openModal(projectId);
                }
            }
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle focus trapping inside modal for accessibility
    document.addEventListener('focus', (e) => {
        if (modal.classList.contains('active') && !modal.contains(e.target)) {
            e.stopPropagation();
            modalContent.focus();
        }
    }, true);
}

// Initialize certificate modal functionality
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('enlargedCertificate');
    const closeBtn = document.querySelector('.certificate-modal .close');
    const certificateItems = document.querySelectorAll('.certificate-item');

    if (!modal || !modalImg) return;

    function openCertificateModal(imgSrc) {
        modalImg.src = imgSrc;
        modalImg.classList.remove('zoomed');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCertificateModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Toggle zoom on image click
    function toggleZoom() {
        modalImg.classList.toggle('zoomed');
    }

    certificateItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                openCertificateModal(img.src);
            });
            item.style.cursor = 'pointer';
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCertificateModal();
        });
    }

    // Toggle zoom on image click
    modalImg.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleZoom();
    });

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });

    // Close with Escape key or zoom out if zoomed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalImg.classList.contains('zoomed')) {
                modalImg.classList.remove('zoomed');
            } else if (modal.classList.contains('active')) {
                closeCertificateModal();
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM fully loaded');
    
    // Initialize typing animation observer
    initTypingObserver();
    
    // Initialize skill animations
    const skillSection = document.querySelector('.skills-container');
    if (skillSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(skillSection);
    }
    
    // Initialize project modals with navbar handling
    if (typeof initProjectModals === 'function') {
        initProjectModals();
        
        // Handle navbar visibility for modals
        const projectModals = document.querySelectorAll('.project-modal');
        const header = document.querySelector('header');
        
        projectModals.forEach(modal => {
            modal.addEventListener('show.bs.modal', () => {
                if (header) header.style.display = 'none';
                document.body.style.overflow = 'hidden';
            });
            
            modal.addEventListener('hidden.bs.modal', () => {
                if (header) header.style.display = '';
                document.body.style.overflow = '';
            });
        });
    }
    
    if (typeof window.certificateModalInitialized === 'undefined') {
        initCertificateModal();
        window.certificateModalInitialized = true;
    }
    
    // Initialize progress bars when skills section is in view
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        skillsObserver.observe(skillsSection);
    }

    // Navbar Active Link Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            let mostVisible = entries.find((entry) => entry.isIntersecting);
            if (mostVisible) {
                navLinks.forEach((link) => link.classList.remove("active"));
                const targetId = mostVisible.target.getAttribute("id");
                const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        },
        { rootMargin: "0px", threshold: [0.3, 0.5, 0.7] }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    // Read More Button Functionality
    document.querySelectorAll(".btn.read-more").forEach((button) => {
        button.addEventListener("click", function () {
            const moreText = this.parentElement.querySelector(".more-text");
            if (moreText) {
                moreText.style.display = moreText.style.display === "none" ? "inline" : "none";
                this.textContent = moreText.style.display === "none" ? "Read More" : "Read Less";
            }
        });
    });

    // Form Validation
    const form = document.querySelector(".contact-form form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let isValid = true;

            // Remove existing error messages
            document.querySelectorAll(".error-message").forEach((el) => el.remove());

            // Validate form fields
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            function showError(input, message) {
                if (!input) return;
                const error = document.createElement("div");
                error.className = "error-message";
                error.textContent = message;
                input.parentNode.insertBefore(error, input.nextSibling);
                input.classList.add('is-invalid');
                isValid = false;
            }

            // Form validations
            if (!name || name.value.trim() === "") showError(name, "Name is required");
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, "Please enter a valid email");
            }
            if (!message || message.value.trim() === "") showError(message, "Message is required");

            if (isValid) {
                // Form submission logic here
                console.log('Form submitted successfully!');
                // form.submit();
            }
        });
    }

    setProgressBarWidths();

    // Contact form error message for each field (using correct IDs, below each input)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        // Add state options if missing
        const stateSelect = contactForm.querySelector('#inputState');
        if (stateSelect && stateSelect.options.length <= 2) {
            const states = [
                'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
                'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
                'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
                'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
                'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
                'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir'
            ];
            states.forEach(state => {
                const opt = document.createElement('option');
                opt.value = state;
                opt.textContent = state;
                stateSelect.appendChild(opt);
            });
        }
        contactForm.addEventListener('submit', function(e) {
            let hasError = false;
            // Remove previous errors and success message
            contactForm.querySelectorAll('.input-error, .form-success').forEach(el => el.remove());
            // Validate each field by ID
            const firstName = contactForm.querySelector('#firstName');
            const email = contactForm.querySelector('#inputEmail');
            const password = contactForm.querySelector('#password');
            const address = contactForm.querySelector('#inputAddress');
            const state = contactForm.querySelector('#inputState');
            const zip = contactForm.querySelector('input[name="pin"]');
            // Add error below each input if empty/invalid
            if (firstName && !firstName.value.trim()) {
                const err = document.createElement('div');
                err.className = 'input-error';
                err.textContent = 'Name cannot be empty!';
                firstName.insertAdjacentElement('afterend', err);
                hasError = true;
            }
            if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                const err = document.createElement('div');
                err.className = 'input-error';
                err.textContent = 'Enter a valid email!';
                email.insertAdjacentElement('afterend', err);
                hasError = true;
            }
            if (password && password.value.trim().length < 6) {
                const err = document.createElement('div');
                err.className = 'input-error';
                err.textContent = 'Password must be at least 6 characters!';
                password.insertAdjacentElement('afterend', err);
                hasError = true;
            }
            if (address && !address.value.trim()) {
                const err = document.createElement('div');
                err.className = 'input-error';
                err.textContent = 'Address cannot be empty!';
                address.insertAdjacentElement('afterend', err);
                hasError = true;
            }
            if (state && (!state.value || state.value === 'Choose...')) {
                const err = document.createElement('div');
                err.className = 'input-error';
                err.textContent = 'Please select a state!';
                state.insertAdjacentElement('afterend', err);
                hasError = true;
            }
            if (zip && (!/^\d{6}$/.test(zip.value.trim()))) {
                const err = document.createElement('div');
                err.className = 'input-error';
                err.textContent = 'Pin code must be 6 digits!';
                zip.insertAdjacentElement('afterend', err);
                hasError = true;
            }
            if (hasError) {
                e.preventDefault();
            } else {
                e.preventDefault(); // Prevent default for demo, remove if real backend
                // Clear all fields
                if (firstName) firstName.value = '';
                if (email) email.value = '';
                if (password) password.value = '';
                if (address) address.value = '';
                if (state) state.value = 'Choose...';
                if (zip) zip.value = '';
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Your message was successfully submitted!';
                successMsg.style.color = '#00e6e6';
                successMsg.style.fontWeight = 'bold';
                successMsg.style.textAlign = 'center';
                successMsg.style.marginTop = '16px';
                contactForm.appendChild(successMsg);
                // Scroll to home section
                const homeSection = document.getElementById('section-1');
                if (homeSection) {
                    homeSection.scrollIntoView({ behavior: 'smooth' });
                }
                // Remove success message after 3 seconds
                setTimeout(() => {
                    if (successMsg.parentElement) successMsg.parentElement.removeChild(successMsg);
                }, 3000);
            }
        });
    }

    // Certificate grid zoom effect
    document.querySelectorAll('.certificate-img').forEach(img => {
        img.addEventListener('click', function(e) {
            // Remove zoom from any other image
            document.querySelectorAll('.certificate-img.zoomed').forEach(z => {
                if (z !== img) z.classList.remove('zoomed');
            });
            // Toggle zoom on this image
            img.classList.toggle('zoomed');
            e.stopPropagation();
        });
    });
    // Unzoom when clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.certificate-img.zoomed').forEach(z => {
            z.classList.remove('zoomed');
        });
    });
    // Prevent unzoom when clicking on the image
    document.querySelectorAll('.certificate-img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});
