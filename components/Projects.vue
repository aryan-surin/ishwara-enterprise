<!--
  Enhanced Projects Component with Interactive Portfolio Display
  Features: Project cards, image galleries, technology stacks, live demos
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <section id="projects" class="projects parallax-container">
    <!-- Background Decorative Elements -->
    <div class="floating-decorations">
      <div class="bg-decoration circle floating-element" 
           style="top: 15%; left: 8%; width: 100px; height: 100px; animation-delay: 0s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="top: 60%; right: 10%; animation-delay: 3s;"></div>
      <div class="bg-decoration square drifting-element" 
           style="bottom: 20%; left: 12%; width: 80px; height: 80px; animation-delay: 1.5s;"></div>
      <div class="bg-decoration circle floating-element" 
           style="top: 35%; right: 15%; width: 60px; height: 60px; animation-delay: 4s;"></div>
    </div>
    
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 
          class="section-title"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Our Featured Projects
        </h2>
        <p 
          class="section-subtitle"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          Showcasing innovative solutions that drive business success
        </p>
      </div>
      
      <!-- Projects Filter -->
      <div 
        class="projects-filter"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <button 
          v-for="filter in projectFilters"
          :key="filter"
          :class="['filter-btn', { active: activeFilter === filter }]"
          @click="setActiveFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
      
      <!-- Projects Grid -->
      <div class="projects-grid stagger-children" ref="projectsGrid">
        <div 
          class="project-card hover-lift"
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          :data-aos="'zoom-in'"
          :data-aos-delay="400 + (index * 150)"
          :data-aos-duration="600"
          @mouseenter="handleProjectHover(index, true)"
          @mouseleave="handleProjectHover(index, false)"
          :ref="el => { if (el) projectRefs[index] = el }"
        >
          <!-- Project Image -->
          <div class="project-image-container">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="project-image"
              @error="handleImageError"
            >
            
            <!-- Project Overlay -->
            <div class="project-overlay">
              <div class="overlay-content">
                <div class="project-actions">
                  <button 
                    class="action-btn demo-btn"
                    @click="viewProject(project)"
                    title="View Project Details"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View Details
                  </button>
                  
                  <button 
                    class="action-btn code-btn"
                    @click="contactForProject(project)"
                    title="Get Similar Project Quote"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92V21a2 2 0 01-2.18 2A19.8 19.8 0 018.5 17.31 19.28 19.28 0 01.69 8.82 2 2 0 012.68 7h4.08a2 2 0 012 1.72c.128.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 14.91a16 16 0 007 7z"/>
                    </svg>
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Project Status Badge -->
            <div class="project-status" :class="project.status">
              {{ project.status }}
            </div>
          </div>
          
          <!-- Project Info -->
          <div class="project-info">
            <div class="project-category">{{ project.category }}</div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <!-- Technology Stack -->
            <div class="tech-stack">
              <span class="tech-label">Technologies:</span>
              <div class="tech-tags">
                <span 
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Project Meta -->
            <div class="project-meta">
              <div class="meta-row">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ project.duration }}
                </div>
                
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                  {{ project.teamSize }}
                </div>
              </div>
              
              <div class="meta-row">
                <div class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {{ project.location }}
                </div>
                
                <div class="meta-item value">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="m17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  {{ project.projectValue }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Project Statistics -->
      <div 
        class="project-stats"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div class="stats-grid">
          <div 
            class="stat-item"
            v-for="(stat, index) in projectStats"
            :key="stat.label"
            :data-aos="'flip-up'"
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
import { ref, computed, onMounted, onUnmounted } from 'vue';

/**
 * Reactive References
 */
const projectsGrid = ref(null);
const projectRefs = ref([]);
const statNumbers = ref([]);
const activeFilter = ref('All');

/**
 * Project Filters
 */
const projectFilters = ref(['All', 'Construction', 'Security Systems', 'Fire Protection', 'IT Services']);

/**
 * Projects Data Based on Ishwara Enterprise Services
 */
