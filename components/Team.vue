<template>
  <section id="team" class="team">
    <div class="container">
      <h2>Our Team</h2>
      <div class="team-members">
        <div v-for="member in teamMembers" :key="member.name" class="team-member">
          <img :src="member.image" :alt="member.name" />
          <h3>{{ member.name }}</h3>
          <p>{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const teamMembers = ref([
  { name: 'John Doe', role: 'CEO & Founder', image: '/images/team/member1.jpg' },
  { name: 'Jane Smith', role: 'Chief Technology Officer', image: '/images/team/member2.jpg' },
  { name: 'Peter Jones', role: 'Lead Developer', image: '/images/team/member3.jpg' },
  { name: 'Sarah Williams', role: 'Project Manager', image: '/images/team/member4.jpg' },
]);
</script>

<style scoped>
.team {
  background-color: var(--background-color);
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.team-member {
  text-align: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.team-member img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 5px solid #fff;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.team-member h3 {
  font-family: var(--heading-font);
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0;
}

.team-member p {
  color: var(--accent-color);
  font-weight: 600;
  margin-top: 0.5rem;
}
</style>
