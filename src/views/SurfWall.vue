<template>
  <div class="surfwall-page">
    <!-- Hero Section -->
    <div class="hero">
      <h1>Join the Surf Wall Challenge!</h1>
      <p>Share your best wave moments with us and win SPOT prizes. Monthly winners announced!</p>
    </div>

    <!-- How It Works -->
    <div class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <h3>🖼 Submit</h3>
          <p>Send your best surfing photo to the staff after class.</p>
        </div>
        <div class="step">
          <h3>🗳 Vote</h3>
          <p>The SPOT team selects the most inspiring entries monthly.</p>
        </div>
        <div class="step">
          <h3>🏆 Win</h3>
          <p>Winners are featured here and receive surprise gifts!</p>
        </div>
      </div>
    </div>

    <!-- Gallery Section -->
    <div class="gallery">
      <h2>Past Winners</h2>
      <div class="gallery-grid">
        <div class="gallery-card" v-for="(entry, index) in galleryEntries" :key="index">
          <img :src="entry.image" :alt="entry.name" />
          <div class="caption">
            <p class="name">{{ entry.name }}</p>
            <p class="date">{{ entry.date }}</p>
            <p class="label">🏆 Winner</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-box">
      <h2>Submit Your Entry</h2>
      <p>Just finished your session? Talk to your instructor to enter your photo!</p>
      <button disabled>Submission Coming Soon</button>
    </div>
  </div>
</template>

<script setup>
const galleryEntries = [
  { name: 'Jessie', date: 'May 2025', image: '/assets/faq2.png' },
  { name: 'Kai', date: 'May 2025', image: '/assets/faq3.png' },
  { name: 'Mei', date: 'May 2025', image: '/assets/faq4.png' },
  { name: 'Liam', date: 'April 2025', image: '/assets/faq5.png' },
  { name: 'Sara', date: 'March 2025', image: '/assets/faq6.png' },
  { name: 'Alex', date: 'March 2025', image: '/assets/faq2.png' },
]
</script>

<style scoped>
.surfwall-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: sans-serif;
  color: #333;
}

.hero {
  text-align: center;
  margin-bottom: 32px;
}
.hero h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}
.hero p {
  font-size: 1rem;
}

.how-it-works {
  text-align: center;
  margin-bottom: 40px;
}
.steps {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  flex-wrap: wrap;
}
.step {
  flex: 1;
  min-width: 200px;
  background: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
}

.gallery {
  margin-bottom: 40px;
  text-align: center;
}
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.gallery-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 180px;
}
.gallery-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
.caption {
  padding: 8px;
  text-align: center;
}
.caption .name {
  font-weight: bold;
}
.caption .label {
  color: #f97316;
  font-size: 0.85rem;
  margin-top: 4px;
}

.cta-box {
  text-align: center;
  padding: 24px;
  background: #fef3c7;
  border-radius: 8px;
}
.cta-box button {
  margin-top: 12px;
  background: #f97316;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
