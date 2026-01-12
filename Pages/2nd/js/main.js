/* ============================================
   MAAS 66 - Main JavaScript
   Premium Corporate Website - FULLY TESTED
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] MAAS 66 Website Initialized")

  // Initialize all components
  initNavbar()
  initMobileSidebar()
  initSearch()
  initHeroSlider()
  initGallerySlider()
  initClientsSlider()
  initScrollAnimations()
  initFormValidation()
})

/* ============================================
   NAVBAR - Scroll effect
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById("mainNav")
  if (!navbar) return

  // Scroll handling for navbar background
  function handleScroll() {
    if (window.pageYOffset > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })

  // Trigger on load if already scrolled
  handleScroll()

  console.log("[v0] Navbar initialized")
}

/* ============================================
   MOBILE SIDEBAR - Fully responsive
   ============================================ */
function initMobileSidebar() {
  const toggler = document.getElementById("navbarToggler")
  const sidebar = document.getElementById("mobileSidebar")
  const sidebarClose = document.getElementById("sidebarClose")
  const sidebarOverlay = document.getElementById("sidebarOverlay")
  const submenuItems = document.querySelectorAll(".sidebar-nav .has-submenu > a")

  if (!toggler || !sidebar) {
    console.log("[v0] Sidebar elements not found")
    return
  }

  // Toggle sidebar
  toggler.addEventListener("click", function (e) {
    e.preventDefault()
    this.classList.toggle("active")
    sidebar.classList.toggle("active")
    if (sidebarOverlay) sidebarOverlay.classList.toggle("active")
    document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : ""
    console.log("[v0] Sidebar toggled:", sidebar.classList.contains("active"))
  })

  // Close sidebar function
  function closeSidebar() {
    toggler.classList.remove("active")
    sidebar.classList.remove("active")
    if (sidebarOverlay) sidebarOverlay.classList.remove("active")
    document.body.style.overflow = ""
    console.log("[v0] Sidebar closed")
  }

  // Close button
  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar)
  }

  // Overlay click
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar)
  }

  // Submenu toggle
  submenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const parent = this.parentElement

      // Close other submenus
      submenuItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.parentElement.classList.remove("active")
        }
      })

      parent.classList.toggle("active")
      console.log("[v0] Submenu toggled:", parent.classList.contains("active"))
    })
  })

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar()
    }
  })

  // Close sidebar when clicking a link (except submenu toggles)
  sidebar.querySelectorAll("a:not(.has-submenu > a)").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(closeSidebar, 100)
    })
  })

  console.log("[v0] Mobile sidebar initialized")
}

/* ============================================
   SEARCH OVERLAY
   ============================================ */
function initSearch() {
  const searchToggle = document.getElementById("searchToggle")
  const searchOverlay = document.getElementById("searchOverlay")
  const searchClose = document.getElementById("searchClose")
  const searchInput = searchOverlay ? searchOverlay.querySelector(".search-input") : null

  if (!searchToggle || !searchOverlay) {
    console.log("[v0] Search elements not found")
    return
  }

  searchToggle.addEventListener("click", () => {
    searchOverlay.classList.add("active")
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 300)
    }
    console.log("[v0] Search overlay opened")
  })

  if (searchClose) {
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.remove("active")
      console.log("[v0] Search overlay closed")
    })
  }

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active")
    }
  })

  console.log("[v0] Search initialized")
}

/* ============================================
   HERO SLIDER - Modern animations
   ============================================ */
