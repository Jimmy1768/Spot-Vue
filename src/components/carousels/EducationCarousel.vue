<template>
  <div class="education-carousel">
    <div class="carousel-header">
      <h2>{{ title }}</h2>
    </div>

    <div class="carousel-container">
      <button class="arrow left" @click="prevSlide">‹</button>

      <div class="carousel-slide">
        <img :src="currentSlide.image" :alt="currentSlide.title" class="slide-image" />
        <div class="slide-content">
          <h3 class="slide-title">{{ currentSlide.title }}</h3>
          <p class="slide-summary">{{ currentSlide.summary }}</p>
          <router-link :to="`/blog/${currentSlide.id}`" class="read-more">Read More</router-link>
        </div>
      </div>

      <button class="arrow right" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data until real blog posts are passed in via props
const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Recent Education Events'
  }
})

const currentIndex = ref(0)

const currentSlide = computed(() => props.posts[currentIndex.value])

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.posts.length
}

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.posts.length) % props.posts.length
}
</script>

<style scoped>
.education-carousel {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 0;
  text-align: center;
}
.carousel-header h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-slide {
  max-width: 600px;
  width: 100%;
  padding: 0 16px;
  text-align: left;
}
.slide-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
.slide-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 8px;
}
.slide-summary {
  font-size: 1rem;
  color: #444;
  margin-bottom: 12px;
}
.read-more {
  background-color: #f97316;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}
.read-more:hover {
  background-color: #ea580c;
}
.arrow {
  font-size: 2rem;
  background: none;
  border: none;
  color: #f97316;
  cursor: pointer;
  padding: 0 12px;
}
.arrow:hover {
  color: #ea580c;
}
</style>