const projects = ref([
  {
    id: 1,
    title: 'Metro Shopping Complex Construction',
    category: 'Construction',
    description: 'Complete commercial building construction with modern architecture, including retail spaces, parking facilities, and infrastructure development for Metro Shopping Complex.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
    technologies: ['Steel Framework', 'Concrete', 'Glass Facade', 'MEP Systems', 'Safety Equipment'],
    status: 'completed',
    duration: '18 months',
    teamSize: '25 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Downtown Business District',
    client: 'Metro Retail Group',
    projectValue: '₹15.5 Crores',
    features: [
      '250,000 sq ft commercial space',
      'Multi-level parking for 500 vehicles',
      'Modern HVAC and electrical systems',
      'Fire safety compliance',
      'Green building certification'
    ]
  },
  {
    id: 2,
    title: 'Residential Villa Complex - Phase 2',
    category: 'Construction',
    description: 'Premium residential villa development with landscaping, road infrastructure, and utility connections. Focus on sustainable construction and modern amenities.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    technologies: ['RCC Structure', 'Modular Construction', 'Smart Home Systems', 'Solar Panels', 'Rainwater Harvesting'],
    status: 'in-progress',
    duration: '24 months',
    teamSize: '35 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Green Valley Estates',
    client: 'Sunrise Developers',
    projectValue: '₹22.8 Crores',
    features: [
      '48 premium villas (3-4 BHK)',
      'Private gardens and driveways',
      'Community clubhouse and amenities',
      'Gated security with CCTV',
      'Underground electrical and plumbing'
    ]
  },
  {
    id: 3,
    title: 'Highway Bridge Construction',
    category: 'Construction',
    description: 'Major infrastructure project involving the construction of a 4-lane highway bridge with advanced engineering solutions for heavy traffic load capacity.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
    technologies: ['Prestressed Concrete', 'Steel Girders', 'Foundation Piling', 'Traffic Management', 'Quality Testing'],
    status: 'completed',
    duration: '14 months',
    teamSize: '45 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'NH-48 Corridor',
    client: 'State Highway Authority',
    projectValue: '₹38.2 Crores',
    features: [
      '800-meter long bridge span',
      '4-lane traffic capacity',
      'Load capacity: 70 tonnes',
      'Seismic resistant design',
      'LED lighting and safety barriers'
    ]
  },
  {
    id: 4,
    title: 'Corporate Campus Security System',
    category: 'Security Systems',
    description: 'Comprehensive CCTV installation and surveillance system for a large corporate campus with 200+ cameras, access control, and 24/7 monitoring capabilities.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop',
    technologies: ['IP Cameras', 'NVR Systems', 'Access Control', 'Motion Detection', 'Mobile App Integration'],
    status: 'completed',
    duration: '3 months',
    teamSize: '8 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Tech Park Phase 1',
    client: 'TechCorp Industries',
    projectValue: '₹1.2 Crores',
    features: [
      '250 high-definition IP cameras',
      'Central monitoring station',
      'Mobile app for remote viewing',
      'Facial recognition system',
      'Night vision capabilities'
    ]
  },
  {
    id: 5,
    title: 'Manufacturing Plant Surveillance',
    category: 'Security Systems',
    description: 'Industrial-grade CCTV system installation for manufacturing facility with explosion-proof cameras, perimeter security, and integration with existing alarm systems.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop',
    technologies: ['Explosion-proof Cameras', 'Thermal Imaging', 'Perimeter Detection', 'Integration Systems', 'Cloud Storage'],
    status: 'in-progress',
    duration: '4 months',
    teamSize: '12 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Industrial Zone B',
    client: 'Prime Manufacturing Ltd',
    projectValue: '₹2.1 Crores',
    features: [
      'Hazardous area certified cameras',
      'Thermal perimeter detection',
      'Integration with fire alarm system',
      'Real-time threat detection',
      'Redundant recording systems'
    ]
  },
  {
    id: 6,
    title: 'Hospital Fire Safety System',
    category: 'Fire Protection',
    description: 'Complete fire protection system installation for a 500-bed hospital including fire alarms, sprinkler systems, smoke detection, and emergency evacuation systems.',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=600&h=400&fit=crop',
    technologies: ['Addressable Fire Alarm', 'Sprinkler Systems', 'Smoke Detectors', 'Emergency Lighting', 'PA Systems'],
    status: 'completed',
    duration: '6 months',
    teamSize: '15 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Medical District',
    client: 'City General Hospital',
    projectValue: '₹3.5 Crores',
    features: [
      'Addressable fire alarm panel',
      'Wet and dry sprinkler systems',
      '1,200+ smoke detectors',
      'Emergency evacuation systems',
      'Central monitoring with fire dept'
    ]
  },
  {
    id: 7,
    title: 'Shopping Mall Fire Protection',
    category: 'Fire Protection',
    description: 'Advanced fire protection system for multi-level shopping mall with high-capacity sprinkler systems, smoke management, and emergency communication systems.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop',
    technologies: ['Deluge Systems', 'Smoke Management', 'Emergency Communication', 'Fire Pumps', 'Suppression Systems'],
    status: 'in-progress',
    duration: '8 months',
    teamSize: '20 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Central Mall Complex',
    client: 'Grand Plaza Shopping',
    projectValue: '₹4.8 Crores',
    features: [
      'Multi-zone fire detection',
      'Smoke evacuation systems',
      'Emergency announcement system',
      'Automatic fire suppression',
      'Integration with building management'
    ]
  },
  {
    id: 8,
    title: 'Corporate IT Infrastructure Setup',
    category: 'IT Services',
    description: 'Complete IT infrastructure deployment for corporate headquarters including server setup, network configuration, workstation deployment, and ongoing maintenance.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    technologies: ['Dell Servers', 'Cisco Networking', 'HP Workstations', 'VMware', 'Microsoft 365'],
    status: 'completed',
    duration: '2 months',
    teamSize: '6 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'Business Park Tower',
    client: 'Global Solutions Inc',
    projectValue: '₹85 Lakhs',
    features: [
      '50 workstations deployment',
      'Server room setup with cooling',
      'Structured cabling system',
      'Network security implementation',
      '24/7 support and maintenance'
    ]
  },
  {
    id: 9,
    title: 'Educational Institute Network Upgrade',
    category: 'IT Services',
    description: 'Network infrastructure upgrade for educational campus including WiFi deployment, computer lab setup, server migration, and digital classroom solutions.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    technologies: ['WiFi 6 Network', 'Computer Labs', 'Digital Boards', 'Server Migration', 'Network Management'],
    status: 'completed',
    duration: '3 months',
    teamSize: '8 members',
    demoUrl: '#',
    codeUrl: '#',
    location: 'University Campus',
    client: 'State University',
    projectValue: '₹1.5 Crores',
    features: [
      'Campus-wide WiFi coverage',
      '5 computer labs (200+ systems)',
      'Interactive digital classrooms',
      'Centralized server management',
      'Student portal and LMS'
    ]
  }
]);

