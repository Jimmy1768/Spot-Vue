<template>
  <div class="events-carousel">
    <div class="carousel-header">
      <h2>{{ t.events.title }}</h2>
    </div>

    <div class="carousel-container" v-if="events.length">
      <button class="arrow left" @click="prevSlide">‹</button>

      <div class="carousel-slide">
        <img :src="currentSlide.cover_image_url" :alt="currentSlide.title" class="slide-image" />
        <div class="slide-content">
          <h3 class="slide-title">{{ currentSlide.title }}</h3>
          <p class="slide-summary">{{ stripHtml(currentSlide.content).slice(0, 100) }}...</p>
          <router-link :to="`/events/${currentSlide.slug}`" class="read-more">
            {{ t.read_more }}
          </router-link>
        </div>
      </div>

      <button class="arrow right" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const t = computed(() => translations[currentLang.value])

const events = ref([])
const currentIndex = ref(0)

const fetchEvents = async () => {
  const res = await axios.get('/events')
  events.value = res.data
}

const currentSlide = computed(() => events.value[currentIndex.value] || {})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % events.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + events.value.length) % events.value.length
}

onMounted(fetchEvents)

function stripHtml(html) {
  const div = document.createElement("div")
  div.innerHTML = html
  return div.textContent || div.innerText || ""
}

</script>

<style scoped>
.events-carousel {
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
  font-size: 1rem;
  color: #0077cc;
  text-decoration: underline;
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
