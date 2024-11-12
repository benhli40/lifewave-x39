// Collapsible FAQ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;

        // Close other open answers
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer) {
                otherAnswer.style.display = 'none';
            }
        });

        // Toggle the answer for the clicked question
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
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

function handleFormSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageType = document.querySelector('input[name="message_type"]:checked').value;
    const message = document.getElementById('message').value;

    if (messageType === 'testimonial') {
        const testimonialList = document.getElementById('testimonial-list');
        const newTestimonial = document.createElement('div');
        newTestimonial.classList.add('testimonial-entry');
        newTestimonial.innerHTML = `<p><strong>${name}:</strong> ${message}</p>`;
        testimonialList.appendChild(newTestimonial);
    } else if (messageType === 'comment') {
        emailjs.send("service_n8gyl7q", "template_ox5e0mh", {
            name: name,
            email: email,
            message: message
        }).then(
            function(response) {
                alert("Thank you for your comment! Your message has been sent.");
            },
            function(error) {
                alert("Oops! There was an error sending your message. Please try again later.");
            }
        );
    }

    document.getElementById('contact-form').reset();
}

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