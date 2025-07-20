<!--
  Enhanced Header Component with Interactive Navigation and Animations
  Features: Smooth scroll effects, animated menu, responsive design, logo animations
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <header :class="['header', { 'scrolled': isScrolled, 'menu-open': isMobileMenuOpen }]">
    <!-- Background Blur Effect -->
    <div class="header-backdrop"></div>
    
    <div class="container">
      <!-- Logo Section -->
      <div class="logo" @click="scrollToTop">
        <div class="logo-container">
          <img 
            src="/images/logo.png" 
            alt="Ishwara Enterprise Logo" 
            :class="{ 'blend-logo': !isScrolled }"
            class="logo-img"
          />
          <div class="logo-text" v-if="isScrolled">
            <span class="company-name">Ishwara</span>
            <span class="company-tagline">Enterprise</span>
          </div>
        </div>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <ul class="nav-list">
          <li 
            v-for="(item, index) in navigationItems" 
            :key="item.id"
            class="nav-item"
            :style="{ '--nav-delay': `${index * 100}ms` }"
          >
            <a 
              :href="item.href" 
              class="nav-link"
              :class="{ 'active': activeSection === item.id }"
              @click="smoothScrollTo(item.id, $event)"
            >
              <span class="nav-text">{{ item.text }}</span>
              <div class="nav-indicator"></div>
            </a>
          </li>
        </ul>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn"
        @click.prevent="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle mobile menu"
        type="button"
      >
        <div class="hamburger">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </div>
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <nav class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <div class="mobile-nav-content">
        <ul class="mobile-nav-list">
          <li 
            v-for="(item, index) in navigationItems" 
            :key="item.id"
            class="mobile-nav-item"
            :style="{ '--mobile-nav-delay': `${index * 100}ms` }"
          >
            <a 
              :href="item.href" 
              class="mobile-nav-link"
              :class="{ 'active': activeSection === item.id }"
              @click="handleMobileNavClick(item.id, $event)"
            >
              <div class="mobile-nav-icon">
                <component :is="item.icon" />
              </div>
              <span class="mobile-nav-text">{{ item.text }}</span>
              <div class="mobile-nav-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18L15 12L9 6"/>
                </svg>
              </div>
            </a>
          </li>
        </ul>
        
        <!-- Mobile CTA -->
        <div class="mobile-cta">
          <button 
            class="mobile-cta-btn btn-animated"
            @click="scrollToContact"
          >
            <span>Get Started</span>
            <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Mobile Menu Overlay -->
    <div 
      class="mobile-overlay" 
      :class="{ 'active': isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineComponent } from 'vue';

/**
 * Icon Components
 */
const AboutIcon = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  `
});

const ServicesIcon = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  `
});

const ProjectsIcon = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="M9 9h6v6H9z"/>
      <path d="M21 15v4a2 2 0 01-2 2h-4"/>
      <path d="M3 9V5a2 2 0 012-2h4"/>
    </svg>
  `
});

const TeamIcon = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  `
});

