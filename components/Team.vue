<!--
  Enhanced Team Component with Interactive Member Cards and Animations
  Features: Profile hover effects, skill animations, social links, floating elements
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <section id="team" class="team parallax-container">
    <!-- Background Decorative Elements -->
    <div class="floating-decorations">
      <div class="bg-decoration circle floating-element" 
           style="top: 20%; left: 10%; width: 90px; height: 90px; animation-delay: 0s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="top: 70%; right: 5%; animation-delay: 2s;"></div>
      <div class="bg-decoration square drifting-element" 
           style="bottom: 15%; left: 15%; width: 70px; height: 70px; animation-delay: 4s;"></div>
      <div class="bg-decoration circle floating-element" 
           style="top: 40%; right: 20%; width: 50px; height: 50px; animation-delay: 1s;"></div>
    </div>
    
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 
          class="section-title"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Meet Our Team
        </h2>
        <p 
          class="section-subtitle"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          Dedicated professionals committed to delivering exceptional results
        </p>
      </div>
      
      <!-- Team Members Grid -->
      <div class="team-members stagger-children" ref="teamGrid">
        <div 
          class="team-member hover-lift"
          v-for="(member, index) in teamMembers" 
          :key="member.name"
          :data-aos="'flip-up'"
          :data-aos-delay="300 + (index * 150)"
          :data-aos-duration="600"
          @mouseenter="handleMemberHover(index, true)"
          @mouseleave="handleMemberHover(index, false)"
          :ref="el => { if (el) memberRefs[index] = el }"
        >
          <!-- Member Card -->
          <div class="member-card">
            <!-- Profile Image Section -->
            <div class="member-image-container">
              <div class="image-wrapper">
                <img :src="member.image" :alt="member.name" class="member-image" @error="handleImageError">
                
                <!-- Hover Overlay -->
                <div class="image-overlay">
                  <div class="social-links">
                    <a 
                      v-for="social in member.social" 
                      :key="social.platform"
                      :href="social.url" 
                      class="social-link"
                      :aria-label="`${member.name} on ${social.platform}`"
                    >
                      <component :is="getSocialIcon(social.platform)" />
                    </a>
                  </div>
                </div>
              </div>
              
              <!-- Status Indicator -->
              <div class="status-indicator" :class="member.status">
                <span class="status-dot"></span>
                <span class="status-text">{{ member.status === 'online' ? 'Available' : 'Busy' }}</span>
              </div>
            </div>
            
            <!-- Member Info -->
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-description">{{ member.description }}</p>
              
              <!-- Skills Section -->
              <div class="skills-section" v-if="member.skills">
                <h4 class="skills-title">Expertise</h4>
                <div class="skills-list">
                  <span 
                    v-for="skill in member.skills" 
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              
              <!-- Contact Actions -->
              <div class="member-actions">
                <button 
                  class="contact-btn btn-animated"
                  @click="contactMember(member)"
                >
                  <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92V21a2 2 0 01-2.18 2A19.8 19.8 0 018.5 17.31 19.28 19.28 0 01.69 8.82 2 2 0 012.68 7h4.08a2 2 0 012 1.72c.128.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 14.91a16 16 0 007 7z"/>
                  </svg>
                  Contact
                </button>
                
                <button 
                  class="view-profile-btn btn-animated"
                  @click="viewProfile(member)"
                >
                  <svg class="profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Team Stats Section -->
      <div 
        class="team-stats"
        data-aos="fade-up"
        data-aos-delay="800"
        data-aos-duration="800"
      >
        <div class="stats-grid">
          <div 
            class="stat-item"
            v-for="(stat, index) in teamStats"
            :key="stat.label"
            :data-aos="'zoom-in'"
            :data-aos-delay="900 + (index * 100)"
          >
            <div class="stat-number" ref="statNumbers">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
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
const teamGrid = ref(null);
const memberRefs = ref([]);
const statNumbers = ref([]);
const hoveredMember = ref(-1);

/**
 * Team Members Data with Enhanced Information
 */
const teamMembers = ref([
  { 
    name: 'John Doe', 
    role: 'CEO & Founder', 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    description: 'Visionary leader with 20+ years of industry experience',
    skills: ['Leadership', 'Strategy', 'Business Development'],
    status: 'online',
    social: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: 'mailto:john@ishwara.com' }
    ]
  },
  { 
    name: 'Jane Smith', 
    role: 'Chief Technology Officer', 
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b300?w=400&h=400&fit=crop&crop=face',
    description: 'Technical expert specializing in innovative solutions',
    skills: ['Technology', 'Innovation', 'Team Management'],
    status: 'online',
    social: [
      { platform: 'linkedin', url: '#' },
      { platform: 'github', url: '#' },
      { platform: 'email', url: 'mailto:jane@ishwara.com' }
    ]
  },
  { 
    name: 'Peter Jones', 
    role: 'Lead Developer', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    description: 'Full-stack developer with expertise in modern technologies',
    skills: ['Development', 'Architecture', 'DevOps'],
    status: 'busy',
    social: [
      { platform: 'github', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: 'mailto:peter@ishwara.com' }
    ]
  },
  { 
    name: 'Sarah Williams', 
    role: 'Project Manager', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    description: 'Experienced project manager ensuring timely delivery',
    skills: ['Project Management', 'Agile', 'Communication'],
    status: 'online',
    social: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: 'mailto:sarah@ishwara.com' }
    ]
  }
]);

/**
 * Team Statistics
 */
const teamStats = ref([
  { number: '25+', label: 'Team Members' },
  { number: '150+', label: 'Projects Delivered' },
  { number: '8+', label: 'Years Average Experience' },
  { number: '99%', label: 'Success Rate' }
]);

