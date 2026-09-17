document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Hamburger Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Navigation Active State on Scroll
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Menu Category Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || selectedCategory === itemCategory) {
          item.style.display = 'flex';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Reservation Form Validation & Feedback (UI Only)
  const reservationForm = document.getElementById('reservation-form');
  const formStatus = document.getElementById('form-status');

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs to validate
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');

      // Simple Email Regex
      const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
      // Simple Phone Regex (10 Digits)
      const phonePattern = /^[0-9]{10}$/;

      // Validate Name
      if (nameInput.value.trim() === '') {
        showError(nameInput);
        isValid = false;
      } else {
        removeError(nameInput);
      }

      // Validate Email
      if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput);
        isValid = false;
      } else {
        removeError(emailInput);
      }

      // Validate Phone
      if (!phonePattern.test(phoneInput.value.trim().replace(/[- ]/g, ''))) {
        showError(phoneInput);
        isValid = false;
      } else {
        removeError(phoneInput);
      }

      // If Form is Valid
      if (isValid) {
        formStatus.className = 'form-status success';
        formStatus.innerText = 'Thank you! Your table reservation request has been submitted. We will call you shortly to confirm.';
        
        // Reset Form
        reservationForm.reset();

        // Clear status after 6 seconds
        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.innerText = '';
        }, 6000);
      }
    });
  }

  function showError(inputElement) {
    const parent = inputElement.parentElement;
    parent.classList.add('invalid');
  }

  function removeError(inputElement) {
    const parent = inputElement.parentElement;
    parent.classList.remove('invalid');
  }
});