document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (header) {
        header.style.background = 'var(--light)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }


    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
          
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; 
            } else {
                document.body.style.overflow = ''; 
            }
        });
    }

    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.skill-card, .project-card, .about-img, .about-text, .contact-form').forEach(element => {
            observer.observe(element);
        });
    } else {
        
        document.querySelectorAll('.skill-card, .project-card, .about-img, .about-text, .contact-form').forEach(element => {
            element.classList.add('animate');
        });
    }

  
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

       
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            let errorMessage = '';

       
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            if (!name) {
                isValid = false;
                showFieldError('name', 'Veuillez entrer votre nom');
            }

            if (!email) {
                isValid = false;
                showFieldError('email', 'Veuillez entrer votre email');
            } else if (!isValidEmail(email)) {
                isValid = false;
                showFieldError('email', 'Veuillez entrer un email valide');
            }

            if (!subject) {
                isValid = false;
                showFieldError('subject', 'Veuillez entrer un sujet');
            }

            if (!message) {
                isValid = false;
                showFieldError('message', 'Veuillez entrer un message');
            }

            if (isValid) {
           
                console.log('Formulaire soumis avec succès !');
                
             
                const confirmationMsg = document.createElement('div');
                confirmationMsg.className = 'form-confirmation';
                confirmationMsg.setAttribute('role', 'alert');
                confirmationMsg.textContent = 'Merci pour votre message ! Je vous répondrai dès que possible.';
                
              
                contactForm.parentNode.insertBefore(confirmationMsg, contactForm);
                
              
                confirmationMsg.setAttribute('tabindex', '-1');
                confirmationMsg.focus();
                
         
                contactForm.reset();
            }
        });
    }


    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorDiv);
        field.setAttribute('aria-invalid', 'true');
    }


    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

