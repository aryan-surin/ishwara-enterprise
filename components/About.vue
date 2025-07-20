<!--
  Enhanced About Component with Staggered Animations and Interactive Elements
  Features: Image parallax, content reveals, floating elements, hover effects
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <section id="about" class="about parallax-container">
    <!-- Background Decorative Elements -->
    <div class="floating-decorations">
      <div class="bg-decoration circle floating-element" 
           style="top: 15%; right: 5%; width: 100px; height: 100px; animation-delay: 0s;"></div>
      <div class="bg-decoration square drifting-element" 
           style="bottom: 20%; left: 8%; width: 60px; height: 60px; animation-delay: 2s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="top: 70%; right: 15%; animation-delay: 4s;"></div>
    </div>
    
    <div class="container">
      <div class="about-container stagger-children" ref="aboutContainer">
        <!-- Image Section with Parallax -->
        <div 
          class="about-image hover-lift"
          ref="aboutImage"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-offset="200"
        >
          <div class="image-wrapper">
            <img 
              src="/images/placeholders/about-story.jpg" 
              alt="About Ishwara Enterprise"
              class="parallax-element"
              ref="parallaxImage"
            >
            <!-- Image Overlay with Stats -->
            <div class="image-overlay">
              <div class="stats-container">
                <div 
                  class="stat-item"
                  v-for="(stat, index) in stats"
                  :key="stat.label"
                  :data-aos="'zoom-in'"
                  :data-aos-delay="500 + (index * 100)"
                >
                  <div class="stat-number" ref="statNumbers">{{ stat.number }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content Section -->
        <div 
          class="about-content"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-offset="200"
        >
          <h2 
            class="section-title"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible-once="{ 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 800,
                delay: 200
              }
            }"
          >
            About Ishwara Enterprise
          </h2>
          
          <div class="content-blocks">
            <p 
              class="main-description"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              Ishwara Enterprise is a multi-faceted company dedicated to providing top-tier services across various sectors. Our mission, <strong>"Build Connect Protect,"</strong> reflects our commitment to constructing robust infrastructure, connecting businesses and individuals through reliable IT services, and protecting assets with state-of-the-art security systems.
            </p>
            
            <div class="feature-blocks">
              <div 
                class="feature-block hover-glow"
                v-for="(feature, index) in features"
                :key="feature.title"
                :data-aos="'fade-up'"
                :data-aos-delay="400 + (index * 150)"
              >
                <div class="feature-icon">
                  <component :is="feature.icon" class="icon-svg" />
                </div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
            
            <!-- Call to Action -->
            <div 
              class="cta-section"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <button 
                class="cta-button btn-animated hover-lift"
                @click="scrollToServices"
              >
                <span>Explore Our Services</span>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Reactive References
 */
const aboutContainer = ref(null);
const aboutImage = ref(null);
const parallaxImage = ref(null);
const statNumbers = ref([]);

/**
 * Component Data
 */
const stats = ref([
  { number: '50+', label: 'Projects Completed' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'Client Satisfaction' }
]);

const features = ref([
  {
    title: 'Build',
    description: 'Robust infrastructure and construction solutions',
    icon: 'BuildIcon'
  },
  {
    title: 'Connect',
    description: 'Reliable IT services and network solutions',
    icon: 'ConnectIcon'
  },
  {
    title: 'Protect',
    description: 'Advanced security systems and monitoring',
    icon: 'ProtectIcon'
  }
]);

/**
 * Scroll to Services Section
 */
