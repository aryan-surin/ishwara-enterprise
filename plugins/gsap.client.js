/**
 * GSAP (GreenSock Animation Platform) Plugin for Nuxt3
 * Provides high-performance animations and timeline controls
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 * @since 2025-07-20
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

export default defineNuxtPlugin((nuxtApp) => {
  // Register GSAP plugins
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)
    
    // Configure GSAP for better performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    })
    
    // Set default ease for smoother animations
    gsap.defaults({
      ease: "power2.out",
      duration: 1
    })
    
    // Refresh ScrollTrigger on route changes
    nuxtApp.hook('page:finish', () => {
      ScrollTrigger.refresh()
    })
    
    // Clean up ScrollTrigger instances on page leave
    nuxtApp.hook('page:start', () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    })
  }
  
  // Provide GSAP globally
  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
