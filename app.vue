<!--
  Enhanced Main App Component with Advanced Animation Orchestration
  Features: Smooth page transitions, optimized scroll handling, performance monitoring
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <div id="app" class="app-container">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <div class="loading-logo">
          <img src="/images/logo.png" alt="Ishwara Enterprise" class="logo-spinner">
        </div>
        <div class="loading-progress">
          <div class="progress-bar" :style="{ width: `${loadingProgress}%` }"></div>
        </div>
        <p class="loading-text">{{ loadingMessage }}</p>
      </div>
    </div>
    
    <!-- Main Application -->
    <div v-else class="app-content">
      <!-- Header Navigation -->
      <Header />
      
      <!-- Main Content Areas -->
      <main class="main-content">
        <!-- Hero Section -->
        <Hero 
          ref="heroSection" 
          class="section-container"
        />
        
        <!-- About Section -->
        <About 
          ref="aboutSection" 
          class="section-container animated-section"
        />
        
        <!-- Services Section -->
        <Services 
          ref="servicesSection" 
          class="section-container animated-section"
        />
        
        <!-- Team Section -->
        <Team 
          ref="teamSection" 
          class="section-container animated-section"
        />
        
        <!-- Contact Section -->
        <Contact 
          ref="contactSection" 
          class="section-container animated-section"
        />
      </main>
      
      <!-- Footer -->
      <Footer />
      
      <!-- Scroll to Top Button -->
      <button 
        v-show="showScrollTop"
        @click="scrollToTop"
        class="scroll-top-btn hover-lift"
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 15L12 9L6 15"/>
        </svg>
      </button>
      
      <!-- Cursor Follower (Desktop) -->
      <div 
        v-if="showCursorFollower"
        ref="cursorFollower"
        class="cursor-follower"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

// Import all components
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Services from './components/Services.vue';
import Team from './components/Team.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

/**
 * Reactive References
 */
const isLoading = ref(true);
const loadingProgress = ref(0);
const loadingMessage = ref('Loading...');
const showScrollTop = ref(false);
const showCursorFollower = ref(false);

// Section references
const heroSection = ref(null);
const aboutSection = ref(null);
const servicesSection = ref(null);
const teamSection = ref(null);
const contactSection = ref(null);
const cursorFollower = ref(null);

/**
 * Loading Messages
 */
const loadingMessages = [
  'Initializing...',
  'Loading assets...',
  'Preparing animations...',
  'Almost ready...',
  'Welcome!'
];

/**
 * Loading Simulation with Progress
 */
const simulateLoading = async () => {
  try {
    for (let i = 0; i <= 100; i += 20) {
      loadingProgress.value = i;
      
      if (i < loadingMessages.length * 20) {
        loadingMessage.value = loadingMessages[Math.floor(i / 20)];
      }
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    }
    
    // Wait a bit more for smooth transition
    await new Promise(resolve => setTimeout(resolve, 500));
    
    isLoading.value = false;
    
    // Initialize animations after loading
    await nextTick();
    initializeAnimations();
  } catch (error) {
    console.error('Loading error:', error);
    // Ensure content shows even if there's an error
    isLoading.value = false;
  }
};

/**
 * Initialize Advanced Animations
 */
const initializeAnimations = () => {
  if (!process.client) return;
  
  // Initialize section observers for performance
  initializeSectionObservers();
  
  // Initialize cursor follower
  if (window.innerWidth > 768) {
    initializeCursorFollower();
  }
  
  // Initialize GSAP animations if available
  if (window.gsap) {
    // Create master timeline
    const masterTimeline = window.gsap.timeline({ delay: 0.2 });
    
    // Animate sections in sequence
    masterTimeline.fromTo('.section-container', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power2.out" 
      }
    );
  }
};

/**
 * Initialize Intersection Observers for Sections
 */
const initializeSectionObservers = () => {
  const sections = [
    aboutSection.value?.$el,
    servicesSection.value?.$el,
    teamSection.value?.$el,
    contactSection.value?.$el
  ].filter(Boolean);
  
  // Enhanced intersection observer with better performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger section-specific animations
          if (window.gsap) {
            triggerSectionAnimations(entry.target);
          }
          
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, 
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  sections.forEach(section => {
    if (section) {
      observer.observe(section);
    }
  });
};

/**
 * Trigger Section-Specific Animations
 */
const triggerSectionAnimations = (sectionElement) => {
  if (!process.client || !window.gsap || !sectionElement) return;
  
  const sectionId = sectionElement.id;
  
  switch (sectionId) {
    case 'about':
      animateAboutSection(sectionElement);
      break;
    case 'services':
      animateServicesSection(sectionElement);
      break;
    case 'team':
      animateTeamSection(sectionElement);
      break;
    case 'contact':
      animateContactSection(sectionElement);
      break;
    default:
      // Generic section animation
      const elements = sectionElement.querySelectorAll('*');
      if (elements.length > 0) {
        window.gsap.fromTo(elements, 
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }
      break;
  }
};

/**
 * Section-Specific Animation Functions
 */
const animateAboutSection = (section) => {
  const elements = section.querySelectorAll('.feature-block, .stat-item');
  window.gsap.fromTo(elements, 
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.2,
      ease: "power2.out"
    }
  );
};

