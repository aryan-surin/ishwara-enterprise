<template>
  <footer class="footer">
    <div class="container footer-container">
        <div class="footer-logo">
            <img src="/images/logo.png" alt="Ishwara Enterprise Logo">
            <p>Solutions That Build Futures.</p>
        </div>
        <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
        <div class="footer-social">
            <h4>Follow Us</h4>
            <!-- Add your social media links here -->
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
        </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Ishwara Enterprise. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #0a2140;
  color: #a0b3ce;
  padding-top: 4rem;
}

.footer-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding-bottom: 4rem;
}

.footer-logo img {
    height: 50px;
    margin-bottom: 1rem;
}

.footer-logo p {
    font-size: 0.9rem;
}

.footer h4 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

.footer ul {
    list-style: none;
    padding: 0;
}

.footer li {
    margin-bottom: 0.8rem;
}

.footer a {
    color: #a0b3ce;
    text-decoration: none;
    transition: color 0.3s;
}

.footer a:hover {
    color: var(--accent-color);
}

.footer-social a {
    display: block;
    margin-bottom: 0.8rem;
}

.footer-bottom {
    border-top: 1px solid #1a3a64;
    padding: 1.5rem 0;
    text-align: center;
    font-size: 0.9rem;
}
</style>