const scrollToServices = () => {
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    servicesSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Parallax Effect Handler
 */
const handleParallax = () => {
  if (!parallaxImage.value) return;
  
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3;
  
  parallaxImage.value.style.transform = `translateY(${rate}px)`;
};

/**
 * Animate Counter Numbers
 */
const animateCounters = () => {
  if (!process.client || !window.gsap) return;
  
  statNumbers.value.forEach((element, index) => {
    const finalNumber = stats.value[index].number;
    const numericValue = parseInt(finalNumber) || 100;
    
    const counter = { value: 0 };
    
    window.gsap.to(counter, {
      value: numericValue,
      duration: 2,
      delay: 0.5 + (index * 0.2),
      ease: "power2.out",
      onUpdate: function() {
        const currentValue = Math.round(counter.value);
        element.textContent = finalNumber.includes('%') 
          ? `${currentValue}%` 
          : finalNumber.includes('+') 
            ? `${currentValue}+` 
            : currentValue;
      }
    });
  });
};

/**
 * Initialize GSAP Animations
 */
const initGSAPAnimations = () => {
  if (!process.client || !window.gsap) return;
  
  // Create timeline for complex animations
  const tl = window.gsap.timeline({
    scrollTrigger: {
      trigger: aboutContainer.value,
      start: "top 70%",
      end: "bottom 20%",
      onEnter: () => animateCounters()
    }
  });
  
  // Floating elements animation
  window.gsap.utils.toArray('.about .bg-decoration').forEach((element, index) => {
    window.gsap.set(element, {
      rotation: Math.random() * 360
    });
    
    window.gsap.to(element, {
      rotation: `+=${180 + Math.random() * 180}`,
      duration: 8 + Math.random() * 4,
      repeat: -1,
      ease: "none"
    });
  });
};

/**
 * Performance Optimized RAF for Scroll
 */
let rafId = null;
const optimizedScrollHandler = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    handleParallax();
    rafId = null;
  });
};

/**
 * Lifecycle Hooks
 */
onMounted(() => {
  // Add scroll listener for parallax
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  
  // Initialize GSAP animations
  setTimeout(initGSAPAnimations, 100);
});

onUnmounted(() => {
  // Cleanup
  window.removeEventListener('scroll', optimizedScrollHandler);
  
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});
</script>

<style scoped>
/* About Section Styles */
.about {
  background: linear-gradient(135deg, #fdfdfd 0%, #f8f9fa 100%);
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
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

/* Container Layout */
.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Image Section */
.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-heavy);
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
  transition: all var(--transition-medium);
}

.image-wrapper:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.about-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

/* Image Overlay with Stats */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(13, 44, 84, 0.9) 0%,
    rgba(13, 44, 84, 0.7) 70%,
    transparent 100%
  );
  padding: 2rem;
  color: white;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-color);
  font-family: var(--heading-font);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
}

/* Content Section */
.about-content {
  position: relative;
}

.section-title {
  text-align: left;
  margin-bottom: 2rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
}

.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.main-description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  margin: 0;
}

.main-description strong {
  color: var(--primary-color);
  font-weight: 700;
}

/* Feature Blocks */
.feature-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-block {
  padding: 1.5rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
}

.feature-block:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-svg {
  width: 30px;
  height: 30px;
}

.feature-block h3 {
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.feature-block p {
  color: var(--text-color);
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  margin-top: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, var(--primary-color), #1a4a84);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-medium);
}

.cta-button:hover {
  background: linear-gradient(45deg, #1a4a84, var(--primary-color));
  transform: translateY(-2px);
  box-shadow: var(--shadow-heavy);
}

.arrow-icon {
  width: 18px;
  height: 18px;
  transition: transform var(--transition-fast);
}

.cta-button:hover .arrow-icon {
  transform: translateX(3px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .section-title {
    text-align: center;
  }
  
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .image-wrapper {
    transform: none;
  }
  
  .stats-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .feature-blocks {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .floating-decorations .bg-decoration {
    opacity: 0.03;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .image-wrapper,
  .feature-block {
    transition: none;
  }
  
  .about-image img {
    transform: none !important;
  }
  
  .floating-decorations * {
    animation: none !important;
  }
}

@media (prefers-contrast: high) {
  .feature-block {
    border: 2px solid var(--primary-color);
  }
  
  .image-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>

<!-- Icon Components -->
<script>
// Simple SVG icon components
const BuildIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7L12 2z"/>
      <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z"/>
    </svg>
  `
};

const ConnectIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6.5 6.5h11"/>
      <path d="M6.5 17.5h11"/>
      <path d="M6.5 12h11"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  `
};

const ProtectIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  `
};

export { BuildIcon, ConnectIcon, ProtectIcon };
</script>
