<template>
  <header :class="['header', { 'scrolled': isScrolled }]">
    <div class="container">
      <div class="logo">
        <!-- TODO: Replace with your actual logo -->
        <img src="/images/logo.png" alt="Ishwara Enterprise Logo" :class="{ 'blend-logo': !isScrolled }" />
      </div>
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  background-color: transparent;
  color: white;
  padding: 1.5rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: background-color 0.4s ease, padding 0.4s ease;
}

.header.scrolled {
  background-color: white;
  color: var(--primary-color);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo img {
  height: 50px;
  transition: height 0.4s ease;
}

.logo img.blend-logo {
  mix-blend-mode: screen;
}

.header.scrolled .logo img {
  height: 40px;
  mix-blend-mode: normal;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-left: 2.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.header.scrolled nav a {
  color: var(--primary-color);
}

nav a:hover {
  color: var(--accent-color);
}
</style>
