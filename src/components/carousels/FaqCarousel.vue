<template>
  <div class="faq-carousel">
    <h2 class="carousel-title">{{ title }}</h2>
    <div class="carousel-wrapper">
      <button class="arrow left" @click="scrollLeft">‹</button>
      <div class="carousel-container" ref="carousel">
        <router-link
          v-for="(item, index) in posts"
          :key="index"
          :to="`/blog/${item.slug}`"
          class="carousel-item"
        >
          <img :src="item.cover_image_url" :alt="item.title" />
          <p class="carousel-text">{{ item.title }}</p>
        </router-link>
      </div>
      <button class="arrow right" @click="scrollRight">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  posts: Array,
  title: {
    type: String,
    default: '常見問題'
  }
})

const carousel = ref(null)

const scrollLeft = () => {
  if (carousel.value) carousel.value.scrollLeft -= 260
}

const scrollRight = () => {
  if (carousel.value) carousel.value.scrollLeft += 260
}
</script>

<style scoped>
.faq-carousel {
  margin-top: 48px;
  text-align: center;
}

.carousel-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.carousel-container {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 12px;
  scroll-behavior: smooth;
  max-width: 720px;
}

.carousel-item {
  flex: 0 0 auto;
  width: 220px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px;
}

.carousel-item img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
}

.carousel-text {
  font-size: 0.95rem;
  font-weight: 500;
}

.arrow {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  padding: 4px 8px;
  transition: color 0.2s;
}

.arrow:hover {
  color: #f97316;
}
</style>
