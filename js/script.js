document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling; // Get the answer for this question
        const allAnswers = document.querySelectorAll('.faq-answer');

        // Close all other answers
        allAnswers.forEach(a => {
            if (a !== answer) {
                a.classList.remove('active');
            }
        });

        // Toggle the clicked answer
        answer.classList.toggle('active');
    });
});

// Initial Setup: Show default message, hide carousel
document.addEventListener("DOMContentLoaded", () => {
    const testimonialList = document.querySelector('#testimonial-list');
    const defaultMessage = document.querySelector('#default-message');
    const carousel = document.querySelector('#testimonial-carousel');

    // Check if there are any real testimonials (in this case, we'll simulate)
    const hasTestimonials = false; // Set to true if testimonials are available

    if (hasTestimonials) {
        // Hide default message, show carousel, and start rotating
        defaultMessage.style.display = 'none';
        carousel.style.display = 'block';
        startCarousel();
    } else {
        // Show default message, hide carousel
        defaultMessage.style.display = 'block';
        carousel.style.display = 'none';
    }
});

// Carousel functionality for placeholder testimonials
let carouselIndex = 0;

function startCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    setInterval(() => {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === carouselIndex) {
                item.classList.add('active');
            }
        });
        carouselIndex = (carouselIndex + 1) % items.length;
    }, 3000);
}

// Initialize EmailJS (if used)
(function(){
    emailjs.init("eSP_6R4oybB6l5hRI");
})();

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

function handleFormSubmit() {
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message_type: document.querySelector('input[name="message_type"]:checked').value,
        message: document.getElementById('message').value
    };

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push(formData);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // Notify user
    alert("Thank you! Your message has been saved.");

    // Clear the form
    document.getElementById('contact-form').reset();
}

// Optional: Function to retrieve and display stored submissions
function displaySubmissions() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.forEach((submission, index) => {
        console.log(`Submission ${index + 1}:`, submission);
    });
}

// Call this function to see stored submissions
displaySubmissions();