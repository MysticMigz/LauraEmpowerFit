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
    
    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        console.log('Looking for carousel:', carousel);
        
        if (!carousel) {
            console.error('No carousel found on page');
            return;
        }

        const items = Array.from(carousel.querySelectorAll('.carousel-item'));
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        console.log('Found elements:', {
            itemsCount: items.length,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });

        let currentIndex = items.findIndex(item => item.classList.contains('active'));
        if (currentIndex === -1) currentIndex = 0;
        
        console.log('Starting with index:', currentIndex);

        // Initialize videos with better mobile handling
        items.forEach((item, index) => {
            const video = item.querySelector('video');
            if (video) {
                // Force muted state for autoplay
                video.muted = true;
                video.setAttribute('muted', '');
                
                // Mobile optimizations
                if (window.innerWidth <= 768) {
                    video.removeAttribute('controls');
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', '');
                    
                    // Set lower quality for mobile
                    if (video.videoHeight > 720) {
                        video.style.objectFit = 'contain';
                    }
                }
                
                // Optimize video loading
                video.setAttribute('preload', 'metadata');
                
                // Prevent memory leaks
                video.addEventListener('loadedmetadata', () => {
                    if (!item.classList.contains('active')) {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
                
                // Handle video loading and errors
                video.addEventListener('canplay', () => {
                    if (index === currentIndex) {
                        video.play().catch(e => {
                            console.log('Autoplay prevented:', e);
                            // Add play button for mobile if autoplay fails
                            if (window.innerWidth <= 768) {
                                const playButton = document.createElement('button');
                                playButton.className = 'video-play-btn';
                                playButton.innerHTML = '▶';
                                item.appendChild(playButton);
                                
                                playButton.addEventListener('click', () => {
                                    video.play();
                                    playButton.style.display = 'none';
                                });
                            }
                        });
                    }
                });
                
                video.addEventListener('error', (e) => {
                    console.error(`Video ${index + 1} error:`, e);
                    item.innerHTML = '<div class="video-error">Video unavailable</div>';
                });
            }
        });

        // Create dots for navigation
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => changeSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

        // Handle slide changes
        let isTransitioning = false;
        let touchStartX = 0;
        let touchEndX = 0;
        let autoplayInterval;

        async function changeSlide(newIndex, direction = null) {
            if (isTransitioning || newIndex === currentIndex) return;
            isTransitioning = true;
            
            console.log(`Changing to slide ${newIndex} from ${currentIndex}`);
            
            // Handle videos
            const currentVideo = items[currentIndex].querySelector('video');
            const newVideo = items[newIndex].querySelector('video');
            
            // Pause current video
            if (currentVideo) {
                currentVideo.pause();
                currentVideo.currentTime = 0;
            }
            
            // Update classes
            items[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            items[newIndex].classList.add('active');
            dots[newIndex].classList.add('active');
            
            // Play new video
            if (newVideo) {
                try {
                    newVideo.currentTime = 0;
                    await newVideo.play();
                } catch (error) {
                    console.log('Video play prevented:', error);
                }
            }
            
            currentIndex = newIndex;
            
            // Release transition lock
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }

        // Touch handling
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        }

        function handleTouchMove(e) {
            if (!touchStartX) return;
            e.preventDefault();
            touchEndX = e.touches[0].clientX;
        }

        function handleTouchEnd() {
            if (!touchStartX || !touchEndX) {
                touchStartX = 0;
                touchEndX = 0;
                return;
            }

            const diff = touchStartX - touchEndX;
            const threshold = carousel.offsetWidth * 0.2; // 20% of carousel width

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    changeSlide((currentIndex + 1) % items.length);
                } else {
                    changeSlide((currentIndex - 1 + items.length) % items.length);
                }
            }

            touchStartX = 0;
            touchEndX = 0;
            startAutoplay();
        }

        // Autoplay handling
        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                changeSlide((currentIndex + 1) % items.length);
            }, 8000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        // Event Listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stopAutoplay();
                changeSlide((currentIndex - 1 + items.length) % items.length);
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stopAutoplay();
                changeSlide((currentIndex + 1) % items.length);
                startAutoplay();
            });
        }

        // Touch events
        carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd);

        // Mouse events for desktop
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoplay();
                changeSlide((currentIndex - 1 + items.length) % items.length);
                startAutoplay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoplay();
                changeSlide((currentIndex + 1) % items.length);
                startAutoplay();
            }
        });

        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        // Start autoplay
        startAutoplay();
    }

    // Initialize carousel
    initCarousel();
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

// Contact Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Initialize EmailJS
    emailjs.init("V1adpilxPoKiDsC3z");

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        // Hide any existing messages
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';

        // Prepare template parameters
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            goal: document.getElementById('goal').value,
            message: document.getElementById('message').value,
            additional: document.getElementById('additional').value
        };

        // Send email using EmailJS
        emailjs.send('service_jclpkug', 'template_vi7hku8', templateParams)
            .then(function(response) {
                // Check if the email was actually sent
                if (response.status === 200) {
                    // Show success message
                    document.getElementById('success-message').style.display = 'block';
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message if status is not 200
                    document.getElementById('error-message').style.display = 'block';
                    document.getElementById('error-message').textContent = 'Something went wrong. Please try again or contact me directly.';
                    console.log('EmailJS response:', response);
                }
            })
            .catch(function(error) {
                // Show detailed error message
                document.getElementById('error-message').style.display = 'block';
                if (error.text) {
                    document.getElementById('error-message').textContent = `Error: ${error.text}`;
                } else {
                    document.getElementById('error-message').textContent = 'Failed to send message. Please try again or contact me directly.';
                }
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
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