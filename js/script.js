// FAQ Toggle Functionality
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

    // Simulate testimonials availability
    const hasTestimonials = false; // Change to true if testimonials are available

    if (hasTestimonials) {
        defaultMessage.style.display = 'none';
        carousel.style.display = 'block';
        startCarousel();
    } else {
        defaultMessage.style.display = 'block';
        carousel.style.display = 'none';
    }
});

// Carousel functionality
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

// EmailJS Initialization
(function () {
    emailjs.init("dkBD1uJhYesT5ZGBb"); // Replace with your actual EmailJS user ID
})();

// Smooth scrolling for anchor links
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

// Form Submission Handling
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data for Brian and the user
    const formData = {
        user_name: document.getElementById('name').value,
        user_email: document.getElementById('email').value,
        user_message: document.getElementById('message').value,
    };

    const serviceToBrian = 'service_3zv623i'; // EmailJS service for Brian
    const templateToBrian = 'template_wt94wm6'; // EmailJS template for Brian

    const serviceToUser = 'service_fquqxa9'; // EmailJS service for user
    const templateToUser = 'template_lc6mzul'; // EmailJS template for user auto-reply

    // Send email to Brian
    emailjs.send(serviceToBrian, templateToBrian, formData)
        .then(response => {
            console.log('Message sent to Brian successfully:', response.status, response.text);

            // Send auto-reply to the user
            const formDataForUser = {
                user_name: formData.user_name, // User's name
                user_email: formData.user_email, // User's email
                user_message: formData.user_message, // Original message
            };

            return emailjs.send(serviceToUser, templateToUser, formDataForUser);
        })
        .then(response => {
            console.log('Auto-reply sent to user successfully:', response.status, response.text);
            alert("Thank you! Your message has been sent, and a confirmation email is on its way to your inbox.");
        })
        .catch(error => {
            console.error('Failed to send message(s):', error);
            alert("An error occurred while sending your message. Please try again.");
        });

    // Clear the form
    document.getElementById('contact-form').reset();
});

// Form Submission Handling
function handleFormSubmit() {
    console.log("handleFormSubmit called"); // Debugging: confirm function execution

    // Collect form data for Brian and the user
    const formDataForBrian = {
        user_name: document.getElementById("name").value,
        user_email: document.getElementById("email").value,
        message_type: document.querySelector('input[name="message_type"]:checked').value,
        user_message: document.getElementById("message").value,
    };

    const formDataForUser = {
        user_name: document.getElementById("name").value, // User's name for the reply email
        user_email: document.getElementById("email").value, // User's email for the reply email
    };

    // EmailJS IDs
    const serviceToBrian = 'service_3zv623i'; // Service for Brian's email
    const templateToBrian = 'template_wt94wm6'; // Template for Brian's email

    const serviceToUser = 'service_fquqxa9'; // Service for user's email
    const templateToUser = 'template_lc6mzul'; // Template for user's auto-reply

    // Send email to Brian
    emailjs.send(serviceToBrian, templateToBrian, formDataForBrian)
        .then(response => {
            console.log('Message sent to Brian successfully:', response.status, response.text);

            // Send auto-reply to the user after Brian's email is sent
            return emailjs.send(serviceToUser, templateToUser, formDataForUser);
        })
        .then(response => {
            console.log('Auto-reply sent to user successfully:', response.status, response.text);
            alert("Thank you! Your message has been sent. A confirmation email has been sent to your address.");
        })
        .catch(error => {
            console.error('Failed to send messages:', error);
            alert("An error occurred. Please try again.");
        });

    // Clear the form
    document.getElementById("contact-form").reset();
}