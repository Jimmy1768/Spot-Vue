<template>
  <div class="education-carousel">
    <div class="carousel-header">
      <h2>{{ title }}</h2>
    </div>

    <div class="carousel-container">
      <button class="arrow left" @click="prevSlide" :disabled="posts.length <= 1">‹</button>

      <div class="carousel-slide" v-if="currentSlide">
        <img
          v-if="currentSlide.cover_image_url"
          :src="currentSlide.cover_image_url"
          :alt="currentSlide.title"
          class="slide-image"
        />
        <div class="slide-content">
          <p class="category">{{ currentSlide.category_label }}</p>
          <h3 class="slide-title">{{ currentSlide.title }}</h3>
          <p class="slide-summary">
            {{ stripHtml(currentSlide.content).slice(0, 100) }}...
          </p>
          <router-link :to="`/blog/${currentSlide.slug}`" class="read-more">
            {{ t.read_more }}
          </router-link>
        </div>
      </div>

      <button class="arrow right" @click="nextSlide" :disabled="posts.length <= 1">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'

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

const t = computed(() => translations[currentLang.value])
const currentIndex = ref(0)

const currentSlide = computed(() => props.posts[currentIndex.value] || null)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.posts.length
}

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.posts.length) % props.posts.length
}

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
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