/**
 * Handle Member Hover Effects
 */
const handleMemberHover = (index, isHovered) => {
  hoveredMember.value = isHovered ? index : -1;
  
  if (process.client && window.gsap && memberRefs.value[index]) {
    const card = memberRefs.value[index];
    const image = card.querySelector('.member-image');
    
    if (isHovered) {
      window.gsap.to(image, { 
        scale: 1.1, 
        duration: 0.4, 
        ease: "power2.out" 
      });
    } else {
      window.gsap.to(image, { 
        scale: 1, 
        duration: 0.4 
      });
    }
  }
};

/**
 * Handle Image Loading Errors
 */
const handleImageError = (event) => {
  // Fallback to a default avatar if image fails to load
  event.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(event.target.alt) + '&size=400&background=0D2C54&color=fff';
};

/**
 * Contact Member Handler
 */
const contactMember = (member) => {
  // TODO: Implement contact functionality
  console.log(`Contacting ${member.name}`);
  
  // For now, open email client
  const emailSocial = member.social.find(s => s.platform === 'email');
  if (emailSocial) {
    window.location.href = emailSocial.url;
  }
};

/**
 * View Profile Handler
 */
const viewProfile = (member) => {
  // TODO: Implement profile modal or page
  console.log(`Viewing profile of ${member.name}`);
  
  // For now, scroll to contact section
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
 * Get Social Icon Component
 */
const getSocialIcon = (platform) => {
  const icons = {
    linkedin: 'LinkedInIcon',
    twitter: 'TwitterIcon',
    github: 'GitHubIcon',
    email: 'EmailIcon'
  };
  return icons[platform] || 'DefaultIcon';
};

/**
 * Animate Team Statistics
 */
const animateStats = () => {
  if (!process.client || !window.gsap) return;
  
  statNumbers.value.forEach((element, index) => {
    const finalNumber = teamStats.value[index].number;
    const numericValue = parseInt(finalNumber) || 100;
    
    const counter = { value: 0 };
    
    window.gsap.to(counter, {
      value: numericValue,
      duration: 2.5,
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
  
  // Team cards entrance animation
  const cards = window.gsap.utils.toArray('.team-members .team-member');
  
  window.gsap.fromTo(cards, 
    {
      y: 100,
      opacity: 0,
      rotationY: -15
    },
    {
      y: 0,
      opacity: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: teamGrid.value,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => animateStats()
      }
    }
  );
  
  // Floating background elements
  window.gsap.utils.toArray('.team .bg-decoration').forEach((element, index) => {
    window.gsap.set(element, {
      rotation: Math.random() * 360
    });
    
    window.gsap.to(element, {
      rotation: `+=${360 + Math.random() * 180}`,
      duration: 15 + Math.random() * 10,
      repeat: -1,
      ease: "none"
    });
  });
};

/**
 * Lifecycle Hooks
 */
onMounted(() => {
  setTimeout(initGSAPAnimations, 200);
});

onUnmounted(() => {
  // Cleanup would go here if needed
});
</script>

<style scoped>
/* Team Section Styles */
.team {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafe 100%);
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

/* Team Members Grid */
.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

/* Team Member Card */
.team-member {
  position: relative;
  transition: all var(--transition-medium);
}

.member-card {
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-light);
  overflow: hidden;
  transition: all var(--transition-medium);
  position: relative;
}

.team-member:hover .member-card {
  transform: translateY(-10px);
  box-shadow: var(--shadow-heavy);
}

/* Member Image Section */
.member-image-container {
  position: relative;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.member-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: all var(--transition-medium);
}

/* Image Overlay */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 44, 84, 0.8) 0%,
    rgba(251, 176, 59, 0.8) 100%
  );
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-medium);
}

.team-member:hover .image-overlay {
  opacity: 1;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: white;
  color: var(--primary-color);
  transform: scale(1.1);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* Status Indicator */
.status-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.status-indicator.online .status-dot {
  background: #10b981;
}

.status-text {
  color: var(--text-color);
}

/* Member Info */
.member-info {
  padding: 2rem;
}

.member-name {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.member-role {
  color: var(--accent-color);
  font-weight: 600;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.member-description {
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Skills Section */
.skills-section {
  margin-bottom: 1.5rem;
}

.skills-title {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
  margin: 0 0 0.8rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Member Actions */
.member-actions {
  display: flex;
  gap: 1rem;
}

.contact-btn,
.view-profile-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
}

.contact-btn {
  background: var(--primary-color);
  color: white;
}

.contact-btn:hover {
  background: #1a4a84;
  transform: translateY(-2px);
}

.view-profile-btn {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.view-profile-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.contact-icon,
.profile-icon {
  width: 16px;
  height: 16px;
}

/* Team Stats Section */
.team-stats {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow-medium);
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  font-family: var(--heading-font);
  line-height: 1;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-color);
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .team-members {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .member-info {
    padding: 1.5rem;
  }
  
  .member-actions {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .floating-decorations .bg-decoration {
    opacity: 0.02;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .member-card,
  .member-image,
  .social-link {
    transition: none;
  }
  
  .floating-decorations * {
    animation: none !important;
  }
  
  .team-member:hover .member-card {
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .member-card {
    border: 2px solid var(--primary-color);
  }
  
  .image-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>

<!-- Social Icon Components -->
<script>
// Simple SVG social media icon components
const LinkedInIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
};

const TwitterIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  `
};

const GitHubIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  `
};

const EmailIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  `
};

const DefaultIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  `
};

export { LinkedInIcon, TwitterIcon, GitHubIcon, EmailIcon, DefaultIcon };
</script>