/**
 * Project Statistics
 */
const projectStats = ref([
  { number: '75+', label: 'Projects Completed' },
  { number: '95%', label: 'Client Satisfaction' },
  { number: '₹150+', label: 'Crores Project Value' },
  { number: '24/7', label: 'Support Available' }
]);

/**
 * Computed Properties
 */
const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects.value;
  }
  return projects.value.filter(project => project.category === activeFilter.value);
});

/**
 * Methods
 */
const setActiveFilter = (filter) => {
  activeFilter.value = filter;
  
  // Animate filtered projects
  if (process.client && window.gsap) {
    window.gsap.fromTo('.project-card', 
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    );
  }
};

const handleProjectHover = (index, isHovered) => {
  if (process.client && window.gsap && projectRefs.value[index]) {
    const card = projectRefs.value[index];
    const image = card.querySelector('.project-image');
    
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

const handleImageError = (event) => {
  // Fallback to a placeholder image
  event.target.src = 'https://via.placeholder.com/600x400/0D2C54/ffffff?text=Project+Image';
};

const viewProject = (project) => {
  // TODO: Implement project details modal or page
  console.log(`Viewing project details: ${project.title}`);
  
  // For now, scroll to contact section
  scrollToContact();
};

const contactForProject = (project) => {
  // TODO: Implement quote request functionality
  console.log(`Requesting quote for similar project: ${project.category}`);
  
  // For now, scroll to contact section
  scrollToContact();
};

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
 * Animate Project Statistics
 */
const animateStats = () => {
  if (!process.client || !window.gsap) return;
  
  statNumbers.value.forEach((element, index) => {
    const finalNumber = projectStats.value[index].number;
    const numericValue = parseInt(finalNumber) || 100;
    
    const counter = { value: 0 };
    
    window.gsap.to(counter, {
      value: numericValue,
      duration: 2,
      delay: 0.5 + (index * 0.2),
      ease: "power2.out",
      onUpdate: function() {
        const currentValue = Math.round(counter.value);
        if (finalNumber.includes('%')) {
          element.textContent = `${currentValue}%`;
        } else if (finalNumber.includes('+')) {
          element.textContent = `${currentValue}+`;
        } else if (finalNumber.includes('/')) {
          element.textContent = finalNumber; // Keep as is for 24/7
        } else {
          element.textContent = currentValue;
        }
      }
    });
  });
};

/**
 * Initialize GSAP Animations
 */
const initGSAPAnimations = () => {
  if (!process.client || !window.gsap) return;
  
  // Project cards entrance animation
  const cards = window.gsap.utils.toArray('.projects-grid .project-card');
  
  window.gsap.fromTo(cards, 
    {
      y: 80,
      opacity: 0,
      rotationX: -15
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: projectsGrid.value,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => animateStats()
      }
    }
  );
  
  // Floating background elements
  window.gsap.utils.toArray('.projects .bg-decoration').forEach((element, index) => {
    window.gsap.set(element, {
      rotation: Math.random() * 360
    });
    
    window.gsap.to(element, {
      rotation: `+=${360 + Math.random() * 180}`,
      duration: 20 + Math.random() * 10,
      repeat: -1,
      ease: "none"
    });
  });
};

/**
 * Lifecycle Hooks
 */
onMounted(() => {
  setTimeout(initGSAPAnimations, 300);
});

onUnmounted(() => {
  // Cleanup would go here if needed
});
</script>

<style scoped>
/* Projects Section Styles */
.projects {
  background: linear-gradient(135deg, #f8fafe 0%, #ffffff 100%);
  position: relative;
  min-height: 100vh;
  padding: 6rem 0;
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
  margin-bottom: 3rem;
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

/* Projects Filter */
.projects-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.filter-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  transition: left 0.3s ease;
  z-index: -1;
}

.filter-btn:hover::before,
.filter-btn.active::before {
  left: 0;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

/* Project Card */
.project-card {
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-light);
  overflow: hidden;
  transition: all var(--transition-medium);
  position: relative;
}

.project-card:hover {
  transform: translateY(-15px);
  box-shadow: var(--shadow-heavy);
}

/* Project Image */
.project-image-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all var(--transition-medium);
}

/* Project Overlay */
.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 44, 84, 0.9) 0%,
    rgba(251, 176, 59, 0.9) 100%
  );
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-medium);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.project-actions {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
}

