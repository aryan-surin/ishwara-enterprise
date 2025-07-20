<!--
  Enhanced Contact Component with Interactive Form and Animations
  Features: Form validation, input animations, floating labels, success feedback
  
  @author GitHub Copilot
  @version 2.0.0
  @since 2025-07-20
-->

<template>
  <section id="contact" class="contact parallax-container">
    <!-- Background Decorative Elements -->
    <div class="floating-decorations">
      <div class="bg-decoration circle floating-element" 
           style="top: 15%; left: 8%; width: 100px; height: 100px; animation-delay: 0s;"></div>
      <div class="bg-decoration triangle pulsing-element" 
           style="top: 70%; right: 10%; animation-delay: 2s;"></div>
      <div class="bg-decoration square drifting-element" 
           style="bottom: 20%; left: 12%; width: 70px; height: 70px; animation-delay: 4s;"></div>
    </div>
    
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 
          class="section-title"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Get in Touch
        </h2>
        <p 
          class="section-subtitle"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          We'd love to hear from you. Let's discuss your project and bring your vision to life.
        </p>
      </div>
      
      <!-- Contact Content Grid -->
      <div class="contact-content">
        <!-- Contact Information -->
        <div 
          class="contact-info"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div class="info-card hover-lift">
            <h3>Let's Start a Conversation</h3>
            <p>Ready to transform your ideas into reality? Our team is here to help you every step of the way.</p>
            
            <!-- Contact Methods -->
            <div class="contact-methods">
              <div 
                class="contact-method"
                v-for="(method, index) in contactMethods"
                :key="method.type"
                :data-aos="'fade-up'"
                :data-aos-delay="300 + (index * 100)"
              >
                <div class="method-icon">
                  <component :is="method.icon" />
                </div>
                <div class="method-content">
                  <h4>{{ method.title }}</h4>
                  <p>{{ method.description }}</p>
                  <a :href="method.link" class="method-link">{{ method.value }}</a>
                </div>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="social-section">
              <h4>Follow Us</h4>
              <div class="social-links">
                <a 
                  v-for="social in socialLinks"
                  :key="social.platform"
                  :href="social.url"
                  class="social-link hover-lift"
                  :aria-label="`Follow us on ${social.platform}`"
                >
                  <component :is="social.icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div 
          class="contact-form-section"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div class="form-card">
            <form @submit.prevent="submitForm" class="contact-form" ref="contactForm">
              <!-- Name and Email Row -->
              <div class="form-row">
                <div class="form-group" :class="{ 'focused': focusedField === 'name', 'filled': form.name }">
                  <label for="name" class="floating-label">Your Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    v-model="form.name" 
                    required
                    :class="{ 'error': errors.name }"
                    @focus="handleFocus('name')"
                    @blur="handleBlur('name')"
                    @input="validateField('name')"
                  />
                  <div class="input-border"></div>
                  <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                </div>
                
                <div class="form-group" :class="{ 'focused': focusedField === 'email', 'filled': form.email }">
                  <label for="email" class="floating-label">Your Email *</label>
                  <input 
                    type="email" 
                    id="email"
                    v-model="form.email" 
                    required
                    :class="{ 'error': errors.email }"
                    @focus="handleFocus('email')"
                    @blur="handleBlur('email')"
                    @input="validateField('email')"
                  />
                  <div class="input-border"></div>
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>
              </div>
              
              <!-- Subject Field -->
              <div class="form-group" :class="{ 'focused': focusedField === 'subject', 'filled': form.subject }">
                <label for="subject" class="floating-label">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  v-model="form.subject"
                  @focus="handleFocus('subject')"
                  @blur="handleBlur('subject')"
                />
                <div class="input-border"></div>
              </div>
              
              <!-- Message Field -->
              <div class="form-group" :class="{ 'focused': focusedField === 'message', 'filled': form.message }">
                <label for="message" class="floating-label">Your Message *</label>
                <textarea 
                  id="message"
                  v-model="form.message" 
                  required
                  rows="5"
                  :class="{ 'error': errors.message }"
                  @focus="handleFocus('message')"
                  @blur="handleBlur('message')"
                  @input="validateField('message')"
                ></textarea>
                <div class="input-border"></div>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>
              
              <!-- Submit Button -->
              <button 
                type="submit" 
                class="submit-btn btn-animated hover-lift"
                :class="{ 'loading': isSubmitting, 'success': isSubmitted }"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting && !isSubmitted" class="btn-text">
                  <svg class="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9"/>
                  </svg>
                  Send Message
                </span>
                
                <span v-if="isSubmitting" class="btn-text">
                  <div class="loading-spinner"></div>
                  Sending...
                </span>
                
                <span v-if="isSubmitted" class="btn-text">
                  <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Message Sent!
                </span>
              </button>
            </form>
            
            <!-- Success Message -->
            <div v-if="showSuccessMessage" class="success-message">
              <div class="success-content">
                <div class="success-icon-large">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue';

