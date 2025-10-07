// DOM Elements
const header = document.querySelector(".header")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const contactForm = document.getElementById("contact-form")
const formStatus = document.getElementById("form-status")

// Mobile Menu Toggle
mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active")
  mobileMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active")
    mobileMenu.classList.remove("active")
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Validate form data
    if (!name || !email || !message) {
      showFormStatus("Please fill in all fields", "error")
      return
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.innerHTML
    submitButton.disabled = true
    submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>'

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
      // Reset form
      contactForm.reset()

      // Show success message
      showFormStatus("Thank you! Your message has been sent successfully.", "success")

      // Reset button
      submitButton.disabled = false
      submitButton.innerHTML = originalButtonText

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none"
      }, 5000)
    }, 1500)
  })
}

// Show form status message
function showFormStatus(message, type) {
  formStatus.textContent = message
  formStatus.className = "form-status"
  formStatus.classList.add(type)
  formStatus.style.display = "block"
}

// Initialize active nav links
function setActiveNavLink() {
  const currentLocation = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  function setActive(links) {
    links.forEach((link) => {
      const linkPath = link.getAttribute("href")
      if (currentLocation.includes(linkPath) && linkPath !== "index.html") {
        link.classList.add("active")
      } else if (currentLocation.endsWith("/") && linkPath === "index.html") {
        link.classList.add("active")
      } else if (currentLocation.endsWith("index.html") && linkPath === "index.html") {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  setActive(navLinks)
  setActive(mobileNavLinks)
}

document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.querySelector(".typing-text");
  const text = "I'm a Web Developer";
  let index = 0;
  let isDeleting = false;
  const typingSpeed = 100;  // kecepatan mengetik
  const deletingSpeed = 60; // kecepatan menghapus
  const delayAfterTyping = 1500; // jeda setelah selesai mengetik
  const delayAfterDeleting = 500; // jeda setelah hapus

  function type() {
    if (!isDeleting && index < text.length) {
      typingText.textContent = text.substring(0, index + 1);
      index++;
      setTimeout(type, typingSpeed);
    } 
    else if (isDeleting && index > 0) {
      typingText.textContent = text.substring(0, index - 1);
      index--;
      setTimeout(type, deletingSpeed);
    } 
    else {
      // Saat selesai mengetik atau selesai menghapus
      isDeleting = !isDeleting;
      const delay = isDeleting ? delayAfterTyping : delayAfterDeleting;
      setTimeout(type, delay);
    }
  }

  type();
});

// Fade-in scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show")
    }
  })
})

// Apply to all elements with fade-in-up
document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el))



// Call on page load
setActiveNavLink()