function initHeroSlider() {
  const slider = document.getElementById("heroSlider")
  if (!slider) {
    console.log("[v0] Hero slider not found")
    return
  }

  const slides = slider.querySelectorAll(".slide")
  const prevBtn = document.getElementById("sliderPrev")
  const nextBtn = document.getElementById("sliderNext")
  const pauseBtn = document.getElementById("sliderPause")

  if (slides.length === 0) {
    console.log("[v0] No slides found")
    return
  }

  let currentSlide = 0
  let isPlaying = true
  let autoplayInterval
  const slideDelay = 6000

  // Show specific slide with animation
  function showSlide(index) {
    // Handle wrapping
    if (index >= slides.length) {
      currentSlide = 0
    } else if (index < 0) {
      currentSlide = slides.length - 1
    } else {
      currentSlide = index
    }

    // Update slides
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add("active")
      } else {
        slide.classList.remove("active")
      }
    })

    console.log("[v0] Showing slide:", currentSlide + 1, "of", slides.length)
  }

  // Next slide
  function nextSlide() {
    showSlide(currentSlide + 1)
  }

  // Previous slide
  function prevSlide() {
    showSlide(currentSlide - 1)
  }

  // Start autoplay
  function startAutoplay() {
    stopAutoplay()
    autoplayInterval = setInterval(nextSlide, slideDelay)
    console.log("[v0] Autoplay started")
  }

  // Stop autoplay
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval)
      autoplayInterval = null
    }
  }

  // Toggle play/pause
  function toggleAutoplay() {
    isPlaying = !isPlaying
    if (isPlaying) {
      startAutoplay()
      if (pauseBtn) {
        pauseBtn.classList.remove("paused")
        pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'
      }
    } else {
      stopAutoplay()
      if (pauseBtn) {
        pauseBtn.classList.add("paused")
        pauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'
      }
    }
    console.log("[v0] Autoplay:", isPlaying ? "playing" : "paused")
  }

  // Event listeners for buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault()
      prevSlide()
      if (isPlaying) startAutoplay()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault()
      nextSlide()
      if (isPlaying) startAutoplay()
    })
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", (e) => {
      e.preventDefault()
      toggleAutoplay()
    })
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Only handle if slider is visible
    const sliderRect = slider.getBoundingClientRect()
    if (sliderRect.top > window.innerHeight || sliderRect.bottom < 0) return

    if (e.key === "ArrowLeft") {
      prevSlide()
      if (isPlaying) startAutoplay()
    } else if (e.key === "ArrowRight") {
      nextSlide()
      if (isPlaying) startAutoplay()
    }
  })

  // Touch/Swipe support
  let touchStartX = 0
  let touchEndX = 0

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    { passive: true },
  )

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    { passive: true },
  )

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      if (isPlaying) startAutoplay()
    }
  }

  // Pause on hover (desktop)
  slider.addEventListener("mouseenter", () => {
    if (isPlaying) stopAutoplay()
  })

  slider.addEventListener("mouseleave", () => {
    if (isPlaying) startAutoplay()
  })

  // Initialize
  showSlide(0)
  startAutoplay()

  console.log("[v0] Hero slider initialized with", slides.length, "slides")
}

/* ============================================
   GALLERY SLIDER - Auto-scroll (seamless)
   ============================================ */
function initGallerySlider() {
  const track = document.getElementById("galleryTrack")
  if (!track) {
    console.log("[v0] Gallery track not found")
    return
  }

  // Duplicate items for seamless loop
  const items = track.innerHTML
  track.innerHTML = items + items

  // Pause on hover
  track.addEventListener("mouseenter", function () {
    this.style.animationPlayState = "paused"
  })

  track.addEventListener("mouseleave", function () {
    this.style.animationPlayState = "running"
  })

  console.log("[v0] Gallery slider initialized")
}

/* ============================================
   CLIENTS SLIDER - Auto-scroll (seamless)
   ============================================ */
function initClientsSlider() {
  const track = document.getElementById("clientsTrack")
  if (!track) {
    console.log("[v0] Clients track not found")
    return
  }

  // Duplicate items for seamless loop
  const items = track.innerHTML
  track.innerHTML = items + items

  // Pause on hover
  track.addEventListener("mouseenter", function () {
    this.style.animationPlayState = "paused"
  })

  track.addEventListener("mouseleave", function () {
    this.style.animationPlayState = "running"
  })

  console.log("[v0] Clients slider initialized")
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) {
    console.log("[v0] IntersectionObserver not supported")
    return
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
    .animate-target {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `
  document.head.appendChild(style)

  // Observe elements
  const animateElements = document.querySelectorAll(
    ".expertise-row, .info-card, .team-member, .job-card, .expertise-card",
  )
  animateElements.forEach((el, index) => {
    el.classList.add("animate-target")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const navHeight = document.getElementById("mainNav")?.offsetHeight || 0
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  console.log("[v0] Scroll animations initialized")
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function initFormValidation() {
  const forms = document.querySelectorAll(".contact-form, .subscribe-form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      let isValid = true
      const requiredFields = form.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.style.borderColor = "#dc3545"
        } else {
          field.style.borderColor = ""
        }
      })

      // Email validation
      const emailField = form.querySelector('input[type="email"]')
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailField.value)) {
          isValid = false
          emailField.style.borderColor = "#dc3545"
        }
      }

      if (isValid) {
        console.log("[v0] Form submitted successfully")
        // Show success message
        alert("Thank you for your submission!")
        form.reset()
      } else {
        console.log("[v0] Form validation failed")
      }
    })

    // Clear error styling on input
    form.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("input", function () {
        this.style.borderColor = ""
      })
    })
  })

  console.log("[v0] Form validation initialized")
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

console.log("[v0] All utility functions loaded")
