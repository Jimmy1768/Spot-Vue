<template>
  <div class="hostel-page">
    <h1 class="title">{{ t.title }}</h1>

    <!-- Top: Image viewer -->
    <div class="gallery">
      <img :src="currentImage" class="main-image" alt="Hostel Room" />
      <div class="thumbnails">
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="img"
          class="thumb"
          :class="{ active: img === currentImage }"
          @click.stop="currentImage = img"
          alt="Thumbnail"
        />
      </div>
    </div>

    <!-- Bottom: Room info -->
    <div class="info">
      <h2 class="room-title">{{ t.roomTitle }}</h2>
      <div class="features-list">
        <span class="feature-pill" v-for="(item, i) in t.features" :key="i">{{ item }}</span>
      </div>

      <button class="booking-button" @click="showModal = true">
        {{ t.bookOnline }}
      </button>
    </div>
  </div>

  <div class="carousel-wrapper">
  <button class="arrow left" @click="prevSlide">←</button>

  <div class="carousel-card">
    <img :src="carouselImages[currentIndex]" class="carousel-image" />
    <h3 class="carousel-title">{{ currentSlide.title }}</h3>

    <!-- If structured sections exist -->
    <div v-if="currentSlide.sections" class="carousel-text-row">
      <div class="carousel-text-section" v-for="(section, i) in currentSlide.sections" :key="i">
        <p v-for="(line, j) in section" :key="j">{{ line }}</p>
      </div>
    </div>

    <!-- Fallback for plain HTML text -->
    <p v-else class="carousel-text" v-html="currentSlide.text" />
  </div>

  <button class="arrow right" @click="nextSlide">→</button>
</div>


  <!-- OUTSIDE the layout, so it overlays the whole page -->
  <BookingCalendar :visible="showModal" @close="showModal = false" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'
import BookingCalendar from '@/components/booking/BookingCalendar.vue'

const t = computed(() => translations[currentLang.value].hosteldetails)
const showModal = ref(false)

const images = [
  '/assets/hostel1.png',
  '/assets/hostel2.png',
  '/assets/hostel3.png',
  '/assets/hostel4.png',
  '/assets/hostel5.png'
]

const currentImage = ref(images[0])

const carouselTexts = computed(() => translations[currentLang.value].hostelcarousel)

const currentIndex = ref(0)
const carouselImages = [
  '/assets/about.png',
  '/assets/rentals.png',
  '/assets/events.png',
  '/assets/lessons.png'
]

const currentSlide = computed(() => carouselTexts.value[currentIndex.value])

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + carouselImages.length) % carouselImages.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselImages.length
}

</script>

<style scoped>
.hostel-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}
.main-image {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.thumbnails {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  overflow-x: auto;
  white-space: nowrap;
  padding: 12px 0 8px;
}
.thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.7;
  transition: 0.2s ease;
}
.thumb.active,
.thumb:hover {
  opacity: 1;
  border-color: #3b82f6;
}

.info {
  text-align: center;
}
.room-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.feature-pill {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  padding: 6px 12px;
  font-size: 0.9rem;
  color: #374151;
}
.booking-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.booking-button:hover {
  background-color: #2563eb;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 12x;
}
.carousel-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  max-width: 800px;
  width: 100%;
  text-align: center;
}
.carousel-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}
.carousel-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #111;
}
.carousel-text {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  white-space: pre-line;
}
.carousel-text-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}
.carousel-text-section {
  flex: 1;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.5;
}
.arrow {
  background: none;
  border: none;
  font-size: 2rem;
  color: #3b82f6;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  border-radius: 6px; /* optional, but cleaner */
  transition: background-color 0.2s ease, color 0.2s ease;
  font-weight: normal;
}
.arrow:hover {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  align-items: center;
}

</style>
