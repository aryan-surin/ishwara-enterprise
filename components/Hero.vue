<template>
  <section id="hero" class="hero">
    <video ref="videoPlayer" autoplay muted playsinline class="hero-video" @ended="playNextVideo">
      <source :src="currentVideo" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="tagline">Build Connect Protect</h1>
      <p class="subtitle">Solutions That Build Futures.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const videoPlayer = ref(null);
const videos = ['/videos/hero2.mp4', '/videos/hero2.mp4'];
const currentVideoIndex = ref(0);
const currentVideo = ref(videos[currentVideoIndex.value]);

const playNextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.length;
  currentVideo.value = videos[currentVideoIndex.value];
  videoPlayer.value.load();
  videoPlayer.value.play();
};

onMounted(() => {
  videoPlayer.value.addEventListener('ended', playNextVideo);
});
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: white;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the video covers the area without distortion */
  z-index: -2;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2));
    z-index: -1;
}

.hero-content {
  z-index: 1;
  max-width: 1000px;
}

.tagline {
  font-family: var(--heading-font);
  font-size: 5.5rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
}

.subtitle {
  font-size: 1.8rem;
  margin-top: 1rem;
  font-weight: 400;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
}
</style>
