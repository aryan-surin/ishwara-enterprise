<template>
  <div>
    <Header />
    <main>
      <Hero />
      <About ref="aboutSection" class="animated-section"/>
      <Services ref="servicesSection" class="animated-section"/>
      <Contact ref="contactSection" class="animated-section"/>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// Import all the components
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Services from './components/Services.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

const aboutSection = ref(null);
const servicesSection = ref(null);
const contactSection = ref(null);

onMounted(() => {
  const sections = [
    aboutSection.value?.$el,
    servicesSection.value?.$el,
    contactSection.value?.$el
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    if (section) {
      observer.observe(section);
    }
  });
});

</script>

<style>
/* Scoped styles for the main App component */
main {
  padding: 0;
  margin: 0;
}
</style>
