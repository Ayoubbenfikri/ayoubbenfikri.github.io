
// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Counter animation
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

// Skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevels = entry.target.querySelectorAll('.skill-level');
            skillLevels.forEach(skill => {
                const width = skill.getAttribute('data-width');
                skill.style.width = width + '%';
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target, 1500);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Project card hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Download button alert (if no resume.pdf file exists)
const downloadBtn = document.getElementById('downloadBtn');

// Form submission handling (if you add a contact form)
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current nav link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Initialize skill bars to 0
    document.querySelectorAll('.skill-level').forEach(skill => {
        skill.style.width = '0%';
    });
});


const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

btn.addEventListener("click", toggleMusic);

function toggleMusic(){
    if (music.paused) {
        music.play();
        btn.textContent = "⏸ Pause Music";
    } else {
        music.pause();
        btn.textContent = "▶ Play Music";
    }
}

// Auto-sliding project galleries - only hovered slider moves
// Remove ALL the hover slider code and replace with:

document.querySelectorAll('.project-slider').forEach(slider => {
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const totalSlides = slides.length;
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + totalSlides) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Click events for arrows
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
});

// Animate sections on scroll
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    sectionObserver.observe(section);
});


// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const darkModeText = document.querySelector('.dark-mode-btn span');
const darkModeIcon = document.querySelector('.dark-mode-btn i');

let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode on load
if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeText.textContent = 'Light Mode';
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    body.classList.toggle('dark-mode', isDarkMode);
    
    if (isDarkMode) {
        darkModeText.textContent = 'Light Mode';
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeText.textContent = 'Dark Mode';
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
}

// Initialize
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}


// Languages animation
const languagesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const languageItems = entry.target.querySelectorAll('.language-item');
            const languageFills = entry.target.querySelectorAll('.language-fill');
            
            // Animate each item with delay
            languageItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                    
                    // Animate progress bar
                    const fill = languageFills[index];
                    const width = fill.getAttribute('data-level') + '%';
                    
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.transition = 'width 1.5s ease-in-out';
                        fill.style.width = width;
                    }, 300);
                    
                    // Add wave animation
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 500);
                }, index * 300);
            });
            
            languagesObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe languages section
const languagesSection = document.getElementById('languages');
if (languagesSection) {
    languagesObserver.observe(languagesSection);
}