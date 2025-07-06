<template>
  <section id="about" class="about">
    <div class="container about-container">
        <div class="about-image">
            <!-- Placeholder for an image -->
            <img src="https://placehold.co/600x400/0d2c54/fbb03b?text=Our+Story" alt="About Ishwara Enterprise">
        </div>
        <div class="about-content">
            <h2>About Ishwara Enterprise</h2>
            <p>
                Ishwara Enterprise is a multi-faceted company dedicated to providing top-tier services across various sectors. Our mission, "Build Connect Protect," reflects our commitment to constructing robust infrastructure, connecting businesses and individuals through reliable IT services, and protecting assets with state-of-the-art security systems. With years of experience and a team of dedicated professionals, we strive for excellence in every project we undertake.
            </p>
        </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background-color: #fff;
}

.about-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-image img {
    width: 100%;
    border-radius: 10px;
}

.about-content h2 {
    text-align: left;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
}
</style>
