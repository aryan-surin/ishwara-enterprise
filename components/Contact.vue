<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2>Get in Touch</h2>
      <p class="contact-subtitle">We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" v-model="form.name" placeholder="Your Name" required />
          <input type="email" v-model="form.email" placeholder="Your Email" required />
        </div>
        <textarea v-model="form.message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const submitForm = () => {
  // TODO: Implement form submission logic (e.g., send to an API endpoint)
  console.log('Form submitted:', form.value);
  alert('Thank you for your message!');
  form.value = { name: '', email: '', message: '' };
};
</script>

<style scoped>
.contact {
  padding: 8rem 2rem;
  background: linear-gradient(to right, #0d2c54, #0a2140);
  color: white;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  color: white;
  margin-bottom: 1rem;
}

.contact-subtitle {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

input, textarea {
  width: 100%;
  padding: 1.2rem;
  border: 1px solid #445f7c;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #1a3a64;
  color: white;
}

input::placeholder, textarea::placeholder {
    color: #a0b3ce;
}

textarea {
  height: 150px;
  resize: vertical;
}

button {
  background-color: var(--accent-color);
  color: var(--primary-color);
  padding: 1.2rem 3rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #ffc15c;
  transform: translateY(-3px);
}
</style>
