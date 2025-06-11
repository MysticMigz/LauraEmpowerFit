// Mobile Menu Functionality
const burgerMenu = document.querySelector('.burger');
const navMenu = document.querySelector('nav');

if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        
        if (navMenu) {
            if (navMenu.style.display === 'block') {
                // Animate menu items out
                const menuItems = navMenu.querySelectorAll('li');
                menuItems.forEach((item, index) => {
                    item.style.animation = `fadeOutUp 0.3s forwards ${index * 0.1}s`;
                });
                
                // After animations complete, hide the menu
                setTimeout(() => {
                    navMenu.style.display = 'none';
                    // Reset animations for next open
                    menuItems.forEach(item => {
                        item.style.animation = '';
                    });
                }, 500);
            } else {
                navMenu.style.display = 'block';
                
                // Animate menu items in
                const menuItems = navMenu.querySelectorAll('li');
                menuItems.forEach((item, index) => {
                    item.style.animation = `fadeInDown 0.5s forwards ${index * 0.1}s`;
                    item.style.opacity = '0';
                });
            }
        }
    });
}

// Close menu when clicking on a nav link (mobile)
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navMenu.style.display === 'block') {
            // Animate menu items out
            const menuItems = navMenu.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.animation = `fadeOutUp 0.3s forwards ${index * 0.1}s`;
            });
            
            // After animations complete, hide the menu
            setTimeout(() => {
                navMenu.style.display = 'none';
                burgerMenu.classList.remove('active');
                // Reset animations for next open
                menuItems.forEach(item => {
                    item.style.animation = '';
                });
            }, 500);
        }
    });
});

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    
    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function goToSlide(index) {
        // Pause all videos
        items.forEach(item => {
            const video = item.querySelector('video');
            if (video) video.pause();
        });
        
        // Remove active class from all items and dots
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current item and dot
        items[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Play video if current slide is a video
        const currentVideo = items[index].querySelector('video');
        if (currentVideo) currentVideo.play();
        
        currentIndex = index;
    }
    
    function nextSlide() {
        goToSlide((currentIndex + 1) % items.length);
    }
    
    function prevSlide() {
        goToSlide((currentIndex - 1 + items.length) % items.length);
    }
    
    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Auto advance slides (optional)
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
});

// Sticky Header with reveal animation
const header = document.querySelector('header');
const scrollThreshold = 50;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > scrollThreshold) {
        header.classList.add('sticky');
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('sticky');
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .review-card, .about-image, .about-text');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            if (element.classList.contains('service-card')) {
                element.style.animation = 'fadeInUp 0.8s ease forwards';
            } else if (element.classList.contains('review-card')) {
                element.style.animation = 'fadeInUp 0.8s ease forwards';
            } else if (element.classList.contains('about-image')) {
                element.style.animation = 'fadeInLeft 0.8s ease forwards';
            } else if (element.classList.contains('about-text')) {
                element.style.animation = 'fadeInRight 0.8s ease forwards';
            }
        }
    });
    
    // Staggered animation for services
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
        }
    });
    
    // Staggered animation for reviews
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
        }
    });
};

// Run the animation function on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (heroSection) {
        const scrollY = window.scrollY;
        heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
});

// Animate service icons on hover
const serviceIcons = document.querySelectorAll('.service-icon');
serviceIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'pulse 1s infinite';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.animation = '';
    });
});

// Form Submission with enhanced animation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Add focus animations to form fields
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // You would typically send this data to a server
        // For demo purposes, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Animate form submission
        const formElements = contactForm.querySelectorAll('.form-group, button');
        formElements.forEach((element, index) => {
            element.style.animation = `fadeOutUp 0.5s forwards ${index * 0.1}s`;
        });
        
        // Show success message after form elements fade out
        setTimeout(() => {
            contactForm.innerHTML = '';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for reaching out! I\'ll get back to you within 24 hours to discuss your fitness journey.';
            
            contactForm.appendChild(successMessage);
            successMessage.style.animation = 'fadeInUp 0.8s forwards';
        }, 800);
    });
}

