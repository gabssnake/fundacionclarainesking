// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active")

      // Toggle hamburger animation
      const spans = mobileMenuToggle.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (mobileNav.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = ""
          span.style.opacity = ""
        }
      })
    })

    // Close mobile menu when clicking on links
    const mobileNavLinks = mobileNav.querySelectorAll("a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active")
        const spans = mobileMenuToggle.querySelectorAll("span")
        spans.forEach((span) => {
          span.style.transform = ""
          span.style.opacity = ""
        })
      })
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".site-header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission handling
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.firstName || !data.lastName || !data.email) {
        alert("Por favor, completa todos los campos requeridos.")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = "Enviando..."
      submitButton.disabled = true

      setTimeout(() => {
        alert("¡Mensaje enviado exitosamente! Te contactaremos pronto.")
        this.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Newsletter form handling
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = this.querySelector('input[type="email"]').value
      if (!email) {
        alert("Por favor, ingresa tu correo electrónico.")
        return
      }

      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Suscribiendo..."
      submitButton.disabled = true

      setTimeout(() => {
        alert("¡Te has suscrito exitosamente a nuestro boletín!")
        this.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 1500)
    })
  }

  // Header scroll effect
  let lastScrollTop = 0
  const header = document.querySelector(".site-header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })
})
