// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            preloader.style.display = 'none';
        }
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false
});

// Initialize Glide.js for testimonials
new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    gap: 30,
    autoplay: 4000,
    hoverpause: true,
    breakpoints: {
        768: {
            perView: 1
        }
    }
}).mount();

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Model filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const modelCards = document.querySelectorAll('.model-card');
const searchBar = document.getElementById('modelSearch');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        modelCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                if (card.dataset.filter.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Search functionality
searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    modelCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const specs = card.querySelector('.model-specs').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || specs.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        this.classList.toggle('active');
        const answer = this.nextElementSibling;
        
        if (this.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Animated counters
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize counters when section is in view
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('bikesSold'), 12500);
            animateCounter(document.getElementById('milesRidden'), 3850000);
            animateCounter(document.getElementById('co2Saved'), 1250);
            animateCounter(document.getElementById('happyCustomers'), 9500);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
    direction: 'vertical'
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Hero image hover effect
const heroImage = document.querySelector('.hero-image');
heroImage.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    heroImage.style.transform = `translateY(-50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'translateY(-50%) rotateY(0deg) rotateX(0deg)';
});

// Sound effects
const buttons = document.querySelectorAll('button, a.btn, .filter-btn');
const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.2;
        hoverSound.play();
    });
    
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.volume = 0.3;
        clickSound.play();
    });
});