const ContactIcon = defineComponent({
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  `
});

/**
 * Reactive References
 */
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('hero');
const isMobile = ref(false);

/**
 * Check if device is mobile
 */
const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 768;
  }
};

/**
 * Navigation Items Configuration
 */
const navigationItems = ref([
  { 
    id: 'about', 
    text: 'About', 
    href: '#about',
    icon: AboutIcon
  },
  { 
    id: 'services', 
    text: 'Services', 
    href: '#services',
    icon: ServicesIcon
  },
  { 
    id: 'projects', 
    text: 'Projects', 
    href: '#projects',
    icon: ProjectsIcon
  },
  { 
    id: 'team', 
    text: 'Team', 
    href: '#team',
    icon: TeamIcon
  },
  { 
    id: 'contact', 
    text: 'Contact', 
    href: '#contact',
    icon: ContactIcon
  }
]);

/**
 * Scroll Handler for Header Effects
 */
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isScrolled.value = scrollPosition > 50;
  
  // Update active section based on scroll position
  updateActiveSection();
};

/**
 * Update Active Section Based on Scroll Position
 */
const updateActiveSection = () => {
  const sections = ['hero', 'about', 'services', 'projects', 'team', 'contact'];
  const scrollPosition = window.scrollY + 100; // Offset for better UX
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId;
        break;
      }
    }
  }
};

/**
 * Smooth Scroll to Section
 */
const smoothScrollTo = (sectionId, event) => {
  event.preventDefault();
  
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const headerHeight = 80;
    const targetPosition = targetElement.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update active section immediately for better UX
    activeSection.value = sectionId;
  }
};

/**
 * Scroll to Top (Logo Click)
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  activeSection.value = 'hero';
};

/**
 * Scroll to Contact Section
 */
const scrollToContact = () => {
  smoothScrollTo('contact', { preventDefault: () => {} });
  closeMobileMenu();
};

/**
 * Mobile Menu Handlers
 */
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleMobileNavClick = (sectionId, event) => {
  smoothScrollTo(sectionId, event);
  closeMobileMenu();
};

/**
 * Initialize GSAP Animations
 */
const initGSAPAnimations = () => {
  if (!process.client || !window.gsap) return;
  
  // Logo entrance animation
  window.gsap.fromTo('.logo-img', 
    { scale: 0, rotation: -180 },
    { 
      scale: 1, 
      rotation: 0, 
      duration: 1, 
      ease: "back.out(1.7)",
      delay: 0.2
    }
  );
  
  // Navigation items stagger animation
  window.gsap.fromTo('.nav-item', 
    { y: -50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.5
    }
  );
};

/**
 * Performance Optimized RAF for Scroll
 */
let rafId = null;
const optimizedScrollHandler = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    handleScroll();
    rafId = null;
  });
};

/**
 * Lifecycle Hooks
 */
onMounted(() => {
  // Check mobile on mount
  checkMobile();
  
  // Add scroll listener
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  
  // Add resize listener for mobile detection
  window.addEventListener('resize', checkMobile);
  
  // Initialize animations
  setTimeout(initGSAPAnimations, 100);
  
  // Set initial active section
  updateActiveSection();
});

onUnmounted(() => {
  // Cleanup
  window.removeEventListener('scroll', optimizedScrollHandler);
  window.removeEventListener('resize', checkMobile);
  document.body.style.overflow = '';
  
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});
</script>

<style scoped>
/* Header Styles */
.header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all var(--transition-medium);
  padding: 1.5rem 0;
}

.header.scrolled {
  padding: 1rem 0;
  box-shadow: var(--shadow-medium);
}

/* Header Backdrop */
.header-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  backdrop-filter: blur(0px);
  transition: all var(--transition-medium);
  z-index: -1;
}

.header.scrolled .header-backdrop {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}

/* Container */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

/* Logo Section */
.logo {
  cursor: pointer;
  transition: all var(--transition-medium);
}

.logo:hover {
  transform: scale(1.05);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-img {
  height: 50px;
  transition: all var(--transition-medium);
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-img.blend-logo {
  mix-blend-mode: screen;
}

.header.scrolled .logo-img {
  height: 40px;
  mix-blend-mode: normal;
}

.logo-text {
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: fadeInSlide 0.5s ease-out forwards;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.company-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.company-tagline {
  font-size: 0.8rem;
  color: var(--accent-color);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
  opacity: 0;
  animation: navItemFadeIn 0.6s ease-out forwards;
  animation-delay: var(--nav-delay);
}

@keyframes navItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link {
  display: block;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
}

.header.scrolled .nav-link {
  color: var(--primary-color);
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent-color);
  transform: translateY(-2px);
}

.nav-text {
  position: relative;
  z-index: 1;
}

/* Navigation Indicator */
.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, var(--accent-color), #ffc15c);
  transform: translateX(-50%);
  transition: width var(--transition-medium);
}

.nav-link:hover .nav-indicator,
.nav-link.active .nav-indicator {
  width: 100%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all var(--transition-medium);
  position: relative;
  z-index: 1001; /* Ensure it's above other elements */
  min-width: 44px; /* Minimum touch target size */
  min-height: 44px; /* Minimum touch target size */
  justify-content: center;
  align-items: center;
}

.mobile-menu-btn:hover {
  background: rgba(251, 176, 59, 0.1);
  transform: scale(1.05);
}

.mobile-menu-btn:active {
  transform: scale(0.95);
}

.mobile-menu-btn:focus {
  outline: none;
  background: rgba(251, 176, 59, 0.2);
  box-shadow: 0 0 0 3px rgba(251, 176, 59, 0.3);
}

.hamburger {
  width: 26px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all var(--transition-medium);
  transform-origin: center;
}

.header.scrolled .hamburger-line {
  background: var(--primary-color);
}

.mobile-menu-btn:hover .hamburger-line {
  background: var(--accent-color);
}

.header.scrolled .mobile-menu-btn:hover .hamburger-line {
  background: var(--accent-color);
}

/* Hamburger Animation */
.header.menu-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
  background: var(--accent-color) !important;
}

.header.menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.header.menu-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
  background: var(--accent-color) !important;
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 80px; /* Height of the header */
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transform: translateY(-100%);
  transition: all var(--transition-medium);
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  z-index: 999;
  border-top: 3px solid var(--accent-color);
}

.mobile-nav.open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-content {
  padding: 1.5rem;
  background: transparent;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-item {
  margin-bottom: 0;
  opacity: 0;
  transform: translateX(-20px);
  transition: all var(--transition-medium);
}

.mobile-nav.open .mobile-nav-item {
  opacity: 1;
  transform: translateX(0);
  transition-delay: var(--mobile-nav-delay);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  padding: 1.25rem 1rem;
  border-radius: 12px;
  transition: all var(--transition-medium);
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid transparent;
  margin-bottom: 0.5rem;
  min-height: 60px; /* Ensure good touch target */
  position: relative;
  overflow: hidden;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(251, 176, 59, 0.2), transparent);
  transition: left var(--transition-medium);
}

.mobile-nav-link:hover::before,
.mobile-nav-link:active::before {
  left: 100%;
}

.mobile-nav-link:hover,
.mobile-nav-link.active,
.mobile-nav-link:focus {
  background: linear-gradient(135deg, var(--primary-color) 0%, #1a4b7a 100%);
  color: white;
  transform: translateX(8px);
  border-color: var(--accent-color);
  box-shadow: 0 4px 20px rgba(13, 44, 84, 0.3);
}

.mobile-nav-link:active {
  transform: translateX(8px) scale(0.98);
}

.mobile-nav-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(251, 176, 59, 0.1);
  border-radius: 8px;
  transition: all var(--transition-medium);
}

.mobile-nav-link:hover .mobile-nav-icon,
.mobile-nav-link.active .mobile-nav-icon,
.mobile-nav-link:focus .mobile-nav-icon {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.mobile-nav-icon svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

.mobile-nav-text {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.mobile-nav-arrow {
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav-link:hover .mobile-nav-arrow,
.mobile-nav-link.active .mobile-nav-arrow,
.mobile-nav-link:focus .mobile-nav-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.mobile-nav-arrow svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.5;
}

/* Mobile CTA */
.mobile-cta {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(251, 176, 59, 0.2);
}

.mobile-cta-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, var(--accent-color) 0%, #ffc15c 100%);
  color: var(--primary-color);
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-medium);
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(251, 176, 59, 0.3);
  min-height: 60px;
}

.mobile-cta-btn:hover {
  background: linear-gradient(135deg, #ffc15c 0%, var(--accent-color) 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(251, 176, 59, 0.4);
}

.mobile-cta-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(251, 176, 59, 0.3);
}

.cta-icon {
  width: 22px;
  height: 22px;
  transition: transform var(--transition-medium);
}

.mobile-cta-btn:hover .cta-icon {
  transform: translateX(2px);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 44, 84, 0.75);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-medium);
  z-index: 998;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Responsive Design */
@media (max-width: 768px) {
  .desktop-nav {
    display: none !important;
  }
  
  .mobile-menu-btn {
    display: flex !important;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .header {
    padding: 1rem 0;
  }
  
  .header.scrolled {
    padding: 0.75rem 0;
  }
}

/* Tablet specific adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .nav-list {
    gap: 1.5rem;
  }
  
  .container {
    padding: 0 1.5rem;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .mobile-nav-link {
    min-height: 64px; /* Larger touch target for touch devices */
    padding: 1.5rem 1rem;
  }
  
  .mobile-menu-btn {
    min-width: 48px;
    min-height: 48px;
    padding: 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .mobile-nav-link,
  .logo {
    transition: none;
  }
  
  .nav-item {
    animation: none;
    opacity: 1;
  }
  
  .mobile-nav-item {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .header.scrolled .header-backdrop {
    background: white;
    backdrop-filter: none;
  }
  
  .nav-link,
  .mobile-nav-link {
    border: 1px solid transparent;
  }
  
  .nav-link:hover,
  .nav-link.active,
  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    border-color: var(--primary-color);
  }
}

/* Print Styles */
@media print {
  .header {
    position: relative;
    box-shadow: none;
    background: white;
  }
  
  .mobile-nav,
  .mobile-overlay {
    display: none;
  }
}
</style>
