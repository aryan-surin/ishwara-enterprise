<template>
  <section id="services" class="services">
    <div class="container">
      <h2>Our Services</h2>
      <div class="service-cards">
        <div class="card" v-for="service in services" :key="service.title">
          <div class="card-icon">
            <img :src="service.icon" :alt="service.title">
          </div>
          <h3>{{ service.title }}</h3>
          <ul>
            <li v-for="item in service.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    title: 'Construction',
    icon: 'https://placehold.co/64x64/fbb03b/0d2c54?text=C',
    items: ['Residential & Commercial', 'Renovation & Remodeling', 'Road & Civil Works']
  },
  {
    title: 'Security Systems',
    icon: 'https://placehold.co/64x64/fbb03b/0d2c54?text=S',
    items: ['CCTV Installation & Maintenance', 'Video Surveillance Setup', 'Remote Monitoring']
  },
  {
    title: 'Fire Protection',
    icon: 'https://placehold.co/64x64/fbb03b/0d2c54?text=F',
    items: ['Fire Alarm Installation', 'Fire Extinguisher Supply', 'Fire Safety Inspections']
  },
  {
    title: 'IT Services',
    icon: 'https://placehold.co/64x64/fbb03b/0d2c54?text=IT',
    items: ['Hardware Supply & Installation', 'Network Setup & Maintenance', 'Server Support']
  }
]);
</script>

<style scoped>
.services {
  background-color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}

.card-icon {
    margin-bottom: 1.5rem;
}

.card h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card li {
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: var(--text-color);
}
</style>
