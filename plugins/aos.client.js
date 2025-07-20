/**
 * AOS (Animate On Scroll) Plugin for Nuxt3
 * Provides smooth scroll-triggered animations with performance optimization
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 * @since 2025-07-20
 */

import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Check for reduced motion preference for accessibility
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Check if device is mobile for performance optimization
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  nuxtApp.hook('app:mounted', () => {
    AOS.init({
      // Offset from the original trigger point
      offset: 120,
      
      // Values from 0 to 3000, with step 50ms
      delay: 50,
      
      // Animation duration
      duration: prefersReducedMotion ? 0 : (isMobile ? 600 : 1000),
      
      // Animation easing
      easing: 'ease-out-cubic',
      
      // Whether animation should happen only once
      once: true,
      
      // Whether elements should animate out while scrolling past them
      mirror: false,
      
      // Animate elements on page load
      startEvent: 'DOMContentLoaded',
      
      // Disable animations on mobile if performance is a concern
      disable: prefersReducedMotion ? true : false,
      
      // Class applied after initialization
      initClassName: 'aos-init',
      
      // Class applied on animation
      animatedClassName: 'aos-animate'
    })
    
    // Refresh AOS when route changes
    nuxtApp.hook('page:finish', () => {
      AOS.refresh()
    })
  })
  
  // Provide AOS instance globally
  return {
    provide: {
      aos: AOS
    }
  }
})
