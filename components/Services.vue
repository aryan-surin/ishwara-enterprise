<!--
  Enhanced Services Component with Interactive Cards and Animations
  Features: Card hover effects, icon animations, staggered reveals, floating elements
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <section id="services" class="services parallax-container">
    <!-- Background Decorative Elements -->
    <div class="floating-decorations">
      <div class="bg-decoration circle floating-element" 
           style="top: 10%; left: 5%; width: 120px; height: 120px; animation-delay: 1s;"></div>
      <div class="bg-decoration square drifting-element" 
           style="top: 60%; right: 8%; width: 80px; height: 80px; animation-delay: 3s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="bottom: 15%; left: 12%; animation-delay: 5s;"></div>
      <div class="bg-decoration circle floating-element" 
           style="bottom: 70%; right: 15%; width: 60px; height: 60px; animation-delay: 2s;"></div>
    </div>
    
    <div class="container">
      <!-- Section Header -->
      <div class="section-header" ref="sectionHeader">
        <h2 
          class="section-title"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Our Services
        </h2>
        <p 
          class="section-subtitle"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          Comprehensive solutions tailored to build, connect, and protect your business
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="service-cards stagger-children" ref="servicesGrid">
        <div 
          class="card hover-lift"
          v-for="(service, index) in services" 
          :key="service.title"
          :data-aos="'zoom-in'"
          :data-aos-delay="300 + (index * 150)"
          :data-aos-duration="600"
          @mouseenter="handleCardHover(index, true)"
          @mouseleave="handleCardHover(index, false)"
          :ref="el => { if (el) cardRefs[index] = el }"
        >
          <!-- Card Background Effect -->
          <div class="card-bg-effect"></div>
          
          <!-- Service Icon -->
          <div class="card-icon" :class="{ 'animated': hoveredCard === index }">
            <div class="icon-container">
              <img :src="service.icon" :alt="service.title" class="service-icon">
              <!-- Animated Ring -->
              <div class="icon-ring"></div>
              <div class="icon-ring delayed"></div>
            </div>
          </div>
          
          <!-- Service Content -->
          <div class="card-content">
            <h3 class="service-title">{{ service.title }}</h3>
            
            <ul class="service-features">
              <li 
                v-for="(item, itemIndex) in service.items" 
                :key="item"
                class="feature-item"
                :style="{ 
                  transitionDelay: hoveredCard === index ? `${itemIndex * 100}ms` : '0ms' 
                }"
              >
                <span class="feature-icon">✓</span>
                <span class="feature-text">{{ item }}</span>
              </li>
            </ul>
            
            <!-- Call to Action -->
            <button 
              class="service-cta btn-animated"
              @click="requestService(service.title)"
            >
              <span>Learn More</span>
              <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </button>
          </div>
          
          <!-- Hover Overlay -->
          <div class="card-overlay">
            <div class="overlay-content">
              <h4>{{ service.title }}</h4>
              <p>{{ service.description || 'Professional solutions delivered with excellence' }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom CTA Section -->
      <div 
        class="bottom-cta"
        data-aos="fade-up"
        data-aos-delay="800"
        data-aos-duration="800"
      >
        <h3>Ready to Transform Your Business?</h3>
        <p>Contact us today to discuss your project requirements</p>
        <button 
          class="primary-cta btn-animated hover-lift"
          @click="scrollToContact"
        >
          <span>Get Started</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Reactive References
 */
const sectionHeader = ref(null);
const servicesGrid = ref(null);
const cardRefs = ref([]);
const hoveredCard = ref(-1);

/**
 * Services Data with Enhanced Information
 */
const services = ref([
  {
    title: 'Construction',
    icon: '/images/placeholders/service-construction.png',
    items: ['Residential & Commercial', 'Renovation & Remodeling', 'Road & Civil Works'],
    description: 'Professional construction services with modern techniques and quality materials'
  },
  {
    title: 'Security Systems',
    icon: '/images/placeholders/service-security.png',
    items: ['CCTV Installation & Maintenance', 'Video Surveillance Setup', 'Remote Monitoring'],
    description: 'Advanced security solutions to protect your assets and ensure peace of mind'
  },
  {
    title: 'Fire Protection',
    icon: '/images/placeholders/service-fire.png',
    items: ['Fire Alarm Installation', 'Fire Extinguisher Supply', 'Fire Safety Inspections'],
    description: 'Comprehensive fire safety systems and emergency response solutions'
  },
  {
    title: 'IT Services',
    icon: '/images/placeholders/service-it.png',
    items: ['Hardware Supply & Installation', 'Network Setup & Maintenance', 'Server Support'],
    description: 'Complete IT infrastructure solutions for modern business needs'
  }
]);

/**
 * Handle Card Hover Effects
 */
const handleCardHover = (index, isHovered) => {
  hoveredCard.value = isHovered ? index : -1;
  
  // Trigger GSAP animations on hover
  if (process.client && window.gsap && cardRefs.value[index]) {
    const card = cardRefs.value[index];
    const icon = card.querySelector('.icon-container');
    const rings = card.querySelectorAll('.icon-ring');
    
    if (isHovered) {
      // Hover in animations
      window.gsap.to(icon, { 
        rotation: 360, 
        scale: 1.1, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      });
      
      rings.forEach((ring, ringIndex) => {
        window.gsap.to(ring, {
          scale: 1.5 + (ringIndex * 0.3),
          opacity: 0.7 - (ringIndex * 0.3),
          duration: 0.8,
          delay: ringIndex * 0.1,
          ease: "power2.out"
        });
      });
    } else {
      // Hover out animations
      window.gsap.to(icon, { 
        rotation: 0, 
        scale: 1, 
        duration: 0.4 
      });
      
      rings.forEach(ring => {
        window.gsap.to(ring, {
          scale: 1,
          opacity: 0,
          duration: 0.4
        });
      });
    }
  }
};

/**
 * Request Service Handler
 */
const requestService = (serviceName) => {
  // TODO: Implement service request functionality
  console.log(`Service requested: ${serviceName}`);
  
  // Scroll to contact section for now
  scrollToContact();
};

/**
 * Scroll to Contact Section
 */
const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Initialize GSAP Animations
 */
const initGSAPAnimations = () => {
  if (!process.client || !window.gsap) return;
  
  // Floating background elements
  window.gsap.utils.toArray('.services .bg-decoration').forEach((element, index) => {
    window.gsap.set(element, {
      rotation: Math.random() * 360
    });
    
    window.gsap.to(element, {
      rotation: `+=${360 + Math.random() * 180}`,
      duration: 12 + Math.random() * 8,
      repeat: -1,
      ease: "none"
    });
  });
  
  // Cards entrance animation
  const cards = window.gsap.utils.toArray('.service-cards .card');
  
  window.gsap.fromTo(cards, 
    {
      y: 100,
      opacity: 0,
      scale: 0.8
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: servicesGrid.value,
        start: "top 80%",
        end: "bottom 20%"
      }
    }
  );
};

