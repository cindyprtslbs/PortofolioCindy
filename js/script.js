// DOM Elements
const header = document.querySelector(".header")
const themeToggle = document.querySelector(".theme-toggle")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const contactForm = document.getElementById("contact-form")
const formStatus = document.getElementById("form-status")

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const currentTheme = localStorage.getItem("theme")

if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add("dark-mode")
}

// Theme Toggle Functionality
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")

  // Save theme preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
})

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

// Call on page load
setActiveNavLink()