const animateServicesSection = (section) => {
  const cards = section.querySelectorAll('.card');
  window.gsap.fromTo(cards, 
    { scale: 0.8, opacity: 0, rotation: -5 },
    { 
      scale: 1, 
      opacity: 1, 
      rotation: 0,
      duration: 1, 
      stagger: 0.15,
      ease: "back.out(1.7)"
    }
  );
};

const animateTeamSection = (section) => {
  const members = section.querySelectorAll('.team-member');
  window.gsap.fromTo(members, 
    { y: 100, opacity: 0, rotationY: -15 },
    { 
      y: 0, 
      opacity: 1, 
      rotationY: 0,
      duration: 0.8, 
      stagger: 0.2,
      ease: "power2.out"
    }
  );
};

const animateContactSection = (section) => {
  const formElements = section.querySelectorAll('.form-group, .contact-method');
  window.gsap.fromTo(formElements, 
    { x: -30, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1,
      ease: "power2.out"
    }
  );
};

/**
 * Scroll Handling with Throttling
 */
const handleScroll = () => {
  const scrollY = window.scrollY;
  
  // Show/hide scroll to top button
  showScrollTop.value = scrollY > 500;
  
  // Update cursor follower if active
  if (showCursorFollower.value && cursorFollower.value) {
    updateCursorFollower();
  }
};

/**
 * Scroll to Top Function
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Initialize Cursor Follower (Desktop Only)
 */
const initializeCursorFollower = () => {
  if (window.innerWidth <= 768) return;
  
  showCursorFollower.value = true;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  const animateCursor = () => {
    if (!cursorFollower.value) return;
    
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursorFollower.value.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(animateCursor);
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  animateCursor();
  
  // Cleanup function will be handled in onUnmounted
};

/**
 * Update Cursor Follower
 */
const updateCursorFollower = () => {
  // Additional cursor follower logic if needed
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
onMounted(async () => {
  // Fallback: ensure content shows after 5 seconds regardless
  setTimeout(() => {
    if (isLoading.value) {
      console.warn('Loading took too long, showing content anyway');
      isLoading.value = false;
    }
  }, 5000);
  
  // Start loading simulation
  console.log('Starting loading simulation...');
  await simulateLoading();
  console.log('Loading simulation complete, content should be visible now');
  
  // Add scroll listener
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  
  // Initialize AOS if available
  if (window.AOS) {
    window.AOS.refresh();
  }
});

onUnmounted(() => {
  // Cleanup event listeners
  window.removeEventListener('scroll', optimizedScrollHandler);
  
  // Cancel any pending RAF
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  
  // Cleanup cursor follower
  document.removeEventListener('mousemove', () => {});
});
</script>

<style>
/* Global App Styles */
.app-container {
  position: relative;
  min-height: 100vh;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, #1a4a84 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: white;
}

.loading-content {
  text-align: center;
  max-width: 300px;
  width: 100%;
}

.loading-logo {
  margin-bottom: 2rem;
}

.logo-spinner {
  width: 80px;
  height: 80px;
  animation: logoSpin 2s linear infinite;
  filter: brightness(0) invert(1);
}

@keyframes logoSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

.loading-progress {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(45deg, var(--accent-color), #ffc15c);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.loading-text {
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.9;
  margin: 0;
  animation: loadingTextPulse 1.5s ease-in-out infinite;
}

@keyframes loadingTextPulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.6; }
}

/* App Content */
.app-content {
  opacity: 1;
  transition: opacity 1s ease-out;
}

.app-content.loading {
  opacity: 0;
}

.main-content {
  position: relative;
}

/* Section Containers */
.section-container {
  position: relative;
  overflow: hidden;
}

/* Scroll to Top Button */
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-medium);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100px);
  opacity: 0;
}

.scroll-top-btn:hover {
  background: linear-gradient(45deg, var(--accent-color), var(--primary-color));
  transform: translateY(0) scale(1.1);
  box-shadow: var(--shadow-heavy);
}

.scroll-top-btn svg {
  width: 24px;
  height: 24px;
  stroke-width: 2.5;
}

/* Show scroll button animation */
.scroll-top-btn {
  animation: slideInUp 0.5s ease-out forwards;
}

@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Cursor Follower */
.cursor-follower {
  position: fixed;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, var(--accent-color), #ffc15c);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
  opacity: 0.8;
  transition: all 0.1s ease;
}

/* Enhanced Animations */
.animated-section {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease-out;
}

.animated-section:not(.visible) {
  opacity: 0;
  transform: translateY(50px);
}

.animated-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Performance Optimizations */
.section-container {
  will-change: transform, opacity;
}

/* Responsive Design */
@media (max-width: 768px) {
  .scroll-top-btn {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
  
  .cursor-follower {
    display: none;
  }
  
  .loading-logo {
    margin-bottom: 1.5rem;
  }
  
  .logo-spinner {
    width: 60px;
    height: 60px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .logo-spinner,
  .loading-text {
    animation: none;
  }
  
  .scroll-top-btn {
    transition: none;
    animation: none;
  }
  
  .animated-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .cursor-follower {
    display: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .loading-screen {
    background: black;
  }
  
  .scroll-top-btn {
    border: 2px solid white;
  }
}

/* Print styles */
@media print {
  .loading-screen,
  .scroll-top-btn,
  .cursor-follower {
    display: none;
  }
  
  .app-content {
    opacity: 1;
  }
}
</style>