// Add smooth scrolling for anchor links with progress indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Create progress indicator
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'scroll-progress';
            document.body.appendChild(progressIndicator);
            
            // Start scroll animation
            const startPosition = window.pageYOffset;
            const targetPosition = target.getBoundingClientRect().top + startPosition;
            const distance = targetPosition - startPosition;
            const duration = 1000; // ms
            let startTimestamp = null;
            
            const scrollAnimation = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const elapsed = timestamp - startTimestamp;
                
                // Calculate progress (0 to 1)
                const progress = Math.min(elapsed / duration, 1);
                
                // Update progress indicator
                progressIndicator.style.width = `${progress * 100}%`;
                
                // Calculate new scroll position using easing
                const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                const newPosition = startPosition + distance * easeInOutCubic(progress);
                
                window.scrollTo(0, newPosition);
                
                // Continue animation if not complete
                if (elapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                } else {
                    // Remove progress indicator when complete
                    setTimeout(() => {
                        progressIndicator.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(progressIndicator);
                        }, 300);
                    }, 200);
                }
            };
            
            requestAnimationFrame(scrollAnimation);
        }
    });
});

// Add CSS styles for animations
const style = document.createElement('style');
style.textContent = `
    /* Carousel styles */
    .carousel {
        position: relative;
    }
    
    .carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        color: var(--accent-color);
        font-size: 1.2rem;
    }
    
    .carousel-nav:hover {
        background-color: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .carousel-prev {
        left: 20px;
    }
    
    .carousel-next {
        right: 20px;
    }
    
    .carousel-indicators {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }
    
    .carousel-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .carousel-dot.active {
        background-color: white;
        transform: scale(1.2);
    }
    
    /* Navigation animations */
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    /* Form animations */
    .form-group.focused label {
        transform: translateY(-20px);
        font-size: 0.8rem;
        color: var(--secondary-color);
    }
    
    /* Scroll progress indicator */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 2000;
        width: 0%;
        transition: opacity 0.3s ease;
    }
    
    /* Header transition */
    header {
        transition: transform 0.4s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Success message animation */
    .success-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 30px;
        border-radius: 10px;
        background-color: rgba(224, 175, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }
    
    .success-message i {
        font-size: 2rem;
        color: var(--secondary-color);
        animation: pulse 2s infinite;
    }
`;

document.head.appendChild(style);

// Add a page loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h2>LAURA EMPOWER FIT</h2>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    // Add loader styles
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--accent-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-content h2 {
            margin-bottom: 20px;
            letter-spacing: 3px;
            animation: pulse 2s infinite;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    
    // Remove loader after page is fully loaded
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        
        // Remove loader from DOM after fade out
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1500);
});

// Animated Counter for Statistics
const animateCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // ms
        const step = targetValue / (duration / 16); // Update every ~16ms for 60fps
        let currentValue = 0;
        
        const updateCounter = () => {
            currentValue += step;
            
            if (currentValue < targetValue) {
                stat.textContent = Math.floor(currentValue);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = targetValue;
            }
        };
        
        // Check if element is in viewport
        const rect = stat.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (isInViewport) {
            updateCounter();
        } else {
            // If not in viewport, set up a scroll listener
            const scrollHandler = () => {
                const rect = stat.getBoundingClientRect();
                const isNowInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isNowInViewport) {
                    updateCounter();
                    window.removeEventListener('scroll', scrollHandler);
                }
            };
            
            window.addEventListener('scroll', scrollHandler);
        }
    });
};

// Initialize the counter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', animateCounter);

// Transform cards hover effect
const transformationCards = document.querySelectorAll('.transformation-card');

transformationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        
        const before = card.querySelector('.before img');
        const after = card.querySelector('.after img');
        
        if (before && after) {
            before.style.transform = 'scale(1.05)';
            after.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        
        const before = card.querySelector('.before img');
        const after = card.querySelector('.after img');
        
        if (before && after) {
            before.style.transform = 'scale(1)';
            after.style.transform = 'scale(1)';
        }
    });
});