/**
 * Lifecycle Hooks
 */
onMounted(() => {
  // Initialize animations after a short delay
  setTimeout(initGSAPAnimations, 200);
});

onUnmounted(() => {
  // Cleanup would go here if needed
});
</script>

<style scoped>
/* Services Section Styles */
.services {
  background: linear-gradient(135deg, var(--background-color) 0%, #f0f4f8 100%);
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

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.section-title {
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
}

/* Services Grid */
.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

/* Service Card */
.card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: var(--shadow-heavy);
}

/* Card Background Effect */
.card-bg-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  opacity: 0;
  transition: opacity var(--transition-medium);
}

.card:hover .card-bg-effect {
  opacity: 0.05;
}

/* Service Icon */
.card-icon {
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.icon-container {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
}

.service-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-medium);
}

.card:hover .service-icon {
  box-shadow: var(--shadow-heavy);
}

/* Icon Rings */
.icon-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  scale: 1;
}

.icon-ring.delayed {
  border-color: var(--primary-color);
}

/* Card Content */
.card-content {
  position: relative;
  z-index: 2;
}

.service-title {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin: 0 0 1.5rem 0;
  font-weight: 700;
  transition: color var(--transition-medium);
}

.card:hover .service-title {
  color: var(--accent-color);
}

/* Service Features */
.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  transition: all var(--transition-fast);
  opacity: 0.8;
}

.card:hover .feature-item {
  opacity: 1;
  transform: translateX(5px);
}

.feature-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.feature-text {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.5;
}

/* Service CTA */
.service-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
}

.service-cta:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.cta-arrow {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
}

.service-cta:hover .cta-arrow {
  transform: translateX(3px);
}

/* Card Overlay */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: opacity var(--transition-medium);
  padding: 2rem;
}

.card:hover .card-overlay {
  opacity: 0.95;
}

.overlay-content {
  text-align: center;
  transform: translateY(20px);
  transition: transform var(--transition-medium);
}

.card:hover .overlay-content {
  transform: translateY(0);
}

.overlay-content h4 {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.overlay-content p {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
}

/* Bottom CTA Section */
.bottom-cta {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-medium);
  position: relative;
  z-index: 1;
}

.bottom-cta h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.bottom-cta p {
  font-size: 1.1rem;
  color: var(--text-color);
  margin: 0 0 2rem 0;
  opacity: 0.9;
}

.primary-cta {
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
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-medium);
}

.primary-cta:hover {
  background: linear-gradient(45deg, #ffc15c, var(--accent-color));
  transform: translateY(-3px);
  box-shadow: var(--shadow-heavy);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform var(--transition-fast);
}

.primary-cta:hover .arrow-icon {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .service-cards {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .card {
    padding: 2rem 1.5rem;
  }
  
  .service-title {
    font-size: 1.5rem;
  }
  
  .bottom-cta {
    padding: 2rem 1rem;
  }
  
  .bottom-cta h3 {
    font-size: 1.5rem;
  }
  
  .floating-decorations .bg-decoration {
    opacity: 0.02;
  }
  
  /* Disable complex hover effects on mobile */
  .card-overlay {
    display: none;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .card,
  .service-icon,
  .feature-item {
    transition: none;
  }
  
  .floating-decorations * {
    animation: none !important;
  }
  
  .card:hover {
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .card {
    border: 2px solid var(--primary-color);
  }
  
  .service-cta {
    border-width: 3px;
  }
}

/* Print Styles */
@media print {
  .floating-decorations,
  .card-overlay {
    display: none;
  }
  
  .card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ccc;
  }
}
</style>
