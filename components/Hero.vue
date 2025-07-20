<!--
  Enhanced Hero Component with Parallax Effects and Floating Elements
  Features: Video background, parallax scrolling, animated content, floating decorations
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <section id="hero" class="hero parallax-container">
    <!-- Background Video with Parallax Effect -->
    <div class="video-container" ref="videoContainer">
      <video 
        ref="videoPlayer" 
        autoplay 
        muted 
        playsinline 
        class="hero-video parallax-element" 
        @ended="playNextVideo"
      >
        <source :src="currentVideo" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    
    <!-- Animated Overlay -->
    <div class="hero-overlay"></div>
    
    <!-- Floating Background Elements -->
    <div class="floating-decorations">
      <div class="bg-decoration circle floating-element" 
           style="top: 10%; left: 5%; width: 60px; height: 60px; animation-delay: 0s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="top: 20%; right: 10%; animation-delay: 1s;"></div>
      <div class="bg-decoration square drifting-element" 
           style="bottom: 30%; left: 15%; width: 40px; height: 40px; animation-delay: 2s;"></div>
      <div class="bg-decoration circle floating-element" 
           style="top: 60%; right: 20%; width: 80px; height: 80px; animation-delay: 3s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="bottom: 20%; right: 5%; animation-delay: 4s;"></div>
    </div>
    
    <!-- Hero Content with Advanced Animations -->
    <div class="hero-content" ref="heroContent">
      <div class="content-wrapper">
        <h1 
          class="tagline"
          ref="tagline"
          v-motion
          :initial="{ opacity: 0, y: 100, scale: 0.8 }"
          :enter="{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: 500
            }
          }"
        >
          <span class="word" data-aos="fade-up" data-aos-delay="100">Build</span>
          <span class="word" data-aos="fade-up" data-aos-delay="300">Connect</span>
          <span class="word" data-aos="fade-up" data-aos-delay="500">Protect</span>
        </h1>
        
        <p 
          class="subtitle"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 1000,
              duration: 800
            }
          }"
        >
          Solutions That Build Futures.
        </p>
        
        <!-- Animated CTA Button -->
        <button 
          class="cta-button btn-animated hover-lift"
          @click="scrollToSection"
          v-motion
          :initial="{ opacity: 0, scale: 0 }"
          :enter="{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 1500
            }
          }"
        >
          <span>Discover Our Services</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div 
      class="scroll-indicator"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: 2000,
          duration: 600
        }
      }"
    >
      <div class="scroll-arrow"></div>
      <span>Scroll to explore</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Reactive References
 */
const videoPlayer = ref(null);
const videoContainer = ref(null);
const heroContent = ref(null);
const tagline = ref(null);

/**
 * Video Management
 */
const videos = ['/videos/hero.mp4', '/videos/hero2.mp4'];
const currentVideoIndex = ref(0);
const currentVideo = ref(videos[currentVideoIndex.value]);

/**
 * Animation State
 */
const scrollY = ref(0);

/**
 * Play Next Video in Sequence
 * Provides seamless video transitions
 */
const playNextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.length;
  currentVideo.value = videos[currentVideoIndex.value];
  
  // Smooth video transition
  if (videoPlayer.value) {
    videoPlayer.value.style.opacity = '0';
    setTimeout(() => {
      videoPlayer.value.load();
      videoPlayer.value.play();
      videoPlayer.value.style.opacity = '1';
    }, 300);
  }
};

/**
 * Smooth Scroll to Services Section
 */
