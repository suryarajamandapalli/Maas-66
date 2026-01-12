/* ============================================
   MAAS 66 - Main JavaScript
   Premium Corporate Website - FULLY ENHANCED
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar()
  initMobileSidebar()
  initSearch()
  initHeroSlider()
  initGalleryFilter()
  initGalleryLightbox()
  initClientsSlider()
  initScrollAnimations()
  initFormValidation()
  initCounterAnimation()
})

/* ============================================
   NAVBAR - Scroll effect
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById("mainNav")
  if (!navbar) return

  function handleScroll() {
    if (window.pageYOffset > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  handleScroll()
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

  if (!toggler || !sidebar) return

  toggler.addEventListener("click", function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.classList.toggle("active")
    sidebar.classList.toggle("active")
    if (sidebarOverlay) sidebarOverlay.classList.toggle("active")
    document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : ""
  })

  function closeSidebar() {
    toggler.classList.remove("active")
    sidebar.classList.remove("active")
    if (sidebarOverlay) sidebarOverlay.classList.remove("active")
    document.body.style.overflow = ""
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", (e) => {
      e.preventDefault()
      closeSidebar()
    })
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar)
  }

  submenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const parent = this.parentElement
      submenuItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.parentElement.classList.remove("active")
        }
      })
      parent.classList.toggle("active")
    })
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar()
    }
  })

  sidebar.querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(closeSidebar, 150)
    })
  })
}

/* ============================================
   SEARCH OVERLAY
   ============================================ */
function initSearch() {
  const searchToggle = document.getElementById("searchToggle")
  const searchOverlay = document.getElementById("searchOverlay")
  const searchClose = document.getElementById("searchClose")
  const searchInput = searchOverlay ? searchOverlay.querySelector(".search-input") : null

  if (!searchToggle || !searchOverlay) return

  searchToggle.addEventListener("click", () => {
    searchOverlay.classList.add("active")
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 300)
    }
  })

  if (searchClose) {
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.remove("active")
    })
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active")
    }
  })
}

/* ============================================
   HERO SLIDER - Enhanced with progress bar
   ============================================ */
function initHeroSlider() {
  const slider = document.getElementById("heroSlider")
  if (!slider) return

  const slides = slider.querySelectorAll(".slide")
  const prevBtn = document.getElementById("sliderPrev")
  const nextBtn = document.getElementById("sliderNext")
  const pauseBtn = document.getElementById("sliderPause")
  const progressBar = document.getElementById("sliderProgressBar")

  if (slides.length === 0) return

  let currentSlide = 0
  let isPlaying = true
  const autoplayInterval = null
  let progressInterval = null
  const slideDelay = 6000
  let progress = 0

  function showSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0
    } else if (index < 0) {
      currentSlide = slides.length - 1
    } else {
      currentSlide = index
    }

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add("active")
      } else {
        slide.classList.remove("active")
      }
    })

    resetProgress()
  }

  function resetProgress() {
    progress = 0
    if (progressBar) {
      progressBar.style.width = "0%"
    }
  }

  function updateProgress() {
    if (!isPlaying) return
    progress += 100 / (slideDelay / 50)
    if (progressBar) {
      progressBar.style.width = progress + "%"
    }
    if (progress >= 100) {
      nextSlide()
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1)
  }

  function prevSlide() {
    showSlide(currentSlide - 1)
  }

  function startAutoplay() {
    stopAutoplay()
    progressInterval = setInterval(updateProgress, 50)
  }

  function stopAutoplay() {
    if (progressInterval) {
      clearInterval(progressInterval)
      progressInterval = null
    }
  }

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
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault()
      prevSlide()
      if (isPlaying) startAutoplay()
    })

    prevBtn.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault()
        prevSlide()
        if (isPlaying) startAutoplay()
      },
      { passive: false },
    )
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault()
      nextSlide()
      if (isPlaying) startAutoplay()
    })

    nextBtn.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault()
        nextSlide()
        if (isPlaying) startAutoplay()
      },
      { passive: false },
    )
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", (e) => {
      e.preventDefault()
      toggleAutoplay()
    })

    pauseBtn.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault()
        toggleAutoplay()
      },
      { passive: false },
    )
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
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
  let touchStartY = 0
  let touchEndY = 0

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    },
    { passive: true },
  )

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      touchEndY = e.changedTouches[0].screenY
      handleSwipe()
    },
    { passive: true },
  )

  function handleSwipe() {
    const swipeThreshold = 50
    const diffX = touchStartX - touchEndX
    const diffY = touchStartY - touchEndY

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      if (isPlaying) startAutoplay()
    }
  }

  // Pause on hover (desktop)
  if (window.matchMedia("(hover: hover)").matches) {
    slider.addEventListener("mouseenter", () => {
      if (isPlaying) stopAutoplay()
    })

    slider.addEventListener("mouseleave", () => {
      if (isPlaying) startAutoplay()
    })
  }

  // Initialize
  showSlide(0)
  startAutoplay()
}