.action-btn:hover {
  background: white;
  color: var(--primary-color);
  transform: scale(1.05);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

/* Project Status Badge */
.project-status {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}

.project-status.completed {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.project-status.in-progress {
  background: rgba(251, 176, 59, 0.9);
  color: white;
}

/* Project Info */
.project-info {
  padding: 2rem;
}

.project-category {
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.project-description {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Technology Stack */
.tech-stack {
  margin-bottom: 1.5rem;
}

.tech-label {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
  display: block;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Project Meta */
.project-meta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meta-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-color);
  flex: 1;
  min-width: 140px;
}

.meta-item.value {
  font-weight: 600;
  color: var(--accent-color);
}

.meta-item svg {
  width: 14px;
  height: 14px;
  color: var(--primary-color);
  flex-shrink: 0;
}

/* Project Statistics */
.project-stats {
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
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .project-info {
    padding: 1.5rem;
  }
  
  .project-actions {
    flex-direction: row;
    gap: 0.8rem;
  }
  
  .action-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .projects-filter {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
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
  .project-card,
  .project-image,
  .action-btn,
  .filter-btn {
    transition: none;
  }
  
  .floating-decorations * {
    animation: none !important;
  }
  
  .project-card:hover {
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .project-card {
    border: 2px solid var(--primary-color);
  }
  
  .project-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>
