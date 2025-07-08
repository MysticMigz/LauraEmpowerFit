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

console.log('Script loaded');

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize reviews carousel
    initReviewsCarousel();
    
    // Remove the entire initVideoCarousel function and any code that references it, including DOMContentLoaded logic for videoCarousel.
});

// Reviews Carousel Functionality
function initReviewsCarousel() {
    const carousel = document.querySelector('.reviews-carousel');
    if (!carousel) return;

        const items = Array.from(carousel.querySelectorAll('.carousel-item'));
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        let currentIndex = items.findIndex(item => item.classList.contains('active'));
        if (currentIndex === -1) currentIndex = 0;

        // Create dots for navigation
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => changeSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

    function changeSlide(newIndex) {
        if (newIndex === currentIndex) return;
        
        items[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        items[newIndex].classList.add('active');
        dots[newIndex].classList.add('active');
        
        currentIndex = newIndex;
    }

    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        changeSlide(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % items.length;
        changeSlide(newIndex);
    });

    // Auto-advance slides
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % items.length;
            changeSlide(newIndex);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped right
                const newIndex = (currentIndex - 1 + items.length) % items.length;
                changeSlide(newIndex);
            } else {
                // Swiped left
                const newIndex = (currentIndex + 1) % items.length;
                changeSlide(newIndex);
            }
        }
    }

    // Start autoplay
    startAutoplay();

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const newIndex = (currentIndex - 1 + items.length) % items.length;
            changeSlide(newIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const newIndex = (currentIndex + 1) % items.length;
            changeSlide(newIndex);
        }
    });
}

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

// Contact Form Submission with EmailJS
console.log('Contact form script loaded');
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    console.log('Contact form found in DOM');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Hide any previous messages
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';

        // Verify EmailJS configuration
        try {
            if (!window.EMAILJS_CONFIG) {
                throw new Error('EmailJS configuration is missing');
            }

            const { serviceId, templateId } = window.EMAILJS_CONFIG;
            
            if (!serviceId || !templateId) {
                throw new Error('EmailJS configuration is incomplete');
            }

            // Prepare the template parameters from form data
            const formData = new FormData(event.target);
        const templateParams = {
                from_name: formData.get('from_name'),
                reply_to: formData.get('reply_to'),
                phone_number: formData.get('phone_number'),
                goal_type: formData.get('goal_type'),
                message: formData.get('message'),
                additional_info: formData.get('additional_info') || ''
        };

            // Send email using EmailJS send method
            emailjs.send(
                serviceId,
                templateId,
                templateParams
            ).then(function(response) {
                console.log('EmailJS Response:', response);
                if (response.status === 200) {
                    document.getElementById('success-message').style.display = 'block';
                    document.getElementById('contactForm').reset();
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            }).catch(function(error) {
                console.error('EmailJS Error:', error);
                document.getElementById('error-message').textContent = 'Sorry, something went wrong. Please try again or email me directly at laura.empowerfit@gmail.com';
                document.getElementById('error-message').style.display = 'block';
            });
        } catch (error) {
            console.error('Configuration Error:', error);
            document.getElementById('error-message').textContent = 'Sorry, the contact form is not properly configured. Please email me directly at laura.empowerfit@gmail.com';
            document.getElementById('error-message').style.display = 'block';
        } finally {
                // Reset button state
            submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
        }
    });
}

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