/* ============================================
   GALLERY FILTER - Interactive
   ============================================ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterBtns.length === 0 || galleryItems.length === 0) return

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const filter = this.dataset.filter

      // Filter items with animation
      galleryItems.forEach((item) => {
        const category = item.dataset.category

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 50)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Add transition styles
  galleryItems.forEach((item) => {
    item.style.transition = "opacity 0.3s ease, transform 0.3s ease"
  })
}

/* ============================================
   GALLERY LIGHTBOX
   ============================================ */
function initGalleryLightbox() {
  const lightbox = document.getElementById("galleryLightbox")
  const lightboxImg = document.getElementById("lightboxImage")
  const lightboxClose = lightbox?.querySelector(".lightbox-close")
  const lightboxPrev = lightbox?.querySelector(".lightbox-prev")
  const lightboxNext = lightbox?.querySelector(".lightbox-next")
  const zoomBtns = document.querySelectorAll(".gallery-zoom-btn")

  if (!lightbox || !lightboxImg || zoomBtns.length === 0) return

  let currentImages = []
  let currentIndex = 0

  // Collect all images
  function collectImages() {
    currentImages = []
    document.querySelectorAll(".gallery-item").forEach((item) => {
      if (item.style.display !== "none") {
        const btn = item.querySelector(".gallery-zoom-btn")
        if (btn) {
          currentImages.push(btn.dataset.image)
        }
      }
    })
  }

  // Open lightbox
  zoomBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      collectImages()

      // Find current image index
      const imgSrc = btn.dataset.image
      currentIndex = currentImages.indexOf(imgSrc)
      if (currentIndex === -1) currentIndex = 0

      lightboxImg.src = imgSrc
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  })

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  lightboxClose?.addEventListener("click", closeLightbox)

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Navigation
  function showImage(index) {
    if (index >= currentImages.length) {
      currentIndex = 0
    } else if (index < 0) {
      currentIndex = currentImages.length - 1
    } else {
      currentIndex = index
    }
    lightboxImg.src = currentImages[currentIndex]
  }

  lightboxPrev?.addEventListener("click", () => showImage(currentIndex - 1))
  lightboxNext?.addEventListener("click", () => showImage(currentIndex + 1))

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return

    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") showImage(currentIndex - 1)
    if (e.key === "ArrowRight") showImage(currentIndex + 1)
  })
}

/* ============================================
   CLIENTS SLIDER - Auto-scroll
   ============================================ */
function initClientsSlider() {
  const track = document.getElementById("clientsTrack")
  if (!track) return

  // Duplicate items for seamless loop
  const items = track.innerHTML
  track.innerHTML = items + items

  if (window.matchMedia("(hover: hover)").matches) {
    track.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused"
    })

    track.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running"
    })
  }
}

/* ============================================
   COUNTER ANIMATION - For stats
   ============================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number")
  if (counters.length === 0) return

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const text = counter.textContent
        const match = text.match(/[\d,]+/)
        if (!match) return

        const target = Number.parseInt(match[0].replace(/,/g, ""))
        const suffix = text.replace(match[0], "")
        const duration = 2000
        const start = 0
        const startTime = performance.now()

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          const current = Math.floor(start + (target - start) * easeOut)

          counter.textContent = current.toLocaleString() + suffix

          if (progress < 1) {
            requestAnimationFrame(updateCounter)
          }
        }

        requestAnimationFrame(updateCounter)
        observer.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => observer.observe(counter))
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return

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

  const animateElements = document.querySelectorAll(".expertise-card, .news-card, .stat-card, .gallery-item")
  animateElements.forEach((el, index) => {
    el.classList.add("animate-target")
    el.style.transitionDelay = `${Math.min(index * 0.1, 0.5)}s`
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
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function initFormValidation() {
  const forms = document.querySelectorAll(".contact-form, .subscribe-form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

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

      const emailField = form.querySelector('input[type="email"]')
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailField.value)) {
          isValid = false
          emailField.style.borderColor = "#dc3545"
        }
      }

      if (isValid) {
        alert("Thank you for your subscription!")
        form.reset()
      }
    })

    form.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("input", function () {
        this.style.borderColor = ""
      })
    })
  })
}