const scrollToSection = () => {
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    servicesSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Handle Scroll for Parallax Effects
 */
const handleScroll = () => {
  scrollY.value = window.scrollY;
  
  // Parallax effect for video
  if (videoContainer.value) {
    const parallaxSpeed = 0.5;
    videoContainer.value.style.transform = `translateY(${scrollY.value * parallaxSpeed}px)`;
  }
  
  // Parallax effect for content
  if (heroContent.value) {
    const contentParallaxSpeed = 0.3;
    heroContent.value.style.transform = `translateY(${scrollY.value * contentParallaxSpeed}px)`;
  }
};

/**
 * Initialize GSAP Animations
 */
const initGSAPAnimations = () => {
  if (process.client && window.gsap) {
    // Create a timeline for complex animations
    const tl = window.gsap.timeline({ delay: 0.5 });
    
    // Animate floating decorations with random delays
    window.gsap.utils.toArray('.floating-decorations .bg-decoration').forEach((element, index) => {
      window.gsap.set(element, {
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5
      });
      
      window.gsap.to(element, {
        rotation: `+=${360 + Math.random() * 180}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        ease: "none"
      });
    });
    
    // Text reveal animation for tagline words
    if (tagline.value) {
      const words = tagline.value.querySelectorAll('.word');
      window.gsap.fromTo(words, 
        {
          opacity: 0,
          y: 100,
          rotationX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out(1.7)",
          delay: 1
        }
      );
    }
  }
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
  // Initialize video event listeners
  if (videoPlayer.value) {
    videoPlayer.value.addEventListener('ended', playNextVideo);
    videoPlayer.value.play().catch(console.warn); // Handle autoplay restrictions
  }
  
  // Add scroll listener for parallax
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  
  // Initialize GSAP animations after a short delay
  setTimeout(initGSAPAnimations, 100);
});

onUnmounted(() => {
  // Cleanup event listeners
  if (videoPlayer.value) {
    videoPlayer.value.removeEventListener('ended', playNextVideo);
  }
  window.removeEventListener('scroll', optimizedScrollHandler);
  
  // Cancel any pending RAF
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});
</script>

<style scoped>
/* Hero Section Styles */
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: white;
}

/* Video Container with Parallax */
.video-container {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: -2;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

/* Enhanced Overlay with Gradient Animation */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(13, 44, 84, 0.7) 0%,
    rgba(13, 44, 84, 0.5) 25%,
    rgba(251, 176, 59, 0.3) 50%,
    rgba(13, 44, 84, 0.5) 75%,
    rgba(13, 44, 84, 0.7) 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  z-index: -1;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Floating Decorations */
.floating-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* Hero Content Styling */
.hero-content {
  z-index: 1;
  max-width: 1000px;
  padding: 2rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Enhanced Tagline */
.tagline {
  font-family: var(--heading-font);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin: 0;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.tagline .word {
  display: inline-block;
  position: relative;
}

.tagline .word::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--accent-color);
  transition: width 0.6s ease;
}

.tagline .word:hover::after {
  width: 100%;
}

/* Enhanced Subtitle */
.subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin: 0;
  font-weight: 400;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  letter-spacing: 1px;
}

/* Animated CTA Button */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(45deg, var(--accent-color), #ffc15c);
  color: var(--primary-color);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(251, 176, 59, 0.3);
  transition: all var(--transition-medium);
  overflow: hidden;
  position: relative;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(251, 176, 59, 0.4);
}

.cta-button:active {
  transform: translateY(-1px);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform var(--transition-fast);
}

.cta-button:hover .arrow-icon {
  transform: translateX(5px);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 2px;
  height: 30px;
  background: white;
  position: relative;
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -5px;
  width: 12px;
  height: 12px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
}

.scroll-indicator span {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    padding: 1rem;
  }
  
  .tagline {
    font-size: clamp(2rem, 10vw, 4rem);
    gap: 0.5rem;
  }
  
  .subtitle {
    font-size: clamp(1rem, 4vw, 1.5rem);
  }
  
  .cta-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  .floating-decorations .bg-decoration {
    opacity: 0.05; /* Reduce visual clutter on mobile */
  }
  
  /* Disable parallax on mobile for better performance */
  .video-container,
  .hero-content {
    transform: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .hero-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
  
  .tagline,
  .subtitle {
    text-shadow: 2px 2px 4px black;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .floating-decorations * {
    animation: none !important;
  }
  
  .hero-overlay {
    animation: none;
    background: linear-gradient(to bottom, rgba(13, 44, 84, 0.7), rgba(13, 44, 84, 0.5));
  }
  
  .scroll-indicator {
    animation: none;
  }
}
</style>