/**
 * Reactive References
 */
const contactForm = ref(null);
const focusedField = ref('');
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const showSuccessMessage = ref(false);

/**
 * Form Data and Validation
 */
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref({
  name: '',
  email: '',
  message: ''
});

/**
 * Contact Methods Data
 */
const contactMethods = ref([
  {
    type: 'phone',
    title: 'Call Us',
    description: 'Mon-Fri 9am-6pm',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
    icon: 'PhoneIcon'
  },
  {
    type: 'email',
    title: 'Email Us',
    description: 'We\'ll respond within 24 hours',
    value: 'info@ishwara.com',
    link: 'mailto:info@ishwara.com',
    icon: 'EmailIcon'
  },
  {
    type: 'location',
    title: 'Visit Us',
    description: 'Our main office',
    value: '123 Business St, City, State 12345',
    link: 'https://maps.google.com/?q=123+Business+St',
    icon: 'LocationIcon'
  }
]);

/**
 * Social Links Data
 */
const socialLinks = ref([
  { platform: 'facebook', url: '#', icon: 'FacebookIcon' },
  { platform: 'twitter', url: '#', icon: 'TwitterIcon' },
  { platform: 'linkedin', url: '#', icon: 'LinkedInIcon' },
  { platform: 'instagram', url: '#', icon: 'InstagramIcon' }
]);

/**
 * Form Field Handlers
 */
const handleFocus = (fieldName) => {
  focusedField.value = fieldName;
  errors.value[fieldName] = '';
};

const handleBlur = (fieldName) => {
  focusedField.value = '';
  validateField(fieldName);
};

/**
 * Field Validation
 */
const validateField = (fieldName) => {
  const value = form.value[fieldName];
  
  switch (fieldName) {
    case 'name':
      if (!value.trim()) {
        errors.value.name = 'Name is required';
      } else if (value.length < 2) {
        errors.value.name = 'Name must be at least 2 characters';
      } else {
        errors.value.name = '';
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errors.value.email = 'Email is required';
      } else if (!emailRegex.test(value)) {
        errors.value.email = 'Please enter a valid email address';
      } else {
        errors.value.email = '';
      }
      break;
      
    case 'message':
      if (!value.trim()) {
        errors.value.message = 'Message is required';
      } else if (value.length < 10) {
        errors.value.message = 'Message must be at least 10 characters';
      } else {
        errors.value.message = '';
      }
      break;
  }
};

/**
 * Form Validation
 */
const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('message');
  
  return !Object.values(errors.value).some(error => error !== '');
};

/**
 * Form Submission Handler
 */
const submitForm = async () => {
  if (!validateForm()) {
    // Shake form on validation error
    if (contactForm.value) {
      contactForm.value.classList.add('shake');
      setTimeout(() => {
        contactForm.value.classList.remove('shake');
      }, 600);
    }
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // TODO: Implement actual form submission logic
    console.log('Form submitted:', form.value);
    
    isSubmitted.value = true;
    showSuccessMessage.value = true;
    
    // Reset form after success
    setTimeout(() => {
      form.value = { name: '', email: '', subject: '', message: '' };
      isSubmitted.value = false;
      isSubmitting.value = false;
      
      // Hide success message after a delay
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);
    }, 2000);
    
  } catch (error) {
    console.error('Form submission error:', error);
    isSubmitting.value = false;
    
    // Show error message (TODO: implement error handling UI)
    alert('There was an error sending your message. Please try again.');
  }
};
</script>