// Apply gradient text effect to specific elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToGradient = document.querySelectorAll('.service-card h3, .review-author p, .transformation-details h3');
    
    elementsToGradient.forEach(element => {
        element.classList.add('gradient-text');
    });
});

// Newsletter Form Submission
const subscribeForm = document.getElementById('subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(subscribeForm);
        const name = formData.get('name');
        const email = formData.get('email');
        
        console.log('Newsletter subscription:', { name, email });
        
        // Animate form submission
        const formElements = subscribeForm.querySelectorAll('.form-group, button');
        formElements.forEach((element, index) => {
            element.style.animation = `fadeOutUp 0.5s forwards ${index * 0.1}s`;
        });
        
        // Show success message
        setTimeout(() => {
            subscribeForm.innerHTML = '';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = '<i class="fas fa-paper-plane"></i> Thanks for subscribing! Check your email for a welcome message.';
            
            subscribeForm.appendChild(successMessage);
            successMessage.style.animation = 'fadeInUp 0.8s forwards';
            
            // Reset privacy note
            const privacyNote = document.querySelector('.privacy-note');
            if (privacyNote) {
                privacyNote.style.display = 'none';
            }
        }, 600);
    });
}

// Review Submission System with Email Integration
class ReviewManager {
    constructor() {
        this.currentRating = 0;
        this.init();
        this.initEmailJS();
    }

    init() {
        this.setupStarRating();
        this.setupFormSubmission();
    }

    initEmailJS() {
        // Initialize EmailJS with your public key
        // You'll need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('YOUR_PUBLIC_KEY');
    }

    setupStarRating() {
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('rating-value');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.currentRating = index + 1;
                ratingInput.value = this.currentRating;
                this.updateStarDisplay();
            });

            star.addEventListener('mouseover', () => {
                this.highlightStars(index + 1);
            });
        });

        const starRating = document.querySelector('.star-rating');
        if (starRating) {
            starRating.addEventListener('mouseleave', () => {
                this.updateStarDisplay();
            });
        }
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    updateStarDisplay() {
        this.highlightStars(this.currentRating);
    }

    setupFormSubmission() {
        const form = document.getElementById('review-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }
    }

    async submitReview() {
        const name = document.getElementById('reviewer-name').value.trim();
        const email = document.getElementById('reviewer-email').value.trim();
        const achievement = document.getElementById('achievement').value.trim();
        const reviewText = document.getElementById('review-text').value.trim();

        if (!name || !email || !achievement || !reviewText || this.currentRating === 0) {
            alert('Please fill in all fields and provide a rating.');
            return;
        }

        // Show loading state
        const submitBtn = document.querySelector('#review-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Prepare email template parameters
            const templateParams = {
                reviewer_name: name,
                reviewer_email: email,
                achievement: achievement,
                review_text: reviewText,
                rating: this.currentRating,
                rating_stars: '★'.repeat(this.currentRating) + '☆'.repeat(5 - this.currentRating),
                submission_date: new Date().toLocaleDateString(),
                to_email: 'laura.empowerfit@gmail.com'
            };

            // Send email using EmailJS
            // You'll need to replace these with your actual EmailJS service ID and template ID
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);

            this.showSuccessMessage();
            this.resetForm();

        } catch (error) {
            console.error('Error sending review:', error);
            this.showErrorMessage();
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('review-success');
        const errorMessage = document.getElementById('review-error');
        
        errorMessage.style.display = 'none';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 8000);
    }

    showErrorMessage() {
        const successMessage = document.getElementById('review-success');
        const errorMessage = document.getElementById('review-error');
        
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 8000);
    }

    resetForm() {
        document.getElementById('review-form').reset();
        this.currentRating = 0;
        document.getElementById('rating-value').value = 0;
        this.updateStarDisplay();
    }
}

// Initialize review manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize review system
    new ReviewManager();
}); 