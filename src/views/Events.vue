<template>
  <div class="blog-page">
    <div class="blog-header">
      <h1>The SPOT Blog</h1>
      <p class="subtitle">Stories, tips, and updates from the waves.</p>
    </div>

    <div class="blog-placeholder">
      <p>Blog content coming soon. Stay tuned for updates!</p>
    </div>
  </div>
</template>

<script setup>
// No logic needed for now
</script>

<style scoped>
.blog-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
  text-align: center;
}

.blog-header h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 32px;
}

.blog-placeholder {
  background-color: #f9f9f9;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  color: #333;
}
</style>