<style scoped>
/* Contact Section Styles */
.contact {
  background: linear-gradient(135deg, #0a2140 0%, #0d2c54 50%, #1a4a84 100%);
  color: white;
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
  color: white;
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
  background: linear-gradient(45deg, var(--accent-color), #ffc15c);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
}

/* Contact Content Grid */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  position: relative;
  z-index: 1;
}

/* Contact Information */
.contact-info {
  position: relative;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-card h3 {
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  color: var(--accent-color);
  font-weight: 700;
}

.info-card > p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
}

/* Contact Methods */
.contact-methods {
  margin-bottom: 3rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all var(--transition-medium);
}

.contact-method:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.method-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, var(--accent-color), #ffc15c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.method-icon svg {
  width: 24px;
  height: 24px;
}

.method-content h4 {
  font-size: 1.1rem;
  margin: 0 0 0.3rem 0;
  color: white;
  font-weight: 600;
}

.method-content p {
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  opacity: 0.8;
}

.method-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.method-link:hover {
  color: #ffc15c;
}

/* Social Section */
.social-section h4 {
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: white;
  font-weight: 600;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all var(--transition-medium);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link:hover {
  background: var(--accent-color);
  color: var(--primary-color);
  transform: translateY(-3px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* Contact Form Section */
.form-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: var(--shadow-heavy);
  position: relative;
  overflow: hidden;
}

.contact-form {
  position: relative;
}

/* Form Animation */
.contact-form.shake {
  animation: shake 0.6s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Form Layout */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

/* Floating Label Inputs */
.floating-label {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  background: white;
  padding: 0 0.5rem;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-medium);
  pointer-events: none;
  z-index: 1;
}

.form-group.focused .floating-label,
.form-group.filled .floating-label {
  top: 0;
  left: 1rem;
  font-size: 0.85rem;
  color: var(--primary-color);
  font-weight: 600;
}

/* Input and Textarea Styles */
input, textarea {
  width: 100%;
  padding: 1.2rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  color: var(--text-color);
  transition: all var(--transition-medium);
  position: relative;
  z-index: 0;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(13, 44, 84, 0.1);
}

input.error, textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Input Border Animation */
.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  transition: width var(--transition-medium);
}

.form-group.focused .input-border {
  width: 100%;
}

/* Error Messages */
.error-message {
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1.2rem 2rem;
  background: linear-gradient(45deg, var(--primary-color), #1a4a84);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #1a4a84, var(--primary-color));
  transform: translateY(-2px);
  box-shadow: var(--shadow-heavy);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn.success {
  background: linear-gradient(45deg, #10b981, #059669);
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.send-icon, .success-icon {
  width: 20px;
  height: 20px;
}

/* Loading Spinner */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success Message */
.success-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-content {
  text-align: center;
  padding: 2rem;
}

.success-icon-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.success-icon-large svg {
  width: 40px;
  height: 40px;
  stroke-width: 3;
}

.success-content h3 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.success-content p {
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .info-card,
  .form-card {
    padding: 2rem;
  }
  
  .contact-method {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .floating-decorations .bg-decoration {
    opacity: 0.02;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .contact-method,
  .social-link,
  .submit-btn {
    transition: none;
  }
  
  .floating-decorations * {
    animation: none !important;
  }
  
  .loading-spinner {
    animation: none;
  }
}

@media (prefers-contrast: high) {
  .form-card {
    border: 2px solid var(--primary-color);
  }
  
  input, textarea {
    border-width: 3px;
  }
}
</style>

<!-- Icon Components -->
<script>
// Contact method icons
const PhoneIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 16.92V21a2 2 0 01-2.18 2A19.8 19.8 0 018.5 17.31 19.28 19.28 0 01.69 8.82 2 2 0 012.68 7h4.08a2 2 0 012 1.72c.128.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 14.91a16 16 0 007 7z"/>
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

const LocationIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `
};

// Social media icons
const FacebookIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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

const LinkedInIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
};

const InstagramIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  `
};

export { PhoneIcon, EmailIcon, LocationIcon, FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon };
</script>
